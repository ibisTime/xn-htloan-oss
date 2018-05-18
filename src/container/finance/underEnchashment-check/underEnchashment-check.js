import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/finance/underEnchashment-check';
import { getQueryString, getUserId, showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
  state => state.financeUnderEnchashmentCheck,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class UnderEnchashmentCheck extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.check = getQueryString('check', this.props.location.search);
  }
  render() {
    let fields = [{
      title: '编号',
      field: 'code'
    }, {
      title: '账号',
      field: 'accountNumber',
      required: true
    }, {
      title: '户名',
      field: 'accountName',
      required: true
    }, {
      field: 'type',
      title: '账户类型',
      type: 'select',
      key: 'account_type',
      required: true
    }, {
      field: 'amount',
      title: '金额',
      amount: true
    }, {
      field: 'fee',
      title: '手续费',
      amount: true
    }, {
      field: 'channelType',
      title: '支付渠道',
      type: 'select',
      key: 'channel_type'
    }, {
      field: 'payCardInfo',
      title: '银行类型'
    }, {
      field: 'payCardNo',
      title: '银行卡号'
    }, {
      field: 'status',
      title: '状态',
      type: 'select',
      key: 'jour_status'
    }, {
      field: 'applyUser',
      title: '申请人'
    }, {
      field: 'applyDatetime',
      title: '申请时间',
      type: 'datetime'
    }, {
      field: 'applyNote',
      title: '申请说明'
    }];
    let buttons = [];
    if (this.check) {
      fields.push({
        title: '审核意见',
        field: 'approveNote',
        maxlength: 250,
        required: true,
        readonly: false
      });
      buttons = [{
        title: '通过',
        handler: (param) => {
          param.approveResult = '1';
          param.approveUser = getUserId();
          param.codeList = [param.code];
          this.props.doFetching();
          fetch(802752, param).then(() => {
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
        title: '不通过',
        handler: (param) => {
          param.approveResult = '0';
          param.approveUser = getUserId();
          param.codeList = [param.code];
          this.props.doFetching();
          fetch(802752, param).then(() => {
            showSucMsg('操作成功');
            this.props.cancelFetching();
            setTimeout(() => {
              this.props.history.go(-1);
            }, 1000);
          }).catch(this.props.cancelFetching);
        },
        check: true
      }, {
        title: '返回',
        handler: (param) => {
          this.props.history.go(-1);
        }
      }];
    } else {
      let detailList = [{
        field: 'approveUser',
        title: '审核人'
      }, {
        field: 'approveDatetime',
        title: '审核时间',
        type: 'datetime'
      }, {
        field: 'approveNote',
        title: '审核意见'
      }, {
        field: 'payUser',
        title: '回录人'
      }, {
        field: 'payDatetime',
        title: '回录时间',
        type: 'datetime'
      }, {
        field: 'payNote',
        title: '回录说明'
      }];
      fields.concat(detailList);
    }
    return this.props.buildDetail({
      fields,
      buttons: buttons,
      code: this.code,
      view: true,
      detailCode: 802756
    });
  }
}

export default UnderEnchashmentCheck;
