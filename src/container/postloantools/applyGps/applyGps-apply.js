import React from 'react';
import { Form } from 'antd';
import { getQueryString, getRoleCode, getUserId, showSucMsg, getCompanyCode } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';
import fetch from 'common/js/fetch';

@Form.create()
class applyGpsApply extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.type = !!getQueryString('type', this.props.location.search); // 公司0 个人1
    this.state = {
      ...this.state,
      applyType: '',
      haveUser: false,
      userInfo: {}
    };
    this.applyCount = '';
    this.applyReason = '';
  }
  componentDidMount(): void {
    fetch(630067, {
      userId: getUserId()
    }).then(data => {
      this.setState({
        userInfo: data
      });
    });
  }

  render() {
    const {userInfo} = this.state;
    const fields = [{
        title: '所在团队',
        field: 'teamName',
        formatter: (v, d) => {
          return userInfo.teamName ? userInfo.teamName : '暂不存在';
        },
        readonly: true
      },
      {
        title: '申领人',
        field: 'teamName',
        formatter: (v, d) => {
          return userInfo.departmentName ? `${userInfo.departmentName}-${userInfo.postName}-${userInfo.realName}` : '暂不存在';
        },
        readonly: true
      },
      {
        title: '申领个数',
        field: 'applyCount',
        required: true
      },
      {
        title: '申领原因',
        field: 'applyReason',
        required: true
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
            // params.carFrameNo = this.state.pageData.carFrameNo;
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
