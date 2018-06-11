import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/carloanfinance/pointreturn-addedit.js';
import {
  getQueryString,
  formatDate
} from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.carloanfinancePointreturnAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class pointreturnAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
        title: '业务团队队长',
        field: 'captain',
        type: 'select',
        listCode: 630207,
        keyName: 'userId',
        valueName: 'realName'
    }, {
        title: '业务编号',
        field: 'code'
    }, {
        title: '收款银行',
        field: 'bank',
        type: 'select',
        listCode: 802116,
        keyName: 'bankCode',
        valueName: 'bankName'
    }, {
        title: '收款支行',
        field: 'subbranch'
    }, {
        title: '收款账号',
        field: 'accountNo'
    }, {
        title: '应返金额',
        field: 'shouldAmount',
        amount: true
    }, {
        title: '实返金额',
        field: 'actualAmount',
        amount: true
    }, {
        title: '水单',
        field: 'waterBill',
        type: 'img'
    }, {
        title: '备注',
        field: 'remark'
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 632316
      });
  }
}

export default pointreturnAddedit;
