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
        field: 'mobile',
        type: 'data'
      }, {
        title: '车辆',
        field: 'monthAmount',
        amount: true
      }, {
        title: '贷款银行',
        field: 'status',
        amount: true
      }, {
        title: '贷款金额',
        field: 'remark',
        amount: true
      }, {
        title: '剩余欠款',
        field: 'remark',
        amount: true
      }, {
        title: '未还清成本',
        field: 'remark'
      }, {
        title: '累计逾期期数',
        field: 'remark'
      }, {
        title: '贷款开始时间',
        field: 'remark',
        type: 'data'
      }, {
        title: '贷款结束时间',
        field: 'remark',
        type: 'data'
      }, {
        title: '结束时间',
        field: 'remark',
        type: 'data'
      }, {
        title: '状态',
        field: 'status',
        search: true,
        type: 'select'
      }
    ];
    return this.props.buildList({
        fields,
        pageCode: 630505
      });
  }
}

export default historyBusinessManage;
