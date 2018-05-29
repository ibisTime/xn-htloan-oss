import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/mortgage-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
    state => state.bizMortgageAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class mortgageAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'description',
            readonly: true
        }, {
            title: '业务编号',
            field: 'description',
            readonly: true
        }, {
            title: '贷款银行',
            field: 'name',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'remark',
            amount: true,
            readonly: true
        }, {
            title: '放款时间',
            field: 'updateDatetime',
            type: 'date',
            required: true
        }, {
            title: '放款银行',
            field: 'updateDatetime'
        }, {
            title: '收款账号',
            field: 'remark',
            required: true
        }, {
            title: '收款凭证',
            field: 'updateDatetime',
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
            addCode: 630400,
            editCode: 630402,
            detailCode: 630407
        });
    }
}

export default mortgageAddedit;