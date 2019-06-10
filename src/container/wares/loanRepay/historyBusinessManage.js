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
} from '@redux/wares/historyBusinessManage';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, showSucMsg, formatDate, getUserId} from 'common/js/util';
import {Button, Upload, Modal} from 'antd';
import {lowerFrame, onShelf} from 'api/biz';

@listWrapper(state => ({
  ...state.waresHistoryBusinessManage,
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
          return <span style={{whiteSpace: 'nowrap'}}>{d.user.mobile}</span>;
        }
      }, {
        title: '贷款银行',
        field: 'loanBankName'
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
        title: '贷款期限',
        field: 'time',
        rangedate: ['loanStartDatetime', 'loanEndDatetime'],
        render: (v, d) => {
           return <span style={{whiteSpace: 'nowrap'}}>{formatDate(d.loanStartDatetime) + '~' + formatDate(d.loanEndDatetime)}</span>;
        },
        nowrap: true
      }, {
        title: '结束时间',
        field: 'closeDatetime',
        type: 'date'
      }, {
        title: '状态',
        field: 'status',
        type: 'select',
        select: true,
        key: 'repay_biz_status',
        search: true
      }, {
        title: '关键字搜索',
        field: 'keyword',
        hidden: true,
        search: true
      }
    ];
    return this.props.buildList({
        fields,
        pageCode: 630522,
        searchParams: {
            refType: '1',
            curNodeCodeList: ['005_02', '005_04'],
            userId: getUserId()
        }
      });
  }
}

export default historyBusinessManage;
