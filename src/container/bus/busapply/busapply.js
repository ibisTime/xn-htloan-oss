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
} from '@redux/bus/busapply';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, formatDate } from 'common/js/util';

@listWrapper(
    state => ({
        ...state.busBusapply,
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
class Busapply extends React.Component {
    render() {
        const fields = [{
            title: '领用人',
            field: 'applyUserName',
            search: true
        }, {
            title: '所属部门',
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
            title: '申领车辆',
            field: 'busMobile'
        }, {
            title: '车牌号',
            field: 'busNumber'
        }, {
            title: '申请时间',
            field: 'applyDatetime',
            type: 'date'
        }, {
            title: '用车时间',
            field: 'time',
            rangedate: ['useDatetimeStart', 'useDatetimeEnd'],
            render: (v, d) => {
               return <span style={{whiteSpace: 'nowrap'}}>{formatDate(d.useDatetimeStart) + '~' + formatDate(d.useDatetimeEnd)}</span>;
            }
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            data: [{
                key: '0',
                value: '待审核'
            }, {
                key: '2',
                value: '审核不通过'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '更新人',
            field: 'updaterName'
        }, {
            title: '更新时间',
            field: 'updateDatetime',
            type: 'date'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632795,
            searchParams: {
                statusList: ['0', '2']
            },
            btnEvent: {
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '0') {
                        showWarnMsg('该状态不是待审核状态');
                    } else {
                    this.props.history.push(`/bus/busapply/check?code=${selectedRowKeys[0]}`);
                    }
                },
                apply: (selectedRowKeys, selectedRows) => {
                    this.props.history.push(`/bus/busapply/apply`);
                }
            }
        });
    }
}

export default Busapply;
