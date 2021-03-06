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
} from '@redux/basedata/bank';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.bizBank,
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
class Bank extends React.Component {
    render() {
        const fields = [{
            title: '银行编号',
            field: 'bankCode'
        }, {
            title: '银行名称',
            field: 'bankCode',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: 'bankName',
            render: (v, d) => {
              return d.bankName;
            },
            search: true
        }, {
            title: '支行',
            field: 'subbranch',
            search: true
        }, {
            title: '12期利率',
            field: 'rate12'
        }, {
            title: '18期利率',
            field: 'rate18'
        }, {
            title: '24期利率',
            field: 'rate24'
        }, {
            title: '36期利率',
            field: 'rate36'
        }, {
            title: '最新修改人',
            field: 'updaterName'
        }, {
            title: '最新修改时间',
            field: 'updateDatetime',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632035,
            deleteCode: 632031
        });
    }
}

export default Bank;
