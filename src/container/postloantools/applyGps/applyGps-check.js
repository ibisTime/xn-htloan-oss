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
    this.type = !!getQueryString('type', this.props.location.search);// 公司0  个人1
  }
  render() {
    const fields = [{
        title: '申领团队',
        field: 'teamName',
        hidden: !this.state.pageData || !this.state.pageData.teamName,
        readonly: true,
        required: true
    }, {
        title: '有线个数',
        field: 'applyWiredCount',
        readonly: true,
        required: true
    }, {
        title: '无线个数',
        field: 'applyWirelessCount',
        readonly: true,
        required: true
    }, {
        title: '申领人',
        field: 'applyUserName',
        formatter: (v, d) => d && d.applyUserName ? `${d.applyUserName}-${d.roleName}` : '',
        readonly: true,
        required: true
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
          valueName: 'gpsDevNo',
          nowrap: true,
          required: true
        }]
      }
    }, {
      title: '审核意见',
      field: 'remark',
      textarea: true,
      normalArea: true
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632716,
      buttons: [{
        title: '通过',
        handler: (param) => {
          param.operator = getUserId();
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
          param.operator = getUserId();
          this.doFetching();
          fetch(632712, param).then(() => {
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
