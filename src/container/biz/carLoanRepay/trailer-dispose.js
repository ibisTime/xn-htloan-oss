import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/trailer-dispose';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizTrailerDispose, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class trailerDispose extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.userId = getQueryString('userId', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'bankName',
            readonly: true
        }, {
            title: '业务编号',
            field: 'bankName',
            readonly: true
        }, {
            title: '贷款银行',
            field: 'bankName',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '车辆',
            field: 'bankName',
            readonly: true
        }, {
            title: '拖车成本',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '是否缴纳罚息',
            field: 'subbranch',
            type: 'select',
            required: true,
            data: [{
                key: '0',
                value: '是'
            }, {
                key: '1',
                value: '否'
            }],
            keyName: 'key',
            keyValue: 'value'
        }, {
            title: '拖车成本',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '罚息收取方式',
            field: 'subbranch',
            type: 'select',
            required: true,
            data: [{
                key: '0',
                value: '线下代扣'
            }, {
                key: '1',
                value: '线上代扣'
            }],
            keyName: 'key',
            keyValue: 'value'
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630521,
                buttons: [{
                    title: '确认',
                    handler: (param) => {
                        param.updater = getUserId();
                        this.props.doFetching();
                        fetch(630511, param).then(() => {
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

export default trailerDispose;