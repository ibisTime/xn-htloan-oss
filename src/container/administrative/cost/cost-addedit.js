import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/administrative/cost-addedit';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(state => state.administrativeCostAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class costAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        // 审核
        this.isCheck = !!getQueryString('isCheck', this.props.location.search);
        // 财务审核
        this.isFinance = !!getQueryString('isFinance', this.props.location.search);
        // 确认放款
        this.isCertain = !!getQueryString('isCertain', this.props.location.search);
        this.refAssertCodeHideStatus = true;
        this.refBudgetOrderCodeHideStatus = true;
        this.buttons = [];
        this.checkFalg = false;
        this.certainFalg = false;
    }

    // 获取关联表
    getRelation = (bizCode, params) => {
        this.props.setSelectData({
            data: [],
            key: 'refAssertCode'
        });
        this.props.form.setFieldsValue({
            refAssertCode: ''
        });
        this.props.doFetching();
        fetch(bizCode, params).then((data) => {
            this.props.setSelectData({
                data: data.list ? data.list : data,
                key: 'refAssertCode'
            });
            this.props.cancelFetching();
        }).catch(this.props.cancelFetching);
    }

    // 获取关联车贷业务
    getRelationLoan = (bizCode, params) => {
        this.props.setSelectData({
            data: [],
            key: 'refBudgetOrderCode'
        });
        this.props.form.setFieldsValue({
            refBudgetOrderCode: ''
        });
        this.props.doFetching();
        fetch(bizCode, params).then((data) => {
            this.props.setSelectData({
                data: data.list ? data.list : data,
                key: 'refBudgetOrderCode'
            });
            this.props.cancelFetching();
        }).catch(this.props.cancelFetching);
    }

    render() {
        let fields = [{
            title: '类型',
            field: 'type',
            type: 'select',
            key: 'fee_advance_apply_type',
            required: true,
            onChange: (value) => {
                let bizCode;
                let params = {};
                // 采购固定资产
                if (value === '01') {
                    bizCode = 632645;
                    params.limit = 1000;
                    params.start = 1;
                    params.status = '1';
                    params.type = '1';
                    params.applyUser = getUserId();
                    this.getRelation(bizCode, params);
                    // 采购办公用品
                } else if (value === '02') {
                    bizCode = 632645;
                    params.limit = 1000;
                    params.start = 1;
                    params.status = '1';
                    params.type = '2';
                    params.applyUser = getUserId();
                    // 贷后催收
                } else if (value === '06') {
                    bizCode = 632145;
                    params.limit = 1000;
                    params.start = 1;
                    params.curNodeCode = '002_23';
                }
                if (value === '01' || value === '02') {
                    this.refAssertCodeHideStatus = false;
                    this.refBudgetOrderCodeHideStatus = true;
                    this.getRelation(bizCode, params);
                } else if (value === '06') {
                    this.refAssertCodeHideStatus = true;
                    this.refBudgetOrderCodeHideStatus = false;
                    this.getRelationLoan(bizCode, params);
                } else {
                    this.refAssertCodeHideStatus = true;
                    this.refBudgetOrderCodeHideStatus = true;
                }
            }
        }, {
            title: '关联审批表',
            field: 'refAssertCode',
            type: 'select',
            required: true,
            keyName: 'code',
            valueName: '{{code.DATA}}-{{applyUserName.DATA}}',
            hidden: this.refAssertCodeHideStatus
        }, {
            title: '关联车贷业务',
            field: 'refBudgetOrderCode',
            type: 'select',
            keyName: 'code',
            valueName: '{{code.DATA}}-{{saleUserName.DATA}}',
            required: true,
            hidden: this.refBudgetOrderCodeHideStatus
        }, {
            title: '预支金额',
            field: 'amount',
            amount: true,
            required: true
        }, {
            title: '开户银行',
            field: 'subbranch',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: 'bankName',
            required: true
        }, {
            title: '账户名',
            field: 'accountName',
            required: true
        }, {
            title: '银行账号',
            field: 'bankcardNumber',
            bankCard: true,
            required: true
        }, {
            title: '说明',
            field: 'applyNote'
        }];

        let checkFields = [{
            title: '备注',
            field: 'remark',
            readonly: false
        }];

        if ((this.isCheck && !this.checkFalg) || (this.isFinance && !this.checkFalg)) {
            this.fields = this.fields.concat(checkFields);
            let bizCode = this.isCheck ? 632671 : 632672;
            this.checkFalg = true;

            this.buttons = [{
                title: '通过',
                check: true,
                handler: (params) => {
                    let data = {};
                    data.code = this.code;
                    data.remark = params.remark;
                    data.approveResult = '1';
                    data.updater = getUserId();
                    this.props.doFetching();
                    fetch(bizCode, data).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '不通过',
                check: true,
                handler: (params) => {
                    let data = {};
                    data.code = this.code;
                    data.remark = params.remark;
                    data.approveResult = '0';
                    data.updater = getUserId();
                    this.props.doFetching();
                    fetch(bizCode, data).then(() => {
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
            }];
        }

        let certainFields = [{
            title: '付款时间',
            field: 'payDatetime',
            type: 'datetime',
            readonly: false,
            required: true
        }, {
            title: '付款银行',
            field: 'payBank',
            type: 'select',
            listCode: 632037,
            keyName: 'code',
            valueName: '{{bankName.DATA}}{{subbranch.DATA}}',
            readonly: false,
            required: true
        }, {
            title: '付款银行卡',
            field: 'payBankcard',
            bankCard: true,
            readonly: false,
            required: true
        }, {
            title: '付款凭证',
            field: 'payPdf',
            type: 'img',
            readonly: false,
            required: true
        }];

        if (this.isCertain && !this.certainFalg) {
            this.fields = this.fields.concat(certainFields);
            this.isCertain = true;

            this.buttons = [{
                title: '确定',
                check: true,
                handler: (params) => {
                    params.code = this.code;
                    this.props.doFetching();
                    fetch(632673, params).then(() => {
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
            }];
        }
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 632670,
            detailCode: 632676,
            buttons: this.buttons,
            beforeSubmit: (data) => {
                data.applyUser = getUserId();
                return data;
            }
        });
    }
}

export default costAddedit;