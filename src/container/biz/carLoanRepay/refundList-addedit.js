import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/refundList-addedit';
import {getQueryString} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(state => state.bizRefundListAddedit, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class refundListAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '业务编号',
      field: 'code'
    }, {
      title: '贷款人',
      field: 'realName',
      formatter: (v, d) => {
        return d.user.realName;
      }
    }, {
      title: '期数',
      field: 'periods'
    }, {
      title: '当前期数',
      field: 'curPeriods'
    }, {
      title: '本月还款日',
      field: 'repayDatetime',
      type: 'date'
    }, {
      title: '月供',
      field: 'monthAmount',
      amount: true
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

export default refundListAddedit;
