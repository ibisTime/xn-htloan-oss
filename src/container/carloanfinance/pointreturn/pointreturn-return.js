import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/carloanfinance/pointreturn-return.js';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.carloanfinancePointreturnReturn, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class pointreturnReturn extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '业务团队队长',
            field: 'captain',
            type: 'select',
            listCode: 630207,
            keyName: 'userId',
            valueName: 'realName',
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            title: '收款银行',
            field: 'bank',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: 'bankName',
            readonly: true
        }, {
            title: '收款支行',
            field: 'subbranch',
            readonly: true
        }, {
            title: '收款账号',
            field: 'accountNo',
            readonly: true
        }, {
            title: '应返金额',
            field: 'shouldAmount',
            amount: true,
            readonly: true
        }, {
            title: '实返金额',
            field: 'actualAmount',
            amount: true,
            required: true
        }, {
            title: '水单',
            field: 'waterBill',
            type: 'img',
            required: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 632316,
                buttons: [{
                    title: '确认',
                    handler: (param) => {
                        param.updater = getUserId();
                        this.props.doFetching();
                        fetch(632310, param).then(() => {
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

export default pointreturnReturn;