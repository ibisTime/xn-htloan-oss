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
            field: 'number'
        }, {
            title: '保险到期日',
            field: 'insuranceEndDatetime',
            type: 'date'
        }, {
            title: '领用状态',
            field: 'status',
            type: 'select',
            key: 'bus_status'
        }, {
            title: '更新人',
            field: 'updater'
        }, {
            title: '更新时间',
            field: 'updaterDatetime',
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
                  this.props.history.push(`/bus/bushistory?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default Busmanager;