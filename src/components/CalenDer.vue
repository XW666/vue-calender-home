<template>
  <div class="cc-calendar">
    <el-row class="calen-header">
      <el-col :span="24">
        <div class="calen-item calen-select">
          <el-select
            size="mini"
            v-model="calelTimeDate.yearValue"
            @change="changeSelect({ type: 'year' })"
            placeholder="请选择"
            class="select-input_w_small"
          >
            <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </div>
        <div class="calen-item calen-select">
          <el-select
            size="mini"
            v-model="calelTimeDate.monthValue"
            placeholder="请选择"
            class="select-input_w_small"
            @change="changeSelect({ type: 'month' })"
          >
            <el-option v-for="item in monthOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </div>
        <div class="calen-item">
          <el-button size="mini" type="primary" @click="handleToday">今天</el-button>
          <el-button-group>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-arrow-left"
              @click="handlePrevMonth"
            ></el-button>
            <el-button size="mini" type="primary" @click="handleNextMonth">
              <i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
          </el-button-group>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="8"
        class="calender-item"
        v-for="(item, personIndex) in calendarList"
        :key="item.month"
      >
        <p
          class="calender-p"
          :class="{ blackColor: isCurrenDate(item.month, item.year) }"
        >{{ item.year }}年 {{ item.month }}月</p>
        <ul class="calendar-week clear">
          <li v-for="(item, index) in calendarTitleArr" :key="index" class="week-item">{{ item }}</li>
        </ul>
        <ul class="calendar-view clear">
          <li
            v-for="(child, childIndex) in item.data"
            :key="childIndex"
            class="date-view"
            :class="[{ 'month-class': !child.chickMonth }, { 'year-class': isCurrenYear(child.year) || isCurrenDate(item.month, item.year) }]"
            @click="handleClickDay(child, childIndex, personIndex)"
          >
            <i class="el-icon-success" v-show="child.clickDay && child.chickMonth"></i>
            <span
              class="date-day"
              :class="[{ 'day-green': child.dayType === 1, 'day-yellow': child.dayType === 2, 'day-red': child.dayType === 3 }]"
            >{{ isCurrenDay(child) }}</span>
            <span class="calendar-name" v-show="child.chickMonth">{{ child.publicHolidayName }}</span>
            <div class="calender-day" v-show="child.chickMonth">
              <div
                v-for="(son, index) in child.dayLisy"
                :key="index"
                class="calender-day-d"
                :style="{ background: '#' + son.dayMark }"
              ></div>
            </div>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row class="calen-footer">
      <el-col :span="12" class="calen-radio">
        <el-radio-group
          v-model="radioValue"
          @change="radioChange"
          :disabled="radioDisabled"
          size="mini"
        >
          <el-radio :label="1">
            工作日
            <span class="radio-s radio-green"></span>
          </el-radio>
          <el-radio :label="2">
            假日
            <span class="radio-s radio-yellow"></span>
          </el-radio>
          <el-radio :label="3">
            节日
            <span class="radio-s radio-red"></span>
          </el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as utils from "../utils/calendar";
const { year, month,day } = utils.getNewDate(new Date());
import * as calenderInfo from '../utils/calenderConfig'

