import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/cancel-certain';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import {
  DetailWrapper
} from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
    state => state.loanstoolsCancelCertain, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class CancelCertain extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'companyCode'
        }, {
            title: '业务编号',
            field: 'receiptBank'
        }, {
            title: '身份证',
            field: 'receiptAccount'
        }, {
            title: '贷款金额',
            field: 'receiptAccount',
            amount: true
        }, {
            title: '贷款银行',
            field: 'receiptAccount'
        }, {
            title: '应收金额',
            field: 'receiptAccount',
            amount: true
        }, {
            title: '收款金额',
            field: 'receiptAccount',
            amount: true,
            required: true
        }, {
            title: '收款银行',
            field: 'payBank',
            pageCode: 802115,
            keyName: 'bankCode',
            valueName: 'bankName',
            type: 'select'
        }, {
            title: '收款账号',
            field: 'receiptAccount'
        }, {
            title: '收款时间',
            field: 'payDatetime',
            type: 'date',
            required: true
        }, {
            title: '备注',
            field: 'receiptAccount',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632106,
            buttons: [{
                title: '确认',
                check: true,
                handler: (params) => {
                    this.props.doFetching();
                    fetch(632102, params).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default CancelCertain;