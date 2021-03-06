import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/bus/busapply-addedit.js';
import { getQueryString, dateTimeFormat } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.busBusapplyAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class BusapplyAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
        title: '申领车辆',
        field: 'busMobile',
        required: true
    }, {
        title: '使用时间',
        field: 'time',
        rangedate: ['useDatetimeStart', 'useDatetimeEnd'],
        render: dateTimeFormat,
        type: 'date',
        required: true
    }, {
        title: '领用原因',
        field: 'applyNote'
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 632796
      });
  }
}

export default BusapplyAddedit;
