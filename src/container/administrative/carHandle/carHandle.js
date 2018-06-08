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
} from '@redux/administrative/carHandle';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.administrativeCarHandle,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class carHandle extends React.Component {
  render() {
    const fields = [{
        title: '车牌号',
        field: 'carNo'
    }, {
        title: '违法日期',
        field: 'happenDatetime',
        type: 'datetime'
    }, {
        title: '违章人',
        field: 'realName',
        render: (v, d) => {
          return d.applyUserArchive.realName;
        }
    }, {
        title: '违章地点',
        field: 'address'
    }, {
        title: '违章行为',
        field: 'action'
    }, {
        title: '记分',
        field: 'score'
    }, {
        title: '罚款金额',
        field: 'punishAmount',
        amount: true
    }, {
        title: '处理情况',
        field: 'handleNote'
    }, {
        title: '申请时间',
        field: 'applyDatetime',
        type: 'datetime'
    }, {
        title: '状态',
        field: 'status',
        type: 'select',
        key: 'car_break_status',
        search: true
    }];
    return this.props.buildList({
      fields,
      pageCode: 632635,
      btnEvent: {
        check: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].status !== '0') {
            showWarnMsg('该状态不是待审核');
          } else {
            this.props.history.push(`/administrative/carHandle/check?code=${selectedRowKeys[0]}`);
          }
        }
      }
    });
  }
}

export default carHandle;
