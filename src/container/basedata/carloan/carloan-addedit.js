import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/basedata/carloan-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.bizCarloanAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class carloanAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
      const fields = [{
        field: 'aa',
        title: '参数名',
        value: '车贷期数管理的期数和利率',
        readonly: true
      }, {
        title: '期数',
        field: 'ckey',
          required: true,
          number: true
      }, {
        title: '利率（%）',
          amount: true,
          required: true,
        field: 'cvalue'
      }, {
          title: '备注',
          field: 'remark'
      }];
      return this.props.buildDetail({
        fields,
        key: 'id',
        code: this.code,
        view: this.view,
        detailCode: '630046',
        editCode: '630042',
        addCode: '630040'
      });
    }
}

export default carloanAddedit;
