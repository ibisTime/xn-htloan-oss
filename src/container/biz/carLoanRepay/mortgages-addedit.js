import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/mortgages/mortgages-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.mortgagesAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class mortgagesAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'applyUserName',
            formatter: (v, d) => {
              return d.user ? d.user.realName : '-';
            }
        }, {
            title: '业务编号',
            field: 'code'
        }, {
          title: '贷款银行',
          field: 'loanBank',
          type: 'select',
          listCode: 632037,
          keyName: 'code',
          valueName: '{{bankName.DATA}}{{subbranch.DATA}}',
          readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '解除日期',
            field: 'bankFkDatetime',
            type: 'date'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 630521
        });
    }
}

export default mortgagesAddedit;
