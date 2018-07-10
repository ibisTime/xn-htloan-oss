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
} from '@redux/loanstools/investigateReport';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode,
    dateTimeFormat,
    getTeamCode
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
        ...state.loanstoolsInvestigateReport,
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
class InvestigateReport extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'budgetOrderCode',
            search: true
        }, {
            title: '业务公司',
            field: 'companyName'
        }, {
            title: '业务团队',
            field: 'teamName'
        }, {
            title: '信贷专员',
            field: 'saleUserId',
            type: 'select',
            pageCode: 630065,
            params: {
                type: 'P'
            },
            keyName: 'userId',
            valueName: '{{companyName.DATA}}-{{realName.DATA}}',
            searchName: 'realName',
            search: true,
            render: (v, d) => {
                return d.saleUserName;
            }
        }, {
            title: '授信客户姓名',
            field: 'applyUserName',
            search: true
        }, {
            title: '授信品种',
            field: 'loanBankName'
        }, {
            title: '授信金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '授信期限(年)',
            field: 'loanPeriod'
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
                dkey: '0',
                dvalue: '否'
            }, {
                dkey: '1',
                dvalue: '是'
            }],
            keyName: 'dkey',
            valueName: 'dvalue'
        }, {
            title: '申请日期',
            field: 'applyDatetime',
            rangedate: ['applyDatetimeStart', 'applyDatetimeEnd'],
            type: 'date',
            render: dateTimeFormat,
            search: true
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '关键字搜索',
            field: 'keyword',
            hidden: true,
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632205,
            searchName: {
                curNodeCodeList: ['010_01', '010_02', '010_03', '010_04']
            },
            btnEvent: {
                apply: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '010_01') {
                        showWarnMsg('当前不是提交调查申请节点');
                    } else {
                        this.props.history.push(`/loanstools/investigateReport/addedit?code=${selectedRowKeys[0]}&bizType=${selectedRows[0].bizType}`);
                    }
                },
                checkCommissioner: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '010_02') {
                        showWarnMsg('当前不是风控专员审核节点');
                    } else {
                        this.props.history.push(`/loanstools/investigateReport/addedit?v=1&isCheckCommissioner=1&code=${selectedRowKeys[0]}&bizType=${selectedRows[0].bizType}`);
                    }
                },
                checkStationed: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '010_03') {
                        showWarnMsg('当前不是驻行人员审核节点');
                    } else {
                        this.props.history.push(`/loanstools/investigateReport/addedit?v=1&isCheckStationed=1&code=${selectedRowKeys[0]}&bizType=${selectedRows[0].bizType}`);
                    }
                },
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/loanstools/investigateReport/addedit?v=1&code=${selectedRowKeys[0]}&bizType=${selectedRows[0].bizType}`);
                    }
                }
            }
        });
    }
}

export default InvestigateReport;
