import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/wares/commodity-addedit';
import {getQueryString} from 'common/js/util';
import {DetailWrapper, beforeDetail} from 'common/js/build-detail';

@DetailWrapper(state => state.bizCommoditAddedit, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class commodityAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [
      {
        title: '类别',
        field: 'category',
        type: 'select',
        required: true
      }, {
        title: '名称',
        field: 'name',
        required: true
      }, {
        title: '广告语',
        field: 'slogan',
        required: true
      }, {
        title: '最低购买信用分',
        field: 'creditScore',
        required: true
      }, {
        title: '缩略图',
        field: 'pic',
        required: true
      }, {
        title: '广告图',
        field: 'advPic',
        required: true
      }, {
        title: '规格类别名称1',
        field: 'type',
        required: true
      }, {
        title: '商品规格',
        field: 'productSpecsList',
        type: 'o2m',
        options: {
            add: true,
            edit: true,
            delete: true,
            scroll: {
                x: 1300
            },
            fields: [{
                title: '规格名称',
                field: 'name'
            }, {
                title: '图片',
                field: 'pic'
            }, {
                title: '价格',
                field: 'price'
            }, {
                title: '库存',
                field: 'quantity'
            }]
        }
      }, {
        title: '商品描述',
        field: 'remark'
      }
    ];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        addCode: 808010,
        editCode: 808012,
        detailCode: 808026
      });
  }
}

export default commodityAddedit;
