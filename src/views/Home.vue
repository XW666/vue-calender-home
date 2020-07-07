<template>
  <div class="home">
    <Seach-View :seachArry="seachArry" @resetClick="resetClick"></Seach-View>
    <Table-View
      ref="table"
      :tableList="tableList"
      :columns="columns"
      :options="options"
      :page="page"
      @pageIndexChange="pageIndexChange"
      @pageSizeChange="pageSizeChange"
      @selectChange="selectChange"
      @inputBlue="inputBlue"
    ></Table-View>
  </div>
</template>

<script>
// @ is an alias to /src
import SeachView from "../components/SeachView";
import TableView from "../components/TableView";
import { parseTime, randomNumberGenerator } from "../utils/common";
const payType = [
  {
    lable: "无",
    value: 0
  },
  {
    lable: "加项",
    value: 1
  },
  {
    lable: "减项",
    value: 2
  }
];
export default {
  components: {
    SeachView,
    TableView
  },
  data() {
    return {
      tableList: [
        {
          created: 1589540000000,
          operator: "trdp-Fiona",
          categorycn: "基本工资",
          categorycode: 102,
          categoryen: "Fixed Salary Item",
          piid: 1,
          carryType: 1,
          updated: 1592383059022,
          edit: {
            categorycn: false,
            categoryen: false
          },
          copyData: {
            categorycn: "基本工资",
            categoryen: "Fixed Salary Item"
          },
          isEdit: false,
          categorycnShow: false,
          categoryenShow: false,
          categorycnName: "",
          categoryenName: ""
        },
        {
          created: 1589540000000,
          operator: "trdp-Fiona",
          categorycn: "基本工资",
          categorycode: 102,
          categoryen: "Fixed Salary Item",
          piid: 2,
          carryType: 1,
          updated: 1592383059022,
          edit: {
            categorycn: false,
            categoryen: false
          },
          copyData: {
            categorycn: "基本工资",
            categoryen: "Fixed Salary Item"
          },
          isEdit: false,
          categorycnShow: false,
          categoryenShow: false,
          categorycnName: "",
          categoryenName: ""
        },
        {
          created: 1589540000000,
          operator: "trdp-Fiona",
          categorycn: "基本工资",
          categorycode: 102,
          categoryen: "Fixed Salary Item",
          piid: 3,
          carryType: 1,
          updated: 1592383059022,
          edit: {
            categorycn: false,
            categoryen: false
          },
          copyData: {
            categorycn: "基本工资",
            categoryen: "Fixed Salary Item"
          },
          isEdit: false,
          categorycnShow: false,
          categoryenShow: false,
          categorycnName: "",
          categoryenName: ""
        }
      ],
      columns: [
        {
          name: "科目分类编码",
          prop: "categorycode",
          type: "text",
          tooltip: true,
          required: false,
          disabled: true,
          render: this.renderUser
        },
        {
          name: "科目分类中文",
          prop: "categorycn",
          placeholder: "请输入中文",
          language: "cn",
          type: "edit",
          tooltip: false,
          required: false
        },
        {
          name: "科目分类英文",
          prop: "categoryen",
          placeholder: "请输入英文",
          language: "en",
          type: "edit",
          tooltip: false,
          required: false
        },
        {
          name: "进位方式",
          prop: "carryType",
          type: "select",
          placeholder: "请选择进位方式",
          selectList: payType,
          tooltip: false,
          required: true
        },
        {
          name: "操作用户",
          prop: "operator",
          type: "text",
          tooltip: true,
          disabled: true,
          required: false
        },
        {
          name: "最后操作日期",
          prop: "updated",
          type: "text",
          tooltip: true,
          formatter: row => {
            return parseTime(row.updated);
          }
        },
        {
          name: "操作",
          prop: "sale",
          key: "state",
          type: "state",
          render: (h, params) => {
            let data = params;

            if (params.row.isSet) {
              data.type = "isSet";
              return (
                <div>
                  <el-button
                    type="text"
                    size="mini"
                    class="renderText saveText"
                    nativeOnClick={() => this.editClick(data)}
                  >
                    保存
                  </el-button>
                </div>
              );
            } else {
              if (params.row.isEdit) {
                data.type = "isEdit";
                return (
                  <div>
                    <el-button
                      type="text"
                      size="mini"
                      class="renderText saveText"
                      nativeOnClick={e => this.editClick(e, data)}
                    >
                      保存
                    </el-button>
                    <el-button
                      type="text"
                      size="mini"
                      class="renderText"
                      nativeOnClick={() => this.detailsClick(data)}
                    >
                      明细
                    </el-button>
                  </div>
                );
              } else {
                return (
                  <div>
                    <el-button
                      type="text"
                      size="mini"
                      class="renderText"
                      nativeOnClick={() => this.editClick(data)}
                    >
                      修改
                    </el-button>
                    <el-button
                      type="text"
                      size="mini"
                      class="renderText"
                      nativeOnClick={() => this.detailsClick(data)}
                    >
                      明细
                    </el-button>
                  </div>
                );
              }
            }
          }
        }
      ],
      options: {
        select: true,
        stripe: true,
        border: false
      },
      page: {
        show: true,
        pageIndex: 1,
        pageSize: 10,
        total: 50
      },

      seachArry: [
        {
          value: "add",
          name: "添加",
          icon: "el-icon-plus",
          class: "",
          type: "primary"
        },
        {
          value: "del",
          name: "删除",
          icon: "el-icon-delete",
          class: "delete-btn",
          type: ""
        },
        {
          value: "save",
          name: "保存",
          icon: "",
          class: "default-btn",
          type: ""
        }
      ],
      selectList: [],
      isDisable: false //删除按钮在3秒内不能重复点击
    };
  },
  methods: {
    resetClick(item) {
      //按钮事件
      if (item.value == "add") {
        //添加
        this.addBtn();
      }
      if (item.value == "del") {
        //删除
        this.delBtn();
      }
    },
    addBtn() {
      let data = {
        payId: randomNumberGenerator(),
        updated: parseTime(new Date()),
        operator: "xw",
        categorycn: "",
        categoryen: "",
        categorycode: "",
        isSet: true,
        categorycnShow: false,
        categoryenShow: false,
        categorycnName: "",
        categoryenName: ""
      };
      // if (this.tableList.length && this.tableList[0].isSet) {
      //   this.$tipsBox.message("warning", "请先保存当前数据");
      //   return;
      // }
      this.tableList.unshift(data);
    },
    delBtn() {
      //删除
      if (this.isDisable) {
        return;
      }

      // 3秒后启用点击事件
      this.isDisable = true;
      setTimeout(() => {
        this.isDisable = false;
      }, 3000);

      if (!this.selectList.length) {
        this.$tipsBox.message("error", "请选择需要删除的数据");
        // promptAlert("warning", "请选择需要删除的数据");
        return;
      }
      let list = this.selectList.filter(item => {
        return item.isSet;
      });
      if (list.length === this.selectList.length) {
        //添加的删除
        let obj = {};
        list.forEach(item => {
          obj[item.payId] = item.payId;
        });
        this.tableList = this.tableList.filter(item => {
          if (item.isSet) {
            return item.payId !== obj[item.payId];
          }
          return item;
        });
        return;
      } else {
        //删除
      }
    },
    pageIndexChange(val) {
      //分页
    },
    pageSizeChange(val) {
      //条数
    },
    selectChange(val) {
      //全选
      this.selectList = val;
    },
    inputBlue(data, index) {
      //表格中的input失去焦点事件
      this.$set(this.tableList, index, data);
    },
    editClick(e, params) {
      //编辑

      console.log("ggg", e);
    },
    detailsClick(params) {
      //明细
      console.log(params);
    },
    renderUser(h, ctx) {
      let userList = "";
      return h("div", { class: "staff-user" }, [
        userList,
        h("div", { class: "staff-user-r" }, [
          h(
            "p",
            {
              class: "staff-user-r-title",
              on: { click: () => this.detailsClick(ctx.row) }
            },
            [h("span", null, ctx.row.categorycode)]
          )
        ])
      ]);
    }
  }
};
</script>
<style>
.staff-user-r-title {
  color: #138dd9;
  cursor: pointer;
}
.el-button--text.saveText {
  color: #6cc902;
}
</style>