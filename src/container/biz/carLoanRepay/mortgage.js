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
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode,
    dateTimeFormat,
    getUserId
} from 'common/js/util';
import {
    Button,
    Upload,
    Modal
} from 'antd';
import {
    lowerFrame,
    onShelf
} from 'api/biz';
import fetch from 'common/js/fetch';

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
            title: '客户姓名',
            field: 'applyUserName',
            search: true
        }, {
            title: '贷款银行',
            field: 'loanBankName'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '贷款期数',
            field: 'loanPeriod'
        }, {
            title: '业务种类',
            field: 'bizType',
            type: 'select',
            key: 'budget_orde_biz_typer'
        }, {
            title: '业务员',
            field: 'saleUserName'
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
        }];
        return this.props.buildList({
            fields,
            pageCode: 632145,
            searchParams: {
              roleCode: getRoleCode()
            },
            btnEvent: {
              enter: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/biz/mortgage/enter?code=${selectedRowKeys[0]}`);
                }
              },
              sub: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/biz/mortgage/sub?code=${selectedRowKeys[0]}`);
                }
              },
              complete: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                    Modal.confirm({
                        okText: '确认',
                        cancelText: '取消',
                        content: '确定抵押完成？',
                        onOk: () => {
                            console.log(selectedRowKeys[0]);
                            let param = {};
                            param.code = selectedRowKeys[0];
                            param.operator = getUserId();
                            this.props.doFetching();
                            return fetch(632133, param).then(() => {
                                this.props.cancelFetching();
                                showWarnMsg('操作成功');
                                setTimeout(() => {
                                    this.props.getPageData();
                                }, 1000);
                            }).catch(() => {
                                this.props.cancelFetching();
                            });
                        }
                    });
                  // this.props.history.push(`/biz/mortgage/certain?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default mortgage;