export default {
  name: "cc-calendar",
  props: {
    time: {
      type: Object,
      default: () => {
        return {};
      }
    },
    timeDate: {
      type: Object,
      default: () => {
        return {};
      }
    },
    calendarList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    calelTimeDate() {
      return JSON.parse(JSON.stringify(this.timeDate));
    }
  },
  data() {
    return {
      currYear: year,
      currMonth: month + 1,
      calendarTitleArr: ["一", "二", "三", "四", "五", "六", "七 "],
      // time: { year, month, day },
      // calendarList: [],
      yearOptions: [2020],
      monthOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      radioValue: 0,
      radioDisabled: true,
      checkStatus: "start", // 点击状态 start 、end、nostatus
      startList: {}, // 点击开始日期
      endList: {} // 点击结束日期
      // yearValue: 2020,
      // monthValue: month + 1
    };
  },

  methods: {
    // 日期展示
    isCurrenDay(data) {
      let day = data.day;
      const current = utils.timestampToDate(new Date());
      const isDay = data.todata === current;
      if (isDay && data.chickMonth) {
        day = "今";
      }
      return day;
    },
    isCurrenYear(currentYear) {
      return currentYear > year || currentYear < year;
    },
    isCurrenDate(month, year) {
      // 是否在当前月之后
      let flag = false;
      if (year >= this.currYear) {
        if (year > this.currYear) {
          flag = false;
        } else {
          if (month < this.currMonth) {
            flag = true;
          } else {
            flag = false;
          }
        }
      } else {
        flag = true;
      }
      return flag;
    },
    // 当前月高亮
    isCurMonth(currentYear, currentMonth, data) {
      const { year, month } = utils.getNewDate(data);
      const m = month + 1;
      return currentYear === year && m === currentMonth;
    },
    // 是否是当前月
    isCurrentMonth(date) {
      const { year: currentYear, month: currentMonth } = utils.getNewDate(
        utils.getDate(this.time.year, this.time.month, 1)
      );
      const { year, month } = utils.getNewDate(date);
      return currentYear === year && currentMonth === month;
    },
    // 是否是今天
    isCurrentDay(date) {
      const {
        year: currentYear,
        month: currentMonth,
        day: currentDay
      } = utils.getNewDate(new Date());
      const { year, month, day } = utils.getNewDate(date);
      return (
        currentYear === year && currentMonth === month && currentDay === day
      );
    },
    // 上一个月
    handlePrevMonth() {
      const prevMonth = utils.getDate(this.time.year, this.time.month, 1);

      prevMonth.setMonth(prevMonth.getMonth() - 1);
      const time = utils.getNewDate(prevMonth);
      //大于等于当前年的最大月份 禁止迪点击
      // if (time.year < year && time.month === 11) {
      //   return;
      // }
      const timeDate = {
        yearValue: time.year,
        monthValue: time.month + 1
      };

      this.$emit("handlePrevMonth", time, timeDate);
    },
    // 下一个月
    handleNextMonth() {
      const nextMonth = utils.getDate(this.time.year, this.time.month, 1);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      const time = utils.getNewDate(nextMonth);
      //等于当前年的最小月份  禁止迪点击
      // if (time.year > year && time.month === 0) {
      //   return;
      // }
      const timeDate = {
        yearValue: time.year,
        monthValue: time.month + 1
      };
      this.$emit("handleNextMonth", time, timeDate);
    },
    // 点击回到今天
    handleToday() {
      const time = utils.getNewDate(new Date());
      const timeDate = {
        yearValue: time.year,
        monthValue: time.month + 1
      };
      this.$emit("handleToday", time, timeDate);
    },
    // 点击某一天
    handleClickDay(item, childIndex, personIndex) {
      this.radioDisabled = false;
      if (this.checkStatus === "nostatus") {
        // 清空前面选择的
        this.checkStatus = "end";
        this.startList = {
          data: item,
          start: "nostatus"
        };
        this.endList = {};
      } else if (this.checkStatus === "start") {
        // 开始日期
        this.checkStatus = "end";
        this.startList = {
          data: item
        };
      } else {
        // 结束日期
        this.checkStatus = "nostatus";
        this.endList = {
          data: item
        };
      }

      this.$emit("handleClickDay", this.startList, this.endList);
    },
    changeSelect(data) {
      // 下拉选择
      const checkTime = utils.getDate(
        this.calelTimeDate.yearValue,
        this.calelTimeDate.monthValue,
        1
      );
      checkTime.setMonth(checkTime.getMonth() - 1);
      const time = utils.getNewDate(checkTime);

      this.$emit("changeSelect", time, this.calelTimeDate, data);
    },
    radioChange(val) {
      // 单选

      this.radioValue = 0;
      this.radioDisabled = true;
      this.checkStatus = "nostatus";

      this.$emit("radioChange", val);
    }
  },
  created() {
    // /获取当前日期对应的农历
    	const lunar = calenderInfo.solar2lunar(year, month, day)
  }
};
</script>

