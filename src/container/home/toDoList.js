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
    showSucMsg,
    getRoleCode,
    getTeamCode,
    getNowCurNodePageUrl
} from 'common/js/util';
import {
    listWrapper
} from 'common/js/build-list';

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
class Admittance extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '业务公司',
            field: 'companyName'
        }, {
            title: '客户姓名',
            field: 'userName'
        }, {
            title: '流程类型',
            field: 'flowTypeCode',
            type: 'select',
            key: 'node_type',
            search: true
        }, {
            title: '当前节点',
            field: 'curNodeCode',
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
                        this.props.history.push(getNowCurNodePageUrl(selectedRows[0]));
                    }
                }
            },
            {
                code: 'goback',
                name: '返回',
                handler: (selectedRowKeys, selectedRows) => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default Admittance;
