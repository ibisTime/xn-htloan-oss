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
          field: 'type',
          hidden: true
        }, {
          field: 'remark',
          hidden: true
        }, {
          title: '数值',
          field: 'cvalue'
        }];
        return this.props.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            detailCode: '630046',
            editCode: '630042',
            beforeSubmit: (params) => {
              params.ckey = this.props.pageData.ckey;
              return params;
            }
        });
    }
}

export default IntegralexchangeAddedit;
