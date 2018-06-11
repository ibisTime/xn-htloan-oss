import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/recruit/formal-addedit.js';
import {
  getQueryString,
  formatDate
} from 'common/js/util';
import {
  CollapseWrapper
} from 'component/collapse-detail/collapse-detail';

@CollapseWrapper(
  state => state.recruitFormalAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class formalAddedit extends React.Component {
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
                render: (v, d) => {
                    return d.user.realName;
                },
                readonly: true
            }, {
                title: '部门',
                field: 'departmentCode',
                listCode: 630106,
                params: {
                  typeList: '2'
                },
                keyName: 'code',
                valueName: 'name',
                readonly: true
            }, {
                title: '职位',
                field: 'postCode',
                required: true,
                listCode: 630106,
                params: {
                  typeList: '3'
                },
                keyName: 'code',
                valueName: 'name',
                readonly: true
            }],
            [{
                title: '入职时间',
                field: 'entryDatetime',
                type: 'date',
                required: true
            }, {
                title: '试用期开始',
                field: 'probationStartDatetime',
                formatter: (v, d) => {
                    return d.entryApply ? formatDate(d.entryApply.probationStartDatetime) : '-';
                }
            }, {
                title: '试用期结束',
                field: 'probationEndDatetime',
                formatter: (v, d) => {
                    return d.entryApply ? formatDate(d.entryApply.probationEndDatetime) : '-';
                }
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
                field: 'remitType',
                type: 'select',
                key: 'remit_type',
                required: true
            }, {
                title: '工作程序',
                field: 'remitType',
                type: 'select',
                key: 'remit_type',
                required: true
            }, {
                title: '工作素质',
                field: 'remitType',
                type: 'select',
                key: 'remit_type',
                required: true
            }, {
                title: '工作效率',
                field: 'remitType',
                type: 'select',
                key: 'remit_type',
                required: true
            }, {
                title: '自觉性',
                field: 'remitType',
                type: 'select',
                key: 'remit_type',
                required: true
            }, {
                title: '沟通能力',
                field: 'remitType',
                type: 'select',
                key: 'remit_type',
                required: true
            }, {
                title: '领导/合作能力',
                field: 'remitType',
                type: 'select',
                key: 'remit_type',
                required: true
            }, {
                title: '出勤',
                field: 'remitType',
                type: 'select',
                key: 'remit_type',
                required: true
            }, {
                title: '总分',
                field: 'remitType',
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
        detailCode: 632876
      });
  }
}

export default formalAddedit;
