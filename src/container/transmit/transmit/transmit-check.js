import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/transmit/transmit-addedit';
import {
  getQueryString,
  getUserId,
  showSucMsg
} from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(state => state.transmitAddedit, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class transmitAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  doSuccess = () => {
    showSucMsg('操作成功');
    this.props.cancelFetching();
    setTimeout(() => {
        this.props.history.go(-1);
    }, 1000);
  }
  render() {
    const fields = [{
        title: '客户姓名',
        field: 'userName',
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
        readonly: true
    }, {
        title: '收件节点',
        field: 'toNodeCode',
        type: 'select',
        listCode: 630147,
        keyName: 'code',
        valueName: 'name',
        readonly: true
    }, {
        title: '参考材料清单',
        field: 'refFileList',
        readonly: true
    }, {
        title: '寄送材料清单',
        field: 'sendFileList',
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
        readonly: true
    }, {
        title: '快递公司',
        field: 'logisticsCompany',
        type: 'select',
        key: 'kd_company',
        readonly: true
    }, {
        title: '快递单号',
        field: 'logisticsCode',
        readonly: true
    }, {
        title: '发货时间',
        field: 'sendDatetime',
        type: 'datetime',
        readonly: true
    }, {
        title: '发货说明',
        field: 'sendNote',
        readonly: true
    }, {
        title: '备注',
        field: 'remark'
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 632156,
        buttons: [{
            title: '收件并审核通过',
            handler: (param) => {
                fetch(632151, param).then(() => {
                    this.doSuccess();
                }).catch(this.props.cancelFetching);
            },
            check: true
        }, {
            title: '收件待补件',
            handler: (param) => {
                fetch(632152, param).then(() => {
                    this.doSuccess();
                }).catch(this.props.cancelFetching);
            },
            check: true
        }, {
            title: '返回',
            handler: (param) => {
                this.props.history.go(-1);
            }
        }]
      });
  }
}

export default transmitAddedit;
