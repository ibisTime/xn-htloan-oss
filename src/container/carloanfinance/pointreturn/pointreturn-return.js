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
import {
    accessSlipDetail
} from '../../../api/preLoan.js';

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
            bankcardNumber: '',
            arr: [],
            accountNoNow: '',
            repointAmount: '',
            carFunds3: '',
            carFunds4: '',
            carFunds5: ''
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
    componentDidMount(): void {
        fetch('632316', {code: this.code}).then(data => {
            let code = data.bizCode;
            fetch('632319', {code: code}).then(data => {
                accessSlipDetail(code).then(data => {
                    this.setState({
                        repointAmount: data.repointAmount ? data.repointAmount / 1000 : '',
                        carFunds3: data.carFunds3 ? data.carFunds3 / 1000 : '',
                        carFunds4: data.carFunds4 ? data.carFunds4 / 1000 : '',
                        carFunds5: data.carFunds5 ? data.carFunds5 / 1000 : ''
                    });
                });
                let arr = [];
                for(let i = 0; i < 4; i++) {
                    switch (i) {
                        case 0:
                            if(data.carFunds2) {
                                arr.push({
                                    key: '车款2',
                                    value: '车款2'
                                });
                            }
                            break;
                        case 1:
                            if(data.carFunds3) {
                                arr.push({
                                    key: '车款3',
                                    value: '车款3'
                                });
                            }
                            break;
                        case 2:
                            if(data.carFunds4) {
                                arr.push({
                                    key: '车款4',
                                    value: '车款4'
                                });
                            }
                            break;
                        case 3:
                            if(data.carFunds5) {
                                arr.push({
                                    key: '车款5',
                                    value: '车款5'
                                });
                            }
                            break;
                    }
                }
                this.setState({
                    arr
                });
            });
            this.setState({
                accountNoNow: data.accountNo
            });
        });
    }
    render() {
        // repointAmount: '',
        // carFunds3: '',
        // carFunds4: '',
        // carFunds5: ''
        const {arr, accountNoNow, repointAmount, carFunds3, carFunds4, carFunds5} = this.state;
        const fields = [{
            title: '业务团队长',
            field: 'captainName',
            readonly: true
        }, {
            title: '业务编号',
            field: 'bizCode',
            readonly: true
        }, {
            title: '车款2',
            field: 'repointAmount',
            formatter: (v, d) => {
                return repointAmount;
            },
            hidden: repointAmount === '',
            readonly: true
        }, {
            title: '车款3',
            field: 'repointAmount',
            formatter: (v, d) => {
                return carFunds3;
            },
            hidden: carFunds3 === '',
            readonly: true
        }, {
            title: '车款4',
            field: 'repointAmount',
            formatter: (v, d) => {
                return carFunds4;
            },
            hidden: carFunds4 === '',
            readonly: true
        }, {
            title: '车款5',
            field: 'repointAmount',
            formatter: (v, d) => {
                return carFunds5;
            },
            hidden: carFunds5 === '',
            readonly: true
        }, {
            title: '账号列表',
            field: 'repointAccountList',
            type: 'o2m',
            options: {
                add: true,
                edit: true,
                delete: true,
                fields: [{
                    title: '车款类型',
                    field: 'type',
                    type: 'select',
                    data: [{
                        key: '车款1',
                        value: '车款1'
                    }, {
                        key: '车款2',
                        value: '车款2'
                    }, {
                        key: '车款3',
                        value: '车款3'
                    }, {
                        key: '车款4',
                        value: '车款4'
                    }, {
                        key: '车款5',
                        value: '车款5'
                    }],
                    keyName: 'key',
                    valueName: 'value',
                    hidden: !this.view
                }, {
                    title: '车款类型',
                    field: 'type',
                    type: 'select',
                    data: arr,
                    keyName: 'key',
                    valueName: 'value',
                    noVisible: true
                }, {
                    title: '收款账号',
                    field: 'repointCardCode',
                    hidden: !this.view,
                    required: true
                }, {
                    title: '收款账号2',
                    field: 'repointCardCode',
                    required: true,
                    formatter: (v, d) => {
                        return accountNoNow;
                    },
                    noVisible: true
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
