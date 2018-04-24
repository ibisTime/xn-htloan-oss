import React from 'react';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/security/role';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';
import { Button, Upload } from 'antd';

@listWrapper(
  state => ({
    ...state.securityRole,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Role extends React.Component {
  render() {
    const fields = [{
      title: '角色名称',
      field: 'name',
      search: true
    }, {
      title: '角色等级',
      field: 'level',
      type: 'select',
      key: 'role_level',
      keyName: 'dkey',
      valueName: 'dvalue',
      search: true
    }, {
      title: '更新人',
      field: 'updater'
    }, {
      title: '更新时间',
      field: 'updateDatetime',
      type: 'datetime'
    }, {
      title: '备注',
      field: 'remark'
    }];
    const btnEvent = {
      change: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/security/role/menu?code=${selectedRowKeys[0]}&name=${selectedRows[0].name}`);
        }
      }
    };
    return this.props.buildList({ fields, btnEvent, pageCode: 630016, deleteCode: 630001 });
  }
}

export default Role;
