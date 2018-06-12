import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/redList-pay';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    moneyFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizredListPay, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class redListaPay extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
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
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '申请金额',
            field: 'tsCarAmount',
            amount: true,
            required: true,
            readonly: true,
            formatter: (v, d) => {
              return moneyFormat(d.overdueRepayPlan.tsCarAmount);
            }
        }, {
            title: '收款账号',
            field: 'tsBankcardNumber',
            required: true,
            bankCard: true,
            readonly: true,
            formatter: (v, d) => {
              return d.overdueRepayPlan.tsBankcardNumber;
            }
        }, {
            title: '开户行',
            field: 'tsBankName',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: 'bankName',
            required: true,
            readonly: true,
            formatter: (v, d) => {
              return d.overdueRepayPlan.tsBankName;
            }
        }, {
            title: '开户支行',
            field: 'tsSubbranch',
            required: true,
            readonly: true,
            formatter: (v, d) => {
              return d.overdueRepayPlan.tsSubbranch;
            }
        }, {
            title: '申请说明',
            field: 'tcApplyNote',
            required: true,
            readonly: true,
            formatter: (v, d) => {
              return d.overdueRepayPlan.tcApplyNote;
            }
        }, {
            title: '打款金额',
            field: 'remitAmount',
            amount: true,
            required: true
        }, {
            title: '水单',
            field: 'remitPdf',
            type: 'img',
            required: true
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630521,
                buttons: [{
                    title: '确定',
                    handler: (param) => {
                        param.code = this.code;
                        param.operator = getUserId();
                        this.props.doFetching();
                        fetch(630556, param).then(() => {
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

export default redListaPay;
