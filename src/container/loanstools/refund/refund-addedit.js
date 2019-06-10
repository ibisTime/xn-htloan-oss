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
            title: '业务编号',
            field: 'code'
        }, {
            title: '业务公司',
            field: 'companyName'
        }, {
            title: '客户姓名',
            field: 'applyUserName',
            formatter: (v, d) => d.creditUser ? d.creditUser.userName : '-'
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            formatter: (v, d) => d.loanBankName ? `${d.loanBankName}${d.repaySubbranch ? '-' + d.repaySubbranch : ''}` : ''
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '贷款期数',
            field: 'loanPeriod',
            formatter: (v, d) => d.loanInfo ? d.loanInfo.periods : '-'
        }, {
            title: '业务种类',
            field: 'bizType',
            type: 'select',
            key: 'budget_orde_biz_typer'
        }, {
            title: '信贷专员',
            field: 'saleUserName'
        }, {
            title: '申请时间',
            field: 'applyDatetime',
            type: 'date'
        }, {
            title: '放款时间',
            field: 'bankFkDatetime',
            type: 'date'
        }, {
            title: '是否垫资',
            field: 'isAdvanceFund',
            type: 'select',
            data: [{
                key: '1',
                value: '是'
            }, {
                key: '0',
                value: '否'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '状态',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '退款金额',
            field: 'backAdvanceAmount',
            amount: true
        }, {
            title: '收款账号',
            field: 'backAdvanceAccount'
        }, {
            title: '开户行',
            field: 'backAdvanceOpenBank',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: '{{bankCode.DATA}}-{{bankName.DATA}}'
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
            detailCode: 632516
        });
    }
}

export default refundAddedit;
