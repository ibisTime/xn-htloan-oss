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
} from '@redux/notice/notice';
import {showWarnMsg, getUserId} from 'common/js/util';
import {listWrapper} from 'common/js/build-list';
import { Modal } from 'antd';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.noticeNotice,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Notice extends React.Component {
    render() {
        const fields = [{
            field: 'title',
            title: '标题'
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
            field: 'status',
            title: '状态',
            type: 'select',
            search: true,
            key: 'notice_status'
        }, {
            field: 'updateDatetime',
            title: '更新时间',
            type: 'datetime'
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632725,
            btnEvent: {
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '0') {
                        showWarnMsg('不是可修改的状态！');
                    } else {
                        this.props.history.push(`/notice/notice/addedit?code=${selectedRowKeys[0]}`);
                    }
                },
                up: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '0') {
                        showWarnMsg('不是可发布的状态');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '确定发布？',
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(632723, {
                                    code: selectedRowKeys[0],
                                    remark: selectedRows[0].remark,
                                    updater: getUserId()
                                }).then(() => {
                                    this.props.cancelFetching();
                                    showWarnMsg('操作成功');
                                    setTimeout(() => {
                                        this.props.getPageData();
                                    }, 1000);
                                }).catch(() => {
                                    this.props.cancelFetching();
                                });
                            }
                        });
                    }
                },
                down: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '1') {
                        showWarnMsg('不是撤下的状态');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '确定撤下？',
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(632724, {
                                    code: selectedRowKeys[0],
                                    remark: selectedRows[0].remark,
                                    updater: getUserId()
                                }).then(() => {
                                    this.props.cancelFetching();
                                    showWarnMsg('操作成功');
                                    setTimeout(() => {
                                        this.props.getPageData();
                                    }, 1000);
                                }).catch(() => {
                                    this.props.cancelFetching();
                                });
                            }
                        });
                    }
                }
            }
        });
    }
}

export default Notice;
