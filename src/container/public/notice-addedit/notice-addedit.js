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
      field: 'type',
      value: '1',
      hidden: true
    }, {
      title: '标题',
      field: 'title',
      maxlength: 50,
      required: true
    }, {
      title: '内容',
      field: 'content',
      type: 'textarea',
      required: true
    }, {
      title: '备注',
      field: 'remark',
      maxlength: 255
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 805307,
      addCode: 805300,
      editCode: 805301,
      okText: this.code ? '发布' : '保存'
    });
  }
}

export default NoticeAddEdit;
