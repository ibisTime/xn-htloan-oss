import React from 'react';
import { message } from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/basedata/cities';
import { listWrapper } from 'common/js/build-list';
import { getUserId } from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.basedataCities,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Cities extends React.Component {
    render() {
        const fields = [{
            title: '城市ID',
            field: 'cityId'
        }, {
            title: '城市名称',
            field: 'cityName'
        }, {
            title: '所属省份ID',
            field: 'provId'
        }, {
            title: '所属省份名称',
            field: 'provName'
        }, {
            title: '最新修改时间',
            field: 'createDatetime',
            type: 'datetime'
        }];

        return this.props.buildList({
            fields,
            pageCode: 630475,
            btnEvent: {
                refresh: () => {
                    let hasMsg = message.loading('正在努力刷新中...', 0);
                    fetch(630470, {
                        updater: getUserId()
                    }).then(() => {
                        hasMsg();
                        this.props.getPageData();
                    }, hasMsg);
                }
            }
        });
    }
}

export default Cities;
