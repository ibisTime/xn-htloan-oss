import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/demo/credit-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
  state => state.creditAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class CreditAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '银行',
      field: 'bank',
      type: 'select',
      data: [{
        dkey: 'index_banner',
        dvalue: '首页'
      }],
      keyName: 'dkey',
      valueName: 'dvalue',
      value: 'index_banner',
      required: true
    }, {
      title: '购车途径',
      field: 'buyWay',
      type: 'select',
      data: [{
        dkey: '0',
        dvalue: '新车'
      }, {
        dkey: '1',
        dvalue: '二手车'
      }],
      keyName: 'dkey',
      valueName: 'dvalue',
      value: '0',
      required: true
    }, {
      title: '贷款金额',
      field: 'amount',
      amount: true,
      required: true
    }, {
      title: '行驶证正面',
      field: 'pic1',
      type: 'img',
      required: true,
      single: true
    }, {
      title: '行驶证反面',
      field: 'pic2',
      type: 'img',
      required: true,
      single: true
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 627037,
      addCode: 627030,
      editCode: 627032
    });
  }
}

export default CreditAddEdit;
