import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loan/admittance-check';
import {
    getQueryString,
    showWarnMsg,
    showSucMsg,
    getUserId
} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import {COMPANY_CODE} from 'common/js/config';
import LoanCreditEnteringEdit from 'component/loanCreditEntering-edit/loanCreditEntering-edit';
import LoanCreditReport from 'component/loanCredit-report/loanCredit-report';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.loanAdmittanceCheck,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class AdmittanceCheck extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        // 风控专员审核
        this.isCheckCommissioner = !!getQueryString('isCheckCommissioner', this.props.location.search);
        // 风控主管审核
        this.isCheckDirector = !!getQueryString('isCheckDirector', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.newCar = true;
    }

    render() {
        let _this = this;
        let buttons = [];

        let fields = [{

            title: '业务公司',
            field: 'gs'
        }, {
            title: '汽车经销商',
            field: 'jxs'
        }, {
            title: '客户姓名',
            field: 'userName',
            render: (e, t) => {
                return (t.creditUser ? t.creditUser.userName : '-');
            }
        }, {
            title: '手机号',
            field: 'mobile',
            render: (e, t) => {
                return (t.creditUser ? t.creditUser.mobile : '-');
            }
        }, {
            title: '贷款银行',
            field: 'loanBankCode',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: 'bankName'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '贷款期数',
            field: 'loanNum'
        }, {
            title: '购车途径',
            field: 'shopWay',
            type: 'select',
            data: [{
                dkey: '1',
                dvalue: '新车'
            }, {
                dkey: '2',
                dvalue: '二手车'
            }],
            keyName: 'dkey',
            valueName: 'dvalue'
        }, {
            title: '是否垫资',
            field: 'isdz',
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
            field: 'salesman'
        }, {
            title: '申请日期',
            field: 'applyDatetime',
            type: 'datetime'
        }, {
            title: '状态',
            field: 'status'
        }, {
            title: '备注',
            field: 'appor'
        }];

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
            title: '返回',
            handler: (param) => {
                this.props.history.go(-1);
            }
        }];

        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632117,
            addCode: 632110,
            editCode: 632110,
            buttons: buttons
        });
    }
}

export default AdmittanceCheck;
