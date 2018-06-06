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
} from '@redux/attendance/leave';
import {
  showWarnMsg,
  showSucMsg
} from 'common/js/util';
import {
  Button,
  Upload,
  Modal
} from 'antd';
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
        ...state.attendanceLeave,
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
class leave extends React.Component {
    render() {
        const fields = [{
            title: '申请人',
            field: 'applyUser',
            search: true
        }, {
            title: '工号',
            field: 'jobNo',
            render: (v, d) => {
                return d.applyUserArchive[0].jobNo;
            }
        }, {
            title: '部门',
            field: 'departmentName',
            render: (v, d) => {
                return d.applyUserArchive[0].departmentName;
            }
        }, {
            title: '职务',
            field: 'postCode',
            render: (v, d) => {
                return d.applyUserArchive[0].postName;
            }
        }, {
            title: '请假类别',
            field: 'type',
            type: 'select',
            key: 'leave_apply_type',
            search: true
        }, {
            title: '共计(小时)',
            field: 'totalHour'
        }, {
            title: '申请时间',
            field: 'time1',
            rangedate: ['startDatetime-31', 'endDatetime-31'],
            type: 'date',
            search: true
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'leave_apply_status',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632895,
            btnEvent: {
              check: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/attendance/leave/check?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default leave;
