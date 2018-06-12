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
} from '@redux/biz/greenList';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, showSucMsg} from 'common/js/util';
import {Button, Upload, Modal} from 'antd';
import {lowerFrame, onShelf} from 'api/biz';

@listWrapper(state => ({
  ...state.bizGreenList,
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
})
class greenList extends React.Component {
  render() {
    const fields = [
      {
        title: '业务编号',
        field: 'code',
        search: true
      }, {
        title: '贷款人',
        field: 'realName',
        search: true,
        render: (v, d) => {
          return d.user.realName;
        }
      }, {
        title: '逾期日期',
        field: 'repayDatetime',
        type: 'date'
      }, {
        title: '清收成本(元)',
        field: 'totalFee',
        amount: true
      }, {
        title: '已缴纳清收成本(元)',
        field: 'payedFee',
        amount: true
      }, {
        title: '逾期保证金(元)',
        field: 'overdueDeposit',
        amount: true
      }
    ];
    return this.props.buildList({
        fields,
        pageCode: 630540,
        searchParams: {
          refType: '0',
          curNodeCode: '004_04'
        },
        btnEvent: {
          payment: (selectedRowKeys, selectedRows) => {
            if (!selectedRowKeys.length) {
              showWarnMsg('请选择记录');
            } else if (selectedRowKeys.length > 1) {
              showWarnMsg('请选择一条记录');
            } else {
              this.props.history.push(`/biz/greenList/payment?staffCode=${selectedRowKeys[0]}`);
            }
          }
        }
      });
  }
}

export default greenList;
