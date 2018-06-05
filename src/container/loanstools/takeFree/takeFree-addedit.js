import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/takeFree-addedit';
import {
    getQueryString
} from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.loanstoolsTakeFreeAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class TakeFreeAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'userName',
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            readonly: true
        }, {
            title: '应收金额',
            field: 'shouldAmount',
            amount: true,
            readonly: true
        }, {
            title: '实收金额',
            field: 'realAmount',
            amount: true,
            readonly: true
        }, {
            title: '服务费清单',
            field: 'BudgetOrderFeeDetailList',
            type: 'o2m',
            options: {
                scroll: { x: 1300 },
                fields: [{
                    title: '交款类型',
                    field: 'remitType',
                    type: 'select',
                    key: 'remit_type'
                }, {
                    title: '交款项目',
                    field: 'remitProject',
                    key: 'remit_project',
                    type: 'checkbox'
                }, {
                    title: '金额小写',
                    field: 'amount',
                    amount: true
                }, {
                    title: '汇入我司账号',
                    field: 'receiptAccount',
                    render: (v, d) => {
                        return d.collectBankcard.bankcardNumber;
                    }
                }, {
                    title: '汇款人',
                    field: 'remitUser'
                }, {
                    title: '到帐日期',
                    field: 'reachDatetime',
                    type: 'date'
                }, {
                    title: '更新人',
                    field: 'updater'
                }, {
                    title: '更新时间',
                    field: 'updateDatetime',
                    type: 'datetime'
                }, {
                    title: '备注',
                    field: 'remark'
                }]
            }
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632166
        });
    }
}

export default TakeFreeAddedit;
