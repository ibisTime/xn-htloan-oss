import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/carShape-addedit';
import { getQueryString, moneyFormat } from 'common/js/util';
import fetch from 'common/js/fetch';
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
      field: 'name',
      title: '名称',
      required: true
    }, {
      field: 'displacement',
      title: '排量',
      number: true,
      required: true
    }, {
      field: 'fromPlace',
      title: '车源地',
      required: true
    }, {
      field: 'fwAmount',
      title: '服务费',
      amount: true,
      required: true
    }, {
      field: 'insideColor',
      title: '内部颜色',
      required: true
    }, {
      field: 'jsqByhf',
      title: '必要花费',
      amount: true,
      required: true
    }, {
      field: 'jsqSybx',
      title: '商业保险',
      required: true
    }, {
      field: 'outsideColor',
      title: '外部颜色',
      required: true
    }, {
      field: 'structure',
      type: 'select',
      title: '结构',
      required: true,
      data: [{
        key: '1',
        value: '两厢'
      }, {
        key: '2',
        value: '三厢'
      }, {
        key: '2',
        value: '三厢'
      }, {
        key: '3',
        value: '掀背'
      }, {
        key: '4',
        value: '旅行版'
      }, {
        key: '5',
        value: '硬顶敞篷'
      }, {
        key: '6',
        value: '软顶敞篷 '
      }, {
        key: '7',
        value: '硬顶跑车'
      }],
      keyName: 'key',
      valueName: 'value'
    }, {
      title: '是否推荐',
      type: 'select',
      field: 'isReferee',
      required: true,
      data: [{
        key: '0',
        value: '否'
      }, {
        key: '1',
        value: '是'
      }],
      keyName: 'key',
      valueName: 'value'
    }, {
      field: 'level',
      title: '级别',
      required: true,
      type: 'select',
      data: [{
        key: '0',
        value: 'SUV'
      }, {
        key: '1',
        value: '轿车'
      }, {
        key: '2',
        value: 'MPV'
      }, {
        key: '3',
        value: '跑车'
      }, {
        key: '4',
        value: '皮卡'
      }, {
        key: '5',
        value: '房车'
      }],
      keyName: 'key',
      valueName: 'value'
    }, {
      field: 'version',
      title: '规格版本 ',
      required: true,
      type: 'select',
      // 1 中东 2 美规 3 加规 4 墨版 5 欧规
      data: [{
        key: '1',
        value: '中东'
      }, {
        key: '2',
        value: '美规'
      }, {
        key: '3',
        value: '加规'
      }, {
        key: '4',
        value: '墨版'
      }, {
        key: '5',
        value: '欧规'
      }],
      keyName: 'key',
      valueName: 'value'
    }, {
      title: '品牌',
      field: 'brandCode',
      type: 'select',
      listCode: 630406,
      params: {
        status: '1'
      },
      onChange: (v) => {
        this.props.setSelectData({
          data: [],
          key: 'seriesCode'
        });
        this.props.setSelectData.seriesCode = '';
        fetch(630416, {
          brandCode: v,
          status: '1'
        }).then((data) => {
          this.props.setSelectData({
            data,
            key: 'seriesCode'
          });
        }).catch(() => {});
      },
      keyName: 'code',
      valueName: 'name',
      required: true
    }, {
      title: '车系',
      field: 'seriesCode',
      type: 'select',
      required: true,
      params: {
        status: 1
      },
      keyName: 'code',
      listCode: '630416',
      valueName: 'name'
    }, {
      title: '缩略图',
      field: 'pic',
      required: true,
      type: 'img',
      help: '240*160',
      single: true
    }, {
      title: '广告图',
      field: 'advPic',
      required: true,
      help: '750*500',
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
      field: 'picNumber',
      title: '图片数量 ',
      required: true,
      number: true
    }, {
      field: 'procedure',
      title: '手续 ',
      required: true
    }, {
      title: '经销商参考价',
      field: 'salePrice',
      amount: true,
      required: true
    }, {
      title: '首付金额',
      field: 'sfAmount',
      amount: true,
      required: true
    }, {
      title: '经办银行',
      field: 'bankCode',
      type: 'select',
      required: true,
      listCode: 802116,
      keyName: 'bankCode',
      valueName: 'bankName'
    }, {
      title: '车辆分期介绍',
      field: 'description',
      type: 'textarea',
      required: true
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      addCode: 630420,
      editCode: 630422,
      detailCode: 630427,
      beforeSubmit: (params) => {
        let brand = this.props.selectData.brandCode.find(v => v.code === params.brandCode);
        params.brandName = brand.name;
        let series = this.props.selectData.seriesCode.find(v => v.code === params.seriesCode);
        params.seriesName = series.name;
        return params;
      }
    });
  }
}

export default CarShapeAddEdit;
