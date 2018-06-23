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
            field: 'code',
            search: true
        }, {
            title: '所属部门',
            field: 'departmentName',
            search: true
        }, {
            title: '领用时间',
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
            title: '行驶公里数',
            field: 'code'
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
            pageCode: 632315,
            seachParams: {
                code: this.code
            }
        });
    }
}

export default Bushistory;