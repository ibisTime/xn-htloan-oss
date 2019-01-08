import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/insurance-addedit';
import { getQueryString, getUserId, isExpressConfirm } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.bizInsuranceAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class InsuranceAddEdit extends React.Component {
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
            formatter: (v, d) => d.loanBankName ? d.loanBankName + d.repaySubbranch : '',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '保单日期',
            field: 'policyDatetime',
            type: 'date',
            required: true
        }, {
            title: '保单到期日',
            field: 'policyDueDate',
            type: 'date',
            required: true
        }, {
            title: '落户日期',
            field: 'carSettleDatetime',
            type: 'date',
            required: true
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
        }, {
            title: '其他资料',
            field: 'carSettleOtherPdf',
            type: 'file'
        }, {
            title: '抵押日期',
            field: 'pledgeDatetime',
            type: 'date'
        }, {
            title: '绿大本扫描件',
            field: 'greenBigSmj',
            type: 'img'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146,
            editCode: 632131
        });
    }
}

export default InsuranceAddEdit;
