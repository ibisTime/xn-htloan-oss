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
} from '@redux/bus/busapply';
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
        ...state.busBusapply,
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
class Busapply extends React.Component {
    render() {
        const fields = [{
            title: '领用人',
            field: 'code',
            search: true
        }, {
            title: '所属部门',
            field: 'departmentName',
            search: true
        }, {
            title: '申领车辆',
            field: 'code'
        }, {
            title: '车牌号',
            field: 'code'
        }, {
            title: '申请时间',
            field: 'code',
            type: 'date'
        }, {
            title: '用车时间',
            field: 'code',
            rangedate: ['loanStartDatetime', 'loanEndDatetime'],
            render: (v, d) => {
               return <span style={{whiteSpace: 'nowrap'}}>{formatDate(d.loanStartDatetime) + '~' + formatDate(d.loanEndDatetime)}</span>;
            }
        }, {
            title: '状态',
            field: 'code',
            type: 'select',
            key: '111',
            search: true
        }, {
            title: '更新人',
            field: 'code'
        }, {
            title: '更新时间',
            field: 'code',
            type: 'date'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632315,
            btnEvent: {
              check: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/bus/busapply/check?code=${selectedRowKeys[0]}`);
                }
              },
              apply: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/bus/busapply/apply?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default Busapply;