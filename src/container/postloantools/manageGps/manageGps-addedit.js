import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/postloantools/manageGps-addedit';
import { getQueryString, getUserId } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.postloantoolsManageGpsAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class manageGpsAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: 'GPS设备号',
      field: 'gpsDevNo',
      required: true
  }, {
      title: 'GPS类型',
      field: 'gpsType',
      type: 'select',
      data: [{
        key: '1',
        value: '有线'
      }, {
        key: '0',
        value: '无线'
      }],
      keyName: 'key',
      valueName: 'value',
      required: true
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      addCode: 632700,
      detailCode: 632706
    });
  }
}

export default manageGpsAddedit;
