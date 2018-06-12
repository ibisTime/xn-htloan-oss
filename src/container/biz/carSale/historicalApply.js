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
import {
  listWrapper
} from 'common/js/build-list';
import {
  showWarnMsg,
  showSucMsg,
  dateTimeFormat
} from 'common/js/util';
import {
  Button,
  Upload,
  Modal
} from 'antd';
import {
  lowerFrameSys,
  onShelfSys
} from 'api/biz';

@listWrapper(
  state => ({
    ...state.bizHistoricalApply,
    parentCode: state.menu.subMenuCode
  }), {
    setTableData,
    clearSearchParam,
    doFetching,
    setBtnList,
    cancelFetching,
    setPagination,
    setSearchParam,
    setSearchData
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
      listCode: 630066,
      keyName: 'userId',
      valueName: 'realName',
      search: true,
      render: (v, data) => {
          return data.user ? data.user.realName : '-';
      }
    }, {
      title: '车辆总价',
      amount: true,
      field: 'price'
    }, {
      title: '首付金额',
      amount: true,
      field: 'sfAmount'
    }, {
      title: '申请时间',
      field: 'createDatetime',
      type: 'date',
      rangedate: ['createDatetimeStart', 'createDatetimeEnd'],
      render: dateTimeFormat,
      search: true
    }, {
      title: '处理人',
      field: 'handler',
      type: 'select',
      listCode: 630066,
      keyName: 'userId',
      valueName: 'realName'
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'can_order_status',
      search: true
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