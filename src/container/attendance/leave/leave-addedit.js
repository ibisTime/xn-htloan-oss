import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/attendance/leave-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.attendanceLeaveAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class leaveAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
        title: '请假类别',
        field: 'type',
        type: 'select',
        key: 'leave_apply_type',
        required: true
    }, {
        title: '总年休假(小时)',
        field: 'importDatetime',
        readonly: true
    }, {
        title: '已休假(小时)',
        field: 'realName',
        readonly: true
    }, {
        title: '可休数(小时)',
        field: 'idNo',
        readonly: true
    }, {
        title: 'totalHour(小时)',
        field: 'loanAmount',
        readonly: true
    }, {
        title: '开始时间',
        field: 'startDatetime',
        type: 'date',
        required: true
    }, {
        title: '结束时间',
        field: 'endDatetime',
        type: 'date',
        required: true
    }, {
        title: '请假时长(小时)',
        field: 'totalHour',
        required: true
    }, {
        title: '附件',
        field: 'pdf',
        type: 'img'
    }, {
        title: '请假事由',
        field: 'fkDatetime',
        required: true
    }, {
        title: '备注',
        field: 'remark'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632896
    });
  }
}

export default leaveAddedit;
