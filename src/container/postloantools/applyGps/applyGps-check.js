import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/postloantools/applyGps-check';
import {
  getQueryString,
  showWarnMsg,
  showSucMsg,
  getUserId,
  isExpressConfirm
} from 'common/js/util';
import {
  DetailWrapper
} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
  state => state.postloantoolsApplyGpsCheck, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class applyGpsCheck extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.state = {
      ...this.state
    };
  }
  render() {
    const fields = [{
      title: '申请人姓名',
      field: 'applyUserName',
      readonly: true
    }, {
      title: '业务团队',
      field: 'teamName',
      readonly: true
    }, {
      title: '角色',
      field: 'roleName',
      readonly: true
    }, {
      title: '客户姓名',
      field: 'customerName',
      readonly: true
    }, {
      title: '车架号',
      field: 'carFrameNo',
      readonly: true
    }, {
      title: '手机号',
      field: 'mobile',
      readonly: true
    }, {
      title: '申领个数',
      field: 'applyCount',
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
          valueName: 'gpsDevNo',
          nowrap: true,
          required: true
        }]
      }
    }];
    return this.props.buildDetail({
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
          this.props.doFetching();
          fetch(632711, param).then((data) => {
            showSucMsg('操作成功');
            isExpressConfirm(data);
            this.props.cancelFetching();
            setTimeout(() => {
              this.props.history.go(-1);
            }, 1000);
          }).catch(this.props.cancelFetching);
        },
        check: true,
        type: 'primary'
      }, {
        title: '不通过',
        handler: (param) => {
          param.approveResult = '0';
          param.approveNote = this.projectCode;
          param.operater = getUserId();
          this.props.doFetching();
          fetch(632711, param).then(() => {
            showSucMsg('操作成功');
            this.props.cancelFetching();
            setTimeout(() => {
              this.props.history.go(-1);
            }, 1000);
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

export default applyGpsCheck;