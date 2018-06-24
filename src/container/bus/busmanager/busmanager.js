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
} from '@redux/bus/busmanager';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg,
    formatDate
} from 'common/js/util';
import { Button, Upload, Modal } from 'antd';
import {
    toVoid
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.busBusmanager,
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
class Busmanager extends React.Component {
    render() {
        const fields = [{
            title: '车辆型号',
            field: 'model'
        }, {
            title: '车牌号',
            field: 'number',
            search: true
        }, {
            title: '保险到期日',
            field: 'insuranceEndDatetime',
            type: 'date'
        }, {
            title: '领用状态',
            field: 'status',
            type: 'select',
            key: 'bus_status',
            search: true
        }, {
            title: '更新人',
            field: 'updaterName'
        }, {
            title: '更新时间',
            field: 'updateDatetime',
            type: 'date'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632785,
            deleteCode: 632781,
            btnEvent: {
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/bus/busmanager/bushistory?code=${selectedRowKeys[0]}`);
                    }
                },
                toVoid: (key, item) => {
                    if (!key || !key.length || !item || !item.length) {
                        showWarnMsg('请选择记录');
                    } else if (item[0].status === '2') {
                        showWarnMsg('该状态不可作废');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '确定作废？',
                            onOk: () => {
                                this.props.doFetching();
                                return toVoid(key[0]).then(() => {
                                    this.props.getPageData();
                                    showWarnMsg('操作成功');
                                    setTimeout(() => {
                                        this.props.getPageData();
                                    }, 500);
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

export default Busmanager;