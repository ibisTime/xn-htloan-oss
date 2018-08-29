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
} from '@redux/loan/admittance';
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
        ...state.loanAdmittance,
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
class Admittance extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
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
                type: 'P',
                roleCode: 'SR201800000000000000YWY'
            },
            keyName: 'userId',
            valueName: '{{companyName.DATA}}-{{realName.DATA}}',
            searchName: 'realName',
            search: true,
            render: (v, d) => {
                return d.saleUserName;
            }
        }, {
            title: '客户姓名',
            field: 'applyUserName',
            search: true
        }, {
            title: '手机号',
            field: 'mobile'
        }, {
            title: '贷款银行',
            field: 'loanBank',
            type: 'select',
            listCode: 632037,
            keyName: 'code',
            valueName: '{{bankName.DATA}}{{subbranch.DATA}}'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '贷款期数',
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
            pageCode: 632148,
            searchParams: {
                roleCode: getRoleCode(),
                teamCode: getTeamCode(),
                curNodeCodeList: ['002_01', '002_02', '002_03', '002_04', '002_24', '002_25']
            },
            btnEvent: {
                // 申请
                apply: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '002_04' && selectedRows[0].curNodeCode !== '002_01') {
                        showWarnMsg('当前不是填写准入申请单节点');
                    } else {
                        this.props.history.push(`/loan/admittance/addedit?code=${selectedRowKeys[0]}&bizType=${selectedRows[0].bizType}&loanBank=${selectedRows[0].loanBank}`);
                    }
                },
                // 区域经理审核
                regionalManager: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '002_24') {
                        showWarnMsg('当前不是区域经理审核节点');
                    } else {
                        this.props.history.push(`/loan/admittance/addedit?v=1&isCheckRegionalManager=1&code=${selectedRowKeys[0]}`);
                    }
                },
                // 内勤主管审核
                checkNq: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '002_25') {
                        showWarnMsg('当前不是内勤主管审核节点');
                    } else {
                        this.props.history.push(`/loan/admittance/addedit?v=1&isCheckNq=1&code=${selectedRowKeys[0]}`);
                    }
                },
                // 风控专员审核
                checkCommissioner: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '002_02') {
                        showWarnMsg('当前不是风控专员审核节点');
                    } else {
                        this.props.history.push(`/loan/admittance/addedit?v=1&isCheckCommissioner=1&code=${selectedRowKeys[0]}`);
                    }
                },
                // 风控主管审核
                checkDirector: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '002_03') {
                        showWarnMsg('当前不是风控主管审核节点');
                    } else {
                        this.props.history.push(`/loan/admittance/addedit?v=1&isCheckDirector=1&code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default Admittance;
