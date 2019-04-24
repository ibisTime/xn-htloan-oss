import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/transmit/collectionGPS-check';
import {
  getQueryString,
  getUserId,
  showSucMsg,
  isExpressConfirm
} from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(state => state.transmitCollectionGPSCheck, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class CollectionGPSCheck extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  doSuccess = (data) => {
    showSucMsg('操作成功');
    isExpressConfirm(data);
    this.props.cancelFetching();
    setTimeout(() => {
        this.props.history.go(-1);
    }, 1000);
  }
  render() {
    const fields = [{
        title: '发件人',
        field: 'senderName',
        readonly: true
    }, {
        title: '收件人姓名',
        field: 'receiverName',
        formatter: (v, d) => `${d.receiverName}-${d.userRole}`,
        readonly: true
    }, {
        title: '业务团队',
        field: 'teamName',
        hidden: !this.props.pageData.teamName,
        readonly: true
    }, {
        title: '信贷专员',
        field: 'saleUserName',
        hidden: !this.props.pageData.saleUserName,
        readonly: true
    }, {
        title: '内勤专员',
        field: 'insideJobName',
        hidden: !this.props.pageData.insideJobName,
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
    return this.props.buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 632156,
        buttons: [{
            title: '收件并审核通过',
            handler: (param) => {
                param.operator = getUserId();
                param.approveResult = '1';
                fetch(632151, param).then((data) => {
                    this.doSuccess(data);
                }).catch(this.props.cancelFetching);
            },
            check: true
        }, {
            title: '收件审核不通过',
            handler: (param) => {
                param.operator = getUserId();
                param.approveResult = '0';
                fetch(632151, param).then((data) => {
                    this.doSuccess(data);
                }).catch(this.props.cancelFetching);
            },
            check: true
        }, {
            title: '收件待补件',
            handler: (param) => {
                param.operator = getUserId();
                fetch(632152, param).then((data) => {
                    this.doSuccess(data);
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

export default CollectionGPSCheck;
