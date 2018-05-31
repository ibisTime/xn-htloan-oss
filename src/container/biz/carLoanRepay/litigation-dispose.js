import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/litigation-dispose';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizLitigationDispose, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class litigationDispose extends React.Component {
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
            title: '业务团队',
            field: 'loanAmount',
            readonly: true
        }, {
            title: '业务团队扣款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630521,
                buttons: [{
                    title: '确认坏账',
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
                    title: '业务团队买断',
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
                    title: '业务团队租凭',
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

export default litigationDispose;