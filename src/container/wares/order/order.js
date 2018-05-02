import React from 'react';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/wares/order';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import { Button, Upload, Modal } from 'antd';
import { lowerFrame, onShelf } from 'api/biz';

@listWrapper(
  state => ({
    ...state.waresOrder,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Order extends React.Component {
  render() {
    const fields = [{
      title: '编号',
      field: 'name',
      search: true
    }, {
      title: '下单人',
      field: ''
    }, {
      title: '手机号',
      field: ''
    }, {
      title: '商品名称',
      field: ''
    }, {
      title: '购买数量',
      field: 'letter'
    }, {
      title: '订单价格',
      field: ''
    }, {
      title: '首付',
      field: 'status',
      search: true,
      type: 'select',
      key: 'status'
    }, {
      title: '贷款金额',
      field: 'updater'
    }, {
      title: '分期期数',
      field: 'updateDatetime',
      type: 'datetime'
    }, {
      title: '还款卡号',
      field: 'remark'
    }, {
      title: '发货时间',
      field: 'remark'
    }, {
      title: '收货时间',
      field: 'remark'
    }, {
      title: '状态',
      field: 'remark'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildList({
      fields,
      pageCode: 808065
    });
  }
}

export default Order;
