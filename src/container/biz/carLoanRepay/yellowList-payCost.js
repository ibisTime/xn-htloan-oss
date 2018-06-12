import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/yellowList-payCost';
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

@DetailWrapper(state => state.bizYellowListPayCost, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class yellowListPayCost extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.userId = getQueryString('userId', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            field: 'user',
            title: '贷款人',
            formatter: (v, d) => {
                return d.user.realName;
            },
            readonly: true
        }, {
            title: '逾期日期',
            field: 'repayDatetime',
            type: 'date',
            readonly: true
        }, {
            title: '已缴纳清收成本(元)',
            field: 'payedFee',
            amount: true,
            readonly: true
          }, {
            title: '清收成本清单',
            field: 'costList',
            type: 'o2m',
            options: {
                fields: [{
                    title: '编号',
                    field: 'code'
                }, {
                    title: '费用项',
                    field: 'item'
                }, {
                    title: '金额（元）',
                    field: 'amount',
                    amount: true
                }, {
                    title: '发生时间',
                    field: 'payDatetime',
                    type: 'date'
                }, {
                    title: '状态',
                    field: 'status',
                    type: 'select',
                    key: 'cost_status'
                }, {
                    title: '备注',
                    field: 'remark'
                }]
            }
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630541,
                buttons: [{
                    title: '线上代扣',
                    handler: (param) => {
                        param.operator = getUserId();
                        param.costList = this.props.o2mSKeys.costList;
                        param.payType = '1';
                        console.log(this.props.o2mSKeys);
                        param.o2mSKeys = this.props.o2mSKeys;
                        this.props.doFetching();
                        fetch(630533, param).then(() => {
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
                    title: '线下收取',
                    handler: (param) => {
                        param.operator = getUserId();
                        param.costList = this.props.o2mSKeys.costList;
                        param.payType = '2';
                        this.props.doFetching();
                        fetch(630533, param).then(() => {
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

export default yellowListPayCost;
