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
} from '@redux/statistic/creditReport';
import { dateFormat } from 'common/js/util';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.statisticCreditReport,
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
class CreditReport extends React.Component {
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'userName',
            search: true
        }, {
            title: '日期',
            field: 'applyDatetime',
            type: 'date',
            rangedate: ['applyDatetimeStart', 'applyDatetimeEnd'],
            render: (v) => <span style={{whiteSpace: 'nowrap'}}>{dateFormat(v)}</span>,
            search: true
        }, {
            title: '征信查询结果',
            field: 'bankCreditResultRemark',
            render: (value, data) => {
                if (!data.creditUser || !data.creditUser.bankCreditResultRemark) {
                    return;
                }
                return data.creditUser.bankCreditResultRemark;
            }
        }, {
            title: '信用卡使用占比',
            field: 'creditCardOccupation',
            render: (v, d) => d.creditUser ? d.creditUser.creditCardOccupation : ''
        }, {
            title: '信贷专员',
            field: 'saleUserName'
        }, {
            title: '内勤',
            field: 'insideJob'
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '是否作废',
            field: 'isCancel',
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
        }];
        return this.props.buildList({
            fields,
            pageCode: 632116
        });
    }
}

export default CreditReport;
