<template>
	<div class="date-contaior" ref="dateQuarter">
		<el-popover placement="bottom" popper-class="quarter-popper" width="200" v-model="visible" :disabled="disabled">
			<div class="date-cen">
				<div slot="header" class="data-header">
					<button type="button" aria-label="前一年" class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left" @click="prev"></button>
					<span role="button" class="el-date-picker__header-label">{{ year }}年</span>
					<button type="button" aria-label="后一年" @click="next" class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"></button>
				</div>
				<ul class="data-ui">
					<li v-for="(item, index) in dateList" :key="index" :class="[{ active: item.lable == chickDayId }]" @click="handleClickSpan(item)">{{ item.value }}</li>
				</ul>
			</div>
			<div class="date-footer">
				<div class="date-btn">
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
				v-model.number="chickDays"
			></el-input>
		</el-popover>
	</div>
</template>
<script>
// 季度value defalut['01-03', '04-06', '07-09', '10-12'] 默认值待设置
export default {
	props: {
		dateList: {
			type: Array,
			default: () => {
				return [
					{
						value: '第一季度',
						lable: '01-03',
						type: '01'
					},
					{
						value: '第二季度',
						lable: '04-06',
						type: '02'
					},
					{
						value: '第三季度',
						lable: '07-09',
						type: '03'
					},
					{
						value: '第四季度',
						lable: '10-12',
						type: '04'
					}
				]
			}
		},

		daysValue: {
			default: ''
		},
		width: {
			type: Number,
			default: 200
		},
		placeholder: {
			type: String,
			default: '请选择'
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			chickDays: null, // 当前选中的季度
			chilckValue: '', // 当前选中的季度 交互
			chickDayId: '',
			chickData: {},
			visible: false,
			year: new Date().getFullYear()
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
		this.chilckValue = this.daysValue
	},
	mounted() {},
	methods: {
		handleClickSpan(item) {
			// 点击某个季度
			this.chickDayId = item.lable
			this.chickData = {
				chickDayId: item.lable,
				year: this.year
			}
			this.chickDays = `${this.year}年${item.value}`
			this.chilckValue = `${this.year}-${item.type}`
			this.handleClickSave()
		},
		handleClickSave() {
			// 确定

			this.visible = false
			this.$emit('update:daysValue', this.chilckValue)
		},
		prev() {
			// 上一年
			this.year = this.year * 1 - 1
			this.setChickDays()
		},
		next() {
			// 下一年
			this.year = this.year * 1 + 1
			this.setChickDays()
		},
		setChickDays() {
			// 是否选中某个季度
			if (this.chickData.year === this.year) {
				this.chickDayId = this.chickData.chickDayId
			} else {
				this.chickDayId = ''
			}
		}
	},
	beforeDestroy() {}
}
</script>
<style lang="scss">
.quarter-popper {
	padding: 0 !important;
	.data-header {
		text-align: center;
		padding-bottom: 12px;
		border-bottom: 1px solid #ebeef5;
		padding: 10px;
		.el-date-picker__header-label {
			font-size: 14px;
			color: #262626;
			&:hover {
				color: #262626;
			}
		}
	}
	.date-footer {
		border-top: 1px solid #e4e4e4;
		padding: 6px 10px;
		text-align: right;
	}
	.data-ui {
		text-align: center;
		padding: 10px;
		& > li {
			line-height: 28px;
			cursor: pointer;
			margin: 6px 0;
			&.active {
				background-color: #138dd9;
				color: #fff;
			}
			&:hover {
				background-color: #138dd9;
				color: #fff;
			}
		}
	}
}
</style>
