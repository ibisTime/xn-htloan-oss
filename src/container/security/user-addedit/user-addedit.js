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
  render() {
    const fields = [{
      field: 'kind',
      hidden: true,
      value: 'P'
    }, {
      title: '用户名',
      field: 'loginName',
      maxlength: 30,
      required: true
    }, {
      title: '角色',
      field: 'roleCode',
      type: 'select',
      listCode: '627046',
      keyName: 'code',
      valueName: 'name',
      required: true
    }, {
      title: '备注',
      field: 'remark',
      maxlength: 250
    }];

    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      addCode: 627301
    });
  }
}

export default UserAddEdit;
