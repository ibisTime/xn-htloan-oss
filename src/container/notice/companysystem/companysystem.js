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
} from '@redux/notice/companysystem';
import {
    showWarnMsg,
    showSucMsg,
    getUserId
} from 'common/js/util';
import {
    listWrapper
} from 'common/js/build-list';
import {
    lowerFrame,
    onShelf,
    sendMsg
} from 'api/biz';
import { Modal } from 'antd';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.noticeCompanysystem,
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
class companysystem extends React.Component {
    render() {
        const fields = [{
            field: 'regimeCode',
            title: '制度编号'
        }, {
            field: 'type',
            title: '类型',
            type: 'select',
            key: 'regime_status',
            search: true
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            search: true,
            key: 'notice_status'
        }, {
            title: '更新人',
            field: 'updaterName'
        }, {
            title: '更新时间',
            field: 'updateDatetime',
            type: 'datetime'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632735,
            btnEvent: {
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '0') {
                        showWarnMsg('不是可修改的状态！');
                    } else {
                        this.props.history.push(`/notice/companysystem/addedit?code=${selectedRowKeys[0]}`);
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
                                return fetch(632732, {
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
                                return fetch(632733, {
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

export default companysystem;
