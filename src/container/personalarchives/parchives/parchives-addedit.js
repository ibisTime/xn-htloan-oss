import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/personalarchives/parchives-addedit.js';
import {
  getQueryString
} from 'common/js/util';
import {
  CollapseWrapper
} from 'component/collapse-detail/collapse-detail';

@CollapseWrapper(
  state => state.personalarchivesParchivesAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class parchivesAddedit extends React.Component {
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
                title: '姓名',
                field: 'realName',
                required: true
            }, {
                title: '身份证号码',
                field: 'idNo',
                required: true,
                idCard: true
            }, {
                title: '手机号码',
                field: 'mobile',
                required: true
            }], [{
                title: '工号',
                field: 'jobNo',
                required: true
            }, {
                title: '入职时间',
                field: 'entryDatetime',
                required: true,
                type: 'date'
            }, {
                title: '部门',
                field: 'departmentCode',
                type: 'select',
                required: true,
                listCode: 630106,
                params: {
                  typeList: ['2']
                },
                keyName: 'code',
                valueName: 'name',
                search: true
            }], [{
                title: '岗位',
                field: 'postCode',
                type: 'select',
                required: true,
                listCode: 630106,
                params: {
                  typeList: ['3']
                },
                keyName: 'code',
                valueName: 'name'
            }, {
                title: '上班班次',
                field: 'jobClasses',
                required: true,
                type: 'select',
                key: 'job_classes'
            }, {
                title: '出生年月',
                field: 'birthday',
                required: true,
                type: 'date'
            }], [{
                title: '性别',
                field: 'gender',
                required: true,
                type: 'select',
                key: 'gender'
            }, {
                title: '民族',
                field: 'nation',
                required: true
            }, {
                title: '籍贯',
                field: 'nativePlace',
                required: true
            }], [{
                title: '婚姻状况',
                field: 'marryStatus',
                required: true,
                type: 'select',
                key: 'marry_state'
            }, {
                title: '政治面貌',
                field: 'politics',
                required: true,
                type: 'select',
                key: 'politics'
            }, {
                title: '专业',
                field: 'major',
                required: true
            }], [{
                title: '学历',
                field: 'education',
                required: true,
                type: 'select',
                key: 'education'
            }, {
                title: '状态',
                field: 'workStatus',
                required: true,
                type: 'select',
                key: 'work_status'
            }, {
                title: '健康状况',
                field: 'health',
                required: true
            }], [{
                title: '工资卡账号',
                field: 'salaryCard',
                idCard: true
            }, {
                title: '开户行',
                field: 'bankName',
                type: 'select',
                listCode: 802116,
                keyName: 'bankCode',
                valueName: 'bankName'
            }, {
                title: '开户支行',
                field: 'subbranch'
            }, {
                title: '五险一金信息',
                field: 'fiveInsuranceInfo',
                type: 'select',
                key: 'five_insurance_info'
            }], [{
                title: '户籍地址',
                field: 'residenceAddress',
                required: true
            }, {
                title: '户籍性质',
                field: 'residenceProperty',
                required: true,
                type: 'select',
                key: 'residence_property'
            }, {
                title: '社保登记日期',
                field: 'socialSecurityRegDatetime',
                type: 'date'
            }], [{
                title: '现住址',
                field: 'currentAddress'
            }, {
                title: '紧急联系人',
                field: 'emergencyContact'
            }, {
                title: '紧急联系号码：',
                field: 'emergencyContactMobile',
                mobile: true
            }], [{
                title: '合同期限',
                field: 'contractDeadline',
                type: 'date'
            }, {
                title: '合同类型',
                field: 'contractType',
                type: 'select',
                key: 'contract_type'
            }, {
                title: '试用期时间',
                field: 'probationTime',
                required: true,
                type: 'select',
                key: 'probation_time'
            }], [{
                title: '转正日期',
                field: 'convertDatetime',
                type: 'date'
            }, {
                title: '离职日期',
                field: 'leaveDatetime',
                type: 'date'
            }], [{
                title: '门禁号',
                field: 'entranceNo',
                number: true
            }, {
                title: '考勤号',
                field: 'checkNo',
                number: true
            }, {
                title: '车牌号',
                field: 'carNo'
            }], [{
                title: '身份证复印件',
                field: 'idNoPdf',
                type: 'img'
            }, {
                title: '照片',
                field: 'photo',
                type: 'img'
            }], [{
                title: '微信号',
                field: 'wechat'
            }, {
                title: 'QQ',
                field: 'qq',
                number: true
            }], [{
                title: '社会关系',
                field: 'socialRelationList',
                type: 'o2m',
                options: {
                    add: true,
                    edit: true,
                    delete: true,
                    fields: [{
                        title: '成员姓名',
                        field: 'realName'
                    }, {
                        title: '与本人关系',
                        field: 'relation',
                        type: 'select',
                        key: 'borrower_relation'
                    }, {
                        title: '工作单位',
                        field: 'companyName'
                    }, {
                        title: '担任职务',
                        field: 'post'
                    }, {
                        title: '联系方式(电话)',
                        field: 'contact',
                        mobile: true
                    }]
                }
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
                field: 'commumicationFeeStandard',
                type: 'textarea',
                normalArea: true
            }, {
                title: '省会住宿报销标准',
                field: 'provincialBedStandard',
                type: 'textarea',
                normalArea: true
            }], [{
                title: '非省会住宿报销标准',
                field: 'noProvincialBedStandard',
                type: 'textarea',
                normalArea: true
            }], [{
                title: '出租车补助',
                field: 'taxiWard',
                amount: true
            }, {
                title: '市内交通现金补助',
                field: 'trafficAward',
                amount: true
            }], [{
                title: '电话现金补贴',
                field: 'mobileAward',
                amount: true
            }, {
                title: '餐补',
                field: 'mealAward',
                amount: true
            }]
        ]
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        addCode: 632800,
        editCode: 632802,
        detailCode: 632806
      });
  }
}

export default parchivesAddedit;
