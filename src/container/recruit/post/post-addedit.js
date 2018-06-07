import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/recruit/post-addedit.js';
import {
  getQueryString
} from 'common/js/util';
import {
  CollapseWrapper
} from 'component/collapse-detail/collapse-detail';

@CollapseWrapper(
  state => state.recruitPostAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class postAddedit extends React.Component {
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
                field: 'position',
                formatter: (v, d) => {
                    return d.user.realName;
                },
                readonly: true
            }, {
                title: '工号',
                field: 'jobNo',
                render: (v, d) => {
                    if(d) {
                        return d.archice.jobNo;
                    }
                },
                readonly: true
            }],
            [{
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
                title: '新部门',
                field: 'newDepartment',
                type: 'select',
                listCode: 630106,
                params: {
                    typeList: ['2']
                },
                keyName: 'code',
                valueName: 'name',
                readonly: true
            }, {
                title: '申请人',
                field: 'applyUser',
                formatter: (v, d) => {
                    if (d) {
                        return d.user.userId;
                    }
                },
                hidden: true
            }],
            [{
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
                title: '新职位',
                field: 'newPosition',
                type: 'select',
                listCode: 630106,
                params: {
                    typeList: ['3']
                },
                keyName: 'code',
                valueName: 'name',
                readonly: true
            }],
            [{
                title: '开始日期',
                field: 'startDatetime',
                type: 'date',
                readonly: true
            }, {
                title: '结束日期',
                field: 'endDatetime',
                type: 'date',
                readonly: true
            }],
            [{
                title: '缘由',
                field: 'reason'
            }],
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
        detailCode: 632886
      });
  }
}

export default postAddedit;
