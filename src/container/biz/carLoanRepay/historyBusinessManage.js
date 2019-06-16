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
import { listWrapper } from 'common/js/build-list';
import { formatDate, getTeamCode, getUserId } from 'common/js/util';

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
        title: '客户姓名',
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
        field: 'loanBankName',
        render: (v, d) => d.budgetOrder ? d.budgetOrder.loanBankName + d.budgetOrder.repaySubbranch : ''
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
        }
      }, {
        title: '结束时间',
        field: 'updateDatetime',
        type: 'date'
      }, {
        title: '当前节点',
        field: 'curNodeCode',
        type: 'select',
        listCode: 630147,
        keyName: 'code',
        valueName: 'name',
        search: true,
        params: {type: 'a'}
      }
    ];
    return this.props.buildList({
        fields,
        searchParams: {
          refType: '0',
            userId: getUserId(),
          curNodeCodeList: ['j14', 'j15', 'j16', 'j7', '007_04']
        },
        pageCode: 630522
      });
  }
}

export default historyBusinessManage;
