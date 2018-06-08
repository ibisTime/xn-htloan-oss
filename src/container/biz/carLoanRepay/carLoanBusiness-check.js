import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/carLoanBusiness-check';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
  DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizCarLoanBusinessCheck, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class carLoanBusinessCheck extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('staffCode', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '申请人手机号',
      field: 'mobile',
      readonly: true
    }, {
      title: '申请人姓名',
      field: 'realName',
      readonly: true
    }, {
      title: '身份证号',
      field: 'idNo',
      readonly: true
    }, {
      title: '开户行',
      field: 'realName',
      readonly: true
    }, {
      title: '开户支行',
      field: 'subbranch',
      readonly: true
    }, {
      title: '还款卡号',
      field: 'bankcardNumber',
      readonly: true
    }, {
      title: '购买车辆',
      field: 'carCode',
      readonly: true
    }, {
      title: '车辆总价',
      field: 'carPrice',
      readonly: true
    }, {
      title: '首付比例',
      field: 'sfRate',
      readonly: true
    }, {
      title: '首款金额',
      field: 'sfAmount',
      readonly: true
    }, {
      title: '贷款银行',
      field: 'loanBank',
      listCode: 802116,
      keyName: 'bankCode',
      valueName: 'bankName',
      readonly: true
    }, {
      title: '贷款金额',
      field: 'loanAmount',
      readonly: true
    }, {
      title: '期数',
      field: 'periods',
      readonly: true
    }, {
      title: '银行利率',
      field: 'bankRate',
      readonly: true
    }, {
      title: '贷款开始时间',
      field: 'loanStartDatetime',
      readonly: true
    }, {
      title: '贷款结束时间',
      field: 'loanEndDatetime',
      readonly: true
    }, {
      title: '放款日期',
      field: 'fkDatetime',
      readonly: true
    }, {
      title: '担保风险金',
      field: 'fxDeposit',
      readonly: true
    }, {
      title: '杂费',
      field: 'otherFee',
      readonly: true
    }, {
      title: 'GPS收费',
      field: 'gpsFee',
      readonly: true
    }, {
      title: '首期还款日期',
      field: 'firstRepayDatetime',
      readonly: true
    }, {
      title: '首期月供金额',
      field: 'firstRepayAmount',
      readonly: true
    }, {
      title: '每期还款日期',
      field: 'monthDatetime',
      readonly: true
    }, {
      title: '每期月供金额',
      field: 'monthAmount',
      readonly: true
    }, {
      title: '履约保证金',
      field: 'lyDeposit',
      readonly: true
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 630507,
        buttons: [{
          title: '通过',
          handler: (param) => {
            param.approveResult = '1';
            param.approveNote = this.projectCode;
            param.approveUser = getUserId();
            this.props.doFetching();
            fetch(630503, param).then(() => {
              showSucMsg('操作成功');
              this.props.cancelFetching();
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
            }).catch(this.props.cancelFetching);
          },
          check: true,
          type: 'primary'
        }, {
          title: '不通过',
          handler: (param) => {
            param.approveResult = '0';
            param.approveNote = this.projectCode;
            param.approveUser = getUserId();
            this.props.doFetching();
            fetch(630503, param).then(() => {
              showSucMsg('操作成功');
              this.props.cancelFetching();
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
            }).catch(this.props.cancelFetching);
          },
          check: true
        }, {
          title: '返回',
          handler: (param) => {
            this.props.history.go(-1);
          }
        }]
      });
  }
}

export default carLoanBusinessCheck;