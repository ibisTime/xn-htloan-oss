import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/attendance/travel-managerCheck';
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
    state => state.attendanceTravelmanagerCheck, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class TravelmanagerCheck extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '出差申请信息',
            items: [
                [{
                    title: '出差人',
                    field: 'applyUserName',
                    readonly: true
                }, {
                    title: '出差时间',
                    field: 'time',
                    rangedate: ['tripDatetimeStart', 'tripDatetimeEnd'],
                    type: 'date',
                    render: dateTimeFormat,
                    required: true,
                    readonly: true
                }],
                [{
                    title: '飞机票费用标准',
                    field: 'aircraftFeeStandard',
                    amount: true,
                    readonly: true
                }, {
                    title: '飞机票天数',
                    field: 'aircraftDays',
                    readonly: true
                }, {
                    title: '飞机票预算金额',
                    field: 'aircraftBudget',
                    amount: true,
                    readonly: true
                }],
                [{
                    title: '火车票费用标准',
                    field: 'trainFeeStandard',
                    amount: true,
                    readonly: true
                }, {
                    title: '火车票天数',
                    field: 'trainDays',
                    readonly: true
                }, {
                    title: '火车票预算金额',
                    field: 'trainBudget',
                    amount: true,
                    readonly: true
                }],
                [{
                    title: '市内交通费用标准',
                    field: 'urbanFeeStandart',
                    amount: true,
                    readonly: true
                }, {
                    title: '市内交通天数',
                    field: 'urbanDays',
                    readonly: true
                }, {
                    title: '市内交通预算金额',
                    field: 'urbanBudget',
                    amount: true,
                    readonly: true
                }],
                [{
                    title: '住宿费',
                    field: 'hotelCost',
                    amount: true,
                    readonly: true
                }, {
                    title: '伙食补助',
                    field: 'foodSubsidy',
                    amount: true,
                    readonly: true
                }, {
                    title: '招待费',
                    field: 'entertainmentCost',
                    amount: true,
                    readonly: true
                }],
                [{
                    title: '其他（详细明细）',
                    field: 'other',
                    type: 'textarea',
                    normalArea: true,
                    readonly: true
                }],
                [{
                    title: '小计',
                    field: 'subtotal',
                    amount: true,
                    readonly: true
                }, {
                    title: '备用金',
                    field: 'spareCash',
                    amount: true,
                    readonly: true
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
                    normalArea: true,
                    readonly: true
                }],
                [{
                    title: '出差路线',
                    field: 'tripLine',
                    type: 'textarea',
                    normalArea: true,
                    readonly: true
                }],
                [{
                    title: '审核说明',
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
            detailCode: 632696,
            buttons: [{
              title: '通过',
              handler: (param) => {
                param.approveResult = '1';
                param.operator = getUserId();
                this.props.doFetching();
                fetch(632693, param).then(() => {
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
                param.approveResult = '0';
                param.operator = getUserId();
                this.props.doFetching();
                fetch(632693, param).then(() => {
                  showSucMsg('操作成功');
                  this.props.cancelFetching();
                  setTimeout(() => {
                    this.props.history.go(-1);
                  }, 1000);
                }).catch(this.props.cancelFetching);
              },
              check: true
            }, {
              title: '返回',
              handler: (param) => {
                this.props.history.go(-1);
              }
            }]
        });
    }
}

export default TravelmanagerCheck;
