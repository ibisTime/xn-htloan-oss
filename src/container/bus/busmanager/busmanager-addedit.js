import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/bus/busmanager-addedit.js';
import {
  getQueryString,
  formatDate
} from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.busBusmanagerAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class BusmanagerAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
        title: '车辆型号',
        field: 'model',
        required: true
    }, {
        title: '车牌号',
        field: 'number',
        required: true
    }, {
        title: '保险到期日',
        field: 'insuranceEndDatetime',
        type: 'date',
        required: true
    }, {
        title: '停放位置',
        field: 'parkLocation',
        required: true
    }, {
        title: '车辆照片',
        field: 'pic',
        type: 'img'
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        addCode: 632780,
        editCode: 632782,
        detailCode: 632786
      });
  }
}

export default BusmanagerAddedit;
