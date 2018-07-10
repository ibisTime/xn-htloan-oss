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
} from '@redux/loan/advMoney';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode,
    getTeamCode,
    dateTimeFormat
} from 'common/js/util';
import {
    listWrapper
} from 'common/js/build-list';
import {
    lowerFrame,
    onShelf,
    sendMsg
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.loanAdvMoney,
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
class AdvMoney extends React.Component {
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
                typeList: [1]
            },
            type: 'select',
            keyName: 'code',
            valueName: 'name',
            search: true
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
            field: 'applyUserName',
            search: true
        }, {
            title: '手机号',
            field: 'mobile'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '贷款期限',
            field: 'loanPeriod',
            type: 'select',
            key: 'loan_period'
        }, {
            title: '业务种类',
            field: 'bizType',
            type: 'select',
            key: 'budget_orde_biz_typer'
        }, {
            title: '是否垫资',
            field: 'isAdvanceFund',
            type: 'select',
            data: [{
                dkey: '0',
                dvalue: '否'
            }, {
                dkey: '1',
                dvalue: '是'
            }],
            keyName: 'dkey',
            valueName: 'dvalue'
        }, {
            title: '申请日期',
            field: 'applyDatetime',
            rangedate: ['applyDatetimeStart', 'applyDatetimeEnd'],
            type: 'date',
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
            title: '关键字搜索',
            field: 'keyword',
            hidden: true,
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632148,
            searchParams: {
                roleCode: getRoleCode(),
                teamCode: getTeamCode(),
                curNodeCodeList: ['002_07']
            },
            btnEvent: {
                add: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '002_07') {
                        showWarnMsg('当前不是财务确认垫资节点');
                    } else {
                        this.props.history.push(`/loan/faceSign/addedit?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default AdvMoney;
