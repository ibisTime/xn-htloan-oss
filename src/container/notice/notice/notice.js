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
                up: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '确定发布？',
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(804036, {
                                    id: selectedRowKeys[0].id,
                                    updater: getUserId()
                                }).then(() => {
                                    this.props.cancelFetching();
                                    showWarnMsg('操作成功');
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
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '确定撤下？',
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(804036, {
                                    code: selectedRowKeys,
                                    updater: getUserId()
                                }).then(() => {
                                    this.props.cancelFetching();
                                    showWarnMsg('操作成功');
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
