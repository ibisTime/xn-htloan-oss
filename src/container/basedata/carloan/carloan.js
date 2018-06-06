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
} from '@redux/basedata/carloan';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import { Button, Upload, Modal } from 'antd';
import { lowerFrame, onShelf } from 'api/biz';

@listWrapper(
  state => ({
    ...state.bizCarloan,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Carloan extends React.Component {
  render() {
    const fields = [{
      title: '期数',
      field: 'ckey'
    }, {
      title: '利率（%）',
      field: 'cvalue'
    }];
    return this.props.buildList({
      fields,
      pageCode: 630045,
      rowKey: 'id',
      searchParams: {
        type: 'car_periods'
      }
    });
  }
}

export default Carloan;
