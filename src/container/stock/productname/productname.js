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
} from '@redux/stock/productname';
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
        ...state.stockProductname,
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
class productname extends React.Component {
    render() {
        const fields = [{
            title: '品名',
            field: 'name',
            search: true
        }, {
            title: '类别',
            field: 'categoryCode',
            render: (v, data) => {
                return data.compCategory.name;
            }
        }, {
            title: '规格型号',
            field: 'model'
        }, {
            title: '单位',
            field: 'unit'
        }, {
            title: '更新人',
            field: 'updater',
            render: (v, data) => {
                return data.updateUser ? data.updateUser.realName : '';
            }
        }, {
            title: '更新时间',
            field: 'updateDatetime',
            type: 'datetime'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632755
        });
    }
}

export default productname;
