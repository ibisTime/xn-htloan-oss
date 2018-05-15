import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/overdueList-addedit';
import {getQueryString} from 'common/js/util';
import {DetailWrapper, beforeDetail} from 'common/js/build-detail';

@DetailWrapper(state => state.bizBlackListAddedit, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class blackListAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [
      {
        title: '贷款人',
        readonly: true,
        reader: (v, d) => {
            return d.user.realName;
        }
      }, {
        title: '手机号',
        readonly: true,
        reader: (v, d) => {
            return d.user.mobile;
        }
      }, {
        title: '身份证号',
        readonly: true,
        reader: (v, d) => {
            return d.user.idNo;
        }
      }, {
        title: '贷款金额',
        field: 'realName',
        readonly: true,
        amount: true
      }, {
        title: '剩余欠款',
        field: 'overplusAmount',
        readonly: true,
        amount: true
      }, {
        title: '未还清收成本',
        field: 'realName',
        readonly: true,
        amount: true
      }, {
        title: '还款计划表',
        field: 'realName',
        required: true
      }, {
        title: '处理说明',
        field: 'realName',
        required: true
      }
    ];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        addCode: 630500,
        editCode: 630502,
        detailCode: 630507
      });
  }
}

export default blackListAddedit;
