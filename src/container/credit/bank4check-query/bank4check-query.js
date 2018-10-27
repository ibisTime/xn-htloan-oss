import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/credit/bank4check-query';
import { getQueryString, showWarnMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
  state => state.creditBank4CheckQuery,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class Bank4CheckQuery extends React.Component {
  constructor(props) {
    super(props);
    this.name = getQueryString('n', this.props.location.search);
    this.identityNo = getQueryString('no', this.props.location.search);
    this.mobileNo = getQueryString('m', this.props.location.search);
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
    }, {
      field: 'bankCardNo',
      title: '银行卡号',
      required: true
    }, {
      field: 'mobileNo',
      title: '手机号',
      value: this.mobileNo,
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
          fetch(632923, params).then((data) => {
            let keys = Object.keys(data);
            if (keys && keys.length) {
              this.props.history.push(`/credit/bank4check/report?id=${keys[0]}`);
            } else {
              showWarnMsg('查询失败');
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

export default Bank4CheckQuery;
