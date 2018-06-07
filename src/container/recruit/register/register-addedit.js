import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/recruit/register-addedit.js';
import {
  getQueryString
} from 'common/js/util';
import {
  CollapseWrapper
} from 'component/collapse-detail/collapse-detail';

@CollapseWrapper(
  state => state.recruitRegisterAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class registerAddedit extends React.Component {
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
                title: '性别',
                field: 'gender',
                type: 'select',
                key: 'gender',
                required: true
            }, {
                title: '出生年月',
                field: 'birthday',
                type: 'date'
            }], [{
                title: '籍贯',
                field: 'nativePlace'
            }, {
                title: '民族',
                field: 'nation'
            }, {
                title: '应聘岗位',
                field: 'position'
            }], [{
                title: '文化程度',
                field: 'education',
                type: 'selecct',
                key: 'education'
            }, {
                title: '身份证号码',
                field: 'idNo',
                number: true,
                idCard: true
            }, {
                title: '联系电话',
                field: 'contactMobile',
                mobile: true
            }], [{
                title: '户籍所在地',
                field: 'residenceAddress'
            }, {
                title: '特长技能',
                field: 'speciality'
            }, {
                title: '期望薪资',
                field: 'expectSalary',
                amount: true
            }], [{
                title: '现居住地址',
                field: 'nowAddress'
            }], [{
                title: '紧急联系人',
                field: 'emergencyContact'
            }, {
                title: '紧急联系人电话',
                field: 'emergencyContactMobile',
                mobile: true
            }, {
                title: '邮编',
                field: 'postcode',
                number: true
            }], [{
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
                title: '家庭成员',
                field: 'socialRelationList',
                required: true,
                type: 'o2m',
                options: {
                    add: true,
                    edit: true,
                    delete: true,
                    fields: [{
                        title: '姓名',
                        field: 'realName'
                    }, {
                        title: '与本人关系',
                        field: 'relation',
                        type: 'select',
                        key: 'credit_user_relation'
                    }, {
                        title: '工作单位',
                        field: 'companyName'
                    }, {
                        title: '职位',
                        field: 'post'
                    }, {
                        title: '电话',
                        field: 'contact',
                        mobile: true
                    }]
                }
            }], [{
                title: '受过何种奖励或专业训练',
                field: 'award'
            }, {
                title: '能否出差',
                field: 'isOut',
                type: 'selelct',
                data: [{
                    key: '0',
                    value: '否'
                }, {
                    key: '1',
                    value: '是'
                }],
                kayName: 'key',
                valueName: 'value'
            }, {
                title: '能否加班',
                field: 'postCode',
                type: 'selelct',
                data: [{
                    key: '0',
                    value: '否'
                }, {
                    key: '1',
                    value: '是'
                }],
                kayName: 'key',
                valueName: 'value'
            }], [{
                title: '是否曾在我公司应聘',
                field: 'isOnceRecruited',
                type: 'selelct',
                data: [{
                    key: '0',
                    value: '否'
                }, {
                    key: '1',
                    value: '是'
                }],
                kayName: 'key',
                valueName: 'value'
            }, {
                title: '是否有亲属或朋友在我司工作',
                field: 'isFriendWork',
                type: 'selelct',
                data: [{
                    key: '0',
                    value: '否'
                }, {
                    key: '1',
                    value: '是'
                }],
                kayName: 'key',
                valueName: 'value'
            }]
        ]
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        addCode: 632850,
        detailCode: 632856
      });
  }
}

export default registerAddedit;