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
} from '@redux/biz/settlement';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, isUndefined, moneyFormat, getUserId } from 'common/js/util';

@listWrapper(
    state => ({
        ...state.bizSettlement,
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
class settlement extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '客户姓名',
            field: 'userId',
            search: true,
            render: (v, d) => {
                return d.user.realName;
            },
            type: 'select',
            pageCode: 805120,
            keyName: 'userId',
            valueName: 'realName',
            searchName: 'realName'
        }, {
            title: '手机号',
            field: 'mobile',
            render: (v, d) => {
                return d.user.mobile;
            }
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '剩余欠款',
            field: 'restAmount',
            amount: true
        }, {
            title: '未还清收成本',
            field: 'restTotalCost',
            amount: true
        }, {
            title: '未还代偿金额',
            field: 'unRepayTotalAmount',
            render: (v) => {
                return isUndefined(v) ? '0.00' : <span style={{whiteSpace: 'nowrap'}}>{moneyFormat(v)}</span>;
            }
        }, {
            title: '扣除履约保证金',
            field: 'cutLyDeposit',
            amount: true
        }, {
            title: '是否提前还款',
            field: 'isAdvanceSettled',
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
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 630522,
            searchParams: {
                refType: '0',
                curNodeCodeList: ['j2', 'j3', 'j4', 'j5'],
                userId: getUserId()
            },
            btnEvent: {
                // 清款催收部审核
                collection: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== 'j2') {
                        showWarnMsg('当前节点不是清款催收部审核节点');
                    } else {
                        this.props.history.push(`/biz/settlement/collection?code=${selectedRowKeys[0]}`);
                    }
                },
                // 财务审核
                finance: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== 'j5') {
                        showWarnMsg('当前节点不是财务审核节点');
                    } else {
                        this.props.history.push(`/biz/settlement/finance?code=${selectedRowKeys[0]}`);
                    }
                },
                // 总经理审核
                manager: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== 'j4') {
                        showWarnMsg('当前节点不是总经理审核节点');
                    } else {
                        this.props.history.push(`/biz/settlement/manager?code=${selectedRowKeys[0]}`);
                    }
                },
                // 驻行人员审核
                stationed: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== 'j3') {
                        showWarnMsg('当前节点不是驻行人员审核节点');
                    } else {
                        this.props.history.push(`/biz/settlement/stationed?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default settlement;
