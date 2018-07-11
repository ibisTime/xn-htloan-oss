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
import {
    creditWithdraw
} from 'api/biz';
import {
    Button,
    Upload,
    Modal
} from 'antd';

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
            field: 'creditJob'
        }, {
            title: '客户姓名',
            field: 'userName'
        }, {
            title: '身份证号码',
            field: 'idNo'
        }, {
            title: '贷款期限',
            field: 'loanPeriod'
        }, {
            title: '联系电话',
            field: 'contactNo'
        }, {
            title: '汽车品牌',
            field: 'carBrand'
        }, {
            title: '汽车价格',
            field: 'carPrice',
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
            field: 'creditCardNo'
        }, {
            title: '还款日',
            field: 'repayBankDate'
        }, {
            title: '业务种类',
            field: 'bizType',
            type: 'select',
            key: 'biz_type'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632916,
            searchParams: {
                roleCode: getRoleCode(),
                teamCode: getTeamCode()
            }
        });
    }
}

export default TeamReport;