import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/historyBusinessManage-addedit';
import {
  getQueryString
} from 'common/js/util';
import {
  DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizHistoryBusinessManageAddedit, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class historyBusinessManageAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  goDetail(data) {
    this.props.history.push('/biz/historyBusinessManage/addedit/addedit?code=' + data);
  }
  render() {
    const fields = [{
      title: '业务编号',
      field: 'code'
    }, {
      title: '贷款人',
      field: 'realName',
      formatter: (v, d) => {
        return d.user.realName;
      }
    }, {
      title: '当前节点',
      field: 'curNodeCode',
      type: 'select',
      listCode: 630147,
      keyName: 'code',
      valueName: 'name'
    }, {
      title: '身份证号',
      field: 'idNo',
      formatter: (v, d) => {
        return d.user.idNo;
      }
    }, {
      title: '贷款期数',
      field: 'periods'
    }, {
      title: '贷款金额',
      field: 'loanAmount',
      amount: true
    }, {
      title: '剩余欠债',
      field: 'restAmount',
      amount: true
    }, {
      title: '未还清收总成本',
      field: 'restTotalCost',
      amount: true
    }, {
      title: '实际退款金额',
      field: 'actualRefunds',
      amount: true
    }, {
      title: '还款计划表',
      field: 'repayPlanList',
      type: 'o2m',
      options: {
        fields: [{
          title: '当前期数',
          field: 'curPeriods'
        }, {
          title: '应还本息',
          field: 'repayInterest',
          render: (v, d) => {
            return (d.repayCapital + d.repayInterest) / 1000;
          }
        }, {
          title: '实还金额',
          field: 'payedAmount',
          amount: true
        }, {
          title: '逾期金额',
          field: 'overdueAmount',
          amount: true
        }, {
          title: '还款日期',
          field: 'repayDatetime',
          type: 'date'
        }, {
          title: '剩余欠款',
          field: 'overplusAmount',
          amount: true
        }, {
          title: '逾期处理',
          field: 'overdueDeposit',
          render: (v, d) => {
            return <a onClick = { () => this.goDetail(d.code) } href = "javascript:void(0)"> 详情 </a>;
          }
        }]
      }
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 630521
      });
  }
}

export default historyBusinessManageAddedit;
