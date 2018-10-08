import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/postloantools/applyGps-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.postloantoolsApplyGpsAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class applyGpsAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '申请人姓名',
      field: 'applyUserName',
      readonly: true
    }, {
      title: '业务团队',
      field: 'teamName',
      readonly: true
    }, {
      title: '角色',
      field: 'roleName',
      readonly: true
    }, {
      title: '客户姓名',
      field: 'customerName',
      readonly: true
    }, {
      title: '车架号',
      field: 'carFrameNo',
      readonly: true
    }, {
      title: '手机号',
      field: 'mobile',
      readonly: true
    }, {
      title: '申领个数',
      field: 'applyCount'
    }, {
      title: '申领人',
      field: 'applyUserName'
    }, {
      title: '申领原因',
      field: 'applyReason'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632716
    });
  }
}

export default applyGpsAddedit;
