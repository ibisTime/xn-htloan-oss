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
            title: '分类',
            field: 'category',
            type: 'select',
            key: 'node_file_list',
            search: true
        }, {
            title: '文件形式',
            field: 'attachType',
            required: true,
            type: 'select',
            search: true,
            data: [{
                key: '图片',
                value: '图片'
            }, {
                key: '视频',
                value: '视频'
            }, {
                key: '文件',
                value: '文件'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '名称',
            field: 'vname'
        }, {
            title: '份数',
            field: 'number'
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
