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
} from '@redux/basedata/bankType';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.bizBankType,
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
class BankType extends React.Component {
    render() {
        const fields = [{
            title: '名称',
            field: 'bankName'
        }, {
            title: '银行支行',
            field: 'openBank'
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
            rowKey: 'code',
            pageCode: 632055,
            deleteCode: 632051,
            btnEvent: {
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/basedata/bankType/addedit?code=${selectedRows[0].code}`);
                    }
                }
            }
        });
    }
}

export default BankType;
