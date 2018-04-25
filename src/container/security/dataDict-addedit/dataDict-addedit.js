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
      title: '种类',
      field: 'parentKey',
      required: true,
      listCode: '630036',
      params: {
        type: 0
      },
      keyName: 'dkey',
      valueName: 'dvalue',
      defaultOption: '选此创建种类'
    }, {
      title: '字典键',
      field: 'dkey',
      required: true,
      readonly: true,
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
      detailCode: 627077,
      addCode: 627070,
      editCode: 627072
    });
  }
}

export default DataDictAddEdit;
