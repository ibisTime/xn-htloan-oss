import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/transmit/transmit-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(state => state.transmitAddedit, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class TransmitAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
        title: '发件人',
        field: 'senderName'
    }, {
        title: '收件人姓名',
        field: 'receiverName',
        formatter: (v, d) => `${d.receiverName}-${d.userRole}`,
        readonly: true
    }, {
        title: '业务团队',
        field: 'teamName',
        hidden: !this.props.pageData.teamName
    }, {
        title: '信贷专员',
        field: 'saleUserName',
        hidden: !this.props.pageData.saleUserName
    }, {
        title: '内勤专员',
        field: 'insideJobName',
        hidden: !this.props.pageData.insideJobName
    }, {
      title: '申领有线个数',
      field: 'applyWiredCount',
      formatter: (v, d) => {
          return d.gpsApply.applyWiredCount;
      },
      readonly: true
    }, {
      title: '申领无线个数',
      field: 'applyWirelessCount',
      formatter: (v, d) => {
          return d.gpsApply.applyWirelessCount;
      },
      readonly: true
    }, {
        title: '客户姓名',
        field: 'customerName',
        formatter: (v, d) => {
            return d.gpsApply.customerName;
        },
        hidden: (!this.props.pageData.gpsApply || !this.props.pageData.gpsApply.customerName),
        readonly: true
    }, {
        title: '车架号',
        field: 'carFrameNo',
        formatter: (v, d) => {
            return d.gpsApply.carFrameNo;
        },
        hidden: (!this.props.pageData.gpsApply || !this.props.pageData.gpsApply.carFrameNo),
        readonly: true
    }, {
      title: '手机号',
      field: 'mobile',
      formatter: (v, d) => {
          return d.gpsApply.mobile;
      },
      hidden: (!this.props.pageData.gpsApply || !this.props.pageData.gpsApply.mobile),
      readonly: true
    }, {
        title: '传递方式',
        field: 'sendType',
        type: 'select',
        data: [{
            key: '1',
            value: '线下'
        }, {
            key: '2',
            value: '快递'
        }],
        keyName: 'key',
        valueName: 'value',
        required: true
    }, {
        title: '快递公司',
        field: 'logisticsCompany',
        type: 'select',
        key: 'kd_company'
    }, {
        title: '快递单号',
        field: 'logisticsCode'
    }, {
        title: '发货时间',
        field: 'sendDatetime',
        type: 'datetime'
    }, {
        title: '发货说明',
        field: 'sendNote'
    }, {
        title: '备注',
        field: 'remark',
        hidden: !this.props.pageData.remark,
        readonly: true
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632156
    });
  }
}

export default TransmitAddedit;
