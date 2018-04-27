import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/brand-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper, beforeDetail } from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
  state => state.bizBrandAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class BrandAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'logo',
      title: 'logo',
      type: 'img',
      required: true,
      single: true
    }, {
      field: 'description',
      title: '品牌介绍'
    }, {
      title: '名称',
      field: 'name',
      required: true
    }, {
      title: '字母顺序',
      field: 'letter',
      type: 'select',
      required: true,
      search: true,
      data: [{
        key: '0',
        value: 'A'
      }, {
        key: '1',
        value: 'B'
      }, {
        key: '2',
        value: 'C'
      }],
      keyName: 'key',
      valueName: 'value'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      addCode: 630400,
      editCode: 630402,
      detailCode: 630407
    });
  }
}

export default BrandAddedit;
