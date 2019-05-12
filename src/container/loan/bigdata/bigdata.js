import React from 'react';
import { Spin, Card, Row, Col, Button } from 'antd';
import { getQueryString, showWarnMsg } from 'common/js/util';
import fetch from 'common/js/fetch';

export default class BigData extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.state = {
      fetching: true,
      mainInfo: {},
      ghInfo: null,
      dbInfo: null
    };
    this.mainUser = {};
    this.ghUser = {};
    this.dbUser = {};
  }
  componentDidMount() {
    fetch(632516, { code: this.code }).then((data) => {
      if (!data.creditUserList || !data.creditUserList.length) {
        showWarnMsg('征信名单还没有录入，无法查询大数据');
        return;
      }
      let fetchNo = [];
      let fetchFuc = [];
      data.creditUserList.forEach(d => {
        if (d.loanRole === '1') {
          this.mainUser = {
            idNo: d.idNo,
            mobile: d.mobile,
            userName: d.userName
          };
          fetchNo.push('main');
          fetchFuc.push(this.checkStatus(d.idNo));
        } else if (d.loanRole === '2') {
          this.ghUser = {
            idNo: d.idNo,
            mobile: d.mobile,
            userName: d.userName
          };
          fetchNo.push('gh');
          fetchFuc.push(this.checkStatus(d.idNo));
        } else {
          this.dbUser = {
            idNo: d.idNo,
            mobile: d.mobile,
            userName: d.userName
          };
          fetchNo.push('db');
          fetchFuc.push(this.checkStatus(d.idNo));
        }
      });
      Promise.all(fetchFuc).then(([...result]) => {
        this.setState({ fetching: false });
        fetchNo.forEach((f, i) => {
          this.setState({
            [`${f}Info`]: result[i]
          });
        });
      }).catch(() => this.setState({ fetching: false }));
    }).catch(() => this.setState({ fetching: false }));
  }
  checkStatus(idNo) {
    return fetch(632946, { userId: idNo });
  }
  // 获取是否认证
  getExtra(key, role) {
    let info = this.state[`${role}Info`];
    if (!info || !info[key]) {
      return '未认证';
    }
    let result = JSON.parse(info[key]);
    return result.status === 2 ? '已认证' : '认证中';
  }
  // 认证
  queryReport(key, role) {
    let url = '';
    let info = this[`${role}User`];
    if (key === 'identity') {
      url = `/credit/idcheck/query?n=${info.userName}&no=${info.idNo}`;
    } else if (key === 'bankcard4check') {
      url = `/credit/bank4check/query?n=${info.userName}&no=${info.idNo}&m=${info.mobile}`;
    } else if (key === 'jd') {
      url = `/credit/jd/query?n=${info.userName}&no=${info.idNo}&m=${info.mobile}`;
    } else if (key === 'mobileReportTask') {
      url = `/credit/mobile/query?n=${info.userName}&no=${info.idNo}&m=${info.mobile}`;
    } else if (key === 'taobao_report') {
      url = `/credit/tbcheck/query?n=${info.userName}&no=${info.idNo}&m=${info.mobile}`;
    }
    this.props.history.push(url);
  }
  // 报告详情
  goReport(key, role) {
    let url = '';
    let info = this.state[`${role}Info`];
    if (info && info[key]) {
      let result = JSON.parse(info[key]);
      if (result.status === 1) {
        showWarnMsg('报告处于认证中状态，无法查看');
      } else {
        let id = result.id;
        if (key === 'identity') {
          url = `/credit/idcheck/report?id=${id}`;
        } else if (key === 'bankcard4check') {
          url = `/credit/bank4check/report?id=${id}`;
        } else if (key === 'jd') {
          url = `/credit/jd/report?id=${id}`;
        } else if (key === 'mobileReportTask') {
          url = `/credit/mobile/report?id=${id}`;
        } else if (key === 'taobao_report') {
          url = `/credit/tbcheck/report?id=${id}`;
        }
        this.props.history.push(url);
      }
    } else {
      showWarnMsg('该用户还没有报告，无法查看');
    }
  }
  render() {
    const { mainInfo, ghInfo, dbInfo, fetching } = this.state;
    return (
      <Spin spinning={fetching}>
        <Card title={`申请人(${this.mainUser.userName})`}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={8} style={{marginBottom: '20px'}}>
              <Card title="身份证实名核验" extra={this.getExtra('identity', 'main')}>
                <div style={{ textAlign: 'center' }}>
                  <Button onClick={() => this.queryReport('identity', 'main')} type="primary">发起查询</Button>
                  <Button style={{ marginLeft: 20 }} onClick={() => this.goReport('identity', 'main')} type="primary">查看报告</Button>
                </div>
              </Card>
            </Col>
            <Col span={8} style={{marginBottom: '20px'}}>
              <Card title="银行四要素核验" extra={this.getExtra('bankcard4check', 'main')}>
                <div style={{ textAlign: 'center' }}>
                  <Button onClick={() => this.queryReport('bankcard4check', 'main')} type="primary">发起查询</Button>
                  <Button style={{ marginLeft: 20 }} onClick={() => this.goReport('bankcard4check', 'main')} type="primary">查看报告</Button>
                </div>
              </Card>
            </Col>
            <Col span={8} style={{marginBottom: '20px'}}>
              <Card title="京东" extra={this.getExtra('jd', 'main')}>
                <div style={{ textAlign: 'center' }}>
                  <Button onClick={() => this.queryReport('jd', 'main')} type="primary">发起查询</Button>
                  <Button style={{ marginLeft: 20 }} onClick={() => this.goReport('jd', 'main')} type="primary">查看报告</Button>
                </div>
              </Card>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={8} style={{marginBottom: '20px'}}>
              <Card title="运营商" extra={this.getExtra('mobileReportTask', 'main')}>
                <div style={{ textAlign: 'center' }}>
                  <Button onClick={() => this.queryReport('mobileReportTask', 'main')} type="primary">发起查询</Button>
                  <Button style={{ marginLeft: 20 }} onClick={() => this.goReport('mobileReportTask', 'main')} type="primary">查看报告</Button>
                </div>
              </Card>
            </Col>
            <Col span={8} style={{marginBottom: '20px'}}>
              <Card title="电商" extra={this.getExtra('taobao_report', 'main')}>
                <div style={{ textAlign: 'center' }}>
                  <Button onClick={() => this.queryReport('taobao_report', 'main')} type="primary">发起查询</Button>
                  <Button style={{ marginLeft: 20 }} onClick={() => this.goReport('taobao_report', 'main')} type="primary">查看报告</Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Card>
        {ghInfo ? (
          <Card title={`共还人(${this.ghUser.userName})`}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={8} style={{marginBottom: '20px'}}>
                <Card title="身份证实名核验" extra={this.getExtra('identity', 'gh')}>
                  <div style={{ textAlign: 'center' }}>
                    <Button onClick={() => this.queryReport('identity', 'gh')} type="primary">发起查询</Button>
                    <Button style={{ marginLeft: 20 }} onClick={() => this.goReport('identity', 'gh')} type="primary">查看报告</Button>
                  </div>
                </Card>
              </Col>
              <Col span={8} style={{marginBottom: '20px'}}>
                <Card title="银行四要素核验" extra={this.getExtra('bankcard4check', 'gh')}>
                  <div style={{ textAlign: 'center' }}>
                    <Button onClick={() => this.queryReport('bankcard4check', 'gh')} type="primary">发起查询</Button>
                    <Button style={{ marginLeft: 20 }} onClick={() => this.goReport('bankcard4check', 'gh')} type="primary">查看报告</Button>
                  </div>
                </Card>
              </Col>
              <Col span={8} style={{marginBottom: '20px'}}>
                <Card title="京东" extra={this.getExtra('jd', 'gh')}>
                  <div style={{ textAlign: 'center' }}>
                    <Button onClick={() => this.queryReport('jd', 'gh')} type="primary">发起查询</Button>
                    <Button style={{ marginLeft: 20 }} onClick={() => this.goReport('jd', 'gh')} type="primary">查看报告</Button>
                  </div>
                </Card>
              </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={8} style={{marginBottom: '20px'}}>
                <Card title="运营商" extra={this.getExtra('mobileReportTask', 'gh')}>
                  <div style={{ textAlign: 'center' }}>
                    <Button onClick={() => this.queryReport('mobileReportTask', 'gh')} type="primary">发起查询</Button>
                    <Button style={{ marginLeft: 20 }} onClick={() => this.goReport('mobileReportTask', 'gh')} type="primary">查看报告</Button>
                  </div>
                </Card>
              </Col>
              <Col span={8} style={{marginBottom: '20px'}}>
                <Card title="电商" extra={this.getExtra('taobao_report', 'gh')}>
                  <div style={{ textAlign: 'center' }}>
                    <Button onClick={() => this.queryReport('taobao_report', 'gh')} type="primary">发起查询</Button>
                    <Button style={{ marginLeft: 20 }} onClick={() => this.goReport('taobao_report', 'gh')} type="primary">查看报告</Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>
        ) : null}
        {dbInfo ? (
          <Card title={`担保人(${this.dbUser.userName})`}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={8} style={{marginBottom: '20px'}}>
                <Card title="身份证实名核验" extra={this.getExtra('identity', 'db')}>
                  <div style={{ textAlign: 'center' }}>
                    <Button onClick={() => this.queryReport('identity', 'db')} type="primary">发起查询</Button>
                    <Button style={{ marginLeft: 20 }} onClick={() => this.goReport('identity', 'db')} type="primary">查看报告</Button>
                  </div>
                </Card>
              </Col>
              <Col span={8} style={{marginBottom: '20px'}}>
                <Card title="银行四要素核验" extra={this.getExtra('bankcard4check', 'db')}>
                  <div style={{ textAlign: 'center' }}>
                    <Button onClick={() => this.queryReport('bankcard4check', 'db')} type="primary">发起查询</Button>
                    <Button style={{ marginLeft: 20 }} onClick={() => this.goReport('bankcard4check', 'db')} type="primary">查看报告</Button>
                  </div>
                </Card>
              </Col>
              <Col span={8} style={{marginBottom: '20px'}}>
                <Card title="京东" extra={this.getExtra('jd', 'db')}>
                  <div style={{ textAlign: 'center' }}>
                    <Button onClick={() => this.queryReport('jd', 'db')} type="primary">发起查询</Button>
                    <Button style={{ marginLeft: 20 }} onClick={() => this.goReport('jd', 'db')} type="primary">查看报告</Button>
                  </div>
                </Card>
              </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={8} style={{marginBottom: '20px'}}>
                <Card title="运营商" extra={this.getExtra('mobileReportTask', 'db')}>
                  <div style={{ textAlign: 'center' }}>
                    <Button onClick={() => this.queryReport('mobileReportTask', 'db')} type="primary">发起查询</Button>
                    <Button style={{ marginLeft: 20 }} onClick={() => this.goReport('mobileReportTask', 'db')} type="primary">查看报告</Button>
                  </div>
                </Card>
              </Col>
              <Col span={8} style={{marginBottom: '20px'}}>
                <Card title="电商" extra={this.getExtra('taobao_report')}>
                  <div style={{ textAlign: 'center' }}>
                    <Button onClick={() => this.queryReport('taobao_report', 'db')} type="primary">发起查询</Button>
                    <Button style={{ marginLeft: 20 }} onClick={() => this.goReport('taobao_report', 'db')} type="primary">查看报告</Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>
        ) : null}
      </Spin>
    );
  }
}
