<template>
  <div class="about">
    <Calen-Der
      :time="time"
      :timeDate="timeDate"
      :calendarList="calendarList"
      class="calendar"
      ref="calendar"
      @handlePrevMonth="handlePrevMonth"
      @handleNextMonth="handleNextMonth"
      @handleToday="handleToday"
      @handleClickDay="handleClickDay"
      @changeSelect="changeSelect"
      @radioChange="radioChange"
    ></Calen-Der>
  </div>
</template>
<script>
import CalenDer from "../components/CalenDer";
import * as utils from "../utils/calendar";
const { year, month, day } = utils.getNewDate(new Date());

export default {
  components: {
    CalenDer
  },
  data() {
    return {
      time: { year, month, day },
      timeDate: {
        yearValue: year,
        monthValue: month + 1
      },
      calendarList: [], // 所有日期
      checkCalender: [] //选中的日期
    };
  },
  created() {
    this.visibleCalendar();
  },
  mounted() {},
  methods: {
    rightDay() {
      const right = {
        year: this.time.year,
        month: this.time.month + 1
      };
      if (this.time.month === 11) {
        right.year = this.time.year + 1;
        right.month = 0;
      }
      return right;
    },
    leftDay() {
      const left = {
        year: this.time.year,
        month: this.time.month - 1
      };
      if (this.time.month === 0) {
        left.year = this.time.year - 1;
        left.month = 11;
      }

      return left;
    },
    visibleCalendar() {
      const calendatArr = [];
      const left = this.leftDay();
      const right = this.rightDay();
      // 当前月日历
      const dataCen = utils.getCanlenDate({
        year: this.time.year,
        month: this.time.month
      });
      // 上一个月日历
      const dataLeft = utils.getCanlenDate(left);
      // 下一个月日历
      const dataRight = utils.getCanlenDate(right);

      calendatArr.push(
        {
          year: left.year,
          month: left.month + 1,
          data: dataLeft
        },
        {
          year: this.time.year,
          month: this.time.month + 1,
          data: dataCen
        },
        {
          year: right.year,
          month: right.month + 1,
          data: dataRight
        }
      );

      this.calendarList = calendatArr;
    },
    handlePrevMonth(time, timeDate) {
      //上个月
      this.chickMonthList(time, timeDate);
    },
    handleNextMonth(time, timeDate) {
      //下个月
      this.chickMonthList(time, timeDate);
    },
    handleToday(time, timeDate) {
      //今天
      this.chickMonthList(time, timeDate);
    },
    changeSelect(time, timeDate) {
      //下拉选择
      this.chickMonthList(time, timeDate);
    },
    handleClickDay(startList, endList) {
      //点击某一天
      if (JSON.stringify(endList) === "{}") {
        if (startList.start) {
          this.handleCanleReq();
        }
        this.calendarList.map(item => {
          item.data.map(child => {
            if (child.todata === startList.data.todata) {
              child.clickDay = true;
            }
            return item;
          });
        });
      } else {
        // 判断选中日期是否在同一个月
        const startData = startList.data;
        const endData = endList.data;
        let startIndex = startData.day;
        let endIndex = endData.day;
        if (startData.month === endData.month) {
          // 判断结束日期小于开始日期则自动颠倒过来
          if (startData.day > endData.day) {
            startIndex = endData.day;
            endIndex = startData.day;
          }
          this.calendarList.map(item => {
            item.data.map(child => {
              if (child.month === startData.month) {
                if (child.day >= startIndex && child.day <= endIndex) {
                  child.clickDay = true;
                }
              }
              return item;
            });
          });
        } else {
          // 不在同一个月

          if (startData.month > endData.month) {
            // 是否跨2个月
            this.calendarList.map(item => {
              item.data.map(child => {
                if (
                  child.month < startData.month &&
                  child.month > endData.month
                ) {
                  child.clickDay = true;
                }
                if (child.month === endData.month && child.day >= endIndex) {
                  child.clickDay = true;
                }
                if (
                  child.month === startData.month &&
                  child.day <= startIndex
                ) {
                  child.clickDay = true;
                }

                return item;
              });
            });
          } else {
            // 是否跨2个月
            this.calendarList.map(item => {
              item.data.map(child => {
                if (
                  child.month < endData.month &&
                  child.month > startData.month
                ) {
                  child.clickDay = true;
                }
                if (child.month === endData.month && child.day <= endIndex) {
                  child.clickDay = true;
                }
                if (
                  child.month === startData.month &&
                  child.day >= startIndex
                ) {
                  child.clickDay = true;
                }
                return item;
              });
            });
          }
        }
      }
    },
    handleCanleReq() {
      // 数据还原
      this.calendarList.map(item => {
        item.data.map(child => {
          child.clickDay = false;
          return child;
        });
        return item;
      });
    },
    chickMonthList(time, timeDate) {
      this.time = time;
      this.timeDate = timeDate;
      this.visibleCalendar();
    },
    radioChange(val) {
      // 单选
      this.radioValue = val;
      this.calendarList.map(item => {
        item.data.map(child => {
          if (child.clickDay) {
            // if (this.calendarLsOfficial[child.todata]) {
            //   child.dayType = val;
            // } else {
            //   child.dayType = val === 1 ? "" : val;
            // }
            child.dayType = val;
            child.checked = true;

            child.clickDay = false;
          }
          return child;
        });
        return item;
      });
    }
  }
};
</script>