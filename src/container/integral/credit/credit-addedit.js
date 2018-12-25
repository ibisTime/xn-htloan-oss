import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/integral/credit-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.bizCreditAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class CreditAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
          title: '规则分类',
          field: 'type',
          hidden: true
        }, {
          title: '项目',
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

export default CreditAddedit;
