import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/refundBusiness-apply';
import { getQueryString, getUserId, showSucMsg, formatDate } from 'common/js/util';
import fetch from 'common/js/fetch';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(state => state.bizRefundBusinessApply, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class RefundBusinessApply extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.check = getQueryString('check', this.props.location.search);
  }
  approveBill(param, approveResult) {
    param.approveResult = approveResult;
    param.updater = getUserId();
    this.props.doFetching();
    fetch(630516, param).then(() => {
      showSucMsg('操作成功');
      this.props.cancelFetching();
      setTimeout(() => {
        this.props.history.go(-1);
      }, 1000);
    }).catch(this.props.cancelFetching);
  }
  render() {
    let fields = [{
      title: '贷款人',
      field: 'realName',
      readonly: true,
      formatter: (v, d) => {
        return d.user.realName;
      }
    }, {
      title: '手机号',
      field: 'mobile',
      readonly: true,
      formatter: (v, d) => {
        return d.user.mobile;
      }
    }, {
      title: '身份证号',
      field: 'idNo',
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
      title: '业务团队',
      field: 'teamName',
      readonly: true,
      formatter: (v, d) => d.budgetOrder ? d.budgetOrder.teamName : ''
    }, {
      title: '信贷专员',
      field: 'saleUserName',
      readonly: true,
      formatter: (v, d) => d.budgetOrder ? d.budgetOrder.saleUserName : ''
    }, {
      title: '内勤专员',
      field: 'insideJobName',
      readonly: true,
      formatter: (v, d) => d.budgetOrder ? d.budgetOrder.insideJobName : ''
    }, {
      title: '银行放款时间',
      field: 'bankFkDatetime',
      readonly: true,
      formatter: (v, d) => d.budgetOrder ? formatDate(d.budgetOrder.bankFkDatetime) : ''
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
      title: '可退保证金',
      field: 'retreatDeposit',
      amount: true,
      readonly: true
    }, {
      title: '纸质申请照片',
      field: 'paperPhoto',
      type: 'img',
      required: !this.check,
      readonly: this.check
    }, {
      title: '备注',
      field: 'remark',
      readonly: this.check
    }];
    let config = {
      fields,
      code: this.code,
      view: this.view,
      detailCode: 630521,
      editCode: 630515
    };
    if (this.check) {
      config.fields.push({
        title: '审核说明',
        field: 'approveNote'
      });
      config.buttons = [{
        title: '通过',
        handler: (param) => {
          this.approveBill(param, 1);
        },
        check: true,
        type: 'primary'
      }, {
        title: '不通过',
        handler: (param) => {
          this.approveBill(param, 0);
        },
        check: true
      }, {
        title: '返回',
        handler: (param) => {
          this.props.history.go(-1);
        }
      }];
    }
    return this.props.buildDetail(config);
  }
}

export default RefundBusinessApply;
