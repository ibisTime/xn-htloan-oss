import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/finance/underEnchashment-addedit';
import { getQueryString, getUserId } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.financeUnderEnchashmentAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class UnderEnchashmentAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'bizType',
      hidden: true,
      value: '-11'
    }, {
      field: 'accountNumber',
      title: '用户账户',
      type: 'select',
      pageCode: '802500',
      // dict: [
      //     ['currency', 'currency'],
      //     ['type', 'account_type']
      // ],
      params: {
        currency: 'CNY'
      },
      keyName: 'accountNumber',
      valueName: '{{realName.DATA}} - {{currency.DATA}} - {{type.DATA}}',
      searchName: 'realName',
      required: true,
      help: '支持户名查询'
    }, {
      field: 'amount',
      title: '取现金额',
      required: true,
      amount: true
    }, {
      field: 'payCardInfo',
      title: '银行类型',
      required: true
    }, {
      field: 'payCardNo',
      title: '银行卡号',
      bankCard: true,
      minlength: 15,
      required: true
    }, {
      field: 'applyNote',
      title: '申请说明',
      maxlength: 255
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 802756,
      addCode: 802751,
      beforeSubmit: (param) => {
        param.applyUser = getUserId();
        return param;
      }
    });
  }
}

export default UnderEnchashmentAddEdit;
