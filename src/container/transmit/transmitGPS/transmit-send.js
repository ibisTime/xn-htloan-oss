import React from 'react';
import { Form } from 'antd';
import { getQueryString, getUserId, showSucMsg } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';
import fetch from 'common/js/fetch';

@Form.create()
class TransmitSend extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.state = {
      ...this.state,
      sendTypeFalg: false
    };
  }
  render() {
    const fields = [{
        title: '收件人姓名',
        field: 'receiverName',
        formatter: (v, d) => `${d.receiverName}-${d.userRole}`,
        readonly: true
    }, {
        title: '业务团队',
        field: 'teamName',
        hidden: !this.state.pageData || !this.state.pageData.teamName,
        readonly: true
    }, {
        title: '信贷专员',
        field: 'saleUserName',
        hidden: !this.state.pageData || !this.state.pageData.saleUserName,
        readonly: true
    }, {
        title: '内勤专员',
        field: 'insideJobName',
        hidden: !this.state.pageData || !this.state.pageData.insideJobName,
        readonly: true
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
        hidden: (!this.state.pageData || !this.state.pageData.gpsApply || !this.state.pageData.gpsApply.customerName),
        readonly: true
    }, {
        title: '车架号',
        field: 'carFrameNo',
        formatter: (v, d) => {
            return d.gpsApply.carFrameNo;
        },
        hidden: (!this.state.pageData || !this.state.pageData.gpsApply || !this.state.pageData.gpsApply.carFrameNo),
        readonly: true
    }, {
      title: '手机号',
      field: 'mobile',
      formatter: (v, d) => {
          return d.gpsApply.mobile;
      },
      hidden: (!this.state.pageData || !this.state.pageData.gpsApply || !this.state.pageData.gpsApply.mobile),
      readonly: true
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
            let flag = value === '1';
            if (flag !== this.state.sendTypeFalg) {
                this.setState({ sendTypeFalg: flag });
            }
        }
    }, {
        title: '快递公司',
        field: 'logisticsCompany',
        type: 'select',
        key: 'kd_company',
        required: !this.state.sendTypeFalg,
        hidden: this.state.sendTypeFalg
    }, {
        title: '快递单号',
        field: 'logisticsCode',
        required: !this.state.sendTypeFalg,
        hidden: this.state.sendTypeFalg
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
        hidden: !this.state.pageData || !this.state.pageData.remark,
        readonly: true
    }];
    return this.buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 632156,
        buttons: [{
            title: '确认',
            handler: (param) => {
                this.doFetching();
                param.operator = getUserId();
                if (param.sendType === '1') {
                  param = {
                    ...param,
                    logisticsCompany: '',
                    logisticsCode: ''
                  };
                }
                fetch(632150, param).then(() => {
                    showSucMsg('操作成功');
                    this.cancelFetching();
                    setTimeout(() => {
                        this.props.history.go(-1);
                    }, 1000);
                }).catch(this.cancelFetching);
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
