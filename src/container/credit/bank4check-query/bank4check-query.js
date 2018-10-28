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
      idCard: true,
      required: true
    }, {
      field: 'bankCardNo',
      title: '银行卡号',
      bankCard: true,
      required: true
    }, {
      field: 'mobileNo',
      title: '手机号',
      value: this.mobileNo,
      mobile: true,
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
            this.props.cancelFetching();
            if (data.id !== '-1') {
              this.props.history.push(`/credit/bank4check/report?id=${data.id}`);
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

export default Bank4CheckQuery;
