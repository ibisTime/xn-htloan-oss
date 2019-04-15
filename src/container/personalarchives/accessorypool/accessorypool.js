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
} from '@redux/personalarchives/accessorypool';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, showSucMsg} from 'common/js/util';
import {getNodeList} from 'api/menu';

@listWrapper(
    state => ({
        ...state.AccEssOryPool,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class AccEssOryPool extends React.Component {
    render() {
        const fields = [{
            title: '二手车评估报告',
            field: 'secondCarReport'
        }, {
            title: '行驶证正面',
            field: 'driveLicenseFront'
        }, {
            title: '行驶证反面',
            field: 'driveLicenseReverse'
        }, {
            title: '主贷人银行报告',
            field: 'startDatetime',
            type: 'datetime'
        }, {
            title: '主贷人同盾报告',
            field: 'remark'
        }, {
            title: '主贷人其他报告',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 623545
        });
    }
}

export default AccEssOryPool;
