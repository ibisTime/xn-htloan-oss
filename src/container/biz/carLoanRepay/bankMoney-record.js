import React from 'react';
import {
    getQueryString,
    getUserId,
    showWarnMsg,
    showSucMsg,
    moneyParse,
    moneyFormat,
    monthFormat
} from 'common/js/util';
import { CollapseWrapper } from 'component/collapse-detail/collapse-detail';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/bankMoney-record';
import fetch from 'common/js/fetch';

@CollapseWrapper(
    state => state.bizBankMoneyRecord,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class BankMoneyRecord extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        let fields = [{
            title: '贷款信息',
            items: [
                [{
                    field: 'bizType',
                    title: '业务种类',
                    type: 'select',
                    key: 'budget_orde_biz_typer',
                    readonly: true
                }, {
                    field: 'loanPeriod',
                    title: '贷款期限',
                    type: 'select',
                    key: 'loan_period',
                    readonly: true
                }, {
                    field: 'isAdvanceFund',
                    title: '是否垫资',
                    type: 'select',
                    data: [{
                        key: '0',
                        value: '否'
                    }, {
                        key: '1',
                        value: '是'
                    }],
                    keyName: 'key',
                    valueName: 'value',
                    readonly: true
                }],
                [{
                    field: 'loanProductCode',
                    title: '贷款产品',
                    type: 'select',
                    listCode: '632177',
                    params: {
                        status: '2',
                        type: this.bizType,
                        loanBank: this.loanBank
                    },
                    keyName: 'code',
                    valueName: 'name',
                    readonly: true
                }, {
                    field: 'region',
                    title: '所属区域',
                    type: 'select',
                    key: 'region',
                    readonly: true
                }]
            ]
        }, {
            title: '拟购车辆信息',
            items: [
                [{
                    field: 'invoiceCompany',
                    title: '开票单位',
                    readonly: true
                }, {
                    field: 'invoicePrice',
                    title: '开票价(元)',
                    amount: true,
                    readonly: true
                }, {
                    field: 'originalPrice',
                    title: '市场指导价(元)',
                    amount: true,
                    readonly: true
                }],
                [{
                    field: 'firstAmount',
                    title: '首付金额(元)',
                    amount: true,
                    readonly: true
                }, {
                    field: 'firstRate',
                    title: '首付比例(%)',
                    readonly: true
                }, {
                    field: 'loanAmount',
                    title: '贷款额(元)',
                    amount: true,
                    readonly: true
                }],
                [{
                    field: 'monthDeposit',
                    title: '月供(元)',
                    amount: true,
                    readonly: true
                }, {
                    field: 'teamFee',
                    title: '团队服务费(元)',
                    amount: true,
                    readonly: true
                }],
                [{
                    title: '车辆品牌',
                    field: 'carBrand',
                    readonly: true
                }, {
                    title: '详细配置',
                    field: 'carSeries',
                    readonly: true
                }],
                [{
                    title: '车辆类型',
                    field: 'carType',
                    type: 'select',
                    key: 'car_type',
                    readonly: true
                }, {
                    field: 'carColor',
                    title: '颜色',
                    readonly: true
                }],
                [{
                    title: '车辆型号',
                    field: 'carModel',
                    readonly: true
                }, {
                    field: 'carFrameNo',
                    title: '车架号',
                    readonly: true
                }, {
                    field: 'carEngineNo',
                    title: '发动机号',
                    readonly: true
                }],
                [{
                    field: 'settleAddress',
                    title: '落户地点',
                    readonly: true
                }],
                [{
                    field: 'carPic',
                    title: '车辆照片',
                    type: 'img',
                    readonly: true
                }, {
                    field: 'carHgzPic',
                    title: '合格证照片',
                    type: 'img',
                    readonly: true
                }]
            ]
        }, {
            title: '申请人信息',
            items: [
                [{
                    field: 'applyUserName',
                    title: '姓名',
                    readonly: true
                }],
                [{
                    field: 'gender',
                    title: '性别',
                    type: 'select',
                    key: 'gender',
                    readonly: true
                }, {
                    field: 'age',
                    title: '年龄',
                    number: true,
                    positive: true,
                    readonly: true
                }, {
                    field: 'idNo',
                    title: '身份证号',
                    idCard: true,
                    readonly: true
                }],
                [{
                    field: 'marryState',
                    title: '婚姻状况',
                    type: 'select',
                    key: 'marry_state',
                    readonly: true
                }, {
                    field: 'nation',
                    title: '民族',
                    readonly: true
                }, {
                    field: 'education',
                    title: '学历',
                    type: 'select',
                    key: 'education',
                    readonly: true
                }],
                [{
                    field: 'political',
                    title: '政治面貌',
                    readonly: true
                }, {
                    field: 'familyNumber',
                    title: '家庭人口',
                    readonly: true
                }, {
                    field: 'mobile',
                    title: '联系电话',
                    mobile: true,
                    readonly: true
                }],
                [{
                    field: 'nowAddress',
                    title: '现居住地址',
                    readonly: true
                }, {
                    field: 'postCode1',
                    title: '现居住地址邮编',
                    readonly: true
                }, {
                    field: 'isCardMailAddress',
                    title: '是否卡邮寄地址',
                    type: 'select',
                    key: 'is_card_mail_address',
                    readonly: true
                }],
                [{
                    field: 'residenceAddress',
                    title: '户口所在地',
                    readonly: true
                }, {
                    field: 'postCode2',
                    title: '户口所在地邮编',
                    readonly: true
                }],
                [{
                    field: 'familyMainAsset',
                    title: '家庭主要财产(元)',
                    readonly: true
                }, {
                    field: 'mainAssetInclude',
                    title: '主要财产包括',
                    readonly: true
                }],
                [{
                    field: 'houseContract',
                    title: '购房合同及房产本',
                    type: 'img',
                    readonly: true
                }, {
                    title: '其他辅助资产',
                    field: 'assetPdf',
                    type: 'img',
                    readonly: true
                }, {
                    field: 'housePicture',
                    title: '家访照片',
                    type: 'img',
                    readonly: true
                }]
            ]
        }, {
            title: '工作情况',
            items: [
                [{
                    field: 'workCompanyName',
                    title: '单位名称',
                    readonly: true
                }],
                [{
                    field: 'workCompanyAddress',
                    title: '单位地址',
                    readonly: true
                }, {
                    field: 'workIsCardMailAddress',
                    title: '是否卡邮寄地址',
                    type: 'select',
                    key: 'is_card_mail_address',
                    readonly: true
                }],
                [{
                    field: 'workBelongIndustry',
                    title: '所属行业',
                    type: 'select',
                    key: 'work_belong_industry',
                    readonly: true
                }, {
                    field: 'workCompanyProperty',
                    title: '单位经济性质',
                    type: 'select',
                    key: 'work_company_property',
                    readonly: true
                }, {
                    field: 'mainIncome',
                    title: '主要收入来源',
                    type: 'select',
                    key: 'main_income',
                    readonly: true
                }],
                [{
                    field: 'position',
                    title: '职务',
                    type: 'select',
                    key: 'position',
                    readonly: true
                }, {
                    field: 'workProfession',
                    title: '职业',
                    type: 'select',
                    key: 'work_profession',
                    readonly: true
                }, {
                    field: 'postTitle',
                    title: '职称',
                    readonly: true
                }],
                [{
                    field: 'monthIncome',
                    title: '月收入(元)',
                    amount: true,
                    readonly: true
                }, {
                    field: 'workDatetime',
                    title: '何时进入现单位工作',
                    type: 'month',
                    readonly: true
                }],
                [{
                    field: 'selfCompanyArea',
                    title: '自营公司单位面积',
                    readonly: true
                }, {
                    field: 'employeeQuantity',
                    title: '员工数量',
                    number: true,
                    readonly: true
                }, {
                    field: 'enterpriseMonthOutput',
                    title: '企业月产值',
                    amount: true,
                    readonly: true
                }],
                [{
                    title: '其他工作描述',
                    field: 'otherWorkNote',
                    type: 'textarea',
                    normalArea: true,
                    readonly: true
                }],
                [{
                    title: '工作资料上传',
                    field: 'workAssetPdf',
                    type: 'img',
                    readonly: true
                }]
            ]
        }, {
            title: '配偶信息',
            // hidden: this.view ? false : this.state.mateStatus,
            items: [
                [{
                    field: 'mateName',
                    title: '姓名'
                }, {
                    field: 'mateMobile',
                    title: '手机号',
                    mobile: true
                }],
                [{
                    field: 'mateIdNo',
                    title: '身份证号',
                    idCard: true
                }, {
                    field: 'mateEducation',
                    title: '学历',
                    type: 'select',
                    key: 'education'
                }],
                [{
                    field: 'mateCompanyName',
                    title: '工作单位名称'
                }, {
                    field: 'mateCompanyContactNo',
                    title: '工作单位联系电话'
                }],
                [{
                    field: 'mateCompanyAddress',
                    title: '工作单位地址'
                }],
                [{
                    title: '其他辅助资产',
                    field: 'mateAssetPdf',
                    type: 'img'
                }]
            ]
        }, {
            title: '担保人信息',
            // hidden: this.view ? false : this.state.guaStatus,
            items: [
                [{
                    field: 'guaName',
                    title: '姓名'
                }, {
                    field: 'guaMobile',
                    title: '手机号',
                    mobile: true
                }],
                [{
                    field: 'guaIdNo',
                    title: '身份证号',
                    idCard: true
                }, {
                    field: 'guaPhone',
                    title: '固定电话'
                }],
                [{
                    field: 'guaCompanyName',
                    title: '工作单位名称'
                }, {
                    field: 'guaCompanyAddress',
                    title: '工作单位地址'
                }, {
                    field: 'guaHouseAssetAddress',
                    title: '担保人房产地址'
                }],
                [{
                    title: '其他辅助资产',
                    field: 'guaAssetPdf',
                    type: 'img'
                }]
            ]
        }, {
            title: '紧急联系人',
            items: [
                [{
                    field: 'emergencyName1',
                    title: '联系人1姓名',
                    readonly: true
                }, {
                    field: 'emergencyRelation1',
                    title: '与申请人关系',
                    type: 'select',
                    key: 'credit_user_relation',
                    readonly: true
                }, {
                    field: 'emergencyMobile1',
                    title: '手机号码',
                    mobile: true,
                    readonly: true
                }],
                [{
                    field: 'emergencyName2',
                    title: '联系人2姓名',
                    readonly: true
                }, {
                    field: 'emergencyRelation2',
                    title: '与申请人关系',
                    type: 'select',
                    key: 'credit_user_relation',
                    readonly: true
                }, {
                    field: 'emergencyMobile2',
                    title: '手机号码',
                    mobile: true,
                    readonly: true
                }]
            ]
        }, {
            title: '其他基本资料上传',
            items: [
                [{
                    field: 'hkBookPdf',
                    title: '户口本',
                    type: 'img',
                    readonly: true
                }, {
                    field: 'idCardPdf',
                    title: '身份证',
                    type: 'img',
                    readonly: true
                }, {
                    field: 'marryPdf',
                    title: '结婚证',
                    type: 'img',
                    readonly: true
                }],
                [{
                    field: 'otherPdf',
                    title: '其他资料',
                    type: 'img',
                    readonly: true
                }]
            ]
        }, {
            title: '申请人银行流水数据',
            // hidden: this.view ? false : this.state.applyUserAccount,
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
            // hidden: this.view ? false : this.state.applyUserAccount,
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
            // hidden: this.view ? false : this.state.applyUserAccount,
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
            // hidden: this.view ? false : this.state.mateAccount,
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
            // hidden: this.view ? false : this.state.mateAccount,
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
            // hidden: this.view ? false : this.state.mateAccount,
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
            // hidden: this.view ? false : this.state.guaAccount,
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
            // hidden: this.view ? false : this.state.guaAccount,
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
            // hidden: this.view ? false : this.state.guaAccount,
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
        }];

        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146,
            buttons: [{
              title: '确认',
              handler: (param) => {
                param.updater = getUserId();
                this.props.doFetching();
                fetch(632141, param).then((data) => {
                  showSucMsg('操作成功');
                  this.props.cancelFetching();
                  setTimeout(() => {
                    this.props.history.go(-1);
                  }, 1000);
                }).catch(this.props.cancelFetching);
              },
              check: true,
              type: 'primary'
            }, {
              title: '返回',
              handler: (param) => {
                this.props.history.go(-1);
              }
            }]
        });
    }
}

export default BankMoneyRecord;
