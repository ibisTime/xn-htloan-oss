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
} from '@redux/loan/credit';
import {
    showWarnMsg,
    getRoleCode,
    dateTimeFormat,
    getTeamCode,
    getUserId
} from 'common/js/util';
import {
    listWrapper
} from 'common/js/build-list';
import {
    creditWithdraw
} from 'api/biz';
import { Modal } from 'antd';

@listWrapper(
    state => ({
        ...state.loanCredit,
        parentCode: state.menu.subMenuCode
    }), {
        setTableData,
        clearSearchParam,
        doFetching,
        setBtnList,
        cancelFetching,
        setPagination,
        setSearchParam,
        setSearchData,
    }
)
class Credit extends React.Component {
    render() {
        const fields = [{
            field: 'bizCode',
            type: 'select',
            search: true,
            listCode: 632517,
            valueName: '{{code.DATA}}',
            keyName: 'code',
            title: '业务编号'
        }, {
            title: '客户姓名',
            field: 'userName',
            search: true,
            render: (v, t) => t.creditUser ? t.creditUser.userName : '-'
        }, {
            title: '贷款银行',
            field: 'loanBankCode',
            type: 'select',
            listCode: 632037,
            keyName: 'code',
            valueName: '{{bankName.DATA}}{{subbranch.DATA}}'
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
            field: 'companyName'
        }, {
            title: '业务团队',
            field: 'teamName'
        }, {
            title: '业务员', // 信贷专员
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
        },
        //     {
        //     title: '驻行内勤',
        //     field: 'operatorName'
        // },
            {
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
            pageCode: 632115,
            searchParams: {
                userId: getUserId(),
                roleCode: getRoleCode(),
                teamCode: getTeamCode(),
                curNodeCodeList: ['a1', 'a2', 'a3', 'ax1']
            },
            btnEvent: {
                apply: (selectedRowKeys, selectedRows) => {
                    let code = selectedRowKeys ? selectedRowKeys[0] : '';
                    if (code) {
                        if (selectedRows[0].curNodeCode !== 'a1' && selectedRows[0].curNodeCode !== 'ax1') {
                            showWarnMsg('当前不是填写征信单的节点');
                            return;
                        }
                        this.props.history.push(`/loan/credit/addedit?isAddedit=1&code=${code}&bizType=${selectedRows[0].bizType}`);
                    } else {
                        this.props.history.push(`/loan/credit/addedit?isAddedit=1`);
                    }
                },
                dispatch: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== 'a2') {
                        showWarnMsg('当前不是内勤主管派单的节点');
                    } else {
                        this.props.history.push(`/loan/credit/dispatch?code=${selectedRowKeys[0]}`);
                    }
                },
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== 'a3') {
                        showWarnMsg('当前不是风控专员审核的节点');
                    } else {
                        // this.props.history.push(`/loan/credit/addedit?v=1&isCheck=1&code=${selectedRowKeys[0]}`);
                         this.props.history.push(`/loan/credit/shenhe?v=1&isCheck=1&code=${selectedRowKeys[0]}`);
                    }
                },
                entering: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== 'a2') {
                        showWarnMsg('当前不是录入征信结果的节点');
                    } else {
                        this.props.history.push(`/loan/credit/addedit?v=1&isEntry=1&code=${selectedRowKeys[0]}`);
                    }
                },
                bigData: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else {
                        this.props.history.push(`/loan/credit/bigdata?&code=${selectedRowKeys[0]}`);
                    }
                },
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        console.log('详情code');
                        // console.log(selectedRows);
                        this.props.history.push(`/ywcx/ywcx/addedit?&v=1&code=${selectedRows[0].bizCode}`);
                    }
                },
                withdraw: (key, item) => {
                    if (!key || !key.length || !item || !item.length) {
                        showWarnMsg('请选择记录');
                    } else if (item[0].curNodeCode !== '001_01' && item[0].curNodeCode !== '001_02' && item[0].curNodeCode !== '001_06') {
                        showWarnMsg('该状态不可撤回');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '确定撤回？',
                            onOk: () => {
                                this.props.doFetching();
                                return creditWithdraw(key[0]).then(() => {
                                    this.props.getPageData();
                                    showWarnMsg('操作成功');
                                    setTimeout(() => {
                                        this.props.getPageData();
                                    }, 500);
                                }).catch(() => {
                                    this.props.cancelFetching();
                                });
                            }
                        });
                    }
                }
            }
        });
    }
}

export default Credit;
