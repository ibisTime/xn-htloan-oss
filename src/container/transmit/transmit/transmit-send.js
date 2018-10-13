import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/transmit/transmit-send';
import { getQueryString, getUserId, showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(state => state.transmitSend, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class TransmitSend extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.sendTypeFalg = false;
  }
  render() {
    const fields = [{
        title: '客户姓名',
        field: 'customerName',
        readonly: true
    }, {
        title: '业务编号',
        field: 'bizCode',
        readonly: true
    }, {
        title: '类型',
        field: 'type',
        type: 'select',
        key: 'logistics_type',
        readonly: true
    }, {
        title: '发件节点',
        field: 'fromNodeCode',
        type: 'select',
        listCode: 630147,
        keyName: 'code',
        valueName: 'name',
        hidden: !this.props.pageData.fromNodeCode,
        readonly: true
    }, {
        title: '收件节点',
        field: 'toNodeCode',
        type: 'select',
        listCode: 630147,
        keyName: 'code',
        valueName: 'name',
        hidden: !this.props.pageData.toNodeCode,
        readonly: true
    }, {
        title: '参考材料清单',
        field: 'fileList',
        listCode: 632217,
        keyName: 'name',
        valueName: '{{no.DATA}}-{{name.DATA}}-{{number.DATA}}',
        multiple: true
    }, {
        title: '发件人',
        field: 'senderName'
    }, {
        title: '收件人',
        field: 'receiverName'
    }, {
        title: '寄送方式',
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
        required: true,
        value: '2',
        onChange: (value) => {
            this.sendTypeFalg = value === '1';
        }
    }, {
        title: '快递公司',
        field: 'logisticsCompany',
        type: 'select',
        key: 'kd_company',
        required: !this.sendTypeFalg,
        hidden: this.sendTypeFalg
    }, {
        title: '快递单号',
        field: 'logisticsCode',
        required: !this.sendTypeFalg,
        hidden: this.sendTypeFalg
    }, {
        title: '发货时间',
        field: 'sendDatetime',
        type: 'datetime',
        required: true
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
        detailCode: 632156,
        buttons: [{
            title: '确认',
            handler: (param) => {
                this.props.doFetching();
                param.operator = getUserId();
                fetch(632150, param).then(() => {
                    showSucMsg('操作成功');
                    this.props.cancelFetching();
                    setTimeout(() => {
                        this.props.history.go(-1);
                    }, 1000);
                }).catch(this.props.cancelFetching);
            },
            check: true,
            type: 'primary'
        }, {
            title: '返回',
            handler: (param) => {
                this.props.history.go(-1);
            }
        }]
      });
  }
}

export default TransmitSend;
