import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/wares/yellowList-payCompensate';
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

@DetailWrapper(state => state.waresYellowListPayCompensate, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class yellowListPayCompensate extends React.Component {
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
            title: '未还代偿金额',
            field: 'restTotalCost',
            amount: true,
            readonly: true
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
                        param.payType = '1';
                        param.operator = getUserId();
                        this.props.doFetching();
                        fetch(632534, param).then(() => {
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
                        param.payType = '2';
                        param.operator = getUserId();
                        this.props.doFetching();
                        fetch(632534, param).then(() => {
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

export default yellowListPayCompensate;