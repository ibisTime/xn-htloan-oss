import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/overdueList-addedit';
import {
  getQueryString
} from 'common/js/util';
import {
  DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizBlackListAddedit, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class blackListAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '贷款人',
      readonly: true,
      formatter: (v, d) => {
        return d.user.realName;
      }
    }, {
      title: '手机号',
      readonly: true,
      formatter: (v, d) => {
        return d.user.mobile;
      }
    }, {
      title: '身份证号',
      readonly: true,
      formatter: (v, d) => {
        return d.user.idNo;
      }
    }, {
      title: '贷款金额',
      field: 'loanAmount',
      readonly: true,
      amount: true
    }, {
      title: '剩余欠款',
      field: 'overplusAmount',
      readonly: true,
      amount: true
    }, {
      title: '未还清收总成本',
      field: 'restTotalCost',
      readonly: true,
      amount: true
    }, {
      title: '还款计划表',
      field: 'repayBiz',
      type: 'o2m',
      options: {
        fields: [{
          title: '每期还款金额',
          field: 'repayCapital',
          amount: true
        }, {
          title: '每期清收成本',
          field: 'totalFee',
          amount: true
        }, {
          title: '还款日期',
          field: 'repayDatetime',
          type: 'date'
        }, {
          title: '逾期押金',
          field: 'overdueDeposit'
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

export default blackListAddedit;
