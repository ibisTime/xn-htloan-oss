import { getPageAccount } from 'api/account';

const PREFIX = 'FINANCE_ACCOUNT_';
const SET_CNY_ACCOUNT = PREFIX + 'SET_CNY_ACCOUNT';
const SET_TG_ACCOUNT = PREFIX + 'SET_TG_ACCOUNT';
const SET_JF_ACCOUNT = PREFIX + 'SET_JF_ACCOUNT';
const LOADING = PREFIX + 'LOADING';
const CANCEL_LOADING = PREFIX + 'CANCEL_LOADING';

const initState = {
  cnyAccount: {},
  tgAccount: {},
  jfAccount: {},
  fetching: true
};

export function financeAccount(state = initState, action) {
  switch(action.type) {
    case SET_CNY_ACCOUNT:
      return {...state, cnyAccount: action.payload};
    case SET_TG_ACCOUNT:
      return {...state, tgAccount: action.payload};
    case SET_JF_ACCOUNT:
      return {...state, jfAccount: action.payload};
    case LOADING:
      return {...state, fetching: true};
    case CANCEL_LOADING:
      return {...state, fetching: false};
    default:
      return state;
  }
}

// 显示loading
function doFetching() {
  return { type: LOADING };
}

// 隐藏loading
function cancelFetching() {
  return { type: CANCEL_LOADING };
}

// 设置平台盈亏账户
function setCnyAccount(data) {
  return { type: SET_CNY_ACCOUNT, payload: data };
}

// 设置平台托管账户
function setTgAccount(data) {
  return { type: SET_TG_ACCOUNT, payload: data };
}

// 设置平台积分账户
function setJfAccount(data) {
  return { type: SET_JF_ACCOUNT, payload: data };
}

// 查询账户列表
function queryPageAccount() {
  return getPageAccount({
    start: 1,
    limit: 10,
    type: 'P'
  });
}

// 初始化页面数据
export function initData() {
  return dispatch => {
    dispatch(doFetching());
    queryPageAccount().then((accounts) => {
      dispatch(cancelFetching());
      accounts.list.forEach(account => {
        if (account.accountNumber === 'SYS_ACOUNT_CNY') {
          dispatch(setCnyAccount(account));
        } else if (account.accountNumber === 'SYS_ACOUNT_CNY_TG') {
          dispatch(setTgAccount(account));
        } else if (account.accountNumber === 'SYS_ACOUNT_JF') {
          dispatch(setJfAccount(account));
        }
      });
    }).catch(() => dispatch(cancelFetching()));
  };
}
