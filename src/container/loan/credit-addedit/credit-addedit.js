import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loan/credit-addedit';
import {
    getQueryString,
    showWarnMsg,
    showSucMsg,
    getUserId
} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import {COMPANY_CODE} from 'common/js/config';
import LoanCreditEnteringEdit from 'component/loanCreditEntering-edit/loanCreditEntering-edit';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.loanCreditAddedit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class CreditAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entryVisible: false,
            creditResult: [],
            selectData: {},
            selectKey: ''
        };
        this.code = getQueryString('code', this.props.location.search);
        // 发起征信
        this.isAddedit = !!getQueryString('isAddedit', this.props.location.search);
        // 录入征信结果
        this.isEntry = !!getQueryString('isEntry', this.props.location.search);
        // 业务员初审
        this.isCheck = !!getQueryString('isCheck', this.props.location.search);
        // 准入审查
        this.isCheckFirst = !!getQueryString('isCheckFirst', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.newCar = true;
        this.creditUserListIndex = 6;
        this.buttons = [];

        this.concatFalg = false;
    }

    // 录入银行征信结果
    setEnteringVisible = (entryVisible, selectKey) => {
        if (entryVisible) {
            let creditResult = this.state.creditResult;
            for (let i = 0; i < this.state.creditResult.length; i++) {
                if (creditResult[i].creditUserCode === selectKey) {
                    let selectData = creditResult[i];
                    this.setState({
                        selectData
                    });
                    break;
                }
            }
        } else {
            this.setState({
                selectData: {}
            });
        }
        this.setState({entryVisible, selectKey});
    };

    creditEntryFun = (data) => {
        let creditResult = this.state.creditResult;
        for (let i = 0; i < this.state.creditResult.length; i++) {
            if (creditResult[i].creditUserCode === data.creditUserCode) {
                creditResult[i] = data;
                this.setState({
                    creditResult
                });
                return;
            }
        }
        creditResult.push(data);
        this.setState({
            creditResult
        });
    };

    render() {
        let o2mFields = [{
            title: '姓名',
            field: 'userName',
            nowrap: true,
            required: true,
            width: 80
        }, {
            title: '与借款人关系',
            field: 'relation',
            type: 'select',
            key: 'credit_user_relation',
            required: true
        }, {
            title: '贷款角色',
            field: 'loanRole',
            type: 'select',
            key: 'credit_user_loan_role',
            required: true
        }, {
            title: '手机号',
            field: 'mobile',
            required: true,
            render: (v) => {
                let val = (v && v.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')) || '';
                return <span style={{whiteSpace: 'nowrap'}}>{val}</span>;
            }
        }, {
            title: '身份证号',
            field: 'idNo',
            idCard: true,
            required: true,
            render: (v) => {
                let val = (v && v.replace(/^(\d{6}).+(\d{4})$/, '$1****$2')) || '';
                return <span style={{whiteSpace: 'nowrap'}}>{val}</span>;
            }
        }, {
            title: '身份证正面',
            field: 'idNoFront',
            type: 'img',
            single: true,
            required: true
        }, {
            title: '身份证反面',
            field: 'idNoReverse',
            type: 'img',
            single: true,
            required: true
        }, {
            title: '征信查询授权书',
            field: 'authPdf',
            type: 'img',
            single: true,
            required: true
        }, {
            title: '面签照片',
            field: 'interviewPic',
            type: 'img',
            single: true,
            required: true
        }];
        if (!this.isAddedit) {
            o2mFields = o2mFields.concat([{
                title: '征信报告',
                field: 'bankCreditResultPdf',
                type: 'img',
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view
            }, {
                title: '征信结果说明',
                field: 'bankCreditResultRemark',
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view
            }]);
        }

        let fields = [{
            title: '银行',
            field: 'loanBankCode',
            type: 'select',
            listCode: 632037,
            keyName: 'code',
            valueName: '{{bankName.DATA}}{{subbranch.DATA}}',
            required: true
        }, {
            title: '业务种类',
            field: 'bizType',
            type: 'select',
            key: 'budget_orde_biz_typer',
            value: this.code ? '' : '0',
            required: true,
            onChange: (value) => {
                this.newCar = value === '0';
            }
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            required: true
        }, {
            title: '二手车评估报告',
            field: 'secondCarReport',
            type: 'file',
            required: true,
            hidden: this.newCar
        }, {
            title: '行驶证正面',
            field: 'xszFront',
            type: 'img',
            required: true,
            single: true,
            hidden: this.newCar
        }, {
            title: '行驶证反面',
            field: 'xszReverse',
            type: 'img',
            required: true,
            single: true,
            hidden: this.newCar
        }, {
            title: '征信列表',
            field: 'creditUserList',
            type: 'o2m',
            options: {
                add: true,
                edit: true,
                delete: true,
                detail: !(this.isEntry || !this.view),
                check: this.isEntry,
                checkName: '录入',
                scroll: {x: 1300},
                fields: o2mFields
            }
        }, {
            title: '审核说明',
            field: 'approveNote',
            readonly: !this.isCheck,
            hidden: !this.isCheck
        }];

        // 业务员初审
        if (this.isCheck) {
            this.buttons = [{
                title: '通过',
                check: true,
                handler: (params) => {
                    let data = {};
                    data.code = this.code;
                    data.approveNote = params.approveNote;
                    data.approveResult = '1';
                    data.operator = getUserId();
                    this.props.doFetching();
                    fetch(632113, data).then(() => {
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
                    data.approveNote = params.approveNote;
                    data.approveResult = '0';
                    data.operator = getUserId();
                    this.props.doFetching();
                    fetch(632113, data).then(() => {
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

        // 录入征信结果
        if (this.isEntry) {
            this.buttons = [{
                title: '录入',
                check: true,
                handler: (params) => {
                    let data = {};
                    data.creditCode = this.code;
                    params.creditUserList.forEach((v, i) => {
                        v.creditUserCode = v.code;
                    });
                    data.creditResult = params.creditUserList;
                    data.operator = getUserId();
                    this.props.doFetching();
                    fetch(632111, data).then(() => {
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

        if(this.isAddedit) {
            this.buttons = [{
                title: '保存',
                check: true,
                handler: (params) => {
                    params.creditCode = this.code;
                    params.buttonCode = '0';
                    params.operator = getUserId();
                    this.props.doFetching();
                    let bizCode = this.code ? 632112 : 632110;
                    fetch(bizCode, params).then((data) => {
                        if (!this.code) {
                            this.code = data.code;
                        }
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '发送',
                check: true,
                handler: (params) => {
                    params.creditCode = this.code;
                    params.buttonCode = '1';
                    params.operator = getUserId();
                    this.props.doFetching();
                    let bizCode = this.code ? 632112 : 632110;
                    fetch(bizCode, params).then(() => {
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
        return (
            <div>
                {
                    this.props.buildDetail({
                        fields,
                        code: this.code,
                        view: this.view,
                        detailCode: 632117,
                        buttons: this.buttons,
                        beforeSubmit: (param) => {
                            if (!param.creditUserList) {
                                showWarnMsg('至少新增一条征信列表');
                                return false;
                            } else {
                                param.operator = getUserId();
                                return param;
                            }
                        }
                    })
                }
            </div>
        );
    }
}

export default CreditAddedit;
