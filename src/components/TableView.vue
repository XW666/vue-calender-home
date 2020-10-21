<template>
  <div>
    <el-table
      :row-class-name="tableRowClassName"
      :span-method="objectSpanMethod"
      v-loading="options.loading"
      v-loadmore="loadMore"
      :data="tableList"
      :max-height="options.maxHeight"
      :stripe="options.stripe"
      ref="multipleTable"
      tooltip-effect="dark"
      id="table"
      style="width: 100%"
      :border="options.border"
      :header-cell-style="headerStyle"
      :cell-style="cellStyle"
      :select-on-indeterminate="false"
      @selection-change="selectChange"
      @row-click="rowClick"
      @row-dblclick="rowDblclick"
      @cell-mouse-enter="handleMouse"
      @cell-mouse-leave="handleMouseLeve"
    >
      <!-- 列样式调整 -->
      <!-- <el-table-column width="10" fixed="left"></el-table-column> -->

      <!-- 多选框 -->
      <el-table-column
        width="45"
        type="selection"
        v-if="options.select"
        fixed="left"
      ></el-table-column>

      <!-- hover 序号会有多选框 -->
      <el-table-column width="45" fixed="left" v-if="options.hoverSelect">
        <template slot="header" slot-scope="scope">
          <div class="el-checkbox-wrapTwo">
            <el-checkbox
              class="el-checkbox"
              :indeterminate="isIndeterminate"
              v-model="totalCheckedStatus"
              @change="allCheckboxChange"
            ></el-checkbox>
          </div>
        </template>
        <template slot-scope="scope">
          <div
            class="el-checkbox-wrap"
            :class="{ 'el-checkbox-hide': scope.row.checkedStatus }"
          >
            <span class="el-checkbo-title">{{ scope.$index + 1 }}</span>
            <el-checkbox
              class="el-checkbox"
              v-model="scope.row.checkedStatus"
              @change="options.spanmethod && toggleSelection($event, scope.row)"
            ></el-checkbox>
          </div>
        </template>
      </el-table-column>

      <!-- 序号 -->
      <el-table-column
        v-if="options.indexNum"
        type="index"
        label="序号"
        fixed="left"
      ></el-table-column>

      <!-- 列 -->
      <div v-for="(item, index) in columns" :key="index">
        <!-- 其他 -->
        <template v-if="item.type == 'text'">
          <el-table-column
            :label="item.name"
            :show-overflow-tooltip="item.tooltip"
            :width="item.width"
          >
            <template slot-scope="scope">
              <template v-if="item.render">
                <ExpandDom
                  :column="item"
                  :row="scope"
                  :render="item.render"
                  :index="index"
                />
              </template>
              <template v-else>
                <span v-if="!item.formatter">{{ scope.row[item.prop] }}</span>
                <template v-if="item.formatter">
                  <span v-html="item.formatter(scope.row, item)" />
                </template>
              </template>
            </template>
          </el-table-column>
        </template>

        <!-- 图片 -->
        <template v-if="item.type == 'img'">
          <el-table-column
            :label="item.name"
            :show-overflow-tooltip="item.tooltip"
            :width="item.width"
          >
            <template slot-scope="scope">
              <div class="imgBox">
                <img class="img" :src="scope.row[item.prop]" alt />
              </div>
            </template>
          </el-table-column>
        </template>
        <!-- 可编辑 -->
        <!-- @blur="inputBlue(item.required,scope.row[item.prop],scope.row,scope.$index)" -->
        <template v-if="item.type == 'edit'">
          <el-table-column
            :label="item.name"
            :show-overflow-tooltip="item.tooltip"
            :width="item.width"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.isSet">
                <el-input
                  size="mini"
                  :class="{ inputPrompt: scope.row[item.prop + 'Show'] }"
                  clearable
                  v-model="scope.row[item.prop]"
                  :placeholder="item.placeholder"
                  @blur="
                    inputBlue(
                      item.required,
                      scope.row[item.prop],
                      item.prop,
                      scope.row,
                      item.language
                    )
                  "
                ></el-input>
              </template>
              <template v-else>
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row[item.prop]"
                  placement="top"
                  :disabled="scope.row[item.prop] | ellipsis"
                >
                  <span
                    class="ellipsis"
                    v-show="!scope.row.edit[item.prop]"
                    @click="
                      (scope.row.edit[item.prop] = true),
                        (scope.row.isEdit = true)
                    "
                    >{{ scope.row[item.prop] }}</span
                  >
                </el-tooltip>
                <el-input
                  v-show="scope.row.edit[item.prop]"
                  size="mini"
                  :class="{ inputPrompt: scope.row[item.prop + 'Show'] }"
                  clearable
                  @blur="
                    inputBlue(
                      item.required,
                      scope.row[item.prop],
                      item.prop,
                      scope.row,
                      item.language
                    )
                  "
                  v-model="scope.row[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <div class="popover-put" v-show="scope.row[item.prop + 'Show']">
                <p class="el-popconfirm__main">
                  <i
                    class="el-popconfirm__icon el-icon-info"
                    style="color: red;"
                  ></i>
                  {{ scope.row[item.prop + "Name"] }}
                </p>
              </div>
            </template>
          </el-table-column>
        </template>
        <!-- 下拉选择 -->
        <template v-if="item.type == 'select'">
          <el-table-column
            :label="item.name"
            :show-overflow-tooltip="item.tooltip"
            :width="item.width"
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row[item.prop]"
                :class="{ inputPrompt: scope.row[item.prop + 'Show'] }"
                :placeholder="item.placeholder"
                class="table-select"
                size="mini"
                @visible-change="
                  selectInputBlue(
                    $event,
                    item.required,
                    scope.row[item.prop],
                    item.prop,
                    scope.row
                  )
                "
                @change="
                  selectTypeChange(
                    scope.row[item.prop],
                    scope.row,
                    scope.$index,
                    item.prop
                  )
                "
                :style="{
                  width: item.selectWidth ? item.selectWidth + 'px' : '100%'
                }"
              >
                <el-option
                  v-for="(option, index) in item.selectList"
                  :key="index"
                  :label="option.lable"
                  :value="option.value"
                ></el-option>
              </el-select>
              <div class="popover-put" v-show="scope.row[item.prop + 'Show']">
                <p class="el-popconfirm__main">
                  <i
                    class="el-popconfirm__icon el-icon-info"
                    style="color: red;"
                  ></i>
                  {{ scope.row[item.prop + "Name"] }}
                </p>
              </div>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="item.type == 'switch'">
          <el-table-column
            :label="item.name"
            :show-overflow-tooltip="item.tooltip"
            :width="item.width"
          >
            <template slot-scope="scope">
              <el-switch
                class="switchStyle"
                v-model="scope.row[item.prop]"
                active-color="#47A6E1"
                active-text="开"
                inactive-color="#D9D9D9"
                inactive-text="关"
                @change="
                  switchChange(scope.row[item.prop], scope.row, scope.$index)
                "
              ></el-switch>
            </template>
          </el-table-column>
        </template>
        <!-- 操作列 -->
        <template v-else-if="item.type == 'state'">
          <el-table-column
            :label="item.name"
            fixed="right"
            :width="options.cellWidth"
            :show-overflow-tooltip="item.tooltip"
          >
            <template slot-scope="scope">
              <template v-if="item.render">
                <render-button
                  :item="item"
                  :row="scope.row"
                  :render="item.render"
                  :index="index"
                ></render-button>
              </template>

              <template v-else>
                <span>{{ scope.row[item.prop] }}</span>
              </template>
            </template>
          </el-table-column>
        </template>
      </div>
    </el-table>

    <el-pagination
      class="page"
      v-if="page.show"
      @size-change="pageSizeChange"
      @current-change="pageIndexChange"
      :page-size="page.pageSize"
      :page-sizes="
        page.pageSizeArr && page.pageSizeArr.length > 0
          ? page.pageSizeArr
          : [10, 20, 50]
      "
      :current-page="page.pageIndex"
      layout="total,sizes, prev, pager, next,jumper"
      :total="page.total"
      style="margin-top: 20px;text-align: right"
    ></el-pagination>
  </div>
