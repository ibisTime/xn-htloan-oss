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
} from '@redux/analysis/creditReport';
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
import { Button, Upload, Modal } from 'antd';

@listWrapper(
    state => ({
        ...state.analysisCreditReport,
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
class CreditReport extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '业务公司',
            field: 'companyName'
        }, {
            title: '业务团队',
            field: 'teamName'
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
            title: '客户姓名',
            field: 'userName',
            render: (e, t) => {
                return (t.creditUser ? t.creditUser.userName : '-');
            },
            search: true
        }, {
            title: '手机号',
            field: 'mobile'
        }, {
            title: '贷款银行',
            field: 'loanBankCode',
            type: 'select',
            listCode: 632037,
            keyName: 'code',
            valueName: '{{bankName.DATA}}{{subbranch.DATA}}'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '驻行内勤',
            field: 'operatorName'
        }, {
            title: '申请日期',
            field: 'applyDatetime',
            type: 'date',
            rangedate: ['applyDatetimeStart', 'applyDatetimeEnd'],
            render: dateTimeFormat,
            search: true
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '节点时间',
            field: 'updateDatetime',
            type: 'datetime'
        }, {
            title: '节点操作人',
            field: 'updaterName'
        }, {
            title: '是否通过',
            field: 'isPass',
            type: 'select',
            data: [{
                key: '0',
                value: '不通过'
            }, {
                key: '1',
                value: '通过'
            }],
            keyName: 'key',
            valueName: 'value',
            hidden: true,
            search: true
        }, {
            title: '关键字搜索',
            field: 'keyword',
            hidden: true,
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632115,
            searchParams: {
                roleCode: getRoleCode(),
                teamCode: getTeamCode(),
                curNodeCodeList: ['001_01', '001_02', '001_03', '001_04', '001_05', '001_06', '001_07']
            }
        });
    }
}

export default CreditReport;
