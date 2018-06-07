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
} from '@redux/administrative/welfare';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.administrativeWelfare,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class welfare extends React.Component {
  render() {
    const fields = [{
        title: '申请日期',
        field: 'applyDatetime',
        type: 'date',
        search: true
    }, {
        title: '申请人',
        field: 'happenDatetime',
        render: (v, d) => {
            return d.applyUserArchive.realName;
        }
    }, {
        title: '申请部门',
        field: 'departmentCode',
        render: (v, d) => {
            return d.applyUserArchive.departmentCode;
        }
        type: 'select',
        listCode: 630106,
        params: {
            typeList: '2'
        },
        keyName: 'code',
        valueName: 'name',
        search: true
    }, {
        title: '职位',
        field: 'postCode',
        render: (v, d) => {
            return d.applyUserArchive.postCode;
        }
        type: 'select',
        listCode: 630106,
        params: {
            typeList: '3'
        },
        keyName: 'code',
        valueName: 'name',
    }, {
        title: '申请事宜',
        field: 'applyNote'
    }, {
        title: '备注',
        field: 'remark'
    }, {
        title: '状态',
        field: 'status',
        type: 'select',
        key: ''
        search: true
    }];
    return this.props.buildList({
      fields,
      pageCode: 632665,
      btnEvent: {
        check: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/administrative/welfare/check?code=${selectedRowKeys[0]}`);
          }
        }
      }
    });
  }
}

export default welfare;
