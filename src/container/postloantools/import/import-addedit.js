import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/postloantools/import-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.postloantoolsImportAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class importAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
        title: '不匹配原因',
        field: 'reason',
        value: '信息不匹配'
    }, {
        title: '倒入日期',
        field: 'importDatetime',
        type: 'date',
        search: true
    }, {
        title: '客户姓名',
        field: 'realName'
    }, {
        title: '身份证',
        field: 'idNo'
    }, {
        title: '贷款金额',
        field: 'loanAmount',
        amount: true
    }, {
        title: '贷款银行',
        field: 'loanBankName'
    }, {
        title: '放款日期',
        field: 'fkDatetime',
        type: 'date'
    }, {
        title: '对应业务',
        field: 'remark',
        search: true
    }, {
        title: '对应业务列表',
        field: 'remark',

        search: true
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632306
    });
  }
}

export default importAddedit;
