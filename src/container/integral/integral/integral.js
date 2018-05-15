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
} from '@redux/integral/integral';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import { Button, Upload, Modal } from 'antd';
import { lowerFrame, onShelf } from 'api/biz';

@listWrapper(
  state => ({
    ...state.bizIntegral,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Integral extends React.Component {
  render() {
    const fields = [{
      title: '规则名称',
      field: 'name',
      search: true
    }, {
      title: '规则分类',
      field: 'letter'
    }, {
      title: '数值',
      field: 'status',
      search: true,
      type: 'select',
      key: 'status'
    }, {
      title: '备注',
      field: 'updater'
    }];
    return this.props.buildList({
      fields,
      pageCode: 630405
    });
  }
}

export default Integral;
