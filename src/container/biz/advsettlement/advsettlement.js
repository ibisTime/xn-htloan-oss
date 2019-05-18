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
} from '@redux/biz/advsettlement';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, isUndefined, moneyFormat } from 'common/js/util';

@listWrapper(
    state => ({
        ...state.bizAdvsettlement,
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
class Advsettlement extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '客户姓名',
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
            title: '手机号',
            field: 'mobile',
            render: (v, d) => {
                return d.user.mobile;
            }
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '剩余欠款',
            field: 'restAmount',
            amount: true
        }, {
            title: '未还清收成本',
            field: 'restTotalCost',
            amount: true
        }, {
            title: '未还代偿金额',
            field: 'unRepayTotalAmount',
            render: (v) => {
                return isUndefined(v) ? '0.00' : <span style={{whiteSpace: 'nowrap'}}>{moneyFormat(v)}</span>;
            }
        }, {
            title: '扣除履约保证金',
            field: 'cutLyDeposit',
            amount: true
        }, {
            title: '是否提前还款',
            field: 'isAdvanceSettled',
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
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 630520,
            searchParams: {
                refType: '0',
                curNodeCodeList: ['003_20']
            },
            btnEvent: {
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/biz/advsettlement/addedit?code=${selectedRowKeys[0]}&check=1`);
                    }
                }
            }
        });
    }
}

export default Advsettlement;
