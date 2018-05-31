import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/integral/integral-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
    state => state.bizIntegralAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class IntegralAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
          title: '规则名称',
          field: 'name',
          search: true
        }, {
          title: '规则分类',
          field: 'letter'
        }, {
          title: '数值',
          field: 'status',
          search: true,
          type: 'select',
          key: 'status'
        }, {
          title: '备注',
          field: 'updater'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '630046',
            editCode: '630042'
        });
    }
}

export default IntegralAddedit;
