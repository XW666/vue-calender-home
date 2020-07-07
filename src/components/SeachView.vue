<template>
  <el-row class="seach-center">
    <el-col :span="5" v-if="seachInputObj.inputShow">
      <div class="seach-put">
        <el-input
          :placeholder="seachInputObj.placeholder"
          size="small"
          clearable
          v-model="seachInputObj.seachValue"
          class="input-with-select"
        >
          <el-button slot="append" size="small" icon="iconfont iconsousuo-01" @click="paySeachBtn"></el-button>
        </el-input>
      </div>
    </el-col>
    <el-col :span="seachInputObj.inputShow ? 19 : 24">
      <el-button
        v-for="item in seachArry"
        :key="item.value"
        :class="item.class"
        :icon="item.icon"
        size="small"
        :type="item.type"
        @click="resetClick(item)"
      >{{item.name}}</el-button>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: {
    seachArry: {
      type: Array,
      default: () => {
        return [];
      }
    },
    seachInputObj: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    resetClick(item) {
      console.log(item);
      this.$emit("resetClick", item);
    },
    paySeachBtn() {
      //搜索
      this.$emit("paySeachBtn");
    }
  }
};
</script>
<style lang="scss">
.seach-center {
  margin-bottom: 16px;
  text-align: right;
  .seach-put {
    width: 200px;
  }
  .el-input-group__append {
    padding: 0;
    width: 32px;
    height: 32px;
    background-color: #138dd9;
    border: 1px solid #138dd9;
    color: #ffffff;
    position: relative;
    .el-button {
      margin: 0;
      position: absolute;
      top: -1px;
      width: 100%;
      height: 32px;
      right: 3px;
      background: #138dd9;
      border: none;
      border-radius: 0;

      // border-top-left-radius: 0;
      // border-bottom-left-radius: 0;
    }
  }
  .iconfont {
    font-size: 12px;
    margin-right: 5px;
  }
}
</style>