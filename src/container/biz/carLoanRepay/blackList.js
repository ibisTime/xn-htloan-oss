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
    const fields = [{
      title: '业务编号',
      field: 'code'
    }, {
      title: '贷款人',
      field: 'realName',
      search: true,
      render: (v, d) => {
        return d.user.realName;
      }
    }, {
      title: '手机号',
      field: 'mobile',
      type: 'data',
      render: (v, d) => {
        return d.user.mobile;
      }
    }, {
      title: '贷款金额',
      field: 'loanAmount',
      amount: true
    }, {
      title: '剩余欠债',
      field: 'overplusAmount',
      amount: true
    }, {
      title: '未还清收成本(元)',
      field: 'remark',
      amount: true
    }, {
      title: '标识日期(元)',
      field: 'overdueHandleDatetime',
      type: 'date'
    }, {
      title: '可退保证金(元)',
      field: 'shouldDeposit',
      amount: true
    }];
    return this.props.buildList({
      fields,
      pageCode: 630540,
      searchParams: {
        status: 5
      },
      btnEvent: {
        dispose: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/biz/blackList/dispose?code=${selectedRows[0].repayBizCode}&userId=${selectedRows[0].user.userId}`);
          }
        }
      }
    });
  }
}

export default blackList;