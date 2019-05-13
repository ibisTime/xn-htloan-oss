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
} from '@redux/biz/mortgage';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, getRoleCode, dateTimeFormat, getUserId } from 'common/js/util';

@listWrapper(
    state => ({
        ...state.bizMortgage,
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
class mortgage extends React.Component {
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
            required: true
        }, {
            title: '业务团队',
            field: 'teamName'
        }, {
            title: '信贷专员',
            field: 'saleUserId',
            type: 'select',
            pageCode: 630065,
            params: {
                type: 'P',
                roleCodeList: ['SR201800000000000000YWY', 'SR20180000000000000NQZY']
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
            search: true,
            render: (v, d) => {
                return d.creditUser ? d.creditUser.userName : '';
            }
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            render: (v, d) => {
                if (d.loanBankName) {
                    return d.repaySubbranch ? d.loanBankName + d.repaySubbranch : d.loanBankName;
                } else if (d.repaySubbranch) {
                    return d.loanBankName ? d.loanBankName + d.repaySubbranch : d.repaySubbranch;
                }
            }
            }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '贷款期数',
            field: 'loanPeriod',
            render: (v, d) => {
                return d.loanInfo ? d.loanInfo.periods : '-';
            }
        }, {
            title: '业务种类',
            field: 'bizType',
            type: 'select',
            key: 'budget_orde_biz_typer'
        }, {
            title: '申请日期',
            field: 'applyDatetime',
            rangedate: ['applyDatetimeStart', 'applyDatetimeEnd'],
            type: 'date',
            render: dateTimeFormat,
            search: true
        }, {
            title: '状态',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            params: { type: 'f' },
            afterDetail: (list) => {
                if (list && list.length) {
                    list.unshift({ code: 'e6', name: '待抵押申请', type: 'e' });
                    return list;
                }
                return [];
            },
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632515,
            searchParams: {
              userId: getUserId(),
              roleCode: getRoleCode(),
              curNodeCodeList: ['e6', 'f1', 'f2', 'f3', 'f4', 'f2x', 'f4', 'f5', 'f5x', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12', 'f13', 'f14']
            },
            btnEvent: {
              // 抵押申请
              apply: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
              } else if (selectedRows[0].curNodeCode !== 'e6') {
                  showWarnMsg('当前不是抵押申请节点');
                } else {
                  this.props.history.push(`/biz/mortgage/apply?code=${selectedRowKeys[0]}`);
                }
              },
              // 内勤确认
              confirm: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else if (selectedRows[0].curNodeCode !== 'f1') {
                  showWarnMsg('当前不是内勤确认节点');
                } else {
                  this.props.history.push(`/biz/mortgage/confirm?code=${selectedRowKeys[0]}&check=1`);
                }
              },
              // 录入抵押信息
              enter: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else if (selectedRows[0].curNodeCode !== 'f4') {
                  showWarnMsg('当前不是录入抵押信息节点');
                } else {
                  this.props.history.push(`/biz/mortgage/enter?code=${selectedRowKeys[0]}`);
                }
              },
              // 确认提交银行
              sub: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else if (selectedRows[0].curNodeCode !== 'f9') {
                  showWarnMsg('当前不是确认提交银行节点');
                } else {
                  this.props.history.push(`/biz/mortgage/sub?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default mortgage;
