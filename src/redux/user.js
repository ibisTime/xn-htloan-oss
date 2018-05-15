import fetch from 'common/js/fetch';
import { setUser, getUserId, setRoleInfo, getRoleCode, getUserName } from 'common/js/util';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';
const LOAD_DATA = 'LOAD_DATA';
const LOADING = 'LOADING';
const CANCEL_LOADING = 'CANCEL_LOADING';

const initState = {
  fetching: false,
  redirectTo: '',
  msg: '',
  userId: getUserId() || '',
  loginName: getUserName() || '',
  roleCode: getRoleCode() || '',
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
export function login({ loginName, loginPwd, type = 'P' }) {
  return dispatch => {
    dispatch(doFetching());
    fetch(630051, {
      loginName,
      loginPwd,
      type
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
  return fetch(630067, {
    userId: getUserId()
  });
}
