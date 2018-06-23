import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/bus/busapply-addedit.js';
import {
  getQueryString,
  formatDate
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
        field: 'captain',
        listCode: 11111,
        keyName: '11',
        valueName: '22',
        required: true
    }, {
        title: '使用时间',
        field: 'code',
        rangedate: ['loanStartDatetime', 'loanEndDatetime'],
        render: (v, d) => {
           return <span style={{whiteSpace: 'nowrap'}}>{formatDate(d.loanStartDatetime) + '~' + formatDate(d.loanEndDatetime)}</span>;
        },
        required: true
    }, {
        title: '领用原因',
        field: '222',
        required: true
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        addCode: 632316,
        detailCode: 632316
      });
  }
}

export default BusapplyApply;
