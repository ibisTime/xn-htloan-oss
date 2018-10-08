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
import { showWarnMsg, getRoleCode, getTeamCode, dateTimeFormat } from 'common/js/util';

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
        roleCode: 'SR201800000000000000YWY'
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
      search: true
    }, {
      title: '贷款银行',
      field: 'loanBankName',
      render: (v, d) => d.loanBankName ? d.loanBankName + d.repaySubbranch : ''
    }, {
      title: '贷款金额',
      field: 'loanAmount',
      amount: true
    }, {
      title: '贷款期数',
      field: 'loanPeriod'
    }, {
      title: '业务种类',
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
      title: '当前节点',
      field: 'curNodeCode',
      type: 'select',
      listCode: 630147,
      keyName: 'code',
      valueName: 'name'
    }, {
      title: '备注',
      field: 'remark'
    }, {
      title: '关键字搜索',
      field: 'keyword',
      hidden: true,
      search: true
    }];
    return this.props.buildList({
      fields,
      pageCode: 632148,
      searchParams: {
        roleCode: getRoleCode(),
        teamCode: getTeamCode(),
        curNodeCodeList: ['002_11', '002_13', '002_14', '002_15', '002_16', '002_17']
      },
      btnEvent: {
        settle: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].curNodeCode !== '002_11') {
            showWarnMsg('当前不是车辆落户节点');
          } else {
            this.props.history.push(`/biz/bankMoney/settle?code=${selectedRowKeys[0]}`);
          }
        },
        sub: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].curNodeCode !== '002_15') {
            showWarnMsg('当前不是确认提交银行节点');
          } else {
            this.props.history.push(`/biz/bankMoney/sub?code=${selectedRowKeys[0]}`);
          }
        },
        enter: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].curNodeCode !== '002_16') {
            showWarnMsg('当前不是录入放款信息节点');
          } else {
            this.props.history.push(`/biz/bankMoney/enter?code=${selectedRowKeys[0]}`);
          }
        },
        certain: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].curNodeCode !== '002_17') {
            showWarnMsg('当前不是确认收款节点');
          } else {
            this.props.history.push(`/biz/bankMoney/certain?code=${selectedRowKeys[0]}`);
          }
        },
        record: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].curNodeCode !== '002_11' && selectedRows[0].curNodeCode !== '002_12' && selectedRows[0].curNodeCode !== '002_13' && selectedRows[0].curNodeCode !== '002_14' && selectedRows[0].curNodeCode !== '002_15' && selectedRows[0].curNodeCode !== '002_16') {
            showWarnMsg('当前不是录入节点');
          } else {
            this.props.history.push(`/biz/bankMoney/record?code=${selectedRowKeys[0]}`);
          }
        }
      }
    });
  }
}

export default bankMoney;
