import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/bankMoney-certain';
import { getQueryString, getUserId } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.bizBankMoneyCertain, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class bankMoneyCertain extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'operator',
            hidden: true,
            value: getUserId()
        }, {
            title: '客户姓名',
            field: 'applyUserName',
            readonly: true,
            formatter: (v, d) => {
                return d ? d.creditUser.userName : '-';
            }
        }, {
            title: '业务编号',
            field: 'code',
            readonly: true,
            formatter: (v, d) => {
                return <div>
                    {d.code}<a href="javascript:void(0);" style={{ marginLeft: 20 }} onClick={() => {
                    window.location.href = '/ywcx/ywcx/addedit?v=1&code' + '=' + d.code;
                }}>查看详情</a>
                </div>;
            }
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
            title: '收款账号',
            field: 'receiptBankCode',
            listCode: 632007,
            type: 'select',
            keyName: 'code',
            valueName: '{{bankName.DATA}}-{{bankcardNumber.DATA}}',
            required: true
        }, {
            title: '收款凭证',
            field: 'receiptPdf',
            type: 'img',
            required: true
        }, {
            title: '备注',
            field: 'receiptRemark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632516,
            editCode: 632130,
            beforeSubmit: (param) => {
                let bank = this.props.selectData.receiptBankCode.find(v => v.code === param.receiptBankCode);
                param.receiptBankcardNumber = bank.bankcardNumber;
                return param;
            }
        });
    }
}

export default bankMoneyCertain;
