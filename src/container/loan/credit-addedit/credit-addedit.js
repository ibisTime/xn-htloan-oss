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
        // 信贷专员初审
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
            required: true,
            onChange: (v, data, props) => {
                let creditUserList = this.props.pageData.creditUserList;
                let loanRoleList = {};
                props.selectData.loanRole.map(l => {
                    loanRoleList[l.dkey] = l.dvalue;
                });
                creditUserList && creditUserList.forEach(d => {
                   if (d.loanRole === v) {
                       setTimeout(() => {
                           props.form.setFieldsValue({loanRole: ''});
                       }, 100);
                       showWarnMsg(loanRoleList[v] + '记录已添加');
                       return false;
                   }
                });
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
            required: true
        }, {
            title: '面签照片',
            field: 'interviewPic',
            type: 'img',
            required: true
        }];
        if (!this.isAddedit) {
            o2mFields = o2mFields.concat([{
                title: '信用卡使用占比',
                field: 'creditCardOccupation',
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                help: '请输入0-100之间的数字'
            }, {
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
                type: 'textarea',
                normalArea: true,
                hidden: !this.view
            }]);
        }

        let fields = [{
            title: '业务团队',
            field: 'teamName',
            hidden: this.isAddedit
        }, {
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
            required: true,
            onChange: (value) => {
                if (value) {
                    this.newCar = value === '0';
                }
            }
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            min: '1',
            required: true
        }, {
            title: '二手车评估报告',
            field: 'secondCarReport',
            type: 'file',
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
            title: '说明',
            field: 'note',
            type: 'textarea',
            normalArea: true
        }, {
            title: '审核说明',
            field: 'approveNote',
            readonly: !this.isCheck,
            hidden: !this.isCheck
        }];

        // 信贷专员初审
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
                    for (let i = 0; i < params.creditUserList.length; i++) {
                        params.creditUserList[i].creditUserCode = params.creditUserList[i].code;
                        if (!params.creditUserList[i].bankCreditResultPdf) {
                            showWarnMsg('请录入' + params.creditUserList[i].userName + '的银行征信结果！');
                            return;
                        }
                    }
                    data.creditResult = params.creditUserList;
                    data.operator = getUserId();
                    data.dealType = '1';
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
                title: '退回征信',
                check: true,
                handler: (params) => {
                    let data = {};
                    data.creditCode = this.code;
                    data.operator = getUserId();
                    data.dealType = '0';
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
                handler: (params) => {
                    params.creditCode = this.code;
                    params.buttonCode = '0';
                    params.operator = getUserId();
                    if(this.code) {
                        for (let i = 0; i < params.creditUserList.length; i++) {
                            params.creditUserList[i].creditUserCode = params.creditUserList[i].code;
                        }
                    }
                    this.props.doFetching();
                    let bizCode = this.code ? 632112 : 632110;
                    fetch(bizCode, params).then((data) => {
                        if (!this.code) {
                            this.code = data.code;
                        }
                        this.props.getBuildDetail(this.code);
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '测试',
                handler: () => {
                    fetch(632925).then((data) => {});
                }
            }, {
                title: '发送',
                check: true,
                handler: (params) => {
                    params.creditCode = this.code;
                    params.buttonCode = '1';
                    params.operator = getUserId();
                    if (!params.creditUserList || params.creditUserList.length < 1) {
                        showWarnMsg('至少录入一条征信信息');
                        return;
                    }
                    let flag = false;
                    for (let i = 0; i < params.creditUserList.length; i++) {
                        params.creditUserList[i].creditUserCode = params.creditUserList[i].code;
                        if (params.creditUserList[i].relation === '1' && params.creditUserList[i].loanRole === '1') {
                            flag = true;
                        }
                    }
                    if (!flag) {
                        showWarnMsg('请录入申请人的征信信息！');
                        return;
                    }
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
