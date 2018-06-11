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
} from '@redux/biz/userRedemption';
import {
  listWrapper
} from 'common/js/build-list';
import {
  showWarnMsg,
  showSucMsg,
  moneyFormat
} from 'common/js/util';
import {
  lowerFrame,
  onShelf
} from 'api/biz';

@listWrapper(
  state => ({
    ...state.bizUserRedemption,
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
class userRedemption extends React.Component {
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
      field: 'restAmount',
      amount: true
    }, {
      title: '未还清收成本',
      field: 'restTotalCost',
      amount: true
    }, {
      title: '拖车时间',
      field: 'takeDatetime'
    }, {
      title: '当前节点',
      field: 'curNodeCode',
      type: 'select',
      listCode: 630147,
      keyName: 'code',
      valueName: 'name'
    }];
    return this.props.buildList({
      fields,
      pageCode: 630520,
      searchParams: {
        refType: '0',
        curNodeCodeList: ['003_17', '003_18', '003_19', '003_20', '003_21']
      },
      btnEvent: {
        applyRedeem: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
              showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].curNodeCode !== '003_17') {
              showWarnMsg('不是待用户赎回的节点');
          } else {
            this.props.history.push(`/biz/userRedemption/applyRedeem?code=${selectedRowKeys[0]}`);
          }
        },
        checkDirector: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].curNodeCode !== '003_18') {
              showWarnMsg('不是风控主管审核的节点');
          } else {
            this.props.history.push(`/biz/userRedemption/checkDirector?code=${selectedRowKeys[0]}`);
          }
        },
        checkFinance: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].curNodeCode !== '003_19') {
              showWarnMsg('不是财务经理审核的节点');
          } else {
            this.props.history.push(`/biz/userRedemption/checkFinance?code=${selectedRowKeys[0]}`);
          }
        }
      }
    });
  }
}

export default userRedemption;
