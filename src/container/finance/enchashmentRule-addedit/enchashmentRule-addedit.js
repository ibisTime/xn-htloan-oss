import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/finance/enchashmentRule-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.financeEnchashmentRuleAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class EnchashmentRuleAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'remark',
      title: '参数名',
      hidden: true
    }, {
      field: 'remark1',
      title: '参数名',
      formatter: (v, d) => {
        return (d && d.remark) || '';
      },
      readonly: true
    }, {
      title: '参数值',
      field: 'cvalue'
    }, {
      title: '最近修改人',
      field: 'updater',
      readonly: true
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

export default EnchashmentRuleAddEdit;
