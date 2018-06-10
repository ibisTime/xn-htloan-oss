import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/administrative/cost-detail';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(state => state.administrativeCostDetail, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class costDetail extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.status = getQueryString('status', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '类型',
            field: 'type',
            type: 'select',
            key: 'fee_advance_apply_type',
            required: true
        }, {
            title: '关联审批表',
            field: 'refAssertCode',
            hidden: !(this.props.pageData.refAssertCode)
        }, {
            title: '关联车贷业务',
            field: 'refBudgetOrderCode',
            hidden: !(this.props.pageData.refBudgetOrderCode)
        }, {
            title: '预支金额',
            field: 'amount',
            amount: true,
            required: true
        }, {
            title: '开户银行',
            field: 'subbranch',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: 'bankName',
            required: true
        }, {
            title: '账户名',
            field: 'accountName',
            required: true
        }, {
            title: '银行账号',
            field: 'bankcardNumber',
            required: true
        }, {
            title: '说明',
            field: 'applyNote'
        }, {
            title: '备注',
            field: 'remark'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'fee_advance_apply_status'
        }, {
            title: '付款时间',
            field: 'payDatetime',
            type: 'datetime',
            required: true,
            hidden: !(this.status === '5' || this.status === '3')
        }, {
            title: '付款银行',
            field: 'payBank',
            type: 'select',
            listCode: 632037,
            keyName: 'code',
            valueName: '{{bankName.DATA}}{{subbranch.DATA}}',
            required: true,
            hidden: !(this.status === '5' || this.status === '3')
        }, {
            title: '付款银行卡',
            field: 'payBankcard',
            bankCard: true,
            required: true,
            hidden: !(this.status === '5' || this.status === '3')
        }, {
            title: '付款凭证',
            field: 'payPdf',
            type: 'img',
            required: true,
            hidden: !(this.status === '5' || this.status === '3')
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632676
        });
    }
}

export default costDetail;