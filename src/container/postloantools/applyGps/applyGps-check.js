import React from 'react';
import { Form } from 'antd';
import { getQueryString, showWarnMsg, showSucMsg, getUserId,
  isExpressConfirm } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';
import fetch from 'common/js/fetch';

@Form.create()
class applyGpsCheck extends DetailUtil {
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
      readonly: true
    }, {
      title: '申领个数',
      field: 'applyCount',
      readonly: true
    }, {
      title: '申领有线个数',
      field: 'applyWiredCount',
      readonly: true
    }, {
      title: '申领无线个数',
      field: 'applyWirelessCount',
      readonly: true
    }, {
      title: '客户姓名',
      field: 'customerName',
      readonly: true,
      hidden: !this.state.pageData || !this.state.pageData.customerName
    }, {
      title: '车架号',
      field: 'carFrameNo',
      hidden: !this.state.pageData || !this.state.pageData.carFrameNo,
      readonly: true
    }, {
      title: '手机号',
      field: 'mobile',
      hidden: !this.state.pageData || !this.state.pageData.mobile,
      readonly: true
    }, {
      title: '申领原因',
      field: 'applyReason',
      readonly: true
    }, {
      title: 'GPS列表',
      field: 'gpsList',
      required: true,
      type: 'o2m',
      options: {
        add: true,
        delete: true,
        scroll: {
          x: 400
        },
        fields: [{
          title: 'GPS设备号',
          field: 'code',
          type: 'select',
          listCode: 632707,
          params: {
            applyStatus: '0',
            useStatus: '0'
          },
          keyName: 'code',
          valueName: (d) => {
            let obj = {
              0: '无线',
              1: '有线'
            };
            return `${d.gpsDevNo} ${obj[d.gpsType]}`;
          },
          nowrap: true,
          required: true
        }]
      }
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632716,
      buttons: [{
        title: '通过',
        handler: (param) => {
          param.approveResult = '1';
          param.operater = getUserId();
          if (!param.gpsList || param.gpsList.length < 1) {
            showWarnMsg('请添加GPS列表');
            return;
          }
          this.doFetching();
          fetch(632711, param).then((data) => {
            showSucMsg('操作成功');
            isExpressConfirm(data);
            this.cancelFetching();
            setTimeout(() => {
              this.props.history.go(-1);
            }, 1000);
          }).catch(this.cancelFetching);
        },
        check: true,
        type: 'primary'
      }, {
        title: '不通过',
        handler: (param) => {
          param.approveResult = '0';
          param.approveNote = this.projectCode;
          param.operater = getUserId();
          this.doFetching();
          fetch(632711, param).then(() => {
            showSucMsg('操作成功');
            this.cancelFetching();
            setTimeout(() => {
              this.props.history.go(-1);
            }, 1000);
          }).catch(this.cancelFetching);
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

export default applyGpsCheck;
