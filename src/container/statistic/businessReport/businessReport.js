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
import { listWrapper } from 'common/js/build-list';
import { getUserId } from 'common/js/util';

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
            title: '信贷专员',
            field: 'saleUserName',
            nowrap: true
        }, {
            title: '内勤',
            field: 'insideJobName',
            nowrap: true
        }, {
            title: '客户姓名',
            field: 'applyUserName',
            search: true,
            nowrap: true
        }, {
            title: '身份证号码',
            field: 'idNo',
            nowrap: true
        }, {
            title: '贷款期限',
            field: 'loanPeriod',
            type: 'select',
            key: 'loan_period',
            search: true,
            nowrap: true
        }, {
            title: '现住址',
            field: 'nowAddress',
            nowrap: true
        }, {
            title: '联系电话',
            field: 'contactNo',
            nowrap: true
        }, {
            title: '汽车品牌',
            field: 'carBrand',
            nowrap: true
        }, {
            title: '汽车价格',
            field: 'originalPrice',
            amount: true,
            nowrap: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            nowrap: true
        }, {
            title: '贷款本金手续费',
            field: 'bankFee',
            amount: true,
            nowrap: true
        }, {
            title: '公司服务费',
            field: 'companyFee',
            amount: true,
            nowrap: true
        }, {
            title: '刷卡总金额',
            field: 'cardTotalAmount',
            amount: true,
            nowrap: true
        }, {
            title: '刷卡总手续费',
            field: 'cardTotalFee',
            amount: true,
            nowrap: true
        }, {
            title: '第一期月供',
            field: 'repayFirstMonthAmount',
            amount: true,
            nowrap: true
        }, {
            title: '每月月供',
            field: 'repayMonthAmount',
            amount: true,
            nowrap: true
        }, {
            title: '信用卡卡号',
            field: 'repayBankcardNumber',
            nowrap: true
        }, {
            title: '贷款进度',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            search: true,
            nowrap: true
        }, {
            title: '放款日',
            field: 'bankFkDatetime',
            type: 'date',
            nowrap: true
        }, {
            title: '还款日',
            field: 'repayBankDate',
            nowrap: true
        }, {
            title: '保单日期',
            field: 'policyDatetime',
            type: 'datetime',
            nowrap: true
        }, {
            title: '保单到期日',
            field: 'policyDueDate',
            type: 'datetime',
            nowrap: true
        }, {
            title: '业务种类',
            field: 'bizType',
            type: 'select',
            key: 'budget_orde_biz_typer',
            search: true,
            nowrap: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632915,
            searchParams: {
              userId: getUserId()
            }
        });
    }
}

export default BusinessReport;
