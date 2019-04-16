import React from 'react';
import { initStates, doFetching, cancelFetching, setSelectData, setPageData,
    restore } from '@redux/loan/credit-addedit';
import { getQueryString, showWarnMsg, showSucMsg, getUserId, moneyFormat } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';

// 是否通过
// const bankCreditResultPdf = [
//     {k: '0', v: '否'},
//     {k: '1', v: '是'}
// ];
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
        this.creditUserList = [];
    }
    render() {
        // 征信列表字段
        // let o2mFields = [];

        // 详情回显列表字段
        let fields = [{
            title: '业务编号',
            field: 'code',
            formatter: (v, d) => {
                if(d.creditUserList) {
                    this.creditUserList = d.creditUserList; // 存储creditUserList
                }
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
            title: '姓名',
            field: ' ',
            nowrap: true,
            required: true,
            formatter: (v, d) => {
                return d ? d.creditUserList[0].userName : '';
            }
        }, {
            title: '与借款人关系',
            field: 'relation',
            type: 'select',
            key: 'credit_user_relation',
            required: true,
            formatter: (v, d) => {
                return d ? d.creditUserList[0].relation : '';
            }
        }, {
            title: '贷款角色',
            field: 'loanRole',
            type: 'select',
            key: 'credit_user_loan_role',
            required: true,
            formatter: (v, d) => {
                return d ? d.creditUserList[0].loanRole : '';
            },
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
            formatter: (v, d) => {
                return d ? d.creditUserList[0].mobile : '';
            },
            render: (v) => {
                let val = (v && v.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')) || '';
                return <span style={{whiteSpace: 'nowrap'}}>{val}</span>;
            }
        }, {
            title: '身份证号',
            field: 'idNo',
            idCard: true,
            required: true,
            formatter: (v, d) => {
                return d ? d.creditUserList[0].idNo : '';
            },
            render: (v) => {
                let val = (v && v.replace(/^(\d{6}).+(\d{4})$/, '$1****$2')) || '';
                return <span style={{whiteSpace: 'nowrap'}}>{val}</span>;
            }
        }, {
            title: '身份证正反面',
            field: 'idNo1',
            type: 'img',
            // required: true,
            readonly: true,
            key: 'attachment_name',
            formatter: (v, d) => {
                return d ? d.attachments.url : '';
            }
        }, {
            title: '征信查询授权书',
            field: 'name',
            type: 'select',
            // required: true,
            readonly: true,
            key: 'attachment_name'
        }, {
            title: '面签照片',
            field: 'interviewPic',
            type: 'img',
            single: true,
            // required: true,
            readonly: true,
            key: 'attachment_name',
            formatter: (v, d) => {
                return d ? d.attachments.url : '';
            }
        }, {
            title: '银行征信报告',
            field: 'bankCreditReport',
            type: 'img',
            single: true, // 单张
            // required: true,
            readonly: true,
            key: 'attachment_name',
            formatter: (v, d) => {
                return d ? d.attachments.url : '';
            }
        }, {
            title: '银行征信结果是否通过',
            field: 'bankCreditResultPdf',
            type: 'select',
            readonly: true,
            data: [{
                dkey: '0',
                dvalue: '否'
            }, {
                dkey: '1',
                dvalue: '是'
            }],
            keyName: 'dkey',
            valueName: 'dvalue',
            formatter: (v, d) => {
                return d ? d.creditUserList[0].bankCreditResultPdf : '';
            }
        }, {
            title: '大数据征信报告(多张)',
            field: 'dataCreditReport',
            type: 'img',
            // required: true,
            readonly: true,
            key: 'attachment_name',
            formatter: (v, d) => {
                return d ? d.attachments.url : '';
            }
        }, {
            title: '征信报告说明',
            field: 'bankCreditResultRemark',
            required: true,
            readonly: true,
            type: 'textarea',
            normalArea: true,
            formatter: (v, d) => {
                return d ? d.creditUserList[0].bankCreditResultRemark : '';
            }
        }, {
            title: '审核意见',
            field: 'approveNote',
            type: 'textarea',
            normalArea: true,
            readonly: false
        }];
        // 风控专员审核
        if (this.isCheck) {
            this.buttons = [{
                title: '通过',
                check: true,
                handler: (params) => {
                    console.log(params, this.creditUserList);
                    let data = {};
                    let item = [];
                    data.code = this.code; // 征信单编号
                    data.approveNote = params.approveNote; // 审核说明
                    data.approveResult = '1';// 审核结果
                    data.operator = getUserId();
                    // if (!params.creditUserList || params.creditUserList.length < 1) {
                    //     showWarnMsg('至少录入一条征信人员信息！');
                    //     return;
                    // }
                    for (let i = 0; i < this.creditUserList.length; i++) {
                        this.creditUserList[i].creditUserCode = this.creditUserList[i].code;
                        item.push({
                            code: this.creditUserList[i].creditUserCode,
                            loanRole: this.creditUserList[i].loanRole,
                            relation: this.creditUserList[i].relation
                        });
                    }
                    data.creditUserList = item;
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
                    console.log(params);
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
