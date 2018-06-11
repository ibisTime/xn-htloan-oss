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
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '选择预算单',
      field: 'code',
      type: 'select',
      pageCode: 632145,
      searchName: 'key',
      keyName: 'code',
      valueName: '{{code.DATA}}-{{applyUserName.DATA}}',
      required: true
    }, {
      title: '作废原因',
      field: 'remark',
      required: true
    }];
    return this.props.buildDetail({
      fields,
      view: this.view,
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