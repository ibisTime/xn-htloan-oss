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
} from '@redux/biz/yellowList';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg,
    moneyFormat
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

@listWrapper(
    state => ({
        ...state.bizYellowList,
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
class yellowList extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '贷款人',
            field: 'user',
            search: true,
            render: (v, d) => {
                return d.user.realName;
            }
        }, {
            title: '逾期日期',
            field: 'repayDatetime',
            type: 'date'
        }, {
            title: '清收成本(元)',
            field: 'totalFee',
            amount: true
        }, {
            title: '已缴纳清收成本(元)',
            field: 'payedFee',
            amount: true
        }, {
            title: '代偿款(元)',
            field: 'overdueAmount',
            amount: true
        }, {
            title: '代偿是否缴纳',
            field: 'isRepay',
            type: 'select',
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '保证金(元)',
            field: 'overdueDeposit',
            amount: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 630540,
            searchParams: {
              refType: '0',
              curNodeCode: '004_05'
            },
            btnEvent: {
                payCost: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/biz/yellowList/payCost?code=${selectedRowKeys[0]}&userId=${selectedRows[0].user.userId}`);
                    }
                },
                payCompensate: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].isRepay !== '0') {
                        showWarnMsg('代偿已缴纳');
                    } else {
                        this.props.history.push(`/biz/yellowList/payCompensate?code=${selectedRowKeys[0]}&userId=${selectedRows[0].user.userId}`);
                    }
                }
            }
        });
    }
}

export default yellowList;
