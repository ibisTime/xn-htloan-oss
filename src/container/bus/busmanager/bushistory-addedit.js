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
        field: 'applyUserName',
        readonly: true
    }, {
        title: '所属部门',
        field: 'departmentCode',
        type: 'select',
        listCode: 630106,
        params: {
            typeList: ['2']
        },
        keyName: 'code',
        valueName: 'name',
        readonly: true
    }, {
        title: '领用时间',
        field: 'applyDatetime',
        type: 'date',
        readonly: true
    }, {
        title: '用车时间',
        field: 'time',
        rangedate: ['useDatetimeStart', 'useDatetimeEnd'],
        type: 'datetime',
        readonly: true
    }, {
        title: '行驶公里数',
        field: 'driveKil',
        readonly: true
    }, {
        title: '领用原因',
        field: 'applyNote',
        readonly: true
    }, {
        title: '状态',
        field: 'status',
        type: 'select',
        key: 'bus_borrow_status',
        readonly: true
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

export default BushistoryAddedit;
