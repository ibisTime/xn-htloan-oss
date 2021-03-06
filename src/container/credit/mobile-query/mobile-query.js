import React from 'react';
import { Steps, Button, Row, Col } from 'antd';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/credit/mobile-query';
import { getQueryString, showWarnMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';

const Step = Steps.Step;

@DetailWrapper(
  state => state.creditMobileQuery,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class MobileQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
    this.name = getQueryString('n', this.props.location.search);
    this.identityNo = getQueryString('no', this.props.location.search);
    this.mobileNo = getQueryString('m', this.props.location.search);
  }
  // 返回
  back = () => this.props.history.go(-1)
  // 进入报告详情
  goDetail = () => {
    if (this.id) {
      this.props.history.push(`/credit/mobile/report?id=${this.id}`);
    } else {
      showWarnMsg('未获取到报告编号');
    }
  }
  // 运营商报告结果获取
  getReportResult(tokendb) {
    fetch(632937, { tokendb }).then((data) => {
      data = JSON.parse(data);
      if (data.code === '0000') {
        this.props.cancelFetching();
        this.setState({ current: 2 });
      } else {
        setTimeout(() => {
          this.getReportResult(tokendb);
        }, 1000);
      }
    }).catch(() => this.props.cancelFetching());
  }
  render() {
    const { current } = this.state;
    const fields = [{
      field: 'identityName',
      title: '姓名',
      value: this.name,
      required: true
    }, {
      field: 'identityCardNo',
      title: '身份证号',
      value: this.identityNo,
      idCard: true,
      required: true
    }, {
      field: 'username',
      title: '手机号',
      value: this.mobileNo,
      mobile: true,
      required: true
    }, {
      field: 'password',
      title: '服务密码',
      type: 'password',
      required: true
    }, {
      field: 'contactName1st',
      title: '第一联系人姓名'
    }, {
      field: 'contactMobile1st',
      title: '第一联系人手机号',
      mobile: true
    }, {
      field: 'contactRelationship1st',
      title: '第一联系人关系',
      type: 'select',
      key: 'lmzx_social_relation'
    }, {
      field: 'contactIdentityNo1st',
      title: '第一联系人身份证号',
      idCard: true
    }, {
      field: 'contactName2nd',
      title: '第二联系人姓名'
    }, {
      field: 'contactMobile2nd',
      title: '第二联系人手机号',
      mobile: true
    }, {
      field: 'contactRelationship2nd',
      title: '第二联系人关系',
      type: 'select',
      key: 'lmzx_social_relation'
    }, {
      field: 'contactIdentityNo2nd',
      title: '第二联系人身份证号',
      idCard: true
    }, {
      field: 'contactName3rd',
      title: '第三联系人姓名'
    }, {
      field: 'contactMobile3rd',
      title: '第三联系人手机号',
      mobile: true
    }, {
      field: 'contactRelationship3rd',
      title: '第三联系人关系',
      type: 'select',
      key: 'lmzx_social_relation'
    }, {
      field: 'contactIdentityNo3rd',
      title: '第三联系人身份证号',
      idCard: true
    }];
    return (
      <div>
        <Steps size="small" current={current}>
          <Step title="信息填写" />
          <Step title="短信验证码填写" />
          <Step title="查询成功" />
        </Steps>
        <div style={{ marginTop: 40 }}>
          {
            current === 0 ? this.props.buildDetail({
              fields,
              buttons: [{
                title: '下一步',
                check: true,
                type: 'primary',
                handler: (params) => {
                  this.props.doFetching();
                  params.customerName = params.identityName;
                  fetch(632934, params).then((data) => {
                    this.props.cancelFetching();
                    if (data.id === '-1') {
                      let result = JSON.parse(data.result);
                      showWarnMsg(result ? result.msg : '查询失败');
                    } else {
                      this.id = data.id;
                      this.token = JSON.parse(data.result).token;
                      this.setState({ current: 1 });
                    }
                  }).catch(() => this.props.cancelFetching());
                }
              }, {
                title: '返回',
                handler: () => this.props.history.go(-1)
              }]
            }) : current === 1 ? this.props.buildDetail({
              fields: [{
                title: '短信验证码',
                field: 'input',
                required: true
              }],
              buttons: [{
                title: '查询',
                check: true,
                type: 'primary',
                handler: (params) => {
                  this.props.doFetching();
                  params.tokendb = this.token;
                  fetch(632936, params).then((data) => {
                    this.getReportResult(this.token);
                  }).catch(() => this.props.cancelFetching());
                }
              }, {
                title: '上一步',
                handler: () => this.setState({ current: 0 })
              }]
            }) : (
              <div style={{ textAlign: 'center' }}>
                <h2>查询成功</h2>
                <Button style={{ marginTop: 30 }} type="primary" onClick={this.goDetail}>查看报告</Button>
                <Button style={{ marginTop: 30, marginLeft: 20 }} onClick={this.back}>返回</Button>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default MobileQuery;
