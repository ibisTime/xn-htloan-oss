import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/bankMoney-enter';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
    state => state.bizBankMoneyEnter, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class bankMoneyEnter extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'applyUserName',
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '卡号',
            field: 'repayBankcardNumber',
            required: true,
            bankCard: true
        }, {
            title: '银行账单日',
            field: 'repayBillDate',
            required: true,
            min: 1,
            max: 28,
            number: true
        }, {
            title: '银行还款日',
            field: 'repayBankDate',
            required: true,
            min: 1,
            max: 28,
            number: true
        }, {
            title: '公司还款日',
            field: 'repayCompanyDate',
            required: true,
            min: 1,
            max: 28,
            number: true
        }, {
            title: '首期还款日期',
            field: 'repayFirstMonthDatetime',
            type: 'date',
            required: true
        }, {
            title: '首期月供金额',
            field: 'repayFirstMonthAmount',
            amount: true,
            required: true
        }, {
            title: '每期月供金额',
            field: 'repayMonthAmount',
            amount: true,
            required: true
        }, {
            title: '放款日期',
            field: 'bankFkDate',
            type: 'date',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146,
            buttons: [{
              title: '确认',
              handler: (param) => {
                param.approveResult = '1';
                param.approveNote = this.projectCode;
                param.operator = getUserId();
                this.props.doFetching();
                fetch(632135, param).then(() => {
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
              title: '返回',
              handler: (param) => {
                this.props.history.go(-1);
              }
            }]
        });
    }
}

export default bankMoneyEnter;