
/**
 * 存储localStorage
 */
const setStore = (name, content) => {
  if (!name) {
    return;
  };
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
const getStore = (name) => {
  if (!name) {
    return true;
  } else {
    return window.localStorage.getItem(name);
  }
};

/**
 * 删除localStorage
 */
const removeStore = (name) => {
  if (!name) {
    return;
  };
  window.localStorage.removeItem(name);
};
/**
 * 存储sessionStorage
 */
const setSessionStorage = (name, content) => {
  if (!name) {
    return
  };
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(name, content)
}

/**
 * 获取sessionStorage
 */
const getSessionStorage = (name) => {
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
  return ("000000" + Math.floor(Math.random() * 999999)).slice(-6);
}
/**
 *大小写字母 
 */
const validateAlphabets = (str) => {
  const reg = /^([A-Za-z]+)$/;
  if ((!reg.test(str))) {
    return false;
  }
  return true;
};
/**
 * 验正输入的是否为汉字
 */
const isChinese = (num) => {
  let reg = /^[\u4e00-\u9fa5]{2,4}$/;
  if ((!reg.test(num))) {
    return false;
  }
  return true;
};

/**
 * 
 * 验证输入中文、数字、特殊字符
 */
const onpasteChines = (num) => {
  let reg = /[^\0-9\u4E00-\u9FA5\-\_\ ]/g;
  if ((!reg.test(num))) {
    return false;
  }
  return true;
}
/**
 * 验正数字和英文和特殊字符
 */
const onpaste = (num) => {
  let reg = /^[A-Za-z0-9_-\s ]+$/;
  if ((!reg.test(num))) {
    return false;
  }
  return true;
};
/**
 * 
 * 验证数字、中文、英文、特殊字符
 */
const onpasteChinesEn = (str) => {
  let reg = /[^\A-Za-z0-9\u4E00-\u9FA5\-\_\ ]/g;
  if ((!reg.test(str))) {
    return false;
  }
  return true;
}


/**
 * 获得字符串实际长度，中文2，英文1
 */
const getTextWidth = (str) => {
  var realLength = 0,
    len = str.length,
    charCode = -1;
  for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) realLength += 1;
    else realLength += 2;
  }
  return realLength;
}
/**
 * 验证正整数
 */
const isuInteger = (num) => {
  let reg = /^[1-9]+\d*$/;
  if (!reg.test(num)) {
    return false;
  }
  return true;
};

const parseTime = (time, cFormat) => {
  if (arguments.length === 0) {
    return null
  }
  if (!time) return null;
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
  parseTime
}