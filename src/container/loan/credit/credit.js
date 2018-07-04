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
} from '@redux/loan/credit';
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
        ...state.loanCredit,
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
class Credit extends React.Component {
    render() {
        const fields = [{
            title: '业务公司',
            field: 'companyName'
        }, {
            title: '客户姓名',
            field: 'userName',
            render: (e, t) => {
                return (t.creditUser ? t.creditUser.userName : '-');
            },
            search: true
        }, {
            title: '手机号',
            field: 'mobile',
            render: (e, t) => {
                return (t.creditUser ? t.creditUser.mobile : '-');
            }
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
            title: '业务员',
            field: 'saleUserId',
            type: 'select',
            params: {
                type: 'PS'
            },
            listCode: 630066,
            keyName: 'userId',
            valueName: 'realName',
            search: true
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
            title: '关键字搜索',
            field: '11',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632115,
            searchParams: {
                roleCode: getRoleCode(),
                teamCode: getTeamCode()
            },
            btnEvent: {
                apply: (selectedRowKeys, selectedRows) => {
                    let code = selectedRowKeys ? selectedRowKeys[0] : '';
                    if (code) {
                        if (selectedRows[0].curNodeCode !== '001_01' && selectedRows[0].curNodeCode !== '001_04') {
                            showWarnMsg('当前不是填写征信单的节点');
                            return;
                        }
                        this.props.history.push(`/loan/credit/addedit?isAddedit=1&code=${code}`);
                    } else {
                        this.props.history.push(`/loan/credit/addedit?isAddedit=1`);
                    }
                },
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '001_03') {
                        showWarnMsg('当前不是风控专员审核的节点');
                    } else {
                        this.props.history.push(`/loan/credit/addedit?v=1&isCheck=1&code=${selectedRowKeys[0]}`);
                    }
                },
                entering: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '001_02') {
                        showWarnMsg('当前不是录入征信结果的节点');
                    } else {
                        this.props.history.push(`/loan/credit/addedit?v=1&isEntry=1&code=${selectedRowKeys[0]}`);
                    }
                },
                withdraw: (key, item) => {
                  if (!key || !key.length || !item || !item.length) {
                    showWarnMsg('请选择记录');
                  } else if (item[0].curNodeCode !== '001_01' || item[0].curNodeCode !== '001_02') {
                    showWarnMsg('该状态不可撤回');
                  } else {
                    Modal.confirm({
                      okText: '确认',
                      cancelText: '取消',
                      content: '确定撤回？',
                      onOk: () => {
                        this.props.doFetching();
                        return creditWithdraw(key[0]).then(() => {
                          this.props.getPageData();
                          showWarnMsg('操作成功');
                          setTimeout(() => {
                              this.props.getPageData();
                          }, 500);
                        }).catch(() => {
                          this.props.cancelFetching();
                        });
                      }
                    });
                  }
                }
            }
        });
    }
}

export default Credit;
