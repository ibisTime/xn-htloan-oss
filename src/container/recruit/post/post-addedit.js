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
                required: true
            }, {
                title: '工号',
                field: 'entryDatetime',
                required: true
            }],
            [{
                title: '部门',
                field: 'realName',
                field: 'departmentCode',
                listCode: 630106,
                params: {
                  typeList: '2'
                },
                keyName: 'code',
                valueName: 'name',
                required: true
            }, {
                title: '新部门',
                field: 'gender',
                field: 'departmentCode',
                listCode: 630106,
                params: {
                  typeList: '2'
                },
                keyName: 'code',
                valueName: 'name',
                required: true
            }],
            [{
                title: '职位',
                field: 'nativePlace',
                listCode: 630106,
                params: {
                    typeList: '3'
                },
                keyName: 'code',
                valueName: 'name',
                required: true
            }, {
                title: '新职位',
                field: 'nation',
                listCode: 630106,
                params: {
                    typeList: '3'
                },
                keyName: 'code',
                valueName: 'name',
                required: true
            }],
            [{
                title: '开始日期',
                field: 'nativePlace',
                required: true
            }, {
                title: '结束日期',
                field: 'nation',
                required: true
            }],
            [{
                title: '缘由',
                field: ''
            }]
        ]
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 632866
      });
  }
}

export default postAddedit;
