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
class bankAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '贷款银行',
            field: 'bankCode',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: 'bankName',
            required: true
        }, {
            title: '支行',
            field: 'subbranch',
            required: true
        }, {
            title: '12期利率(%)',
            field: 'rate12'
        }, {
            title: '18期利率(%)',
            field: 'rate18'
        }, {
            title: '24期利率(%)',
            field: 'rate24'
        }, {
            title: '36期利率(%)',
            field: 'rate36'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            data: [{
                key: '0',
                value: '正常'
            }, {
                key: '1',
                value: '停用'
            }],
            keyName: 'key',
            valueName: 'value',
            hidden: !this.view
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 632030,
            editCode: 632032,
            deleteCode: 632031,
            detailCode: 632036,
            beforeSubmit: (param) => {
                let bank = this.props.selectData.bankCode.find(v => v.bankCode === param.bankCode);
                param.bankName = bank.bankName;
                return param;
            }
        });
    }
}

export default bankAddedit;
