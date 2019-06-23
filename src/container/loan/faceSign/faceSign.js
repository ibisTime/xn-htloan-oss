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
} from '@redux/loan/faceSign';
import {
    showWarnMsg,
    getRoleCode,
    getUserId,
    dateFormat
} from 'common/js/util';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.loanFaceSign,
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
class FaceSign extends React.Component {
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
            field: 'loanBankName',
            readonly: true
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
            type: 'select',
            listCode: 630106,
            params: {
                typeList: ['1'],
                status: '1'
            },
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
            pageCode: 632515,
            searchParams: {
                userId: getUserId(),
                roleCode: getRoleCode(),
                intevCurNodeCodeList: ['b01', 'b02', 'b03', 'b01x']
            },
            btnEvent: {
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].intevCurNodeCode !== 'b01' && selectedRows[0].intevCurNodeCode !== 'b01x') {
                        showWarnMsg('当前不是录入面签信息节点');
                    } else {
                        this.props.history.push(`/loan/faceSign/addedit?code=${selectedRowKeys[0]}`);
                    }
                },
                // 内勤主管审核
                checkNq: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].intevCurNodeCode !== 'b02') {
                        showWarnMsg('当前不是内勤主管审核节点');
                    } else {
                        this.props.history.push(`/loan/faceSign/addedit?v=1&isCheckNq=1&code=${selectedRowKeys[0]}`);
                    }
                },
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/ywcx/ywcx/addedit?&v=1&code=${selectedRows[0].code}`);
                    }
                }
            }
        });
    }
}

export default FaceSign;
