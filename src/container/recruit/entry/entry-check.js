import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/recruit/entry-check.js';
import {getQueryString, getUserId, showSucMsg, formatDate} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
  CollapseWrapper
} from 'component/collapse-detail/collapse-detail';

@CollapseWrapper(
  state => state.recruitEntryCheck, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class entryCheck extends React.Component {
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
                type: 'select',
                listCode: 630106,
                params: {
                    typeList: ['3']
                },
                keyName: 'code',
                valueName: 'name',
                readonly: true
            }, {
                title: '入职时间',
                field: 'entryDatetime',
                type: 'date',
                readonly: true
            }],
            [{
                title: '姓名',
                field: 'realName',
                readonly: true
            }, {
                title: '性别',
                field: 'gender',
                type: 'select',
                key: 'gender',
                readonly: true
            }, {
                title: '出生年月',
                field: 'birthday',
                type: 'date',
                readonly: true
            }],
            [{
                title: '籍贯',
                field: 'nativePlace',
                readonly: true
            }, {
                title: '民族',
                field: 'nation',
                readonly: true
            }, {
                title: '学历',
                field: 'education',
                type: 'select',
                key: 'education',
                readonly: true
            }],
            [{
                title: '健康状况',
                field: 'health',
                readonly: true
            }, {
                title: '身份证号码',
                field: 'idNo',
                number: true,
                idCard: true,
                readonly: true
            }, {
                title: '婚姻状况',
                field: 'marryStatus',
                type: 'select',
                key: 'marry_state',
                readonly: true
            }],
            [{
                title: '手机号码',
                field: 'mobile',
                mobile: true,
                readonly: true
            }, {
                title: '紧急联系人',
                field: 'emergencyContact',
                readonly: true
            }, {
                title: '紧急联系号码',
                field: 'emergencyContactMobile',
                mobile: true,
                readonly: true
            }],
            [{
                title: '户籍性质',
                field: 'residenceProperty',
                readonly: true,
                type: 'select',
                key: 'residence_property'
            }, {
                title: '照片',
                field: 'photo',
                type: 'img',
                readonly: true
            }, {
                title: '现住址',
                field: 'nowAddress',
                readonly: true
            }, {
                title: '户籍地址',
                field: 'residenceAddress',
                readonly: true
            }],
            [{
                title: '就业状况(目前是否与其他单位存在劳动关系)',
                field: 'isOtherCompanyRelation',
                type: 'select',
                key: 'work_status',
                readonly: true
            }],
            [{
                title: '工作经历',
                field: 'workExperienceList',
                readonly: true,
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
                readonly: true
            }]
        ]
    }, {
        title: '是否有亲属从事本行业工作',
        items: [
            [{
                title: '姓名',
                field: 'relativeName',
                readonly: true
            }, {
                title: '与本人关系',
                field: 'relativeRelation',
                type: 'select',
                key: 'credit_user_relation',
                readonly: true
            }, {
                title: '职务',
                field: 'relativePosition',
                readonly: true
            }]
        ]
    }, {
        title: '薪酬结构状况',
        items: [
            [{
                title: '试用期期限',
                field: 'time1',
                rangedate: ['probationStartDatetime', 'probationEndDatetime'],
                type: 'date',
                readonly: true
            }, {
                title: '试用期工资(元/月)',
                field: 'probationSalary',
                amount: true,
                readonly: true
            }, {
                title: '转正后基本工资(元/月)',
                field: 'baseSalary',
                amount: true,
                readonly: true
            }, {
                title: '转正后绩效工资(元/月)',
                field: 'performSalary',
                amount: true,
                readonly: true
            }], [{
                title: '绩效工资考核标准',
                field: 'performSalaryStandard',
                readonly: true,
                type: 'textarea',
                normalArea: true
            }, {
                title: '季度奖考核标准',
                field: 'quarterlyAwardStandard',
                readonly: true,
                type: 'textarea',
                normalArea: true
            }], [{
                title: '通讯费报销标准',
                field: 'communicatePayStandard',
                readonly: true,
                type: 'textarea',
                normalArea: true
            }, {
                title: '省会住宿报销标准',
                field: 'provincialBedStandard',
                readonly: true,
                type: 'textarea',
                normalArea: true
            }], [{
                title: '非省会住宿报销标准',
                field: 'nonProvincialBedStandard',
                readonly: true,
                type: 'textarea',
                normalArea: true
            }], [{
                title: '出租车补贴',
                field: 'taxiStandard',
                amount: true,
                readonly: true
            }, {
                title: '市内交通现金补助',
                field: 'trafficStandard',
                amount: true,
                readonly: true
            }], [{
                title: '电话现金补贴',
                field: 'mobileStandard',
                amount: true,
                readonly: true
            }, {
                title: '餐补',
                field: 'mealStandard',
                amount: true,
                readonly: true
            }], [{
                title: '工资卡账号',
                field: 'salaryCardNo',
                readonly: true
            }, {
                title: '开户行',
                field: 'bankCode',
                type: 'select',
                listCode: 802016,
                keyName: 'code',
                valueName: 'bankName',
                readonly: true
            }, {
                title: '开户行支行',
                field: 'subbranch',
                readonly: true
            }]
        ]
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 632866,
        buttons: [{
          title: '通过',
          handler: (param) => {
            param.approveResult = '1';
            param.updater = getUserId();
            this.props.doFetching();
            fetch(632861, param).then(() => {
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
          title: '不通过',
          handler: (param) => {
            param.approveResult = '0';
            param.updater = getUserId();
            this.props.doFetching();
            fetch(632861, param).then(() => {
              showSucMsg('操作成功');
              this.props.cancelFetching();
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
            }).catch(this.props.cancelFetching);
          },
          check: true
        }, {
          title: '返回',
          handler: (param) => {
            this.props.history.go(-1);
          }
        }]
      });
  }
}

export default entryCheck;
