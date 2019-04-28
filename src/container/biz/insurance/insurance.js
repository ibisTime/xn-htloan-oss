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
} from '@redux/biz/insurance';
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
        ...state.bizInsurance,
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
class Insurance extends React.Component {
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
            render: (v, d) => {
                return d ? d.creditUser.userName : '-';
            },
            search: true
        }, {
            title: '汽车经销商',
            field: 'applyUserName2'
        }, {
            title: '贷款银行',
            field: 'loanBankName'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '贷款期数',
            field: 'loanPeriod',
            render: (v, d) => {
              return d.repayBiz ? d.repayBiz.restPeriods : '';
            }
        }, {
            title: '购车途径',
            field: 'bizType',
            type: 'select',
            key: 'budget_orde_biz_typer'
        },
           {
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
        },
        //     {
        //     title: '业务内勤',
        //     field: 'insideJobName'
        // },
           {
            title: '申请日期',
            field: 'applyDatetime',
            rangedate: ['applyDatetimeStart', 'applyDatetimeEnd'],
            type: 'date',
            render: dateTimeFormat
        }, {
            title: '状态',
            field: 'advanfCurNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            search: true,
            params: {type: 'a'}
        }, {
                title: '备注',
                field: 'remark'
            }];
        return this.props.buildList({
            fields,
            pageCode: 632148,
            searchParams: {
                userId: getUserId(),
                roleCode: getRoleCode(),
                advanfCurNodeCodeList: ['002_18']
            },
            btnEvent: {
                // 录入
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].advanfCurNodeCode !== '002_18') {
                        showWarnMsg('当前不是录入发保合节点');
                    } else {
                        this.props.history.push(`${this.props.location.pathname}/addedit?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default Insurance;
