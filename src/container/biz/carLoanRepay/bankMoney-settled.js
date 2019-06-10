import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/bankMoney-settled';
import {getQueryString} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.bizBankMoneySettled, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class bizBankMoneySettled extends React.Component {
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
            title: '发票',
            field: 'carInvoice',
            type: 'img',
            required: true
        }, {
            title: '交强险',
            field: 'carJqx',
            type: 'img',
            required: true
        }, {
            title: '商业险',
            field: 'carSyx',
            type: 'img',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632516
        });
    }
}

export default bizBankMoneySettled;
