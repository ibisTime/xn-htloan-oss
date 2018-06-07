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
} from '@redux/attendance/travel';
import {
  showWarnMsg,
  showSucMsg
} from 'common/js/util';
import {
    listWrapper
} from 'common/js/build-list';
import {
  lowerFrame,
  onShelf,
  sendMsg
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.attendanceTravel,
        parentCode: state.menu.subMenuCode
    }), {
        setTableData,
        clearSearchParam,
        doFetching,
        setBtnList,
        cancelFetching,
        setPagination,
        setSearchParam,
        setSearchData
    }
)
class travel extends React.Component {
    render() {
        const fields = [{
            title: '申请人',
            field: 'ApplyUserName'
        }, {
            title: '工号',
            field: 'jobNo'
        }, {
            title: '部门',
            field: 'departmentName'
        }, {
            title: '职务',
            field: 'postCode'
        }, {
            title: '共计(小时)',
            field: 'totalHour'
        }, {
            title: '申请时间',
            field: 'applyDatetime',
            rangedate: ['startDatetime', 'endDatetime'],
            type: 'datetime',
            search: true
        }, {
            title: '办理节点',
            field: 'status',
            type: 'select',
            key: 'leave_apply_status',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632625,
            btnEvent: {
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '0') {
                        showWarnMsg('不是待审核的记录！');
                    } else {
                        this.props.history.push(`/attendance/travelss/addedit?v=1&code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default travel;