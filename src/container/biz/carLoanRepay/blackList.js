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
      title: '未还代偿金额',
      field: 'unRepayTotalAmount',
      amount: true
  }];
    return this.props.buildList({
      fields,
      searchParams: {
        refType: '0',
        curNodeCodeList: ['003_13', '003_14', '003_15', '003_16']
      },
      pageCode: 630520
    });
  }
}

export default blackList;
