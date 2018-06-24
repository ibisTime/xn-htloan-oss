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
} from '@redux/bus/bushistory';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg,
    formatDate,
    getQueryString
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.busBushistory,
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
class Bushistory extends React.Component {
    constructor(props) {
      super(props);
      this.code = getQueryString('code', this.props.location.search);
      this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '领用人',
            field: 'applyUserName',
            search: true
        }, {
            title: '所属部门',
            field: 'departmentCode',
            type: 'select',
            listCode: 630106,
            params: {
                typeList: ['2']
            },
            keyName: 'code',
            valueName: 'name',
            search: true
        }, {
            title: '领用时间',
            field: 'applyDatetime',
            type: 'date'
        }, {
            title: '用车时间',
            field: 'time',
            rangedate: ['useDatetimeStart', 'useDatetimeEnd'],
            render: (v, d) => {
               return <span style={{whiteSpace: 'nowrap'}}>{formatDate(d.useDatetimeStart) + '~' + formatDate(d.useDatetimeEnd)}</span>;
            }
        }, {
            title: '行驶公里数',
            field: 'driveKil'
        }, {
            title: '领用原因',
            field: 'applyNote'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'bus_borrow_status',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632795,
            searchParams: {
                busCode: this.code,
                status: '4'
            },
            buttons: [{
                code: 'detail',
                name: '详情',
                handler: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                      showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                      showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/bus/busmanager/bushistory/addedit?code=${selectedRows[0].code}`);
                    }
                }
            }]
        });
    }
}

export default Bushistory;