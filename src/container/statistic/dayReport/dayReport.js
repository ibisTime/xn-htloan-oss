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
            field: 'code',
            type: 'date'
        }, {
            title: '客户姓名',
            field: 'userName',
            render: (e, t) => {
                return (t.creditUser ? t.creditUser.userName : '-');
            },
            search: true
        }, {
            title: '信贷专员',
            field: 'saleUserId',
            type: 'select',
            pageCode: 630065,
            params: {
                type: 'P'
            },
            keyName: 'userId',
            valueName: '{{companyName.DATA}}-{{realName.DATA}}',
            searchName: 'realName',
            search: true,
            render: (v, d) => {
                return d.saleUserName;
            }
        }, {
            title: '内勤',
            field: 'operatorName'
        }, {
            title: '贷款金额',
            field: '11',
            amount: true
        }, {
            title: '服务费',
            field: 'fee',
            amount: true
        }, {
            title: '入党情况',
            field: '11',
            type: 'select',
            data: [{
                key: '0',
                value: '待入党'
            }, {
                key: '1',
                value: '已入党'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '落户地点',
            field: '11'
        }, {
            title: '代理人',
            field: '11'
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
            pageCode: 632148,
            searchParams: {
                roleCode: getRoleCode(),
                teamCode: getTeamCode(),
                curNodeCodeList: ['002_01', '002_02', '002_03', '002_04', '002_24']
            }
        });
    }
}

export default DayReport;