/**
 * 存储localStorage
 */
const setStore = (name, content) => {
  if (!name) {
    return
  }
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
const getStore = name => {
  if (!name) {
    return true
  } else {
    return window.localStorage.getItem(name)
  }
}

/**
 * 删除localStorage
 */
const removeStore = name => {
  if (!name) {
    return
  }
  window.localStorage.removeItem(name)
}
/**
 * 存储sessionStorage
 */
const setSessionStorage = (name, content) => {
  if (!name) {
    return
  }
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(name, content)
}

/**
 * 获取sessionStorage
 */
const getSessionStorage = name => {
  if (!name) {
    return true
  } else {
    return window.sessionStorage.getItem(name)
  }
}
/**
 * 删除sessionStorage
 */
const removeSessionStorage = name => {
  if (!name) {
    return
  }
  window.sessionStorage.removeItem(name)
}
/**
 * 六位随机数生成器，用于构造一点资源随机码
 */
const randomNumberGenerator = () => {
  return ('000000' + Math.floor(Math.random() * 999999)).slice(-6)
}
/**
 *大小写字母
 */
const validateAlphabets = str => {
  const reg = /^([A-Za-z]+)$/
  if (!reg.test(str)) {
    return false
  }
  return true
}
/**
 * 验正输入的是否为汉字
 */
const isChinese = num => {
  const reg = /^[\u4e00-\u9fa5]{2,4}$/
  if (!reg.test(num)) {
    return false
  }
  return true
}

/**
 *
 * 验证输入中文、数字、特殊字符
 */
const onpasteChines = num => {
  const reg = /[^\0-9\u4E00-\u9FA5\-\_\ ]/g
  if (!reg.test(num)) {
    return false
  }
  return true
}
/**
 * 验正数字和英文和特殊字符
 */
const onpaste = num => {
  const reg = /^[A-Za-z0-9_-\s ]+$/
  if (!reg.test(num)) {
    return false
  }
  return true
}
/**
 *
 * 验证数字、中文、英文、特殊字符
 */
const onpasteChinesEn = str => {
  const reg = /[^\A-Za-z0-9\u4E00-\u9FA5\-\_\ ]/g
  if (!reg.test(str)) {
    return false
  }
  return true
}

/**
 * 获得字符串实际长度，中文2，英文1
 */
const getTextWidth = str => {
  var realLength = 0
  var len = str.length
  var charCode = -1
  for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) realLength += 1
    else realLength += 2
  }
  return realLength
}
/**
 * 验证正整数
 */
const isuInteger = num => {
  const reg = /^[1-9]+\d*$/
  if (!reg.test(num)) {
    return false
  }
  return true
}
/*
 *  只匹配数字与小数点
 */
const isNumberDouble = num => {
  const reg = /^\d+(\.{0,1}\d+$|$)/
  if (!reg.test(num)) {
    return false
  }
  return true
}
/**
 * select值的比配
 */
const selectMatch = (list, value) => {
  let val = ''
  if (list == null || list.length <= 0) {
    return '--'
  }

  for (let i = 0; i < list.length; i++) {
    const obj = list[i]
    if (obj.value === value) {
      val = obj.label
    }
  }
  return val
}
const numFormat = (amount, place) => {
  // 千分位加逗号
  const places = place || 2
  let defaultAmount = ''
  const setAmount = amount

  if (setAmount !== null && setAmount !== '' && setAmount !== undefined && setAmount !== '--') {
    defaultAmount = Number(setAmount)
      .toFixed(places)
      .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')

    return defaultAmount
  } else {
    return defaultAmount
  }
}
// 千分位数据还原
const numFloat = num => {
  return parseFloat(num.replace(/[^\d\.-]/g, ''))
}
// 随机生成颜色
const getRgb = val => {
  let color = ''
  if (val === 'rgb') {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    color = '(' + r + ',' + g + ',' + b + ')'
  } else {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    color = '#' + r.toString(16) + g.toString(16) + b.toString(16)
  }
  return color
}
const parseTime = (time, cFormat) => {
  if (arguments.length === 0) {
    return null
  }
  if (!time) return null
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
export {
  setStore,
  getStore,
  removeStore,
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  randomNumberGenerator,
  validateAlphabets,
  isChinese,
  onpaste,
  onpasteChines,
  getTextWidth,
  isuInteger,
  onpasteChinesEn,
  selectMatch,
  numFormat,
  numFloat,
  isNumberDouble,
  getRgb,
  parseTime
}
