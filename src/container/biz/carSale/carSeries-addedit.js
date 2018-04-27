import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/carSeries-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper, beforeDetail } from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
  state => state.bizCarSeriesAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class CarSeriesAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'brandCode',
      title: '品牌',
      type: 'select',
      search: true,
      listCode: 630406,
      keyName: 'code',
      valueName: 'name'
    }, {
      field: 'name',
      title: '名称',
      required: true
    }, {
      title: '价格区间',
      field: 'price',
      required: true
    }, {
      title: '广告图',
      field: 'advPic',
      type: 'img',
      required: true,
      single: true
    }, {
      title: '广告标语',
      field: 'slogan',
      required: true
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      addCode: 630410,
      editCode: 630412,
      detailCode: 630417
    });
  }
}

export default CarSeriesAddEdit;
