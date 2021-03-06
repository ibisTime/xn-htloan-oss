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
} from '@redux/circulationLog/creditBill-addedit';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode,
    dateTimeFormat,
    getTeamCode,
    getQueryString
} from 'common/js/util';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.circulationLogCreditBillAddedit
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
class CreditBillAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '操作人姓名',
            field: 'operatorName'
        }, {
            title: '操作人手机号',
            field: 'operatorMobile'
        }, {
            title: '操作开始时间',
            field: 'startDatetime',
            type: 'datetime'
        }, {
            title: '操作结束时间',
            field: 'endDatetime',
            type: 'datetime'
        }, {
            title: '花费时间',
            field: 'speedTime'
        }, {
            title: '处理节点',
            field: 'dealNode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            params: {type: 'a'}
        }, {
            title: '处理说明',
            field: 'dealNote'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: 630175,
            searchParams: {
                refOrder: this.code
            }
        });
    }
}

export default CreditBillAddedit;
