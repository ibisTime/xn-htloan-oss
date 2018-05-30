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
} from '@redux/biz/redList';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, showSucMsg} from 'common/js/util';
import {Button, Upload, Modal} from 'antd';
import {lowerFrame, onShelf} from 'api/biz';

@listWrapper(state => ({
  ...state.bizredList,
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
class redList extends React.Component {
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
        title: '手机号',
        field: 'mobile',
        search: true,
        render: (v, d) => {
          return d.user.mobile;
        }
      }, {
        title: '贷款金额',
        field: 'totalFee',
        amount: true
      }, {
        title: '剩余欠款',
        field: 'totalFee',
        amount: true
      }, {
        title: '未还清收成本',
        field: 'totalFee',
        amount: true
      }, {
        title: '标识日期',
        field: 'overdueHandleDatetime',
        type: 'date'
      }, {
        title: '状态',
        field: 'status'
      }
    ];
    return this.props.buildList({
        fields,
        pageCode: 630540,
        searchParams: {
          status: '4'
        },
        btnEvent: {
          pay: (selectedRowKeys, selectedRows) => {
            if (!selectedRowKeys.length) {
              showWarnMsg('请选择记录');
            } else if (selectedRowKeys.length > 1) {
              showWarnMsg('请选择一条记录');
            } else {
              this.props.history.push(`/biz/redList/pay?staffCode=${selectedRowKeys[0]}`);
            }
          },
          check: (selectedRowKeys, selectedRows) => {
            if (!selectedRowKeys.length) {
              showWarnMsg('请选择记录');
            } else if (selectedRowKeys.length > 1) {
              showWarnMsg('请选择一条记录');
            } else {
              this.props.history.push(`/biz/redList/check?staffCode=${selectedRowKeys[0]}`);
            }
          },
          enter: (selectedRowKeys, selectedRows) => {
            if (!selectedRowKeys.length) {
              showWarnMsg('请选择记录');
            } else if (selectedRowKeys.length > 1) {
              showWarnMsg('请选择一条记录');
            } else {
              this.props.history.push(`/biz/redList/enter?staffCode=${selectedRowKeys[0]}`);
            }
          },
          apply: (selectedRowKeys, selectedRows) => {
            if (!selectedRowKeys.length) {
              showWarnMsg('请选择记录');
            } else if (selectedRowKeys.length > 1) {
              showWarnMsg('请选择一条记录');
            } else {
              this.props.history.push(`/biz/redList/apply?staffCode=${selectedRowKeys[0]}`);
            }
          }
        }
      });
  }
}

export default redList;
