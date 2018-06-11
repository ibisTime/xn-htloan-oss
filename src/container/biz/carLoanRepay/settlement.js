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
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg,
    dateTimeFormat
} from 'common/js/util';
import {
    Button,
    Upload,
    Modal
} from 'antd';
import {
    lowerFrame,
    onShelf
} from 'api/biz';

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
            title: '贷款人',
            field: 'user',
            search: true,
            render: (v, d) => {
                return d.user.realName;
            }
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
            amount: true
        }, {
            title: '扣除履约保证金',
            field: 'cutLyDeposit',
            amount: true
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }];
        return this.props.buildList({
            fields,
            pageCode: 630520,
            searchParams: {
              refType: '0',
              curNodeCodeList: ['003_02', '003_03', '003_04', '003_05']
            },
            btnEvent: {
                collection: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '003_02') {
                        showWarnMsg('当前节点不是清款催收部审核节点');
                    } else {
                        this.props.history.push(`/biz/settlement/collection?code=${selectedRowKeys[0]}`);
                    }
                },
                finance: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '003_05') {
                        showWarnMsg('当前节点不是财务审核节点');
                    } else {
                        this.props.history.push(`/biz/settlement/finance?code=${selectedRowKeys[0]}`);
                    }
                },
                manager: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '003_04') {
                        showWarnMsg('当前节点不是总经理审核节点');
                    } else {
                        this.props.history.push(`/biz/settlement/manager?code=${selectedRowKeys[0]}`);
                    }
                },
                stationed: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '003_03') {
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
