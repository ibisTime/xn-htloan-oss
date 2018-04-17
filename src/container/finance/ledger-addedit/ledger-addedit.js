import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/finance/ledger-addedit';
import { getQueryString, dateTimeFormat } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.financeLedgerAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class LedgerAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '流水编号',
      field: 'code'
    }, {
      title: '户名',
      field: 'realName',
      required: true,
      maxlength: 32
    }, {
      title: '账号',
      field: 'accountNumber',
      required: true
    }, {
      title: '币种',
      field: 'currency',
      type: 'select',
      key: 'coin'
    }, {
      title: '渠道类型',
      field: 'channelType',
      type: 'select',
      key: 'channel_type'
    }, {
      title: '业务类型',
      field: 'bizType',
      type: 'select',
      key: 'jour_biz_type'
    }, {
      title: '生成说明',
      field: 'bizNote'
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
      title: '金额変动时间',
      field: 'createDatetime',
      formatter: dateTimeFormat
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'jour_status'
    }, {
      title: '拟对账时间',
      field: 'workDate'
    }, {
      title: '对账人',
      field: 'checkUser'
    }, {
      title: '对账时间',
      field: 'checkDatetime',
      formatter: dateTimeFormat
    }, {
      title: '调账人',
      field: 'adjustUser'
    }, {
      title: '调账时间',
      field: 'adjustDatetime',
      formatter: dateTimeFormat
    }, {
      title: '备注',
      field: 'remark',
      maxlength: 250
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 802522
    });
  }
}

export default LedgerAddEdit;
