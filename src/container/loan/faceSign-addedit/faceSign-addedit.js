import React from 'react';
import {Button, Form} from 'antd';
import {
    getQueryString,
    showWarnMsg,
    showSucMsg,
    getUserId,
    isExpressConfirm
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';
import fetch from 'common/js/fetch';

@Form.create()
class FaceSignAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        // 审核
        this.isCheck = !!getQueryString('isCheck', this.props.location.search);
        this.isCheckNq = !!getQueryString('isCheckNq', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        let _this = this;
        let buttons = [];

        let fields = [{
            title: '业务编号',
            field: 'code',
            required: true,
            readonly: true,
            formatter: (v, d) => {
                return <div>
                    {d.code}<a href="javascript:void(0);" style={{ marginLeft: 20 }} onClick={() => {
                    window.location.href = '/ywcx/ywcx/addedit?v=1&code' + '=' + this.code;
                }}>查看详情</a>
                </div>;
            }
        }, {
            title: '客户姓名',
            field: 'userName',
            required: true,
            readonly: true,
            formatter: (v, d) => {
                return d ? d.creditUser.userName : '';
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
            title: '业务种类',
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
                return d && d.insideJobCompanyName ? d.insideJobCompanyName + '-' + d.insideJobDepartMentName + '-' + d.insideJobPostName + '-' + d.insideJobName : '';// hidden: !this.isEntry && !this.isCheck// 录入征信结果 审核才显示
            },
            readonly: true
        }, {
            title: '当前状态',
            field: 'status',
            key: 'cdbiz_status',
            type: 'select',
            readonly: true,
            formatter: (v, d) => {
                return d ? d.cdbiz.status : '';
            }
        }, {
            title: '银行视频',
            field: 'bankVideo',
            type: 'file',
            required: true,
            readonly: (this.isCheck || this.view) ? 'true' : false,
            hidden: this.isCheckNq, // 内勤主管审核隐藏
            formatter: (v, d) => {
                let url = '';
                d.attachments.forEach(item => {
                    if (item.vname == '银行视频') {
                        url = item.url;
                    }
                });
                  return url;
            }
        }, {
            title: '公司视频',
            field: 'companyVideo',
            type: 'file',
            required: true,
            readonly: (this.isCheck || this.view) ? 'true' : false,
            hidden: this.isCheckNq, // 内勤主管审核隐藏
            formatter: (v, d) => {
                let url = '';
                d.attachments.forEach(item => {
                    if (item.vname == '公司视频') {
                        url = item.url;
                    }
                });
                return url;
            }
        }, {
            title: '其他视频',
            field: 'otherVideo',
            type: 'file',
            readonly: (this.isCheck || this.view) ? 'true' : false,
            hidden: this.isCheckNq, // 内勤主管审核隐藏
            formatter: (v, d) => {
                let url = '';
                d.attachments.forEach(item => {
                    if (item.vname == '其他视频') {
                        url = item.url;
                    }
                });
                return url;
            }
        }, {
            title: '银行面签图片',
            field: 'bankPhoto',
            type: 'img',
            required: true,
            readonly: (this.isCheck || this.view) ? 'true' : false,
            hidden: this.isCheckNq, // 内勤主管审核隐藏
            formatter: (v, d) => {
                let url = '';
                d.attachments.forEach(item => {
                    if (item.vname == '银行面签照片') {
                        url = item.url;
                    }
                });
                return url;
            }
        }, {
            title: '银行合同',
            field: 'bankContract',
            type: 'img',
            readonly: (this.isCheck || this.view) ? 'true' : false,
            hidden: this.isCheckNq, // 内勤主管审核隐藏
            formatter: (v, d) => {
                let url = '';
                d.attachments.forEach(item => {
                    if (item.vname == '银行合同') {
                        url = item.url;
                    }
                });
                return url;
            }
        }, {
            title: '公司合同',
            field: 'companyContract',
            type: 'img',
            readonly: (this.isCheck || this.view) ? 'true' : false,
            hidden: this.isCheckNq, // 内勤主管审核隐藏
            formatter: (v, d) => {
                let url = '';
                d.attachments.forEach(item => {
                    if (item.vname == '公司合同') {
                        url = item.url;
                    }
                });
                return url;
            }
        }, {
            title: '资金划转授权书',
            field: 'advanceFundAmountPdf',
            type: 'img',
            required: true,
            readonly: (this.isCheck || this.view) ? 'true' : false,
            hidden: this.isCheckNq, // 内勤主管审核隐藏
            formatter: (v, d) => {
                let url = '';
                d.attachments.forEach(item => {
                    if (item.vname == '资金划转授权书') {
                        url = item.url;
                    }
                });
                return url;
            }
        }, {
            title: '其他资料',
            field: 'interviewOtherPdf',
            type: 'img',
            readonly: (this.isCheck || this.view) ? 'true' : false,
            hidden: this.isCheckNq, // 内勤主管审核隐藏
            formatter: (v, d) => {
                let url = '';
                d.attachments.forEach(item => {
                    if (item.vname == '面签其他资料') {
                        url = item.url;
                    }
                });
                return url;
            }
        }, {
            title: '审核意见',
            field: 'approveNote',
            type: 'textarea',
            normalArea: true,
            readonly: !(this.isCheck || this.isCheckNq),
            hidden: !this.view
        }];
        let bizCode = this.isCheckNq ? 632137 : 632124;
        // 准入审查
        if (this.isCheck || this.isCheckNq) {
            buttons = [{
                title: '通过',
                handler: (params) => {
                    let data = {};
                    data.code = this.code;
                    data.approveResult = '1';
                    data.approveNote = params.approveNote;
                    data.operator = getUserId();
                    this.doFetching();
                    fetch(bizCode, data).then((res) => {
                        showSucMsg('操作成功');
                        isExpressConfirm(res);
                        this.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.cancelFetching);
                }
            }, {
                title: '不通过',
                handler: (params) => {
                    let data = {};
                    data.code = this.code;
                    data.approveResult = '0';
                    data.approveNote = params.approveNote;
                    data.operator = getUserId();
                    this.doFetching();
                    fetch(bizCode, data).then(() => {
                        showSucMsg('操作成功');
                        this.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.cancelFetching);
                }
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        } else if(this.view) {
            buttons = [{
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        } else {
            buttons = [{
                title: '保存',
                handler: (params) => {
                    params.operator = getUserId();
                    params.isSend = '0';
                    this.doFetching();
                    fetch(632123, params).then(() => {
                        showSucMsg('操作成功');
                        this.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.cancelFetching);
                }
            }, {
                title: '提交',
                check: true,
                handler: (params) => {
                    params.operator = getUserId();
                    params.isSend = '1';
                    this.doFetching();
                    fetch(632123, params).then(() => {
                        console.log('面签成功');
                        showSucMsg('操作成功');
                        this.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.cancelFetching);
                }
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        }

        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632516,
            addCode: 632123,
            editCode: 632123,
            buttons: buttons,
            beforeSubmit: (params) => {
                delete params.loanAmount;
                params.operator = getUserId();
                return params;
            }
        });
    }
}

export default FaceSignAddedit;
