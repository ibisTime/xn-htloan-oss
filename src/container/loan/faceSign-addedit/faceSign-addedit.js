import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loan/faceSign-addedit';
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
    state => state.loanFaceSignAddedit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class FaceSignAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entryVisible: false,
            reportVisible: false,
            bankCreditResult: [],
            selectData: {},
            selectKey: ''
        };
        this.code = getQueryString('code', this.props.location.search);
        // 录入银行征信结果
        this.isEntry = !!getQueryString('isEntry', this.props.location.search);
        // 业务员初审
        this.isCheckSalesman = !!getQueryString('isCheckSalesman', this.props.location.search);
        // 准入审查
        this.isCheckFirst = !!getQueryString('isCheckFirst', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.newCar = true;
    }

    // 录入银行征信结果
    setEnteringVisible = (entryVisible, selectKey) => {
        this.setState({entryVisible, selectKey});
        for (let i = 0; i < this.state.bankCreditResult.length; i++) {
            if (this.state.bankCreditResult[i].code === selectKey) {
                this.state.selectData = this.state.bankCreditResult[i];
            }
        }
    };

    creditEntryFun = (data) => {
        let falg = true;
        for (let i = 0; i < this.state.bankCreditResult.length; i++) {
            if (this.state.bankCreditResult[i].code === data.code) {
                this.state.bankCreditResult[i] = data;
                falg = false;
            }
        }
        if (falg) {
            this.state.bankCreditResult.push(data);
        }
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
            title: '银行查询结果',
            field: 'bankResult',
            hidden: true,
            render: (text, record) => {
                return (
                    <span><a href="javascript:;"
                             onClick={() => this.setEnteringVisible(true, record.code)}>录入</a></span>
                );
            },
            fixed: 'right'
        }];

        let creditReportFields = [{
            title: '征信报告',
            field: 'report',
            hidden: true,
            render: (text, record) => {
                return (
                    <span><a href="javascript:;"
                             onClick={() => this.setReportVisible(true, record.code)}>查看</a></span>
                );
            },
            fixed: 'right'
        }];

        let checkCourtResultFields = [{
            title: '法院网查询结果',
            field: 'courtResult',
            hidden: true,
            render: (text, record) => {
                return (
                    <span><a href="javascript:;" onClick={() => {
                        console.log(text, 'r', record);
                    }}>录入</a></span>
                );
            },
            fixed: 'right'
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
            valueName: 'dvalue',
            value: '1',
            required: true,
            onChange: (value) => {
                _this.newCar = value === '1';
            }
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            required: true
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
                    // }, {
                    //     title: '征信报告',
                    //     field: 'report',
                    //     hidden: true,
                    //     render: (text, record) => {
                    //         return (
                    //             <span><a href="javascript:;" onClick={() => {
                    //                 console.log(text, 'r', record);
                    //             }}>查看</a></span>
                    //         );
                    //     }
                    // },
                    // {
                    //     title: '历史贷款',
                    //     field: 'history',
                    //     hidden: true,
                    //     render: (text, record) => {
                    //         return (
                    //             <span><a href="javascript:;" onClick={() => {
                    //                 console.log(text, 'r', record);
                    //             }}>查看</a></span>
                    //         );
                    //     },
                    //     fixed: 'right'
                    // }
                }]
            }
        }, {
            title: '附件',
            field: 'accessory',
            type: 'img',
            single: true,
            readonly: !this.isCheckSalesman,
            hidden: ((!(this.isCheckySalesman || !this.isEntry || this.isCheckFirst)) || (!this.code))
        }, {
            title: '审核说明',
            field: 'approveNote',
            readonly: !this.isCheckFirst,
            hidden: !this.isCheckFirst
        }];

        // 业务员初审
        if (this.isCheckSalesman) {
            fields[5].options.fields = fields[5].options.fields.concat(creditReportFields);

            buttons = [{
                title: '通过并发送一审',
                check: true,
                handler: (params) => {
                    params.approveResult = '1';
                    params.operator = getUserId();
                    this.props.doFetching();
                    fetch(632113, params).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '退回重新征信',
                check: true,
                handler: (params) => {
                    params.approveResult = '1';
                    params.operator = getUserId();
                    this.props.doFetching();
                    fetch(632113, params).then(() => {
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
        console.log(!(this.isCheckySalesman || !this.isEntry || this.isCheckFirst));

        // 银行录入结果
        if (this.isEntry) {
            fields[5].options.fields = fields[5].options.fields.concat(entryResultFields);

            buttons = [{
                title: '录入',
                check: true,
                handler: (params) => {
                    params.creditCode = this.code;
                    params.bankCreditResultList = this.state.bankCreditResult;
                    params.operator = getUserId();
                    this.props.doFetching();
                    fetch(632111, params).then(() => {
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

        // 准入审查
        if (this.isCheckFirst) {
            fields[5].options.fields = fields[5].options.fields.concat(creditReportFields);
            fields[5].options.fields = fields[5].options.fields.concat(checkCourtResultFields);

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
        }

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

export default FaceSignAddedit;
