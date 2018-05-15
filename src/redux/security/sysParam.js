import { commListState } from '../common';

const PREFIX = 'SECURITY_SYSPARAM_';
const SET_BUTTON_LIST = PREFIX + 'SET_BUTTON_LIST';
const LOADING = PREFIX + 'LOADING';
const CANCEL_LOADING = PREFIX + 'CANCEL_LOADING';
const SET_TABLE_DATA = PREFIX + 'SET_TABLE_DATA';
const SET_SEARCH_DATA = PREFIX + 'SET_SEARCH_DATA';
const SET_PAGINATION = PREFIX + 'SET_PAGINATION';
const SET_SEARCH_PARAM = PREFIX + 'SET_SEARCH_PARAM';

const initState = { ...commListState };

export function securitySysParam(state = initState, action) {
  switch(action.type) {
    case SET_BUTTON_LIST:
      return {...state, btnList: action.payload};
    case SET_TABLE_DATA:
      return {...state, msg: '', tableList: action.payload};
    case SET_SEARCH_DATA:
      return {...state, searchData: {...state.searchData, [action.payload.key]: action.payload.data}};
    case SET_PAGINATION:
      return {...state, pagination: action.payload};
    case SET_SEARCH_PARAM:
      return {...state, searchParam: action.payload};
    case LOADING:
      return {...state, fetching: true};
    case CANCEL_LOADING:
      return {...state, fetching: false};
    default:
      return state;
  }
}

export function setBtnList(data) {
  return { type: SET_BUTTON_LIST, payload: data };
}

export function doFetching() {
  return { type: LOADING };
}

export function cancelFetching() {
  return { type: CANCEL_LOADING };
}

export function setTableData(data) {
  return { type: SET_TABLE_DATA, payload: data };
}

export function setSearchData(data) {
  return { type: SET_SEARCH_DATA, payload: data };
}

export function setPagination(data) {
  return { type: SET_PAGINATION, payload: data };
}

export function setSearchParam(data) {
  return { type: SET_SEARCH_PARAM, payload: data };
}

export function clearSearchParam() {
  return setSearchParam({});
}
