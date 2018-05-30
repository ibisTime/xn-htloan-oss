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
} from '@redux/loanstools/refund';
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
        ...state.loanstoolsRefund,
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
class refund extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '业务公司',
            field: 'companyCode'
        }, {
            title: '客户姓名',
            field: 'budgetAmount',
            search: true
        }, {
            title: '汽车经销商',
            field: 'receiptAccount'
        }, {
            title: '贷款银行',
            field: 'receiptBank'
        }, {
            title: '贷款金额',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '贷款期数',
            field: 'name'
        }, {
            title: '购车途径',
            field: 'name'
        }, {
            title: '业务员',
            field: 'name'
        }, {
            title: '申请时间',
            field: 'useDatetime',
            type: 'date'
        }, {
            title: '放款时间',
            field: 'useDatetime',
            type: 'date'
        }, {
            title: '状态',
            field: 'status'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632105,
            btnEvent: {
              certain: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/loanstools/refund/certain?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default refund;