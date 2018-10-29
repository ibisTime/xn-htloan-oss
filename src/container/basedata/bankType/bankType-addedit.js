import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/basedata/bank-addedit';
import {
    getQueryString
} from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.bizBankAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class BankTypeAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '名称',
            field: 'bankName',
            required: true
        }, {
            title: '银行代号',
            field: 'bankCode',
            required: true
        }, {
            title: '每日限额',
            field: 'dayAmount',
            hidden: true,
            value: '0'
        }, {
            title: '每日笔数限制',
            field: 'maxOrder',
            hidden: true,
            value: '0'
        }, {
            title: '每月限额',
            field: 'monthAmount',
            hidden: true,
            value: '0'
        }, {
            title: '单笔限额',
            field: 'orderAmount',
            hidden: true,
            value: '0'
        }, {
            field: 'channelType',
            value: '40',
            hidden: true
        }, {
            field: 'channelBank',
            value: new Date().getTime(),
            hidden: true
        }, {
            title: '状态',
            field: 'status',
            hidden: true,
            value: '1'
        }];
        return this.props.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            addCode: 802110,
            detailCode: 802117
        });
    }
}

export default BankTypeAddedit;
