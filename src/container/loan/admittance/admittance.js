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
import { showWarnMsg, getRoleCode, dateTimeFormat, getUserId } from 'common/js/util';
import { listWrapper } from 'common/js/build-list';

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
            title: '客户姓名',
            field: 'userName',
            search: true,
            render: (v, d) => {
                return d && d.creditUser ? d.creditUser.userName : '';
            }
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
            title: '状态',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            search: true,
            params: {type: 'b'}
        }];
        const { btnList } = this.props;
        return this.props.buildList({
            fields,
            pageCode: 632515,
            searchParams: {
                userId: getUserId(),
                roleCode: getRoleCode(),
                curNodeCodeList: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b1x']
            },
            btnEvent: {
                // 录入准入资料
                apply: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== 'b1' && selectedRows[0].curNodeCode !== 'b1x') {
                        let arr = btnList.filter(item => item.url === '/apply');
                        showWarnMsg(`当前不是${arr[0].name}节点`);
                    } else {
                        this.props.history.push(`/loan/admittance/addedit?&code=${selectedRowKeys[0]}`);
                    }
                },
                // 内勤主管审核
                regionalManager: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== 'b2') {
                        let arr = btnList.filter(item => item.url === '/regionalManager');
                        showWarnMsg(`当前不是${arr[0].name}节点`);
                    } else {
                        this.props.history.push(`/loan/admittance/shenhe?v=1&isCheckRegionalManager=1&code=${selectedRowKeys[0]}`);
                    }
                },
                // 财务主管审核（财务总监审核）
                checkNq: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== 'b7') {
                        let arr = btnList.filter(item => item.url === '/checkNq');
                        showWarnMsg(`当前不是${arr[0].name}节点`);
                    } else {
                        this.props.history.push(`/loan/admittance/shenhe?v=1&isCheckNq=1&bizType=${selectedRows[0].bizType}&code=${selectedRowKeys[0]}`);
                    }
                },
                // 区域经理审核
                checkCommissioner: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== 'b3') {
                        let arr = btnList.filter(item => item.url === '/checkCommissioner');
                        showWarnMsg(`当前不是${arr[0].name}节点`);
                    } else {
                        this.props.history.push(`/loan/admittance/shenhe?v=1&isCheckCommissioner=1&code=${selectedRowKeys[0]}`);
                    }
                },
                // 分公司总经理审核
                checkCommissionerTwo: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== 'b4') {
                        let arr = btnList.filter(item => item.url === '/checkCommissionerTwo');
                        showWarnMsg(`当前不是${arr[0].name}节点`);
                    } else {
                        this.props.history.push(`/loan/admittance/shenhe?v=1&checkCommissionerTwo=1&code=${selectedRowKeys[0]}`);
                    }
                },
                // 风控终审
                checkDirector: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== 'b5') {
                        let arr = btnList.filter(item => item.url === '/checkDirector');
                        showWarnMsg(`当前不是${arr[0].name}节点`);
                    } else {
                        this.props.history.push(`/loan/admittance/shenhe?v=1&isCheckDirector=1&code=${selectedRowKeys[0]}`);
                    }
                },
                // 业务总监审核
                businessCheck: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== 'b6') {
                        let arr = btnList.filter(item => item.url === '/businessCheck');
                        showWarnMsg(`当前不是${arr[0].name}节点`);
                    } else {
                        this.props.history.push(`/loan/admittance/shenhe?v=1&isbusinessCheck=1&bizType=${selectedRows[0].bizType}&code=${selectedRowKeys[0]}`);
                    }
                },
                // 总公司审核
                checkHeadquarters: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode === 'b1' || selectedRows[0].curNodeCode === 'b1x') {
                        let arr = btnList.filter(item => item.url === '/checkHeadquarters');
                        showWarnMsg(`当前不是${arr[0].name}节点`);
                    } else {
                        this.props.history.push(`/loan/admittance/shenhe?v=1&isCheckHeadquarters=1&bizType=${selectedRows[0].bizType}&code=${selectedRowKeys[0]}`);
                    }
                },
                // 详情
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/ywcx/ywcx/addedit?&v=1&code=${selectedRows[0].code}`);
                        // this.props.history.push(`/loan/admittance/addedit?v=1&bizType=${selectedRows[0].bizType}&code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default Admittance;
