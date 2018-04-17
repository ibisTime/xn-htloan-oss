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
} from '@redux/finance/platform-ledger';
import { listWrapper } from 'common/js/build-list';
import { getQueryString, getUserId, dateTimeFormat } from 'common/js/util';
import { COMPANY_CODE } from 'common/js/config';

@listWrapper(
  state => ({
    ...state.financePlatformLedger,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Ledger extends React.Component {
  constructor(props) {
    super(props);
    this.accountCode = getQueryString('accountCode', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '户名',
      field: 'realName',
      search: true
    }, {
      title: '渠道',
      field: 'channelType',
      type: 'select',
      key: 'channel_type',
      search: true
    }, {
      title: '币种',
      field: 'currency',
      type: 'select',
      key: 'coin'
    }, {
      title: '业务类型',
      field: 'bizType',
      type: 'select',
      key: 'jour_biz_type',
      search: true
    }, {
      title: '变动金额',
      field: 'transAmountString',
      amount: true
    }, {
      title: '变动前金额',
      field: 'preAmountString',
      amount: true
    }, {
      title: '变动后金额',
      field: 'postAmountString',
      amount: true
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'jour_status',
      search: true
    }, {
      title: '创建时间',
      field: 'createDatetime',
      type: 'date',
      rangedate: ['dateStart', 'dateEnd'],
      formatter: dateTimeFormat,
      search: true
    }];
    return this.props.buildList({
      fields,
      pageCode: 802520,
      searchParams: {
        accountNumber: this.accountCode,
        type: 'P',
        kind: 0,
        currency: 'ETH',
        companyCode: COMPANY_CODE
      }
    });
  }
}

export default Ledger;
