import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/refundCard-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.bizRefundCardAddedit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class refundCardAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '户名',
      field: 'realName',
      required: true
    }, {
      title: '银行名称',
      field: 'bankName'
    }, {
      title: '开户支行',
      field: 'subbranch',
      required: true
    }, {
      title: '卡号',
      field: 'bankcardNumber',
      bankCard: true,
      required: true
    }, {
      title: '绑定手机号',
      field: 'bindMobile',
      required: true,
      mobile: true
    }, {
      title: '备注',
      field: 'ramark'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      addCode: 802010,
      editCode: 802012,
      detailCode: 802017,
      beforeSubmit: (params) => {
        let bank = this.props.selectData.bankCode.find(v => v.bankCode === params.bankCode);
        params.bankName = bank.bankName;
        return params;
      }
    });
  }
}

export default refundCardAddedit;
