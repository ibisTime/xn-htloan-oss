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
            title: '银行代号',
            field: 'bankCode'
        }, {
            title: '每日限额',
            field: 'dayAmount',
            amount: true
        }, {
            title: '每日笔数限制',
            field: 'maxOrder'
        }, {
            title: '每月限额',
            field: 'monthAmount',
            amount: true
        }, {
            title: '单笔限额',
            field: 'orderAmount'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            data: [{
                key: '0',
                value: '不可用'
            }, {
                key: '1',
                value: '可用'
            }],
            keyName: 'key',
            valueName: 'value'
        }];
        return this.props.buildList({
            fields,
            key: 'id',
            pageCode: 802115
        });
    }
}

export default BankType;