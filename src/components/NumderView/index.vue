<template>
  <div class="numder-contaior">
    <span class="number-top" :class="{'is-disabled': maxDisabled}" @click="upNumderClick">
      <i class="el-icon-caret-top"></i>
    </span>
    <span class="number-bottom" :class="{'is-disabled': minDisabled}" @click="downNumderClick">
      <i class="el-icon-caret-bottom"></i>
    </span>
    <div class="numder-cen">
      <span>{{numderValue}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    numderValue: {
      type: Number,
      default: 1
    },
    step: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {};
  },
  computed: {
    minDisabled() {
      return this.decrease(this.numderValue, this.step) < this.min;
    },
    maxDisabled() {
      return this.increase(this.numderValue, this.step) > this.max;
    }
  },
  created() {},
  mounted() {},
  methods: {
    decrease(val, step) {
      return val - step;
    },
    increase(val, step) {
      return val + step;
    },
    upNumderClick() {
      //向上
      if (this.maxDisabled) return;
      let num = this.numderValue + this.step;
      this.$emit("update:numderValue", num);
    },
    downNumderClick() {
      //向下
      if (this.minDisabled) return;
      let num = this.numderValue - this.step;
      this.$emit("update:numderValue", num);
    }
  }
};
</script>
<style lang="scss" scoped>
.numder-contaior {
  position: relative;
  display: inline-block;
  min-width: 100px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  &:hover {
    border-color: #47a6e1;
  }
  .numder-cen {
    text-align: center;
    padding: 7px 18px 7px 5px;
    &:hover {
      border-color: #d9d9d9 !important;
    }
  }

  .number-top,
  .number-bottom {
    position: absolute;
    z-index: 1;
    right: 1px;
    text-align: center;
    color: #bfbfbf;
    cursor: pointer;
    font-size: 18px;
    &.is-disabled {
      color: #c0c4cc !important;
      cursor: not-allowed !important;
    }
    &:hover,
    &:focus {
      color: #595959;
    }
  }
  .number-top {
    top: 0px;
  }
  .number-bottom {
    bottom: 0px;
  }
}
</style>