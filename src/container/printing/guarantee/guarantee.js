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
} from '@redux/printing/guarantee';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode,
    getUserId,
    formatDate
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
        ...state.printingGuarantee,
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
class Guarantee extends React.Component {
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
            render: (v, d) => (
                (d && d.creditUser && d.creditUser.userName) || '-'
            ),
            search: true
        }, {
            title: '贷款银行',
            field: 'loanBankName'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '贷款期数',
            field: 'periods',
            render: (v, d) => {
                return d.loanInfo ? d.loanInfo.periods : '-';
            }
        }, {
            title: '业务种类',
            field: 'bizType',
            type: 'select',
            key: 'budget_orde_biz_typer'
        }, {
            title: '是否垫资',
            field: 'isAdvanceFund',
            type: 'select',
            data: [{
                key: '1',
                value: '是'
            }, {
                key: '0',
                value: '否'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '业务公司',
            field: 'companyCode',
            listCode: 630106,
            params: {
                typeList: [1],
                status: '1'
            },
            type: 'select',
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '业务团队',
            field: 'teamName'
        }, {
            title: '业务员',
            field: 'saleUserId',
            type: 'select',
            pageCode: 630065,
            params: {
                type: 'P',
                roleCodeList: ['SR201800000000000000YWY', 'SR20180000000000000NQZY']
            },
            keyName: 'userId',
            valueName: '{{companyName.DATA}}-{{realName.DATA}}',
            searchName: 'realName',
            render: (v, d) => {
                return d.saleUserName;
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
            pageCode: 632515,
            searchParams: {
                userId: getUserId(),
              roleCode: getRoleCode()
            },
            btnEvent: {
                // 担保合同打印
                make: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/printing/guarantee/make?code=${selectedRowKeys[0]}`);
                    }
                },
                // 抵押合同打印
                makes: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/printing/mortgage/make?code=${selectedRowKeys[0]}`);
                    }
                },
                // 解抵合同打印
                makepring: (selectedRowKeys, selectedRows) => {
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

export default Guarantee;
