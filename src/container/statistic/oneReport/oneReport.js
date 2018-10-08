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
} from '@redux/statistic/oneReport';
import { showWarnMsg } from 'common/js/util';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.statisticOneReport,
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
class OneReport extends React.Component {
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
            title: '地区',
            field: 'region',
            type: 'select',
            key: 'region',
            search: true
        }, {
            title: '贷款银行',
            field: 'loanBank',
            type: 'select',
            listCode: 632037,
            keyName: 'code',
            valueName: '{{bankName.DATA}}{{subbranch.DATA}}',
            search: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '垫资日期',
            field: 'advanceFundDatetime',
            type: 'date'
        }, {
            title: '垫资天数',
            field: 'advanceDays'
        }, {
            title: '信贷专员',
            field: 'saleUserName'
        }, {
            title: '内勤',
            field: 'insideJob'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632910
        });
    }
}

export default OneReport;
