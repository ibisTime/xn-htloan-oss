import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/takeFree-enter';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.loanstoolsTakeFreeEnter, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class TakeFreeEnter extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'feeCode',
            value: this.code,
            hidden: true
        }, {
            field: 'operator',
            value: getUserId(),
            hidden: true
        }, {
            title: '客户姓名',
            field: 'userName',
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            readonly: true
        }, {
            title: '应收金额',
            field: 'shouldAmount',
            amount: true,
            readonly: true
        }, {
            title: '实收金额',
            field: 'realAmount',
            amount: true,
            readonly: true
        }, {
            title: '交款类型',
            field: 'remitType',
            type: 'select',
            key: 'remit_type',
            render: (v, d) => {
                return d.remitType || d.unSubmitBudgetOrderFeeDetail.remitType;
            },
            required: true
        }, {
            title: '交款项目',
            field: 'remitProject',
            key: 'remit_project',
            type: 'checkbox',
            render: (v, d) => {
                return d.remitProject || d.unSubmitBudgetOrderFeeDetail.remitProject;
            },
            required: true
        }, {
            title: '金额',
            field: 'amount',
            amount: true,
            render: (v, d) => {
                return d.amount || d.unSubmitBudgetOrderFeeDetail.amount;
            },
            required: true
        }, {
            title: '汇入我司账号',
            field: 'platBankcard',
            listCode: 632007,
            required: true,
            type: 'select',
            params: {
                companyCode: 'DP201800000000000000001'
            },
            keyName: 'code',
            valueName: 'bankcardNumber',
            render: (v, d) => {
                return d.platBankcard || d.unSubmitBudgetOrderFeeDetail.platBankcard;
            }
        }, {
            title: '汇款人',
            field: 'remitUser',
            render: (v, d) => {
                return d.remitUser || d.unSubmitBudgetOrderFeeDetail.remitUser;
            },
            required: true
        }, {
            title: '到账日期',
            field: 'reachDatetime',
            type: 'datetime',
            render: (v, d) => {
                return d.reachDatetime || d.unSubmitBudgetOrderFeeDetail.reachDatetime;
            },
            required: true
        }, {
            title: '是否结清',
            field: 'isSettled',
            required: true,
            type: 'select',
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            keyName: 'key',
            valueName: 'value',
            render: (v, d) => {
                return d.isSettled || d.unSubmitBudgetOrderFeeDetail.isSettled;
            }
        }, {
            title: '备注',
            field: 'remark',
            render: (v, d) => {
                return d.remark || d.unSubmitBudgetOrderFeeDetail.remark;
            }
        }, {
            title: '服务费清单',
            field: 'BudgetOrderFeeDetailList',
            type: 'o2m',
            options: {
                scroll: { x: 1300 },
                fields: [{
                    title: '交款类型',
                    field: 'remitType',
                    type: 'select',
                    key: 'remit_type'
                },
                 {
                    title: '交款项目',
                    field: 'remitProject',
                    key: 'remit_project',
                    type: 'checkbox'
                },
                {
                    title: '金额小写',
                    field: 'amount',
                    amount: true
                }, {
                    title: '汇入我司账号',
                    field: 'receiptAccount',
                    render: (v, d) => {
                        if(d.collectBankcard) {
                            return d.collectBankcard.bankcardNumber;
                        }
                    }
                }, {
                    title: '汇款人',
                    field: 'remitUser'
                }, {
                    title: '到帐日期',
                    field: 'reachDatetime',
                    type: 'date'
                }, {
                    title: '更新人',
                    field: 'updater'
                }, {
                    title: '更新时间',
                    field: 'updateDatetime',
                    type: 'datetime'
                }, {
                    title: '备注',
                    field: 'remark'
                }]
            }
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632166,
            buttons: [{
                title: '保存',
                handler: (params) => {
                    params.dealType = '0';
                    this.props.doFetching();
                    fetch(632160, params).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '发送',
                check: true,
                handler: (params) => {
                    params.dealType = '1';
                    this.props.doFetching();
                    fetch(632160, params).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default TakeFreeEnter;
