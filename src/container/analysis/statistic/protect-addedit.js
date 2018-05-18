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
import {
  listWrapper
} from 'common/js/build-list';
import {
  showWarnMsg,
  showSucMsg
} from 'common/js/util';
import {
  Button,
  Upload,
  Modal
} from 'antd';
import {
  lowerFrame,
  onShelf
} from 'api/biz';

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
      field: 'user',
      search: true,
      render: (v, d) => {
        return d.user.realName;
      }
    }, {
      title: '手机号',
      field: 'mobile',
      render: (v, d) => {
        return d.user.mobile;
      }
    }, {
      title: '车辆',
      field: 'carCode'
    }, {
      title: '贷款银行',
      field: 'loanBank'
    }, {
      title: '贷款金额',
      field: 'loanAmount',
      amount: true
    }, {
      title: '期数',
      field: 'periods'
    }, {
      title: '剩余期数',
      field: 'restPeriods'
    }, {
      title: '还款日',
      field: 'monthDatetime'
    }, {
      title: '月供',
      field: 'monthAmount',
      amount: true
    }, {
      title: '剩余欠款',
      field: 'restAmount',
      amount: true
    }, {
      title: '未还清收成本',
      field: 'restTotalCost',
      amount: true
    }, {
      title: '逾期金额',
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
      field: 'periods'
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      select: true,
      key: 'repay_biz_status'
    }];
    return this.props.buildList({
      fields,
      pageCode: 630520,
      searchParams: {
          status: '0'
      },
      btnEvent: {
        refundplan: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/biz/refundBusiness/plan?code=${selectedRowKeys[0]}&userId=${selectedRows[0].user.userId}`);
          }
        },
        changeCard: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/biz/refundBusiness/changecard?code=${selectedRowKeys[0]}&userId=${selectedRows[0].user.userId}`);
          }
        },
        certain: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/biz/refundBusiness/certain?code=${selectedRowKeys[0]}`);
          }
        }
      }
    });
  }
}

export default refundBusiness;