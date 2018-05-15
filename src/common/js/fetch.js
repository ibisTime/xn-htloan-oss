import { SYSTEM_CODE } from './config';
import cookies from 'browser-cookies';
import axios from 'axios';
import { clearUser, showErrMsg } from './util';

const ERR_OK = '0';
const ERR_TIME_OUT = '4';

export default function fetch(code, param = {}) {
  const url = '/api';

  const data = {
    // systemCode: SYSTEM_CODE,
    // companyCode: SYSTEM_CODE,
    token: cookies.get('token') || '',
    // updater: cookies.get('userName'),
    ...param
  };

  param = 'code=' + code + '&json=' + encodeURIComponent(JSON.stringify(data));
  return axios.post(url, param, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    res = res.data;
    if (res.errorCode === ERR_TIME_OUT) {
      logout();
      return Promise.reject('timeout');
    }
    if(res.errorCode !== ERR_OK) {
      if (res.errorInfo) {
        showErrMsg(res.errorInfo.toString());
      } else {
        showErrMsg('操作失败');
      }
      return Promise.reject(res.errorInfo);
    }
    return Promise.resolve(res.data);
  });
}

export function logout() {
  clearUser();
  showErrMsg('登录超时，请重新登录!');
  window.location.href = '/login';
}
