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
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, showSucMsg, dateTimeFormat} from 'common/js/util';

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
            field: 'departmentName',
            render: (v, d) => {
                return d.applySysUser.departmentName;
            }
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
            title: '申请时间',
            field: 'applyDatetime',
            rangedate: ['applyDateStart', 'applyDateEnd'],
            type: 'date',
            render: dateTimeFormat,
            search: true
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'fee_advance_apply_status',
            search: true
        }, {
            title: '说明',
            field: 'applyNote'
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
                    } else if (selectedRows[0].status !== '0') {
                        showWarnMsg('不是待审核的状态');
                    } else {
                        this.props.history.push(`/administrative/cost/addedit?v=1&isCheck=1&code=${selectedRowKeys[0]}`);
                    }
                },
                finance: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '1') {
                        showWarnMsg('不是财务审核的状态');
                    } else {
                        this.props.history.push(`/administrative/cost/addedit?v=1&isFinance=1&code=${selectedRowKeys[0]}`);
                    }
                },
                certain: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '3') {
                        showWarnMsg('不是确认放款的状态');
                    } else {
                        this.props.history.push(`/administrative/cost/addedit?v=1&isCertain=1&code=${selectedRowKeys[0]}`);
                    }
                },
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/administrative/cost/detail?v=1&code=${selectedRowKeys[0]}&status=${selectedRows[0].status}`);
                    }
                }
            }
        });
    }
}

export default cost;
