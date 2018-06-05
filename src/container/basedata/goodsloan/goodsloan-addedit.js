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
    DetailWrapper
} from 'common/js/build-detail';

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
            title: '产品名称',
            field: 'name',
            required: true
        }, {
            title: '针对类型',
            field: 'type',
            type: 'select',
            key: 'budget_orde_biz_typer',
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
            title: '万元系数',
            field: 'wanFactor',
            amount: true,
            required: true
        }, {
            title: '年化利率',
            field: 'yearRate',
            number: true,
            help: '请输入0～1之间的数值',
            required: true
        }, {
            title: 'GPS费用(元)',
            field: 'gpsFee',
            amount: true,
            required: true
        }, {
            title: '公证费利率',
            field: 'authRate',
            number: true,
            help: '请输入0～1之间的数值',
            required: true
        }, {
            title: '返点利率',
            field: 'backRate',
            number: true,
            help: '请输入0～1之间的数值',
            required: true
        }, {
            title: '前置利率',
            field: 'preRate',
            number: true,
            help: '请输入0～1之间的数值',
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
