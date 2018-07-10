import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loan/advMoney-addedit';
import {
    getQueryString,
    showWarnMsg,
    showSucMsg,
    getUserId
} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import LoanCreditEnteringEdit from 'component/loanCreditEntering-edit/loanCreditEntering-edit';
import LoanCreditReport from 'component/loanCredit-report/loanCredit-report';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.loanAdvMoneyAddedit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class AdvMoneyAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        // 审核
        this.isCheck = !!getQueryString('isCheck', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.newCar = true;
    }

    render() {
        let _this = this;
        let buttons = [];

        let fields = [{
            title: '业务公司',
            field: 'companyName',
            readonly: true
        }, {
            title: '团队',
            field: 'teamName',
            readonly: true
        }, {
            title: '信贷专员',
            field: 'saleUserName',
            readonly: true
        }, {
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
            title: '垫资日期',
            field: 'advanceFundDatetime',
            type: 'date',
            required: true,
            readonly: (this.isCheck || this.view) ? 'true' : false
        }, {
            title: '垫资金额',
            field: 'advanceFundAmount',
            amount: true,
            required: true,
            readonly: (this.isCheck || this.view) ? 'true' : false
        }, {
            title: '水单',
            field: 'billPdf',
            type: 'img',
            required: true,
            readonly: (this.isCheck || this.view) ? 'true' : false
        }, {
            title: '资金划转授权书 ',
            field: 'advanceFundAmountPdf',
            type: 'img',
            readonly: true
        }, {
            title: '其他资料',
            field: 'interviewOtherPdf',
            type: 'file',
            readonly: true
        }];
        // 准入审查
        if (this.isCheck) {
            buttons = [{
                title: '通过',
                check: true,
                handler: (params) => {
                    params.approveResult = '1';
                    params.operator = getUserId();
                    this.props.doFetching();
                    fetch(632114, params).then(() => {
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
                    params.approveResult = '0';
                    params.operator = getUserId();
                    this.props.doFetching();
                    fetch(632114, params).then(() => {
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
            detailCode: 632146,
            addCode: 632125,
            editCode: 632125,
            buttons: buttons,
            beforeSubmit: (params) => {
                if (!params.billPdf) {
                    showWarnMsg('请上传水单');
                    return false;
                }
                delete params.loanAmount;
                params.operator = getUserId();
                return params;
            }
        });
    }
}

export default AdvMoneyAddedit;
