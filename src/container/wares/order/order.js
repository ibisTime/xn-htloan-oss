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
      render: (v, d) => {
        return d.user.realName;
      },
      search: true
    }, {
      title: '商品名称',
      field: 'productName',
      render: (v, d) => {
        return d.productOrderList[0].product.name + '(' + d.productOrderList[0].productSpecsName + ')';
      }
    }, {
      title: '订单价格',
      field: 'amount',
      amount: true
    }, {
      title: '购买数量',
      field: 'quantity',
      render: (v, d) => {
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
      key: 'order_status',
      search: true
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
          } else if (selectedRows[0].status !== '2') {
            showWarnMsg('当前不是已支付状态');
          } else {
            this.props.history.push(`/wares/order/goods?code=${selectedRowKeys[0]}&userId=${selectedRows[0].user.userId}`);
          }
        },
        receiveGoods: (key, item) => {
          if (!key || !key.length || !item || !item.length) {
            showWarnMsg('请选择记录');
          } else if (item[0].status !== '4') {
            showWarnMsg('当前不是已发货状态');
          } else {
            Modal.confirm({
              okText: '确认',
              cancelText: '取消',
              content: '确定收货成功？',
              onOk: () => {
                this.props.doFetching();
                return receiveGoods(key[0]).then(() => {
                  this.props.cancelFetching();
                  showWarnMsg('操作成功');
                  setTimeout(() => {
                      this.props.getPageData();
                  }, 500);
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
          } else if (item[0].status !== '2') {
            showWarnMsg('当前不是已支付状态');
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
                  setTimeout(() => {
                      this.props.getPageData();
                  }, 500);
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
