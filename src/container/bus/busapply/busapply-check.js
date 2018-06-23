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
        field: 'captain',
        listCode: 11111,
        keyName: '11',
        valueName: '22',
        readonly: true
    }, {
        title: '使用时间',
        field: 'code',
        rangedate: ['loanStartDatetime', 'loanEndDatetime'],
        render: (v, d) => {
           return <span style={{whiteSpace: 'nowrap'}}>{formatDate(d.loanStartDatetime) + '~' + formatDate(d.loanEndDatetime)}</span>;
        },
        readonly: true
    }, {
        title: '领用原因',
        field: '222',
        readonly: true
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        addCode: 632316,
        detailCode: 632316,
        buttons: [{
          title: '通过',
          handler: (param) => {
            param.approveResult = '1';
            param.operator = getUserId();
            this.props.doFetching();
            fetch(630503, param).then(() => {
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
            param.operator = getUserId();
            this.props.doFetching();
            fetch(630503, param).then(() => {
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
