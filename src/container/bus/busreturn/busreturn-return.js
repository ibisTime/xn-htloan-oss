import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/bus/busreturn-return.js';
import {
  getQueryString,
  formatDate,
  showSucMsg,
  getUserId,
  dateTimeFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.busBusreturnReturn, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class BusreturnReturn extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
        title: '申领车辆',
        field: 'busMobile',
        readonly: true
    }, {
        title: '使用时间',
        field: 'time',
        rangedate: ['useDatetimeStart', 'useDatetimeEnd'],
        render: dateTimeFormat,
        type: 'date',
        readonly: true
    }, {
        title: '行驶公里数',
        field: 'driveKil',
        required: true
    }, {
        title: '备注',
        field: 'remark'
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 632796,
        buttons: [{
          title: '确认',
          handler: (param) => {
            param.updater = getUserId();
            this.props.doFetching();
            fetch(632792, param).then(() => {
              showSucMsg('操作成功');
              this.props.cancelFetching();
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
            }).catch(this.props.cancelFetching);
          },
          check: true,
          type: 'primary'
        }, {
          title: '返回',
          handler: (param) => {
            this.props.history.go(-1);
          }
        }]
      });
  }
}

export default BusreturnReturn;