</template>
<script>
import { onpaste, onpasteChines, getTextWidth } from "@/utils/common";
import ExpandDom from "@/components/ExpandDom";
import { getStore } from "@/utils/common";
/**
 * tableList  表格行的参数
 */
/**
 * options：表格参数
 *   maxHeight ： 表格最大高度 Number 默认700
 *   stripe ： 是否为斑马纹 默认true
 *   loading ： 请求数据的加载动画 默认false
 *   select ： 是否支持列表项选中功能 默认false
 *   hoverSelect: 是否支持列表序号hover上去有选中的效果，同时这列头部会有checkbox全选 默认false
 *   border: 是否为边框表格 默认true
 *   indexNum: 是否显示序号列 默认false
 */
/**
 * columns：表格列
 *   property ： 对应列内容的字段名 【必传】
 *   label ： 显示的标题 【必传】
 *   list: 一列展示多行时
 *   render： 针对操作列，按钮去填的
 *   tooltip:超出部分是否隐藏
 */
/**
 * page ： 分页信息
 *   show ： 控制分页是否显示
 *   total ： 表格数据总条数
 *   pageIndex ： 当前页码
 *   pageSize ： 每页显示条目个数
 *   pageSizeArr： 控制表格的每页显示条目个数 默认[10, 20, 50]
 */
