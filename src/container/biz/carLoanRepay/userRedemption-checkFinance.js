import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/userRedemption-checkFinance';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizUserRedemptionCheckFinance, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class userRedemptionDispose extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.userId = getQueryString('userId', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'realName',
            formatter: (v, d) => {
                return d.user.realName;
            },
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBank',
            formatter: (v, d) => {
                return d.repayBiz.loanBankName;
            },
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            formatter: (v, d) => {
                return d.repayBiz.loanAmount / 1000;
            },
            readonly: true
        }, {
            title: '拖车成本',
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
                detailCode: 630541,
                buttons: [{
                    title: '用户赎回',
                    handler: (param) => {
                        param.operator = getUserId();
                        this.props.doFetching();
                        fetch(630560, param).then(() => {
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
                    title: '司法诉讼',
                    handler: (param) => {
                        param.operator = getUserId();
                        this.props.doFetching();
                        fetch(630558, param).then(() => {
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

export default userRedemptionDispose;