import React from 'react';
import {
    cancelFetching,
    clearSearchParam,
    doFetching,
    setBtnList,
    setPagination,
    setSearchData,
    setSearchParam,
    setTableData
} from '@redux/personalarchives/ywcx';
import {dateTimeFormat, getUserId, showWarnMsg} from 'common/js/util';
import {listWrapper} from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.ywCx,
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
class ywCx extends React.Component {
    render() {
        const fields = [{
            field: 'code',
            title: '业务编号',
            hidden: true
        }, {
            field: 'code',
            title: '业务编号',
            search: true
        }, {
            field: 'customerName',
            title: '客户姓名',
            search: true
        }, {
            title: '贷款银行',
            field: 'loanBankName'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '业务种类',
            field: 'bizType',
            type: 'select',
            key: 'budget_orde_biz_typer'
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
            field: 'saleUserName'
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }
        ];
        return this.props.buildList({
            fields,
            pageCode: 632519,
            btnEvent: {
                // 准入详情
                admittance: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/preLoan/Access/detail?code=${selectedRowKeys[0]}`);
                    }
                },
                // 垫资详情
                advance: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/statisticalManagement/advancesDetail?code=${selectedRowKeys[0]}`);
                    }
                },
                // 理件详情
                rationale: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/statisticalManagement/rationaleDetail?code=${selectedRowKeys[0]}`);
                    }
                },
                // 放款详情
                Loan: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/statisticalManagement/loanDetail?code=${selectedRowKeys[0]}`);
                    }
                },
                // 入档详情
                putInAFile: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/statisticalManagement/fileDetail?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default ywCx;
