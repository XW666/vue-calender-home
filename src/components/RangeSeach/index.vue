<template>
	<div class="rang-contaior" ref="reference" :class="[pickerVisible ? 'is-active' : ''
    ]">
		<el-select
			size="small"
			v-model="selectClickValue1"
			filterable
			remote
			reserve-keyword
			:placeholder="placeholder"
			:remote-method="startRemoteMethod"
			:loading="loadingStart"
			@focus="handleFocus"
		>
			<el-option
				v-for="item in startOptions"
				:key="item.value"
				:label="item.label"
				:value="item.value"
			></el-option>
		</el-select>
		<slot name="range-separator">
			<span class="el-range-separator">{{ rangeSeparator }}</span>
		</slot>
		<el-select
			size="small"
			v-model="selectClickValue2"
			filterable
			remote
			reserve-keyword
			placeholder="请输入工号"
			:remote-method="endRemoteMethod"
			:loading="loadingEnd"
			@focus="handleFocus"
		>
			<el-option v-for="item in endOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
		</el-select>
	</div>
</template>
<script>
export default {
	props: {
		displayValue1: {
			type: String,
			default: ''
		},
		displayValue2: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: '请输入'
		},
		rangeSeparator: {
			default: '-'
		},
		RangOptions: {
			type: Array,
			default: () => {
				return []
			}
		}
	},
	data() {
		return {
			loadingStart: false,
			loadingEnd: false,
			startOptions: [],
			endOptions: [],
			pickerVisible: false
		}
	},

	computed: {
		selectClickValue1: {
			get() {
				return this.displayValue1
			},
			set(val) {
				this.$emit('update:displayValue1', val)
			}
		},
		selectClickValue2: {
			get() {
				return this.displayValue2
			},
			set(val) {
				this.$emit('update:displayValue2', val)
			}
		}
	},
	mounted() {
		document.addEventListener('mouseup', this.setHeadPosition)
	},
	methods: {
		setHeadPosition(e) {
			const that = this
			// 点击其他地方  div失去边框
			if (!that.$refs.reference.contains(e.target)) {
				that.pickerVisible = false
			}
		},
		startRemoteMethod(query) {
			const reg = new RegExp(query)
			if (query !== '') {
				this.loadingStart = true
				setTimeout(() => {
					this.loadingStart = false
					this.startOptions = this.RangOptions.filter(item => {
						return reg.test(item.label)
					})
				}, 200)
			} else {
				this.startOptions = []
			}
		},
		endRemoteMethod(query) {
			const reg = new RegExp(query)
			if (query !== '') {
				this.loadingEnd = true
				setTimeout(() => {
					this.loadingEnd = false
					this.endOptions = this.RangOptions.filter(item => {
						return reg.test(item.label)
					})
				}, 200)
			} else {
				this.endOptions = []
			}
		},
		handleFocus() {
			if (!this.pickerVisible) {
				this.pickerVisible = true
			}
		}
	},
	beforeDestroy() {
		document.removeEventListener('mouseup', this.setHeadPosition)
	}
}
</script>
<style lang="scss">
.rang-contaior {
	display: inline-block;
	border: 1px solid #d9d9d9;
	border-radius: 4px;
	.el-select {
		width: 150px;
	}
	&.is-active {
		border-color: #47a6e1;
	}
	.el-input--small .el-input__inner {
		height: 30px;
		line-height: 30px;
	}
	.el-input__inner {
		border: none;
		outline: none;
		text-align: center;
	}
}
</style>