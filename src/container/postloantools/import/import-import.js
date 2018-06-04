import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/postloantools/import-import';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.postloantoolsImportImport, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class applyGpsAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '银行',
            field: 'applyCount'
        }, {
            title: '逾期名单',
            field: 'overdueList',
            type: 'o2m',
            options: {
                add: true,
                edit: true,
                delete: true,
                fields: [{
                    title: '证件号',
                    field: 'IdNo',
                    required: true,
                    idCard: true
                }, {
                    title: '放款日期',
                    field: 'fkDatetime',
                    required: true,
                    type: 'date'
                }, {
                    title: '贷款金额',
                    field: 'loanAmount',
                    amount: true
                }, {
                    title: '贷款银行',
                    field: 'bankCode',
                    type: 'select',
                    listCode: 802116,
                    keyName: 'bankCode',
                    valueName: 'bankName',
                    required: true
                }, {
                    title: '逾期金额',
                    field: 'overdueAmount',
                    amount: true,
                    required: true
                }, {
                    title: '逾期日期',
                    field: 'overdueDatetime',
                    required: true,
                    type: 'date'
                }, {
                    title: '总期数',
                    field: 'periods',
                    required: true
                }, {
                    title: '客户姓名',
                    field: 'realName',
                    required: true
                }, {
                    title: '剩余金额',
                    field: 'remainAmount',
                    required: true,
                    amount: true
                }]
            }
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632306,
            beforeSubmit: (param) => {
                let bank = this.props.selectData.bankCode.find(v => v.bankCode === param.bankCode);
                param.loanBankName = bank.bankName;
                return param;
            }
        });
    }
}

export default applyGpsAddedit;