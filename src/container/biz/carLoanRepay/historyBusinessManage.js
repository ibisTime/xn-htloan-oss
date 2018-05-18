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
} from '@redux/biz/historyBusinessManage';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, showSucMsg} from 'common/js/util';
import {Button, Upload, Modal} from 'antd';
import {lowerFrame, onShelf} from 'api/biz';

@listWrapper(state => ({
  ...state.bizHistoryBusinessManage,
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
class historyBusinessManage extends React.Component {
  render() {
    const fields = [
      {
        title: '业务编号',
        field: 'code',
        search: true
      }, {
        title: '贷款人',
        field: 'realName',
        search: true
      }, {
        title: '手机号',
        field: 'mobile'
      }, {
        title: '车辆',
        field: 'monthAmount'
      }, {
        title: '贷款银行',
        field: 'loanBank'
      }, {
        title: '贷款金额',
        field: 'loanAmount',
        amount: true
      }, {
        title: '剩余欠款',
        field: 'restAmount',
        amount: true
      }, {
        title: '未还清成本',
        field: 'restTotalCost',
        amount: true
      }, {
        title: '累计逾期期数',
        field: 'totalOverdueCount'
      }, {
        title: '贷款开始时间',
        field: 'loanStartDatetime',
        type: 'date'
      }, {
        title: '贷款结束时间',
        field: 'loanEndDatetime',
        type: 'date'
      }, {
        title: '结束时间',
        field: 'closeDatetime',
        type: 'date'
      }, {
        title: '状态',
        field: 'status',
        type: 'select',
        select: true,
        key: 'repay_biz_status'
      }
    ];
    return this.props.buildList({
        fields,
        pageCode: 630520
      });
  }
}

export default historyBusinessManage;
