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
} from '@redux/biz/blackList';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, showSucMsg} from 'common/js/util';
import {Button, Upload, Modal} from 'antd';
import {lowerFrame, onShelf} from 'api/biz';

@listWrapper(state => ({
  ...state.bizBlackList,
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
class blackList extends React.Component {
  render() {
    const fields = [
      {
        title: '业务编号',
        field: 'code'
      }, {
        title: '贷款人',
        field: 'realName',
        search: true
      }, {
        title: '手机号',
        field: 'mobile',
        type: 'data'
      }, {
        title: '贷款金额',
        field: 'monthAmount',
        amount: true
      }, {
        title: '剩余欠债',
        field: 'status',
        amount: true
      }, {
        title: '未还清收成本(元)',
        field: 'remark',
        amount: true
      }, {
        title: '标识日期(元)',
        field: 'remark',
        amount: true
      }, {
        title: '可退保证金(元)',
        field: 'remark',
        type: 'data'
      }
    ];
    return this.props.buildList({
        fields,
        pageCode: 630540,
        searchParams: {
          status: 5
        }
      });
  }
}

export default blackList;
