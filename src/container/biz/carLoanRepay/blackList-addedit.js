import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/blackList-addedit';
import {
    getQueryString,
    moneyFormat
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizBlackListAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class blackListAddedit extends React.Component {
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
            amount: true
        }, {
            title: '是否提前还款',
            field: 'isAdvanceSettled',
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
            field: 'periods'
        }, {
            title: '剩余期数',
            field: 'restPeriods'
        }, {
            title: '逾期金额',
            field: 'overdueAmount',
            amount: true
        }, {
            title: '剩余欠款',
            field: 'restAmount',
            amount: true
        }, {
            title: '未还清收成本',
            field: 'restTotalCost',
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
                        return moneyFormat(d.repayCapital + d.repayInterest);
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
                    title: '还款日期',
                    field: 'repayDatetime',
                    type: 'date'
                }, {
                    title: '剩余欠款',
                    field: 'overplusAmount',
                    amount: true
                }]
            }
        }, {
            title: '可退押金金额',
            field: 'lyDeposit',
            render: (v, d) => {
                return moneyFormat(d.lyDeposit + d.overdueAmount);
            },
            amount: true
        }, {
            title: '扣除违约金金额',
            field: 'cutLyDeposit',
            amount: true
        }, {
            title: '实际退款金额',
            field: 'actualRefunds',
            amount: true
        }, {
            title: '结清时间',
            field: 'settleDatetime',
            type: 'datetime'
        }, {
            title: '结清证明',
            field: 'settleAttach',
            type: 'img'
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630521
            });
    }
}

export default blackListAddedit;