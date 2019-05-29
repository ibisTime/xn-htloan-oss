import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/carloanfinance/pointreturn-return.js';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.carloanfinancePointreturnReturn, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class pointreturnReturn extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
            realName: '',
            bankName: '',
            subbranch: '',
            bankcardNumber: ''
        };
        this.buttons = [];
        if(this.view) {
            this.buttons = [{
                title: '返回',
                handler: () => {
                    this.props.history.go(-1);
                }
            }];
        } else {
            this.buttons = [{
                title: '确认',
                handler: (param) => {
                    param.updater = getUserId();
                    this.props.doFetching();
                    fetch(632310, param).then(() => {
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
            }];
        }
    }
    render() {
        const fields = [{
            title: '业务团队队长',
            field: 'captain',
            formatter: (v, d) => {
                if (d.user) {
                    return d.user.realName;
                }
            },
            readonly: true
        }, {
            title: '业务编号',
            field: 'bizCode',
            readonly: true
        }, {
            title: '应返金额',
            field: 'shouldAmount',
            amount: true,
            readonly: true
        }, {
            title: '返点账号列表',
            field: 'repointAccountList',
            type: 'o2m',
            options: {
                add: true,
                edit: true,
                delete: true,
                fields: [{
                    title: '返点账号',
                    field: 'repointCardCode',
                    type: 'select',
                    listCode: '632007',
                    params: {
                        type: '3'
                    },
                    keyName: 'code',
                    valueName: '{{bankName.DATA}}-{{bankcardNumber.DATA}}',
                    required: true,
                    onChange: (v, d) => {
                        this.setState({
                            realName: d.realName,
                            bankName: d.bankName,
                            subbranch: d.subbranch,
                            bankcardNumber: d.bankcardNumber
                        });
                    }
                }, {
                    title: '户名',
                    field: 'realName',
                    readonly: true,
                    hidden: !this.view,
                    render: (v, d) => {
                        if(this.state.realName) {
                            return this.state.realName;
                        }else {
                            return d.collectBankcard.realName;
                        }
                    }
                }, {
                    title: '银行',
                    field: 'bankName',
                    readonly: true,
                    hidden: !this.view,
                    render: (v, d) => {
                        if(this.state.bankName) {
                            return this.state.bankName;
                        }else {
                            return d.collectBankcard.bankName;
                        }
                    }
                }, {
                    title: '支行',
                    field: 'subbranch',
                    readonly: true,
                    hidden: !this.view,
                    render: (v, d) => {
                        if(this.state.subbranch) {
                            return this.state.subbranch;
                        }else {
                            return d.collectBankcard.subbranch;
                        }
                    }
                }, {
                    title: '收款账号',
                    field: 'bankcardNumber',
                    readonly: true,
                    hidden: !this.view,
                    render: (v, d) => {
                        if(this.state.bankcardNumber) {
                            return this.state.bankcardNumber;
                        }else {
                            return d.collectBankcard.bankcardNumber;
                        }
                    }
                }, {
                    title: '实返金额',
                    field: 'actualAmount',
                    amount: true,
                    required: true
                }, {
                    title: '水单',
                    field: 'waterBill',
                    type: 'img',
                    required: true
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
                detailCode: 632316,
                buttons: this.buttons
            });
    }
}

export default pointreturnReturn;
