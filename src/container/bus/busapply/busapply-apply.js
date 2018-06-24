import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/bus/busapply-apply.js';
import {
  getQueryString,
  formatDate,
  dateTimeFormat,
  getUserId
} from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.busBusapplyApply, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class BusapplyApply extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
        title: '申领车辆',
        field: 'busCode',
        type: 'select',
        listCode: 632787,
        params: {
            status: '0'
        },
        keyName: 'code',
        valueName: 'model',
        required: true
    }, {
        title: '使用时间',
        field: 'time',
        rangedate: ['useDatetimeStart', 'useDatetimeEnd'],
        type: 'date',
        render: dateTimeFormat,
        required: true
    }, {
        title: '领用原因',
        field: 'applyNote',
        type: 'textarea',
        normalArea: true,
        required: true
    }];
    return this
      .props
      .buildDetail({
        fields,
        view: this.view,
        addCode: 632790,
        detailCode: 632796,
        beforeSubmit: (data) => {
            data.applyUser = getUserId();
            return data;
        }
      });
  }
}

export default BusapplyApply;
