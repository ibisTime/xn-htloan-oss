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
} from '@redux/wares/yellowList';
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
        ...state.waresYellowList,
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
            field: 'userId',
            search: true,
            render: (v, d) => {
              return d.user.realName;
            },
            type: 'select',
            pageCode: 805120,
            keyName: 'userId',
            valueName: 'realName',
            searchName: 'realName'
          }, {
            title: '逾期日期',
            field: 'repayDatetime',
            type: 'date'
        }, {
            title: '清收成本(元)',
            field: 'totalFee',
            amount: true
        }, {
            title: '未还清收成本(元)',
            field: 'restTotalCost',
            render: (v, d) => {
                return moneyFormat(d.repayBiz.restTotalCost);
            }
        }, {
            title: '代偿款(元)',
            field: 'realRepayAmount',
            amount: true
        }, {
            title: '代偿是否缴纳',
            field: 'isRepay',
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
            title: '保证金(元)',
            field: 'lyDeposit'
        }, {
            title: '可退保证金(元)',
            field: 'loanAmount',
            render: (v, d) => {
                return moneyFormat(d.lyDeposit - d.cutLyDeposit);
            }
        }];
        return this.props.buildList({
            fields,
            pageCode: 630540,
            btnEvent: {
                payCost: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/wares/yellowList/payCost?code=${selectedRowKeys[0]}&userId=${selectedRows[0].user.userId}`);
                    }
                },
                payCompensate: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/wares/yellowList/payCompensate?code=${selectedRowKeys[0]}&userId=${selectedRows[0].user.userId}`);
                    }
                }
            }
        });
    }
}

export default yellowList;