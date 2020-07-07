<template>
	<div class="date-contaior" ref="datePopper">
		<el-popover placement="bottom" popper-class="date-popper" width="160" v-model="visible" :disabled="disabled">
			<div class="date-cen">
				<ul class="data-ui">
					<li v-for="(item, index) in dateList" :key="index">
						<span :class="[{ active: item == chickDays }, { 'days-active': isCurrenDay(item) }]" @click="handleClickSpan(item)">{{ item }}</span>
					</li>
				</ul>
			</div>
			<div style="date-footer">
				<div class="date-btn">
					<el-button size="mini" class="clear-btn" type="text" @click="handleClickClear">清空</el-button>
					<el-button size="mini" @click="handleClickDay">现在</el-button>
					<el-button type="primary" size="mini" @click="handleClickSave">确定</el-button>
				</div>
			</div>
			<el-input
				size="small"
				class="popoverInput"
				:style="{ 'max-width': width + 'px' }"
				:placeholder="placeholder"
				slot="reference"
				:readonly="true"
				:disabled="disabled"
				suffix-icon="el-icon-date"
				v-model.number="daysValue"
			></el-input>
		</el-popover>
	</div>
</template>
<script>
export default {
  props: {
    dateList: {
      type: Number,
      default: 31
    },

    daysValue: {
      default: 1
    },
    width: {
      type: Number,
      default: 200
    },
    placeholder: {
      type: String,
      default: '请选择日期'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chickDays: null,
      visible: false
    }
  },
  watch: {
    daysValue: {
      handler(val) {
        this.$emit('update:daysValue', val)
      }
    }
  },
  computed: {},
  created() {
    this.chickDays = this.daysValue
  },
  mounted() {
    document.addEventListener('mouseup', this.setHeadPosition)
    // window.addEventListener('mouseup', e => {
    // 	this.setHeadPosition(e)
    // })
  },
  methods: {
    setHeadPosition(e) {
      const that = this

      // 点击其他地方关闭 popover气泡
      if (!that.$refs.datePopper.contains(e.target)) {
        if (e.target.outerText === '清空') return
        that.visible = false
      }
      // var dom = this.$el.querySelector('.popoverInput')
      // var dom1 = document.getElementById('clearBtn')
      // if (dom) {
      // 	if (!dom.contains(e.target) && !dom1.contains(e.target)) {
      // 		this.visible = false
      // 	}
      // }
    },
    handleClickDay() {
      // 现在
      const date = new Date()
      const d = date.getDate()
      this.visible = false
      this.chickDays = d
      this.$emit('update:daysValue', d)
      this.$emit('updateDays', d)
    },
    handleClickSave() {
      // 确定
      this.visible = false
      this.$emit('update:daysValue', this.chickDays)
      this.$emit('updateDays', this.chickDays)
    },
    handleClickClear() {
      // 清除
      this.chickDays = null
      this.$emit('update:daysValue', null)
      this.$emit('updateDays', null)
    },
    handleClickSpan(item) {
      // 单独天数的事件
      this.chickDays = item
      this.visible = false
      this.$emit('update:daysValue', item)
      this.$emit('updateDays', item)
    },

    isCurrenDay(day) {
      // 日期展示
      const date = new Date()
      const d = date.getDate()
      return day === d
    }
  },
  beforeDestroy() {
    document.removeEventListener('mouseup', this.setHeadPosition)
    // window.removeEventListener('mouseup', e => {}, true)
  }
}
</script>
<style lang="scss">
.date-contaior {
	.el-input {
		width: 200px;
	}
}
.date-cen {
	overflow: hidden;
	padding: 10px;
	.data-ui li {
		display: inline-block;
		float: left;
		width: 16.6%;
		padding: 2px 0;
		text-align: center;
		box-sizing: border-box;
		font-size: 12px;
		color: #262626;
		.active {
			background: #47a6e1;
			color: #fff !important;
		}
		.days-active {
			color: #47a6e1;
		}
		span {
			width: 26px;
			height: 26px;
			line-height: 26px;
			display: inline-block;
			border-radius: 4px;
			cursor: pointer;
		}
	}
}
.date-btn {
	text-align: right;
	border-top: 1px solid #e8e8e8;
	padding: 10px 20px;
	.clear-btn {
		float: left;
		padding: 5px 0 !important;
	}
	.el-button {
		padding: 5px 10px;
	}
}
.date-popper {
	width: 240px !important;
	padding: 0 !important;
}
.popoverInput .el-input__inner {
	cursor: pointer;
}
</style>
