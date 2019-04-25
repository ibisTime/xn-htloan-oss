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
} from '@redux/transmit/transmitGPS';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';

@listWrapper(
    state => ({
        ...state.transmitGps,
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
class transmit extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'bizCode',
            search: true
        }, {
            title: '发件人',
            field: 'senderName',
            render: (v, d) => {
                return d.senderName ? d.senderName : '-';
            }
        }, {
            title: '收件人',
            field: 'receiverName'
        }, {
            title: '业务团队',
            field: 'teamName'
        }, {
            title: '信贷专员',
            field: 'saleUserName'
        }, {
            title: '内勤专员',
            field: 'insideJobName'
        }, {
            title: 'gps无线个数',
            field: 'applyWirelessCount',
            render: (v, d) => {
                return d.gpsApply.applyWirelessCount;
            }
        }, {
            title: 'gps有线个数',
            field: 'applyWiredCount',
            render: (v, d) => {
                return d.gpsApply.applyWiredCount;
            }
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
            key: 'kd_company',
            render: (v, d) => {
                return d.logisticsCompany ? d.logisticsCompany : '-';
            }
        }, {
            title: '单号',
            field: 'logisticsCode',
            render: (v, d) => {
                return d.logisticsCode ? d.logisticsCode : '-';
            }
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'logistics_status',
            search: true
        }, {
            title: '备注',
            field: 'sendNote',
            render: (v, d) => {
                return d.sendNote ? d.sendNote : '无';
            }
        }];
        return this.props.buildList({
            fields,
            pageCode: 632155,
            searchParams: {
                type: '2'
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
                  this.props.history.push(`/transmit/transmitGps/send?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default transmit;
