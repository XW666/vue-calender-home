<template>
  <div>
    <el-date-picker
      v-model="dateRangeClickValue"
      popper-class="common-data-picker"
      class="common-data-picker-select"
      :style="{ width: widthType + 'px' }"
      :type="dateType"
      :placeholder="placeholderText"
      :picker-options="daterangePickerOptions"
      :clearable="false"
      @change="daterangeChange"
      value-format="yyyy-MM-dd"
      range-separator="~"
      :start-placeholder="placeholderText"
      :end-placeholder="placeholderText"
      v-if="dateType === 'daterange' || dateType === 'monthrange'"
    ></el-date-picker>

    <el-date-picker
      v-else
      v-model="selectClickValue"
      popper-class="common-data-picker"
      class="common-data-picker-select"
      :style="{ width: widthType + 'px' }"
      :type="dateType"
      :placeholder="placeholderText"
      :picker-options="datePickerOptions"
      :clearable="false"
      @change="dateChange"
      value-format="yyyy-MM-dd"
    ></el-date-picker>
  </div>
</template>

<script>
var totalDataSelect;
var totalDataRangeSelect = [];
export default {
  props: {
    placeholderText: {
      type: String,
      default: "请选择"
    },
    dateType: {
      type: String,
      default: "date"
    },
    widthType: {
      type: String,
      default: "div_w_150"
    },
    selectValue: {
      default: ""
    },
    pickerTimeStart: {
      default: ""
    },
    pickerTimeEnd: {
      default: ""
    }
  },
  data() {
    return {
      value: "",
      datePickerOptions: {
        shortcuts: [
          {
            text: "清空",
            onClick(picker) {
              picker.$emit("pick", "");
            }
          },
          {
            text: "现在",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "确认",
            onClick(picker) {
              if (totalDataSelect) {
                picker.$emit("pick", totalDataSelect);
              } else {
                picker.$emit("pick", new Date());
              }
            }
          }
        ],
        disabledDate: time => {
          if (this.pickerTimeEnd) {
            return time.getTime() > new Date(this.pickerTimeEnd);
          }
          if (this.pickerTimeStart) {
            return time.getTime() < new Date(this.pickerTimeStart);
          }
        }
      },
      daterangePickerOptions: {
        shortcuts: [
          {
            text: "清空",
            onClick(picker) {
              picker.$emit("pick", ["", ""]);
            }
          },
          {
            text: "现在",
            onClick(picker) {
              picker.$emit("pick", [new Date(), new Date()]);
            }
          },
          {
            text: "确认",
            onClick(picker) {
              if (totalDataRangeSelect.length > 0) {
                picker.$emit("pick", totalDataRangeSelect);
              } else {
                picker.$emit("pick", [new Date(), new Date()]);
              }
            }
          }
        ]
      }
    };
  },
  created() {},
  mounted() {},
  computed: {
    selectClickValue: {
      get() {
        return this.selectValue;
      },
      set(val) {
        this.$emit("update:selectValue", val);
      }
    },
    dateRangeClickValue: {
      get() {
        return this.selectValue;
      },
      set(val) {
        this.$emit("update:selectValue", val);
      }
    }
  },
  methods: {
    dateChange(val) {
      totalDataSelect = this.selectClickValue;
      this.$emit("update:selectValue", val);
    },
    daterangeChange(val) {
      totalDataRangeSelect = this.dateRangeClickValue;
      this.$emit("update:selectValue", val);
    }
  }
};
</script>

