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
} from '@redux/biz/handleApply';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, dateTimeFormat } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.bizHandleApply,
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
class HandleApply extends React.Component {
  render() {
    const fields = [{
      title: '订单编号',
      field: 'code'
    }, {
      title: '申请人',
      field: 'userId',
      render: (v, data) => {
        if (data.name) {
          return data.name ? data.name + '-' + data.userMobile : data.name;
        } else if(data.userMobile) {
          return data.userMobile ? data.userMobile + '-' + data.name : data.userMobile;
        }
      }
    }, {
      title: '车辆总价',
      amount: true,
      field: 'price'
    }, {
      title: '首付金额',
      amount: 'true',
      field: 'sfAmount'
    }, {
      title: '申请时间',
      field: 'createDatetime',
      type: 'date',
      rangedate: ['createDatetimeStart', 'createDatetimeEnd'],
      render: dateTimeFormat,
      search: true
    }];
    return this.props.buildList({
      fields,
      pageCode: 630435,
      searchParams: {
        status: '0'
      },
      btnEvent: {
        dispose: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/biz/handleApply/check?code=${selectedRowKeys[0]}`);
          }
        },
        detail: (selectedRowKeys, selectedRows) => {
            if (!selectedRowKeys.length) {
                showWarnMsg('请选择记录');
            } else if (selectedRowKeys.length > 1) {
                showWarnMsg('请选择一条记录');
            } else {
                this.props.history.push(`/biz/handleApply/check?v=1&code=${selectedRowKeys[0]}`);
            }
        }
      }
    });
  }
}

export default HandleApply;
