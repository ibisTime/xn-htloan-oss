import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/recruit/apply-addedit.js';
import {getQueryString, getUserId, showSucMsg} from 'common/js/util';
import fetch from 'common/js/fetch';
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
                required: true,
                type: 'select',
                listCode: 630106,
                params: {
                  typeList: ['3']
                },
                keyName: 'code',
                valueName: 'name'
            }, {
                title: '编制人数',
                field: 'establishQuantity',
                required: true
            }, {
                title: '部门现有人数：',
                field: 'nowQuantity',
                required: true
            }], [{
                title: '申请补人数',
                field: 'applyQuantity',
                required: true
            }, {
                title: '需求到岗时间',
                field: 'requireDatetime',
                type: 'date',
                required: true
            }]
        ]
    }, {
        title: '招聘补充说明',
        items: [
            [{
                title: '被代替职位',
                field: 'replacePosition',
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
                field: 'note',
                type: 'textarea',
                normalArea: true
            }]
        ]
    }, {
        title: '招聘要求',
        items: [
            [{
                title: '性别',
                field: 'gender',
                type: 'select',
                key: 'gender'
            }, {
                title: '年龄',
                field: 'age'
            }, {
                title: '婚姻状况',
                field: 'marryState',
                type: 'select',
                key: 'marry_state'
            }],
            [{
                title: '文化程度',
                field: 'education',
                type: 'select',
                key: 'education'
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
        buttons: [{
          title: '确认',
          handler: (param) => {
            param.updater = getUserId();
            this.props.doFetching();
            fetch(632840, param).then(() => {
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

export default applyAddedit;
