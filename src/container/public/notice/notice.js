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
} from '@redux/public/notice';
import {showWarnMsg, getUserId} from 'common/js/util';
import {listWrapper} from 'common/js/build-list';
import {SYSTEM_CODE} from 'common/js/config';
import {Button, Upload, Modal} from 'antd';

@listWrapper(
    state => ({
        ...state.publicNotice,
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
            field: 'smsTitle',
            title: '标题'
        }, {
            field: 'toKind',
            title: '针对人群',
            type: 'select',
            key: 'user_kind',
            search: true
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            search: true,
            key: 'notice_status'
        }, {
            field: 'updater',
            title: '最近修改人'
        }, {
            field: 'updateDatetime',
            title: '最近修改时间',
            formatter: 'datetime'
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildList({
            fields,
            pageCode: 804040,
            rowKey: 'id',
            searchParams: {
                channelType: '4',
                systemCode: SYSTEM_CODE,
                companyCode: SYSTEM_CODE,
                fromSystemCode: SYSTEM_CODE
            },
            btnEvent: {
                push: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRowKeys[0].status === '0') {
                        console.log(1);
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '确定发布？',
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(804036, {
                                    id: selectedRowKeys[0].id,
                                    systemCode: SYSTEM_CODE,
                                    updater: getUserId()
                                }).then(() => {
                                    this.props.cancelFetching();
                                    showWarnMsg('操作成功');
                                }).catch(() => {
                                    this.props.cancelFetching();
                                });
                            }
                        });
                    } else if (selectedRowKeys[0].status === '1') {
                        console.log(1);
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '确定撤下？',
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(804036, {
                                    id: selectedRowKeys[0].id,
                                    systemCode: SYSTEM_CODE,
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
