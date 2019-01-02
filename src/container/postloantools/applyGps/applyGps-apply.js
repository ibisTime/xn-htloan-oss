import React from 'react';
import { Form } from 'antd';
import { getQueryString, getRoleCode, getUserId, showSucMsg } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';
import fetch from 'common/js/fetch';

@Form.create()
class applyGpsApply extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.state = {
      ...this.state,
      applyType: '',
      haveUser: false
    };
  }
  render() {
    const fields = [{
      title: '申请类型',
      field: 'applyType',
      type: 'select',
      keyName: 'k',
      valueName: 'v',
      data: [{
        k: '1',
        v: '本部'
      }, {
        k: '2',
        v: '分部'
      }],
      onChange: (v) => {
        this.setState({ applyType: v });
      },
      required: true
    }, {
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
      title: '业务团队',
      field: 'teamCode',
      type: 'select',
      listCode: 630197,
      keyName: 'code',
      valueName: 'name',
      required: this.state.applyType == '2',
      hidden: this.state.applyType != '2'
    }, {
      title: '客户姓名',
      field: 'budgetOrderCode',
      type: 'select',
      pageCode: 632161,
      params: {
        userId: getUserId(),
        roleCode: getRoleCode()
      },
      keyName: 'code',
      valueName: '{{applyUserName.DATA}}-{{code.DATA}}',
      searchName: 'applyUserName',
      onChange: (v) => {
        this.setState({ haveUser: v !== '' });
        fetch(632148, {
          code: v,
          roleCode: getRoleCode(),
          start: 0,
          limit: 10
        }).then((data) => {
            this.setState({
              pageData: {
                ...this.state.pageData,
                carFrameNo: data.list[0].carFrameNo,
                mobile: data.list[0].mobile,
                customerName: data.list[0].applyUserName
              }
            });
            this.cancelFetching();
        }).catch(this.cancelFetching);
      },
      required: this.state.applyType == '1',
      hidden: this.state.applyType != '1'
    }, {
      title: '车架号',
      field: 'carFrameNo',
      hidden: !this.state.haveUser,
      readonly: true
    }, {
      title: '手机号',
      field: 'mobile',
      hidden: !this.state.haveUser,
      readonly: true
    }, {
      title: '备注',
      field: 'remark',
      readonly: true,
      hidden: !this.state.pageData || !this.state.pageData.remark
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632716,
      buttons: [{
        title: '确认',
        check: true,
        handler: (params) => {
          params.applyUser = getUserId();
          this.doFetching();
          let bizCode = this.code ? 632713 : 632710;
          if (params.applyType == '1') {
            params.teamCode = '';
            params.carFrameNo = this.state.pageData.carFrameNo;
            params.mobile = this.state.pageData.mobile;
            params.customerName = this.state.pageData.customerName;
          } else if (params.applyType == '2') {
            params.budgetOrderCode = '';
          }
          fetch(bizCode, params).then(() => {
            showSucMsg('操作成功');
            setTimeout(() => {
              this.props.history.go(-1);
            }, 1000);
            this.cancelFetching();
          }).catch(this.cancelFetching);
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
