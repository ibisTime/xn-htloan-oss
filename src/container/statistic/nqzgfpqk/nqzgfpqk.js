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
} from '@redux/statistic/nqzgfpqk';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.statisticNqzgfpqk,
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
class Nqzgfpqk extends React.Component {
    render() {
        const fields = [{
            title: '内勤姓名',
            field: 'name',
            nowrap: true
        }, {
            title: '分配数量',
            field: 'number',
            nowrap: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632917,
            rowKey: 'userId'
        });
    }
}

export default Nqzgfpqk;
