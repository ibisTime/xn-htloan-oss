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
} from '@redux/loanstools/takeFree';
import {
  showWarnMsg,
  showSucMsg,
 moneyFormat
} from 'common/js/util';
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
        ...state.loanstoolstakeFree,
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
class takeFee extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '业务公司',
            field: 'companyName'
        }, {
            title: '客户姓名',
            field: 'userName',
            search: true
        }, {
            title: '应收手续费总额',
            field: 'shouldAmount',
            amount: true
        }, {
            title: '未收手续费总额',
            field: 'receiptAccount',
            render: (v, d) => {
                return moneyFormat(d.shouldAmount - d.realAmount);
            }
        }, {
            title: '更新人',
            field: 'updater'
        }, {
            title: '更新时间',
            field: 'updateDatetime',
            search: true,
            type: 'date'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632165,
            btnEvent: {
              enter: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/loanstools/takeFree/enter?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default takeFee;