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
} from '@redux/stock/outtreasury';
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
        ...state.stockOuttreasury,
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
class outtreasury extends React.Component {
    render() {
        const fields = [{
            title: '品名',
            field: 'productCode',
            type: 'select',
            listCode: '632757',
            params: {},
            keyName: 'code',
            valueName: 'name',
            search: true
        }, {
            title: '类别',
            field: 'categoryCode',
            type: 'select',
            listCode: '632747',
            params: {},
            keyName: 'code',
            valueName: 'name',
            search: true
        }, {
            title: '出库数量',
            field: 'quantity'
        }, {
            title: '出库人',
            field: 'updater',
            render: (v, data) => {
                return data.updateUser ? data.updateUser.realName : '-';
            }
        }, {
            title: '出库时间',
            field: 'updateDatetime',
            type: 'datetime'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632775
        });
    }
}

export default outtreasury;
