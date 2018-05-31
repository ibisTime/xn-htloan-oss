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
} from '@redux/postloantools/applyGps';
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
        ...state.postloantoolsApplyGps,
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
class applyGps extends React.Component {
    render() {
        const fields = [{
            title: '申领人',
            field: 'applyUser'
        }, {
            title: '申领时间',
            field: 'applyDatetime',
            type: 'datetime',
            search: true
        }, {
            title: '申领个数',
            field: 'applyCount',
            search: true
        }, {
            title: '发货时间',
            field: 'applyDatetime',
            type: 'datetime'
        }, {
            title: '收货时间',
            field: 'applyDatetime',
            type: 'datetime'
        }, {
            title: '状态',
            field: 'status',
            search: true
        }, {
            title: '备注',
            field: 'remark',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632715,
            btnEvent: {
              apply: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                    this.props.history.push(`/postloantools/applyGps/apply?code=${selectedRowKeys[0]}`);
                }
              },
              check: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/postloantools/applyGps/check?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default applyGps;