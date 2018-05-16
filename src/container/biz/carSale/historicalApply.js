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
} from '@redux/biz/historicalApply';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import { Button, Upload, Modal } from 'antd';
import { lowerFrameSys, onShelfSys } from 'api/biz';

@listWrapper(
  state => ({
    ...state.bizHistoricalApply,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class HistoricalApply extends React.Component {
  render() {
    const fields = [{
      title: '订单编号',
      field: 'code'
    }, {
      title: '申请人',
      field: 'userId',
      type: 'select',
      search: true
    }, {
      title: '意向车辆',
      field: 'status'
    }, {
      title: '车辆总价',
      field: 'price'
    }, {
      title: '首付金额',
      field: 'sfAmount'
    }, {
      title: '申请时间',
      field: 'createDatetime'
    }, {
      title: '车贷计算器信息',
      field: 'saleDesc'
    }];
    return this.props.buildList({
      fields,
      pageCode: 630435,
      searchParams: {
          status: '1'
      }
    });
  }
}

export default HistoricalApply;
