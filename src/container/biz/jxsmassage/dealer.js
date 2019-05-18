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
} from '@redux/basedata/dealer';
import {
    showWarnMsg,
    showSucMsg
} from 'common/js/util';
import {
    listWrapper
} from 'common/js/build-list';
import {
    dealerLower,
    dealerOnShelf,
    sendMsg
} from 'api/biz';
import {
    Modal
} from 'antd';

@listWrapper(
    state => ({
        ...state.basisDealer,
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
class Dealer extends React.Component {
    render() {
        const fields = [{
            title: '经销商编号',
            field: 'code',
            hidden: true
        }, {
            title: '经销商简称',
            field: 'abbrName',
            search: true
        }, {
            title: '经销商全称',
            field: 'fullName'
        }, {
            title: '是否自主开发',
            field: 'isSelfDevelop',
            type: 'select',
            required: true,
            search: true,
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
            title: '车行经营性质',
            field: 'carDealerType',
            render: (v) => {
                let dict = {
                    '0': '综合店',
                    '1': '4S店'
                };
                return dict[v];
            }
        }, {
            title: '所属分公司',
            field: 'belongBranchCompany',
            type: 'select',
            listCode: 630106,
            params: {
                typeList: [1],
                status: 1
            },
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '更新时间',
            field: 'updateDatetime',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632065,
            deleteCode: 632061,
            btnEvent: {
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/jxsmassage/jxsmassage/addedit?code=${selectedRowKeys[0]}`);
                    }
                },
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '006_02') {
                        showWarnMsg('当前不是待审核节点');
                    } else {
                        this.props.history.push(`/jxsmassage/jxsmassage/addedit?v=1&check=1&code=${selectedRowKeys[0]}`);
                    }
                },
                lower: (key, item) => {
                    if (!key || !key.length || !item || !item.length) {
                        showWarnMsg('请选择记录');
                    } else if (item[0].agreementStatus !== '1') {
                        showWarnMsg('该状态不可下架');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '确定下架？',
                            onOk: () => {
                                this.props.doFetching();
                                return dealerLower(key[0]).then(() => {
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
                    } else if (item[0].agreementStatus !== '0') {
                        showWarnMsg('该状态不可上架');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '确定上架？',
                            onOk: () => {
                                this.props.doFetching();
                                return dealerOnShelf(key[0]).then(() => {
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

export default Dealer;
