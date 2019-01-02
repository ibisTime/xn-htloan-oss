import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/bankMoney-addedit';
import { getQueryString } from 'common/js/util';
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
            title: '客户姓名',
            field: 'applyUserName',
            readonly: true
        }, {
            title: '业务团队',
            field: 'teamName'
        }, {
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankName'
        }, {
            title: '卡号',
            field: 'repayBankcardNumber',
            bankCard: true
        }, {
            title: '放款日期',
            field: 'bankFkDatetime',
            type: 'date'
        }, {
            title: '银行账单日',
            field: 'repayBillDate'
        }, {
            title: '银行还款日',
            field: 'repayBankDate'
        }, {
            title: '公司还款日',
            field: 'repayCompanyDate'
        }, {
            title: '首期还款日期',
            field: 'repayFirstMonthDatetime',
            type: 'date'
        }, {
            title: '首期月供金额',
            field: 'repayFirstMonthAmount',
            amount: true
        }, {
            title: '每期月供金额',
            field: 'repayMonthAmount',
            amount: true
        }, {
            title: '收款账号',
            field: 'receiptBankcardNumber'
        }, {
            title: '收款凭证',
            field: 'receiptPdf',
            type: 'img'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146
        });
    }
}

export default bankMoneyAddedit;
