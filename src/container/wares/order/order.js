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
import { receiveGoods, cancelBill } from 'api/biz';

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
      field: 'code',
      search: true
    }, {
      title: '下单人',
      field: 'applyUser',
      search: true
    }, {
      title: '商品名称',
      render: (v, d) => {
        return d.productOrderList.productName;
      }
    }, {
      title: '订单价格',
      render: (v, d) => {
        return d.productOrderList.price / 1000;
      }
    }, {
      title: '购买数量',
      render: (v, d) => {
        return d.productOrderList.quantity;
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
      key: 'status'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildList({
      fields,
      pageCode: 808065,
      btnEvent: {
        shipments: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/wares/order/goods?code=${selectedRowKeys[0]}&userId=${selectedRows[0].user.userId}`);
          }
        },
        receiveGoods: (key, item) => {
          if (!key || !key.length || !item || !item.length) {
            showWarnMsg('请选择记录');
          } else {
            Modal.confirm({
              okText: '确认',
              cancelText: '取消',
              content: '确定收货成功？',
              onOk: () => {
                this.props.doFetching();
                return receiveGoods(key[0], item.user.userId).then(() => {
                  this.props.cancelFetching();
                  showWarnMsg('操作成功');
                }).catch(() => {
                  this.props.cancelFetching();
                });
              }
            });
          }
        },
        cancel: (key, item) => {
          if (!key || !key.length || !item || !item.length) {
            showWarnMsg('请选择记录');
          } else {
            Modal.confirm({
              okText: '确认',
              cancelText: '取消',
              content: '确定取消订单？',
              onOk: () => {
                this.props.doFetching();
                return cancelBill(key[0]).then(() => {
                  this.props.cancelFetching();
                  showWarnMsg('操作成功');
                }).catch(() => {
                  this.props.cancelFetching();
                });
              }
            });
          }
        }
      }
    });
  }
}

export default Order;
