import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/redList-apply';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizredListApply, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class redListApply extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'mobile',
            readonly: true
        }, {
            title: '业务编号',
            field: 'realName',
            readonly: true
        }, {
            title: '贷款银行',
            field: 'idNo',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'sfAmount',
            amount: true,
            readonly: true
        }, {
            title: '车辆',
            field: 'subbranch',
            readonly: true
        }, {
            title: '申请金额',
            field: 'sfAmount',
            amount: true,
            required: true
        }, {
            title: '收款账户',
            field: 'carCode',
            required: true
        }, {
            title: '开户行',
            field: 'carPrice',
            required: true
        }, {
            title: '开户支行',
            field: 'sfRate',
            required: true,
            type: 'select'
        }, {
            title: '申请说明',
            field: 'loanBank',
            required: true
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                addCode: 630500,
                editCode: 630502,
                detailCode: 630507
            });
    }
}

export default redListApply;