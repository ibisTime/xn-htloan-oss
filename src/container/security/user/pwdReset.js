import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/security/pwdReset';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.securityPwdReset,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class PwdReset extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('userId', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'userId',
      hidden: true,
      value: this.code
    }, {
      field: 'loginName',
      title: '用户名',
      readonly: true
    }, {
      title: '新密码',
      field: 'loginPwd',
      type: 'password'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildDetail({
      fields,
      key: 'userId',
      code: this.code,
      view: this.view,
      detailCode: 630067,
      editCode: 630055
    });
  }
}

export default PwdReset;
