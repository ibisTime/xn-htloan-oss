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
import {DetailWrapper, beforeDetail} from 'common/js/build-detail';

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
        title: '节点',
        field: 'bizNodeCode',
        listCode: 630147,
        type: 'select',
        data: [{
            key: 'code',
            value: 'name'
        }],
        keyName: 'key',
        valueName: 'value',
        readonly: true
    }, {
        title: '参考材料清单',
        field: 'refFileList',
        type: 'o2m',
        options: {
          add: true,
          edit: true,
          delete: true,
          scroll: { x: 300 },
          fields: [
            {
              title: '姓名',
              field: 'realname',
              nowrap: true,
              required: true
            }
          ]
        }
    }, {
        title: '寄送材料清单',
        field: 'sendFileList',
        type: 'o2m',
        options: {
          add: true,
          edit: true,
          delete: true,
          scroll: { x: 300 },
          fields: [
            {
              title: '姓名',
              field: 'realname',
              nowrap: true,
              required: true
            }
          ]
        }
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
        required: true
    }, {
        title: '快递公司',
        field: 'logisticsCompany',
        required: true
    }, {
        title: '快递单号',
        field: 'logisticsCode',
        required: true
    }, {
        title: '发货时间',
        field: 'sendDatetime',
        type: 'datetime',
        required: true
    }, {
        title: '发货备注',
        field: 'sendNote',
        required: true
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
            title: '确认',
            handler: (param) => {
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

export default transmitAddedit;
