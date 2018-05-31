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
import {
    DetailWrapper
} from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

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
            field: 'userId',
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'amount',
            amount: true,
            readonly: true
        }, {
            title: '贷款银行',
            field: 'receiptAccount',
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
                    type: 'pay_type'
                }, {
                    title: '交款单位',
                    field: 'remitCompanyCode'
                }, {
                    title: '交款项目',
                    field: 'remitProject'
                }, {
                    title: '金额小写',
                    field: 'amount',
                    amount: true
                }, {
                    title: '汇入我司银行',
                    field: 'code'
                }, {
                    title: '汇入我司账号',
                    field: 'code'
                }, {
                    title: '汇款人',
                    field: 'remitUser'
                }, {
                    title: '到帐日期',
                    field: 'reachDatetime',
                    type: 'date'
                }, {
                    title: '更新人',
                    field: 'code'
                }, {
                    title: '更新时间',
                    field: 'code'
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