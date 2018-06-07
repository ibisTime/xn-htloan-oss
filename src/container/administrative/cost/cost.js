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
} from '@redux/administrative/cost';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.administrativeCost,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class cost extends React.Component {
  render() {
    const fields = [{
        title: '申请人',
        field: 'realName',
        render: (v, d) => {
            return d.applySysUser.realName;
        }
    }, {
        title: '申请部门',
        field: 'departmentCode',
        render: (v, d) => {
            return d.applySysUser.departmentCode;
        }
        type: 'select',
        listCode: 630106,
        params: {
            typeList: ['2']
        },
        keyName: 'code',
        valueName: 'name',
        search: true
    }, {
        title: '类型',
        field: 'type',
        type: 'select',
        key: 'fee_advance_apply_type'
    }, {
        title: '预支费用',
        field: 'amount',
        amount: true
    }, {
        title: '说明',
        field: 'applyNote'
    }, {
        title: '申请日期',
        field: 'applyDatetime',
        type: 'date',
        search: true
    }, {
        title: '状态',
        field: 'status',
        type: 'select',
        key: 'fee_advance_apply_status'
        search: true
    }];
    return this.props.buildList({
      fields,
      pageCode: 632675,
      btnEvent: {
        check: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/administrative/cost/check?code=${selectedRowKeys[0]}`);
          }
        }
      }
    });
  }
}

export default cost;
