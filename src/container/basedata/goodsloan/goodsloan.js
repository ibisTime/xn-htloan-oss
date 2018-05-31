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
} from '@redux/basedata/goodsloan';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import { Button, Upload, Modal } from 'antd';
import { loanGoodsPutaway, loanGoodsSoldOut } from 'api/biz';
import { setTimeout } from 'core-js';

@listWrapper(
  state => ({
    ...state.bizGoodsloan,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Goodsloan extends React.Component {
  render() {
    const fields = [{
      title: '产品名称',
      field: 'name'
    }, {
      title: '所属银行',
      field: 'loanBankName'
    }, {
      title: 'GPS费用',
      field: 'gpsFee',
      amount: true
    }, {
      title: '公证费',
      field: 'authFee',
      amount: true
    }, {
      title: '服务费',
      field: 'fee',
      amount: true
    }, {
      title: '月供利率',
      field: 'monthRate'
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'loan_product_status',
      search: true
    }];
    return this.props.buildList({
      fields,
      pageCode: 632175,
      btnEvent: {
        lower: (key, item) => {
          if (!key || !key.length || !item || !item.length) {
            showWarnMsg('请选择记录');
          } else if (item[0].status !== '3') {
            showWarnMsg('该状态不可下架');
          } else {
            Modal.confirm({
              okText: '确认',
              cancelText: '取消',
              content: '确定下架？',
              onOk: () => {
                this.props.doFetching();
                return loanGoodsSoldOut(key[0]).then(() => {
                  this.props.cancelFetching();
                  showWarnMsg('操作成功');
                  setTimeout(() => {
                    this.props.getPageData();
                  }, 1000);
                }).catch(() => {
                  this.props.cancelFetching();
                });
              }
            });
          }
        },
        onShelf: (key, item) => {
          if (!key || !key.length || !item || !item.length) {
            showWarnMsg('请选择记录');
          } else if (item[0].status === '3') {
            showWarnMsg('该状态不可上架');
          } else {
            Modal.confirm({
              okText: '确认',
              cancelText: '取消',
              content: '确定上架？',
              onOk: () => {
                this.props.doFetching();
                return loanGoodsPutaway(key[0]).then(() => {
                  this.props.cancelFetching();
                  showWarnMsg('操作成功');
                  setTimeout(() => {
                    this.props.getPageData();
                  }, 1000);
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

export default Goodsloan;
