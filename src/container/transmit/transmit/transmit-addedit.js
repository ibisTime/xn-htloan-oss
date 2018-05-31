import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/transmit/transmit-addedit';
import {getQueryString} from 'common/js/util';
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
        field: 'userName'
    }, {
        title: '业务编号',
        field: 'bizCode'
    }, {
        title: '节点',
        field: 'toNodeCode',
        listCode: 630147,
        type: 'select',
        keyName: 'code',
        valueName: 'name'
    }, {
        title: '参考材料清单',
        field: 'refFileList'
        // type: 'o2m',
        // options: {
        //   add: true,
        //   edit: true,
        //   delete: true,
        //   scroll: { x: 300 },
        //   fields: [
        //     {
        //       title: '姓名',
        //       field: 'realname',
        //       nowrap: true,
        //       required: true
        //     }
        //   ]
        // }
    }, {
        title: '寄送材料清单',
        field: 'sendFileList'
        // type: 'o2m',
        // options: {
        //   add: true,
        //   edit: true,
        //   delete: true,
        //   scroll: { x: 300 },
        //   fields: [
        //     {
        //       title: '姓名',
        //       field: 'realname',
        //       nowrap: true,
        //       required: true
        //     }
        //   ]
        // }
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
        field: 'logisticsCompany'
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

export default transmitAddedit;
