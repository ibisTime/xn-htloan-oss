import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/redList-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper,
    beforeDetail
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizredListAddEdit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class redListAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'mobile'
        }, {
            title: '业务编号',
            field: 'realName'
        }, {
            title: '贷款银行',
            field: 'idNo'
        }, {
            title: '贷款金额',
            field: 'sfAmount',
            amount: true
        }, {
            title: '车辆',
            field: 'subbranch'
        }, {
            title: '申请金额',
            field: 'sfAmount',
            amount: true
        }, {
            title: '收款账户',
            field: 'carCode'
        }, {
            title: '开户行',
            field: 'carPrice'
        }, {
            title: '开户支行',
            field: 'sfRate',
            type: 'select'
        }, {
            title: '申请说明',
            field: 'loanBank'
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

export default redListAddedit;