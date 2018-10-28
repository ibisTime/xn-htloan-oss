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
        title: '客户姓名',
        field: 'customerName'
    }, {
        title: '业务编号',
        field: 'bizCode'
    }, {
        title: '发件节点',
        field: 'fromNodeCode',
        type: 'select',
        listCode: 630147,
        keyName: 'code',
        valueName: 'name'
    }, {
        title: '收件节点',
        field: 'toNodeCode',
        type: 'select',
        listCode: 630147,
        keyName: 'code',
        valueName: 'name'
    }, {
        title: '发件人',
        field: 'senderName',
        hidden: !this.props.pageData.senderName
    }, {
        title: '收件人',
        field: 'receiverName',
        hidden: !this.props.pageData.receiverName
    }, {
        title: '业务团队',
        field: 'teamName'
    }, {
        title: '信贷专员',
        field: 'saleUserName'
    }, {
        title: '内勤专员',
        field: 'insideJobName'
    }, {
        title: '材料清单',
        field: 'filelist',
        type: 'checkbox',
        listCode: 632217,
        keyName: 'id',
        valueName: '{{no.DATA}}-{{name.DATA}}-{{number.DATA}}份'
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
