import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/settlement-addedit';
import {
    getQueryString,
    dateTimeFormat
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
    state => state.bizSettlementAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class settlementAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '贷款人',
            field: 'applyUserName'
        }, {
            title: '手机号',
            field: 'mobile'
        }, {
            title: '身份证号',
            field: 'IDNo'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '是否提前还款',
            field: 'loanAmount',
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
            field: 'loanAmount'
        }, {
            title: '剩余期数',
            field: 'loanAmount'
        }, {
            title: '逾期金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '剩余欠款',
            field: 'loanAmount',
            amount: true
        }, {
            title: '未还清收成本',
            field: 'loanAmount',
            amount: true
        }, {
            title: '还款计划表',
            field: 'repayPlanList',
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
                }, {
                    title: '逾期处理',
                    field: 'overdueDeposit',
                    render: (v, d) => {
                        return <a onClick = { () => this.goDetail(d.code) } href = "javascript:void(0)" > 详情 </a>;
                    }
                }]
            }
        }, {
            title: '可退押金金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '扣除违约金金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '实际退款金额金',
            field: 'loanAmount',
            amount: true
        }, {
            title: '结清时间',
            field: 'carSettleDatetime',
            type: 'datetime'
        }, {
            title: '结清证明',
            field: 'carSettleDatetime',
            type: 'img'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146
        });
    }
}

export default settlementAddedit;