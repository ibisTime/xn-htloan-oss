import React from 'react';
import {
  Button,
  Upload,
  Modal
} from 'antd';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/biz/archives';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg, getQueryString, dateTimeFormat, getRoleCode, getUserId } from 'common/js/util';
import fetch from 'common/js/fetch';
@listWrapper(
    state => ({
      ...state.bizArchives,
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
    }
)

class archives extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.buttons = [];
  }

  render() {
    const fields = [{
      title: '征信人',
      field: 'creditUserCode',
      render: (v, d) => {
        return d.creditUser ? d.creditUser.userName : '';
      }
    }, {
      title: '分类',
      field: 'type',
      type: 'select',
      data: [{
        key: '1',
        value: '支付宝'
      }, {
        key: '2',
        value: '微信'
      }, {
        key: '3',
        value: '银行'
      }],
      keyName: 'key',
      valueName: 'value'
    }, {
      title: '流水日期区间',
      field: 'time',
      rangedate: ['datetimeStart', 'datetimeEnd'],
      type: 'date',
      search: true,
      render: (v, d) => {
        return dateTimeFormat(d.datetimeStart) + '-' + dateTimeFormat(d.datetimeEnd);
      }
    }, {
      title: '结息2(元)',
      field: 'interest2',
      noVisible: true,
      required: true
    }, {
      title: '总收入(元)',
      field: 'income',
      required: true
    }, {
      title: '总支出(元)',
      field: 'expend',
      required: true
    }, {
      title: '余额(元)',
      field: 'balance',
      required: true
    }, {
      title: '月均收入(元)',
      field: 'monthIncome',
      required: true
    }, {
      title: '月均支出(元)',
      field: 'monthExpend',
      required: true
    }, {
      title: '流水说明',
      field: 'remark',
      noVisible: true,
      type: 'textarea',
      normalArea: true,
      required: true
    }, {
      title: '流水图片',
      field: 'pic',
      type: 'img',
      noVisible: true,
      required: true
    }];
    return this.props.buildList({
      fields,
      pageCode: 632495,
      deleteCode: 632491,
      buttons: [{
        code: 'goBack',
        name: '返回',
        check: false,
        handler: () => this.props.history.go(-1)
      }, {
        code: 'add',
        name: '新增',
        check: false,
        handler: (selectedRowKeys, selectedRows) => {
            this.props.history.push(`/biz/bankMoney/record/add?code=${this.code}`);
        }
      }, {
        code: 'edit',
        name: '修改',
        check: false,
        edit: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/biz/bankMoney/record/addedit?code=${selectedRows.code}`);
          }
        }
      }, {
        code: 'delete',
        name: '删除',
        check: false,
        detail: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            Modal.confirm({
              okText: '确定',
              cancelText: '取消',
              content: '确定删除该流水？',
              onOk: () => {
                this.props.doFetching();
                return fetch(632491, {
                  code: selectedRows[0].code
                }).then(() => {
                  this.props.getPageData();
                  showSucMsg('操作成功');
                }).catch(() => {
                  this.props.cancelFetching();
                });
              }
            });
          }
        }
      }]
    });
  }
}
export default archives;
