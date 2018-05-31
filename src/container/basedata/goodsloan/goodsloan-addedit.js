import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/basedata/goodsloan-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper,
    beforeDetail
} from 'common/js/build-detail';

// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
    state => state.bizGoodsloanAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class goodsloanAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '名称',
            field: 'name',
            required: true
        }, {
            title: '公证费',
            field: 'authFee',
            amount: true,
            required: true
        }, {
            title: '服务费',
            field: 'fee',
            amount: true,
            required: true
        }, {
            title: 'GPS费用',
            field: 'gpsFee',
            amount: true,
            required: true
        }, {
            title: '贷款银行',
            field: 'loanBank',
            type: 'select',
            listCode: 632037,
            keyName: 'code',
            valueName: '{{bankName.DATA}}{{subbranch.DATA}}',
            required: true
        }, {
            title: '月供利率',
            field: 'monthRate',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '632170',
            editCode: '632172',
            detailCode: '632176'
        });
    }
}

export default goodsloanAddedit;