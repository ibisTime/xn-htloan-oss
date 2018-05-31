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
} from '@redux/loan/apply-admittance';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode,
    dateTimeFormat
} from 'common/js/util';
import { listWrapper } from 'common/js/build-list';
import {
  lowerFrame,
  onShelf,
  sendMsg
} from 'api/biz';

@listWrapper(
  state => ({
    ...state.loanApplyAdmittance,
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
class ApplyAdmittance extends React.Component {
  render() {
    const fields = [{
      title: '业务公司',
      field: 'companyName'
    }, {
      title: '客户姓名',
      field: 'userName',
      render: (e, t) => {
        return (t.creditUser ? t.creditUser.userName : '-');
      }
    }, {
      title: '手机号',
      field: 'mobile',
      render: (e, t) => {
        return (t.creditUser ? t.creditUser.mobile : '-');
      }
    }, {
      title: '贷款银行',
      field: 'loanBankCode',
      type: 'select',
      listCode: 632037,
      keyName: 'code',
      valueName: '{{bankName.DATA}}{{subbranch.DATA}}'
    }, {
      title: '贷款金额',
      field: 'loanAmount',
      amount: true
    }, {
      title: '业务员',
      field: 'saleUserName'
    }, {
      title: '申请日期',
      field: 'applyDatetime',
      rangedate: ['applyDatetimeStart', 'applyDatetimeEnd'],
      type: 'date',
      render: dateTimeFormat,
      search: true
    }, {
      title: '当前节点',
      field: 'curNodeCode',
      type: 'select',
      listCode: 630147,
      keyName: 'code',
      valueName: 'name'
    }];
    return this.props.buildList({
        fields,
        pageCode: 632115,
        searchParams: {
          roleCode: getRoleCode()
        },
        btnEvent: {
          apply: (selectedRowKeys, selectedRows) => {
            if (!selectedRowKeys.length) {
              showWarnMsg('请选择记录');
            } else if (selectedRowKeys.length > 1) {
              showWarnMsg('请选择一条记录');
            } else {
              this.props.history.push(`/loan/applyAdmittance/addedit?code=${selectedRowKeys[0]}`);
            }
          }
        }
    });
  }
}

export default ApplyAdmittance;
