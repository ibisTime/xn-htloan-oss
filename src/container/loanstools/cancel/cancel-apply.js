import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/loanstools/cancel-apply';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
  DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
  state => state.loanstoolsCancelApply, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class CancelApply extends React.Component {
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
    }, {
      title: '作废原因',
      field: 'remark',
      required: true
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632196,
      buttons: [{
        title: '确认',
        check: true,
        handler: (params) => {
          params.operator = getUserId();
          this.props.doFetching();
          fetch(632190, params).then(() => {
            showSucMsg('操作成功');
            setTimeout(() => {
              this.props.history.go(-1);
            }, 1000);
            this.props.cancelFetching();
          }).catch(this.props.cancelFetching);
        }
      }, {
        title: '返回',
        handler: (param) => {
          this.props.history.go(-1);
        }
      }]
    });
  }
}

export default CancelApply;