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
      idCard: true,
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
            if (data.id !== '-1') {
              this.props.history.push(`/credit/idcheck/report?id=${data.id}`);
            } else {
              let result = JSON.parse(data.result);
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
