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
  sortNumber = (a, b) => {
    return a - b;
  }
  render() {
    const fields = [{
        title: '客户姓名',
        field: 'customerName',
        readonly: true
    }, {
        title: '业务编号',
        field: 'bizCode',
        readonly: true,
        formatter: (v, d) => {
            return <div>
                {d.bizCode}<a href={`/ywcx/ywcx/addedit?v=1&code=${d.bizCode}`} style={{ marginLeft: 20 }}>查看详情</a>
            </div>;
        }
    }, {
        title: '发件节点',
        field: 'fromNodeCode',
        type: 'select',
        listCode: 630147,
        keyName: 'code',
        valueName: 'name',
        hidden: !this.state.pageData || !this.state.pageData.fromNodeCode,
        readonly: true
    }, {
        title: '收件节点',
        field: 'toNodeCode',
        type: 'select',
        listCode: 630147,
        keyName: 'code',
        valueName: 'name',
        hidden: !this.state.pageData || !this.state.pageData.toNodeCode,
        readonly: true
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
        hidden: !this.state.pageData || !this.state.pageData.senderName,
        readonly: true
    }, {
        title: '收件人',
        field: 'receiverName',
        hidden: !this.state.pageData || !this.state.pageData.receiverName,
        readonly: true
    }, {
        title: '材料清单',
        field: 'filelist',
        type: 'checkbox',
        params: {
            category: 'node_file_list'
        },
        listCode: 632217,
        keyName: 'id',
        valueName: '{{no.DATA}}-{{vname.DATA}}-{{number.DATA}}份'
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
              let fileList = param.filelist.split(',').sort(this.sortNumber).toString();
              param.filelist = fileList;
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