/*
 *  headerStyle：表格头部样式
 *  cellStyle：表格行类样式
 */
export default {
  props: {
    tableHeader: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 表格合并行后，单元格移入事件
    setHandleMouse: {
      type: Function
    },
    // 表格合并行的规则
    setSpanMethod: {
      type: Function
    },
    // 合并行后，点击选中事件
    changeSelection: {
      type: Function
    },
    // 表格参数
    options: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 表格列
    columns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 表格数据
    tableList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    page: {
      type: Object,
      default: () => {
        return {};
      }
    },
    propSelect: {
      type: Array,
      default: () => {
        return [];
      }
    },
    carrySelect: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      headerStyle1: {
        background: "#FAFAFA",
        padding: "7px 0 7px 30px",
        "font-size": "14px",
        color: "#595959",
        "font-weight": 500
      },

      headerStyle2: {
        background: "#FAFAFA",
        padding: "7px 0",
        "font-size": "14px",
        color: "#595959",
        "font-weight": 500
      },
      cellStyle1: {
        padding: "7px 0",
        "font-size": "13px",
        color: "#595959",
        "font-weight": 400,
        position: "relative"
        // "border-bottom": "1px solid #E8E8E8"
      },
      cellStyle2: {
        padding: "7px 0 7px 30px",
        "font-size": "13px",
        color: "#595959",
        "font-weight": 400,
        position: "relative"
        // "border-bottom": "1px solid #E8E8E8"
      },
      isIndeterminate: false,
      totalCheckedStatus: false,
      interval: null,
      tableScrollTop: 0,
      rowIndex: "-1", // 合并行当前索引
      hoverOrderArr: [] // 当前移入行的索引集合
    };
  },
  watch: {
    tableList: {
      handler() {
        if (this.options.hoverSelect) {
          var newArry = this.tableList.filter(item => item.checkedStatus);
          this.$emit("selectChange", newArry);
          if (newArry.length > 0) {
            if (newArry.length === this.tableList.length) {
              this.isIndeterminate = false;
              this.totalCheckedStatus = true;
            } else {
              this.isIndeterminate = true;
              this.totalCheckedStatus = false;
            }
          } else {
            this.isIndeterminate = false;
            this.totalCheckedStatus = false;
          }
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    // === 表格参数默认值
    this.$parent.options = Object.assign(
      {
        maxHeight: 500,
        stripe: true,
        loading: false,
        mutiSelect: true,
        border: true,
        indexNum: false,
        cellWidth: null
      },
      this.options
    );
  },
  directives: {
    loadmore: {
      bind(el, binding) {
        const selectWrap = el.querySelector(".el-table__body-wrapper");
        selectWrap.addEventListener("scroll", function() {
          // scrollHeight：指元素的总高度，包含滚动条中的内容
          // scrollTop：当元素出现滚动条时，内容向上滚动的距离
          // clientHeight：元素可视区域的大小
          const scrollDistance =
            this.scrollHeight - this.scrollTop - this.clientHeight;

          if (Math.floor(scrollDistance) <= 0 && this.scrollTop > 0) {
            // 到底了
            binding.value();
          }
        });
      }
    }
  },
  filters: {
    ellipsis(value) {
      const width = getTextWidth(value);
      if (width > 17) {
        return false;
      }
      return true;
    }
  },
  computed: {},
  components: {
    ExpandDom,
    renderButton: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        item: {
          type: Object,
          default: null
        }
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index
        };
        // if (ctx.props.item) {
        //   params.item = ctx.props.item;
        // }
        return ctx.props.render(h, params);
      }
    }
  },
  mounted() {},
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 合并行
      if (this.options.spanmethod) {
        return this.setSpanMethod(rowIndex, columnIndex);
      }
    },
    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.rowIndex = rowIndex;
      // 按照条件给tr添加class名字
      if (this.options.trAddClass) {
        if (Number(row.state) === Number(this.options.trAddClass.keyVal)) {
          return this.options.trAddClass.addClassName;
        }
      }
      if (this.options.spanmethod) {
        // 合并行后添加class
        let className = "row-no-background";

        if (this.hoverOrderArr.includes(rowIndex)) {
          className = "row-no-background success-row";
        }
        return className;
      }
    },
    headerStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        return this.headerStyle2;
      } else {
        return this.headerStyle1;
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        return this.cellStyle1;
      } else {
        return this.cellStyle2;
      }
    },
    // 多选
    selectChange(val) {
      this.$emit("selectChange", val);
    },
    // 表格点击的时候
    rowClick(row) {
      this.$emit("rowClick", row);
    },
    // 表格双击的时候
    rowDblclick(row) {
      this.$emit("rowDblclick", row);
    },
    // 单元格移入事件
    handleMouse(row, column, cell, event) {
      if (this.options.spanmethod) {
        this.rowIndex = row.rowIndex;
        this.hoverOrderArr = this.setHandleMouse(row);
      }
    },

    // 单元格移除事件
    handleMouseLeve() {
      if (this.options.spanmethod) {
        this.hoverOrderArr = [];
        this.rowIndex = "-1";
      }
    },
    inputBlue(required, value, pro, data, language) {
      // 输入框失去焦点事件
      if (data.copyData) {
        data[pro] = data[pro] || data.copyData[pro];
      }

      if (!data[pro].trim()) {
        data[pro + "Show"] = true;
        data[pro + "Name"] = "内容不能为空";
        if (data.edit) data.edit[pro] = true;
        return;
      }
      if (language === "cn") {
        data[pro + "Show"] = onpasteChines(data[pro]);
        data[pro + "Name"] = onpasteChines(data[pro]) ? "请输入中文" : "";
        if (data.edit) data.edit[pro] = onpasteChines(data[pro]);
        return;
      }
      if (language === "en") {
        if (data.edit) data.edit[pro] = !onpaste(data[pro]);
        data[pro + "Show"] = !onpaste(data[pro]);
        data[pro + "Name"] = !onpaste(data[pro]) ? "请输入英文" : "";

        return;
      }

      // this.$emit("inputBlue", item, index);
    },
    selectInputBlue(e, required, value, pro, data) {
      if (!e) {
        if (required && value === "") {
          data[pro + "Show"] = true;
          data[pro + "Name"] = "请选择方式";
        }
      }
    },
    // 合并行后，点击选中，默认合并的其他行数据选中状态
    toggleSelection(e, row) {
      this.changeSelection(e, row);
    },
    switchChange(prop, data, index) {
      data.isEdit = true;
    },
    selectTypeChange(value, data, index, pro) {
      data.isEdit = true;
      data[pro + "Show"] = false;
    },
    pageSizeChange(val) {
      // // 显示条数改变
      this.$emit("pageSizeChange", val);
    },
    pageIndexChange(val) {
      ///分页
      this.$emit("pageIndexChange", val);
    },
    loadMore() {
      // 滚动事件
      if (this.page.load) {
        this.pageIndexChange();
      }
    },
    // 假如是hover 上去的复选框 ， 头部全选的事件
    allCheckboxChange(value) {
      if (!this.isIndeterminate && this.totalCheckedStatus) {
        this.$set(this, "totalCheckedStatus", value);
        this.tableList.forEach(item => {
          this.$set(item, "checkedStatus", true);
        });
      } else {
        this.$set(this, "totalCheckedStatus", false);
        this.tableList.forEach(item => {
          this.$set(item, "checkedStatus", false);
        });
      }
    }
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
};
</script>
<style lang="scss">
// .el-table__fixed-right-patch {
//   background: rgb(250, 250, 250);
// }
.el-table__fixed-right,
.el-table__fixed {
  box-shadow: none;
}
.el-table__body tbody tr:hover > td {
  background-color: #eaf5fc !important;
}
.el-table__body tbody tr.hover-row > td {
  background-color: #eaf5fc !important;
}
.el-table__body tbody tr.row-no-background > td {
  background: transparent !important;
}

