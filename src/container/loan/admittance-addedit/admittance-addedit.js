import React from 'react';
import {
    getQueryString,
    getUserId,
    showWarnMsg,
    showSucMsg,
    moneyParse,
    moneyFormat
} from 'common/js/util';
import { CollapseWrapper } from 'component/collapse-detail/collapse-detail';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loan/admittance-addedit';
import fetch from 'common/js/fetch';

@CollapseWrapper(
    state => state.loanAdmittanceAddedit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class AdmittanceAddEdit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.isCheckCommissioner = !!getQueryString('isCheckCommissioner', this.props.location.search);
        this.isCheckDirector = !!getQueryString('isCheckDirector', this.props.location.search);
        this.rateData = {
        };
        this.wanFactor = 0;
    }

    render() {
        let fields = [{
            title: '贷款信息',
            items: [
                [{
                    field: 'loanProductCode',
                    title: '贷款产品',
                    type: 'select',
                    listCode: '632177',
                    params: {
                        status: '2'
                    },
                    keyName: 'code',
                    valueName: 'name',
                    required: true,
                    onChange: (v) => {
                        let loanProductList = this.props.selectData.loanProductCode;
                        let wanFactor = 0;
                        loanProductList.map((item) => {
                            if (item.code === v) {
                                wanFactor = item.wanFactor;
                            }
                        });

                        if (!v) {
                            this.wanFactor = 0;
                        }
                        let loanAmount = this.props.form.getFieldValue('loanAmount');
                        if (loanAmount) {
                            this.wanFactor = wanFactor;
                            // 月供=万元系数*贷款额/10000
                            this.props.form.setFieldsValue({
                                monthDeposit: moneyFormat((wanFactor * (moneyParse(loanAmount))) / 10000000)
                            });
                        }
                    }
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
                    required: true
                }, {
                    field: 'companyFee',
                    title: '公司服务费',
                    amount: true,
                    required: true
                }]
            ]
        }, {
            title: '拟购车辆信息',
            items: [
                [{
                    field: 'bizType',
                    title: '业务种类',
                    type: 'select',
                    key: 'budget_orde_biz_typer',
                    required: true
                }, {
                    field: 'loanPeriod',
                    title: '贷款期限',
                    type: 'select',
                    key: 'loan_period',
                    required: true
                }],
                [{
                    field: 'invoiceCompany',
                    title: '开票单位',
                    required: true
                }, {
                    field: 'invoicePrice',
                    title: '开票价(元)',
                    amount: true,
                    onChange: (v, data) => {
                        let firstAmount = this.props.form.getFieldValue('firstAmount');
                        let loanAmount = 0;
                        if (firstAmount) {
                            v = moneyParse(v);
                            firstAmount = moneyParse(firstAmount);
                            loanAmount = moneyFormat(v - firstAmount);
                            this.props.form.setFieldsValue({
                                firstRate: (firstAmount / v * 100).toFixed(2),
                                loanAmount: loanAmount
                            });
                        }

                        let wanFactor = this.wanFactor;
                        if (wanFactor !== 0) {
                            // 月供=万元系数*贷款额/10000
                            this.props.form.setFieldsValue({
                                monthDeposit: moneyFormat((wanFactor * (moneyParse(loanAmount))) / 10000000)
                            });
                        }
                    },
                    required: true
                }],
                [{
                    field: 'originalPrice',
                    title: '市场指导价(元)',
                    amount: true,
                    required: true
                }, {
                    field: 'firstAmount',
                    title: '首付金额(元)',
                    amount: true,
                    onChange: (v) => {
                        let invoicePrice = this.props.form.getFieldValue('invoicePrice');
                        let loanAmount = 0;
                        if (invoicePrice) {
                            v = moneyParse(v);
                            invoicePrice = moneyParse(invoicePrice);
                            loanAmount = moneyFormat(invoicePrice - v);
                            this.props.form.setFieldsValue({
                                firstRate: (v / invoicePrice * 100).toFixed(2),
                                loanAmount: loanAmount
                            });
                        }

                        let wanFactor = this.wanFactor;
                        if (wanFactor !== 0) {
                            // 月供=万元系数*贷款额/10000
                            this.props.form.setFieldsValue({
                                monthDeposit: moneyFormat((wanFactor * (moneyParse(loanAmount))) / 10000000)
                            });
                        }
                    },
                    required: true
                }, {
                    field: 'firstRate',
                    title: '首付比例(%)',
                    required: true
                }],
                [{
                    field: 'loanAmount',
                    title: '贷款额(元)',
                    amount: true,
                    required: true,
                    onChange: (value) => {
                        let wanFactor = this.wanFactor;
                        if (wanFactor !== 0) {
                            // 月供=万元系数*贷款额/10000
                            this.props.form.setFieldsValue({
                                monthDeposit: moneyFormat((wanFactor * (moneyParse(value))) / 10000000)
                            });
                        }
                    }
                }, {
                    field: 'monthDeposit',
                    title: '月供(元)',
                    amount: true,
                    required: true
                }, {
                    field: 'settleAddress',
                    title: '落户地点',
                    required: true
                }],
                [{
                    title: '品牌',
                    field: 'carBrand',
                    required: true
                }, {
                    title: '车系',
                    field: 'carSeries',
                    required: true
                }, {
                    title: '车型',
                    field: 'carModel',
                    required: true
                }, {
                    field: 'carColor',
                    title: '颜色',
                    required: true
                }],
                [{
                    field: 'carFrameNo',
                    title: '车架号',
                    required: true
                }, {
                    field: 'carHgzNo',
                    title: '合格证号',
                    required: true
                }, {
                    field: 'carEngineNo',
                    title: '发动机号',
                    required: true
                }],
                [{
                    field: 'carPic',
                    title: '车辆照片',
                    type: 'img',
                    required: true
                }, {
                    field: 'carHgzPic',
                    title: '合格证',
                    type: 'img',
                    required: true
                }]
            ]
        }, {
            title: '申请人信息',
            items: [
                [{
                    field: 'applyUserName',
                    title: '申请人姓名',
                    required: true
                }],
                [{
                    field: 'gender',
                    title: '性别',
                    type: 'select',
                    key: 'gender',
                    required: true
                }, {
                    field: 'marryState',
                    title: '婚姻状况',
                    type: 'select',
                    key: 'marry_state',
                    required: true
                }],
                [{
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
                    field: 'idNo',
                    title: '身份证号',
                    idCard: true,
                    required: true
                }, {
                    field: 'familyNumber',
                    title: '家庭人口',
                    required: true
                }, {
                    field: 'mobile',
                    title: '手机号',
                    mobile: true,
                    required: true
                }],
                [{
                    field: 'nowAddress',
                    title: '现居住地址',
                    required: true
                }, {
                    field: 'postCode1',
                    title: '邮编1',
                    required: true
                }],
                [{
                    field: 'residenceAddress',
                    title: '户口所在地',
                    required: true
                }, {
                    field: 'postCode2',
                    title: '邮编2',
                    required: true
                }],
                [{
                    field: 'familyMainAsset',
                    title: '家庭主要财产(万元)',
                    required: true
                }, {
                    field: 'mainAssetInclude',
                    title: '主要财产包括',
                    required: true
                }, {
                    field: 'mainIncome',
                    title: '主要收入来源',
                    type: 'select',
                    key: 'main_income',
                    required: true
                }],
                [{
                    field: 'workCompanyName',
                    title: '工作单位名称',
                    required: true
                }, {
                    field: 'workCompanyProperty',
                    title: '单位经济性质',
                    type: 'select',
                    key: 'work_company_property'
                }],
                [{
                    field: 'workCompanyAddress',
                    title: '工作单位地址',
                    required: true
                }],
                [{
                    field: 'workBelongIndustry',
                    title: '所属行业',
                    type: 'select',
                    key: 'work_belong_industry'
                }, {
                    field: 'workProfession',
                    title: '职业',
                    type: 'select',
                    key: 'work_profession'
                }, {
                    field: 'position',
                    title: '职位',
                    type: 'select',
                    key: 'position'
                }],
                [{
                    field: 'postTitle',
                    title: '职称',
                    required: true
                }, {
                    field: 'workDatetime',
                    title: '何时进入现单位工作',
                    type: 'date'
                }, {
                    field: 'monthIncome',
                    title: '月收入(元)',
                    amount: true
                }],
                [{
                    field: 'selfCompanyArea',
                    title: '自营公司单位面积'
                }, {
                    field: 'employeeQuantity',
                    title: '员工数量'
                }, {
                    field: 'enterpriseMonthOutput',
                    title: '企业月产值',
                    amount: true
                }],
                [{
                    title: '其它资产资料',
                    field: 'assetPdf',
                    type: 'img'
                }]
            ]
        }, {
            title: '配偶信息',
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
                    title: '其它资产资料',
                    field: 'mateAssetPdf',
                    type: 'img'
                }]
            ]
        }, {
            title: '担保人信息',
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
                    title: '其它资产资料',
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
                    required: true
                }, {
                    field: 'emergencyRelation1',
                    title: '与申请人关系',
                    type: 'select',
                    key: 'credit_user_relation',
                    required: true
                }, {
                    field: 'emergencyMobile1',
                    title: '手机号码',
                    mobile: true,
                    required: true
                }],
                [{
                    field: 'emergencyName2',
                    title: '联系人2姓名'
                }, {
                    field: 'emergencyRelation2',
                    title: '与申请人关系',
                    type: 'select',
                    key: 'credit_user_relation'
                }, {
                    field: 'emergencyMobile2',
                    title: '手机号码',
                    mobile: true
                }]
            ]
        }, {
            title: '申请人支付宝流水数据',
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
                    field: 'zfbJourIncome',
                    title: '收入(元)',
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
                },
                    {
                        field: 'zfbJourExpend',
                        title: '支出(元)',
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
                    title: '备注',
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
                    field: 'wxJourIncome',
                    title: '收入(元)',
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
                    title: '支出(元)',
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
                    title: '备注',
                    type: 'textarea',
                    normalArea: true
                }],
                [{
                    field: 'wxJourPic',
                    title: '流水图片',
                    type: 'img'
                }]
            ]
        }, {
            title: '申请人银行流水数据',
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
                    field: 'jourIncome',
                    title: '收入(元)',
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
                    title: '支出(元)',
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
                    title: '备注',
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
            title: '配偶支付宝流水数据',
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
                    field: 'mateZfbJourIncome',
                    title: '收入(元)',
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
                    title: '支出(元)',
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
                    title: '备注',
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
                    field: 'mateWxJourIncome',
                    title: '收入(元)',
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
                    title: '支出(元)',
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
                    title: '备注',
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
            title: '配偶银行流水数据',
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
                    field: 'mateJourIncome',
                    title: '收入(元)',
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
                    title: '支出(元)',
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
                    title: '备注',
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
            title: '担保人支付宝流水数据',
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
                    field: 'guaZfbJourIncome',
                    title: '收入(元)',
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
                    title: '支出(元)',
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
                    title: '备注',
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
                    field: 'guaWxJourIncome',
                    title: '收入(元)',
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
                    title: '支出(元)',
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
                    title: '备注',
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
            title: '担保人银行流水数据',
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
                    field: 'guaJourIncome',
                    title: '收入(元)',
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
                    title: '支出(元)',
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
                    title: '备注',
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
            title: '家庭房产情况及家访',
            items: [
                [{
                    field: 'houseContract',
                    title: '购房合同',
                    type: 'img'
                }, {
                    field: 'housePicture',
                    title: '房屋照片',
                    type: 'img'
                }]
            ]
        }];

        let checkFields = [{
            field: 'approveNote',
            title: '审核说明',
            type: 'textarea',
            normalArea: true,
            readonly: !(this.isCheckCommissioner || this.isCheckDirector)
        }];

        let buttons = [];

        if (this.isCheckCommissioner || this.isCheckDirector) {
            fields = fields.concat(checkFields);

            buttons = [{
                title: '通过',
                check: true,
                handler: (params) => {
                    params.approveResult = '1';
                    params.operator = getUserId();
                    let bizCode = this.isCheckCommissioner ? 632121 : 632122;
                    this.props.doFetching();
                    fetch(bizCode, params).then(() => {
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
                    params.approveResult = '0';
                    params.operator = getUserId();
                    let bizCode = this.isCheckCommissioner ? 632121 : 632122;
                    this.props.doFetching();
                    fetch(bizCode, params).then(() => {
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

        if (!this.view && !this.isCheckCommissioner && !this.isCheckDirector) {
            buttons = [{
                title: '保存',
                check: true,
                handler: (params) => {
                    params.code = this.code;
                    params.dealType = '0';
                    params.operator = getUserId();
                    params.creditCode = this.props.pageData.creditCode;
                    this.props.doFetching();
                    fetch(632120, params).then(() => {
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
                    this.props.doFetching();
                    fetch(632120, params).then(() => {
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
            editCode: 632120,
            detailCode: 632146,
            buttons: buttons
        });
    }
}

export default AdmittanceAddEdit;
