import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/handleApply-check';
import {
    getQueryString,
    showSucMsg,
    getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizHandleApplyCheck, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class handleApplyCheck extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '订单编号',
            field: 'code',
            readonly: true
        }, {
            title: '品牌',
            field: 'brandCode',
            search: true,
            type: 'select',
            listCode: 630406,
            keyName: 'code',
            valueName: 'name',
            readonly: true
        }, {
            title: '车型名称',
            field: 'carName',
            readonly: true
        },
            // {
            //     title: '处理人',
            //     field: 'handler',
            //     hidden: !this.view,
            //     readonly: true
            // },
            {
            title: '车系名称',
            field: 'seriesName',
            readonly: true
        }, {
            title: '申请人',
            field: 'userId',
            type: 'select',
            listCode: 630066,
            keyName: 'userId',
            valueName: 'realName',
            readonly: true,
                formatter: (v, data) => {
                //     let prefix = data.user && data.user.realName ? data.user.realName + '-' : '';
                //     return prefix + (data.user.mobile || '');
                    return data.user ? data.user.loginName : data.user.mobile;
            }
        }, {
            title: '首付比例',
            field: 'sfRate',
            readonly: true
        }, {
            title: '首付金额',
            field: 'sfAmount',
            amount: true,
            readonly: true
        }, {
            title: '申请时间',
            field: 'createDatetime',
            type: 'datetime',
            readonly: true
        }, {
            title: '备注',
            field: 'remark',
            readonly: true
        }];
        let buttons = [{
            title: '返回',
            handler: (param) => {
                this.props.history.go(-1);
            }
        }];

        if (!this.view) {
            buttons = [{
                title: '通过',
                handler: (param) => {
                    param.result = '0';
                    param.approveNote = this.projectCode;
                    param.handler = getUserId();
                    this.props.doFetching();
                    fetch(630431, param).then(() => {
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
                    param.result = '1';
                    param.approveNote = this.projectCode;
                    param.handler = getUserId();
                    this.props.doFetching();
                    fetch(630431, param).then(() => {
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
            }];
        }

        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630437,
                buttons: buttons
            });
    }
}

export default handleApplyCheck;
