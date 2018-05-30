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
import LoanCreditReport from 'component/loanCredit-report/loanCredit-report';
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
            reportVisible: false,
            creditResult: [],
            selectData: {},
            selectKey: ''
        };
        this.code = getQueryString('code', this.props.location.search);
        // 录入征信结果
        this.isEntry = !!getQueryString('isEntry', this.props.location.search);
        // 业务员初审
        this.isCheck = !!getQueryString('isCheck', this.props.location.search);
        // 准入审查
        this.isCheckFirst = !!getQueryString('isCheckFirst', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.newCar = true;
        this.creditUserListIndex = 7;
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

    // 征信报告
    setReportVisible = (reportVisible, selectKey) => {
        if (reportVisible) {
            this.props.doFetching();
            fetch(632118, {code: selectKey}).then((data) => {
                this.props.cancelFetching();
                this.state.selectData = data;
                this.setState({reportVisible, selectKey});
            }).catch(this.props.cancelFetching);
        } else {
            this.setState({reportVisible, selectKey});
        }
    };

    render() {
        let _this = this;
        let buttons = [];

        let entryResultFields = [{
            title: '银行征信结果',
            field: 'creditResult',
            hidden: true,
            render: (text, record) => {
                return (
                    <span><a href="javascript:;"
                             onClick={() => this.setEnteringVisible(true, record.code)}>录入</a></span>
                );
            },
            fixed: 'right'
        }];

        let creditReportField = [{
            title: '征信报告',
            field: 'bankCreditResultPdf',
            type: 'img'
        }];

        let fields = [{
            title: '银行',
            field: 'loanBankCode',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: 'bankName',
            searchName: 'bankName',
            required: true
        }, {
            title: '业务种类',
            field: 'bizType',
            type: 'select',
            data: [{
                dkey: '1',
                dvalue: '新车'
            }, {
                dkey: '2',
                dvalue: '二手车'
            }],
            keyName: 'dkey',
            valueName: 'dvalue',
            value: '1',
            required: true,
            onChange: (value) => {
                _this.newCar = value === '1';
            }
        }, {
            title: '保存/发送',
            field: 'buttonCode',
            value: '1',
            hidden: true
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
                scroll: {x: 1300},
                fields: [{
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
                }]
            }
        }, {
            title: '审核说明',
            field: 'approveNote',
            readonly: !this.isCheck,
            hidden: !this.isCheck
        }];

        // 业务员初审
        if (this.isCheck) {
            fields[this.creditUserListIndex].options.fields = fields[this.creditUserListIndex].options.fields.concat(creditReportField);

            buttons = [{
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
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        }

        // 录入征信结果
        if (this.isEntry) {
            fields[this.creditUserListIndex].options.fields = fields[this.creditUserListIndex].options.fields.concat(entryResultFields);

            buttons = [{
                title: '录入',
                check: true,
                handler: (params) => {
                    let data = {};
                    data.creditCode = this.code;
                    data.creditResult = this.state.creditResult;
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
        console.log(this.state.selectData);
        return (
            <div>
                {
                    this.props.buildDetail({
                        fields,
                        code: this.code,
                        view: this.view,
                        detailCode: 632117,
                        addCode: 632110,
                        editCode: 632110,
                        buttons: buttons,
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
                {
                    this.isEntry ? (<LoanCreditEnteringEdit code={this.state.selectKey}
                                                            creditEntryFun={this.creditEntryFun}
                                                            entryVisible={this.state.entryVisible}
                                                            selectData={this.state.selectData}
                                                            setModalVisible={this.setEnteringVisible}/>) : ''
                }
                {
                    (this.view) ? (<LoanCreditReport code={this.state.selectKey}
                                                     reportVisible={this.state.reportVisible}
                                                     selectData={this.state.selectData}
                                                     setReportModalVisible={this.setReportVisible}/>) : ''
                }

            </div>
        );
    }
}

export default CreditAddedit;
