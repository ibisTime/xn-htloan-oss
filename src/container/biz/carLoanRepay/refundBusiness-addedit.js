import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/refundBusiness-addedit';
import {getQueryString} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(state => state.bizRefundBusinessAddedit, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class refundBusinessAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [
      {
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
        amount: true,
        readonly: true
      }, {
        title: '总期数',
        field: 'periods',
        readonly: true
      }, {
        title: '剩余期数',
        field: 'restPeriods',
        readonly: true
      }, {
        title: '剩余欠款',
        field: 'restAmount',
        amount: true,
        readonly: true
      }, {
        title: '未还清收成本',
        field: 'restTotalCost',
        amount: true,
        readonly: true
      }, {
        title: '可退押金金额',
        field: 'sfAmount',
        amount: true,
        readonly: true
      }, {
        title: '扣除违约金额',
        field: 'cutLyDeposit',
        amount: true,
        required: true
      }, {
        title: '实际退款金额',
        field: 'actualRefunds',
        amount: true,
        readonly: true
      }, {
        title: '结清时间',
        field: 'closeDatetime',
        type: 'img'
      }];
    return this.props.buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 630521
      });
  }
}

export default refundBusinessAddedit;
