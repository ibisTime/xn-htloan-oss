import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/credit/idcheck-query';
import { getQueryString, showWarnMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
  state => state.creditIdCheckQuery,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class IdCheckQuery extends React.Component {
  constructor(props) {
    super(props);
    this.name = getQueryString('n', this.props.location.search);
    this.identityNo = getQueryString('no', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'name',
      title: '姓名',
      value: this.name,
      required: true
    }, {
      field: 'identityNo',
      title: '身份证号',
      value: this.identityNo,
      required: true
    }];
    return this.props.buildDetail({
      fields,
      buttons: [{
        title: '查询',
        check: true,
        type: 'primary',
        handler: (params) => {
          this.props.doFetching();
          params.customerName = params.name;
          fetch(632920, params).then((data) => {
            this.props.cancelFetching();
            let keys = Object.keys(data);
            if (typeof data !== 'string') {
              this.props.history.push(`/credit/idcheck/report?id=${keys[0]}`);
            } else {
              let result = JSON.parse(data);
              showWarnMsg(result.msg || '查询失败');
            }
          }).catch(() => this.props.cancelFetching());
        }
      }, {
        title: '返回',
        handler: () => this.props.history.go(-1)
      }]
    });
  }
}

export default IdCheckQuery;