<style lang="scss">
// element  datepicker 单个日期的样式
.common-data-picker {
  color: #262626;
  &.el-picker-panel {
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    border: 1px solid rgba(232, 232, 232, 1);
  }

  .el-date-picker__header-label {
    color: #262626;
    font-size: 14px;
  }

  .el-date-table th {
    padding: 0px;
    border-bottom: 0px;
    color: #8c8c8c;
  }

  .el-date-picker__header {
    margin: 12px 20px 5px;
  }

  .el-date-table td {
    padding: 0px;
  }

  .el-date-table td.today span {
    color: #47a6e1;
    font-weight: 400;
  }

  .el-date-table td span {
    border-radius: 4px;

    &:hover {
      color: #47a6e1;
    }
  }

  .el-date-table td.current:not(.disabled) span {
    background-color: #47a6e1;
    color: #fff;
  }

  .el-date-table td.next-month,
  .el-date-table td.prev-month {
    color: #d9d9d9;

    span {
      &:hover {
        color: #d9d9d9 !important;
      }
    }
  }

  .el-date-table td {
    &.normal.disabled {
      span {
        &:hover {
          color: #d9d9d9 !important;
        }
      }
    }
  }

  .el-picker-panel [slot="sidebar"] + .el-picker-panel__body,
  .el-picker-panel__sidebar + .el-picker-panel__body {
    margin-left: 0px;
    padding-bottom: 40px;
  }

  &.el-date-picker.has-sidebar {
    width: auto;
  }

  .el-picker-panel__content {
    margin: 0px 8px;
    width: 264px;
  }

  .el-picker-panel__footer {
    display: none !important;
  }

  .el-picker-panel [slot="sidebar"],
  .el-picker-panel__sidebar {
    width: auto;
    top: auto;
    right: 0px;
    left: 0px;
    bottom: 0px;
    background-color: transparent;
    border-right: 0;
    // display: flex;
    // justify-content: space-between;
    z-index: 2;
    padding: 3px 20px;
    border-top: 1px solid #e8e8e8;

    .el-picker-panel__shortcut {
      display: inline-block;
      width: auto;
      line-height: 20px;
      font-size: 12px;
      color: #595959;
      padding-left: 0px;

      &:nth-child(2) {
        border-radius: 3px;
        background: #fff;
        border: 1px solid #dcdfe6;
        padding: 0px 7px;
        margin-left: 128px;
      }

      &:nth-child(3) {
        background: rgba(19, 141, 217, 1);
        border-radius: 4px;
        border: 0px solid #138dd9;
        padding: 0px 7px;
        color: #fff !important;
        float: right;
        margin-left: 10px;
        margin-top: 4px;
        line-height: 22px;
      }
    }
  }

  // 月份样式初始化
  .el-month-table td {
    padding: 0px;
  }

  .el-date-picker__header--bordered {
    border-bottom: 0px;
    padding-bottom: 0px;
  }

  .el-month-table td.today .cell {
    color: #47a6e1;
    font-weight: 400;
  }

  .el-month-table td .cell {
    width: 50px;
    height: 32px;
    display: block;
    line-height: 32px;
    color: #262626;

    &:hover {
      color: #47a6e1 !important;
    }
  }

  .el-month-table td.current:not(.disabled) .cell {
    color: #47a6e1;
  }

  .el-month-table td.disabled .cell {
    color: #d9d9d9;
    // background: transparent;

    &:hover {
      color: #d9d9d9 !important;
    }
  }

  // 年日期样式重置
  .el-year-table td {
    padding: 10px 3px;
  }

  .el-year-table td .cell:hover,
  .el-year-table td.current:not(.disabled) .cell {
    color: #47a6e1;
  }

  .el-year-table td.today .cell {
    color: #47a6e1;
    font-weight: 400;
  }

  .el-year-table td.disabled .cell {
    // background-color: transparent;
    cursor: not-allowed;
    color: #d9d9d9;
  }

  // 日期时间段 样式重置
  &.el-date-range-picker.has-sidebar {
    width: auto;
  }

  &.el-date-range-picker {
    .el-picker-panel__shortcut {
      &:nth-child(2) {
        margin-left: 76%;
      }
    }

    .el-date-table td.end-date span,
    .el-date-table td.start-date span {
      background: rgba(19, 141, 217, 1);

      &:hover {
        color: #fff;
      }
    }

    .el-date-table td.today.end-date span,
    .el-date-table td.today.start-date span {
      color: #fff;
    }

    .el-date-range-picker__header {
      margin-bottom: 5px;
      padding: 0px 10px;

      div {
        font-size: 14px;
        font-weight: 400;
      }
    }

    .el-date-range-picker__content {
      padding: 16px 0px 0px;
    }

    .el-date-table td.in-range div,
    .el-date-table td.in-range div:hover,
    .el-date-table.is-week-mode .el-date-table__row.current div,
    .el-date-table.is-week-mode .el-date-table__row:hover div {
      background-color: #eaf5fc;
    }
  }

  // 月份时间段 样式重置
  &.el-date-range-picker {
    .el-month-table td.start-date .cell,
    .el-month-table td.end-date .cell {
      color: #fff;
      font-weight: 400;
      background-color: #138dd9;
      &:hover {
        color: #fff !important;
      }
    }
    .el-month-table td.in-range div,
    .el-month-table td.in-range div:hover {
      background: #eaf5fc;
    }
  }
}

.common-data-picker-select {
  .el-input__prefix {
    left: auto;
    right: 5px;
  }

  &.el-input--medium .el-input__inner {
    height: 32px;
    line-height: 32px;
  }

  &.el-input--prefix .el-input__inner {
    padding-left: 10px;
  }

  &.el-input--medium .el-input__icon {
    line-height: 32px;
  }

  &.el-input--medium .el-input__inner,
  &.el-range-editor--medium.el-input__inner {
    padding: 0px 10px;
    height: 32px;
    line-height: 32px;
  }

  &.el-input--medium .el-input__icon {
    line-height: 32px;
  }

  &.el-date-editor {
    .el-input__prefix {
      left: auto;
      right: 5px;
    }
  }

  &.el-range-editor--medium .el-range__close-icon,
  &.el-range-editor--medium .el-range__icon {
    line-height: 32px;
  }

  &.el-date-editor .el-range__icon,
  &.el-date-editor .el-range__close-icon {
    float: none;
    position: absolute;
    right: 5px;
  }

  &.el-range-editor--medium .el-range-separator {
    line-height: 31px;
    width: 10%;
  }

  &.el-range-editor--medium .el-range-input {
    font-size: 14px;
    // text-align: left;
  }
}
</style>
