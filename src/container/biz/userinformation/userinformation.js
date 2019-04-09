import React from 'react';
import {Modal} from 'antd';
import fetch from 'common/js/fetch';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/biz/userinformation';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode,
    getUserId,
    getUserName,
    dateTimeFormat
} from 'common/js/util';
import {listWrapper} from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.bizUserinformation,
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
class Userinformation extends React.Component {
    render() {
        const fields = [{
            title: '标题',
            field: 'title',
            search: true
        }, {
            title: '作者',
            field: 'author',
            required: true
        }, {
            title: '照片张数',
            field: 'picNumber',
            number: true,
            required: true
        }, {
            title: '浏览次数',
            field: 'readCount'
        }, {
            title: '状态',
            field: 'status',
            search: true,
            type: 'select',
            key: 'status'
        }, {
            title: '更新人',
            field: 'updater',
            formatter: (v, d) => {
                return d.sysUser.loginName;
                }
        }, {
            title: '更新时间',
            field: 'updateDatetime',
            type: 'date'
        }];
        return this.props.buildList({
            fields,
            pageCode: 630455,
            btnEvent: {
                // 修改
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '2') {
                        showWarnMsg('已上架的资讯不可修改');
                    } else {
                        this.props.history.push(`${this.props.location.pathname}/addedit?code=${selectedRowKeys[0]}`);
                    }
                },
                up: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status === '1') {
                        showWarnMsg('该资讯已上架');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定上架该资讯？`,
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(630453, {
                                    code: selectedRows[0].code,
                                    updater: getUserName()
                                }).then(() => {
                                    this.props.getPageData();
                                    showSucMsg('操作成功');
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
                    } else if (selectedRows[0].status === '2') {
                        showWarnMsg('该资讯已下架');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定下架该资讯？`,
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(630454, {
                                    code: selectedRows[0].code,
                                    updater: getUserName()
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
            }
        });
    }
}

export default Userinformation;
