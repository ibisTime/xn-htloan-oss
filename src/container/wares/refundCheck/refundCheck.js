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
} from '@redux/wares/refundCheck';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';

@listWrapper(state => ({
  ...state.waresRefundCheck,
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
class RefundCheck extends React.Component {
  render() {
    const fields = [
      {
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
        title: '总期数',
        field: 'periods'
      }, {
        title: '当前期数',
        field: 'curPeriods'
      }, {
        title: '本期剩余欠款(元)',
        field: 'overplusAmount',
        amount: true
      }
    ];
    return this.props.buildList({
        fields,
        pageCode: 630540,
        searchParams: {
            refType: '1',
            curNodeCode: '006_06'
        },
        btnEvent: {
          check: (selectedRowKeys, selectedRows) => {
            if (!selectedRowKeys.length) {
              showWarnMsg('请选择记录');
            } else if (selectedRowKeys.length > 1) {
              showWarnMsg('请选择一条记录');
            } else {
              this.props.history.push(`/wares/refundCheck/addedit?code=${selectedRowKeys[0]}&check=1`);
            }
          }
        }
      });
  }
}

export default RefundCheck;
