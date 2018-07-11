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
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode,
    dateTimeFormat,
    getTeamCode,
    getUserId
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
            type: 'date'
        }, {
            title: '客户姓名',
            field: 'applyUserName',
            search: true
        }, {
            title: '信贷专员',
            field: 'saleUserName'
        }, {
            title: '内勤',
            field: 'insideJob'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '服务费',
            field: 'bankFee',
            amount: true
        }, {
            title: '入档情况',
            field: 'enterStatus',
            type: 'select',
            data: [{
                key: '0',
                value: '待入党'
            }, {
                key: '1',
                value: '已入党'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '落户地点',
            field: 'settleAddress'
        }, {
            title: '代理人',
            field: 'pledgeUser'
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
            pageCode: 632913,
            searchParams: {
                userId: getUserId()
            }
        });
    }
}

export default DayReport;