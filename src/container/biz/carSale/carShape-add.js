import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import fetch from 'common/js/fetch';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class CarShapeAddEdit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [
      {
        field: 'isReferee',
        value: 1,
        hidden: true
      }, {
      field: 'configList',
      title: '名称',
      hidden: true,
      required: true
    }, {
      field: 'name',
      title: '名称',
      required: true
    }, {
      field: 'displacement',
      title: '排量(L)',
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
      field: 'insideColor',
      title: '内部颜色',
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
      title: '车系',
      field: 'seriesCode',
      type: 'select',
      required: true,
      params: {
        status: 1
      },
      hidden: this.code && !this.view,
      keyName: 'code',
      listCode: '630416',
      valueName: 'name'
    }, {
      title: '缩略图',
      field: 'pic',
      single: true,
      required: true,
      type: 'img',
      help: '240*160'
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
      field: 'salePrice',
      amount: true,
      required: true
    }, {
      field: 'procedure',
      title: '手续 ',
      required: true
    }, {
      title: '经销商参考价',
      field: 'originalPrice',
      amount: true,
      required: true
    }, {
      title: '首付金额',
      field: 'sfAmount',
      amount: true,
      required: true
    }, {
      title: '贷款银行',
      field: 'bankCode',
      type: 'select',
      required: true,
      listCode: 632037,
      keyName: 'code',
      hidden: this.code,
      valueName: '{{bankName.DATA}}{{subbranch.DATA}}'
    }, {
      title: '车辆分期介绍',
      field: 'description',
      type: 'textarea',
      required: true
    }, {
      title: '车辆配置',
      required: true,
      field: 'carconfig',
      type: 'o2m',
      listCode: 630447,
      options: {
        noSelect: this.view,
        fields: [{
          title: '名称',
          field: 'name'
        }]
      }
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      addCode: 630420,
      editCode: 630422,
      detailCode: 630427,
      beforeSubmit: (params) => {
        const { selectData, pageData, selectedRowKeys } = this.state;
        params.configList = selectedRowKeys.carconfig;
        params.picNumber = params.advPic.split('||').length;
        if (!this.code) {
          let series = selectData.seriesCode.find(v => v.code === params.seriesCode);
          params.seriesName = series.name;
        } else {
          params.seriesName = pageData.seriesName;
        }
        return params;
      },
      afterDetail: () => {
        const { pageData } = this.state;
        let checkedList = pageData.configs
            .filter(item => item.isConfig === '1');
        // 如果详情页则只显示isConfig为1的
        if (this.view) {
          this.setState({
            pageData: {
              ...this.state.pageData,
              carconfig: checkedList
            }
          });
          // 如果是新增或修改，则显示所有配置项，并给isConfig为1的打勾
        } else {
          checkedList = checkedList.map(item => item.code);
          this.setState({
            pageData: {
              ...this.state.pageData,
              carconfig: pageData.configs
            }
          });
          this.setO2MSelect('carconfig', checkedList);
        }
      }
    });
  }
}

export default CarShapeAddEdit;
