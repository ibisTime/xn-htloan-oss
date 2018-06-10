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
} from '@redux/attendance/summary';
import {
    showWarnMsg,
    showSucMsg,
    dateTimeFormat
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
        ...state.attendanceSummary,
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
class summary extends React.Component {
    render() {
        const fields = [{
            title: '姓名',
            field: 'realName'
        }, {
            title: '工号',
            field: 'jobNo'
        }, {
            title: '部门名称',
            field: 'departmentName'
        }, {
            title: '应出勤天数',
            field: 'shouldCheckingDays'
        }, {
            title: '实际出勤天数',
            field: 'actualCheckingDays'
        }, {
            title: '漏签次数',
            field: 'suppleSignCount'
        }, {
            title: '请假小时',
            field: 'leaveHours'
        }, {
            title: '调休小时',
            field: 'dayOffHours'
        }, {
            title: '加班小时',
            field: 'overtimeHours'
        }, {
            title: '出差小时',
            field: 'travelHours'
        }, {
            title: '公出小时',
            field: 'officeTravelHours'
        }, {
            title: '日期至',
            field: 'date',
            type: 'date',
            search: true,
            hidden: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632686,
            searchParams: {
                date: dateTimeFormat(new Date(), 'yyyy-dd-MM')
            },
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

export default summary;
