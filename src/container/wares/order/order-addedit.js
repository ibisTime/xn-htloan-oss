import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/wares/order-addedit';
import {
  getQueryString
} from 'common/js/util';
import {
  DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.waresOrderAddedit, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class orderAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '编号',
      field: 'code',
      search: true
    }, {
      title: '下单人',
      field: 'applyUser',
      formatter: (v, d) => {
        return d.user ? d.user.realName : d.applyUser;
      }
    }, {
      title: '商品名称',
      field: 'name',
      formatter: (v, d) => {
        return d.productOrderList[0].product.name;
      }
    }, {
      title: '订单价格',
      field: 'price',
      formatter: (v, d) => {
        return d.productOrderList[0].price / 1000;
      }
    }, {
      title: '购买数量',
      field: 'quantity',
      formatter: (v, d) => {
        return d.productOrderList[0].quantity;
      }
    }, {
      title: '首付',
      amount: true,
      field: 'sfAmount'
    }, {
      title: '贷款金额',
      amount: true,
      field: 'loanAmount'
    }, {
      title: '分期期数',
      field: 'periods'
    }, {
      title: '发货时间',
      field: 'deliveryDatetime',
      type: 'datetime'
    }, {
      title: '收货时间',
      field: 'signDatetime',
      type: 'datetime'
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'order_status'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 808066
      });
  }
}

export default orderAddedit;
