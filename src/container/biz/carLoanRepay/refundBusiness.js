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
} from '@redux/biz/refundBusiness';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, getUserId } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.bizRefundBusiness,
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
class refundBusiness extends React.Component {
  render() {
    const fields = [{
      title: '业务编号',
      field: 'code',
      search: true
    }, {
      title: '贷款人',
      field: 'userId',
      search: true,
      render: (v, d) => {
        return d.realName;
      },
      type: 'select',
      pageCode: 805120,
      keyName: 'userId',
      valueName: 'realName',
      searchName: 'realName'
    }, {
      title: '手机号',
      field: 'mobile',
      render: (v, d) => {
        return d.user.mobile;
      },
      nowrap: true
    }, {
      title: '贷款银行',
      field: 'loanBankName'
    }, {
      title: '贷款金额(元)',
      field: 'loanAmount',
      amount: true
    }, {
      title: '贷款期数',
      field: 'periods'
    }, {
      title: '剩余期数',
      field: 'restPeriods'
    }, {
      title: '还款日',
      field: 'monthDatetime'
    }, {
      title: '月供(元)',
      field: 'monthAmount',
      amount: true
    }, {
      title: '剩余欠款(元)',
      field: 'restAmount',
      amount: true
    }, {
      title: '未还清收总成本(元)',
      field: 'restTotalCost',
      amount: true
    }, {
      title: '逾期金额(元)',
      field: 'overdueAmount',
      amount: true
    }, {
      title: '累计逾期期数',
      field: 'totalOverdueCount'
    }, {
      title: '实际逾期期数',
      field: 'curOverdueCount'
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
      valueName: 'name',
      search: true
    }, {
      title: '关键字搜索',
      field: 'keyword',
      hidden: true,
      search: true
    }];
    return this.props.buildList({
      fields,
      pageCode: 630522,
      searchParams: {
        refType: '0',
        curNodeCode: 'j1',
          userId: getUserId()
      },
      btnEvent: {
        // 还款计划
        refundplan: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/biz/refundBusiness/plan?code=${selectedRowKeys[0]}&userId=${selectedRows[0].user.userId}`);
          }
        },
        // 提前还款申请
        apply: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/biz/refundBusiness/apply?code=${selectedRowKeys[0]}`);
          }
        },
        // 提前还款审核
        certain: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/biz/refundBusiness/apply?code=${selectedRowKeys[0]}&check=1`);
          }
        },
        // 详情
        detail: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/biz/refundBusiness/addedit?code=${selectedRows[0].budgetOrder.code}&v=1`);
          }
        }
      }
    });
  }
}

export default refundBusiness;
