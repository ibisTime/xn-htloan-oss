import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/recruit/formal-check.js';
import {getQueryString, getUserId, showSucMsg} from 'common/js/util';
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
class formalCheck extends React.Component {
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
                formatter: (v, d) => {
                    return d.user.realName;
                },
                readonly: true
            }, {
                title: '部门',
                field: 'departmentCode',
                type: 'select',
                formatter: (v, d) => {
                    if (d) {
                        return d.user.departmentCode;
                    }
                },
                listCode: 630106,
                params: {
                    typeList: ['2']
                },
                keyName: 'code',
                valueName: 'name',
                readonly: true
            }, {
                title: '职位',
                field: 'postCode',
                type: 'select',
                formatter: (v, d) => {
                    if (d) {
                        return d.user.postCode;
                    }
                },
                listCode: 630106,
                params: {
                    typeList: ['3']
                },
                keyName: 'code',
                valueName: 'name',
                readonly: true
            }, {
                title: '申请人',
                field: 'applyUser',
                formatter: (v, d) => {
                    return d.user.userId;
                },
                hidden: true
            }],
            [{
                title: '入职时间',
                field: 'entryDatetime',
                type: 'date',
                required: true
            }, {
                title: '试用期开始',
                field: 'probationStartDatetime',
                type: 'date',
                required: true
            }, {
                title: '试用期结束',
                field: 'probationEndDatetime',
                type: 'date',
                required: true
            }],
            [{
                title: '工作总结',
                field: 'workSummary'
            }],
            [{
                title: '是否转正',
                field: 'isFullWorker',
                type: 'select',
                required: true,
                data: [{
                    key: '0',
                    value: '否'
                }, {
                    key: '1',
                    value: '是'
                }],
                keyName: 'key',
                valueName: 'value'
            }, {
                title: '生效时间',
                field: 'effectDatetime',
                type: 'date',
                required: true
            }],
            [{
                title: '备注',
                field: 'remark'
            }]
        ]
    }, {
        title: '试用期评估表',
        field: 'probationAssessList',
        items: [
            [{
                title: '本岗位职责',
                field: 'post_duties',
                type: 'select',
                key: 'post_duties',
                formatter: (v, d) => {
                    if (d) {
                        return d.probationAssessList.find(p => {
                            return p.evalItem === 'post_duties';
                        }).grade;
                    }
                    return null;
                },
                onChange: this.handleChange,
                required: true
            }, {
                title: '工作程序',
                field: 'work_procedure',
                type: 'select',
                key: 'work_procedure',
                formatter: (v, d) => {
                    if (d) {
                        return d.probationAssessList.find(p => {
                            return p.evalItem === 'work_procedure';
                        }).grade;
                    }
                    return null;
                },
                onChange: this.handleChange,
                required: true
            }, {
                title: '工作素质',
                field: 'work_quality',
                type: 'select',
                key: 'work_quality',
                formatter: (v, d) => {
                    if (d) {
                        return d.probationAssessList.find(p => {
                            return p.evalItem === 'work_quality';
                        }).grade;
                    }
                    return null;
                },
                onChange: this.handleChange,
                required: true
            }, {
                title: '工作效率',
                field: 'work_efficiency',
                type: 'select',
                key: 'work_efficiency',
                formatter: (v, d) => {
                    if (d) {
                        return d.probationAssessList.find(p => {
                            return p.evalItem === 'work_efficiency';
                        }).grade;
                    }
                    return null;
                },
                onChange: this.handleChange,
                required: true
            }],
            [{
                title: '自觉性',
                field: 'consciousness',
                type: 'select',
                key: 'consciousness',
                formatter: (v, d) => {
                    if (d) {
                        return d.probationAssessList.find(p => {
                            return p.evalItem === 'consciousness';
                        }).grade;
                    }
                    return null;
                },
                onChange: this.handleChange,
                required: true
            }, {
                title: '沟通能力',
                field: 'communication_skills',
                type: 'select',
                key: 'communication_skills',
                formatter: (v, d) => {
                    if (d) {
                        return d.probationAssessList.find(p => {
                            return p.evalItem === 'communication_skills';
                        }).grade;
                    }
                    return null;
                },
                onChange: this.handleChange,
                required: true
            }, {
                title: '领导/合作能力',
                field: 'cooperative_ability',
                type: 'select',
                key: 'cooperative_ability',
                formatter: (v, d) => {
                    if (d) {
                        return d.probationAssessList.find(p => {
                            return p.evalItem === 'cooperative_ability';
                        }).grade;
                    }
                    return null;
                },
                onChange: this.handleChange,
                required: true
            }, {
                title: '出勤',
                field: 'attendance',
                type: 'select',
                key: 'attendance',
                formatter: (v, d) => {
                    if (d) {
                        return d.probationAssessList.find(p => {
                            return p.evalItem === 'attendance';
                        }).grade;
                    }
                    return null;
                },
                onChange: this.handleChange,
                required: true
            }],
            [{
                title: '总分',
                field: 'gradeAll',
                number: true
            }]
        ]
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 632876,
        buttons: [{
          title: '通过',
          handler: (param) => {
            param.approveResult = '1';
            param.updater = getUserId();
            this.props.doFetching();
            fetch(632871, param).then(() => {
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
            fetch(632871, param).then(() => {
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

export default formalCheck;
