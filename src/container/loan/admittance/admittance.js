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
                return d ? d.creditUser.userName : '';
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
                return d.repayBiz ? d.repayBiz.periods : '-';
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
                dkey: '0',
                dvalue: '否'
            }, {
                dkey: '1',
                dvalue: '是'
            }],
            keyName: 'dkey',
            valueName: 'dvalue'
        }, {
            title: '业务公司',
            field: 'companyName'
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
        return this.props.buildList({
            fields,
            pageCode: 632148,
            searchParams: {
                userId: getUserId(),
                roleCode: getRoleCode(),
                curNodeCodeList: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b1x']
            },
            btnEvent: {
                // 申请
                apply: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== 'b1' && selectedRows[0].curNodeCode !== 'b1x') {
                        showWarnMsg('当前不是填写准入申请单节点');
                    } else {
                        this.props.history.push(`/loan/admittance/addedit?&code=${selectedRowKeys[0]}&bizType=${selectedRows[0].bizType}&loanBank=${selectedRows[0].loanBank}`);
                    }
                },
                // 区域经理审核
                // regionalManager: (selectedRowKeys, selectedRows) => {
                //     if (!selectedRowKeys.length) {
                //         showWarnMsg('请选择记录');
                //     } else if (selectedRowKeys.length > 1) {
                //         showWarnMsg('请选择一条记录');
                //     } else if (selectedRows[0].curNodeCode !== 'b2') {
                //         showWarnMsg('当前不是区域经理审核节点');
                //     } else {
                //         this.props.history.push(`/loan/admittance/addedit?v=1&isCheckRegionalManager=1&bizType=${selectedRows[0].bizType}&code=${selectedRowKeys[0]}`);
                //     }
                // },
                regionalManager: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== 'b2') {
                        showWarnMsg('当前不是区域经理审核节点');
                    } else {
                        this.props.history.push(`/loan/admittance/shenhe?v=1&isCheckRegionalManager=1&bizType=${selectedRows[0].bizType}&code=${selectedRowKeys[0]}`);
                    }
                },
                // 内勤主管审核（财务总监审核）
                checkNq: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== 'b7') {
                        showWarnMsg('当前不是财务总监审核节点');
                    } else {
                        this.props.history.push(`/loan/admittance/shenhe?v=1&isCheckNq=1&bizType=${selectedRows[0].bizType}&code=${selectedRowKeys[0]}`);
                    }
                },
                // 风控一审
                checkCommissioner: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== 'b3') {
                        showWarnMsg('当前不是风控一审节点');
                    } else {
                        this.props.history.push(`/loan/admittance/shenhe?v=1&isCheckCommissioner=1&bizType=${selectedRows[0].bizType}&code=${selectedRowKeys[0]}`);
                    }
                },
                // 风控二审
                checkCommissionerTwo: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== 'b4') {
                        showWarnMsg('当前不是风控二审节点');
                    } else {
                        this.props.history.push(`/loan/admittance/shenhe?v=1&checkCommissionerTwo=1&bizType=${selectedRows[0].bizType}&code=${selectedRowKeys[0]}`);
                    }
                },
                // 风控终审
                checkDirector: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== 'b5') {
                        showWarnMsg('当前不是风控终审节点');
                    } else {
                        this.props.history.push(`/loan/admittance/shenhe?v=1&isCheckDirector=1&bizType=${selectedRows[0].bizType}&code=${selectedRowKeys[0]}`);
                    }
                },
                // 业务总监审核
                businessCheck: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== 'b6') {
                        showWarnMsg('当前不是业务总监审核节点');
                    } else {
                        this.props.history.push(`/loan/admittance/shenhe?v=1&isbusinessCheck=1&bizType=${selectedRows[0].bizType}&code=${selectedRowKeys[0]}`);
                    }
                },
                // 详情
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        console.log('selectedRows');
                        console.log(selectedRows);
                        this.props.history.push(`/ywcx/ywcx/addedit?&v=1&code=${selectedRows[0].code}`);
                        // this.props.history.push(`/loan/admittance/addedit?v=1&bizType=${selectedRows[0].bizType}&code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default Admittance;
