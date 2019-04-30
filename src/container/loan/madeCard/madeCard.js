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
} from '@redux/loan/madeCard';
import {
    showWarnMsg,
    getRoleCode,
    getUserId,
    dateFormat
} from 'common/js/util';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.loanMadeCard,
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
class MadeCard extends React.Component {
    render() {
        const fields = [
            {
                field: 'code',
                search: true,
                title: '业务编号',
                required: true
            }, {
            title: '客户姓名',
            field: 'userName',
            render: (v, d) => {
                return d.creditUser ? d.creditUser.userName : '';
            },
            search: true
        }, {
            title: '制卡银行',
            field: 'loanBankName'
        }, {
            title: '银行卡号',
            field: 'repayCardNumber',
                render: (v, d) => {
                    return d.repayCardNumber ? d.repayCardNumber : '-';
                }
        }, {
                title: '状态',
                field: 'makeCardNode',
                search: true,
                listCode: 630147,
                keyName: 'code',
                valueName: 'name',
                type: 'select',
                params: {type: 'h'}
            }];
        return this.props.buildList({
            fields,
            pageCode: 632515,
            searchParams: {
                userId: getUserId(),
                roleCode: getRoleCode(),
                makeCardNodeList: ['h1', 'h2']
            },
            btnEvent: {
                    // 填写制卡单
                    addCard: (selectedRowKeys, selectedRows) => {
                        console.log(selectedRows[0]);
                        if (!selectedRowKeys.length) {
                            showWarnMsg('请选择记录');
                        } else if (selectedRowKeys.length > 1) {
                            showWarnMsg('请选择一条记录');
                        } else if (selectedRows[0].makeCardNode !== 'h1') {
                            showWarnMsg('当前不是填写制卡单节点');
                        } else {
                            this.props.history.push(`/loan/madeCard/addedit?code=${selectedRowKeys[0]}`);
                        }
                    },
                    // 手工制卡
                    handCard: (selectedRowKeys, selectedRows) => {
                        if (!selectedRowKeys.length) {
                            showWarnMsg('请选择记录');
                        } else if (selectedRowKeys.length > 1) {
                            showWarnMsg('请选择一条记录');
                        } else if (selectedRows[0].makeCardNode !== 'h2') {
                            showWarnMsg('当前不是手工制卡节点');
                        } else {
                            this.props.history.push(`/loan/madeCard/addedit?v=1&hande=1&code=${selectedRowKeys[0]}`);
                        }
                    },
                    // 工行制卡
                    icbcCard: (selectedRowKeys, selectedRows) => {
                        if (!selectedRowKeys.length) {
                            showWarnMsg('请选择记录');
                        } else if (selectedRowKeys.length > 1) {
                            showWarnMsg('请选择一条记录');
                        } else if (selectedRows[0].makeCardNode !== 'h2') {
                            showWarnMsg('当前不是工行制卡节点');
                        } else {
                            this.props.history.push(`/loan/madeCard/addedit?v=1&isCheckNq=1&code=${selectedRowKeys[0]}`);
                        }
                    },
                // 详情
                  detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/ywcx/ywcx/addedit?v=1&code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default MadeCard;
