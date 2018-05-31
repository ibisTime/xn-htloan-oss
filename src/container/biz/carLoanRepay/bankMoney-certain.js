import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/bankMoney-certain';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.bizBankMoneyCertain, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class bankMoneyCertain extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'operator',
            hidden: true,
            value: getUserId()
        }, {
            title: '客户姓名',
            field: 'applyUserName',
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBank',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '收款银行',
            field: 'receiptBankCode'
        }, {
            title: '收款账号',
            field: 'receiptBankcardNumber',
            required: true
        }, {
            title: '收款凭证',
            field: 'receiptPdf',
            type: 'img'
        }, {
            title: '备注',
            field: 'receiptRemark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146,
            editCode: 632130
        });
    }
}

export default bankMoneyCertain;
