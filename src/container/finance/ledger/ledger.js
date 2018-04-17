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
} from '@redux/finance/ledger';
import { listWrapper } from 'common/js/build-list';
import { getQueryString, getUserId, showWarnMsg } from 'common/js/util';
import { COMPANY_CODE } from 'common/js/config';

@listWrapper(
  state => ({
    ...state.financeLedger
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Ledger extends React.Component {
  constructor(props) {
    super(props);
    this.currency = getQueryString('currency', this.props.location.search);
    this.accountNumber = getQueryString('accountNumber', this.props.location.search);
    this.kind = getQueryString('kind', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '户名',
      field: 'realName'
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
      key: this.kind ? 'jour_biz_type_cold' : 'jour_biz_type_plat',
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
      title: '创建时间',
      field: 'createDatetime',
      type: 'datetime'
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'jour_status',
      search: true
    }, {
      title: '生成说明',
      field: 'bizNote'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildList({
      fields,
      pageCode: 802524,
      searchParams: {
        kind: 0,
        currency: this.currency,
        userId: this.accountNumber ? '' : getUserId(),
        accountNumber: this.accountNumber,
        companyCode: COMPANY_CODE
      },
      buttons: [{
        code: 'detail',
        name: '详情',
        handler: (selectedRowKeys) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`${this.props.location.pathname}/addedit?code=${selectedRowKeys[0]}&kind=${this.kind}&v=1`);
          }
        }
      }, {
        code: 'back',
        name: '返回',
        handler: () => this.props.history.goBack()
      }]
    });
  }
}

export default Ledger;
