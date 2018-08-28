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
        field: 'ckey',
        title: '期数',
        type: 'select',
        data: [{
          key: '12',
          value: '12'
        }, {
          key: '24',
          value: '24'
        }, {
          key: '36',
          value: '36'
        }],
        keyName: 'key',
        valueName: 'value',
        readonly: true
      }, {
        title: '利率（%）',
        field: 'cvalue'
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

export default carloanAddedit;
