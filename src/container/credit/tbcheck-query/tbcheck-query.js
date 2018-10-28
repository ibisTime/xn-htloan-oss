import React from 'react';
import { Steps, Button } from 'antd';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/credit/jdcheck-query';
import { getQueryString, showWarnMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';
import { getCreditReport } from 'api/biz';

const Step = Steps.Step;

@DetailWrapper(
  state => state.creditJdCheckQuery,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class JdCheckQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      base64: ''
    };
    this.name = getQueryString('n', this.props.location.search);
    this.identityNo = getQueryString('no', this.props.location.search);
    this.mobileNo = getQueryString('m', this.props.location.search);
  }
  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
  // 定时器去扫描报告是否获取成功
  startCheck(id) {
    this.timer = setTimeout(() => {
      getCreditReport(id).then((data) => {
        if (data.status !== '2') {
          this.startCheck(id);
        } else {
          this.setState({ current: 2 });
        }
      }).catch(() => this.startCheck(id));
    }, 5000);
  }
  // 上一步
  goPrev = () => {
    clearTimeout(this.timer);
    this.timer = null;
    this.setState({ current: 0 });
  }
  // 返回
  back = () => this.props.history.go(-1)
  // 进入报告详情
  goDetail = () => {
    if (this.id) {
      this.props.history.push(`/credit/tbcheck/report?id=${this.id}`);
    } else {
      showWarnMsg('未获取到报告编号');
    }
  }
  render() {
    const { current, base64 } = this.state;
    const fields = [{
      field: 'identityName',
      title: '真实姓名',
      value: this.name,
      required: true
    }, {
      field: 'identityCardNo',
      title: '身份证号',
      value: this.identityNo,
      required: true
    }, {
      field: 'username',
      title: '手机号',
      value: this.mobileNo,
      required: true
    }, {
      field: 'loginType',
      value: 'qr',
      hidden: true
    }];
    return (
      <div>
        <Steps size="small" current={current}>
          <Step title="信息填写" />
          <Step title="扫描二维码" />
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
                  fetch(632939, params).then((data) => {
                    if (data.id === '-1') {
                      showWarnMsg('查询失败');
                    } else {
                      this.id = data.id;
                      data = JSON.parse(data.result);
                      setTimeout(() => {
                        fetch(632940, { tokendb: data.token }).then((result) => {
                          result = JSON.parse(result);
                          let base64 = result.input.value;
                          base64 = 'data:image/png;base64,' + base64;
                          this.setState({ base64, current: 1 });
                          this.startCheck(this.id);
                          this.props.cancelFetching();
                        }).catch(() => this.props.cancelFetching());
                      }, 2000);
                    }
                  }).catch(() => this.props.cancelFetching());
                }
              }, {
                title: '返回',
                handler: () => this.props.history.go(-1)
              }]
            }) : current === 1 ? (
              <div style={{ textAlign: 'center' }}>
                <h2>请用淘宝扫描下方二维码并确认登录</h2>
                <div style={{ color: '#999', marginBottom: 10, marginTop: -4 }}>该过程可能需要等待几分钟</div>
                <div><img src={base64} width="126" height="126"/></div>
                <Button style={{ marginTop: 30 }} type="primary" onClick={this.goPrev}>上一步</Button>
              </div>
            ) : (
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

export default JdCheckQuery;
