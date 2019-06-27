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
} from '@redux/basedata/brand';
import {
    listWrapper
} from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.basisBrand,
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
class Brand extends React.Component {
    render() {
        const fields = [{
            title: '品牌名称',
            field: 'brandName',
            search: true
        }, {
            title: '品牌logo',
            field: 'brandLogo',
            type: 'img'
        }];
        return this.props.buildList({
            fields,
            pageCode: 630485,
            deleteCode: 630481
        });
    }
}

export default Brand;
