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
} from '@redux/finance/user-account';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.financeUserAccount,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class UserAccount extends React.Component {
  render() {
    const fields = [{
      title: '户名',
      field: 'realName',
      search: true
    }, {
      title: '账号',
      field: 'accountNumber'
    }, {
      title: '币种',
      field: 'currency',
      type: 'select',
      key: 'currency'
    }, {
      title: '类型',
      field: 'type',
      type: 'select',
      key: 'account_type',
      search: true
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'account_status',
      search: true
    }, {
      title: '余额',
      field: 'amount',
      amount: true
    }, {
      title: '冻结金额',
      field: 'frozenAmount',
      amount: true
    }, {
      title: '创建时间',
      field: 'createDatetime',
      type: 'datetime'
    }];
    return this.props.buildList({
      fields,
      pageCode: 802500,
      rowKey: 'accountNumber',
      searchParams: {
        type: 'NOT_P'
      },
      btnEvent: {
        ledger: (keys, items) => {
          if (!keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push('/finance/userAccount/flows?code=' + keys[0]);
          }
        }
      }
    });
  }
}

export default UserAccount;
