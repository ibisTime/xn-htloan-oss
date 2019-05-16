import React from 'react';
import { Form } from 'antd';
import { getQueryString, getUserId, isExpressConfirm } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class InsuranceAddEdit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
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
            readonly: true,
            formatter: (v, d) => {
                return d && d.saleUserCompanyName ? d.saleUserCompanyName + '-' + d.saleUserDepartMentName + '-' + d.saleUserPostName + '-' + d.saleUserName : '';
            }
        }, {
            title: '指派归属',
            field: 'zfStatus',
            readonly: true,
            formatter: (v, d) => {
                return d && d.insideJobCompanyName ? d.insideJobCompanyName + '-' + d.insideJobDepartMentName + '-' + d.insideJobPostName + '-' + d.insideJobName : '';// hidden: !this.isEntry && !this.isCheck// 录入征信结果 审核才显示
            }
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
            required: true,
            field: 'policyDatetime',
            _keys: ['carInfo', 'policyDatetime'],
            type: 'datetime'
        }, {
            title: '保单到期日',
            required: true,
            field: 'policyDueDate',
            _keys: ['carInfo', 'policyDueDate'],
            type: 'datetime'
        }, {
            title: '发票',
            field: 'carInvoice',
            type: 'img',
            required: true,
            formatter(v, d) {
                let url = '';
                d.attachments.forEach(item => {
                    if(item.vname === '车辆发票') {
                        url = item.url;
                    }
                });
                return url;
            }
        }, {
            title: '交强险',
            field: 'carJqx',
            required: true,
            _keys: ['attachments', 'carJqx'],
            type: 'img',
            formatter(v, d) {
                let url = '';
                d.attachments.forEach(item => {
                    if(item.vname === '交强险') {
                        url = item.url;
                    }
                });
                return url;
            }
        }, {
            title: '商业险',
            required: true,
            field: 'carSyx',
            type: 'img',
            formatter(v, d) {
                let url = '';
                d.attachments.forEach(item => {
                    if(item.vname === '商业险') {
                        url = item.url;
                    }
                });
                return url;
            }
        }, {
            title: '绿大本扫描件',
            field: 'greenBigSmj',
            required: true,
            type: 'img',
            formatter(v, d) {
                let url = '';
                d.attachments.forEach(item => {
                    if(item.vname === '绿大本扫描件') {
                        url = item.url;
                    }
                });
                return url;
            }
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632516,
            editCode: 632131
        });
    }
}

export default InsuranceAddEdit;
