import React from 'react';
import { Form } from 'antd';
import { getQueryString, getUserId, showSucMsg } from 'common/js/util';
import fetch from 'common/js/fetch';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class bizInsuranceEnter extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    checkForm(param, approveResult) {
        param.operator = getUserId();
        param.approveResult = approveResult;
        this.doFetching();
        fetch(632501, param).then(() => {
            showSucMsg('操作成功');
            this.cancelFetching();
            setTimeout(() => {
                this.props.history.go(-1);
            }, 1000);
        }).catch(this.cancelFetching);
    }
    render() {
        const fields = [{
          field: 'operator',
          hidden: true,
          value: getUserId()
        }, {
            title: '业务编号',
            field: 'code',
            readonly: true,
            formatter: (v, d) => {
                return <div>
                    {d.code}<a href="javascript:void(0);" style={{ marginLeft: 20 }} onClick={() => {
                    window.location.href = '/ywcx/ywcx/addedit?v=1&code' + '=' + d.code;
                }}>查看详情</a>
                </div>;
            }
        }, {
            title: '客户姓名',
            field: 'applyUserName',
            readonly: true,
            formatter: (v, d) => {
                return d.creditUser ? d.creditUser.userName : '';
            }
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            formatter: (v, d) => {
                if (d.loanBankName) {
                    return d.repaySubbranch ? d.loanBankName + d.repaySubbranch : d.loanBankName;
                } else if (d.repaySubbranch) {
                    return d.loanBankName ? d.loanBankName + d.repaySubbranch : d.repaySubbranch;
                }
            },
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '业务类型',
            field: 'bizType',
            type: 'select',
            key: 'budget_orde_biz_typer',
            required: true,
            readonly: true
        }, {
            title: '业务归属',
            field: 'ywyUser',
            formatter: (v, d) => {
                return d && d.saleUserCompanyName ? d.saleUserCompanyName + '-' + d.saleUserDepartMentName + '-' + d.saleUserPostName : '';
            },
            readonly: true
        }, {
            title: '指派归属',
            field: 'zfStatus',
            formatter: (v, d) => {
                return d && d.companyName ? d.companyName + '-' + d.teamName + '-' + d.insideJobName : '';
            },
            readonly: true
        }, {
            title: '当前状态',
            field: 'fbhgpsNode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            params: { type: 'c' },
            readonly: true
        }, {
            title: '保单日期',
            field: 'policyDatetime',
            _keys: ['carInfo', 'policyDatetime'],
            type: 'date',
            readonly: true
        }, {
            title: '保单到期日',
            field: 'policyDueDate',
            _keys: ['carInfo', 'policyDueDate'],
            type: 'date',
            readonly: true
        }, {
            title: '发票',
            field: 'carInvoice',
            _keys: ['carInfo', 'carInvoice'],
            type: 'img',
            readonly: true
        }, {
            title: '交强险',
            field: 'carJqx',
            _keys: ['carInfo', 'carJqx'],
            type: 'img',
            readonly: true
        }, {
            title: '商业险',
            field: 'carSyx',
            _keys: ['carInfo', 'carSyx'],
            type: 'img',
            readonly: true
        }, {
            title: '其他资料',
            field: 'carSettleOtherPdf',
            _keys: ['carInfo', 'carSettleOtherPdf'],
            type: 'file',
            readonly: true
        }, {
            title: '绿大本扫描件',
            field: 'greenBigSmj',
            _keys: ['carInfo', 'greenBigSmj'],
            type: 'img',
            readonly: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632516,
            buttons: [{
                title: '通过',
                handler: (param) => {
                    this.checkForm(param, 1);
                },
                check: true,
                type: 'primary'
            }, {
                title: '不通过',
                handler: (param) => {
                    this.checkForm(param, 0);
                },
                check: true,
                type: 'primary'
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }],
            afterFetch: (data) => {
                data.attachments.forEach(pic => {
                    if (pic.kname === 'green_big_smj') {
                        data.carInfo.greenBigSmj = pic.url;
                    } else if (pic.kname === 'car_invoice') {
                        data.carInfo.carInvoice = pic.url;
                    } else if (pic.kname === 'car_jqx') {
                        data.carInfo.carJqx = pic.url;
                    } else if (pic.kname === 'car_syx') {
                        data.carInfo.carSyx = pic.url;
                    }
                });
                return data;
            }
        });
    }
}

export default bizInsuranceEnter;
