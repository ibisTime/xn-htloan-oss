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
} from '@redux/personalarchives/parchives';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.personalarchivesParchives,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class parchives extends React.Component {
  render() {
    const fields = [{
      title: '姓名',
      field: 'realName',
      search: true
    }, {
      title: '工号',
      field: 'jobNo'
    }, {
      title: '性别',
      field: 'gender',
      type: 'select',
      key: 'gender'
    }, {
      title: '部门',
      field: 'departmentCode',
      type: 'select',
      listCode: 630106,
      params: {
        typeList: ['2']
      },
      keyName: 'code',
      valueName: 'name',
      search: true
    }, {
      title: '岗位',
      field: 'postCode',
      type: 'select',
      listCode: 630106,
      params: {
        typeList: ['3']
      },
      keyName: 'code',
      valueName: 'name',
      search: true
    }, {
      title: '手机号',
      field: 'mobile'
    }, {
      title: '生日',
      field: 'birthday',
      type: 'date'
    }];
    return this.props.buildList({
      fields,
      pageCode: 632805,
      searchParams: {
          workStatusList: ['1', '2']
      },
      btnEvent: {
        enter: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/personalarchives/parchives/enter?code=${selectedRowKeys[0]}`);
          }
        }
      }
    });
  }
}

export default parchives;
