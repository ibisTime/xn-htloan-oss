import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/security/assign';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.securityAssign,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class Assign extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('userId', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '用户名',
      field: 'loginName',
      readonly: true
    }, {
      title: '手机号',
      field: 'mobile',
      readonly: true
    }, {
      title: '角色编号',
      field: 'roleCode',
      type: 'select',
      required: true,
      listCode: 630006,
      keyName: 'code',
      valueName: 'name'
    }, {
      title: '备注',
      field: 'remark',
      maxlength: 250
    }];

    return this.props.buildDetail({
      fields,
      key: 'userId',
      code: this.code,
      view: this.view,
      editCode: 630057,
      detailCode: 630067
    });
  }
}

export default Assign;
