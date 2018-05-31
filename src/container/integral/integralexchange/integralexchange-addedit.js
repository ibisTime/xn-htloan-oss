import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/integral/integralexchange-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.bizIntegralexchangeAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class IntegralexchangeAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
          title: '规则名称',
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

export default IntegralexchangeAddedit;
