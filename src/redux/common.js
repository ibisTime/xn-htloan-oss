export const commListState = {
  fetching: false,
  msg: '',
  btnList: [],
  tableList: [],
  searchParam: {},
  searchData: {},
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0
  }
};

export const commDetailState = {
  code: '',
  view: false,
  fetching: false,
  selectData: {},
  pageData: {},
  isLoaded: false
};
