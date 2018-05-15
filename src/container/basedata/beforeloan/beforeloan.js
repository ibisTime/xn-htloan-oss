import React from 'react';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/basedata/beforeloan';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import { Button, Upload, Modal } from 'antd';
import { lowerFrame, onShelf } from 'api/biz';

@listWrapper(
  state => ({
    ...state.bizBeforeloan,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Beforeloan extends React.Component {
  render() {
    const fields = [{
      title: '期数',
      field: 'name',
      search: true
    }, {
      title: '利率（%）',
      field: 'letter'
    }];
    return this.props.buildList({
      fields,
      pageCode: 630405
    });
  }
}

export default Beforeloan;
