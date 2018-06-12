import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/userRedemption-applyRedeem';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizUserRedemptionApplyRedeem, {
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
            type: 'img'
        }, {
            title: '房产',
            field: 'housePdf',
            type: 'img'
        }, {
            title: '担保人姓名',
            field: 'guaName'
        }, {
            title: '担保人身份证号',
            field: 'guaIdNo',
            idCard: true
        }, {
            title: '担保人手机号',
            field: 'guaMobile',
            mobile: true
        }, {
            title: '担保人现居住地址',
            field: 'guaNowAddress'
        }, {
            title: '赎回说明',
            field: 'guaNote'
        }, {
            title: '操作人',
            field: 'operator',
            hidden: true,
            value: getUserId()
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 630521,
            buttons: [{
                title: '确认',
                handler: (param) => {
                    param.code = this.code;
                    param.operator = getUserId();
                    this.props.doFetching();
                    fetch(630561, param).then(() => {
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
