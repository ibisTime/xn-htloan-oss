import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/public/banner-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
  state => state.publicBannerAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class BannerAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'status',
      value: 1,
      hidden: true
    }, {
      field: 'companyCode',
      hidden: true,
      value: COMPANY_CODE
    }, {
      field: 'type',
      value: 2,
      hidden: true
    }, {
      field: 'belong',
      value: 1,
      hidden: true
    }, {
      field: 'parentCode',
      value: 0,
      hidden: true
    }, {
      field: 'contentType',
      value: 1,
      hidden: true
    }, {
      field: 'isCompanyEdit',
      value: 0,
      hidden: true
    }, {
      title: 'banner名称',
      field: 'name',
      required: true
    }, {
      title: '位置',
      field: 'location',
      type: 'select',
      // key: 'banner_location',
      data: [{
        dkey: 'index_banner',
        dvalue: '首页'
      }],
      keyName: 'dkey',
      valueName: 'dvalue',
      value: 'index_banner',
      required: true
    }, {
      title: '顺序',
      field: 'orderNo',
      help: '数字越小，排序越靠前',
      required: true
    }, {
      title: 'banner图片',
      field: 'pic',
      type: 'img',
      required: true,
      single: true
    }, {
      title: 'url地址',
      field: 'url'
    }, {
      title: '备注',
      field: 'remark',
      maxlength: 250
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 627037,
      addCode: 627030,
      editCode: 627032
    });
  }
}

export default BannerAddEdit;
