import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/overdueList-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(state => state.bizOverdueListAddedit, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class overdueListAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
        title: '贷款人',
        field: 'name',
        readonly: true,
        formatter: (v, d) => {
            return d.user.realName;
        }
    }, {
        title: '手机号',
        field: 'mobile',
        readonly: true,
        formatter: (v, d) => {
            return d.user.mobile;
        }
    }, {
        title: '期数',
        field: 'periods',
        readonly: true
    }, {
        title: '逾期期数',
        field: 'curPeriods',
        readonly: true
    }, {
        title: '逾期金额',
        field: 'overdueAmount',
        amount: true,
        readonly: true
    }, {
        title: '逾期日期',
        field: 'repayDatetime',
        type: 'date',
        readonly: true
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

export default overdueListAddedit;
