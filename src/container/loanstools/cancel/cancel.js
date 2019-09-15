import React from 'react';
import {
    cancelFetching,
    clearSearchParam,
    doFetching,
    setBtnList,
    setPagination,
    setSearchData,
    setSearchParam,
    setTableData
} from '@redux/loanstools/cancel';
import {
    dateTimeFormat,
    getUserId,
    showSucMsg,
    showWarnMsg
} from 'common/js/util';
import {listWrapper} from 'common/js/build-list';
import {lowerFrame, onShelf, sendMsg} from 'api/biz';

@listWrapper(
    state => ({
        ...state.loanstoolsCancel,
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
class cancel extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            nowrap: true,
            search: true
        }, {
            title: '业务公司',
            field: 'saleUserCompanyName',
            nowrap: true
        }, {
            title: '客户姓名',
            field: 'applyUserName',
            render: (v, d) => {
              return d.creditUser ? d.creditUser.userName : '';
            },
            search: true
        }, {
            title: '贷款银行',
            field: 'loanBank',
            type: 'select',
            listCode: 632037,
            keyName: 'code',
            valueName: '{{bankName.DATA}}{{subbranch.DATA}}'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
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
                key: '1',
                value: '是'
            }, {
                key: '0',
                value: '否'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '垫资时间',
            field: 'advanceFundDatetime',
            type: 'date',
           render: (v, d) => {
                return d.advance ? dateTimeFormat(d.advance.advanceFundDatetime) : '';
           }
        }, {
            title: '垫资金额',
            field: 'advanceFundAmount',
            render: (v, d) => {
                return d.advance ? d.advance.advanceFundAmount : '';
            }
        }, {
            title: '当前节点',
            field: 'cancelNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            search: true,
            params: {type: 'i'}
        }];
        return this.props.buildList({
            fields,
            pageCode: 632515,
            searchParams: {
                cancelNodeCodeList: ['i1', 'i2', 'i3'],
                userId: getUserId(),
                isCancel: '1'
            },
            btnEvent: {
                apply: (selectedRowKeys, selectedRows) => {
                    this.props.history.push(`/loanstools/cancel/apply?`);
                },
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].cancelNodeCode !== 'i1') {
                        showWarnMsg('当前不是填写业务总监审核节点');
                    } else {
                        this.props.history.push(`/loanstools/cancel/check?code=${selectedRowKeys[0]}`);
                    }
                },
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/ywcx/ywcx/addedit?v=1&code=${selectedRowKeys[0]}`);
                    }
                },
                certain: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].cancelNodeCode !== 'i2') {
                        showWarnMsg('当前不是填写财务总监审核节点');
                    } else {
                        this.props.history.push(`/loanstools/cancel/certain?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default cancel;
