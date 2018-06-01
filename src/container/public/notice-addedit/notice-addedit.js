import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/public/notice-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { SYSTEM_CODE } from 'common/js/config';
@DetailWrapper(
  state => state.publicNoticeAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class NoticeAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'fromSystemCode',
      value: SYSTEM_CODE,
      hidden: true
    }, {
      field: 'toSystemCode',
      value: SYSTEM_CODE,
      hidden: true
    }, {
      field: 'smsType',
      hidden: true,
      value: 1
    }, {
      title: '针对人群',
      field: 'toKind',
      keyCode: '630036',
      type: 'select',
      key: 'user_kind',
      required: true
    }, {
      title: '标题',
      field: 'smsTitle',
      required: true,
      maxlength: 30
    }, {
      title: '内容',
      field: 'smsContent',
      maxlength: 255,
        required: true
    }, {
      title: '拟发送时间',
      field: 'topushDatetime',
      hidden: true,
      value: 0
    }, {
      title: '备注',
      field: 'remark',
      maxlength: 255
    }];
    return this.props.buildDetail({
      fields,
      key: 'id',
      code: this.code,
      view: this.view,
      detailCode: 804042,
      addCode: 804034,
      editCode: 804035,
      beforeSumit: (params) => {
          params.systemCode = SYSTEM_CODE;
          params.companyCode = SYSTEM_CODE;
          return params;
      }
    });
  }
}

export default NoticeAddEdit;
