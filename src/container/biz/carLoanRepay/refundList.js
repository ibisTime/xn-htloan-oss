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
} from '@redux/biz/refundList';
import {
  listWrapper
} from 'common/js/build-list';
import {
  showWarnMsg,
  showSucMsg,
  moneyFormat
} from 'common/js/util';
import {
  Button,
  Upload,
  Modal
} from 'antd';
import {
  lowerFrame,
  onShelf,
  sendMsg
} from 'api/biz';

@listWrapper(state => ({
  ...state.bizRefundList,
  parentCode: state.menu.subMenuCode
}), {
  setTableData,
  clearSearchParam,
  doFetching,
  setBtnList,
  cancelFetching,
  setPagination,
  setSearchParam,
  setSearchData
})
class RefundList extends React.Component {
  render() {
    const fields = [{
      title: '业务编号',
      field: 'code',
      search: true
    }, {
      title: '贷款人',
      field: 'realName',
      search: true,
      render: (v, d) => {
        return d.user.realName;
      }
    }, {
      title: '期数',
      field: 'periods'
    }, {
      title: '当前期数',
      field: 'curPeriods'
    }, {
      title: '本月还款日',
      field: 'repayDatetime',
      type: 'date'
    }, {
      title: '月供',
      field: 'monthAmount',
      render: (v, d) => {
        return moneyFormat(d.repayBiz.monthAmount);
      }
    }];
    return this
      .props
      .buildList({
        fields,
        pageCode: 630543,
        searchParams: {
          refType: '0',
          curNodeCodeList: ['004_01']
        },
        btnEvent: {
          message: (key, item) => {
            if (!key || !key.length || !item || !item.length) {
              showWarnMsg('请选择记录');
            } else {
              Modal.confirm({
                okText: '确认',
                cancelText: '取消',
                content: '确定发送？',
                onOk: () => {
                  this.props.doFetching();
                  return sendMsg(key[0], '0').then(() => {
                    this.props.cancelFetching();
                    showWarnMsg('操作成功');
                  }).catch(() => {
                    this.props.cancelFetching();
                  });
                }
              });
            }
          },
          sendMessage: (key, item) => {
            if (!key || !key.length || !item || !item.length) {
              showWarnMsg('请选择记录');
            } else {
              Modal.confirm({
                okText: '确认',
                cancelText: '取消',
                content: '确定发送？',
                onOk: () => {
                  this.props.doFetching();
                  return sendMsg(key[0], '1').then(() => {
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

export default RefundList;
