import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/basedata/receivables-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper,
    beforeDetail
} from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
    state => state.basedataReceivablesAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class receivablesAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '公司名称',
            field: 'companyCode',
            listCode: 630106,
            params: {
                typeList: [1]
            },
            type: 'select',
            keyName: 'code',
            valueName: 'name',
            required: true
        }, {
            title: '户名',
            field: 'realName',
            required: true
        }, {
            title: '账号',
            field: 'bankcardNumber',
            required: true,
            bankCard: true
        }, {
            title: '贷款银行',
            field: 'loanBank',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: 'bankName',
            required: true
        }, {
            title: '开户支行',
            field: 'subbranch',
            required: true
        }, {
            title: '类型',
            field: 'type',
            value: '1',
            hidden: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 632000,
            editCode: 632002,
            detailCode: 632006,
            beforeSubmit: (param) => {
                console.log(this.props.selectData);
                let data = this.props.selectData;
                param.bankCode = data.loanBank[0].bankCode;
                param.bankName = data.loanBank[0].bankName;
                return param;
            }
        });
    }
}

export default receivablesAddedit;