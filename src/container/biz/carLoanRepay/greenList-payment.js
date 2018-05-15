import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/greenList-payment';
import {getQueryString} from 'common/js/util';
import {DetailWrapper, beforeDetail} from 'common/js/build-detail';

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
    const fields = [
      {
        title: '业务编号',
        field: 'code',
        readonly: true
      }, {
        title: '贷款人',
        render: (v, d) => {
            return d.user.realName;
        }
      }, {
        title: '逾期日期',
        field: 'repayDatetime',
        type: 'data',
        readony: true
      }, {
        title: '标识日期',
        field: 'realName',
        type: 'date',
        readonly: true
      }, {
        title: '为还清收成本',
        field: 'subbranch',
        required: true,
        bankCard: true
      }, {
        title: '清收成本清单',
        fields: [
            {
                title: '费用项',
                field: 'realName'
            }, {
                title: '费用项',
                field: 'realName'
            }, {
                title: '费用项',
                field: 'realName'
            }, {
                title: '费用项',
                field: 'realName'
            }, {
                title: '费用项',
                field: 'realName'
            }
        ]
      }
    ];
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
