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
import {
    showWarnMsg,
    showSucMsg
} from 'common/js/util';
import {
    Button,
    Upload,
    Modal
} from 'antd';
import {
    lowerFrame,
    onShelf
} from 'api/biz';

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
            title: '节点名称',
            field: 'bankName'
        }, {
            title: '材料清单',
            field: 'subbranch'
        }, {
            title: '最新修改人',
            field: 'updater'
        }, {
            title: '最新修改时间',
            field: 'updateDatetime',
            type: 'date'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632035,
            deleteCode: 632031
        });
    }
}

export default materiallist;