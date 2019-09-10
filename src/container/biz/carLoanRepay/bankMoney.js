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
      valueName: 'name'
    }, {
      title: '客户姓名',
      field: 'customerName',
      search: true
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
      field: 'periods'
    }, {
      title: '购车途径',
      field: 'bizType',
      type: 'select',
      key: 'budget_orde_biz_typer'
    }, {
      title: '业务员',
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
      render: (v, d) => {
        return d.saleUserName;
      }
    }, {
      title: '申请时间',
      field: 'applyDatetime',
      rangedate: ['applyDatetimeStart', 'applyDatetimeEnd'],
      type: 'date',
      render: dateTimeFormat
    }, {
      title: '状态',
      field: 'curNodeCode',
      type: 'select',
      listCode: 630147,
      keyName: 'code',
      valueName: 'name',
      search: true
    }];
    return this.props.buildList({
      fields,
      pageCode: 632515,
      searchParams: {
        userId: getUserId(),
        roleCode: getRoleCode(),
        curNodeCodeList: ['d1', 'd2', 'd3', 'd4']
      },
      btnEvent: {
        // 确认提交银行
        sub: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/biz/bankMoney/cSs?code=${selectedRowKeys[0]}`);
          }
        },
        // 录入放款信息
        enter: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/biz/bankMoney/cSs2?code=${selectedRowKeys[0]}`);
          }
        },
        // 确认收款
        certain: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/biz/bankMoney/enterBk?code=${selectedRowKeys[0]}`);
          }
        },
        // 确认收款
        prepareCollection: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/biz/bankMoney/cRs?code=${selectedRowKeys[0]}`);
          }
        },
        detail: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/preLoan/Access/detail?code=${selectedRowKeys[0]}`);
          }
        },
        // 资料补录
        record: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].curNodeCode !== 'e1' &&
              selectedRows[0].curNodeCode !== 'e1x' &&
            selectedRows[0].curNodeCode !== 'e2' &&
              selectedRows[0].curNodeCode !== 'e7' &&
              selectedRows[0].curNodeCode !== 'e8') {
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
