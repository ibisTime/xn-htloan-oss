import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/blackList-dispose';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizBlackListDispose, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class blackListDispose extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('staffCode', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '贷款人',
            field: 'name',
            readonly: true,
            formatter: (v, d) => {
                return d.user.realName;
            }
        }, {
            title: '手机号',
            field: 'mobile',
            readonly: true,
            formatter: (v, d) => {
                return d.user.mobile;
            }
        }, {
            title: '期数',
            field: 'periods',
            readonly: true
        }, {
            title: '逾期期数',
            field: 'curPeriods',
            readonly: true
        }, {
            title: '逾期日期',
            field: 'repayDatetime',
            type: 'date',
            readonly: true
        }, {
            title: '处理历史',
            field: 'creditList',
            type: 'o2m',
            options: {
                add: true,
                edit: true,
                delete: true,
                fields: [{
                    title: '催收方式',
                    field: 'status'
                }, {
                    title: '催收对象',
                    field: 'status'
                }, {
                    title: '催收文本',
                    field: 'status'
                }, {
                    title: '催收时间',
                    field: 'status'
                }]
            }
        }, {
            title: '清收成本清单',
            field: 'costList',
            type: 'o2m',
            options: {
                fields: [{
                    title: '费用项',
                    field: 'item'
                }, {
                    title: '金额（元）',
                    field: 'amount',
                    amount: true
                }, {
                    title: '备注',
                    field: 'remark'
                }, {
                    title: '发生时间',
                    field: 'payDatetime',
                    type: 'date'
                }, {
                    title: '状态',
                    field: 'status',
                    type: 'select',
                    key: 'status'
                }]
            }
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630541
            });
    }
}

export default blackListDispose;