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
            field: 'applyUser',
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
            field: 'code',
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
            field: 'code'
        }, {
            title: '状态',
            field: 'code',
            type: 'select',
            key: '111',
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
                handler: () => {
                    this.props.history.push(`/bus/bushistory/addedit?code=${this.code}`);
                }
            }]
        });
    }
}

export default Bushistory;