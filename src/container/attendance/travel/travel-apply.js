import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/attendance/travel-apply';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    showWarnMsg,
    dateTimeFormat,
    moneyParse,
    getUserName
} from 'common/js/util';
import {
    CollapseWrapper
} from 'component/collapse-detail/collapse-detail';
import fetch from 'common/js/fetch';

@CollapseWrapper(
    state => state.attendanceTravelApply, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class TravelApply extends React.Component {
    getSumMoney = (v, key) => {
        console.log(key);
        let aircraftBudget = +moneyParse(this.props.form.getFieldValue('aircraftBudget')) || 0;
        let trainBudget = +moneyParse(this.props.form.getFieldValue('trainBudget')) || 0;
        let urbanBudget = +moneyParse(this.props.form.getFieldValue('urbanBudget')) || 0;
        let hotelCost = +moneyParse(this.props.form.getFieldValue('hotelCost')) || 0;
        let foodSubsidy = +moneyParse(this.props.form.getFieldValue('foodSubsidy')) || 0;
        let entertainmentCost = +moneyParse(this.props.form.getFieldValue('entertainmentCost')) || 0;
        let spareCash = +moneyParse(this.props.form.getFieldValue('spareCash')) || 0;
        if(key === 'aircraftBudget') {
            aircraftBudget = +moneyParse(v);
        }
        if(key === 'trainBudget') {
            trainBudget = +moneyParse(v);
        }
        if(key === 'urbanBudget') {
            urbanBudget = +moneyParse(v);
        }
        if(key === 'hotelCost') {
            hotelCost = +moneyParse(v);
        }
        if(key === 'foodSubsidy') {
            foodSubsidy = +moneyParse(v);
        }
        if(key === 'entertainmentCost') {
            entertainmentCost = +moneyParse(v);
        }
        if(key === 'spareCash') {
            spareCash = +moneyParse(v);
        }
        let sum = aircraftBudget + trainBudget + urbanBudget + hotelCost + foodSubsidy + entertainmentCost;
        this.props.setPageData({
            subtotal: sum,
            costTotal: sum + spareCash
        });
    }
    render() {
        const fields = [{
            title: '出差申请信息',
            items: [
                [{
                    title: '出差人',
                    field: 'applyUserCode',
                    value: getUserName(),
                    readonly: true
                }, {
                    title: '出差时间',
                    field: 'time',
                    rangedate: ['tripDatetimeStart', 'tripDatetimeEnd'],
                    type: 'date',
                    render: dateTimeFormat,
                    required: true
                }],
                [{
                    title: '飞机票费用标准',
                    field: 'aircraftFeeStandard',
                    amount: true
                }, {
                    title: '飞机票天数',
                    field: 'aircraftDays'
                }, {
                    title: '飞机票预算金额',
                    field: 'aircraftBudget',
                    onChange: (v) => this.getSumMoney(v, 'aircraftBudget'),
                    amount: true
                }],
                [{
                    title: '火车票费用标准',
                    field: 'trainFeeStandard',
                    amount: true
                }, {
                    title: '火车票天数',
                    field: 'trainDays'
                }, {
                    title: '火车票预算金额',
                    field: 'trainBudget',
                    onChange: (v) => this.getSumMoney(v, 'trainBudget'),
                    amount: true
                }],
                [{
                    title: '市内交通费用标准',
                    field: 'urbanFeeStandart',
                    amount: true
                }, {
                    title: '市内交通天数',
                    field: 'urbanDays'
                }, {
                    title: '市内交通预算金额',
                    field: 'urbanBudget',
                    onChange: (v) => this.getSumMoney(v, 'urbanBudget'),
                    amount: true
                }],
                [{
                    title: '住宿费',
                    field: 'hotelCost',
                    onChange: (v) => this.getSumMoney(v, 'hotelCost'),
                    amount: true
                }, {
                    title: '伙食补助',
                    field: 'foodSubsidy',
                    onChange: (v) => this.getSumMoney(v, 'foodSubsidy'),
                    amount: true
                }, {
                    title: '招待费',
                    field: 'entertainmentCost',
                    onChange: (v) => this.getSumMoney(v, 'entertainmentCost'),
                    amount: true
                }],
                [{
                    title: '其他（详细明细）',
                    field: 'other',
                    type: 'textarea',
                    normalArea: true
                }],
                [{
                    title: '小计',
                    field: 'subtotal',
                    amount: true,
                    readonly: true
                }, {
                    title: '备用金',
                    field: 'spareCash',
                    onChange: (v) => this.getSumMoney(v, 'spareCash'),
                    amount: true
                }, {
                    title: '费用合计',
                    field: 'costTotal',
                    amount: true,
                    readonly: true
                }],
                [{
                    title: '出差事由',
                    field: 'tripReason',
                    type: 'textarea',
                    normalArea: true
                }],
                [{
                    title: '出差路线',
                    field: 'tripLine',
                    type: 'textarea',
                    normalArea: true
                }],
                [{
                    title: '备注',
                    field: 'applyNote',
                    type: 'textarea',
                    normalArea: true
                }]
            ]
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            buttons: [{
                title: '确认',
                handler: (param) => {
                    param.applyUserCode = getUserId();
                    this.props.doFetching();
                    fetch(632690, param).then(() => {
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

export default TravelApply;