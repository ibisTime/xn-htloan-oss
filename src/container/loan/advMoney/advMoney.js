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
} from '@redux/loan/advMoney';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode,
    getUserId,
    dateTimeFormat
} from 'common/js/util';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.loanAdvMoney,
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
class AdvMoney extends React.Component {
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
                typeList: [1],
                status: '1'
            },
            type: 'select',
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '客户姓名',
            field: 'applyUserName',
            search: true,
            render: (v, d) => {
                return d.creditUser ? d.creditUser.userName : '';
            }
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            render: (v, d) => {
                if (d.loanBankName) {
                    return d.repaySubbranch ? d.loanBankName + d.repaySubbranch : d.loanBankName;
                } else if (d.repaySubbranch) {
                    return d.loanBankName ? d.loanBankName + d.repaySubbranch : d.repaySubbranch;
                }
            }
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '贷款期数',
            field: 'loanPeriod',
            render: (v, d) => {
                return d.repayBiz ? d.repayBiz.periods : '';
            }
        }, {
            title: '购车途径',
            field: 'bizType',
            type: 'select',
            key: 'budget_orde_biz_typer'
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
            title: '申请时间',
            field: 'applyDatetime',
            rangedate: ['applyDatetimeStart', 'applyDatetimeEnd'],
            type: 'date',
            render: dateTimeFormat
        }, {
            title: '状态',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            search: true,
            params: {type: 'a'}
        }];
        return this.props.buildList({
            fields,
            pageCode: 632148,
            searchParams: {
                userId: getUserId(),
                roleCode: getRoleCode(),
                fbhgpsNodeList: ['g1', 'g2', 'g3', 'g4', 'g5']
            },
            btnEvent: {
               // 财务审核
                check: (selectedRowKeys, selectedRows) => {
                    // if (!selectedRowKeys.length) {
                    //     showWarnMsg('请选择记录');
                    // } else if (selectedRowKeys.length > 1) {
                    //     showWarnMsg('请选择一条记录');
                    // } else if (selectedRows[0].curNodeCode !== '002_29') {
                    //     showWarnMsg('当前不是财务审核节点');
                    // } else {
                        this.props.history.push(`${this.props.location.pathname}/addedit?code=${selectedRowKeys[0]}&check=1&v=1`);
                    // }
                },
                // 财务确认垫资
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].fbhgpsNode !== 'g1') {
                        showWarnMsg('当前不是财务确认垫资节点');
                    } else {
                        this.props.history.push(`${this.props.location.pathname}/addedit?code=${selectedRows[0].bizCode}`);
                    }
                },
                // 确认用款单
                tomoney: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].fbhgpsNode !== 'g1') {
                        showWarnMsg('当前不是确认用款单节点');
                    } else {
                        this.props.history.push(`/loan/advMoney/examine?isAddedit=1&code=${selectedRows[0].bizCode}`);
                    }
                },
                // 用款一审
                toexamine: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].fbhgpsNode !== 'g2') {
                        showWarnMsg('当前不是用款一审节点');
                    } else {
                        this.props.history.push(`/loan/advMoney/examines?isAddedit=1&code=${selectedRows[0].bizCode}`);
                     }
                },
                // 用款二审
                toexamines: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].fbhgpsNode !== 'g3') {
                        showWarnMsg('当前不是用款二审节点');
                    } else {
                        this.props.history.push(`/loan/advMoney/examiness?isAddedit=&code=${selectedRows[0].bizCode}`);
                    }
                }

            }
        });
    }
}

export default AdvMoney;
