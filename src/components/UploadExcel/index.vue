<template>
  <div class="upload-contaior">
    <el-steps :active="active" align-center>
      <el-step title="步骤1" description="选择文件"></el-step>
      <el-step title="步骤2" description="数据校验"></el-step>
      <el-step title="步骤3" description="结果查询"></el-step>
    </el-steps>
    <div v-if="active === 1">
      <input
        id="excel-upload-input"
        ref="excel-upload-input"
        type="file"
        accept=".xlsx, .xls, .csv"
        class="c-hide"
        @change="handkeFileChange"
      />
      <div id="drop" class="drop">
        <span class="iconfont iconcailiaoshangchuan-01" @click="handleUpload">文件</span>

        <div class="drop-tit">
          {{ dropTit }}
          <span class="drop-tit-s">
            （仅支持
            <span class="drop-tit-y">xlsx</span>、
            <span class="drop-tit-y">csv</span>格式）
          </span>
        </div>
      </div>
      <div class="drop-file" v-if="fileName">
        <div class="drop-file-left">
          <span class="iconfont iconfuzhi-01"></span>
        </div>
        <div class="drop-file-right">
          <span>{{ fileName }}</span>
          <div class="drop-progress">
            <div class="drop-progress-bar" :style="{ width: percentage + '%' }"></div>
          </div>
          <div
            class="drop-progress-tit"
            :class="{ active: percentage === 100 }"
          >{{ percentage | format }}</div>
          <!-- <el-progress v-if="percentage" :stroke-width="2" :percentage="percentage" :format="format"></el-progress> -->
        </div>
        <div class="drop-flie-del" v-if="status">
          <span class="el-icon-error" @click="dropDel"></span>
        </div>
      </div>
      <div class="drop-footer">
        <el-button size="mini" @click="closeUploadClick">取消</el-button>
        <el-button type="primary" size="mini" @click="saveUploadClick" v-if="status">下一步</el-button>
      </div>
    </div>
    <div v-if="active === 2" class="dome-active2">
      <div class="dome-he">
        您上传的文件
        <span class="span-yellow">{{ fileName }}</span> 中有
        <span class="span-red">{{ tableData.errList.length }}条</span>数据错误，也可以标记下载修改
      </div>
      <div class="dome-table"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Number,
      default: 1
    },
    tableData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    columns: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      page: {
        show: false,
        load: false,
        scrollTop: 0, // 初始化scrollTop
        visiable: false // 默认不显示
      },
      options: {
        hoverSelect: false,
        select: false,
        stripe: true,
        border: false,
        maxHeight: 500
      },
      loading: false,
      dropTit: "点击上传文件",
      fileName: "",
      itemFile: "",
      percentage: 0,
      count: 0,
      excelData: {
        header: null,
        results: null
      },
      status: false,
      raf: null // 接收定时器
    };
  },
  filters: {
    format(percentage) {
      return percentage === 100 ? "上传成功" : `${percentage}%`;
    }
  },
  computed: {},
  methods: {
    handleUpload() {
      document.getElementById("excel-upload-input").click();
    },
    handkeFileChange(e) {
      const files = e.target.files;
      this.itemFile = files[0]; // only use files[0]

      if (!this.itemFile) {
        this.$tipsBox.message("error", "未上传任何文件");
        return;
      }
      this.fileName = this.itemFile.name;
      this.dropTit = "正在上传";
      this.animationController();
    },
    animationController() {
      this.count++;
      this.percentage = Math.floor((this.count * 100) / 10);

      if (this.percentage >= 100) {
        this.status = true;
        this.dropTit = "文件已上传";
        return;
      }
      // this.rotate = Math.floor(this.count * 100 / this.duration * 60);
      this.raf = requestAnimationFrame(this.animationController);
    },
    dropDel() {
      this.$confirm("您确定删除" + this.fileName + "吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.count = 0;
          this.percentage = 0;
          this.status = false;
          this.dropTit = "点击上传文件";
          this.fileName = "";
          this.count = 0;
          cancelAnimationFrame(this.raf);
          this.raf = null;
          this.$refs["excel-upload-input"].value = null;
        })
        .catch(() => {});
    },
    closeUploadClick() {
      // 取消
      this.$router.back(-1);
      // this.$emit('closeUploadClick')
    },
    saveUploadClick() {
      // 下一步
      const fileFormData = new FormData();
      // filename是键，file是值，就是要传的文件
      fileFormData.append("file", this.itemFile);

      this.$emit("saveUploadClick", fileFormData);
    }
  },
  destroyed() {
    this.count = 0;
    cancelAnimationFrame(this.raf);
    this.raf = null;
  }
};
</script>

