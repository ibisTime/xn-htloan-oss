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
} from '@redux/home/notices';
import { getUserId, showWarnMsg } from 'common/js/util';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
    state => state.homeNotices,
    {
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
class Notices extends React.Component {
    render() {
        const fields = [{
            title: '标题',
            field: 'title'
        }, {
            field: 'type',
            title: '类型',
            type: 'select',
            key: 'notice_type',
            search: true
        }, {
            field: 'urgentStatus',
            title: '紧急程度',
            type: 'select',
            key: 'notice_urgent_status',
            search: true
        }, {
            field: 'publishDepartmentName',
            title: '发布部门'
        }, {
            field: 'updateDatetime',
            title: '发布时间',
            type: 'datetime'
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632725,
            searchParams: {
                userId: getUserId(),
                status: '1'
            },
            buttons: [{
                code: 'handle',
                name: '查看',
                handler: (selectedRowKeys) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/home/noticeDetail?code=${selectedRowKeys[0]}`);
                    }
                }
            }, {
                code: 'goback',
                name: '返回',
                handler: (selectedRowKeys, selectedRows) => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default Notices;
