import React from 'react';
import { getQueryString, getUserId, showSucMsg } from 'common/js/util';
import fetch from 'common/js/fetch';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail-dev';
import Print from 'common/js/print/init';

@Form.create()
class InvestigateReportAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            isSelfCompany: true
        };

        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.bizType = String(getQueryString('bizType', this.props.location.search)) === '1' ? 'false' : 'true';
        this.loanBank = getQueryString('loanBank', this.props.location.search);
        this.isCheckCommissioner = !!getQueryString('isCheckCommissioner', this.props.location.search);
        this.isCheckStationed = !!getQueryString('isCheckStationed', this.props.location.search);
        this.wanFactor = 0;
    }

    render() {
        let fields = [{
            title: '调查信息',
            items: [
                [{
                    title: '授信客户姓名',
                    field: 'applyUserName',
                    required: true,
                    readonly: true
                }, {
                    title: '授信品种',
                    field: 'loanBankName',
                    required: true,
                    readonly: true
                }],
                [{
                    title: '授信金额',
                    field: 'loanAmount',
                    required: true,
                    readonly: true
                }, {
                    title: '授信期限(年)',
                    field: 'loanPeriod',
                    required: true,
                    readonly: true
                }],
                [{
                    title: '授信用途',
                    field: 'basicsInformation',
                    required: true,
                    readonly: true
                }],
                [{
                    title: '担保方式',
                    field: 'guaMode',
                    required: true
                }],
                [{
                    title: '客户基本情况',
                    field: 'customerInformation',
                    required: true,
                    readonly: true
                }],
                [{
                    title: '申请人征信情况',
                    field: 'bankCreditResultRemark',
                    required: true,
                    readonly: true
                }],
                [{
                    title: '申请人贷款车辆价格核准情况',
                    field: 'priceApprovalPdf',
                    type: 'img',
                    required: true
                }],
                [{
                    title: '车行168车价',
                    field: 'car168Price',
                    required: true
                }, {
                    title: '申请人工作情况及流水反映',
                    field: 'applyWorkAndJour',
                    required: true
                }]
            ]
        }, {
            title: '房产情况及家访',
            items: [
                [{
                    field: 'houseContract',
                    title: '购房合同及房产本',
                    type: 'img'
                }],
                [{
                    title: '家访地址',
                    field: 'homeVisit',
                    required: true
                }],
                [{
                    title: '家访照片',
                    field: 'housePicture',
                    type: 'img'
                }]
            ]
        }, {
            title: '银行流水数据',
            close: true,
            items: [
                [{
                    field: 'jourDatetime3',
                    title: '流水时间',
                    type: 'date',
                    rangedate: ['jourDatetimeStart', 'jourDatetimeEnd'],
                    readonly: true
                }],
                [{
                    field: 'jourInterest1',
                    title: '结息时间1',
                    type: 'select',
                    key: 'interest',
                    readonly: true
                }, {
                    field: 'jourInterest2',
                    title: '结息时间2',
                    type: 'select',
                    key: 'interest',
                    readonly: true
                }],
                [{
                    field: 'interest1',
                    title: '结息1(元)',
                    readonly: true
                }, {
                    field: 'interest2',
                    title: '结息2(元)',
                    readonly: true
                }],
                [{
                    field: 'jourIncome',
                    title: '总收入(元)',
                    readonly: true
                }, {
                    field: 'jourExpend',
                    title: '总支出(元)',
                    readonly: true
                }],
                [{
                    field: 'jourBalance',
                    title: '账户余额(元)',
                    readonly: true
                }, {
                    field: 'jourMonthIncome',
                    title: '月均收入(元)',
                    readonly: true
                }, {
                    field: 'jourMonthExpend',
                    title: '月均支出(元)',
                    readonly: true
                }],
                [{
                    field: 'jourRemark',
                    title: '流水说明',
                    type: 'textarea',
                    normalArea: true,
                    readonly: true
                }],
                [{
                    field: 'jourPic',
                    title: '申请人银行流水',
                    type: 'img',
                    readonly: true
                }]
            ]
        }, {
            title: '支付宝流水数据',
            close: true,
            items: [
                [{
                    field: 'jourDatetime1',
                    title: '流水时间',
                    type: 'date',
                    rangedate: ['zfbJourDatetimeStart', 'zfbJourDatetimeEnd'],
                    readonly: true
                }],
                [{
                    field: 'zfbJourInterest1',
                    title: '结息时间1',
                    type: 'select',
                    key: 'interest',
                    readonly: true
                }, {
                    field: 'zfbJourInterest2',
                    title: '结息时间2',
                    type: 'select',
                    key: 'interest',
                    readonly: true
                }],
                [{
                    field: 'zfbInterest1',
                    title: '结息1(元)',
                    readonly: true
                }, {
                    field: 'zfbInterest2',
                    title: '结息2(元)',
                    readonly: true
                }],
                [{
                    field: 'zfbJourIncome',
                    title: '总收入(元)',
                    readonly: true
                }, {
                    field: 'zfbJourExpend',
                    title: '总支出(元)',
                    readonly: true
                }
                ],
                [{
                    field: 'zfbJourBalance',
                    title: '账户余额(元)',
                    readonly: true
                }, {
                    field: 'zfbJourMonthIncome',
                    title: '月均收入(元)',
                    readonly: true
                }, {
                    field: 'zfbJourMonthExpend',
                    title: '月均支出(元)',
                    readonly: true
                }],
                [{
                    field: 'zfbJourRemark',
                    title: '流水说明',
                    type: 'textarea',
                    normalArea: true,
                    readonly: true
                }],
                [{
                    field: 'zfbJourPic',
                    title: '申请人银行流水',
                    type: 'img',
                    readonly: true
                }]
            ]
        }, {
            title: '微信流水数据',
            close: true,
            items: [
                [{
                    field: 'jourDatetime2',
                    title: '流水时间',
                    type: 'date',
                    rangedate: ['wxJourDatetimeStart', 'wxJourDatetimeEnd'],
                    readonly: true
                }],
                [{
                    field: 'wxJourInterest1',
                    title: '结息时间1',
                    type: 'select',
                    key: 'interest',
                    readonly: true
                }, {
                    field: 'wxJourInterest2',
                    title: '结息时间2',
                    type: 'select',
                    key: 'interest',
                    readonly: true
                }],
                [{
                    field: 'wxInterest1',
                    title: '结息1(元)',
                    readonly: true
                }, {
                    field: 'wxInterest2',
                    title: '结息2(元)',
                    readonly: true
                }],
                [{
                    field: 'wxJourIncome',
                    title: '总收入(元)',
                    readonly: true
                }, {
                    field: 'wxJourExpend',
                    title: '总支出(元)',
                    readonly: true
                }],
                [{
                    field: 'wxJourBalance',
                    title: '账户余额(元)',
                    readonly: true
                }, {
                    field: 'wxJourMonthIncome',
                    title: '月均收入(元)',
                    readonly: true
                }, {
                    field: 'wxJourMonthExpend',
                    title: '月均支出(元)',
                    readonly: true
                }],
                [{
                    field: 'wxJourRemark',
                    title: '流水说明',
                    type: 'textarea',
                    normalArea: true,
                    readonly: true
                }],
                [{
                    field: 'wxJourPic',
                    title: '申请人银行流水',
                    type: 'img',
                    readonly: true
                }]
            ]
        }, {
            title: '评估车辆基础信息',
            hidden: this.bizType,
            items: [
                [{
                    title: '车辆品牌',
                    field: 'carBrand',
                    required: true,
                    readonly: true
                }, {
                    title: '详细配置',
                    field: 'carSeries',
                    required: true,
                    readonly: true
                }],
                [{
                    title: '车辆类型',
                    field: 'carType',
                    type: 'select',
                    key: 'car_type',
                    required: true,
                    readonly: true
                }, {
                    field: 'carColor',
                    title: '颜色',
                    required: true,
                    readonly: true
                }],
                [{
                    title: '车辆型号',
                    field: 'carModel',
                    required: true,
                    readonly: true
                }, {
                    field: 'carFrameNo',
                    title: '车架号',
                    required: true,
                    readonly: true
                }, {
                    field: 'carEngineNo',
                    title: '发动机号',
                    required: true,
                    readonly: true
                }],
                [{
                    field: 'settleAddress',
                    title: '落户地点',
                    required: true,
                    readonly: true
                }],
                [{
                    field: 'carPic',
                    title: '车辆照片',
                    type: 'img',
                    required: true,
                    readonly: true
                }, {
                    field: 'carHgzPic',
                    title: '合格证照片',
                    type: 'img',
                    required: true,
                    readonly: true
                }]
            ]
        }, {
            title: '车辆证件照片',
            hidden: this.bizType,
            items: [
                [{
                    title: '行驶证主副页',
                    field: 'xszPdf',
                    type: 'img',
                    single: true,
                    required: true
                }, {
                    title: '行驶证车辆照片页',
                    field: 'xszCarPdf',
                    type: 'img',
                    single: true,
                    required: true
                }],
                [{
                    title: '车架号',
                    field: 'frameNo',
                    type: 'img',
                    single: true,
                    required: true
                }, {
                    title: '车辆铭牌',
                    field: 'nameplate',
                    type: 'img',
                    single: true,
                    required: true
                }]
            ]
        }, {
            title: '车辆照片',
            hidden: this.bizType,
            items: [
                [{
                    title: '正前',
                    field: 'forwardPdf',
                    type: 'img',
                    single: true,
                    required: true
                }, {
                    title: '正后',
                    field: 'queenPdf',
                    type: 'img',
                    single: true,
                    required: true
                }],
                [{
                    title: '正左',
                    field: 'leftPdf',
                    type: 'img',
                    single: true,
                    required: true
                }, {
                    title: '正右',
                    field: 'rightPdf',
                    type: 'img',
                    single: true,
                    required: true
                }],
                [{
                    title: '左前45º',
                    field: 'lf45Pdf',
                    type: 'img',
                    single: true,
                    required: true
                }, {
                    title: '右前45º',
                    field: 'rf45Pdf',
                    type: 'img',
                    single: true,
                    required: true
                }],
                [{
                    title: '左后45º',
                    field: 'rr45Pdf',
                    type: 'img',
                    single: true,
                    required: true
                }, {
                    title: '右后45º',
                    field: 'lg45Pdf',
                    type: 'img',
                    single: true,
                    required: true
                }],
                [{
                    title: '发动机仓',
                    field: 'leftPdf',
                    type: 'img',
                    single: true,
                    required: true
                }]
            ]
        }, {
            title: '车辆中控台、档位及里程照片',
            hidden: this.bizType,
            items: [
                [{
                    title: '中控台',
                    field: 'szmPdf',
                    type: 'img',
                    single: true,
                    required: true
                }, {
                    title: '档位',
                    field: 'gearsPdf',
                    type: 'img',
                    single: true,
                    required: true
                }],
                [{
                    title: '功能区里',
                    field: 'functionalZonePdf',
                    type: 'img',
                    single: true,
                    required: true
                }, {
                    title: '里程表',
                    field: 'odometerPdf',
                    type: 'img',
                    single: true,
                    required: true
                }]
            ]
        }, {
            title: '车辆内饰照片',
            hidden: this.bizType,
            items: [
                [{
                    title: '前排内饰',
                    field: 'frontRowPdf',
                    type: 'img',
                    single: true,
                    required: true
                }, {
                    title: '中排内饰',
                    field: 'rockRowPdf',
                    type: 'img',
                    single: true,
                    required: true
                }],
                [{
                    title: '后备箱',
                    field: 'trunkPdf',
                    type: 'img',
                    single: true,
                    required: true
                }, {
                    title: '天窗',
                    field: 'louverPdf',
                    type: 'img',
                    single: true,
                    required: true
                }],
                [{
                    title: '后排娱乐系统',
                    field: 'bankRowPdf',
                    type: 'img',
                    single: true,
                    required: true
                }]
            ]
        }, {
            title: '车辆核准截图',
            hidden: this.bizType,
            items: [
                [{
                    title: '截图',
                    field: 'checkApprovePdf',
                    type: 'img',
                    single: true,
                    required: true
                }],
                [{
                    title: '核准链接',
                    field: 'checkApproveLink',
                    required: true
                }]
            ]
        }, {
            title: '二手车市场成交价最低及最高截图',
            hidden: this.bizType,
            items: [
                [{
                    title: '截图',
                    field: 'usedCarCurrentRate',
                    type: 'img',
                    single: true,
                    required: true
                }],
                [{
                    title: '信息源',
                    field: 'informationSource',
                    required: true
                }]
            ]
        }, {
            title: '评估价',
            hidden: this.bizType,
            items: [
                [{
                    title: '评估价',
                    field: 'valuation',
                    required: true
                }]
            ]
        }];

        let checkFields = [{
            field: 'approveNote',
            title: '审核说明',
            type: 'textarea',
            normalArea: true,
            readonly: !(this.isCheckCommissioner || this.isCheckStationed)
        }];

        let buttons = [];
        let bizCode;
        if (this.isCheckCommissioner) {
            bizCode = 632201;
        } else if (this.isCheckStationed) {
            bizCode = 632202;
        }

        if (this.isCheckCommissioner || this.isCheckStationed) {
            fields = fields.concat(checkFields);

            buttons = [{
                title: '通过',
                check: true,
                handler: (params) => {
                    let data = {};
                    data.code = this.code;
                    data.approveNote = params.approveNote;
                    data.approveResult = '1';
                    data.updater = getUserId();
                    this.doFetching();
                    fetch(bizCode, data).then(() => {
                        this.cancelFetching();
                        showSucMsg('操作成功');
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.cancelFetching);
                }
            }, {
                title: '不通过',
                check: true,
                handler: (params) => {
                    let data = {};
                    data.code = this.code;
                    data.approveNote = params.approveNote;
                    data.approveResult = '0';
                    data.updater = getUserId();
                    this.doFetching();
                    fetch(bizCode, data).then(() => {
                        this.cancelFetching();
                        showSucMsg('操作成功');
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.cancelFetching);
                }
            }, {
                title: '返回',
                handler: () => {
                    this.props.history.go(-1);
                }
            }];
        } else if (!this.view) {
            buttons = [{
                title: '保存',
                handler: (params) => {
                    params.code = this.code;
                    params.approveResult = '0';
                    params.updater = getUserId();
                    params.creditCode = this.state.pageData.creditCode;
                    params.applyUserName = this.state.pageData.applyUserName;
                    params.bizType = this.state.pageData.bizType;
                    params.idNo = this.state.pageData.idNo;
                    this.doFetching();
                    fetch(632200, params).then(() => {
                        showSucMsg('操作成功');
                        this.cancelFetching();
                    }).catch(this.cancelFetching);
                }
            }, {
                title: '提交',
                check: true,
                handler: (params) => {
                    params.code = this.code;
                    params.approveResult = '1';
                    params.updater = getUserId();
                    params.creditCode = this.state.pageData.creditCode;
                    params.applyUserName = this.state.pageData.applyUserName;
                    params.bizType = this.state.pageData.bizType;
                    params.idNo = this.state.pageData.idNo;
                    this.doFetching();
                    fetch(632200, params).then(() => {
                        showSucMsg('操作成功');
                        this.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.cancelFetching);
                }
            }, {
                title: '返回',
                handler: () => {
                    this.props.history.go(-1);
                }
            }];
        } else if (this.view) {
            buttons = [{
                title: '打印',
                handler: () => {
                    Print.init({
                        printable: '_content_wrapper_',
                        documentTitle: '调查报告'
                    });
                }
            }, {
                title: '返回',
                handler: () => {
                    this.props.history.go(-1);
                }
            }];
        }

        return this.buildDetail({
            fields,
            type: 'card',
            code: this.code,
            view: this.view,
            detailCode: 632206,
            buttons: buttons
        });
    }
}

export default InvestigateReportAddedit;
