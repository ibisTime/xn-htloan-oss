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
} from '@redux/postloantools/import';
import { showWarnMsg } from 'common/js/util';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.postloantoolsImport,
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
class imports extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'repayBizCode',
            search: true,
            render: (v) => v || '-'
        }, {
            title: '客户姓名',
            field: 'realName',
            search: true
        }, {
            title: '身份证',
            field: 'idNo'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '贷款银行',
            field: 'loanBankName'
        }, {
            title: '放款日期',
            field: 'fkDatetime',
            type: 'date'
        }, {
            title: '逾期金额',
            field: 'overdueAmount',
            amount: true
        }, {
            title: '创建日期',
            field: 'createDatetime',
            type: 'date'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'overdue_menu_status',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632305,
            btnEvent: {
              import: (selectedRowKeys, selectedRows) => {
                  this.props.history.push(`/postloantools/import/import`);
              },
              dispose: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else if (selectedRows[0].status !== '0') {
                  showWarnMsg('该条记录不是待处理状态');
                } else {
                  this.props.history.push(`/postloantools/import/dispose?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default imports;
