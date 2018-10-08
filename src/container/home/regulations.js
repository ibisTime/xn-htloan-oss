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
} from '@redux/home/regulations';
import { getUserId, showWarnMsg } from 'common/js/util';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
    state => state.homeRegulations,
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
class Regulations extends React.Component {
    render() {
        const fields = [{
            field: 'regimeCode',
            title: '制度编号'
        }, {
            field: 'name',
            title: '标题'
        }, {
            field: 'type',
            title: '类型',
            type: 'select',
            key: 'regime_status',
            search: true
        }, {
            title: '发布时间',
            field: 'updateDatetime',
            type: 'datetime'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632735,
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
                        this.props.history.push(`/home/regulationDetail?code=${selectedRowKeys[0]}`);
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

export default Regulations;
