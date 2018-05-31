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
} from '@redux/biz/mortgage';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode
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
        ...state.bizMortgage,
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
class mortgage extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '业务公司',
            field: 'letter'
        }, {
            title: '客户姓名',
            field: 'status',
            search: true
        }, {
            title: '汽车经销商',
            field: 'updater'
        }, {
            title: '贷款银行',
            field: 'remark'
        }, {
            title: '贷款金额',
            field: 'remark',
            amount: true
        }, {
            title: '贷款期数',
            field: 'remark'
        }, {
            title: '购车途径',
            field: 'remark'
        }, {
            title: '业务员',
            field: 'remark'
        }, {
            title: '申请时间',
            field: 'updateDatetime',
            type: 'datetime'
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632148,
            searchParams: {
              roleCode: getRoleCode()
            },
            btnEvent: {
              enter: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/biz/mortgage/enter?code=${selectedRowKeys[0]}`);
                }
              },
              sub: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/biz/mortgage/sub?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default mortgage;
