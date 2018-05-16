import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/basedata/goodsloan-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper,
    beforeDetail
} from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
    state => state.bizGoodsloanAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class goodsloanAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
      const fields = [{
        field: 'remark',
        title: '参数名',
        readonly: true
      }, {
        title: '参数值',
        field: 'cvalue'
      }, {
        title: '最近修改时间',
        field: 'updateDatetime',
        type: 'datetime',
        readonly: true
      }];
      return this.props.buildDetail({
        fields,
        key: 'id',
        code: this.code,
        view: this.view,
        detailCode: '630046',
        editCode: '630042'
      });
    }
}

export default goodsloanAddedit;