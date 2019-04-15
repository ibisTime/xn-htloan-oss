import React from 'react';
import { initStates, doFetching, cancelFetching, setSelectData, setPageData,
    restore } from '@redux/loan/credit-addedit';
import { getQueryString, showWarnMsg, showSucMsg, getUserId, moneyFormat } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
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
        this.view = !!getQueryString('v', this.props.location.search);
        this.newCar = true;
        this.creditUserListIndex = 6;
        this.buttons = [];
        this.concatFalg = false;
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
            required: true,
            hidden: this.isEntry
        }, {
            title: '身份证反面',
            field: 'idNoReverse',
            type: 'img',
            single: true,
            required: true,
            hidden: this.isEntry
        }, {
            title: '征信查询授权书',
            field: 'authPdf',
            type: 'img',
            required: true,
            hidden: this.isEntry
        }, {
            title: '面签照片',
            field: 'interviewPic',
            type: 'img',
            required: true,
            hidden: this.isEntry
        }];

        // 详情回显列表字段
        let fields = [{
            title: '业务编号',
            field: 'code',
            formatter: (v, d) => {
                return d ? d.cdbiz.code : '';
            }
        }, {
            title: '客户姓名',
            field: 'userName'
        }, {
            title: '贷款银行',
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
            onChange: (v, data, props) => {
                props.setPageData({
                    bizType: data.dvalue
                });
            }
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            min: '1'
        }, {
            title: '业务归属',
            field: 'ywyUser',
            formatter: (v, d) => {
                return d ? d.companyName + '-' + d.teamName + '-' + d.saleUserName : '';
            }
        }, {
            title: '指派归属',
            field: 'zfStatus',
            formatter: (v, d) => {
                return d ? d.companyName + '-' + d.teamName + '-' + d.insideJobName : '';
            }
        }, {
            title: '当前状态',
            field: 'status',
            key: 'cdbiz_status',
            type: 'select',
            formatter: (v, d) => {
                return d ? d.cdbiz.status : '';
            }
        }, {
            title: '审核说明',
            field: 'approveNote',
            readonly: !this.isCheck,
            hidden: !this.isCheck
        }, {
            title: '主贷人征信',
            field: 'creditUserList',
            readonly: false,
            hidden: this.isCheck,
            options: {
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
                scroll: {x: 1300},
                fields: o2mFields
            }
        }];
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

        return (
            <div>
                {
                    this.props.buildDetail({
                        fields,
                        code: this.code,
                        view: this.view, //  v=1代表详情 为true时: 内容全部显示不可修改,并且页面没有[保存]按钮
                        detailCode: 632117, // 征信详情查询接口
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
                        }
                    })
                }
            </div>
        );
    }
}

export default CreditAddedit;
