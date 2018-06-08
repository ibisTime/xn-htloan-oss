import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/recruit/register-apply.js';
import {getQueryString, getUserId, showSucMsg, formatDate} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    CollapseWrapper
} from 'component/collapse-detail/collapse-detail';

@CollapseWrapper(
    state => state.recruitRegisterApply, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class registerApply extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '用户信息',
            items: [
                [{
                    title: '入职岗位',
                    field: 'position',
                    listCode: 630106,
                    type: 'select',
                    params: {
                        typeList: ['3']
                    },
                    keyName: 'code',
                    valueName: 'name',
                    required: true
                }, {
                    title: '入职时间',
                    field: 'entryDatetime',
                    type: 'date',
                    required: true
                }],
                [{
                    title: '姓名',
                    field: 'realName',
                    required: true
                }, {
                    title: '性别',
                    field: 'gender',
                    type: 'select',
                    key: 'gender',
                    required: true
                }, {
                    title: '出生年月',
                    field: 'birthday',
                    type: 'date',
                    required: true
                }],
                [{
                    title: '籍贯',
                    field: 'nativePlace',
                    required: true
                }, {
                    title: '民族',
                    field: 'nation',
                    required: true
                }, {
                    title: '学历',
                    field: 'education',
                    type: 'select',
                    key: 'education',
                    required: true
                }],
                [{
                    title: '健康状况',
                    field: 'health',
                    required: true
                }, {
                    title: '身份证号码',
                    field: 'idNo',
                    number: true,
                    idCard: true,
                    required: true
                }, {
                    title: '婚姻状况',
                    field: 'marryStatus',
                    type: 'select',
                    key: 'marry_state',
                    required: true
                }],
                [{
                    title: '手机号码',
                    field: 'mobile',
                    mobile: true,
                    required: true
                }, {
                    title: '紧急联系人',
                    field: 'emergencyContact',
                    required: true
                }, {
                    title: '紧急联系号码',
                    field: 'emergencyContactMobile',
                    mobile: true,
                    required: true
                }],
                [{
                    title: '照片',
                    field: 'photo',
                    type: 'img'
                }],
                [{
                    title: '户籍性质',
                    field: 'residenceProperty',
                    required: true,
                    type: 'select',
                    key: 'residence_property'
                }, {
                    title: '现住址',
                    field: 'nowAddress',
                    required: true
                }, {
                    title: '户籍地址',
                    field: 'residenceAddress',
                    required: true
                }],
                [{
                    title: '就业状况(目前是否与其他单位存在劳动关系)',
                    field: 'isOtherCompanyRelation',
                    type: 'select',
                    key: 'work_status',
                    required: true
                }],
                [{
                    title: '工作经历',
                    field: 'workExperienceList',
                    required: true,
                    type: 'o2m',
                    options: {
                        add: true,
                        edit: true,
                        delete: true,
                        fields: [{
                            title: '起止时间',
                            field: 'time',
                            rangedate: ['startDatetime', 'endDatetime'],
                            render: (v, d) => {
                                return formatDate(d.startDatetime) + '~' + formatDate(d.endDatetime);
                            },
                            type: 'date'
                        }, {
                            title: '工作单位',
                            field: 'companyName'
                        }, {
                            title: '职位',
                            field: 'position'
                        }, {
                            title: '离职原因',
                            field: 'leaveReason'
                        }, {
                            title: '证明人',
                            field: 'prover'
                        }, {
                            title: '证明人联系电话',
                            field: 'proverMobile',
                            mobile: true
                        }]
                    }
                }], [{
                    title: '主要业绩及工作能力简述',
                    field: 'mainPerform',
                    type: 'textarea',
                    normalArea: true
                }]
            ]
        }, {
            title: '是否有亲属从事本行业工作',
            items: [
                [{
                    title: '姓名',
                    field: 'relativeName',
                    required: true
                }, {
                    title: '与本人关系',
                    field: 'relativeRelation',
                    type: 'select',
                    key: 'borrower_relation',
                    required: true
                }, {
                    title: '职务',
                    field: 'relativePosition',
                    required: true
                }]
            ]
        }, {
            title: '薪酬结构状况',
            items: [
                [{
                    title: '试用期期限',
                    field: 'time1',
                    rangedate: ['probationStartDatetime', 'probationEndDatetime'],
                    type: 'date'
                }, {
                    title: '试用期工资(元/月)',
                    field: 'probationSalary',
                    amount: true
                }, {
                    title: '转正后基本工资(元/月)',
                    field: 'baseSalary',
                    amount: true,
                    required: true
                }, {
                    title: '转正后绩效工资(元/月)',
                    field: 'performSalary',
                    amount: true
                }], [{
                    title: '绩效工资考核标准',
                    field: 'performSalaryStandard',
                    type: 'textarea',
                    normalArea: true
                }, {
                    title: '季度奖考核标准',
                    field: 'quarterlyAwardStandard',
                    type: 'textarea',
                    normalArea: true
                }], [{
                    title: '通讯费报销标准',
                    field: 'communicatePayStandard',
                    type: 'textarea',
                    normalArea: true
                }, {
                    title: '省会住宿报销标准',
                    field: 'provincialBedStandard',
                    type: 'textarea',
                    normalArea: true
                }], [{
                    title: '非省会住宿报销标准',
                    field: 'nonProvincialBedStandard',
                    type: 'textarea',
                    normalArea: true
                }], [{
                    title: '出租车补助',
                    field: 'taxiStandard',
                    amount: true
                }, {
                    title: '市内交通现金补助',
                    field: 'trafficStandard',
                    amount: true
                }], [{
                    title: '电话现金补贴',
                    field: 'mobileStandard',
                    amount: true
                }, {
                    title: '餐补',
                    field: 'mealStandard',
                    amount: true
                }], [{
                    title: '工资卡账号',
                    field: 'salaryCardNo'
                }, {
                    title: '开户行',
                    field: 'bankCode',
                    type: 'select',
                    listCode: 802016,
                    keyName: 'code',
                    valueName: 'bankName'
                }, {
                    title: '开户行支行',
                    field: 'subbranch'
                }]
            ]
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 632856,
                buttons: [{
                  title: '确认',
                  handler: (param) => {
                    param.approveResult = '1';
                    param.approveNote = this.projectCode;
                    param.approveUser = getUserId();
                    param.operator = getUserId();
                    this.props.doFetching();
                    fetch(632860, param).then(() => {
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

export default registerApply;
