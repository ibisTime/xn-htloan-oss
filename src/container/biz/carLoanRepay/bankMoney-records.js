import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/bankMoney-addedit';
import { getQueryString, dateTimeFormat } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.bizBankMoneyAddEdit, {
      initStates,
      doFetching,
      cancelFetching,
      setSelectData,
      setPageData,
      restore
    }
)
class bankMoneyAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '征信人',
      field: 'creditUserCode',
      required: true,
      formatter: (v, d) => {
        return d.creditUser ? d.creditUser.userName : '';
      }
    }, {
      title: '分类',
      field: 'type',
      type: 'select',
      required: true,
      data: [{
        key: '1',
        value: '支付宝'
      }, {
        key: '2',
        value: '微信'
      }, {
        key: '3',
        value: '银行'
      }],
      keyName: 'key',
      valueName: 'value'
    }, {
      title: '结息2(元)',
      field: 'interest2',
      noVisible: true,
      required: true
    }, {
      title: '总收入(元)',
      field: 'income',
      required: true
    }, {
      title: '总支出(元)',
      field: 'expend',
      required: true
    }, {
      title: '余额(元)',
      field: 'balance',
      required: true
    }, {
      title: '月均收入(元)',
      field: 'monthIncome',
      required: true
    }, {
      title: '月均支出(元)',
      field: 'monthExpend',
      required: true
    }, {
      title: '流水说明',
      field: 'remark',
      noVisible: true,
      type: 'textarea',
      normalArea: true,
      required: true
    }, {
      title: '流水图片',
      field: 'pic',
      type: 'img',
      required: true
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      addCode: 632490,
      beforeSubmit: (param) => {
        param.bizCode = this.code;
        return param;
      }
    });
  }
}

export default bankMoneyAddedit;
