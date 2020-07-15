<template>
  <div class="cost-container">
    <Upload-Excel @saveUploadClick="saveUploadClick" :active.sync="active"></Upload-Excel>
    <Load-View :loadShow.sync="loadShow" :percentage="percentage"></Load-View>
  </div>
</template>
<script>
import UploadExcel from "../components/UploadExcel/index";
import LoadView from "../components/LoadView/index";
// import { uploadRequest } from "../utils/excelRequest";
export default {
  components: {
    UploadExcel,
    LoadView
  },
  data() {
    return {
      loadShow: false,
      percentage: 0,
      active: 1
    };
  },
  created() {},
  methods: {
    saveUploadClick() {
      this.loadShow = true;
      //调用接口，导入数据
      // uploadRequest(
      //   data,
      //   "/pay_items_category/uploadExcelByBatchId",
      //   res => {
      //     const loaded = res.loaded;
      //     const total = res.total;
      //     _this.$nextTick(() => {
      //       _this.percentage = (loaded / total) * 100;
      //     });
      //   },
      //   res => {
      //     _this.tableData = res.data;
      //     _this.active = 2;
      //     _this.loadShow = false;
      //   }
      // );
    }
  }
};
</script>