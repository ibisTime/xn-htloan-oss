import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/loanstools/cancel-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.loanstoolsCancelAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class CancelAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '业务编号',
      field: 'code',
      readonly: true
    }, {
      title: '客户姓名',
      field: 'applyUserName',
      readonly: true
    }, {
      title: '贷款银行',
      field: 'loanBankName',
      readonly: true
    }, {
      title: '贷款金额',
      field: 'loanAmount',
      amount: true,
      readonly: true
    }, {
      title: '是否垫资',
      field: 'isAdvanceFund',
      type: 'select',
      data: [{
        key: '1',
        value: '是'
      }, {
        key: '0',
        value: '否'
      }],
      keyName: 'key',
      valueName: 'value',
      readonly: true
    }, {
      title: '垫资时间',
      field: 'advanceFundDatetime',
      type: 'date',
      readonly: true
    }, {
      title: '垫资金额',
      field: 'advanceFundAmount',
      amount: true,
      readonly: true
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632196
    });
  }
}

export default CancelAddedit;
