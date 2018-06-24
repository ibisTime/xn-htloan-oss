import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/security/dataDict-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.securityDataDictAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class DataDictAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '父菜单编号',
      field: 'parentKey',
      type: 'select',
      listCode: '630036',
      params: {
        type: 0
      },
      keyName: 'dkey',
      valueName: 'dvalue'
    }, {
      title: '字典键',
      field: 'dkey',
      required: true,
      maxlength: 15
    }, {
      title: '字典值',
      field: 'dvalue',
      required: true,
      maxlength: 15
    }, {
      title: '备注',
      field: 'remark',
      maxlength: 250
    }];
    return this.props.buildDetail({
      fields,
      key: 'id',
      code: this.code,
      view: this.view,
      addCode: 630030,
      editCode: 630032,
      detailCode: 630037
    });
  }
}

export default DataDictAddEdit;
