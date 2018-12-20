import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/wares/refundCheck-addedit';
import { getQueryString, getUserId, showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(state => state.waresRefundCheckAddedit, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class RefundCheckAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.check = !!getQueryString('check', this.props.location.search);
  }
  approveBill(params, approveResult) {
    params.approveResult = approveResult;
    params.code = this.code;
    params.updater = getUserId();
    this.props.doFetching();
    fetch(630545, params).then(() => {
      showSucMsg('操作成功');
      this.props.cancelFetching();
      setTimeout(() => {
        this.props.history.go(-1);
      }, 1000);
    }).catch(this.props.cancelFetching);
  }
  render() {
    const fields = [{
      title: '业务编号',
      field: 'code',
      readonly: true
    }, {
      field: 'user',
      title: '贷款人',
      formatter: (v, d) => {
        return d.user.realName;
      },
      readonly: true
    }, {
      title: '总期数',
      field: 'periods'
    }, {
      title: '当前期数',
      field: 'curPeriods'
    }, {
      title: '本期剩余欠款(元)',
      field: 'overplusAmount',
      amount: true
    }, {
      title: '还款截图',
      field: 'prepayPhoto',
      type: 'img'
    }];
    let config = {
      fields,
      code: this.code,
      view: true,
      detailCode: 630541
    };
    if (this.check) {
      config.fields.push({
        title: '审核说明',
        field: 'approveNote',
        required: true,
        readonly: false
      });
      config.buttons = [{
        title: '通过',
        check: true,
        handler: (params) => {
          this.approveBill(params, 1);
        }
      }, {
        title: '不通过',
        check: true,
        handler: (params) => {
          this.approveBill(params, 0);
        }
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

export default RefundCheckAddedit;
