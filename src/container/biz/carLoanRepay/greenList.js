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
        field: 'code'
      }, {
        title: '贷款人',
        field: 'realName',
        search: true
      }, {
        title: '预期日期',
        field: 'periods',
        type: 'data'
      }, {
        title: '标识日期',
        field: 'monthAmount',
        type: 'data'
      }, {
        title: '清收成本(元)',
        field: 'status',
        amount: true
      }, {
        title: '未还清收成本(元)',
        field: 'remark',
        amount: true
      }, {
        title: '保证金(元)',
        field: 'remark',
        amount: true
      }, {
        title: '可退保证金(元)',
        field: 'remark',
        amount: true
      }
    ];
    return this.props.buildList({
        fields,
        pageCode: 630540,
        searchParams: {
          status: 4
        },
        btnEvent: {
          refundplan: (selectedRowKeys, selectedRows) => {
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