<style lang="scss">
.cc-calendar {
  width: 100%;
  // height: 96%;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);

  padding: 16px 8px;
  .calen-header {
    text-align: right;
    padding: 0 8px 20px 8px;
  }
  .calen-select {
    width: 95px;
    .select-input_w_small {
      width: 100%;
    }
  }
  .calen-item {
    display: inline-block;
    margin-left: 10px;
    .el-button-group {
      vertical-align: top;
      margin-left: 10px;
    }
    button {
      padding: 5px 6px;
    }
  }
  .calen-footer {
    padding-top: 20px;
    padding-left: 10px;
    .calen-radio {
      padding-top: 10px;
    }
    .el-radio__label {
      font-size: 12px;
      color: #595959;
    }

    .radio-s {
      width: 30px;
      height: 12px;
      display: inline-block;
      margin-left: 10px;
      vertical-align: text-top;
    }
    .radio-green {
      background: #0295a5;
    }
    .radio-yellow {
      background: #f7c66a;
    }
    .radio-red {
      background: #de64a5;
    }
    .calen-btn {
      text-align: right;
    }
  }
  .calender-item {
    padding: 0 8px;
  }
  .calender-p {
    font-size: 14px;
    padding-bottom: 10px;
    text-align: center;
    color: #292929;
  }
  .blackColor {
    color: #bfbfbf;
  }
  .calendar-week {
    width: 100%;
    height: 35px;
    line-height: 34px;
    background: #f5f5f5;
    border-right: none;
    .week-item {
      float: left;
      width: 14.285%;
      text-align: center;
      box-sizing: border-box;
      font-size: 12px;
      color: #262626;
      border-left: 1px solid #e8e8e8;
      border-top: 1px solid #e8e8e8;
      border-bottom: 1px solid #e8e8e8;
      font-weight: 600;
    }
    & > .week-item:last-child {
      border-right: 1px solid #e8e8e8;
    }
  }
  .calendar-view {
    width: 100%;
    // border-left: 1px solid #e4e7ea;
    & > .date-view:nth-child(7n) {
      border-right: 1px solid #e4e7ea;
    }
    .date-view {
      position: relative;
      float: left;
      width: 14.285%;
      box-sizing: border-box;
      height: 65px;
      border-left: 1px solid #e4e7ea;
      border-bottom: 1px solid #e4e7ea;
      padding: 2px;
      font-size: 12px;
      overflow: hidden;
      cursor: pointer;
      i {
        position: absolute;
        left: 2px;
        top: 2px;
        color: #138dd9;
      }
      .calendar-name {
        display: inline-block;
        float: right;
        color: #138dd9;
      }
      .date-day {
        // padding: 8px 8px 0;
        display: inline-block;
        float: right;
        font-weight: 500;
        color: #595959;
        margin-left: 3px;
      }
      .day-green {
        color: #0295a5;
      }
      .day-yellow {
        color: #f7c66a;
      }
      .day-red {
        color: #de64a5;
      }
    }
    .year-class {
      pointer-events: none;
    }
    .month-class {
      pointer-events: none;
      background-image: linear-gradient(
        45deg,
        rgba(243, 245, 246, 1) 25%,
        transparent 25%,
        transparent 50%,
        rgba(243, 245, 246, 1) 45%,
        rgba(243, 245, 246, 1) 60%,
        transparent 75%,
        transparent
      );
      background-size: 5px 5px;
      background-color: #fafcfd;
      .date-day {
        color: #d9d9d9;
      }
    }
    .todayBg {
      background: #fff;
    }
    .handleDay {
      background: #2061ff !important;
      .date-day {
        color: #bccfff !important;
      }
      .calendar-num {
        color: #fff !important;
      }
    }
  }
  .calender-day {
    padding-top: 5px;
    overflow: auto;
    height: 74%;
    width: 100%;
    box-sizing: border-box;
    .calender-day-d {
      height: 8px;
      width: 100%;
      margin-bottom: 3px;
    }
  }
}
</style>
