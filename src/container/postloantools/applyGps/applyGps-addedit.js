import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/postloantools/applyGps-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.postloantoolsApplyGpsAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class applyGpsAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '申请人姓名',
      field: 'applyUserName',
      formatter: (v, d) => `${d.applyUserName}-${d.roleName}`,
      readonly: true
    }, {
      title: '业务团队',
      field: 'teamName',
      hidden: !this.props.pageData.teamName,
      readonly: true
    }, {
      title: '申领个数',
      field: 'applyCount'
    }, {
      title: '申领有线个数',
      field: 'applyWiredCount',
      required: true
    }, {
      title: '申领无线个数',
      field: 'applyWirelessCount',
      required: true
    }, {
      title: '客户姓名',
      field: 'customerName',
      formatter: (v, d) => `${v}-${d.budgetOrderCode}`,
      hidden: !this.props.pageData.customerName
    }, {
      title: '车架号',
      field: 'carFrameNo',
      hidden: !this.props.pageData.carFrameNo,
      readonly: true
    }, {
      title: '手机号',
      field: 'mobile',
      hidden: !this.props.pageData.mobile,
      readonly: true
    }, {
      title: '申领原因',
      field: 'applyReason'
    }, {
      title: 'GPS列表',
      field: 'gpsList',
      required: true,
      type: 'o2m',
      options: {
        fields: [{
          field: 'gpsType',
          title: 'GPS类型',
          type: 'select',
          data: [{
            dkey: '0',
            dvalue: '无线'
          }, {
            dkey: '1',
            dvalue: '有线'
          }],
          keyName: 'dkey',
          valueName: 'dvalue'
        }, {
          title: 'GPS设备号',
          field: 'gpsDevNo'
        }]
      }
    }, {
      title: '备注',
      field: 'remark',
      hidden: !this.props.pageData.remark
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632716
    });
  }
}

export default applyGpsAddedit;
