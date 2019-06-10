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
            title: '名称',
            field: 'vname'
        }, {
            title: '文件形式',
            field: 'attachType'
        }, {
            title: '份数',
            field: 'number'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: 632215,
            deleteCode: 632211,
            searchParams: {
                category: 'node_file_list'
            }
        });
    }
}

export default materiallist;
