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
} from '@redux/statistic/dayReport';
import { getUserId } from 'common/js/util';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.statisticDayReport,
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
class DayReport extends React.Component {
    render() {
        const fields = [{
            title: '收件日期',
            field: 'receiptDatetime',
            type: 'date',
            nowrap: true
        }, {
            title: '客户姓名',
            field: 'applyUserName',
            search: true,
            nowrap: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            nowrap: true
        }, {
            title: '服务费',
            field: 'bankFee',
            amount: true,
            nowrap: true
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            nowrap: true
        }, {
            title: '入档情况',
            field: 'enterStatus',
            type: 'select',
            data: [{
                key: '0',
                value: '待入档'
            }, {
                key: '1',
                value: '已入档'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true,
            nowrap: true
        }, {
            title: '落户地点',
            field: 'settleAddress',
            nowrap: true
        }, {
            title: '代理人',
            field: 'pledgeUser',
            nowrap: true
        }, {
            title: '内勤',
            field: 'insideJobName',
            nowrap: true
        }, {
            title: '信贷专员',
            field: 'saleUserName',
            nowrap: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632913,
            searchParams: {
                userId: getUserId()
            }
        });
    }
}

export default DayReport;
