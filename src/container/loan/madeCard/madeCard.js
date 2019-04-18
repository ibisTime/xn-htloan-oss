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
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '客户姓名',
            field: 'applyUserName',
            search: true
        }, {
            title: '制卡银行',
            field: 'loanBankName',
            readonly: true
        }, {
            field: 'payCardNo',
            title: '银行卡号',
            bankCard: true,
            minlength: 15,
            readonly: true
        }, {
            title: '当前节点',
            field: 'intevCurNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            search: true,
            params: {type: 'b0'}
        }];
        return this.props.buildList({
            fields,
            pageCode: 632148, // 角色权限分页查询
            searchParams: {
                userId: getUserId(),
                roleCode: getRoleCode(),
                intevCurNodeCodeList: ['b01', 'b02', 'b03', 'b01x']
            },
            btnEvent: {
                // 填写制卡单
                addCard: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].intevCurNodeCode !== 'b01' && selectedRows[0].intevCurNodeCode !== 'b01x') {
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
                    } else if (selectedRows[0].intevCurNodeCode !== 'b02') {
                        showWarnMsg('当前不是手工制卡节点');
                    } else {
                        this.props.history.push(`/loan/madeCard/addedit?v=1&isCheckNq=1&code=${selectedRowKeys[0]}`);
                    }
                },
                // 工行制卡
                icbcCard: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].intevCurNodeCode !== 'b02') {
                        showWarnMsg('当前不是手工制卡节点');
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
                    } else if (selectedRows[0].intevCurNodeCode !== 'b02') {
                        showWarnMsg('当前不是手工制卡节点');
                    } else {
                        this.props.history.push(`/loan/madeCard/addedit?v=1&isCheckNq=1&code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default MadeCard;
