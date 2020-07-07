import {
  MessageBox,
  Message
} from 'element-ui';
/**
 * 提示框
 * message： 弹框内容
 * type: 弹框类型 success / info / warning / error
 */
var params = {
  // type: type,
  customClass: 'tip-info-wrap',
  iconClass: '',
  duration: 1500,
  showClose: false,
  dangerouslyUseHTMLString: true,
}
// 判断message有没有副标题
function isSubtitle(subtitle, typeWrap) {
  if (subtitle) {
    return params.customClass = 'tip-info-wrap ' + typeWrap + ' tip-info-wide-border'
  } else {
    return params.customClass = 'tip-info-wrap ' + typeWrap + ' tip-info-thin-border'
  }
}
const tips = {
  message(type, title, subtitle, showClose) {
    var html = ''
    if (showClose) {
      params.duration = 0
      params.showClose = true
    } else {
      params.duration = 2500
      params.showClose = false
    }
    if (type === 'info') {
      params.iconClass = 'iconfont iconshouzhi-01'
      isSubtitle(subtitle, 'tip-normal-wrap')
    }
    if (type === 'success') {
      params.iconClass = 'el-icon-success'
      isSubtitle(subtitle, 'tip-success-wrap')
    }
    if (type === 'error') {
      params.iconClass = 'el-icon-error'
      isSubtitle(subtitle, 'tip-error-wrap')
    }
    if (type === 'warning') {
      params.iconClass = 'el-icon-warning'
      isSubtitle(subtitle, 'tip-warning-wrap')
    }
    // const h = document.getElementsByClassName("tip-info-wrap");
    if (subtitle) {
      html = '<div class="tip-info-content-wrap">' +
        '<div class="tip-info-content">' +
        '<p class="tip-info-title">' + title + '</p>' +
        '<p class="tip-info-subtitle">' + subtitle + '</p>' +
        '</div>' +
        '</div>'
    } else {
      html = '<div class="tip-info-content-wrap">' +
        '<div class="tip-info-content">' +
        '<p class="tip-info-title">' + title + '</p>'
      '</div>'
    }
    Message({
      ...params,
      message: html
    });
  },
}

export default tips;
