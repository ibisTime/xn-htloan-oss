import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/bus/bushistory-addedit.js';
import {
  getQueryString,
  formatDate
} from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.busBushistoryAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class BushistoryAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
        title: '领用人',
        field: 'code'
    }, {
        title: '所属部门',
        field: 'departmentName'
    }, {
        title: '领用时间',
        field: 'code',
        type: 'date'
    }, {
        title: '用车时间',
        field: 'code',
        rangedate: ['loanStartDatetime', 'loanEndDatetime'],
        render: (v, d) => {
           return <span style={{whiteSpace: 'nowrap'}}>{formatDate(d.loanStartDatetime) + '~' + formatDate(d.loanEndDatetime)}</span>;
        }
    }, {
        title: '行驶公里数',
        field: 'code'
    }, {
        title: '领用原因',
        field: 'code'
    }, {
        title: '状态',
        field: 'code',
        type: 'select',
        key: '111'
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 632316
      });
  }
}

export default BushistoryAddedit;
