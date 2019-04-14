import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/transmit/collection-addedit';
import {getQueryString} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(state => state.transmitCollectionAddedit, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class CollectionAddedit extends React.Component {
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
        valueName: 'name',
        params: {type: 'a'}
    }, {
        title: '业务团队',
        field: 'teamName',
        readonly: true
    }, {
        title: '信贷专员',
        field: 'saleUserName',
        readonly: true
    }, {
        title: '内勤专员',
        field: 'insideJobName',
        readonly: true
    }, {
        title: '发件人',
        field: 'senderName',
        hidden: !this.props.pageData.senderName,
        readonly: true
    }, {
        title: '收件人',
        field: 'receiverName',
        hidden: !this.props.pageData.receiverName
    }, {
        title: '材料清单',
        field: 'filelist',
        type: 'checkbox',
        listCode: 632217,
        keyName: 'id',
        valueName: '{{no.DATA}}-{{name.DATA}}-{{number.DATA}}份',
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
        title: '发货备注',
        field: 'sendNote'
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 632156
      });
  }
}

export default CollectionAddedit;
