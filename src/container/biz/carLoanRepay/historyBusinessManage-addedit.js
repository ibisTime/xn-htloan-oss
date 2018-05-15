import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/historyBusinessManage-addedit';
import {getQueryString} from 'common/js/util';
import {DetailWrapper, beforeDetail} from 'common/js/build-detail';

@DetailWrapper(state => state.bizHistoryBusinessManageAddedit, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class historyBusinessManageAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [
      {
        title: '业务编号',
        field: 'code'
      }, {
        title: '贷款人',
        field: 'realName'
      }, {
        title: '状态',
        field: 'status'
      }, {
        title: '身份证号',
        field: 'realName',
        required: true,
        bankCard: true
      }, {
        title: '贷款期数',
        field: 'subbranch',
        required: true,
        bankCard: true
      }, {
        title: '贷款金额',
        field: 'bankcardNumber',
        required: true,
        bankCard: true
      }, {
        title: '剩余欠债',
        field: 'carCode',
        required: true
      }, {
        title: '未还清成本',
        field: 'carPrice',
        required: true
      }, {
        title: '实际退款金额',
        field: 'sfRate',
        required: true,
        type: 'select'
      }, {
        title: '还款计划表',
        field: 'sfAmount',
        required: true
      }, {
        title: '处理说明',
        field: 'loanBank'
      }
    ];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 630507
      });
  }
}

export default historyBusinessManageAddedit;
