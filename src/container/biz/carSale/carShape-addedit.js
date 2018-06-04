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
      title: '品牌',
      field: 'brandCode',
      type: 'select',
      search: true,
      listCode: 630406,
      params: {
        status: '1'
      },
      keyName: 'code',
      valueName: 'name',
      required: true
    }, {
      title: '车系',
      field: 'seriesCode',
      type: 'select',
      search: true,
      required: true,
      listCode: 630416,
      params: {
        status: '1'
      },
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
      title: '广告语',
      field: 'slogan',
      required: true
    }, {
      title: '厂商指导价',
      field: 'originalPrice',
      amount: true,
      required: true
    }, {
      title: '经销商参考价',
      field: 'salePrice',
      amount: true,
      required: true
    }, {
      title: '首付参考价',
      field: 'sfAmount',
      amount: true,
      required: true
    }, {
      title: '车辆分期介绍',
      field: 'remark',
      required: true
    }, {
      title: '图文描述',
      field: 'description',
      type: 'textarea',
      required: true
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      addCode: 630420,
      editCode: 630422,
      detailCode: 630427,
      beforeSubmit: (params) => {
        console.log(this.props.selectData);
        let brand = this.props.selectData.brandCode.find(v => v.code === params.brandCode);
        console.log(brand);
        params.brandName = brand.name;
        let series = this.props.selectData.seriesCode.find(v => v.code === params.seriesCode);
        console.log(series);
        params.seriesName = series.name;
        return params;
      }
    });
  }
}

export default CarShapeAddEdit;
