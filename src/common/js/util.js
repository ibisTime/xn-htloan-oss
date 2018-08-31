import cookies from 'browser-cookies';
import {
  message,
  Modal,
  notification
} from 'antd';
import {
  PIC_PREFIX,
  curNodePageUrl
} from './config';
import './lib/BigDecimal';

notification.config({
    placement: 'bottomRight'
});

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
  cookies.erase('roleCode');
  cookies.erase('userName');
  cookies.erase('realName');
  cookies.erase('teamCode');
}

// 获取用户编号
export function getUserId() {
  return cookies.get('userId');
}

// 设置用户角色信息
export function setRoleInfo({
  roleCode,
  loginName,
  realName,
  teamCode
}) {
  cookies.set('roleCode', roleCode);
  cookies.set('userName', loginName);
  cookies.set('realName', realName);
  cookies.set('teamCode', teamCode || '');
}

// 获取用户姓名
export function getRealName() {
    return cookies.get('realName');
}

// 获取用户角色编号
export function getRoleCode() {
  return cookies.get('roleCode');
}

// 获取用户团队编号
export function getTeamCode() {
    return cookies.get('teamCode');
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
 * 日期格式转化 yyyy-MM
 * @param date
 * @param format
 */
export function monthFormat(date) {
  date = formatDate(date, 'yyyy-MM-dd');
  let arr = date.split('-');
  arr.length = 2;
  date = arr.join('-');
  return date;
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
  let m0 = ('' + money).replace(/,/g, '');
  return m0 === '' ? '' : (+m0 * rate).toFixed(0);
}

/**
 * 把格式化金额去掉逗号
 * @param money
 */
export function moneyReplaceComma(money) {
    return ('' + money).replace(/,/g, '');
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
export function formatImg(imgs, suffix = '?imageMogr2/auto-orient/thumbnail/!300x300') {
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

// 资料传递提示
export function isExpressConfirm(
   data,
   type = 'success'
) {
    if (data.isExpress === '1') {
        notification[type]({
            message: '系统提示',
            description: '资料传递记录已生成，待发件'
        });
    }
}

/**
 * 金额转换大写
 * @param money
 */
export function moneyUppercase(Num) {
    if (isNaN(Num)) {
        return '-';
    }
    if (!/^[1-9](,\d{3}|[0-9])*(\.\d{1,2})?$/.test(Num)) {
        return '';
    }
    // 字符处理完毕，开始转换，转换采用前后两部分分别转换
    let part = String(Num).split('.');
    let newchar = '';
    // 小数点前进行转化
    for (let i = part[0].length - 1; i >= 0; i--) {
        // 判断是否超过拾亿单位
        if (part[0].length > 10) {
            return '';
        }
        let tmpnewchar = '';
        let perchar = part[0].charAt(i);
        switch (perchar) {
            case '0':
                tmpnewchar = '零' + tmpnewchar;
                break;
            case '1':
                tmpnewchar = '壹' + tmpnewchar;
                break;
            case '2':
                tmpnewchar = '贰' + tmpnewchar;
                break;
            case '3':
                tmpnewchar = '叁' + tmpnewchar;
                break;
            case '4':
                tmpnewchar = '肆' + tmpnewchar;
                break;
            case '5':
                tmpnewchar = '伍' + tmpnewchar;
                break;
            case '6':
                tmpnewchar = '陆' + tmpnewchar;
                break;
            case '7':
                tmpnewchar = '柒' + tmpnewchar;
                break;
            case '8':
                tmpnewchar = '捌' + tmpnewchar;
                break;
            case '9':
                tmpnewchar = '玖' + tmpnewchar;
                break;
        }
        switch (part[0].length - i - 1) {
            case 0:
                tmpnewchar = tmpnewchar + '元';
                break;
            case 1:
                if (perchar !== '0') tmpnewchar = tmpnewchar + '拾';
                break;
            case 2:
                if (perchar !== '0') tmpnewchar = tmpnewchar + '佰';
                break;
            case 3:
                if (perchar !== '0') tmpnewchar = tmpnewchar + '仟';
                break;
            case 4:
                tmpnewchar = tmpnewchar + '万';
                break;
            case 5:
                if (perchar !== '0') tmpnewchar = tmpnewchar + '拾';
                break;
            case 6:
                if (perchar !== '0') tmpnewchar = tmpnewchar + '佰';
                break;
            case 7:
                if (perchar !== '0') tmpnewchar = tmpnewchar + '仟';
                break;
            case 8:
                tmpnewchar = tmpnewchar + '亿';
                break;
            case 9:
                tmpnewchar = tmpnewchar + '拾';
                break;
        }
        newchar = tmpnewchar + newchar;
    }
    // 小数点之后进行转化
    if (String(Num).indexOf('.') !== -1) {
        if (part[1].length > 2) {
            // 小数点之后只能保留两位,自动截段
            part[1] = part[1].substr(0, 2);
        }
        for (let i = 0; i < part[1].length; i++) {
            let tmpnewchar = '';
            let perchar = part[1].charAt(i);
            switch (perchar) {
                case '0':
                    tmpnewchar = '零' + tmpnewchar;
                    break;
                case '1':
                    tmpnewchar = '壹' + tmpnewchar;
                    break;
                case '2':
                    tmpnewchar = '贰' + tmpnewchar;
                    break;
                case '3':
                    tmpnewchar = '叁' + tmpnewchar;
                    break;
                case '4':
                    tmpnewchar = '肆' + tmpnewchar;
                    break;
                case '5':
                    tmpnewchar = '伍' + tmpnewchar;
                    break;
                case '6':
                    tmpnewchar = '陆' + tmpnewchar;
                    break;
                case '7':
                    tmpnewchar = '柒' + tmpnewchar;
                    break;
                case '8':
                    tmpnewchar = '捌' + tmpnewchar;
                    break;
                case '9':
                    tmpnewchar = '玖' + tmpnewchar;
                    break;
            }
            if (i === 0) {
                tmpnewchar = tmpnewchar + '角';
            }
            if (i === 1) {
                tmpnewchar = tmpnewchar + '分';
            }
            newchar = newchar + tmpnewchar;
        }
    }
    // 替换所有无用汉字
    while (newchar.search('零零') !== -1) {
        newchar = newchar.replace('零零', '零');
    }
    newchar = newchar.replace('零亿', '亿');
    newchar = newchar.replace('亿万', '亿');
    newchar = newchar.replace('零万', '万');
    newchar = newchar.replace('零元', '元');
    newchar = newchar.replace('零角', '');
    newchar = newchar.replace('零分', '');

    if (newchar.charAt(newchar.length - 1) === '元' || newchar.charAt(newchar.length - 1) === '角') {
        newchar = newchar + '整';
    }
    return newchar;
}

// 返回当前节点应跳转的页面
export function getNowCurNodePageUrl(data) {
    let url;
    // 物流单
    if (!isUndefined(data.logisticsStatus)) {
        if (data.logisticsStatus === '0' || data.logisticsStatus === '3') {
            url = '/transmit/transmit/send?code=';
        } else {
            url = '/transmit/collection/check?code=';
        }
    } else {
        url = curNodePageUrl[data.dealNode];
    }
    if (!url) {
      return '';
    }
    url += data.refOrder;
    // 填写准入申请单
    if (data.dealNode === '002_04' || data.dealNode === '002_01') {
        url = `${url}&bizType=${data.bizType}&loanBank=${data.loanBank}`;
    }
    return url;
}
