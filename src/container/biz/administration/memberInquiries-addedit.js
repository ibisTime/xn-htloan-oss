import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/memberInquiries-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.bizMemberInquiriesAddedit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class MemberInquiriesAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '用户编号',
      field: 'userId'
    }, {
      title: '手机号',
      field: 'mobile'
    }, {
      title: '推荐人',
      field: 'refereeMobile'
    }, {
      title: '姓名',
      field: 'realName',
      search: true
    }, {
      title: '身份证',
      field: 'idNo'
    }, {
      title: '状态',
      field: 'status',
      search: true,
      type: 'select',
      key: 'status'
    }, {
      title: '备注',
      field: 'ramark'
    }];
    return this.props.buildDetail({
      fields,
      key: 'userId',
      code: this.code,
      view: this.view,
      detailCode: 630207
    });
  }
}

export default MemberInquiriesAddEdit;
