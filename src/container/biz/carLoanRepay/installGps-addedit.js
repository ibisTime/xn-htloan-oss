import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/installGps-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
    state => state.bizinstallGpsAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class installGpsAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'description'
        }, {
            title: '业务编号',
            field: 'description'
        }, {
            title: '贷款银行',
            field: 'name'
        }, {
            title: '备贷款金额',
            field: 'remark',
            amount: true
        }, {
            title: 'GPS安装列表',
            field: 'remark',
            amount: true
        }, {
            title: '备注',
            field: 'remark',
            required: true
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

export default installGpsAddedit;