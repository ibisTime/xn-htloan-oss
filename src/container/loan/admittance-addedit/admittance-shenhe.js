import React from 'react';
// import { Form, Tooltip } from 'antd';
import {Form, Tabs, Row, Col, Spin, message, Button, Table, Card, Icon, Tooltip} from 'antd';
import {
    getQueryString, showWarnMsg, showSucMsg, getUserId, isUndefined, isExpressConfirm, getRules,
    getRealValue, moneyFormat, moneyParse, getUserName, dateTimeFormat
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';
import fetch from 'common/js/fetch';

@Form.create()
class AdmittanceShenhe extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.bizType = getQueryString('bizType', this.props.location.search);
        this.loanBank = getQueryString('loanBank', this.props.location.search);
        // 区域经理审核
        this.isCheckRegionalManager = !!getQueryString('isCheckRegionalManager', this.props.location.search);
        // 内勤主管审核（财务总监审核）
        this.isCheckNq = !!getQueryString('isCheckNq', this.props.location.search);
        // 风控一审
        this.isCheckCommissioner = !!getQueryString('isCheckCommissioner', this.props.location.search);
        // 风控二审
        this.checkCommissionerTwo = !!getQueryString('checkCommissionerTwo', this.props.location.search);
        // 风控终审
        this.isCheckDirector = !!getQueryString('isCheckDirector', this.props.location.search);
        // 业务总监审核
        this.isbusinessCheck = !!getQueryString('isbusinessCheck', this.props.location.search);
    }
    // 获取审核的接口号
    getBizCode() {
        let bizCode;
        // 区域经理审核
        if (this.isCheckRegionalManager) {
            bizCode = 632140;
            // 内勤主管审核（财务总监审核）
        } else if (this.isCheckNq) {
            // bizCode = 632142;
            bizCode = 632143;
            // 风控一审
        } else if (this.isCheckCommissioner) {
            bizCode = 632121;
            // 风控二审
        } else if (this.checkCommissionerTwo) {
            bizCode = 632138;
            // 风控终审
        } else if (this.isCheckDirector) {
            bizCode = 632122;
            // 业务总监审核
        } else if (this.isbusinessCheck) {
            bizCode = 632139;
        }
        return bizCode;
    }
    render() {
        let _this = this;
        let buttons = [];

        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true,
            formatter: (v, d) => {
                return <div>
                    {d.code}<a href="javascript:void(0);" type="primary" onClick={() => {
                    window.location.href = '/ywcx/ywcx/addedit?v=1&code' + '=' + d.code;
                }}>查看详情</a>
                </div>;
            }
        }, {
            title: '客户姓名',
            field: 'userName',
            search: true,
            formatter: (v, d) => {
                return d ? d.creditUser.userName : '-';
            }
        }, {
            title: '贷款银行',
            field: 'loanBank',
            type: 'select',
            listCode: 632037,
            keyName: 'code',
            valueName: '{{bankName.DATA}}{{subbranch.DATA}}'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '贷款期数',
            field: 'periods',
            formatter: (v, d) => {
                return d ? d.repayBiz.periods : '-';
            }
        }, {
            title: '业务种类',
            field: 'bizType',
            type: 'select',
            key: 'budget_orde_biz_typer'
        }, {
            title: '是否垫资',
            field: 'isAdvanceFund',
            type: 'select',
            data: [{
                dkey: '0',
                dvalue: '否'
            }, {
                dkey: '1',
                dvalue: '是'
            }],
            keyName: 'dkey',
            valueName: 'dvalue'
        }, {
            title: '业务员',
            field: 'saleUserName'
        }, {
            title: '当前状态',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            search: true,
            params: {type: 'b'}
        }, {
            title: '审核意见',
            field: 'approveNote',
            type: 'textarea',
            normalArea: true,
            readonly: false,
            required: this.isCheckNq && this.isCheck
        }];
        let bizCode = this.getBizCode();
        // 准入审查
            buttons = [{
                title: '通过',
                handler: (params) => {
                    if (params.approveNote) {
                        let data = {};
                        data.code = this.code;
                        data.approveResult = '1'; // 审核结果 通过
                        data.approveNote = params.approveNote; // 审核意见
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
                    } else {
                        message.warning('请填写审核意见');
                    }
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

        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632117,
            // addCode: 632123,
            // editCode: 632123,
            buttons: buttons,
            beforeSubmit: (params) => {
                delete params.loanAmount;
                params.operator = getUserId();
                return params;
            }
        });
    }
}

export default AdmittanceShenhe;
