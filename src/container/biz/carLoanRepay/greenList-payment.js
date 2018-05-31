import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/greenList-payment';
import {
  getQueryString
} from 'common/js/util';
import {
  DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizGreenListPayment, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class greenListPayment extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('staffCode', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '业务编号',
      field: 'code',
      readonly: true
    }, {
      field: 'user',
      title: '贷款人',
      formatter: (v, d) => {
        return d.user.realName;
      },
      readonly: true
    }, {
      title: '逾期日期',
      field: 'repayDatetime',
      type: 'date',
      readonly: true
    }, {
      title: '标识日期',
      field: 'overdueHandleDatetime',
      type: 'date',
      readonly: true
    }, {
      title: '为还清收成本',
      field: 'restTotalCost',
      amount: true,
      readonly: true
    }, {
      title: '清收成本清单',
      field: 'costList',
      type: 'o2m',
      options: {
        fields: [{
          title: '费用项',
          field: 'item'
        }, {
          title: '金额（元）',
          field: 'amount',
          amount: true
        }, {
          title: '备注',
          field: 'remark'
        }, {
          title: '发生时间',
          field: 'payDatetime',
          type: 'date'
        }, {
          title: '状态',
          field: 'status',
          type: 'select',
          key: 'status'
        }]
      }
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 630541
      });
  }
}

export default greenListPayment;
