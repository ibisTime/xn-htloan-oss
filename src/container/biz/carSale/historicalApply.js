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
import { dateTimeFormat } from 'common/js/util';

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
      search: true,
      render: (v, data) => {
        // let prefix = data.user && data.user.realName ? data.user.realName + '-' : '';
        // return prefix + (data.user.mobile || '');
        if (data.name) {
          return data.name ? data.name + '-' + data.userMobile : data.name;
        } else if(data.userMobile) {
          return data.userMobile ? data.userMobile + '-' + data.name : data.userMobile;
        }
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
      field: 'statusForQuery',
      type: 'select',
      data: [{
        k: '1',
        v: '已处理'
      }, {
        k: '2',
        v: '已作废'
      }],
      keyName: 'k',
      valueName: 'v',
      render: (v, d) => {
        return d.status === '1' ? '已处理' : '已作废';
      },
      search: true
    }];
    return this.props.buildList({
      fields,
      pageCode: 630435,
      searchParams: {
        statusList: ['1', '2']
      }
    });
  }
}

export default HistoricalApply;
