import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/recruit/apply-addedit.js';
import {
  getQueryString
} from 'common/js/util';
import {
  CollapseWrapper
} from 'component/collapse-detail/collapse-detail';

@CollapseWrapper(
  state => state.recruitApplyAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class applyAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
        title: '招聘信息',
        items: [
            [{
                title: '招聘岗位',
                field: 'position',
                type: 'select',
                listCode: 630106,
                params: {
                  typeList: ['3']
                },
                keyName: 'code',
                valueName: 'name'
            }, {
                title: '编制人数',
                field: 'establishQuantity'
            }, {
                title: '部门现有人数：',
                field: 'nowQuantity'
            }], [{
                title: '申请补人数',
                field: 'applyQuantity'
            }, {
                title: '需求到岗时间',
                field: 'requireDatetime',
                type: 'date'
            }]
        ]
    }, {
        title: '招聘补充说明',
        items: [
            [{
                title: '被代替职位',
                field: 'replacePosition',
                required: true,
                type: 'select',
                listCode: 630106,
                params: {
                  typeList: ['3']
                },
                keyName: 'code',
                valueName: 'name'
            }, {
                title: '被替代者姓名',
                field: 'replaceRealName',
                type: 'select',
                listCode: 632807,
                keyName: 'userId',
                valueName: 'realName'
            }, {
                title: '原因',
                field: 'newApplyReason'
            }],
            [{
                title: '该职位现有人数为',
                field: 'positionNowQuantity'
            }, {
                title: '增加原因',
                field: 'positionAddReason'
            }, {
                title: '临时聘用时间',
                field: 'time',
                rangedate: ['tempStartDatetime', 'tempEndDatetime'],
                type: 'date'
            }],
            [{
                title: '说明',
                field: 'note'
            }]
        ]
    }, {
        title: '招聘要求',
        items: [
            [{
                title: '性别',
                field: 'gender',
                type: 'select',
                key: 'gender',
                required: true
            }, {
                title: '年龄',
                field: 'age'
            }, {
                title: '婚姻状况',
                field: 'marryState',
                type: 'select',
                key: 'marry_state',
                required: true
            }],
            [{
                title: '文化程度',
                field: 'education',
                type: 'select',
                key: 'education',
                required: true
            }, {
                title: '专业',
                field: 'major'
            }, {
                title: '专业资格',
                field: 'majorRequire'
            }],
            [{
                title: '能力要求',
                field: 'abilityRequire'
            }],
            [{
                title: '相关工作经验',
                field: 'experience'
            }]
        ]
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 632846
      });
  }
}

export default applyAddedit;
