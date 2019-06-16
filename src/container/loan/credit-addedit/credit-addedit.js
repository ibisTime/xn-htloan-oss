import React from 'react';
import {
    initStates, doFetching, cancelFetching, setSelectData, setPageData,
    restore
} from '@redux/loan/credit-addedit';
// import { getQueryString, showWarnMsg, showSucMsg, getUserId, moneyFormat } from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import fetch from 'common/js/fetch';
// import {Card, Form, Row, Spin, Tabs} from "antd";
import {Form, Tabs, Row, Col, Spin, Button, Table, Card, Icon, Tooltip} from 'antd';
import {
    getQueryString, showWarnMsg, showSucMsg, isUndefined, getUserId, getRules,
    getRealValue, moneyFormat, moneyParse, getUserName, dateTimeFormat
} from 'common/js/util';

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
            selectKey: '',
            bizType: '',
            loanBankCode: ''
        };
        this.code = getQueryString('code', this.props.location.search);
        // 发起征信
        this.isAddedit = !!getQueryString('isAddedit', this.props.location.search);
        this.bizType = getQueryString('bizType', this.props.location.search);
        // 录入征信结果
        this.isEntry = !!getQueryString('isEntry', this.props.location.search);
        // 信贷专员初审
        this.isCheck = !!getQueryString('isCheck', this.props.location.search);
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
componentDidMount() {
    if (this.bizType === '1') {
        this.setState({
            secondCarReport: true,
            xszFront: true,
            xszReverse: true,
            dkey: this.bizType
        });
    };
}

    render() {
        // 征信列表字段
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
            required: true,
            onChange: (v, data, props) => {
                let creditUserList = this.props.pageData.creditUserList;
                let loanRoleList = {};
                props.selectData.loanRole.map(l => {
                    loanRoleList[l.dkey] = l.dvalue;
                });
                // creditUserList && creditUserList.forEach(d => {
                //     if (d.loanRole === v) {
                //         setTimeout(() => {
                //             props.form.setFieldsValue({loanRole: ''});
                //         }, 100);
                //         showWarnMsg(loanRoleList[v] + '记录已添加');
                //         return false;
                //     }
                // });
            }
        }, {
            title: '手机号',
            field: 'mobile',
            mobile: true,
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
            field: 'idFront',
            type: 'img',
            single: true,
            required: true,
            hidden: this.isEntry,
            noVisible: true // 隐藏列表字段 不隐藏弹出框字段
        }, {
            title: '身份证反面',
            field: 'idReverse',
            type: 'img',
            single: true,
            required: true,
            hidden: this.isEntry,
            noVisible: true
        }, {
            title: '征信查询授权书',
            field: 'authPdf',
            type: 'img',
            required: true,
            hidden: this.isEntry,
            noVisible: true
        }, {
            title: '手持授权书照片',
            field: 'interviewPic',
            type: 'img',
            required: true,
            hidden: this.isEntry,
            noVisible: true
        }];
        if (!this.isAddedit) { // 修改征信查询中征信列表中才显示的字段
            o2mFields = o2mFields.concat([
                {
                    title: '银行征信结果(是否通过)',
                    field: 'bankResult',
                    type: 'select',
                    readonly: !this.isEntry,
                    data: [{
                        key: '0',
                        value: '不通过'
                    }, {
                        key: '1',
                        value: '通过'
                    }],
                    keyName: 'key',
                    valueName: 'value',
                    hidden: !this.view,
                    required: true,
                    noVisible: true
                }, {
                    title: '银行卡使用占比',
                    field: 'bankCreditReport',
                    required: true,
                    number: true,
                    readonly: !this.isEntry,
                    hidden: !this.view,
                    noVisible: true
                }, {
                    title: '银行征信报告',
                    field: 'bankCreditReport',
                    type: 'img',
                    single: true, // 单张
                    required: true,
                    readonly: !this.isEntry,
                    hidden: !this.view,
                    noVisible: true
                }, {
                    title: '大数据征信报告(多张)',
                    field: 'dataCreditReport',
                    type: 'img',
                    readonly: !this.isEntry,
                    hidden: !this.view,
                    noVisible: true
                }, {
                    title: '征信报告说明',
                    field: 'creditNote',
                    readonly: !this.isEntry,
                    type: 'textarea',
                    normalArea: true,
                    hidden: !this.view,
                    noVisible: true
                }]);
        }

        // 详情回显列表字段
        let fields = [
            {
                title: '业务编号',
                field: 'code',
                // formatter: (v, d) => {
                //     return d ? d.cdbiz.code : '';
                // },
                formatter: (v, d) => {
                    return <div>
                        {d.code}<a href="javascript:void(0);" style={{marginLeft: 20}} onClick={() => {
                        window.location.href = '/ywcx/ywcx/addedit?v=1&code' + '=' + d.code;
                    }}>查看详情</a>
                    </div>;
                },
                hidden: !this.isEntry && !this.isCheck// 录入征信结果 审核才显示
            }, {
                title: '客户姓名',
                field: 'userName',
                formatter: (v, d) => {
                    return d ? d.creditUser.userName : '';
                },
                hidden: !this.isEntry && !this.isCheck// 录入征信结果 审核才显示
            },
            {
                title: '贷款银行',
                field: 'loanBankName',
                type: 'select',
                listCode: 632037,
                keyName: 'code',
                valueName: '{{bankName.DATA}}{{subbranch.DATA}}',
                required: true,
                onChange: (v, data, props) => {
                    console.log(data);
                    props.setPageData({
                        ...this.props.pageData,
                        loanBankCode: data.code
                    });
                }
            },
            {
                title: '贷款金额',
                field: 'creditLoanAmount',
                amount: true,
                min: '1',
                required: true
            }, {
                title: '业务种类',
                field: 'bizType',
                type: 'select',
                key: 'budget_orde_biz_typer',
                required: true,
                onChange: (v) => {
                    if(v) {
                        this.setState({dkey: v});
                        if (v === '1') {
                            this.setState({
                                secondCarReport: true, xszFront: true, xszReverse: true
                            });
                        } else if (v === '0') {
                            this.setState({secondCarReport: false, xszFront: false, xszReverse: false});
                        }
                    }
                }
            }, {
                title: '二手车评估报告',
                field: 'secondCarReport', // secondCarReport
                type: 'img',
                hidden: this.isEntry || this.isCheck || this.state.dkey !== '1', // 新车 录入征信结果 审核时隐藏
                required: this.state.dkey !== '0', // 二手车必填
                formatter(v, d) {
                    let url = '';
                    d.attachments.forEach(item => {
                        if (item.vname === '二手车评估报告') {
                            url = item.url;
                        }
                    });
                    return url;
                }
            }, {
                title: '行驶证正面',
                field: 'xszFront',
                type: 'img',
                hidden: this.isEntry || this.isCheck || this.state.dkey !== '1', // 新车隐藏
                required: this.state.dkey !== '0',
                formatter(v, d) {
                    let url = '';
                    d.attachments.forEach(item => {
                        if (item.vname === '行驶证正面') {
                            url = item.url;
                        }
                    });
                    return url;
                }
            }, {
                title: '行驶证反面',
                field: 'xszReverse',
                type: 'img',
                hidden: this.isEntry || this.isCheck || this.state.dkey !== '1', // 新车隐藏
                required: this.state.dkey !== '0',
                formatter(v, d) {
                    let url = '';
                    d.attachments.forEach(item => {
                        if (item.vname === '行驶证反面') {
                            url = item.url;
                        }
                    });
                    return url;
                }
            }, {
                title: '业务归属',
                field: 'ywyUser',
                formatter: (v, d) => {
                    return d && d.saleUserCompanyName ? d.saleUserCompanyName + '-' + d.saleUserDepartMentName + '-' + d.saleUserPostName + '-' + d.saleUserName : '';
                },
                hidden: !this.isEntry && !this.isCheck
            }, {
                title: '指派归属',
                field: 'zfStatus',
                formatter: (v, d) => {
                    return d && d.insideJobCompanyName ? d.insideJobCompanyName + '-' + d.insideJobDepartMentName + '-' + d.insideJobPostName + '-' + d.insideJobName : '';// hidden: !this.isEntry && !this.isCheck// 录入征信结果 审核才显示
                },
                hidden: !this.isEntry && !this.isCheck// 录入征信结果 审核才显示
            }, {
                title: '当前状态',
                field: 'status',
                key: 'cdbiz_status',
                type: 'select',
                formatter: (v, d) => {
                    return d ? d.cdbiz.status : '';
                },
                hidden: !this.isEntry && !this.isCheck// 录入征信结果 审核才显示
            }, {
                title: '审核说明',
                field: 'approveNote',
                readonly: !this.isCheck,
                hidden: !this.isCheck
            },
            {
                title: '征信列表',
                field: 'creditUserList',
                type: 'o2m',
                readonly: false,
                hidden: this.isCheck,
                options: {
                    add: this.isAddedit, // 新增按钮
                    edit: this.isAddedit,
                    delete: this.isAddedit,
                    detail: !(this.isEntry || !this.view),
                    check: this.isEntry,
                    normalBtn: this.isCheck,
                    normalBtnName: '角色互换',
                    normalHandler: (keys) => {
                        let list = this.props.pageData.creditUserList.slice();
                        if (!keys.length) {
                            showWarnMsg('请选择记录');
                        } else if (keys.length !== 2) {
                            showWarnMsg('请选择两条记录');
                        } else {
                            let idx0 = list.findIndex(l => l.code === keys[0]);
                            let item0 = list[idx0];
                            let idx1 = list.findIndex(l => l.code === keys[1]);
                            let item1 = list[idx1];
                            if (item0.loanRole !== '1' && item1.loanRole !== '1') {
                                showWarnMsg('其中一条必须选择申请人');
                                return;
                            }
                            list.splice(idx0, 1, {
                                ...item0,
                                loanRole: item1.loanRole,
                                relation: item1.relation
                            });
                            list.splice(idx1, 1, {
                                ...item1,
                                loanRole: item0.loanRole,
                                relation: item0.relation
                            });
                            this.props.setPageData({
                                ...this.props.pageData,
                                creditUserList: list
                            });
                        }
                    },
                    checkName: '录入',
                    fields: o2mFields
                }
            }
        ];
        // 流转日志 if (this.code) {
        //     fields.push({
        //         title: '流转日志',
        //         field: 'list',
        //         type: 'o2m',
        //         hidden: this.isCheck,
        //         listCode: 630176,
        //         params: { refOrder: this.code },
        //         options: {
        //             rowKey: 'id',
        //             noSelect: true,
        //             fields: [{
        //                 title: '操作人',
        //                 field: 'operatorName'
        //             }, {
        //                 title: '开始时间',
        //                 field: 'startDatetime',
        //                 type: 'datetime'
        //             }, {
        //                 title: '结束时间',
        //                 field: 'endDatetime',
        //                 type: 'datetime'
        //             }, {
        //                 title: '花费时长',
        //                 field: 'speedTime'
        //             }, {
        //                 title: '审核意见',
        //                 field: 'dealNote'
        //             }, {
        //                 title: '当前节点',
        //                 field: 'dealNode',
        //                 type: 'select',
        //                 listCode: 630147,
        //                 keyName: 'code',
        //                 valueName: 'name'
        //             }]
        //         }
        //     });
        // }
        // 风控专员审核
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
                    if (!params.creditUserList || params.creditUserList.length < 1) {
                        showWarnMsg('至少录入一条征信人员信息！');
                        return;
                    }
                    data.creditUserList = this.props.pageData.creditUserList;
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
            this.buttons = [
                {
                    title: '录入',
                    check: true,
                    handler: (params) => {
                        console.log(params);
                        let data = {};
                        let creditList = [];
                        data.bizCode = this.code;
                        for (let i = 0; i < params.creditUserList.length; i++) {
                            params.creditUserList[i].creditUserCode = params.creditUserList[i].code;// 征信用户编号
                            params.creditUserList[i].bankCreditReport = params.creditUserList[i].bankCreditReport; // 银行征信报告
                            params.creditUserList[i].bankResult = params.creditUserList[i].bankResult; // 银行征信结果
                            params.creditUserList[i].creditNote = params.creditUserList[i].creditNote; // 征信概况说明
                            params.creditUserList[i].dataCreditReport = params.creditUserList[i].dataCreditReport;// 大数据征信报告，多张||隔开
                            creditList.push({
                                creditUserCode: params.creditUserList[i].creditUserCode,
                                bankCreditReport: params.creditUserList[i].bankCreditReport, // 银行征信报告
                                creditNote: params.creditUserList[i].creditNote,
                                bankResult: params.creditUserList[i].bankResult,
                                dataCreditReport: params.creditUserList[i].dataCreditReport
                            });
                            if (!params.creditUserList[i].bankCreditReport) {
                                showWarnMsg('请录入' + params.creditUserList[i].userName + '的银行征信结果！');
                                return;
                            }
                        }
                        data.creditList = creditList;
                        data.operator = getUserId();
                        // data.dealType = '1';
                        // console.log(data);
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

        // 新增/修改征信信息
        if (this.isAddedit) {
            this.buttons = [
                {
                    title: '保存',
                    check: true,
                    handler: (params) => {
                        let data = {};
                        let item = [];
                        data.bizType = params.bizType; // 业务类型
                        data.bizCode = this.code;// 征信单编号
                        data.buttonCode = '0';
                        data.operator = getUserId(); // 操作员
                        data.creditLoanAmount = params.creditLoanAmount; // 贷款金额
                        data.loanBankCode = this.props.pageData.loanBankCode; // 贷款银行
                        data.secondCarReport = params.secondCarReport; // 二手车评估报告
                        data.xszFront = params.xszFront; // 身份证正面
                        data.xszReverse = params.xszReverse;// 身份证反面
                        if (!params.creditUserList || params.creditUserList.length < 1) {
                            showWarnMsg('至少录入一条征信信息');
                            return;
                        }
                        let flag = false;
                        for (let i = 0; i < params.creditUserList.length; i++) {
                            params.creditUserList[i].creditUserCode = params.creditUserList[i].code;
                            item.push({
                                authPdf: params.creditUserList[i].authPdf,
                                creditUserCode: params.creditUserList[i].creditUserCode,
                                idNo: params.creditUserList[i].idNo,
                                idFront: params.creditUserList[i].idFront,
                                idReverse: params.creditUserList[i].idReverse,
                                interviewPic: params.creditUserList[i].interviewPic,
                                loanRole: params.creditUserList[i].loanRole,
                                mobile: params.creditUserList[i].mobile,
                                relation: params.creditUserList[i].relation,
                                userName: params.creditUserList[i].userName
                            });
                            if (params.creditUserList[i].relation === '1' && params.creditUserList[i].loanRole === '1') {
                                flag = true;
                            }
                        }
                        data.creditUserList = item;
                        if (!flag) {
                            showWarnMsg('请录入申请人的征信信息！');
                            return;
                        }
                        this.props.doFetching();
                        let bizCode = this.code ? 632112 : 632110;
                        fetch(bizCode, data).then((data) => {
                            showSucMsg('操作成功');
                            this.props.cancelFetching();
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
                    }
                }, {
                    title: '提交',
                    check: true,
                    handler: (params) => {
                        console.log(params);
                        let data = {};
                        let item = [];
                        data.bizType = params.bizType; // 业务类型
                        data.bizCode = this.code;// 征信单编号
                        data.buttonCode = '1';
                        data.operator = getUserId(); // 操作员
                        data.creditLoanAmount = params.creditLoanAmount; // 贷款金额
                        data.loanBankCode = this.props.pageData.loanBankCode; // 贷款银行
                        data.secondCarReport = params.secondCarReport; // 二手车评估报告
                        data.xszFront = params.xszFront; // 身份证正面
                        data.xszReverse = params.xszReverse;// 身份证反面
                        if (!params.creditUserList || params.creditUserList.length < 1) {
                            showWarnMsg('至少录入一条征信信息');
                            return;
                        }
                        let flag = false;
                        for (let i = 0; i < params.creditUserList.length; i++) {
                            params.creditUserList[i].creditUserCode = params.creditUserList[i].code;
                            item.push({
                                authPdf: params.creditUserList[i].authPdf,
                                creditUserCode: params.creditUserList[i].creditUserCode,
                                idNo: params.creditUserList[i].idNo,
                                idFront: params.creditUserList[i].idFront,
                                idReverse: params.creditUserList[i].idReverse,
                                interviewPic: params.creditUserList[i].interviewPic,
                                loanRole: params.creditUserList[i].loanRole,
                                mobile: params.creditUserList[i].mobile,
                                relation: params.creditUserList[i].relation,
                                userName: params.creditUserList[i].userName
                            });
                            if (params.creditUserList[i].relation === '1' && params.creditUserList[i].loanRole === '1') {
                                flag = true;
                            }
                        }
                        data.creditUserList = item;
                        if (!flag) {
                            showWarnMsg('请录入申请人的征信信息！');
                            return;
                        }
                        this.props.doFetching();
                        let bizCode = this.code ? 632112 : 632110;
                        fetch(bizCode, data).then((data) => {
                            console.log('提交接口返回数据：');
                            console.log(data);
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
                        view: this.view, //  v=1代表详情 为true时: 内容全部显示不可修改,并且页面没有[保存]按钮
                        detailCode: 632516, // 征信详情查询接口
                        buttons: this.buttons, // 根据判断将所有按钮添加到页面
                        beforeSubmit: (param) => { // 提交前传参
                            console.log('beforeSubmit中的参数param：');
                            console.log(param);
                            if (!param.creditUserList) {
                                showWarnMsg('至少新增一条征信列表');
                                return false;
                            } else {
                                param.operator = getUserId();
                                return param;
                            }
                        },
                        afterDetail: () => {
                            let data = this.props.pageData;
                            data.creditUserList.forEach(user => {
                                // user 担保人、申请人、共还人
                                if (user.loanRole === '1') {
                                    data.attachments.forEach(item => {
                                        if (item.vname === '申请人身份证正面') {
                                            user.idFront = item.url;
                                        } else if (item.vname === '申请人身份证反面') {
                                            user.idReverse = item.url;
                                        } else if (item.vname === '申请人征信查询授权书') {
                                            user.authPdf = item.url;
                                        } else if (item.vname === '申请人面签照片') {
                                            user.interviewPic = item.url;
                                        }
                                    });
                                } else if (user.loanRole === '3') {
                                    data.attachments.forEach(item => {
                                        if (item.vname === '担保人身份证正面') {
                                            user.idFront = item.url;
                                        } else if (item.vname === '担保人身份证反面') {
                                            user.idReverse = item.url;
                                        } else if (item.vname === '担保人征信查询授权书') {
                                            user.authPdf = item.url;
                                        } else if (item.vname === '担保人面签照片') {
                                            user.interviewPic = item.url;
                                        }
                                    });
                                } else if (user.loanRole === '2') {
                                    data.attachments.forEach(item => {
                                        if (item.vname === '共还人身份证正面') {
                                            user.idFront = item.url;
                                        } else if (item.vname === '共还人身份证反面') {
                                            user.idReverse = item.url;
                                        } else if (item.vname === '共还人征信查询授权书') {
                                            user.authPdf = item.url;
                                        } else if (item.vname === '共还人面签照片') {
                                            user.interviewPic = item.url;
                                        }
                                    });
                                }
                            });
                            this.props.setPageData(data);
                        }
                    })
                }
            </div>
        );
    }
}

export default CreditAddedit;
