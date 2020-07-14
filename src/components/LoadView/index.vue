<template>
	<div class="load-contaior" v-if="loadShow">
		<div class="load-r">
			<div class="load-r-l"></div>
			<div class="load-r-max-r">
				<div class="load-r-min-r"></div>
			</div>
		</div>
		<div class="load-c">
			<el-progress :text-inside="true" :stroke-width="14" :percentage="percentage" :color="customColor"></el-progress>
			<div class="drop-progress-tit" :class="{ active: percentage === 100 }">{{ percentage | format }}</div>
		</div>
		<div class="load-btn">
			<span class="load-btn-s" @click="loadUpload">放弃上传</span>
		</div>
	</div>
</template>
<script>
export default {
  props: {
    loadShow: {
      type: Boolean,
      default: false
    },
    percentage: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      customColor: '#fff'
    }
  },
  filters: {
    format(percentage) {
      return percentage === 100 ? '上传完成' : 'Loading…'
    }
  },
  created() {},
  mounted() {},
  methods: {
    loadUpload() {
      this.$emit('update:loadShow', false)
    }
  }
}
</script>

<style lang="scss">
.load-contaior {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 100%;
	background: #138dd9;
	z-index: 22222;
	text-align: right;
}
.load-btn {
	position: absolute;
	right: 40px;
	bottom: 40px;
	.load-btn-s {
		cursor: pointer;
		text-align: center;
		display: inline-block;
		color: #fff;
		border: 1px solid #fff;

		border-radius: 16px;
		padding: 6px 16px;
	}
}
.load-r {
	width: 400px;
	height: 400px;
	position: relative;
	display: inline-block;
	// background: #39bee7;
	// transform: rotate(88deg) translate3d(-104px, 0, 0);
	// transition: transform 300ms ease-out;
	.load-r-l {
		position: absolute;
		z-index: 1;
		border-top: 400px solid #39bee7;
		border-left: 400px solid transparent;
	}
	.load-r-max-r {
		position: absolute;
		z-index: 2;
		right: 30px;
		top: 30px;
		width: 110px;
		height: 110px;
		text-align: center;
		padding: 12px;
		border: 8px solid rgba(0, 0, 0, 0.08);
		border-radius: 100%;
		animation: loader2 1.5s linear infinite;
		&::before {
			content: '';
			position: absolute;
			top: 35px;
			right: 0px;
			left: -8px;
			border-bottom: 8px solid #fff;
			border-left: 8px solid #fff;
			border-radius: 0px 0 0px 89%;
			width: 60px;
			height: 65px;
			transform-origin: 0% 100%;
		}
		&::after {
			content: '';
			position: absolute;
			top: -7px;
			right: -8px;
			border-top: 8px solid #fff;
			border-right: 8px solid #fff;
			border-radius: 0 89% 0px 0;
			width: 60px;
			height: 65px;
			transform-origin: 100% 0%;
		}
	}
	.load-r-min-r {
		display: inline-block;
		width: 70px;
		height: 70px;
		border: 8px solid rgba(0, 0, 0, 0.08);
		border-radius: 100%;
		position: relative;

		&::after {
			content: '';
			position: absolute;
			top: -10px;
			right: 24px;
			border-top: 8px solid #fff;
			border-left: 8px solid #fff;
			border-radius: 89% 0 0px 0;
			width: 37px;
			height: 35px;
			transform-origin: 100% 0%;
		}
		&::before {
			content: '';
			position: absolute;
			bottom: -8px;
			right: -8px;
			border-bottom: 8px solid #fff;
			border-right: 8px solid #fff;
			border-radius: 0 0 89% 0;
			width: 37px;
			height: 35px;
			transform-origin: 0% 100%;
		}
	}
}
.load-c {
	width: 600px;
	margin: 0 auto;
	text-align: center;
	margin-top: -50px;
	.el-progress-bar__outer {
		background-color: #d9d9d9;
	}
	.el-progress-bar__innerText {
		color: #595959;
	}
	.drop-progress-tit {
		font-size: 38px;
		line-height: 53px;
		color: #fff;
		padding-top: 25px;
	}
}
@-webkit-keyframes loader2 {
	0% {
		-webkit-transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
	}
}

@keyframes loader2 {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
