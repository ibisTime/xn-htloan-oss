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
} from '@redux/biz/bankMoney';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, getRoleCode, dateTimeFormat, getUserId } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.bizBankMoney,
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
class bankMoney extends React.Component {
  render() {
    const fields = [{
      title: '业务编号',
      field: 'code',
      search: true
    }, {
      title: '业务公司',
      field: 'companyCode',
      listCode: 630106,
      params: {
        typeList: [1],
        status: '1'
      },
      type: 'select',
      keyName: 'code',
      valueName: 'name',
      search: true
    }, {
      title: '业务团队',
      field: 'teamName'
    }, {
      title: '信贷专员',
      field: 'saleUserId',
      type: 'select',
      pageCode: 630065,
      params: {
        type: 'P',
        roleCodeList: ['SR201800000000000000YWY', 'SR20180000000000000NQZY']
      },
      keyName: 'userId',
      valueName: '{{companyName.DATA}}-{{realName.DATA}}',
      searchName: 'realName',
      search: true,
      render: (v, d) => {
        return d.saleUserName;
      }
    }, {
      title: '客户姓名',
      field: 'applyUserName',
      search: true,
      render: (v, d) => {
        return d.creditUser ? d.creditUser.userName : '';
      }
    }, {
      title: '贷款银行',
      field: 'loanBankName',
      render: (v, d) => {
        if (d.loanBankName) {
          return d.repaySubbranch ? d.loanBankName + d.repaySubbranch : d.loanBankName;
        } else if (d.repaySubbranch) {
          return d.loanBankName ? d.loanBankName + d.repaySubbranch : d.repaySubbranch;
        }
      }
    }, {
      title: '贷款金额',
      field: 'loanAmount',
      amount: true
    }, {
      title: '贷款期数',
      field: 'loanPeriod',
      render: (v, d) => {
        return d.loanInfo ? d.loanInfo.periods : '-';
      }
    }, {
      title: '购车途径',
      field: 'bizType',
      type: 'select',
      key: 'budget_orde_biz_typer'
    }, {
      title: '申请日期',
      field: 'applyDatetime',
      rangedate: ['applyDatetimeStart', 'applyDatetimeEnd'],
      type: 'date',
      render: dateTimeFormat,
      search: true
    }, {
      title: '放款日期',
      field: 'bankFkDatetime',
      type: 'date'
    }, {
      title: '状态',
      field: 'curNodeCode',
      type: 'select',
      listCode: 630147,
      keyName: 'code',
      valueName: 'name',
      params: {type: 'e'},
      afterDetail: (list) => {
          return list && list.length ? list.filter(l => l.code !== 'e6') : [];
      },
      search: true
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildList({
      fields,
      pageCode: 632515,
      searchParams: {
        userId: getUserId(),
        roleCode: getRoleCode(),
        curNodeCodeList: ['e1', 'e2', 'e1x', 'e3', 'e4', 'e5', 'e7', 'e8', 'e9', 'e10']
      },
      btnEvent: {
        // 确认提交银行
        sub: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].curNodeCode !== 'e3') {
            showWarnMsg('当前不是确认提交银行节点');
          } else {
            this.props.history.push(`/biz/bankMoney/sub?code=${selectedRowKeys[0]}`);
          }
        },
        // 录入放款信息
        enter: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].curNodeCode !== 'e4') {
            showWarnMsg('当前不是录入放款信息节点');
          } else {
            this.props.history.push(`/biz/bankMoney/enter?code=${selectedRowKeys[0]}`);
          }
        },
        // 确认收款
        certain: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].curNodeCode !== 'e5') {
            showWarnMsg('当前不是确认收款节点');
          } else {
            this.props.history.push(`/biz/bankMoney/certain?code=${selectedRowKeys[0]}`);
          }
        },
        detail: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/ywcx/ywcx/addedit?v=1&code=${selectedRowKeys[0]}`);
          }
        },
        // 资料补录
        record: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].curNodeCode !== 'e1' &&
            selectedRows[0].curNodeCode !== 'e2' &&
            selectedRows[0].curNodeCode !== 'e3' &&
            selectedRows[0].curNodeCode !== 'e4' &&
            selectedRows[0].curNodeCode !== 'e5') {
            showWarnMsg('当前不是录入节点');
          } else {
            this.props.history.push(`/biz/bankMoney/record?code=${selectedRowKeys[0]}&bizType=${selectedRows[0].bizType}`);
          }
        }
      }
    });
  }
}

export default bankMoney;
