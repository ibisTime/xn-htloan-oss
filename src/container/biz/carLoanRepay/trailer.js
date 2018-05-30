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
} from '@redux/biz/trailer';
import {
  listWrapper
} from 'common/js/build-list';
import {
  showWarnMsg,
  showSucMsg
} from 'common/js/util';
import {
  Button,
  Upload,
  Modal
} from 'antd';
import {
  lowerFrame,
  onShelf
} from 'api/biz';

@listWrapper(
  state => ({
    ...state.bizTrailer,
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
class trailer extends React.Component {
  render() {
    const fields = [{
      title: '业务编号',
      field: 'code',
      search: true
    }, {
      title: '贷款人',
      field: 'user',
      search: true,
      render: (v, d) => {
        return d.user.realName;
      }
    }, {
      title: '手机号',
      field: 'mobile',
      render: (v, d) => {
        return d.user.mobile;
      }
    }, {
        title: '贷款金额',
        field: 'loanAmount',
        amount: true
    }, {
      title: '剩余欠款',
      field: 'loanAmount',
      amount: true
    }, {
      title: '未还清收成本',
      field: 'periods'
    }, {
      title: '拖车时间',
      field: 'monthDatetime'
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      select: true,
      key: 'repay_biz_status'
    }];
    return this.props.buildList({
      fields,
      pageCode: 630520,
      btnEvent: {
        refundplan: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/biz/trailer/plan?code=${selectedRowKeys[0]}&userId=${selectedRows[0].user.userId}`);
          }
        },
        changeCard: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/biz/trailer/changecard?code=${selectedRowKeys[0]}&userId=${selectedRows[0].user.userId}`);
          }
        },
        certain: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/biz/trailer/certain?code=${selectedRowKeys[0]}`);
          }
        }
      }
    });
  }
}

export default trailer;