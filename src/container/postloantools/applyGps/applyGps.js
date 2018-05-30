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
            title: '所属公司',
            field: 'code',
            search: true
        }, {
            title: '申领人',
            field: 'companyCode',
            search: true
        }, {
            title: '所属团队',
            field: 'budgetAmount'
        }, {
            title: '申领时间',
            field: 'receiptAccount',
            search: true
        }, {
            title: '申领个数',
            field: 'receiptBank',
            search: true
        }, {
            title: '发货时间',
            field: 'useDatetime',
            type: 'date'
        }, {
            title: '收货时间',
            field: 'name',
            search: true
        }, {
            title: '状态',
            field: 'name',
            search: true
        }, {
            title: '备注',
            field: 'name',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632105,
            btnEvent: {
              apply: (selectedRowKeys, selectedRows) => {
                this.props.history.push(`/loanstools/applyGps/apply?code=${selectedRowKeys[0]}`);
              },
              check: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/loanstools/applyGps/check?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default applyGps;