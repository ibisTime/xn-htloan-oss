import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/carShape-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.bizCarShapeAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class CarShapeAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'logo',
      title: '品牌',
      type: 'select',
      search: true,
      listCode: 630406,
      keyName: 'code',
      valueName: 'name',
      required: true
    }, {
      title: '车系',
      field: 'brandCode',
      type: 'select',
      search: true,
      required: true,
      listCode: 630416,
      keyName: 'code',
      valueName: 'name'
    }, {
      field: 'name',
      title: '名称',
      required: true
    }, {
      title: '缩略图',
      field: 'pic',
      required: true,
      type: 'img',
      single: true
    }, {
      title: '广告图',
      field: 'advPic',
      required: true,
      type: 'img'
    }, {
      title: '厂商指导价',
      field: 'originalPrice',
      required: true
    }, {
      title: '经销商参考价',
      field: 'salePrice',
      required: true
    }, {
      title: '首付参考价',
      field: 'sfAmount',
      required: true
    }, {
      title: '车辆分期介绍',
      field: 'remark',
      required: true
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      addCode: 630420,
      editCode: 630422,
      detailCode: 630427
    });
  }
}

export default CarShapeAddEdit;
