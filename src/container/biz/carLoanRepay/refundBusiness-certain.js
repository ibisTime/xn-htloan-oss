import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/refundBusiness-certain';
import {getQueryString, getUserId, showSucMsg} from 'common/js/util';
import fetch from 'common/js/fetch';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(state => state.bizRefundBusinessCertian, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class refundBusinessCertain extends React.Component {
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
        title: '是否提前还款',
        field: 'subbranch',
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
        type: 'datetime'
      }, {
        title: '结清证明',
        field: 'closeAttach',
        type: 'img'
      }
    ];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 630521,
        buttons: [{
          title: '确认',
          handler: (param) => {
            param.bankcardCode = this.bankcardCode;
            param.code = this.code;
            param.updater = getUserId();
            this.props.doFetching();
            fetch(630513, param).then(() => {
              showSucMsg('操作成功');
              this.props.cancelFetching();
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
            }).catch(this.props.cancelFetching);
          },
          check: true,
          type: 'primary'
        }, {
          title: '返回',
          handler: (param) => {
            this.props.history.go(-1);
          }
        }]
      });
  }
}

export default refundBusinessCertain;
