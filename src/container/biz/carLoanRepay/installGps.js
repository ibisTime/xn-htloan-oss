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
} from '@redux/biz/installGps';
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
        ...state.bizinstallGps,
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
class installGps extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'repayBizCode',
            search: true
        }, {
            title: '业务公司',
            field: 'companyCode',
            listCode: 630105,
            params: {
                typeList: '1'
            },
            keyName: 'code',
            value: 'name'
        }, {
            title: '客户姓名',
            field: 'applyUserName',
            search: true
        }, {
            title: '贷款银行',
            field: 'loanBank'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '贷款期数',
            field: 'loanPeriod'
        }, {
            title: '业务种类',
            field: 'bizType'
        }, {
            title: '业务员',
            field: 'saleUserId'
        }, {
            title: '申请时间',
            field: 'applyDatetime',
            type: 'datetime'
        }, {
            title: '状态',
            field: 'curNodeCode',
            listCode: 630147,
            kayName: 'code',
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
              check: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/biz/installGps/check?code=${selectedRowKeys[0]}`);
                }
              },
              enter: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/biz/installGps/enter?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default installGps;
