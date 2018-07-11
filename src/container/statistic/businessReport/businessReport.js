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
} from '@redux/statistic/businessReport';
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
        ...state.statisticBusinessReport,
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
class BusinessReport extends React.Component {
    render() {
        const fields = [{
            title: '公司服务费',
            field: 'companyFee',
            amount: true
        }, {
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
            title: '现住址',
            field: 'nowAddress'
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
            title: '贷款本金手续费',
            field: 'bankFee',
            amount: true
        }, {
            title: '内勤',
            field: 'insideJob'
        }, {
            title: '刷卡总金额',
            field: 'cardTotalAmount',
            amount: true
        }, {
            title: '刷卡总手续费',
            field: 'cardTotalFee',
            amount: true
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
            title: '贷款进度',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            search: true
        }, {
            title: '放款日',
            field: 'bankFkDatetime'
        }, {
            title: '还款日',
            field: 'repayBankDate'
        }, {
            title: '保单日期',
            field: 'policyDatetime',
            type: 'date'
        }, {
            title: '保单到期日',
            field: 'policyDueDate',
            type: 'date'
        }, {
            title: '业务种类',
            field: 'bizType',
            type: 'select',
            key: 'budget_orde_biz_typer',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632915,
            searchParams: {
                roleCode: getRoleCode(),
                teamCode: getTeamCode()
            }
        });
    }
}

export default BusinessReport;