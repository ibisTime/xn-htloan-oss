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
} from '@redux/printing/mortgage';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode
} from 'common/js/util';
import fetch from 'common/js/fetch';
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
        ...state.printingMortgage,
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
class Mortgage extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '业务公司',
            field: 'companyCode',
            listCode: 630106,
            params: {
                typeList: [1]
            },
            type: 'select',
            keyName: 'code',
            valueName: 'name',
            required: true
        }, {
            title: '客户姓名',
            field: 'customerName',
            search: true
        }, {
            title: '贷款银行',
            field: 'loanBankName'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '利率',
            field: 'bankRate'
        }, {
            title: '服务费',
            field: 'fee',
            amount: true
        }, {
            title: '品牌型号',
            field: 'carModel'
        }, {
            title: '打件日期',
            field: 'guarantPrintDatetime',
            type: 'date'
        }, {
            title: '打件人',
            field: 'guarantPrintName'
        }, {
            title: '业务员名称',
            field: 'saleUserName'
        }, {
            title: '当前节点',
            field: 'pledgeCurNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632148,
            searchParams: {
              roleCode: getRoleCode(),
              pledgeCurNodeCodeList: ['008_01']
            },
            btnEvent: {
                make: (selectedRowKeys, selectedRows) => {
                    console.log(selectedRows[0]);
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].pledgeCurNodeCode !== '008_01') {
                        showWarnMsg('当前节点不是打印岗打印');
                    } else {
                        this.props.history.push(`/printing/mortgage/make?code=${selectedRowKeys[0]}&bankSubbranch=${selectedRowKeys[0].bankSubbranch}`);
                    }
                }
            }
        });
    }
}

export default Mortgage;