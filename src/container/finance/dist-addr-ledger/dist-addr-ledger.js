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
} from '@redux/finance/dist-addr-ledger';
import { listWrapper } from 'common/js/build-list';
import { getQueryString, moneyFormat, multiply } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.financeDistAddrLedger
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class DistAddrLedger extends React.Component {
  constructor(props) {
    super(props);
    this.address = getQueryString('address', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '交易HASH',
      field: 'hash'
    }, {
      title: '交易金额',
      field: 'value',
      formatter: (v, data) => data.from === this.address ? '-' + moneyFormat(v) : moneyFormat(v)
    }, {
      title: '对方地址',
      field: 'fromTo',
      formatter: (v, data) => data.from === this.address ? data.to : data.from
    }, {
      title: 'gasLimit',
      field: 'gas'
    }, {
      title: 'gas价格',
      field: 'gasPrice',
      amount: true
    }, {
      title: '消耗gas',
      field: 'gasUsed'
    }, {
      title: '矿工费',
      field: 'kgPrice',
      formatter: (v, data) => moneyFormat(multiply(data.gasPrice, data.gasUsed))
    }, {
      title: '关联订单号',
      field: 'refNo'
    }, {
      title: '网络记账时间',
      field: 'creates',
      amount: true
    }];
    return this.props.buildList({
      fields,
      pageCode: 802107,
      searchParams: {
        kind: 0,
        address: this.address
      },
      buttons: [{
        code: 'back',
        name: '返回',
        handler: () => this.props.history.goBack()
      }]
    });
  }
}

export default DistAddrLedger;
