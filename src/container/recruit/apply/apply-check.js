import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/recruit/apply-check.js';
import {getQueryString, getUserId, showSucMsg} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
  CollapseWrapper
} from 'component/collapse-detail/collapse-detail';

@CollapseWrapper(
  state => state.recruitApplyCheck, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class applyCheck extends React.Component {
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
                readonly: true,
                listCode: 630106,
                type: 'select',
                params: {
                  typeList: ['3']
                },
                keyName: 'code',
                valueName: 'name'
            }, {
                title: '编制人数',
                field: 'establishQuantity',
                readonly: true
            }, {
                title: '部门现有人数：',
                field: 'nowQuantity',
                readonly: true
            }], [{
                title: '申请补人数',
                field: 'applyQuantity',
                readonly: true
            }, {
                title: '需求到岗时间',
                field: 'requireDatetime',
                type: 'date',
                readonly: true
            }]
        ]
    }, {
        title: '招聘补充说明',
        items: [
            [{
                title: '被代替职位',
                field: 'replacePosition',
                listCode: 630106,
                type: 'select',
                params: {
                  typeList: ['3']
                },
                keyName: 'code',
                valueName: 'name',
                readonly: true
            }, {
                title: '被替代者姓名',
                field: 'replaceRealName',
                type: 'select',
                listCode: 632807,
                keyName: 'userId',
                valueName: 'realName',
                readonly: true
            }, {
                title: '原因',
                field: 'newApplyReason',
                readonly: true
            }],
            [{
                title: '该职位现有人数为',
                field: 'positionNowQuantity',
                readonly: true
            }, {
                title: '增加原因',
                field: 'positionAddReason',
                readonly: true
            }, {
                title: '临时聘用时间',
                field: 'time',
                rangedate: ['tempStartDatetime', 'tempEndDatetime'],
                type: 'date',
                readonly: true
            }],
            [{
                title: '说明',
                field: 'note',
                readonly: true
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
                readonly: true
            }, {
                title: '年龄',
                field: 'age',
                readonly: true
            }, {
                title: '婚姻状况',
                field: 'marryState',
                type: 'select',
                key: 'marry_state',
                readonly: true
            }],
            [{
                title: '文化程度',
                field: 'education',
                type: 'select',
                key: 'education',
                readonly: true
            }, {
                title: '专业',
                field: 'major',
                readonly: true
            }, {
                title: '专业资格',
                field: 'majorRequire',
                readonly: true
            }],
            [{
                title: '能力要求',
                field: 'abilityRequire',
                readonly: true
            }],
            [{
                title: '相关工作经验',
                field: 'experience',
                readonly: true
            }]
        ]
    }, {
        title: '审核说明',
        items: [
            [{
                title: '备注',
                field: 'remark'
            }]
        ]
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 632846,
        buttons: [{
          title: '通过',
          handler: (param) => {
            param.approveResult = '1';
            param.updater = getUserId();
            this.props.doFetching();
            fetch(632841, param).then(() => {
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
            fetch(632841, param).then(() => {
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

export default applyCheck;
