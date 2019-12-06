import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/statisticalManagement/loanDetail/loanDetail';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    moneyFormat,
    moneyUppercase
} from 'common/js/util';
import {
    CollapseWrapper
} from 'component/collapse-detail/collapse-detail';

@CollapseWrapper(
    state => state.loanDetail, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class loanDetail extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [
            {
                title: '收件',
                items: [
                    [{
                        title: '收件时间',
                        field: 'bankFkDatetime',
                        _keys: ['bankLoan', 'bankFkDatetime'],
                        type: 'datetime',
                        readonly: true
                    }, {
                        title: '收件说明',
                        field: 'bankFkNote',
                        _keys: ['bankLoan', 'bankFkNote'],
                        readonly: true
                    }]
                ]
            },
            {
                title: '确认提交完成',
                items: [
                    [{
                        title: '确认提交时间',
                        field: 'bankCommitDatetime',
                        _keys: ['bankLoan', 'bankCommitDatetime'],
                        type: 'datetime',
                        readonly: true
                    }, {
                        title: '打件说明',
                        field: 'bankCommitNote',
                        _keys: ['bankLoan', 'bankCommitNote'],
                        readonly: true
                    }]
                ]
            },
            {
                title: '录入放款信息',
                items: [
                    [{
                        title: '银行还款日',
                        field: 'repayBankDate',
                        _keys: ['bankLoan', 'repayBankDate'],
                        readonly: true
                    }, {
                        title: '账单日',
                        field: 'repayBillDate',
                        _keys: ['bankLoan', 'repayBillDate'],
                        readonly: true
                    }, {
                        title: '卡号',
                        field: 'repayBankcardNumber',
                        _keys: ['bankLoan', 'repayBankcardNumber'],
                        readonly: true
                    }]
                ]
            }
        ];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632516,
            buttons: [
                {
                    title: '返回',
                    handler: (param) => {
                        this.props.history.go(-1);
                    }
                }
            ]
        });
    }
}

export default loanDetail;
