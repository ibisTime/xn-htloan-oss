import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/postloantools/applyGps-apply';
import { getQueryString, getRoleCode, getUserId, showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
  state => state.postloantoolsApplyGpsApply, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class applyGpsApply extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.haveUser = false;
    this.flag = false;
  }
  render() {
    const fields = [{
      title: '申领有线个数',
      field: 'applyWiredCount',
      required: true
    }, {
      title: '申领无线个数',
      field: 'applyWirelessCount',
      required: true
    }, {
      title: '申领原因',
      field: 'applyReason',
      required: true
    }, {
      title: '客户姓名',
      field: 'budgetOrderCode',
      type: 'select',
      pageCode: 632148,
      params: {
        roleCode: getRoleCode()
      },
      keyName: 'code',
      valueName: 'applyUserName',
      searchName: 'applyUserName',
      onChange: (v) => {
        this.haveUser = v !== '';
        fetch(632148, {
          code: v,
          roleCode: getRoleCode(),
          start: 0,
          limit: 10
        }).then((data) => {
            this.props.setPageData({
              ...this.props.pageData,
              carFrameNo: data.list[0].carFrameNo,
              mobile: data.list[0].mobile,
              customerName: data.list[0].applyUserName
            });
            this.props.cancelFetching();
        }).catch(this.props.cancelFetching);
      }
    }, {
      title: '车架号',
      field: 'carFrameNo',
      hidden: !this.haveUser,
      readonly: true
    }, {
      title: '手机号',
      field: 'mobile',
      hidden: !this.haveUser,
      readonly: true
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632716,
      buttons: [{
        title: '确认',
        check: true,
        handler: (params) => {
          params.applyUser = getUserId();
          params.type = '2';
          params.carFrameNo = this.props.pageData.carFrameNo;
          params.mobile = this.props.pageData.mobile;
          params.customerName = this.props.pageData.customerName;
          this.props.doFetching();
          fetch(632710, params).then(() => {
            showSucMsg('操作成功');
            setTimeout(() => {
              this.props.history.go(-1);
            }, 1000);
            this.props.cancelFetching();
          }).catch(this.props.cancelFetching);
        }
      }, {
        title: '返回',
        handler: (param) => {
          this.props.history.go(-1);
        }
      }]
    });
  }
}

export default applyGpsApply;
