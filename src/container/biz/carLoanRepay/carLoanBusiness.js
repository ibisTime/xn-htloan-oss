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
} from '@redux/biz/carLoanBusiness';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, showSucMsg} from 'common/js/util';
import {Button, Upload, Modal} from 'antd';
import {lowerFrame, onShelf} from 'api/biz';

@listWrapper(state => ({
  ...state.bizCarLoanBusiness,
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
class Brand extends React.Component {
  render() {
    const fields = [
      {
        title: '业务编号',
        field: 'code',
        search: true
      }, {
        title: '贷款人',
        field: 'realName',
        search: true
      }, {
        title: '手机号',
        field: 'mobile'
      }, {
        title: '车辆',
        field: 'carCode'
      }, {
        title: '车辆总价',
        field: 'carPrice',
        amount: true
      }, {
        title: '首付金额',
        field: 'sfAmount',
        amount: true
      }, {
        title: '贷款银行',
        field: 'bankName'
      }, {
        title: '贷款金额',
        field: 'loanAmount',
        amount: true
      }, {
        title: '银行利率(%)',
        field: 'bankRate'
      }, {
        title: '期数',
        field: 'periods'
      }, {
        title: '月供',
        field: 'monthAmount'
      }, {
        title: '状态',
        field: 'status',
        search: true,
        type: 'select',
        key: 'loan_order_status'
      }, {
        title: '备注',
        field: 'remark'
      }
    ];
    return this.props.buildList({
        fields,
        pageCode: 630505,
        btnEvent: {
          check: (selectedRowKeys, selectedRows) => {
            if (!selectedRowKeys.length) {
              showWarnMsg('请选择记录');
            } else if (selectedRowKeys.length > 1) {
              showWarnMsg('请选择一条记录');
            } else {
              this.props.history.push(`/biz/carLoanBusiness/check?staffCode=${selectedRowKeys[0]}`);
            }
          },
          changecar: (selectedRowKeys, selectedRows) => {
            if (!selectedRowKeys.length) {
              showWarnMsg('请选择记录');
            } else if (selectedRowKeys.length > 1) {
              showWarnMsg('请选择一条记录');
            } else {
              this.props.history.push(`/biz/refundBusiness/plan?staffCode=${selectedRowKeys[0]}`);
            }
          }
        }
      });
  }
}

export default Brand;
