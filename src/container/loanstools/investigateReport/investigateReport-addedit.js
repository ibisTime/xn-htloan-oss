import React from 'react';
import {
    getQueryString,
    getUserId,
    showWarnMsg,
    showSucMsg,
    moneyParse,
    moneyFormat
} from 'common/js/util';
import {CollapseWrapper} from 'component/collapse-detail/collapse-detail';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/investigateReport-addedit';
import fetch from 'common/js/fetch';

@CollapseWrapper(
    state => state.loanstoolsInvestigateReportAddedit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class InvestigateReportAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelfCompany: true
        };

        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.bizType = getQueryString('bizType', this.props.location.search);
        this.loanBank = getQueryString('loanBank', this.props.location.search);
        this.isCheckCommissioner = !!getQueryString('isCheckCommissioner', this.props.location.search);
        this.isCheckDirector = !!getQueryString('isCheckDirector', this.props.location.search);
        this.isCheckRegionalManager = !!getQueryString('isCheckRegionalManager', this.props.location.search);
        this.wanFactor = 0;
    }

    render() {
        let fields = [{
            title: '调查信息',
            items: [
                [{
                    title: '授信客户姓名',
                    field: 'applyUserName',
                    required: true
                }, {
                    title: '授信品种',
                    field: 'loanBankName',
                    required: true
                }, {
                    title: '授信金额',
                    field: 'loanAmount',
                    amount: true,
                    required: true
                }],
                [{
                    title: '授信期限(年)',
                    field: 'loanPeriod',
                    required: true
                }, {
                    title: '授信用途',
                    field: 'basicsInformation',
                    required: true
                }, {
                    title: '担保方式',
                    field: 'guaMode',
                    required: true
                }],
                [{
                    title: '申请人征信情况',
                    field: 'bankCreditResultPdf',
                    type: 'img',
                    required: true
                }, {
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
                }],
                [{
                    field: 'houseContract',
                    title: '购房合同及房产本',
                    type: 'img'
                }, {
                    title: '其他辅助资产',
                    field: 'assetPdf',
                    type: 'img'
                }],
                [{
                    title: '家访地址',
                    field: 'homeVisit',
                    required: true
                }, {
                    title: '家访照片',
                    field: 'housePicture',
                    type: 'img'
                }]
            ]
        }, {
            title: '申请人信息',
            items: [
                [{
                    title: '借款人',
                    field: 'applyUserName1',
                    required: true,
                    readonly: true,
                    formatter: (v, data) => {
                        return data.applyUserName;
                    }
                }],
                [{
                    field: 'gender',
                    title: '性别',
                    type: 'select',
                    key: 'gender',
                    required: true
                }, {
                    field: 'age',
                    title: '年龄',
                    number: true,
                    positive: true,
                    required: true
                }, {
                    field: 'idNo',
                    title: '身份证号',
                    idCard: true,
                    readonly: true,
                    required: true
                }],
                [{
                    field: 'marryState',
                    title: '婚姻状况',
                    type: 'select',
                    key: 'marry_state',
                    required: true
                }, {
                    field: 'nation',
                    title: '民族',
                    required: true
                }, {
                    field: 'education',
                    title: '学历',
                    type: 'select',
                    key: 'education',
                    required: true
                }],
                [{
                    field: 'political',
                    title: '政治面貌',
                    required: true
                }, {
                    field: 'familyNumber',
                    title: '家庭人口',
                    required: true
                }, {
                    field: 'mobile',
                    title: '联系电话',
                    mobile: true,
                    required: true
                }],
                [{
                    field: 'nowAddress',
                    title: '现居住地址',
                    required: true
                }, {
                    field: 'postCode1',
                    title: '现居住地址邮编',
                    required: true
                }, {
                    field: 'isCardMailAddress',
                    title: '是否卡邮寄地址',
                    type: 'select',
                    key: 'is_card_mail_address',
                    required: true
                }],
                [{
                    field: 'residenceAddress',
                    title: '户口所在地',
                    required: true
                }, {
                    field: 'postCode2',
                    title: '户口所在地邮编',
                    required: true
                }],
                [{
                    field: 'familyMainAsset',
                    title: '家庭主要财产(元)',
                    required: true
                }, {
                    field: 'mainAssetInclude',
                    title: '主要财产包括',
                    required: true
                }],
                [{
                    field: 'houseContract',
                    title: '购房合同及房产本',
                    type: 'img'
                }, {
                    title: '其他辅助资产',
                    field: 'assetPdf',
                    type: 'img'
                }, {
                    field: 'housePicture',
                    title: '家访照片',
                    type: 'img'
                }]
            ]
        }, {
            title: '申请人银行流水数据',
            close: true,
            items: [
                [{
                    field: 'jourDatetime3',
                    title: '流水时间',
                    type: 'date',
                    rangedate: ['jourDatetimeStart', 'jourDatetimeEnd'],
                    onChange: (dates, dateStrings) => {
                        let jourIncome = this.props.form.getFieldValue('jourIncome');
                        let jourExpend = this.props.form.getFieldValue('jourExpend');
                        let num = dates[1].diff(dates[0], 'months', true);
                        num = num.toFixed(1);
                        if (jourIncome) {
                            jourIncome = moneyParse(jourIncome);
                            this.props.form.setFieldsValue({
                                jourMonthIncome: moneyFormat(jourIncome / num)
                            });
                        }
                        ;
                        if (jourExpend) {
                            jourExpend = moneyParse(jourExpend);
                            this.props.form.setFieldsValue({
                                jourMonthExpend: moneyFormat(jourExpend / num)
                            });
                        }
                    }
                }],
                [{
                    title: '流水结息',
                    field: 'jourInterest',
                    type: 'select',
                    key: 'interest'
                }],
                [{
                    field: 'jourIncome',
                    title: '总收入(元)',
                    amount: true,
                    onChange: (v) => {
                        let jourDatetime = this.props.form.getFieldValue('jourDatetime3');
                        let jourMonthIncome = this.props.form.getFieldValue('jourMonthIncome');
                        if (jourDatetime) {
                            let num = jourDatetime[1].diff(jourDatetime[0], 'months', true);
                            v = moneyParse(v);
                            this.props.form.setFieldsValue({
                                jourMonthIncome: moneyFormat(v / num)
                            });
                        }
                    }
                }, {
                    field: 'jourExpend',
                    title: '总支出(元)',
                    amount: true,
                    onChange: (v) => {
                        let jourDatetime = this.props.form.getFieldValue('jourDatetime3');
                        let jourMonthExpend = this.props.form.getFieldValue('jourMonthExpend');
                        if (jourDatetime) {
                            let num = jourDatetime[1].diff(jourDatetime[0], 'months', true);
                            v = moneyParse(v);
                            this.props.form.setFieldsValue({
                                jourMonthExpend: moneyFormat(v / num)
                            });
                        }
                    }
                }],
                [{
                    field: 'jourBalance',
                    title: '账户余额(元)',
                    amount: true
                }, {
                    field: 'jourMonthIncome',
                    title: '月均收入(元)',
                    amount: true
                }, {
                    field: 'jourMonthExpend',
                    title: '月均支出(元)',
                    amount: true
                }],
                [{
                    field: 'jourRemark',
                    title: '流水说明',
                    type: 'textarea',
                    normalArea: true
                }],
                [{
                    field: 'jourPic',
                    title: '流水图片',
                    type: 'img'
                }]
            ]
        }, {
            title: '申请人支付宝流水数据',
            close: true,
            items: [
                [{
                    field: 'jourDatetime1',
                    title: '流水时间',
                    type: 'date',
                    rangedate: ['zfbJourDatetimeStart', 'zfbJourDatetimeEnd'],
                    onChange: (dates, dateStrings) => {
                        let zfbJourIncome = this.props.form.getFieldValue('zfbJourIncome');
                        let zfbJourExpend = this.props.form.getFieldValue('zfbJourExpend');
                        let num = dates[1].diff(dates[0], 'months', true);
                        num = num.toFixed(1);
                        if (zfbJourIncome) {
                            zfbJourIncome = moneyParse(zfbJourIncome);
                            this.props.form.setFieldsValue({
                                zfbJourMonthIncome: moneyFormat(zfbJourIncome / num)
                            });
                        }
                        ;
                        if (zfbJourExpend) {
                            zfbJourExpend = moneyParse(zfbJourExpend);
                            this.props.form.setFieldsValue({
                                zfbJourMonthExpend: moneyFormat(zfbJourExpend / num)
                            });
                        }
                    }
                }],
                [{
                    title: '流水结息',
                    field: 'zfbJourInterest',
                    type: 'select',
                    key: 'interest'
                }],
                [{
                    field: 'zfbJourIncome',
                    title: '总收入(元)',
                    amount: true,
                    onChange: (v) => {
                        let jourDatetime = this.props.form.getFieldValue('jourDatetime1');
                        let zfbJourMonthIncome = this.props.form.getFieldValue('zfbJourMonthIncome');
                        if (jourDatetime) {
                            let num = jourDatetime[1].diff(jourDatetime[0], 'months', true);
                            v = moneyParse(v);
                            this.props.form.setFieldsValue({
                                zfbJourMonthIncome: moneyFormat(v / num)
                            });
                        }
                    }
                }, {
                    field: 'zfbJourExpend',
                    title: '总支出(元)',
                    amount: true,
                    onChange: (v) => {
                        let jourDatetime = this.props.form.getFieldValue('jourDatetime1');
                        let zfbJourMonthExpend = this.props.form.getFieldValue('zfbJourMonthExpend');
                        if (jourDatetime) {
                            let num = jourDatetime[1].diff(jourDatetime[0], 'months', true);
                            v = moneyParse(v);
                            this.props.form.setFieldsValue({
                                zfbJourMonthExpend: moneyFormat(v / num)
                            });
                        }
                    }
                }
                ],
                [{
                    field: 'zfbJourBalance',
                    title: '账户余额(元)',
                    amount: true
                }, {
                    field: 'zfbJourMonthIncome',
                    title: '月均收入(元)',
                    amount: true
                }, {
                    field: 'zfbJourMonthExpend',
                    title: '月均支出(元)',
                    amount: true
                }],
                [{
                    field: 'zfbJourRemark',
                    title: '流水说明',
                    type: 'textarea',
                    normalArea: true
                }],
                [{
                    field: 'zfbJourPic',
                    title: '流水图片',
                    type: 'img'
                }]
            ]
        }, {
            title: '申请人微信流水数据',
            close: true,
            items: [
                [{
                    field: 'jourDatetime2',
                    title: '流水时间',
                    type: 'date',
                    rangedate: ['wxJourDatetimeStart', 'wxJourDatetimeEnd'],
                    onChange: (dates, dateStrings) => {
                        let wxJourIncome = this.props.form.getFieldValue('wxJourIncome');
                        let wxJourExpend = this.props.form.getFieldValue('wxJourExpend');
                        let num = dates[1].diff(dates[0], 'months', true);
                        num = num.toFixed(1);
                        if (wxJourIncome) {
                            wxJourIncome = moneyParse(wxJourIncome);
                            this.props.form.setFieldsValue({
                                wxJourMonthIncome: moneyFormat(wxJourIncome / num)
                            });
                        }
                        ;
                        if (wxJourExpend) {
                            wxJourExpend = moneyParse(wxJourExpend);
                            this.props.form.setFieldsValue({
                                wxJourMonthExpend: moneyFormat(wxJourExpend / num)
                            });
                        }
                    }
                }],
                [{
                    title: '流水结息',
                    field: 'wxJouInterest',
                    type: 'select',
                    key: 'interest'
                }],
                [{
                    field: 'wxJourIncome',
                    title: '总收入(元)',
                    amount: true,
                    onChange: (v) => {
                        let jourDatetime = this.props.form.getFieldValue('jourDatetime2');
                        let wxJourMonthIncome = this.props.form.getFieldValue('wxJourMonthIncome');
                        if (jourDatetime) {
                            let num = jourDatetime[1].diff(jourDatetime[0], 'months', true);
                            v = moneyParse(v);
                            this.props.form.setFieldsValue({
                                wxJourMonthIncome: moneyFormat(v / num)
                            });
                        }
                    }
                }, {
                    field: 'wxJourExpend',
                    title: '总支出(元)',
                    amount: true,
                    onChange: (v) => {
                        let jourDatetime = this.props.form.getFieldValue('jourDatetime2');
                        let wxJourMonthExpend = this.props.form.getFieldValue('wxJourMonthExpend');
                        if (jourDatetime) {
                            let num = jourDatetime[1].diff(jourDatetime[0], 'months', true);
                            v = moneyParse(v);
                            this.props.form.setFieldsValue({
                                wxJourMonthExpend: moneyFormat(v / num)
                            });
                        }
                    }
                }],
                [{
                    field: 'wxJourBalance',
                    title: '账户余额(元)',
                    amount: true
                }, {
                    field: 'wxJourMonthIncome',
                    title: '月均收入(元)',
                    amount: true
                }, {
                    field: 'wxJourMonthExpend',
                    title: '月均支出(元)',
                    amount: true
                }],
                [{
                    field: 'wxJourRemark',
                    title: '流水说明',
                    type: 'textarea',
                    normalArea: true
                }],
                [{
                    field: 'wxJourPic',
                    title: '流水图片',
                    type: 'img'
                }]
            ]
        }, {title: '配偶银行流水数据',
            close: true,
            items: [
                [{
                    field: 'jourDatetime6',
                    title: '流水时间',
                    type: 'date',
                    rangedate: ['mateJourDatetimeStart', 'mateJourDatetimeEnd'],
                    onChange: (dates, dateStrings) => {
                        let mateJourIncome = this.props.form.getFieldValue('mateJourIncome');
                        let mateJourExpend = this.props.form.getFieldValue('mateJourExpend');
                        let num = dates[1].diff(dates[0], 'months', true);
                        num = num.toFixed(1);
                        if (mateJourIncome) {
                            mateJourIncome = moneyParse(mateJourIncome);
                            this.props.form.setFieldsValue({
                                mateJourMonthIncome: moneyFormat(mateJourIncome / num)
                            });
                        }
                        ;
                        if (mateJourExpend) {
                            mateJourExpend = moneyParse(mateJourExpend);
                            this.props.form.setFieldsValue({
                                mateJourMonthExpend: moneyFormat(mateJourExpend / num)
                            });
                        }
                    }
                }],
                [{
                    title: '流水结息',
                    field: 'mateJourInterest',
                    type: 'select',
                    key: 'interest'
                }],
                [{
                    field: 'mateJourIncome',
                    title: '总收入(元)',
                    amount: true,
                    onChange: (v) => {
                        let jourDatetime = this.props.form.getFieldValue('jourDatetime6');
                        let mateJourMonthIncome = this.props.form.getFieldValue('mateJourMonthIncome');
                        if (jourDatetime) {
                            let num = jourDatetime[1].diff(jourDatetime[0], 'months', true);
                            v = moneyParse(v);
                            this.props.form.setFieldsValue({
                                mateJourMonthIncome: moneyFormat(v / num)
                            });
                        }
                    }
                }, {
                    field: 'mateJourExpend',
                    title: '总支出(元)',
                    amount: true,
                    onChange: (v) => {
                        let jourDatetime = this.props.form.getFieldValue('jourDatetime6');
                        let mateJourMonthExpend = this.props.form.getFieldValue('mateJourMonthExpend');
                        if (jourDatetime) {
                            let num = jourDatetime[1].diff(jourDatetime[0], 'months', true);
                            v = moneyParse(v);
                            this.props.form.setFieldsValue({
                                mateJourMonthExpend: moneyFormat(v / num)
                            });
                        }
                    }
                }],
                [{
                    field: 'mateJourBalance',
                    title: '账户余额(元)',
                    amount: true
                }, {
                    field: 'mateJourMonthIncome',
                    title: '月均收入(元)',
                    amount: true
                }, {
                    field: 'mateJourMonthExpend',
                    title: '月均支出(元)',
                    amount: true
                }],
                [{
                    field: 'mateJourRemark',
                    title: '流水说明',
                    type: 'textarea',
                    normalArea: true
                }],
                [{
                    field: 'mateJourPic',
                    title: '流水图片',
                    type: 'img'
                }]
            ]
        }, {
            title: '配偶支付宝流水数据',
            close: true,
            items: [
                [{
                    field: 'jourDatetime4',
                    title: '流水时间',
                    type: 'date',
                    rangedate: ['mateZfbJourDatetimeStart', 'mateZfbJourDatetimeEnd'],
                    onChange: (dates, dateStrings) => {
                        let mateZfbJourIncome = this.props.form.getFieldValue('mateZfbJourIncome');
                        let mateZfbJourExpend = this.props.form.getFieldValue('mateZfbJourExpend');
                        let num = dates[1].diff(dates[0], 'months', true);
                        num = num.toFixed(1);
                        if (mateZfbJourIncome) {
                            mateZfbJourIncome = moneyParse(mateZfbJourIncome);
                            this.props.form.setFieldsValue({
                                mateZfbJourMonthIncome: moneyFormat(mateZfbJourIncome / num)
                            });
                        }
                        ;
                        if (mateZfbJourExpend) {
                            mateZfbJourExpend = moneyParse(mateZfbJourExpend);
                            this.props.form.setFieldsValue({
                                mateZfbJourMonthExpend: moneyFormat(mateZfbJourExpend / num)
                            });
                        }
                    }
                }],
                [{
                    title: '流水结息',
                    field: 'mateZfbJourInterest',
                    type: 'select',
                    key: 'interest'
                }],
                [{
                    field: 'mateZfbJourIncome',
                    title: '总收入(元)',
                    amount: true,
                    onChange: (v) => {
                        let jourDatetime = this.props.form.getFieldValue('jourDatetime4');
                        let mateZfbJourMonthIncome = this.props.form.getFieldValue('mateZfbJourMonthIncome');
                        if (jourDatetime) {
                            let num = jourDatetime[1].diff(jourDatetime[0], 'months', true);
                            v = moneyParse(v);
                            this.props.form.setFieldsValue({
                                mateZfbJourMonthIncome: moneyFormat(v / num)
                            });
                        }
                    }
                }, {
                    field: 'mateZfbJourExpend',
                    title: '总支出(元)',
                    amount: true,
                    onChange: (v) => {
                        let jourDatetime = this.props.form.getFieldValue('jourDatetime4');
                        let mateZfbJourMonthExpend = this.props.form.getFieldValue('mateZfbJourMonthExpend');
                        if (jourDatetime) {
                            let num = jourDatetime[1].diff(jourDatetime[0], 'months', true);
                            v = moneyParse(v);
                            this.props.form.setFieldsValue({
                                mateZfbJourMonthExpend: moneyFormat(v / num)
                            });
                        }
                    }
                }],
                [{
                    field: 'mateZfbJourBalance',
                    title: '账户余额(元)',
                    amount: true
                }, {
                    field: 'mateZfbJourMonthIncome',
                    title: '月均收入(元)',
                    amount: true
                }, {
                    field: 'mateZfbJourMonthExpend',
                    title: '月均支出(元)',
                    amount: true
                }],
                [{
                    field: 'mateZfbJourRemark',
                    title: '流水说明',
                    type: 'textarea',
                    normalArea: true
                }],
                [{
                    field: 'mateZfbJourPic',
                    title: '流水图片',
                    type: 'img'
                }]
            ]
        }, {
            title: '配偶微信流水数据',
            close: true,
            items: [
                [{
                    field: 'jourDatetime5',
                    title: '流水时间',
                    type: 'date',
                    rangedate: ['mateWxJourDatetimeStart', 'mateWxJourDatetimeEnd'],
                    onChange: (dates, dateStrings) => {
                        let mateWxJourIncome = this.props.form.getFieldValue('mateWxJourIncome');
                        let mateWxJourExpend = this.props.form.getFieldValue('mateWxJourExpend');
                        let num = dates[1].diff(dates[0], 'months', true);
                        num = num.toFixed(1);
                        if (mateWxJourIncome) {
                            mateWxJourIncome = moneyParse(mateWxJourIncome);
                            this.props.form.setFieldsValue({
                                mateWxJourMonthIncome: moneyFormat(mateWxJourIncome / num)
                            });
                        }
                        ;
                        if (mateWxJourExpend) {
                            mateWxJourExpend = moneyParse(mateWxJourExpend);
                            this.props.form.setFieldsValue({
                                mateWxJourMonthExpend: moneyFormat(mateWxJourExpend / num)
                            });
                        }
                    }
                }],
                [{
                    title: '流水结息',
                    field: 'mateWxJourInterest',
                    type: 'select',
                    key: 'interest'
                }],
                [{
                    field: 'mateWxJourIncome',
                    title: '总收入(元)',
                    amount: true,
                    onChange: (v) => {
                        let jourDatetime = this.props.form.getFieldValue('jourDatetime5');
                        let mateWxJourMonthIncome = this.props.form.getFieldValue('mateWxJourMonthIncome');
                        if (jourDatetime) {
                            let num = jourDatetime[1].diff(jourDatetime[0], 'months', true);
                            v = moneyParse(v);
                            this.props.form.setFieldsValue({
                                mateWxJourMonthIncome: moneyFormat(v / num)
                            });
                        }
                    }
                }, {
                    field: 'mateWxJourExpend',
                    title: '总支出(元)',
                    amount: true,
                    onChange: (v) => {
                        let jourDatetime = this.props.form.getFieldValue('jourDatetime5');
                        let mateWxJourMonthExpend = this.props.form.getFieldValue('mateWxJourMonthExpend');
                        if (jourDatetime) {
                            let num = jourDatetime[1].diff(jourDatetime[0], 'months', true);
                            v = moneyParse(v);
                            this.props.form.setFieldsValue({
                                mateWxJourMonthExpend: moneyFormat(v / num)
                            });
                        }
                    }
                }],
                [{
                    field: 'mateWxJourBalance',
                    title: '账户余额(元)',
                    amount: true
                }, {
                    field: 'mateWxJourMonthIncome',
                    title: '月均收入(元)',
                    amount: true
                }, {
                    field: 'mateWxJourMonthExpend',
                    title: '月均支出(元)',
                    amount: true
                }],
                [{
                    field: 'mateWxJourRemark',
                    title: '流水说明',
                    type: 'textarea',
                    normalArea: true
                }],
                [{
                    field: 'mateWxJourPic',
                    title: '流水图片',
                    type: 'img'
                }]
            ]
        }, {
            title: '担保人银行流水数据',
            close: true,
            items: [
                [{
                    field: 'jourDatetime9',
                    title: '流水时间',
                    type: 'date',
                    rangedate: ['guaJourDatetimeStart', 'guaJourDatetimeEnd'],
                    onChange: (dates, dateStrings) => {
                        let guaJourIncome = this.props.form.getFieldValue('guaJourIncome');
                        let guaJourExpend = this.props.form.getFieldValue('guaJourExpend');
                        let num = dates[1].diff(dates[0], 'months', true);
                        num = num.toFixed(1);
                        if (guaJourIncome) {
                            guaJourIncome = moneyParse(guaJourIncome);
                            this.props.form.setFieldsValue({
                                guaJourMonthIncome: moneyFormat(guaJourIncome / num)
                            });
                        }
                        ;
                        if (guaJourExpend) {
                            guaJourExpend = moneyParse(guaJourExpend);
                            this.props.form.setFieldsValue({
                                guaJourMonthExpend: moneyFormat(guaJourExpend / num)
                            });
                        }
                    }
                }],
                [{
                    title: '流水结息',
                    field: 'guaJourInterest',
                    type: 'select',
                    key: 'interest'
                }],
                [{
                    field: 'guaJourIncome',
                    title: '总收入(元)',
                    amount: true,
                    onChange: (v) => {
                        let jourDatetime = this.props.form.getFieldValue('jourDatetime9');
                        let guaJourMonthIncome = this.props.form.getFieldValue('guaJourMonthIncome');
                        if (jourDatetime) {
                            let num = jourDatetime[1].diff(jourDatetime[0], 'months', true);
                            v = moneyParse(v);
                            this.props.form.setFieldsValue({
                                guaJourMonthIncome: moneyFormat(v / num)
                            });
                        }
                    }
                }, {
                    field: 'guaJourExpend',
                    title: '总支出(元)',
                    amount: true,
                    onChange: (v) => {
                        let jourDatetime = this.props.form.getFieldValue('jourDatetime9');
                        let guaJourMonthExpend = this.props.form.getFieldValue('guaJourMonthExpend');
                        if (jourDatetime) {
                            let num = jourDatetime[1].diff(jourDatetime[0], 'months', true);
                            v = moneyParse(v);
                            this.props.form.setFieldsValue({
                                guaJourMonthExpend: moneyFormat(v / num)
                            });
                        }
                    }
                }],
                [{
                    field: 'guaJourBalance',
                    title: '账户余额(元)',
                    amount: true
                }, {
                    field: 'guaJourMonthIncome',
                    title: '月均收入(元)',
                    amount: true
                }, {
                    field: 'guaJourMonthExpend',
                    title: '月均支出(元)',
                    amount: true
                }],
                [{
                    field: 'guaJourRemark',
                    title: '流水说明',
                    type: 'textarea',
                    normalArea: true
                }],
                [{
                    field: 'guaJourPic',
                    title: '流水图片',
                    type: 'img'
                }]
            ]
        }, {
            title: '担保人支付宝流水数据',
            close: true,
            items: [
                [{
                    field: 'jourDatetime7',
                    title: '流水时间',
                    type: 'date',
                    rangedate: ['guaZfbJourDatetimeStart', 'guaZfbJourDatetimeEnd'],
                    onChange: (dates, dateStrings) => {
                        let guaZfbJourIncome = this.props.form.getFieldValue('guaZfbJourIncome');
                        let guaZfbJourExpend = this.props.form.getFieldValue('guaZfbJourExpend');
                        let num = dates[1].diff(dates[0], 'months', true);
                        num = num.toFixed(1);
                        if (guaZfbJourIncome) {
                            guaZfbJourIncome = moneyParse(guaZfbJourIncome);
                            this.props.form.setFieldsValue({
                                guaZfbJourMonthIncome: moneyFormat(guaZfbJourIncome / num)
                            });
                        }
                        if (guaZfbJourExpend) {
                            guaZfbJourExpend = moneyParse(guaZfbJourExpend);
                            this.props.form.setFieldsValue({
                                guaZfbJourMonthExpend: moneyFormat(guaZfbJourExpend / num)
                            });
                        }
                    }
                }],
                [{
                    title: '流水结息',
                    field: 'guaZfbJourInterest',
                    type: 'select',
                    key: 'interest'
                }],
                [{
                    field: 'guaZfbJourIncome',
                    title: '总收入(元)',
                    amount: true,
                    onChange: (v) => {
                        let jourDatetime = this.props.form.getFieldValue('jourDatetime7');
                        let guaZfbJourMonthIncome = this.props.form.getFieldValue('guaZfbJourMonthIncome');
                        if (jourDatetime) {
                            let num = jourDatetime[1].diff(jourDatetime[0], 'months', true);
                            v = moneyParse(v);
                            this.props.form.setFieldsValue({
                                guaZfbJourMonthIncome: moneyFormat(v / num)
                            });
                        }
                    }
                }, {
                    field: 'guaZfbJourExpend',
                    title: '总支出(元)',
                    amount: true,
                    onChange: (v) => {
                        let jourDatetime = this.props.form.getFieldValue('jourDatetime7');
                        let guaZfbJourMonthExpend = this.props.form.getFieldValue('guaZfbJourMonthExpend');
                        if (jourDatetime) {
                            let num = jourDatetime[1].diff(jourDatetime[0], 'months', true);
                            v = moneyParse(v);
                            this.props.form.setFieldsValue({
                                guaZfbJourMonthExpend: moneyFormat(v / num)
                            });
                        }
                    }
                }],
                [{
                    field: 'guaZfbJourBalance',
                    title: '账户余额(元)',
                    amount: true
                }, {
                    field: 'guaZfbJourMonthIncome',
                    title: '月均收入(元)',
                    amount: true
                }, {
                    field: 'guaZfbJourMonthExpend',
                    title: '月均支出(元)',
                    amount: true
                }],
                [{
                    field: 'guaZfbJourRemark',
                    title: '流水说明',
                    type: 'textarea',
                    normalArea: true
                }],
                [{
                    field: 'guaZfbJourPic',
                    title: '流水图片',
                    type: 'img'
                }]
            ]
        }, {
            title: '担保人微信流水数据',
            close: true,
            items: [
                [{
                    field: 'jourDatetime8',
                    title: '流水时间',
                    type: 'date',
                    rangedate: ['guaWxJourDatetimeStart', 'guaWxJourDatetimeEnd'],
                    onChange: (dates, dateStrings) => {
                        let guaWxJourIncome = this.props.form.getFieldValue('guaWxJourIncome');
                        let guaWxJourExpend = this.props.form.getFieldValue('guaWxJourExpend');
                        let num = dates[1].diff(dates[0], 'months', true);
                        num = num.toFixed(1);
                        if (guaWxJourIncome) {
                            guaWxJourIncome = moneyParse(guaWxJourIncome);
                            this.props.form.setFieldsValue({
                                guaWxJourMonthIncome: moneyFormat(guaWxJourIncome / num)
                            });
                        }
                        ;
                        if (guaWxJourExpend) {
                            guaWxJourExpend = moneyParse(guaWxJourExpend);
                            this.props.form.setFieldsValue({
                                guaWxJourMonthExpend: moneyFormat(guaWxJourExpend / num)
                            });
                        }
                    }
                }],
                [{
                    title: '流水结息',
                    field: 'guaWxJourInterest',
                    type: 'select',
                    key: 'interest'
                }],
                [{
                    field: 'guaWxJourIncome',
                    title: '总收入(元)',
                    amount: true,
                    onChange: (v) => {
                        let jourDatetime = this.props.form.getFieldValue('jourDatetime8');
                        let guaWxJourMonthIncome = this.props.form.getFieldValue('guaWxJourMonthIncome');
                        if (jourDatetime) {
                            let num = jourDatetime[1].diff(jourDatetime[0], 'months', true);
                            v = moneyParse(v);
                            this.props.form.setFieldsValue({
                                guaWxJourMonthIncome: moneyFormat(v / num)
                            });
                        }
                    }
                }, {
                    field: 'guaWxJourExpend',
                    title: '总支出(元)',
                    amount: true,
                    onChange: (v) => {
                        let jourDatetime = this.props.form.getFieldValue('jourDatetime8');
                        let guaWxJourMonthExpend = this.props.form.getFieldValue('guaWxJourMonthExpend');
                        if (jourDatetime) {
                            let num = jourDatetime[1].diff(jourDatetime[0], 'months', true);
                            v = moneyParse(v);
                            this.props.form.setFieldsValue({
                                guaWxJourMonthExpend: moneyFormat(v / num)
                            });
                        }
                    }
                }],
                [{
                    field: 'guaWxJourBalance',
                    title: '账户余额(元)',
                    amount: true
                }, {
                    field: 'guaWxJourMonthIncome',
                    title: '月均收入(元)',
                    amount: true
                }, {
                    field: 'guaWxJourMonthExpend',
                    title: '月均支出(元)',
                    amount: true
                }],
                [{
                    field: 'guaWxJourRemark',
                    title: '流水说明',
                    type: 'textarea',
                    normalArea: true
                }],
                [{
                    field: 'guaWxJourPic',
                    title: '流水图片',
                    type: 'img'
                }]
            ]
        }, {
            title: '评估车辆基础信息',
            items: [
                [{
                    title: '车辆品牌',
                    field: 'carBrand',
                    required: true
                }, {
                    title: '详细配置',
                    field: 'carSeries',
                    required: true
                }],
                [{
                    title: '车辆类型',
                    field: 'carType',
                    type: 'select',
                    key: 'car_type',
                    required: true
                }, {
                    field: 'carColor',
                    title: '颜色',
                    required: true
                }],
                [{
                    title: '车辆型号',
                    field: 'carModel',
                    required: true
                }, {
                    field: 'carFrameNo',
                    title: '车架号',
                    required: true
                }, {
                    field: 'carEngineNo',
                    title: '发动机号',
                    required: true
                }],
                [{
                    field: 'settleAddress',
                    title: '落户地点',
                    required: true
                }],
                [{
                    field: 'carPic',
                    title: '车辆照片',
                    type: 'img',
                    required: true
                }, {
                    field: 'carHgzPic',
                    title: '合格证照片',
                    type: 'img',
                    required: true
                }]
            ]
        }, {
            title: '车辆证件照片',
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
                }]
            ]
        }];

        let checkFields = [{
            field: 'approveNote',
            title: '审核说明',
            type: 'textarea',
            normalArea: true,
            readonly: !(this.isCheckCommissioner || this.isCheckDirector || this.isCheckRegionalManager)
        }];

        let buttons = [];
        let bizCode;
        if (this.isCheckCommissioner) {
            bizCode = 632121;
        } else if (this.isCheckDirector) {
            bizCode = 632122;
        } else if (this.isCheckRegionalManager) {
            bizCode = 632140;
        }

        if (this.isCheckCommissioner || this.isCheckDirector || this.isCheckRegionalManager) {
            fields = fields.concat(checkFields);

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
                    fetch(bizCode, data).then(() => {
                        this.props.cancelFetching();
                        showSucMsg('操作成功');
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(() => {
                        this.props.cancelFetching();
                    });
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
                    fetch(bizCode, data).then(() => {
                        this.props.cancelFetching();
                        showSucMsg('操作成功');
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(() => {
                        this.props.cancelFetching();
                    });
                }
            }, {
                title: '返回',
                handler: () => {
                    this.props.history.go(-1);
                }
            }];
        }

        if (!this.view && !this.isCheckCommissioner && !this.isCheckDirector && !this.isCheckRegionalManager) {
            buttons = [{
                title: '保存',
                handler: (params) => {
                    params.code = this.code;
                    params.dealType = '0';
                    params.operator = getUserId();
                    params.creditCode = this.props.pageData.creditCode;
                    params.applyUserName = this.props.pageData.applyUserName;
                    params.bizType = this.props.pageData.bizType;
                    params.idNo = this.props.pageData.idNo;
                    this.props.doFetching();
                    fetch(632200, params).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '发送',
                check: true,
                handler: (params) => {
                    params.code = this.code;
                    params.dealType = '1';
                    params.operator = getUserId();
                    params.creditCode = this.props.pageData.creditCode;
                    params.applyUserName = this.props.pageData.applyUserName;
                    params.bizType = this.props.pageData.bizType;
                    params.idNo = this.props.pageData.idNo;
                    this.props.doFetching();
                    fetch(632200, params).then(() => {
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

        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632206,
            buttons: buttons
        });
    }
}

export default InvestigateReportAddedit;
