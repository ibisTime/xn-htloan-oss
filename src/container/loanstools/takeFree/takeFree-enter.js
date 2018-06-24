import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/takeFree-enter';
import moment from 'moment';
import {
    getQueryString,
    showSucMsg,
    getUserId,
    moneyFormat,
    dateTimeFormat
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

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
    getRealDateVal(result) {
        let readonly = this.view;
        if (readonly) {
            return result ? dateTimeFormat(result, DATETIME_FORMAT) : null;
        }
        return result ? moment(dateTimeFormat(result), DATETIME_FORMAT) : null;
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
            field: 'budgetOrder',
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
            title: '明细',
            field: 'detail',
            formatter: (v, d) => {
                return ('GPS:' + moneyFormat(d.budgetOrderObject.gpsFee) + '    ' + '月供保证金:' + moneyFormat(d.budgetOrderObject.monthDeposit) + '    ' + '公证费' + moneyFormat(d.budgetOrderObject.authFee) + '     ' + '银行服务费' + moneyFormat(d.budgetOrderObject.bankFee) + '     ' + '公司服务费' + moneyFormat(d.budgetOrderObject.companyFee) + '     ' + '团队服务费' + moneyFormat(d.budgetOrderObject.teamFee));
            },
            readonly: true
        }, {
            title: '交款类型',
            field: 'remitType',
            type: 'select',
            key: 'remit_type',
            formatter: (v, d) => {
                if (d.remitType) {
                    return d.remitType;
                } else if (d.unSubmitBudgetOrderFeeDetail) {
                    return d.unSubmitBudgetOrderFeeDetail.remitType;
                } else {
                    return d.remitType;
                }
            },
            required: true
        }, {
            title: '交款项目',
            field: 'remitProject',
            key: 'remit_project',
            type: 'checkbox',
            formatter: (v, d) => {
                if (d.remitProject) {
                    return d.remitProject.split(',');
                } else if (d.unSubmitBudgetOrderFeeDetail) {
                    return d.unSubmitBudgetOrderFeeDetail.remitProject.split(',');
                } else {
                    return [];
                }
            },
            onChange: (v, key) => {
                console.log(v, key);
            },
            required: true
        }, {
            title: '金额',
            field: 'amount',
            amount: true,
            formatter: (v, d) => {
                if (d.amount) {
                    return moneyFormat(d.amount);
                } else if (d.unSubmitBudgetOrderFeeDetail) {
                    return moneyFormat(d.unSubmitBudgetOrderFeeDetail.amount);
                } else {
                    return moneyFormat(d.amount);
                }
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
            formatter: (v, d) => {
                if (d.bankcardNumber) {
                    return d.bankcardNumber;
                } else if (d.unSubmitBudgetOrderFeeDetail) {
                    return d.unSubmitBudgetOrderFeeDetail.platBankcard;
                } else {
                    return d.bankcardNumber;
                }
            }
        }, {
            title: '汇款人',
            field: 'remitUser',
            formatter: (v, d) => {
                if (d.remitUser) {
                    return d.remitUser;
                } else if (d.unSubmitBudgetOrderFeeDetail) {
                    return d.unSubmitBudgetOrderFeeDetail.remitUser;
                } else {
                    return d.remitUser;
                }
            },
            required: true
        }, {
            title: '到账日期',
            field: 'reachDatetime',
            type: 'datetime',
            formatter: (v, d) => {
                let val;
                if (d.reachDatetime) {
                    val = d.reachDatetime;
                } else if (d.unSubmitBudgetOrderFeeDetail) {
                    val = d.unSubmitBudgetOrderFeeDetail.reachDatetime;
                } else {
                    val = d.reachDatetime;
                }
                return this.getRealDateVal(val);
            },
            required: true
        }, {
            title: '备注',
            field: 'remark',
            formatter: (v, d) => {
                if (d.remark) {
                    return d.remark;
                } else if (d.unSubmitBudgetOrderFeeDetail) {
                    return d.unSubmitBudgetOrderFeeDetail.remark;
                } else {
                    return d.remark;
                }
            }
        }, {
            title: '服务费清单',
            field: 'BudgetOrderFeeDetailList',
            type: 'o2m',
            options: {
                scroll: {
                    x: 1300
                },
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
                            if (d.collectBankcard) {
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
                    }
                ]
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