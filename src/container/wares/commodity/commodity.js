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
} from '@redux/wares/commodity';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import { Button, Upload, Modal } from 'antd';
import { lowerFrame, onShelf } from 'api/biz';

@listWrapper(
  state => ({
    ...state.waresCommodity,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Commodity extends React.Component {
  render() {
    const fields = [{
      title: '名称',
      field: 'name',
      search: true
    }, {
      title: '类别',
      field: ''
    }, {
      title: '价格(元)',
      field: ''
    }, {
      title: '最低购买信用分',
      field: ''
    }, {
      title: 'UI位置',
      field: 'letter'
    }, {
      title: 'UI次序',
      field: ''
    }, {
      title: '状态',
      field: 'status',
      search: true,
      type: 'select',
      key: 'status'
    }, {
      title: '最新修改人',
      field: 'updater'
    }, {
      title: '最新修改时间',
      field: 'updateDatetime',
      type: 'datetime'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildList({
      fields,
      pageCode: 808025
    });
  }
}

export default Commodity;
