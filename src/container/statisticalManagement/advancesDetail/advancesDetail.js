import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/statisticalManagement/advancesDetail/advancesDetail';
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
    state => state.advancesDetail, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class advancesDetail extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [
            {
                title: '收款账号',
                items: [
                    [{
                        title: '银行名称',
                        field: 'bankName',
                        _keys: ['advance', 'collectBankcard', 'bankName'],
                        readonly: true
                    }, {
                        title: '支行名称',
                        field: 'subbranch',
                        _keys: ['advance', 'collectBankcard', 'subbranch'],
                        readonly: true
                    }, {
                        title: '收款账户户名',
                        field: 'realName',
                        _keys: ['advance', 'collectBankcard', 'realName'],
                        readonly: true
                    }, {
                        title: '收款账户账号',
                        field: 'bankcardNumber',
                        _keys: ['advance', 'collectBankcard', 'bankcardNumber'],
                        readonly: true
                    }]
                ]
            },
            {
                title: '付款账号',
                items: [
                    [{
                        title: '银行名称',
                        field: 'bankName',
                        _keys: ['advance', 'advanceOutCard', 'bankName'],
                        readonly: true
                    }, {
                        title: '支行名称',
                        field: 'subbranch',
                        _keys: ['advance', 'advanceOutCard', 'subbranch'],
                        readonly: true
                    }, {
                        title: '收款账户户名',
                        field: 'realName',
                        _keys: ['advance', 'advanceOutCard', 'realName'],
                        readonly: true
                    }, {
                        title: '收款账户账号',
                        field: 'bankcardNumber',
                        _keys: ['advance', 'advanceOutCard', 'bankcardNumber'],
                        readonly: true
                    }]
                ]
            },
            {
                title: '垫资回录',
                items: [
                    [{
                        title: '垫资时间',
                        field: 'bankName',
                        _keys: ['advance', 'advanceFundDatetime'],
                        type: 'datetime',
                        readonly: true
                    }, {
                        title: '垫资金额',
                        field: 'subbranch',
                        _keys: ['advance', 'advanceFundAmount'],
                        amount: true,
                        readonly: true
                    }, {
                        title: '水单',
                        field: 'file',
                        _keys: ['advance', 'advanceOutCard', 'realName'],
                        readonly: true
                    }, {
                        title: '收款账户账号',
                        field: 'bankcardNumber',
                        _keys: ['advance', 'advanceOutCard', 'bankcardNumber'],
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

export default advancesDetail;
