import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/security/user-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.securityUserAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class UserAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '登录名',
      field: 'loginName',
      search: true,
      maxlength: 30,
      required: true
    }, {
      title: '密码',
      field: 'loginPwd',
      search: true,
      required: true
    }, {
      title: '手机号',
      field: 'mobile',
      required: true
    }];

    return this.props.buildDetail({
      fields,
      key: 'userId',
      code: this.code,
      view: this.view,
      addCode: 630051,
      editCode: 630058,
      detailCode: 630077
    });
  }
}

export default UserAddEdit;
