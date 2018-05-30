import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/postloantools/applyGps-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.postloantoolsApplyGpsAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class applyGpsAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '申领个数',
      field: 'companyCode',
      select: true,
      required: true
    }, {
      title: '所属团队',
      field: 'receiptBank',
      required: true
    }, {
      title: '申领人',
      field: 'receiptBank',
      required: true
    }, {
      title: '申领原因',
      field: 'receiptBank',
      required: true
    }, {
      title: '申领列表',
      field: 'receiptBank',
      required: true
    }, {
      title: '备注',
      field: 'receiptBank',
      required: true
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632106
    });
  }
}

export default applyGpsAddedit;
