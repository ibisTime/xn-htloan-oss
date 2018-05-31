import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/overdueList-addedit';
import {getQueryString} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(state => state.bizGreenListAddedit, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class greenListAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [
      {
        title: '申请人手机号',
        field: 'mobile',
        required: true,
        mobile: true
      }, {
        title: '申请人姓名',
        field: 'realName',
        required: true
      }, {
        title: '身份证号',
        field: 'idNo',
        required: true,
        idCard: true
      }, {
        title: '开户行',
        field: 'realName',
        required: true,
        bankCard: true
      }, {
        title: '开户支行',
        field: 'subbranch',
        required: true,
        bankCard: true
      }, {
        title: '还款卡号',
        field: 'bankcardNumber',
        required: true,
        bankCard: true
      }, {
        title: '购买车辆',
        field: 'carCode',
        required: true
      }, {
        title: '车辆总价',
        field: 'carPrice',
        required: true
      }, {
        title: '首付比例',
        field: 'sfRate',
        required: true,
        type: 'select'
      }, {
        title: '首款金额',
        field: 'sfAmount',
        required: true
      }, {
        title: '贷款银行',
        field: 'loanBank',
        required: true,
        type: 'select',
        bankCard: true
      }, {
        title: '贷款金额',
        field: 'loanAmount',
        required: true
      }, {
        title: '期数',
        field: 'periods',
        required: true
      }, {
        title: '银行利率',
        field: 'bankRate',
        required: true
      }, {
        title: '贷款开始时间',
        field: 'loanStartDatetime',
        required: true
      }, {
        title: '贷款结束时间',
        field: 'loanEndDatetime',
        required: true
      }, {
        title: '放款日期',
        field: 'fkDatetime',
        required: true
      }, {
        title: '担保风险金',
        field: 'fxDeposit',
        required: true
      }, {
        title: '杂费',
        field: 'otherFee',
        required: true
      }, {
        title: 'GPS收费',
        field: 'gpsFee',
        required: true
      }, {
        title: '首期还款日期',
        field: 'firstRepayDatetime',
        required: true
      }, {
        title: '首期月供金额',
        field: 'firstRepayAmount',
        required: true
      }, {
        title: '每期还款日期',
        field: 'monthDatetime',
        required: true
      }, {
        title: '每期月供金额',
        field: 'monthAmount',
        required: true
      }, {
        title: '履约保证金',
        field: 'lyDeposit',
        required: true
      }
    ];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        addCode: 630500,
        editCode: 630502,
        detailCode: 630507
      });
  }
}

export default greenListAddedit;
