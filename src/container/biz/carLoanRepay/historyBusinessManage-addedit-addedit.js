import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/historyBusinessManage-addedit-addedit';
import {
  getQueryString
} from 'common/js/util';
import {
  DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizHistoryBusinessManageAddeditAddedit, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class historyBusinessManageAddeditAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '处理历史',
      field: 'remindLogList',
      type: 'o2m',
      options: {
        fields: [{
          title: '催收方式',
          field: 'way',
          type: 'select',
          select: true,
          key: 'way'
        }, {
          title: '催收对象',
          field: 'toUser'
        }, {
          title: '催收文本',
          field: 'content'
        }, {
          title: '催收时间',
          field: 'createDatetime'
        }]
      }
    }, {
      title: '贷款人',
      field: 'realName',
      readonly: true,
      formatter: (v, d) => {
        return d.user.realName;
      }
    }, {
      title: '手机号',
      readonly: true,
      field: 'mobile',
      formatter: (v, d) => {
        return d.user.mobile;
      }
    }, {
      title: '身份证号',
      field: 'idNO',
      readonly: true,
      formatter: (v, d) => {
        return d.user.idNo;
      }
    }, {
      title: '贷款金额',
      field: 'loanAmount',
      readonly: true,
      amount: true
    }, {
      title: '剩余欠款',
      field: 'overplusAmount',
      readonly: true,
      amount: true
    }, {
      title: '未还清收总成本',
      field: 'restTotalCost',
      readonly: true,
      amount: true
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
              title: '发生时间',
              field: 'payDatetime',
              type: 'date'
          }, {
              title: '备注',
              field: 'remark'
          }]
      }
  }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 630541,
        buttons: [{
          title: '关闭',
          handler: (param) => {
            this.props.history.go(-1);
          }
        }]
      });
  }
}

export default historyBusinessManageAddeditAddedit;