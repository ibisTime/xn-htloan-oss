import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/settlement-collection';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
    state => state.bizSettlementCollection, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class settlementCollection extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '贷款人',
            field: 'applyUserName',
            formatter: (v, d) => {
                return d.user.realName;
            },
            readonly: true
        }, {
            title: '手机号',
            field: 'mobile',
            formatter: (v, d) => {
                return d.user.mobile;
            },
            readonly: true
        }, {
            title: '身份证号',
            field: 'idNo',
            formatter: (v, d) => {
                return d.user.idNo;
            },
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            readonly: true,
            amount: true
        }, {
            title: '是否提前还款',
            field: 'isAdvanceSettled',
            readonly: true,
            type: 'select',
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }]
        }, {
            title: '总期数',
            field: 'periods',
            readonly: true
        }, {
            title: '剩余期数',
            field: 'restPeriods',
            readonly: true
        }, {
            title: '逾期总金额',
            field: 'overdueAmount',
            readonly: true,
            amount: true
        }, {
            title: '剩余欠款',
            field: 'restAmount',
            readonly: true,
            amount: true
        }, {
            title: '未还清收成本',
            field: 'restTotalCost',
            readonly: true,
            amount: true
        }, {
            title: '还款计划表',
            field: 'repayPlanList',
            readonly: true,
            type: 'o2m',
            options: {
                fields: [{
                    title: '当前期数',
                    field: 'curPeriods'
                }, {
                    title: '应还本息',
                    field: 'repayInterest',
                    render: (v, d) => {
                        return (d.repayCapital + d.repayInterest) / 1000;
                    }
                }, {
                    title: '实还金额',
                    field: 'payedAmount',
                    amount: true
                }, {
                    title: '逾期金额',
                    field: 'overdueAmount',
                    amount: true
                }, {
                    title: '剩余欠款',
                    field: 'overplusAmount',
                    amount: true
                }]
            }
        }, {
            title: '可退押金金额',
            field: 'loanAmount',
            render: (v, d) => {
                return (d.lyDeposit + d.overdueAmount) / 1000;
            },
            readonly: true,
            amount: true
        }, {
            title: '扣除违约金金额',
            field: 'cutLyDeposit',
            amount: true,
            required: true
        }, {
            title: '实际退款金额',
            field: 'actualRefunds',
            readonly: true,
            amount: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 630521,
            buttons: [{
                title: '提交',
                handler: (param) => {
                    param.operator = getUserId();
                    this.props.doFetching();
                    fetch(630550, param).then(() => {
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

export default settlementCollection;