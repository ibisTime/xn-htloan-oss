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
      title: '客户姓名',
      field: 'userId',
      pageCode: 805120,
      keyName: 'userId',
      valueName: 'realName',
      searchName: 'mobile',
      type: 'select',
      requied: true
    }, {
      title: '户名',
      field: 'realName',
      requied: true
    }, {
      title: '开户行',
      field: 'subbranch',
      requied: true
    }, {
      title: '银行名称',
      field: 'bankName',
      requied: true
    }, {
      title: '卡号',
      field: 'bankcardNumber',
      requied: true
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
      detailCode: 802017
    });
  }
}

export default refundCardAddedit;
