import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/mortgage-certain';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.bizMortgageCertain, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class mortgageCertain extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'applyUserName',
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '放款时间',
            field: 'bankFkDatetime',
            type: 'date',
            required: true
        }, {
            title: '收款账号',
            field: 'receiptBankcardNumber',
            required: true
        }, {
            title: '收款凭证',
            field: 'receiptPdf',
            type: 'img',
            required: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146,
            buttons: [{
              title: '确认',
              handler: (param) => {
                param.approveResult = '1';
                param.approveNote = this.projectCode;
                param.approveUser = getUserId();
                param.operator = getUserId();
                this.props.doFetching();
                fetch(632133, param).then(() => {
                  showSucMsg('操作成功');
                  this.props.cancelFetching();
                  setTimeout(() => {
                    this.props.history.go(-1);
                  }, 1000);
                }).catch(this.props.cancelFetching);
              },
              check: true,
              type: 'primary'
            }, {
              title: '返回',
              handler: (param) => {
                this.props.history.go(-1);
              }
            }]
        });
    }
}

export default mortgageCertain;