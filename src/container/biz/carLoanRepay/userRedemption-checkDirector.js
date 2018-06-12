import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/userRedemption-checkDirector';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizUserRedemptionCheckDirector, {
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
            field: 'loanBankName',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '剩余欠款',
            field: 'restAmount',
            amount: true,
            readonly: true
        }, {
            title: '未还清收成本',
            field: 'restTotalCost',
            amount: true,
            readonly: true
        }, {
            title: '拖车成本',
            field: 'remitAmount',
            amount: true,
            readonly: true
        }, {
            title: '流水',
            field: 'jourPdf',
            type: 'img',
            readonly: true,
            _keys: ['overdueRepayPlan', 'jourPdf']
        }, {
            title: '房产',
            field: 'housePdf',
            type: 'img',
            readonly: true,
            _keys: ['overdueRepayPlan', 'housePdf']
        }, {
            title: '担保人姓名',
            field: 'guaName',
            readonly: true,
            formatter: (v, d) => {
              return d.overdueRepayPlan.guaName;
            }
        }, {
            title: '担保人身份证号',
            field: 'guaIdNo',
            idCard: true,
            readonly: true,
            formatter: (v, d) => {
              return d.overdueRepayPlan.guaIdNo;
            }
        }, {
            title: '担保人手机号',
            field: 'guaMobile',
            mobile: true,
            readonly: true,
            formatter: (v, d) => {
              return d.overdueRepayPlan.guaMobile;
            }
        }, {
            title: '担保人现居住地址',
            field: 'guaNowAddress',
            readonly: true,
            formatter: (v, d) => {
              return d.overdueRepayPlan.guaNowAddress;
            }
        }, {
            title: '赎回说明',
            field: 'guaNote',
            readonly: true,
            formatter: (v, d) => {
              return d.overdueRepayPlan.guaNote;
            }
        }, {
            title: '建议',
            field: 'suggest',
            type: 'select',
            key: 'suggest',
            required: true
        }, {
            title: '建议说明',
            field: 'suggestNote'
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630521,
                buttons: [{
                    title: '通过',
                    handler: (param) => {
                        param.code = this.code;
                        param.approveResult = '1';
                        param.operator = getUserId();
                        this.props.doFetching();
                        fetch(630563, param).then(() => {
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
                    title: '不通过',
                    handler: (param) => {
                        param.code = this.code;
                        param.approveResult = '0';
                        param.operator = getUserId();
                        this.props.doFetching();
                        fetch(630563, param).then(() => {
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
