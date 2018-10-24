import React from 'react';
import {
    getQueryString,
    showWarnMsg
} from 'common/js/util';
import {
    CollapseWrapper
} from 'component/collapse-detail/collapse-detail';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loan/bigdata';
import fetch from 'common/js/fetch';

@CollapseWrapper(
    state => state.loanBigdata, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class Bigdata extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
            idNo: '',
            mobile: '',
            userName: ''
        };
    }
    componentDidMount() {
        let _this = this;
        fetch(632117, {
            code: _this.code
        }).then(data => {
            this.setState({
                idNo: data.idNo,
                mobile: data.mobile,
                userName: data.userName
            });
            // 获取身份证实名认证
            _this.getIdNoAttestation(data.idNo, data.userName).then(data => {
                data = JSON.parse(data).data;
                _this.props.setPageData({
                    ..._this.props.pageData,
                    identityNo: data.identityNo,
                    name: data.name,
                    resultCode: data.resultCode,
                    resultMsg: data.resultMsg
                });
            });
            // 银行卡四要素认证
            // _this.getBankCardNoAttestation(data.bankCardNo, data.idNo, data.mobile, data.userName).then(data => {
            //     data = JSON.parse(data).data;
            //     _this.props.setPageData({
            //         ..._this.props.pageData,
            //         bankCardNo: data.bankCardNo,
            //         identityNo1: data.identityNo,
            //         mobileNo1: data.mobileNo,
            //         name1: data.name
            //     });
            // });
            // 社保
            // _this.getSocialSecurity(data.idNo, data.userName, data.area).then(data => {
            //     data = JSON.parse(data).data;
            //     _this.props.setPageData({
            //         ..._this.props.pageData,
            //         code: data.code,
            //         token: data.token,
            //         msg: data.msg
            //     });
            // });
            // 涉案列表
            _this.getInvolvedList(data.idNo, data.userName).then(data => {
                data = JSON.parse(data).data;
                _this.props.setPageData({
                    ..._this.props.pageData
                    // getInvolvedList: data.list
                });
            });
            // 涉案详情
            // _this.getInvolvedDetail(data.bankCardNo, data.idNo, data.userName).then(data => {
            //     data = JSON.parse(data).data;
            //     _this.props.setPageData({
            //         ..._this.props.pageData,
            //         beigao: data.beigao,
            //         beishangshuren: data.beishangshuren,
            //         court: data.court,
            //         court_type: data.court_type,
            //         danshiren: data.danshiren,
            //         identity_card: data.identity_card,
            //         jcase: data.jcase,
            //         jnum: data.jnum,
            //         jprocess: data.jprocess,
            //         jsummary: data.jsummary,
            //         judge_date: data.judge_date,
            //         matchfit: data.matchfit,
            //         recordId: data.recordId,
            //         result_str: data.result_str,
            //         shangshuren: data.shangshuren,
            //         title: data.title,
            //         weitobianhuren: data.weitobianhuren,
            //         yuangao: data.yuangao
            //     });
            // });
            // 失信被执行人
            _this.getDiscredit(data.idNo, data.userName).then(data => {
                // data = JSON.parse(data).data;
                _this.props.setPageData({
                    ..._this.props.pageData,
                    DiscreditList: data.dishonests
                });
            });
        });
    }
    // 获取身份证实名认证
    getIdNoAttestation(identityNo, name) {
        return fetch(632920, {
            identityNo,
            name
        });
    }
    // 银行卡四要素认证
    getBankCardNoAttestation(bankCardNo, identityNo, mobileNo, name) {
        return fetch(632923, {
            bankCardNo,
            identityNo,
            mobileNo,
            name
        });
    }
    // 社保
    getSocialSecurity(username, password, area) {
        return fetch(632927, {
            username,
            password,
            area
        });
    }
    // 涉案列表
    getInvolvedList(identityNo, name) {
        return fetch(632921, {
            identityNo,
            name
        });
    }
    // 涉案详情
    getInvolvedDetail(bankCardNo, identityNo, name) {
        return fetch(632922, {
            bankCardNo,
            identityNo,
            name
        });
    }
    // 失信被执行人
    getDiscredit(identityNo, name) {
        return fetch(632924, {
            identityNo,
            name
        });
    }
    // 公积金
    getAccumulationFund(username, password, area) {
        return fetch(632924, {
            username,
            password,
            area
        });
    }
    // 淘宝查询
    getTaoBao(username, password) {
        return fetch(632924, {
            username,
            password
        });
    }
    // 京东查询
    getJD(username, password) {
        return fetch(632949, {
            username,
            password
        });
    }
    // 立木征信分页查
    getLiMu(bizType, start = 0, limit = 10) {
        return fetch(632924, {
            bizType,
            start,
            limit
        });
    }

    render() {
        let fields = [{
            title: '身份证实名认证',
            items: [
                [{
                    title: '身份证号',
                    field: 'identityNo'
                }, {
                    title: '姓名',
                    field: 'name'
                }, {
                    title: '验证结果码',
                    field: 'resultCode'
                }, {
                    title: '验证结果描述',
                    field: 'resultMsg',
                    type: 'textarea',
                    normalArea: true
                }]
            ]
        }, {
            title: '银行卡四要素认证',
            items: [
                [{
                    title: '请输入银行卡号',
                    field: 'bankCardNo',
                    required: true,
                    readonly: false,
                    onChange: (v) => {
                        // 银行卡四要素认证
                        // let idNo = this.props.pageData.idNo;
                        // let mobile = this.props.pageData.mobile;
                        // let userName = this.props.pageData.userName;
                        this.getBankCardNoAttestation(v, this.state.idNo, this.state.mobile, this.state.userName).then(data => {
                            data = JSON.parse(data).data;
                            this.props.setPageData({
                                ...this.props.pageData,
                                bankCardNo: data.bankCardNo,
                                identityNo1: data.identityNo,
                                mobileNo1: data.mobileNo,
                                name1: data.name
                            });
                        });
                    }
                }],
                [{
                    title: '银行卡号',
                    field: 'bankCardNo'
                }, {
                    title: '银行卡号',
                    field: 'identityNo1'
                }, {
                    title: '手机号',
                    field: 'mobileNo1'
                }, {
                    title: '姓名',
                    field: 'name1'
                }]
            ]
        }, {
            title: '社保查询',
            items: [
                [{
                    title: '账号',
                    field: 'username',
                    required: true,
                    readonly: false
                }, {
                    title: '密码',
                    field: 'password',
                    type: 'password',
                    required: true,
                    readonly: false
                }, {
                    title: '请选择地区',
                    field: 'areaCode',
                    type: 'select',
                    listCode: 632925,
                    keyName: 'areaCode',
                    valueName: 'areaName',
                    required: true,
                    readonly: false,
                    onChange: (v) => {
                        // 社保
                        let username = this.props.pageData.username;
                        let password = this.props.pageData.password;
                        if(username === '') {
                            showWarnMsg('请输入账号');
                            return;
                        }
                        if(password === '') {
                            showWarnMsg('请输入密码');
                            return;
                        }
                        this.getSocialSecurity(username, password, v).then(data => {
                            data = JSON.parse(data).data;
                            this.props.setPageData({
                                ...this.props.pageData,
                                code: data.code,
                                token: data.token,
                                msg: data.msg
                            });
                        });
                    }
                }],
                [{
                    title: '状态码',
                    field: 'code'
                }, {
                    title: '流程唯一标记',
                    field: 'token'
                }, {
                    title: '状态描述',
                    field: 'msg'
                }]
            ]
        }, {
            title: '涉案列表',
            items: [
                [{
                    title: '涉案列表',
                    field: 'getInvolvedList',
                    type: 'o2m',
                    options: {
                        fields: [{
                            title: '当事人',
                            field: 'dangshiren'
                        }, {
                            title: '案件摘要',
                            field: 'jsummary'
                        }, {
                            title: '匹配度',
                            field: 'matchfit'
                        }, {
                            title: '详情 ID',
                            field: 'recordId'
                        }, {
                            title: '案件标题',
                            field: 'title'
                        }]
                    }
                }]
            ]
        }, {
            title: '涉案详情',
            items: [
                [{
                    title: '请输入银行卡号',
                    field: 'bankCard',
                    required: true,
                    readonly: false,
                    onChange: (v) => {
                        // 涉案详情
                        // let idNo = this.props.pageData.idNo;
                        // let userName = this.props.pageData.userName;
                        this.getInvolvedDetail(v, this.state.idNo, this.state.userName).then(data => {
                            data = JSON.parse(data).data;
                            this.props.setPageData({
                                ...this.props.pageData,
                                beigao: data.beigao,
                                beishangshuren: data.beishangshuren,
                                court: data.court,
                                court_type: data.court_type,
                                danshiren: data.danshiren,
                                identity_card: data.identity_card,
                                jcase: data.jcase,
                                jnum: data.jnum,
                                jprocess: data.jprocess,
                                jsummary: data.jsummary,
                                judge_date: data.judge_date,
                                matchfit: data.matchfit,
                                recordId: data.recordId,
                                result_str: data.result_str,
                                shangshuren: data.shangshuren,
                                title: data.title,
                                weitobianhuren: data.weitobianhuren,
                                yuangao: data.yuangao
                            });
                        });
                    }
                }],
                [{
                    title: '被告',
                    field: 'beigao'
                }, {
                    title: '被上诉人',
                    field: 'beishangshuren'
                }, {
                    title: '法院名称',
                    field: 'court'
                }, {
                    title: '法院等级',
                    field: 'court_type'
                }],
                [{
                    title: '当事人',
                    field: 'danshiren'
                }, {
                    title: '当事人身份证',
                    field: 'identity_card'
                }, {
                    title: '案由',
                    field: 'jcase'
                }, {
                    title: '案号',
                    field: 'jnum'
                }],
                [{
                    title: '审理程序',
                    field: 'jprocess'
                }, {
                    title: '案件摘要',
                    field: 'jsummary'
                }, {
                    title: '案件类别',
                    field: 'jtype'
                }, {
                    title: '审结时间',
                    field: 'judge_date'
                }],
                [{
                    title: '匹配度',
                    field: 'matchfit'
                }, {
                    title: '详情 ID',
                    field: 'recordId'
                }, {
                    title: '判决结果',
                    field: 'result_str'
                }, {
                    title: '上诉人',
                    field: 'shangshuren'
                }],
                [{
                    title: '案件标题',
                    field: 'title'
                }, {
                    title: '委托辩护人',
                    field: 'weitobianhuren'
                }, {
                    title: '原告',
                    field: 'yuangao'
                }]
            ]
        }, {
            title: '失信被执行人',
            items: [
                [{
                    title: '失信被执行人',
                    field: 'DiscreditList',
                    type: 'o2m',
                    options: {
                        fields: [{
                            title: '年龄(个人)',
                            field: 'beigao'
                        }, {
                            title: '案号',
                            field: 'beishangshuren'
                        }, {
                            title: '法人姓名',
                            field: 'court'
                        }, {
                            title: '已履行',
                            field: 'court_type'
                        }, {
                            title: '做出执行依据 单位',
                            field: 'danshiren'
                        }, {
                            title: '执行依据文号',
                            field: 'identity_card'
                        }, {
                            title: '被执行人的履 行情况',
                            field: 'jcase'
                        }, {
                            title: '执行法院',
                            field: 'jnum'
                        }, {
                            title: '立案时间',
                            field: 'jprocess'
                        }, {
                            title: '身份证号码/组 织机构代码',
                            field: 'jsummary'
                        }, {
                            title: '生效法律文书 确定的义务',
                            field: 'jtype'
                        }, {
                            title: '被执行人姓名/ 名称',
                            field: 'judge_date'
                        }, {
                            title: '序号',
                            field: 'matchfit'
                        }, {
                            title: '省份',
                            field: 'recordId'
                        }, {
                            title: '发布时间',
                            field: 'result_str'
                        }, {
                            title: '性别(个人)',
                            field: 'shangshuren'
                        }, {
                            title: '具体情形',
                            field: 'title'
                        }, {
                            title: '未履行',
                            field: 'weitobianhuren'
                        }]
                    }
                }]
            ]
        }, {
            title: '公积金',
            items: [
                [{
                    title: '账号',
                    field: 'username1',
                    required: true,
                    readonly: false
                }, {
                    title: '密码',
                    field: 'password1',
                    type: 'password',
                    required: true,
                    readonly: false
                }, {
                    title: '请选择地区',
                    field: 'areaCode1',
                    listCode: 632925,
                    keyName: 'areaCode',
                    valueName: 'areaName',
                    required: true,
                    readonly: false,
                    onChange: (v) => {
                        // 社保
                        let username = this.props.pageData.username1;
                        let password = this.props.pageData.password1;
                        if(username === '') {
                            showWarnMsg('请输入账号');
                            return;
                        }
                        if(password === '') {
                            showWarnMsg('请输入密码');
                            return;
                        }
                        this.getAccumulationFund(username, password, v).then(data => {
                            data = JSON.parse(data).data;
                            this.props.setPageData({
                                ...this.props.pageData,
                                code1: data.code,
                                token1: data.token,
                                msg1: data.msg
                            });
                        });
                    }
                }],
                [{
                    title: '状态码',
                    field: 'code1'
                }, {
                    title: '流程唯一标记',
                    field: 'token1'
                }, {
                    title: '状态描述',
                    field: 'msg1'
                }]
            ]
        }, {
            title: '淘宝查询',
            items: [
                [{
                    title: '账号',
                    field: 'username2',
                    readonly: false,
                    required: true
                }, {
                    title: '密码',
                    field: 'password2',
                    readonly: false,
                    required: true
                }, {
                    title: '类型',
                    field: 'lmzxBizType',
                    type: 'select',
                    key: 'lmzx_biz_type',
                    readonly: false,
                    required: true,
                    onChange: (v) => {
                        let username = this.props.pageData.username2;
                        let password = this.props.pageData.password2;
                        if(username === '') {
                            return showWarnMsg('请输入账号');
                        }
                        if(password === '') {
                            return showWarnMsg('请输入密码');
                        }
                        let bizType = v;
                        this.getTaoBao(username, password).then(data => {
                            if(data.code === '0010') {
                                this.getLiMu(bizType).then(data => {
                                    this.props.setPageData({
                                        ...this.props.pageData,
                                        taobaoList: data.list
                                    });
                                });
                            }
                        });
                    }
                }],
                [{
                    title: '淘宝查询',
                    field: 'taobaoList',
                    type: 'o2m',
                    options: {
                        fields: [{
                            title: '编号',
                            field: 'id'
                        }, {
                            title: '类型',
                            field: 'bizType',
                            type: 'select',
                            key: 'lmzx_biz_type'
                        }, {
                            title: '查询结果',
                            field: 'result'
                        }, {
                            title: '用户账号',
                            field: 'userName'
                        }]
                    }
                }]
            ]
        }, {
            title: '京东查询',
            items: [
                [{
                    title: '账号',
                    field: 'username3',
                    readonly: false,
                    required: true
                }, {
                    title: '密码',
                    field: 'password3',
                    readonly: false,
                    required: true
                }, {
                    title: '类型',
                    field: 'lmzxBizType3',
                    type: 'select',
                    key: 'lmzx_biz_type',
                    readonly: false,
                    required: true,
                    onChange: (v) => {
                        let username = this.props.pageData.username3;
                        let password = this.props.pageData.password3;
                        if(username === '') {
                            return showWarnMsg('请输入账号');
                        }
                        if(password === '') {
                            return showWarnMsg('请输入密码');
                        }
                        let bizType = v;
                        this.getJD(username, password).then(data => {
                            if(data.code === '0010') {
                                this.getLiMu(bizType).then(data => {
                                    this.props.setPageData({
                                        ...this.props.pageData,
                                        JDList: data.list
                                    });
                                });
                            }
                        });
                    }
                }],
                [{
                    title: '京东查询',
                    field: 'JDList',
                    type: 'o2m',
                    options: {
                        fields: [{
                            title: '编号',
                            field: 'id'
                        }, {
                            title: '类型',
                            field: 'bizType',
                            type: 'select',
                            key: 'lmzx_biz_type'
                        }, {
                            title: '查询结果',
                            field: 'result'
                        }, {
                            title: '用户账号',
                            field: 'userName'
                        }]
                    }
                }]
            ]
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view
        });
    }
}

export default Bigdata;
