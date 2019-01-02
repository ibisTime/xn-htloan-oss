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
} from '@redux/home/toDoList';
import {
    showWarnMsg,
    getRoleCode,
    getTeamCode,
    getNowCurNodePageUrl
} from 'common/js/util';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.homeToDoList,
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
class ToDoList extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'refOrder'
        }, {
          title: '业务编号',
          field: 'parentOrder',
          hidden: true,
          search: true
        }, {
            title: '业务公司',
            field: 'departmentName'
        }, {
            title: '客户姓名',
            field: 'userName'
        }, {
            title: '流程类型',
            field: 'refType',
            type: 'select',
            key: 'node_type',
            search: true
        }, {
            title: '当前节点',
            field: 'dealNode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '开始时间',
            field: 'startDatetime',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632911,
            rowKey: 'id',
            searchParams: {
                roleCode: getRoleCode(),
                teamCode: getTeamCode()
            },
            buttons: [{
                code: 'handle',
                name: '处理',
                handler: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        let url = getNowCurNodePageUrl(selectedRows[0]);
                        url ? this.props.history.push(url) : showWarnMsg('您需要先处理完该笔业务的物流');
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

export default ToDoList;
