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
} from '@redux/stock/stock';
import {
    showWarnMsg,
    showSucMsg
} from 'common/js/util';
import {
    listWrapper
} from 'common/js/build-list';
import {
    lowerFrame,
    onShelf,
    sendMsg
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.stockStock,
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
class stock extends React.Component {
    render() {
        const fields = [{
            title: '品名',
            field: 'productName'
        }, {
            title: '类别',
            field: 'categoryName'
        }, {
            title: '数量',
            field: 'quantity'
        }, {
            title: '单价',
            field: 'price',
            amount: true
        }, {
            title: '总价',
            field: 'totalPrice',
            amount: true
        }, {
            title: '入库人',
            field: 'updater'
        }, {
            title: '入库时间',
            field: 'updateDatetime',
            type: 'datetime'
        }, {
            title: '有效期',
            field: 'validDate',
            type: 'datetime',
            rangedate: ['validDateStart', 'validDateEnd']
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632765
        });
    }
}

export default stock;
