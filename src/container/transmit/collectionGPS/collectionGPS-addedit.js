import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/transmit/collectionGPS-addedit';
import {getQueryString} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(state => state.transmitCollectionGPSAddedit, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class CollectionGPSAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
        title: '收件人',
        field: 'userName',
        readonly: true
    }, {
        title: '角色',
        field: 'userRole',
        readonly: true
    }, {
        title: '业务团队',
        field: 'teamName',
        readonly: true
    }, {
        title: '客户姓名',
        field: 'customerName',
        formatter: (v, d) => {
            return d.gpsApply.customerName;
        },
        readonly: true
    }, {
        title: '车架号',
        field: 'carFrameNo',
        formatter: (v, d) => {
            return d.gpsApply.carFrameNo;
        },
        readonly: true
    }, {
        title: '业务编号',
        field: 'bizCode',
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

export default CollectionGPSAddedit;
