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
} from '@redux/printing/relieve';
import {
    showWarnMsg,
    showSucMsg,
    moneyFormat,
    formatDate
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
        ...state.printingRelieve,
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
class Relieve extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '业务公司',
            field: 'companyCode',
            render: (v, d) => {
                return d.budgetOrder.companyName;
            }
        }, {
            title: '客户姓名',
            field: 'customerName',
            render: (v, d) => {
                return d.budgetOrder.customerName;
            },
            search: true
        }, {
            title: '贷款银行',
            field: 'loanbankName',
            render: (v, d) => {
                return d.budgetOrder.loanBankName;
            }
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            render: (v, d) => {
                return moneyFormat(d.budgetOrder.loanAmount);
            }
        }, {
            title: '利率',
            field: 'bankRate',
            render: (v, d) => {
                return d.budgetOrder.bankRate;
            }
        }, {
            title: '服务费',
            field: 'fee',
            render: (v, d) => {
                return moneyFormat(d.budgetOrder.fee);
            }
        }, {
            title: '品牌型号',
            field: 'carModel',
            render: (v, d) => {
                return d.budgetOrder.carModel;
            }
        }, {
            title: '打件日期',
            field: 'guarantPrintDatetime',
            render: (v, d) => {
                return formatDate(d.budgetOrder.guarantPrintDatetime);
            }
        }, {
            title: '打件人',
            field: 'guarantPrintUser',
            render: (v, d) => {
                return d.budgetOrder.guarantPrintName;
            }
        }, {
            title: '业务员名称',
            field: 'saleUserName',
            render: (v, d) => {
                return d.budgetOrder.operatorName;
            }
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }];
        return this.props.buildList({
            fields,
            pageCode: 630520,
            searchParams: {
                curNodeCodeList: ['020_06']
            },
            btnEvent: {
                make: (selectedRowKeys, selectedRows) => {
                    console.log(selectedRows[0]);
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/printing/relieve/make?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default Relieve;