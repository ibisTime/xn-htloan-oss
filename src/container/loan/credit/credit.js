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
                type: 'P',
                roleCode: 'SR201800000000000000YWY'
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
                curNodeCodeList: ['001_01', '001_02', '001_03', '001_04', '001_05', '001_06', '001_07', '001_08']
            },
            btnEvent: {
                apply: (selectedRowKeys, selectedRows) => {
                    let code = selectedRowKeys ? selectedRowKeys[0] : '';
                    if (code) {
                        if (selectedRows[0].curNodeCode !== '001_01' && selectedRows[0].curNodeCode !== '001_05' && selectedRows[0].curNodeCode !== '001_07') {
                            showWarnMsg('当前不是填写征信单的节点');
                            return;
                        }
                        this.props.history.push(`/loan/credit/addedit?isAddedit=1&code=${code}`);
                    } else {
                        this.props.history.push(`/loan/credit/addedit?isAddedit=1`);
                    }
                },
                dispatch: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '001_08') {
                        showWarnMsg('当前不是内勤主管派单的节点');
                    } else {
                        this.props.history.push(`/loan/credit/dispatch?code=${selectedRowKeys[0]}`);
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
                    } else if (selectedRows[0].curNodeCode !== '001_02' && selectedRows[0].curNodeCode !== '001_06') {
                        showWarnMsg('当前不是录入征信结果的节点');
                    } else {
                        this.props.history.push(`/loan/credit/addedit?v=1&isEntry=1&code=${selectedRowKeys[0]}`);
                    }
                },
                bigData: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else {
                        this.props.history.push(`/loan/credit/bigdata?&code=${selectedRowKeys[0]}`);
                    }
                },
                withdraw: (key, item) => {
                  if (!key || !key.length || !item || !item.length) {
                    showWarnMsg('请选择记录');
                  } else if (item[0].curNodeCode !== '001_01' && item[0].curNodeCode !== '001_02' && item[0].curNodeCode !== '001_06') {
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
