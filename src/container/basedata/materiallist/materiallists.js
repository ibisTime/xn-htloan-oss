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
} from '@redux/basedata/materiallist';
import {
    getQueryString,
    showWarnMsg,
    showSucMsg,
    getUserId,
    isExpressConfirm
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    listWrapper
} from 'common/js/build-list';
import { Spin, Button, Tree, Modal, Row, Col, Form, Input, Icon } from 'antd';
@listWrapper(
    state => ({
        ...state.basedataMateriallist,
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
class materiallist extends React.Component {
    render() {
        const fields = [{
            title: '名称',
            field: 'vname',
            search: true
        }, {
            title: '份数',
            field: 'number'
        }, {
            title: '更新时间',
            field: 'updateDatetime',
            type: 'date'
        }, {
            title: '更新人',
            field: 'updaterName'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: 632215,
            deleteCode: 632211,
            buttons: [{
                code: 'goBack',
                name: '返回',
                check: false,
                    handler: () => this.props.history.go(-1)
            }, {
                code: 'add',
                name: '新增',
                check: false,
                handler: (param) => {
                    this.props.history.push(`/basedata/materiallist/addedit`);
                }
            }, {
                code: 'edit',
                name: '修改',
                check: false,
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/basedata/materiallist/addedit? code=${selectedRows.code}`);
                    }
                }
            }, {
                code: 'delete',
                name: '删除',
                check: false,
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        Modal.confirm({
                            okText: '确定',
                            cancelText: '取消',
                            content: '确定删除该岗位？',
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(632211, {
                                    code: selectedRows[0].code
                                }).then(() => {
                                    this.props.getPageData();
                                    showSucMsg('操作成功');
                                }).catch(() => {
                                    this.props.cancelFetching();
                                });
                            }
                        });
                    }
                }
            }]
        });
    }
}

export default materiallist;
