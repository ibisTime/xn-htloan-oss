import { getPageAccount, getEthStatistics } from 'api/account';

const PREFIX = 'FINANCE_ACCOUNT_';
const SET_TABLE_DATA = PREFIX + 'SET_TABLE_DATA';
const SET_ETH_ACCOUNT = PREFIX + 'SET_ETH_ACCOUNT';
const SET_ETH_COLD_ACCOUNT = PREFIX + 'SET_ETH_COLD_ACCOUNT';
const LOADING = PREFIX + 'LOADING';
const CANCEL_LOADING = PREFIX + 'CANCEL_LOADING';

const initState = {
  tableList: [],
  ethAccount: {},
  ethColdAccount: {},
  fetching: true
};

export function financeAccount(state = initState, action) {
  switch(action.type) {
    case SET_TABLE_DATA:
      return {...state, tableList: action.payload};
    case SET_ETH_ACCOUNT:
      return {...state, ethAccount: action.payload};
    case SET_ETH_COLD_ACCOUNT:
      return {...state, ethColdAccount: action.payload};
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

// 设置平台ETH冷钱包
function setEthColdAccount(data) {
  return { type: SET_ETH_COLD_ACCOUNT, payload: data };
}

// 设置平台ETH盈亏账户
function setEthAccount(data) {
  return { type: SET_ETH_ACCOUNT, payload: data };
}

// 设置table的数据
function setTableData(data) {
  return { type: SET_TABLE_DATA, payload: data };
}

// 查询账户列表
function queryPageAccount() {
  return getPageAccount({
    start: 1,
    limit: 10,
    type: 'P'
  });
}

function getTableInfo(infos) {
  return [{
    code: 0,
    name: '平台所有币',
    amount: infos.totalCount
  }, {
    code: 1,
    name: '客户未归集总额',
    amount: infos.toCollectCount
  }, {
    code: 2,
    name: '当前散取地址余额',
    amount: infos.toWithdrawCount
  }, {
    code: 3,
    name: '历史归集总额',
    amount: infos.totolCollectCount
  }, {
    code: 4,
    name: '历史散取总额',
    amount: infos.totolWithdrawCount
  }];
}

// 初始化页面数据
export function initData() {
  return dispatch => {
    dispatch(doFetching());
    Promise.all([
      queryPageAccount(),
      getEthStatistics()
    ]).then(([accounts, infos]) => {
      dispatch(cancelFetching());
      accounts.list.forEach(account => {
        if (account.accountNumber === 'SYS_ACOUNT_ETH_COLD') {
          dispatch(setEthColdAccount(account));
        } else if (account.accountNumber === 'SYS_ACOUNT_ETH') {
          dispatch(setEthAccount(account));
        }
      });
      dispatch(setTableData(getTableInfo(infos)));
    }).catch(() => dispatch(cancelFetching()));
  };
}
