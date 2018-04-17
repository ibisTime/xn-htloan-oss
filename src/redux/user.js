import fetch from 'common/js/fetch';
import { setUser, getUserId, setRoleInfo } from 'common/js/util';
import { COMPANY_CODE } from 'common/js/config';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';
const LOAD_DATA = 'LOAD_DATA';
const LOADING = 'LOADING';
const CANCEL_LOADING = 'CANCEL_LOADING';

const initState = {
  fetching: false,
  redirectTo: '',
  msg: '',
  userId: '',
  userName: '',
  roleCode: '',
  kind: ''
};

export function user (state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {...state, msg: ''};
    case LOAD_DATA:
      return {...state, ...action.payload, redirectTo: '/'};
    case LOGOUT:
      return {...initState, redirectTo: '/login'};
    case LOADING:
      return {...state, fetching: true};
    case CANCEL_LOADING:
      return {...state, fetching: false};
    default:
      return state;
  }
}

// 登录成功
function loginSuccess (data) {
  return { type: LOGIN_SUCCESS, payload: data };
}

function doFetching() {
  return { type: LOADING };
}

export function cancelFetching() {
  return { type: CANCEL_LOADING };
}

// 获取用户信息成功
export function loadData(data) {
  setRoleInfo(data);
  return { type: LOAD_DATA, payload: data };
}

// 获取用户信息
export function getUser() {
  return dispatch => {
    dispatch(doFetching());
    _getUser().then(data => {
      dispatch(cancelFetching());
      dispatch(loadData(data));
    }).catch(msg => {
      dispatch(cancelFetching());
    });
  };
}

// 登录
export function login({ loginName, loginPwd }) {
  return dispatch => {
    dispatch(doFetching());
    // 805050
    fetch(627300, {
      loginName,
      loginPwd,
      kind: 'P',
      companyCode: COMPANY_CODE
    }).then(data => {
      setUser(data);
      dispatch(loginSuccess());
    }).then(() => {
      return _getUser().then(data => {
        dispatch(cancelFetching());
        dispatch(loadData(data));
      });
    }).catch(msg => {
      dispatch(cancelFetching());
    });
  };
}

function _getUser() {
  // 805121
  return fetch(627230, {
    userId: getUserId()
  });
}
