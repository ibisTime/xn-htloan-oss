import cookies from 'browser-cookies';
import {
  message,
  Modal
} from 'antd';
import {
  PIC_PREFIX
} from './config';
import './lib/BigDecimal';

/**
 * 保存用户登录信息
 * @param userId
 * @param token
 */
export function setUser({
  userId,
  token
}) {
  cookies.set('userId', userId);
  cookies.set('token', token);
}

// 删除用户登录信息
export function clearUser() {
  cookies.erase('userId');
  cookies.erase('token');
}

// 获取用户编号
export function getUserId() {
  return cookies.get('userId');
}

// 设置用户角色信息
export function setRoleInfo({
  roleCode,
  kind,
  level,
  loginName
}) {
  cookies.set('roleCode', roleCode);
  // cookies.set('loginKind', kind);
  // cookies.set('roleLevel', level);
  cookies.set('userName', loginName);
}

// 获取用户角色编号
export function getRoleCode() {
  return cookies.get('roleCode');
}

// 获取用户username
export function getUserName() {
  return cookies.get('userName');
}

/**
 * 通过正则表达式获取URL传递参数
 * @param name
 * @returns
 */
export function getQueryString(name, search) {
  search = search || window.location.search;
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return '';
}

/**
 * 获取正确的url，使其以'/'开头
 * @param url
 */
export function getRealUrl(url) {
  if (url && url !== '#') {
    url = /^\//.test(url) ? url : '/' + url;
  }
  return url;
}

/**
 * 日期格式转化
 * @param date
 * @param fmt
 */
export function formatDate(date, fmt = 'yyyy-MM-dd') {
  if (isUndefined(date)) {
    return '-';
  }
  date = new Date(date);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

/**
 * 获取两位格式化数字
 * @param str
 */
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

/**
 * 日期格式转化 yyyy-MM-dd
 * @param date
 * @param format
 */
export function dateFormat(date) {
  return formatDate(date, 'yyyy-MM-dd');
}

/**
 * 日期格式转化 yyyy-MM-dd hh:mm:ss
 * @param date
 * @param format
 */
export function dateTimeFormat(date) {
  return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
}

/**
 * 金额格式转化
 * @param money
 * @param format
 */
export function moneyFormat(money, format) {
  var flag = true;
  if (isNaN(money)) {
    return '-';
  }
  if (money < 0) {
    money = -1 * money;
    flag = false;
  }
  if (isUndefined(format) || typeof format === 'object') {
    format = 2;
  }
  // 钱除以1000并保留两位小数
  money = (money / 1000).toString();
  var reg = new RegExp('(\\.\\d{' + format + '})\\d+', 'ig');
  money = money.replace(reg, '$1');
  money = parseFloat(money).toFixed(format);
  // 千分位转化
  var re = /\d{1,3}(?=(\d{3})+$)/g;
  money = money.replace(/^(\d+)((\.\d+)?)$/, (s, s1, s2) => (s1.replace(re, '$&,') + s2));
  if (!flag) {
    money = '-' + money;
  }
  return money;
  // var unit = coin === 'SC' ? '1e24' : '1e18';
  // if (isUndefined(money)) {
  //   return '-';
  // }
  // format = typeof format === 'object' ? 8 : format;
  // money = new BigDecimal(money);
  // money = money.divide(new BigDecimal(unit), format, MathContext.ROUND_DOWN).toString();
  // // money = money.replace(/^(.+\..*[^0])0+$/, '$1').replace(/^(.+)\.0+$/, '$1');
  // // 千分位转化
  // var re = /\d{1,3}(?=(\d{3})+$)/g;
  // money = money.replace(/^(\d+)((\.\d+)?)$/, (s, s1, s2) => (s1.replace(re, '$&,') + s2));
  // return money;
}

/**
 * 把格式化金额转成接口需要的
 * @param money
 * @param rate
 */
export function moneyParse(money, rate = 1000) {
  return ((+('' + money).replace(/,/g, '')) * rate).toFixed(0);
}

/**
 * 大数相乘
 * @param a
 * @param b
 */
export function multiply(a, b) {
  if (a && b) {
    let _a = new BigDecimal(a);
    var _b = new BigDecimal(b);
    return _a.multiply(_b).toString();
  }
  return '';
}

/**
 * 格式化文件地址
 * @param urls
 * @param suffix
 */
export function formatFile(urls, suffix = '') {
  if (!urls) {
    return '';
  }
  let url = urls.split(/\|\|/)[0];
  if (!/^http|^data:image/i.test(url)) {
    let index = url.indexOf('?imageMogr2');
    if (index !== -1) {
      suffix = url.substr(index);
      url = url.substr(0, index);
    }
    url = PIC_PREFIX + encodeURIComponent(url) + suffix;
  }
  return url;
}

/**
 * 格式化图片地址
 * @param imgs
 * @param suffix
 */
export function formatImg(imgs, suffix = '?imageMogr2/auto-orient') {
  return formatFile(imgs, suffix);
}

export function isUndefined(value) {
  return value === undefined || value === null || value === '';
}

export function tempString(str, data) {
  return str.replace(/\{\{(\w+)\.DATA\}\}/gi, function (matchs) {
    var returns = data[matchs.replace(/\{\{(\w+)\.DATA\}\}/, '$1')];
    return isUndefined(returns) ? '' : returns;
  });
};

export function showMsg(msg, type = 'success', time = 2) {
  message[type](msg, time);
}

export function showWarnMsg(msg, time = 2) {
  showMsg(msg, 'warning', time);
}

export function showSucMsg(msg, time = 2) {
  showMsg(msg, 'success', time);
}

export function showErrMsg(msg, time = 2) {
  showMsg(msg, 'error', time);
}

export function showConfirm({
  okType = 'primary',
  onOk,
  onCancel
}) {
  Modal.confirm({
    okType,
    title: '您确定要删除该条记录吗?',
    content: '删除记录后无法还原',
    okText: '确定',
    cancelText: '取消',
    onOk() {
      onOk && onOk();
    },
    onCancel() {
      onCancel && onCancel();
    }
  });
}

export function showDelConfirm({
  onOk,
  onCancel
}) {
  showConfirm({
    okType: 'danger',
    onOk,
    onCancel
  });
}