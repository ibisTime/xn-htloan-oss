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
} from '@redux/basedata/goodsloan';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, showSucMsg} from 'common/js/util';
import {Button, Upload, Modal} from 'antd';
import {loanGoodsPutaway, loanGoodsSoldOut} from 'api/biz';
import {setTimeout} from 'core-js';

@listWrapper(
    state => ({
        ...state.bizGoodsloan,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Goodsloan extends React.Component {
    render() {
        const fields = [{
            title: '产品名称',
            field: 'name'
        }, {
            title: '针对类型',
            field: 'type',
            type: 'select',
            key: 'budget_orde_biz_typer'
        }, {
            title: '贷款银行',
            field: 'loanBankName'
        }, {
            title: '万元系数',
            field: 'wanFactor',
            amount: true
        }, {
            title: '年化利率',
            field: 'yearRate'
        }, {
            title: 'GPS费用(元)',
            field: 'gpsFee',
            amount: true
        }, {
            title: '公证费利率',
            field: 'authRate'
        }, {
            title: '返点利率',
            field: 'backRate'
        }, {
            title: '前置利率',
            field: 'preRate'
        }, {
            title: '是否前置',
            field: 'isPre',
            type: 'select',
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'loan_product_status',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632175,
            btnEvent: {
                lower: (key, item) => {
                    if (!key || !key.length || !item || !item.length) {
                        showWarnMsg('请选择记录');
                    } else if (item[0].status !== '2') {
                        showWarnMsg('该状态不可下架');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '确定下架？',
                            onOk: () => {
                                this.props.doFetching();
                                return loanGoodsSoldOut(key[0]).then(() => {
                                    this.props.cancelFetching();
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
                },
                onShelf: (key, item) => {
                    if (!key || !key.length || !item || !item.length) {
                        showWarnMsg('请选择记录');
                    } else if (item[0].status === '2') {
                        showWarnMsg('该状态不可上架');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '确定上架？',
                            onOk: () => {
                                this.props.doFetching();
                                return loanGoodsPutaway(key[0]).then(() => {
                                    this.props.cancelFetching();
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
                },
                edit: (key, item) => {
                    console.log(item);
                    if (!key || !key.length || !item || !item.length) {
                        showWarnMsg('请选择记录');
                    } else if (item[0].status === '2') {
                        showWarnMsg('下架后才能修改');
                    } else {
                        this.props.history.push(`/basedata/goodsloan/addedit?code=${item[0].code}`);
                    }
                }
            }
        });
    }
}

export default Goodsloan;
