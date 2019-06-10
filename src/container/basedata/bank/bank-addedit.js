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
            title: '贷款机构简称',
            field: 'mechanismAbb'
        }, {
            title: '银行全称',
            field: 'bankFullName'
        }, {
            title: '开户行',
            field: 'subbranch',
            required: true
        }, {
            title: '电话号码',
            field: 'mobile'
        }, {
            title: '银行地址',
            field: 'address'
        }, {
            title: '12期利率',
            field: 'rate12',
            number5: true,
            help: '请输入0～1之间的数值',
            required: true
        }, {
            title: '18期利率',
            field: 'rate18',
            number5: true,
            help: '请输入0～1之间的数值',
            required: true
        }, {
            title: '24期利率',
            field: 'rate24',
            number5: true,
            help: '请输入0～1之间的数值',
            required: true
        }, {
            title: '36期利率',
            field: 'rate36',
            number5: true,
            help: '请输入0～1之间的小数',
            required: true
        }, {
            title: '12期直客利率',
            field: 'zkRate12',
            number5: true,
            help: '请输入0～1之间的数值',
            required: true
        }, {
            title: '18期直客利率',
            field: 'zkRate18',
            number5: true,
            help: '请输入0～1之间的数值',
            required: true
        }, {
            title: '24期直客利率',
            field: 'zkRate24',
            number5: true,
            help: '请输入0～1之间的数值',
            required: true
        }, {
            title: '36期直客利率',
            field: 'zkRate36',
            number5: true,
            help: '请输入0～1之间的小数',
            required: true
        }, {
            title: '邮编',
            field: 'postCode'
        }, {
            title: '银行委托人',
            field: 'bankClient'
        }, {
            title: '委托有效期',
            field: 'clientValidDate',
            type: 'number'
        }, {
            title: '授权人姓名',
            field: 'autherName'
        }, {
            title: '授权人电话',
            field: 'autherPhoneNumber',
            mobile: true
        }, {
            title: '授权人身份证',
            field: 'autherIdNo',
            idCard: true
        }, {
            title: '授权人地址',
            field: 'autherAddress'
        }, {
            title: '信用卡类型',
            field: 'creditCardType',
            type: 'select',
            key: 'credit_card_type'
        }, {
            title: '信用卡名称',
            field: 'creditCardName'
        }, {
            title: '所属地区',
            field: 'belongArea'
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
