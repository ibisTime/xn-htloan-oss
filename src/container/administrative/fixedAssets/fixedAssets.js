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
} from '@redux/administrative/fixedAssets';
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
        ...state.administrativeFixedAssets,
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
class fixedAssets extends React.Component {
    render() {
        const fields = [{
            title: '单号',
            field: 'code'
        }, {
            title: '申请人',
            field: 'applyUserName'
        }, {
            title: '申请概要',
            field: 'applyNote'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'leave_apply_status',
            search: true
        }, {
            title: '申请时间',
            field: 'applyDatetime',
            rangedate: ['startApplyDatetime', 'endApplyDatetime'],
            type: 'date',
            render: dateTimeFormat,
            search: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632645,
            searchParams: {
                type: '2'
            },
            btnEvent: {
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '0') {
                        showWarnMsg('不是待审核的记录！');
                    } else {
                        this.props.history.push(`/administrative/fixedAssets/addedit?v=1&isCheck=1s&code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default fixedAssets;
