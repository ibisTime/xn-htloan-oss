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
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg
} from 'common/js/util';
import {
    Button,
    Upload,
    Modal
} from 'antd';
import {
    putaway,
    soldOut
} from 'api/biz';

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
class transmit extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'bizCode',
            search: true
        }, {
            title: '客户姓名',
            field: 'userName',
            search: true
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
            }]
        }, {
            title: '快递公司',
            field: 'logisticsCompany'
        }, {
            title: '单号',
            field: 'logisticsCode'
        }, {
            title: '节点',
            field: 'bizNodeCode',
            listCode: 630147,
            type: 'select',
            data: [{
                key: 'code',
                value: 'name'
            }],
            keyName: 'key',
            valueName: 'value',
            readonly: true
        }, {
            title: '状态',
            field: 'status',
            search: true,
            key: 'logistics_status'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632155,
            btnEvent: {
              send: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/biz/transmit/send?code=${selectedRowKeys[0]}`);
                }
              },
              check: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/biz/transmit/check?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default transmit;