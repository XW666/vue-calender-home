<template>
  <div class="reportdive-container staffData-content">
    <Table-View
      :tableList="tableList"
      :columns="columns"
      :options="options"
      :page="page"
      :setHandleMouse="setHandleMouse"
      :setSpanMethod="setSpanMethod"
      :changeSelection="changeSelection"
    ></Table-View>
  </div>
</template>

<script>
import TableView from "../components/TableView";

export default {
  name: "calculationResults",
  components: {
    TableView
  },
  data() {
    return {
      tableList: [
        {
          id: "12987122",
          eeName: "王小虎1",
          idNumber: "539",
          payrollGroupCn: "4.1",
          legalEntityDesc: 15,
          erEeCode: "12987122",
          hiringDate: 1603245627587
        },
        {
          id: "12987122",
          eeName: "王小虎1",
          idNumber: "539",
          payrollGroupCn: "4.1",
          legalEntityDesc: 15,
          erEeCode: "12987122",
          hiringDate: 1603245627587
        },
        {
          id: "12987123",
          eeName: "王小虎1",
          idNumber: "539",
          payrollGroupCn: "4.1",
          legalEntityDesc: 15,
          erEeCode: "12987122",
          hiringDate: 1603245627587
        },
        {
          id: "12987124",
          eeName: "王小虎2",
          idNumber: "539",
          payrollGroupCn: "4.1",
          legalEntityDesc: 15,
          erEeCode: "12987122",
          hiringDate: 1603245627587
        },
        {
          id: "12987125",
          eeName: "王小虎2",
          idNumber: "539",
          payrollGroupCn: "4.1",
          legalEntityDesc: 15,
          erEeCode: "12987122",
          hiringDate: 1603245627587
        },
        {
          id: "12987126",
          eeName: "王小虎",
          idNumber: "539",
          payrollGroupCn: "4.1",
          legalEntityDesc: 15,
          erEeCode: "12987122",
          hiringDate: 1603245627587
        }
      ],
      selectList: [], // 当前选中列表数据
      columns: [
        {
          name: "姓名",
          prop: "eeName",
          type: "text",
          width: 217,
          tooltip: true
        },
        {
          name: "薪资组",
          prop: "payrollGroupCn",
          type: "text",
          width: 164,
          tooltip: true
        },
        {
          name: "薪资周期",
          prop: "payrollGroupCn",
          type: "text",
          width: 192,
          tooltip: true
        },
        {
          name: "法人实体",
          prop: "legalEntityDesc",
          type: "text",
          width: 192,
          tooltip: true
        },
        {
          name: "实发工资",
          prop: "netPay",
          type: "text",
          width: 136,
          tooltip: true
        },
        {
          name: "应发工资",
          prop: "idNumber",
          type: "text",
          width: null,
          tooltip: true
        }
      ],
      options: {
        hoverSelect: false,
        select: true,
        stripe: true,
        border: true,
        spanmethod: true, // 是否合并表格行
        cellWidth: null
      },
      page: {
        show: true,
        load: true,
        scrollTop: 0, // 初始化scrollTop
        visiable: false // 默认不显示
      },

      OrderIndexArr: {}, // 存放合并数据行的索引
      spanArr: [], // 存放每一行的合并记录
      isArr: "" // isArr是spanArr的索引
    };
  },
  created() {
    this.getTableArr();
    this.getSpanArr();
  },
  mounted() {},
  methods: {
    getTableArr() {
      // 获取合并数据行的索引
      const orderObj = {};
      this.tableList.forEach((element, index) => {
        const id = element.eeName;
        if (orderObj[id]) {
          orderObj[id].push(index);
        } else {
          orderObj[id] = [];
          orderObj[id].push(index);
        }
      });
      this.OrderIndexArr = orderObj;
    },
    setHandleMouse(row) {
      // 合并行的表格，鼠标移入事件
      let hoverOrderArr = [];
      for (const key in this.OrderIndexArr) {
        if (key === row.eeName) {
          hoverOrderArr = this.OrderIndexArr[row.eeName];
        }
      }
      return hoverOrderArr;
    },
    setSpanMethod(rowIndex, columnIndex) {
      // 合并行
      if (columnIndex <= 1) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    getSpanArr() {
      // 合并行的规则
      const data = this.tableList;
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.isArr = 0;
        } else {
          // 判断当前元素与上一个元素是否相同  inAccessCode（批次字段）
          if (data[i].eeName === data[i - 1].eeName) {
            this.spanArr[this.isArr] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.isArr = i;
          }
        }
      }
    },
    changeSelection(e, row) {
      // 合并行的选中事件
      this.tableList.forEach(item => {
        if (item.eeName === row.eeName) {
          this.$set(item, "checkedStatus", e);
        }
      });
    }
  }
};
</script>
<style lang="scss">
</style>
