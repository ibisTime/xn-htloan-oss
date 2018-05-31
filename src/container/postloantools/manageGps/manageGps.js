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
} from '@redux/postloantools/manageGps';
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
    listWrapper
} from 'common/js/build-list';
import {
  lowerFrame,
  onShelf,
  sendMsg
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.postloantoolsManageGps,
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
class manageGps extends React.Component {
    render() {
        const fields = [{
            title: 'GPS编号',
            field: 'gpsNo'
        }, {
            title: 'GPS类型',
            field: 'gpsType'
        }, {
            title: '归属公司',
            field: 'applyDatetime',
            type: 'datetime',
            search: true
        }, {
            title: 'GPS领用人',
            field: 'applyCount',
            search: true
        }, {
            title: 'GPS领用状态',
            field: 'applyDatetime',
            type: 'datetime'
        }, {
            title: '领用日期',
            field: 'applyDatetime',
            type: 'datetime'
        }, {
            title: 'GPS使用状态',
            field: 'status',
            search: true
        }, {
            title: '使用日期',
            field: 'remark',
            search: true
        }, {
            title: '业务编号',
            field: 'code',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632705
        });
    }
}

export default manageGps;