.el-table__body tbody tr.success-row > td {
  background-color: #eaf5fc !important;
}
.el-table th.el-table-column--selection {
  padding: 7px 0 !important;
}
.el-table th > .cell {
  padding-right: 0;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid #e8e8e8;
}
.el-table th.is-leaf {
  border-top: 1px solid #e8e8e8;
}
.el-table {
  border-left: 1px solid #e8e8e8;
  border-top: none;
  border-right: 1px solid #e8e8e8;
  border-bottom: none;
}
.el-table td > .cell {
  .el-input--mini .el-input__suffix {
    top: -1px;
  }
}
.inputPrompt {
  .el-input__inner {
    border: 1px solid #e2231a;
  }
}
.table-select.el-select {
  .el-input--medium .el-input__suffix {
    top: 0;
  }
  .el-input.is-focus .el-input__inner {
    border-color: transparent;
  }
  .el-input__inner {
    border-color: transparent;
    background-color: transparent;
    outline: none;
    padding: 0;
    font-size: 13px;
    &:focus {
      border-color: transparent;
    }
  }
}
</style>
<style scoped lang="scss">
h4 {
  display: inline-block;
}
.tableHeader {
  margin-top: 10px;
  padding: 20px;
  background: #f5f5f5;
}
.imgBox {
  width: 100px;
  height: 100px;
}
.imgBox .img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.page {
  text-align: center;
  line-height: 18px;
  color: #595959;
  font-size: 12px;
  font-weight: 400;
  padding: 10px 0;

  button {
    padding: 4px;
  }
}
.page button {
  color: #595959;
  font-size: 12px;
  font-weight: 400;
}
// .item-set {
//   position: relative;
// }
.popover-put {
  // position: absolute;
  // zoom: 0.001;
  // webkit-transform: scale(0.7);
  // -o-transform: scale(0.7);
  // transform: scale(0.7);
  // background: #fff;
  // min-width: 120px;
  // border-radius: 4px;
  // border: 1px solid #ebeef5;
  // padding: 3px 10px;
  // z-index: 2000;
  color: #606266;
  // line-height: 1.4;
  // text-align: justify;
  font-size: 12px;

  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  // word-break: break-all;
  // top: -24px;
  .popper__arrow {
    position: absolute;
    bottom: -14px;
    display: block;
    width: 0;
    height: 0;
    margin-right: 3px;
    border-color: transparent;
    border-style: solid;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      display: block;
      left: 6px;
      width: 0;
      height: 0;
      border-color: transparent;
      display: block;
      border-style: solid;
      margin-left: -6px;
      border-bottom-width: 0;
      border-top-color: #fff;
      border-width: 6px;
    }
  }
}
.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
}
.el-checkbox-wrapTwo {
  width: 25px;
  text-align: center;
  margin-left: -3px;
}
.el-checkbox-wrap {
  width: 25px;
  text-align: center;
  .el-checkbox {
    display: none;
  }
  .el-checkbo-title {
    display: block;
  }
  &:hover {
    .el-checkbox {
      display: block;
    }
    .el-checkbo-title {
      display: none;
    }
  }
  &.el-checkbox-hide {
    .el-checkbox {
      display: block;
    }
    .el-checkbo-title {
      display: none;
    }
  }
}
</style>
