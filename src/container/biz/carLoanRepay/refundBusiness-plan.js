import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/refundBusiness-plan';
import {
    getQueryString,
    moneyFormat
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizRefundBusinessPlan, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class refundBusinessPlan extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.userId = getQueryString('userId', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '贷款人',
            field: 'realName',
            readonly: true,
            formatter: (v, d) => {
                return d.user.realName;
            }
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '期数',
            field: 'periods',
            readonly: true
        }, {
            title: '还款计划表',
            field: 'repayPlanList',
            type: 'o2m',
            options: {
                export: true,
                fields: [{
                    title: '期数',
                    field: 'curPeriods'
                }, {
                    title: '还款日期',
                    field: 'repayDatetime',
                    type: 'date'
                }, {
                    title: '应还本息',
                    field: 'repayInterest',
                    render: function (v, data) {
                        var sum = data.repayCapital + data.repayInterest;
                        return moneyFormat(sum);
                    }
                }, {
                    title: '实还金额',
                    amount: true,
                    field: 'payedAmount'
                }, {
                    title: '逾期金额',
                    amount: true,
                    field: 'overdueAmount'
                }, {
                    title: '剩余欠款',
                    amount: true,
                    field: 'overplusAmount'
                }]
            }
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 630521,
            beforeDetail: (param) => {
                param['userId'] = this.userId;
            },
            buttons: [{
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }]

        });
    }
}

export default refundBusinessPlan;
