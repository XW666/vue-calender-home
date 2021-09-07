<template>
	<div class="moneyInput">
		<el-input
			class="input-view"
			v-model="inputVal"
			@blur="inputBlur"
			@focus="inputFocus"
			oninput="var p2 = parseFloat(value).toFixed(2);value = p2>=0?(/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,'')):''"
			maxlength="13"
		>
		</el-input>
		<span class="money-icon">￥</span>
		<span class="money-text" v-show="showText">{{ isNumFormat(inputVal) }}</span>
	</div>
</template>
<script>
import { numFormat } from '@/utils/common'
export default {
	props: {
		value: {
			default: 0
		}
	},
	data() {
		return {
			inputVal: '',
			showText: true
		}
	},
	created() {
		this.inputVal = this.value
	},
	methods: {
		isNumFormat(val) {
			return numFormat(val)
		},
		inputFocus() {
			// 获得焦点
			this.showText = false
			this.$emit('inputFocus')
		},
		inputBlur() {
			// 失去焦点
			this.showText = true
			this.$emit('inputBlur')
		}
	},
	watch: {
		value: {
			handler(newVal) {
				this.inputVal = newVal
			},
			deep: true
		},
		inputVal: {
			handler(newVal) {
				this.$emit('update:value', newVal)
			},
			deep: true
		}
	}
}
</script>
<style lang="scss" scoped>
.moneyInput {
	width: 100%;
	position: relative;
	.money-icon {
		position: absolute;
		left: 0;
		bottom: 0;
		padding: 0 10px;
		z-index: 3;
	}
	/deep/ .input-view input {
		padding-left: 30px;
	}
	.money-text {
		width: 90%;
		position: absolute;
		left: 1px;
		bottom: 2px;
		height: 32px;
		line-height: 32px;
		background: #fff;
		padding-left: 30px;
		pointer-events: none;
	}
}
</style>
