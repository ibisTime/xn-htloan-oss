import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/refund-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.loanstoolsRefundAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class refundAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'companyCode'
        }, {
            title: '业务编号',
            field: 'code'
        }, {
            title: '贷款银行',
            field: 'loanBankName'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '退款金额',
            field: 'backAdvanceAmount',
            amount: true
        }, {
            title: '收款账号',
            field: 'backAdvanceAccount'
        }, {
            title: '开户行',
            field: 'backAdvanceOpenBank'
        }, {
            title: '开户支行',
            field: 'backAdvanceSubbranch'
        }, {
            title: '水单',
            field: 'backAdvanceWaterBill',
            type: 'img'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632186
        });
    }
}

export default refundAddedit;