<style lang="scss">
.upload-contaior {
  padding-top: 40px;
  position: relative;
  .el-steps {
    .el-step__icon.is-text {
      border: 1px solid;
    }
    .el-step__line {
      background-color: #d9d9d9;
    }
    .el-step.is-center .el-step__line {
      left: 61%;
      right: -38%;
    }
    .el-step__main {
      color: #8c8c8c;
      margin-top: 5px;
    }
    .el-step__title {
      font-size: 14px;
      line-height: 26px;
    }
    .el-step__description {
      font-size: 12px;
    }

    .el-step__head.is-finish {
      color: #fff;
      border-color: #138dd9;
      background: transparent;
      .el-step__icon.is-text {
        background: #138dd9;
      }
    }
    .el-step__title.is-finish {
      color: #262626;
    }
    .el-step__description.is-finish {
      color: #595959;
    }
    .el-step__head.is-process,
    .el-step__head.is-wait {
      color: #d9d9d9;
      border-color: #d9d9d9;
    }
    .el-step__title.is-process,
    .el-step__title.is-wait {
      font-weight: 400;
      color: #8c8c8c;
    }
    .el-step__description.is-process,
    .el-step__description.is-wait {
      color: #8c8c8c;
    }
  }
}

.drop-tit {
  color: #8c8c8c;
  font-size: 18px;
  margin-top: 10px;
  .drop-tit-s {
    color: #bfbfbf;
  }
  .drop-tit-y {
    color: #ff9101;
  }
}
#excel-upload-input {
  display: none;
  z-index: -9999;
}
.drop-file {
  // line-height: 160px;
  padding-top: 40px;
  margin: 0 auto;
  text-align: center;
  & > div {
    display: inline-block;
  }
  .drop-file-left {
    padding-right: 16px;
    .iconfont {
      font-size: 42px;
      color: #4976ba;
    }
  }
  .drop-flie-del {
    position: relative;
    top: -12px;
    padding-left: 10px;
    color: #d9d9d9;
    span {
      cursor: pointer;
      &:hover,
      &:focus {
        color: #e2231a;
      }
    }
  }
  .drop-file-right {
    height: 45px;
    text-align: left;

    .el-progress-bar {
      padding-right: 0;
      margin-right: 0;
    }
    .drop-progress {
      width: 100%;
      height: 2px;
      background: #e8e8e8;
      overflow: hidden;
      position: relative;
      vertical-align: middle;
      margin: 2px 0 5px 0;
    }
    .drop-progress-tit {
      font-size: 12px;
      color: #262626;
    }
    .drop-progress-tit.active {
      color: #6cc902;
    }
    .drop-progress-bar {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background-color: #138dd9;
      text-align: right;
      border-radius: 100px;
      line-height: 1;
      white-space: nowrap;
      transition: width 0.6s ease;
    }
    .el-progress__text {
      display: block;
      margin-left: 0;
      font-size: 12px !important;
    }
  }
}
#drop {
  padding-top: 60px;

  // border: 2px dashed #bbb;
  width: 600px;

  // line-height: 160px;
  margin: 0 auto;
  // font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
  .iconfont {
    font-size: 68px;
    color: #138dd9;
    cursor: pointer;
  }
}
.drop-footer {
  position: fixed;
  bottom: 0px;
  left: 95px;
  right: 0;
  text-align: center;
  z-index: 1;
  padding-bottom: 20px;

  background: #fff;
}
.hideSidebar {
  .drop-footer {
    left: 235px;
  }
}
.dome-he {
  margin: 30px 0;
  font-size: 18px;
  color: #595959;
  .span-yellow {
    color: #ff9101;
  }
  .span-red {
    color: #e2231a;
  }
}
</style>
