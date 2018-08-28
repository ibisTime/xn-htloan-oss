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
} from '@redux/statistic/teamReport';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode,
    dateTimeFormat,
    getTeamCode
} from 'common/js/util';
import {
    listWrapper
} from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.statisticTeamReport,
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
class TeamReport extends React.Component {
    render() {
        const fields = [{
            title: '信贷专员',
            field: 'saleUserName'
        }, {
            title: '客户姓名',
            field: 'applyUserName',
            search: true
        }, {
            title: '身份证号码',
            field: 'idNo'
        }, {
            title: '贷款期限',
            field: 'loanPeriod',
            type: 'select',
            key: 'loan_period',
            search: true
        }, {
            title: '联系电话',
            field: 'contactNo'
        }, {
            title: '汽车品牌',
            field: 'carBrand'
        }, {
            title: '汽车价格',
            field: 'originalPrice',
            amount: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '内勤',
            field: 'insideJob'
        }, {
            title: '第一期月供',
            field: 'repayFirstMonthAmount',
            amount: true
        }, {
            title: '每月月供',
            field: 'repayMonthAmount',
            amount: true
        }, {
            title: '信用卡卡号',
            field: 'repayBankcardNumber'
        }, {
            title: '还款日',
            field: 'repayBankDate'
        }, {
            title: '业务种类',
            field: 'bizType',
            type: 'select',
            key: 'budget_orde_biz_typer',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632916,
            searchParams: {
                teamCode: getTeamCode()
            }
        });
    }
}

export default TeamReport;