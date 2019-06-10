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
} from '@redux/biz/redList';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, getUserId } from 'common/js/util';

@listWrapper(state => ({
  ...state.bizredList,
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
class redList extends React.Component {
  render() {
    const fields = [{
      title: '业务编号',
      field: 'code',
      search: true
    }, {
      title: '贷款人',
      field: 'userId',
      search: true,
      render: (v, d) => {
        return d.user.realName;
      },
      type: 'select',
      pageCode: 805120,
      keyName: 'userId',
      valueName: 'realName',
      searchName: 'realName'
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
      field: 'restAmount',
      amount: true
    }, {
      title: '未还清收成本',
      field: 'restTotalCost',
      amount: true
    }, {
      title: '当前节点',
      field: 'curNodeCode',
      type: 'select',
      listCode: 630147,
      keyName: 'code',
      valueName: 'name',
      search: true,
      params: {type: 'a'}
    }];
    return this.props.buildList({
      fields,
      pageCode: 630522,
      searchParams: {
        refType: '0',
        curNodeCodeList: ['j8', 'j9', 'j10'],
          userId: getUserId()
      },
      btnEvent: {
        // 财务打款
        pay: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].curNodeCode !== 'j9') {
            showWarnMsg('当前节点不是财务打款节点');
          } else {
            this.props.history.push(`/biz/redList/pay?code=${selectedRowKeys[0]}`);
          }
        },
        // 录入拖车结果
        enter: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].curNodeCode !== 'j10') {
            showWarnMsg('当前节点不是清款催收部拖车结果待录入节点');
          } else {
            this.props.history.push(`/biz/redList/enter?code=${selectedRowKeys[0]}`);
          }
        },
        // 申请拖车
        apply: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].curNodeCode !== 'j8') {
            showWarnMsg('当前节点不是清款催收部申请拖车节点');
          } else {
            this.props.history.push(`/biz/redList/apply?code=${selectedRowKeys[0]}`);
          }
        }
      }
    });
  }
}

export default redList;
