import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/insurance-enter';
import { getQueryString, getUserId, isExpressConfirm, showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';
@DetailWrapper(
    state => state.bizInsuranceEnter, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class bizInsuranceEnter extends React.Component {
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
            field: 'status',
            key: 'cdbiz_status',
            type: 'select',
            readonly: true
        }, {
            title: '保单日期',
            field: 'policyDatetime',
            type: 'date',
            readonly: true
        }, {
            title: '保单到期日',
            field: 'policyDueDate',
            type: 'date',
            readonly: true
        }, {
            title: '落户日期',
            field: 'carSettleDatetime',
            type: 'date',
            readonly: true
        }, {
            title: '发票',
            field: 'carInvoice',
            type: 'img',
            readonly: true
        }, {
            title: '交强险',
            field: 'carJqx',
            type: 'img',
            readonly: true
        }, {
            title: '商业险',
            field: 'carSyx',
            type: 'img',
            readonly: true
        }, {
            title: '其他资料',
            field: 'carSettleOtherPdf',
            type: 'file',
            readonly: true
        }, {
            title: '抵押日期',
            field: 'pledgeDatetime',
            type: 'date',
            readonly: true
        }, {
            title: '绿大本扫描件',
            field: 'greenBigSmj',
            type: 'img',
            readonly: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632117,
            buttons: [{
                title: '通过',
                handler: (param) => {
                    param.operator = getUserId();
                    param.approveResult = '1';
                    this.props.doFetching();
                    fetch(632501, param).then(() => {
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
                    param.operator = getUserId();
                    param.approveResult = '0';
                    this.props.doFetching();
                    fetch(632501, param).then(() => {
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
            }]
        });
    }
}

export default bizInsuranceEnter;
