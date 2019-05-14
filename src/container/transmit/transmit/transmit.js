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
} from '@redux/transmit/transmit';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';

@listWrapper(
    state => ({
        ...state.transmit,
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
class Transmit extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'bizCode',
            search: true
        }, {
            title: '客户姓名',
            field: 'customerName'
        }, {
            title: '传递方式',
            field: 'sendType',
            type: 'select',
            data: [{
                key: '1',
                value: '线下'
            }, {
                key: '2',
                value: '快递'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '快递公司',
            field: 'logisticsCompany',
            type: 'select',
            key: 'kd_company'
        }, {
            title: '单号',
            field: 'logisticsCode'
        }, {
            title: '发件节点',
            field: 'fromNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '收件节点',
            field: 'toNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'logistics_status',
            search: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632155,
            searchParams: {
                type: '1'
            },
            btnEvent: {
                send: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '0' && selectedRows[0].status !== '3') {
                        showWarnMsg('当前不是待发件节点');
                    } else {
                        this.props.history.push(`/transmit/transmit/send?code=${selectedRowKeys[0]}`);
                    }
                },
                sj: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '1') {
                        showWarnMsg('当前不是待收件节点');
                    } else {
                        this.props.history.push(`/transmit/collection/check?code=${selectedRowKeys[0]}&toNodeCode=${selectedRows[0].toNodeCode}`);
                    }
                }
            }
        });
    }
}

export default Transmit;
