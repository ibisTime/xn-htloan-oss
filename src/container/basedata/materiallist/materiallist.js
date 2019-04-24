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
} from '@redux/basedata/materiallist';
import {
    listWrapper
} from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.basedataMateriallist,
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
class materiallist extends React.Component {
    render() {
        const fields = [{
            title: '序号',
            field: 'id',
            search: true
        }, {
            title: '名称',
            field: 'vname'
        }, {
            title: '份数',
            field: 'number'
        }, {
            title: '更新时间',
            field: 'updateDatetime',
            type: 'date'
        }, {
            title: '更新人',
            field: 'updaterName'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: 632215,
            deleteCode: 632211
        });
    }
}

export default materiallist;
