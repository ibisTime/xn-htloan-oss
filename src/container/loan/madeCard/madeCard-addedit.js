import React from 'react';
import { Form } from 'antd';
import {
    getQueryString,
    showWarnMsg,
    showSucMsg,
    getUserId,
    isExpressConfirm
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';
import fetch from 'common/js/fetch';

@Form.create()
class MadeCardAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        // 审核
        this.isCheck = !!getQueryString('isCheck', this.props.location.search);
        this.isCheckNq = !!getQueryString('isCheckNq', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        let _this = this;
        let buttons = [];

        let fields = [{
            title: '客户姓名',
            field: 'applyUserName',
            required: true,
            readonly: true
        }, {
            title: '业务编号',
            field: 'code1',
            required: true,
            readonly: true,
            formatter: (v, d) => {
                return d.code;
            }
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            required: true,
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            required: true,
            readonly: true
        }, {
            title: '银行视频',
            field: 'bankVideo',
            type: 'file',
            required: true,
            readonly: (this.isCheck || this.view) ? 'true' : false
        }, {
            title: '公司视频',
            field: 'companyVideo',
            type: 'file',
            required: true,
            readonly: (this.isCheck || this.view) ? 'true' : false
        }, {
            title: '其他视频',
            field: 'otherVideo',
            type: 'file',
            readonly: (this.isCheck || this.view) ? 'true' : false
        }, {
            title: '银行面签图片',
            field: 'bankPhoto',
            type: 'img',
            required: true,
            readonly: (this.isCheck || this.view) ? 'true' : false
        }, {
            title: '银行合同',
            field: 'bankContract',
            type: 'img',
            readonly: (this.isCheck || this.view) ? 'true' : false
        }, {
            title: '公司合同',
            field: 'companyContract',
            type: 'img',
            readonly: (this.isCheck || this.view) ? 'true' : false
        }, {
            title: '资金划转授权书',
            field: 'advanceFundAmountPdf',
            type: 'img',
            required: true,
            readonly: (this.isCheck || this.view) ? 'true' : false
        }, {
            title: '其他资料',
            field: 'interviewOtherPdf',
            type: 'file',
            readonly: (this.isCheck || this.view) ? 'true' : false
        }, {
            title: '审核说明',
            field: 'approveNote',
            readonly: !(this.isCheck || this.isCheckNq),
            hidden: !this.view
        }, {
            title: '流转日志',
            field: 'list',
            type: 'o2m',
            listCode: 630176,
            params: { refOrder: this.code },
            options: {
                rowKey: 'id',
                noSelect: true,
                fields: [{
                    title: '操作人',
                    field: 'operatorName'
                }, {
                    title: '开始时间',
                    field: 'startDatetime',
                    type: 'datetime'
                }, {
                    title: '结束时间',
                    field: 'endDatetime',
                    type: 'datetime'
                }, {
                    title: '花费时长',
                    field: 'speedTime'
                }, {
                    title: '审核意见',
                    field: 'dealNote'
                }, {
                    title: '当前节点',
                    field: 'dealNode',
                    type: 'select',
                    listCode: 630147,
                    keyName: 'code',
                    valueName: 'name'
                }]
            }
        }];
        let bizCode = this.isCheckNq ? 632137 : 632124;
        // 准入审查
        if (this.isCheck || this.isCheckNq) {
            buttons = [{
                title: '通过',
                handler: (params) => {
                    let data = {};
                    data.code = this.code;
                    data.approveResult = '1';
                    data.approveNote = params.approveNote;
                    data.operator = getUserId();
                    this.doFetching();
                    fetch(bizCode, data).then((res) => {
                        showSucMsg('操作成功');
                        isExpressConfirm(res);
                        this.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.cancelFetching);
                }
            }, {
                title: '不通过',
                handler: (params) => {
                    let data = {};
                    data.code = this.code;
                    data.approveResult = '0';
                    data.approveNote = params.approveNote;
                    data.operator = getUserId();
                    this.doFetching();
                    fetch(bizCode, data).then(() => {
                        showSucMsg('操作成功');
                        this.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.cancelFetching);
                }
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        } else if(this.view) {
            buttons = [{
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        } else {
            buttons = [{
                title: '保存',
                handler: (params) => {
                    params.operator = getUserId();
                    params.isSend = '0';
                    this.doFetching();
                    fetch(632123, params).then(() => {
                        showSucMsg('操作成功');
                        this.cancelFetching();
                    }).catch(this.cancelFetching);
                }
            }, {
                title: '提交',
                check: true,
                handler: (params) => {
                    params.operator = getUserId();
                    params.isSend = '1';
                    this.doFetching();
                    fetch(632123, params).then(() => {
                        console.log('面签成功');
                        showSucMsg('操作成功');
                        this.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.cancelFetching);
                }
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        }

        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146,
            addCode: 632123,
            editCode: 632123,
            buttons: buttons,
            beforeSubmit: (params) => {
                delete params.loanAmount;
                params.operator = getUserId();
                return params;
            }
        });
    }
}

export default MadeCardAddedit;
