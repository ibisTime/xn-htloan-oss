import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/bus/busapply-check.js';
import {
  getQueryString,
  formatDate,
  getUserId,
  showSucMsg,
  dateTimeFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.busBusapplyCheck, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class BusapplyCheck extends React.Component {
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
        title: '领用原因',
        field: 'applyNote',
        readonly: true
    }, {
        title: '审核说明',
        field: 'remark',
        type: 'textarea',
        normalArea: true
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 632796,
        buttons: [{
          title: '通过',
          handler: (param) => {
            param.approveResult = '1';
            param.updater = getUserId();
            this.props.doFetching();
            fetch(632791, param).then(() => {
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
          title: '不通过',
          handler: (param) => {
            param.approveResult = '0';
            param.updater = getUserId();
            this.props.doFetching();
            fetch(632791, param).then(() => {
              showSucMsg('操作成功');
              this.props.cancelFetching();
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
            }).catch(this.props.cancelFetching);
          },
          check: true
        }, {
          title: '返回',
          handler: (param) => {
            this.props.history.go(-1);
          }
        }]
      });
  }
}

export default BusapplyCheck;
