import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/archives-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
    state => state.bizArchivesAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class archivesAddedit extends React.Component {
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
            title: '征信信息',
            field: 'updateDatetime',
            readonly: true
        }, {
            title: '准入单信息',
            field: 'updateDatetime',
            readonly: true
        }, {
            title: '面签信息',
            field: 'remark',
            readonly: true
        }, {
            title: '垫资信息',
            field: 'remark',
            readonly: true
        }, {
            title: 'GPS安装信息',
            field: 'remark',
            readonly: true
        }, {
            title: '银行放款信息',
            field: 'remark',
            readonly: true
        }, {
            title: '车辆抵押信息',
            field: 'remark',
            readonly: true
        }, {
            title: '档案存放位置',
            field: 'remark',
            readonly: true
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

export default archivesAddedit;