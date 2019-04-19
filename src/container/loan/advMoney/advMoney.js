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
            search: true
        }, {
            title: '汽车经销商',
            field: 'applyUserName2'
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
            field: 'loanPeriod',
            type: 'select',
            key: 'loan_period'
        }, {
            title: '购车途径',
            field: 'loanPeriod2',
            type: 'select',
            key: 'loan_period'
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
            title: '申请日期',
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
                curNodeCodeList: ['002_07', '002_29']
            },
            btnEvent: {
                // 财务审核
                // check: (selectedRowKeys, selectedRows) => {
                //     if (!selectedRowKeys.length) {
                //         showWarnMsg('请选择记录');
                //     } else if (selectedRowKeys.length > 1) {
                //         showWarnMsg('请选择一条记录');
                //     } else if (selectedRows[0].curNodeCode !== '002_29') {
                //         showWarnMsg('当前不是财务审核节点');
                //     } else {
                //         this.props.history.push(`${this.props.location.pathname}/addedit?code=${selectedRowKeys[0]}&check=1&v=1`);
                //     }
                // },
                // 财务确认垫资
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '002_07') {
                        showWarnMsg('当前不是财务确认垫资节点');
                    } else {
                        this.props.history.push(`${this.props.location.pathname}/addedit?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default AdvMoney;
