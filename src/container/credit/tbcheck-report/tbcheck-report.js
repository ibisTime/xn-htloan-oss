import React from 'react';
import { Spin, Form, Row, Col, Card } from 'antd';
import { getCreditReport } from 'api/biz';
import { formItemLayout } from 'common/js/config';
import './index.css';

const { Item: FormItem } = Form;
const col2Props = { xs: 32, sm: 24, md: 12, lg: 12 };

export default class TbCheckReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 基本信息
      basicInfo: {},
      // 支付宝信息
      zfbInfos: {},
      // 用户画像
      personas: {},
      // 消费信息
      consumeInfo: {},
      // 收货地址信息
      recAddInfos: {},
      // 消费金额分布
      consumeMoneyDis: {},
      // 检查项
      contrast: {},
      // 订单详情
      orderDetails: {},
      fetching: true
    };
    this.idcard = '14272719950821351X';
  }
  componentDidMount() {
    getCreditReport('taobao_report', this.idcard).then((data) => {
      let report = JSON.parse(data.result).data;
      this.setState({
        fetching: false,
        basicInfo: report.basicInfo
      });
    }).catch(() => this.setState({ fetching: false }));
  }
  render() {
    const { basicInfo, fetching } = this.state;
    return (
      <Spin spinning={this.state.fetching}>
        <div className="tbcheck-report-wrapper">
          <Card title="基本信息">
            <table className="outer-table-wrapper" border="0" cellSpacing="0" cellPadding="0">
              <tbody>
                <tr>
                  <th colspan="16">姓名</th>
                  <td colspan="34">{basicInfo.username}</td>
                  <th colspan="16">性别</th>
                  <td colspan="34">{basicInfo.gender}</td>
                </tr>
                <tr>
                  <th colspan="16">手机号</th>
                  <td colspan="34">17611591955</td>
                  <th colspan="16">身份证号</th>
                  <td colspan="34">14272719950821351X</td>
                </tr>
                <tr>
                  <th colspan="16">出生日期</th>
                  <td colspan="34">1995-08-21</td>
                  <th colspan="16">年龄</th>
                  <td colspan="34">23</td>
                </tr>
                <tr>
                  <th colspan="16">成长值</th>
                  <td colspan="34">2694</td>
                  <th colspan="16">会员等级</th>
                  <td colspan="34">1</td>
                </tr>
                <tr>
                  <th colspan="16">好评率</th>
                  <td colspan="34"></td>
                  <th colspan="16">安全等级</th>
                  <td colspan="34">中</td>
                </tr>
                <tr>
                  <th colspan="16">实名认证</th>
                  <td colspan="34">已认证</td>
                  <th colspan="16">认证渠道</th>
                  <td colspan="34">支付宝实名认证（身份证件已上传）</td>
                </tr>
                <tr>
                  <th colspan="16">默认收货地址</th>
                  <td colspan="84">浙江省 杭州市 余杭区 仓前街道 海曙路128号仓溢绿苑5幢二单元402</td>
                </tr>
                <tr>
                  <th colspan="16" style={{ verticalAlign: 'middle' }}>与输入姓名比对</th>
                  <td colspan="84" style={{ paddingRight: 0 }}>
                    <table border="0" cellSpacing="0" cellPadding="0" width="100%" className="child_table cols_table" style={{ tableLayout: 'fixed' }}>
                      <tbody>
                        <tr style={{ paddingRight: 20, borderBottom: '1px solid #dfdfdf' }}>
                          <td colspan="84" style={{ paddingBottom: 10, width: '100%' }}><strong style={{ paddingRight: 14 }}>输入姓名</strong>柴运来</td>
                        </tr>
                        <tr>
                          <td colspan="56" style={{ paddingTop: 12 }}>
                            真实姓名<span className="valid ml_20">匹配成功</span>
                          </td>
                          <td colspan="28" className="col_999" style={{ paddingTop: 12 }}>
                            真实姓名 : <span className="col_333">柴运来</span>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="56">
                            默认地址收货人姓名<span className="valid ml_20">匹配成功</span>
                          </td>
                          <td colspan="28" className="col_999">
                            默认地址收货人姓名 : <span className="col_333">柴运来</span>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="56">
                            订单最多收货人姓名<span className="valid ml_20">匹配成功</span>
                          </td>
                          <td colspan="28" className="col_999">
                            订单最多收货人姓名 : <span className="col_333">柴运来</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <th colspan="16" style={{ verticalAlign: 'middle' }}>与输入手机号比对</th>
                  <td colspan="84" style={{ paddingRight: 0 }}>
                    <table border="0" cellSpacing="0" cellPadding="0" width="100%" className="child_table cols_table" style={{ tableLayout: 'fixed' }}>
                      <tbody>
                        <tr style={{ paddingRight: 20, borderBottom: '1px solid #dfdfdf' }}>
                          <td colspan="84" style={{ paddingBottom: 10, width: '100%' }}>
                            <strong style={{ paddingRight: 14 }}>输入手机号</strong>17611591955
                            <span className="valid ml_20 phoneLine after">未命中风险清单</span>
                            <span className="ml_5">北京联通</span>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="56" style={{ paddingTop: 12 }}>
                            绑定手机号<span className="valid ml_20">模糊匹配成功</span>
                          </td>
                          <td colspan="28" className="col_999" style={{ paddingTop: 12 }}>
                            绑定手机号 : <span className="col_333">176****1955</span>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="56">默认地址收货电话
                            <span className="valid ml_20 phoneLine after">匹配成功</span>
                            <span className="valid ml_20  phoneLine after">未命中风险清单</span>
                            <span className="ml_5">北京联通</span>
                          </td>
                          <td colspan="28" className="col_999">
                            默认地址收货电话 : <span className="col_333">17611591955</span>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="56">订单最多收货电话
                            <span className="valid ml_20 phoneLine after">匹配成功</span>
                            <span className="valid ml_20  phoneLine after">未命中风险清单</span>
                            <span className="ml_5">北京联通</span>
                          </td>
                          <td colspan="28" className="col_999">
                            订单最多收货电话 : <span className="col_333">17611591955</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
          <Card style={{ marginTop: 16 }} title="支付宝信息"></Card>
          <Card style={{ marginTop: 16 }} title="用户画像">
            <Card title="购物行为"></Card>
            <Card style={{ marginTop: 16 }} title="收货地域"></Card>
            <Card style={{ marginTop: 16 }} title="活跃时间段分析"></Card>
          </Card>
          <Card style={{ marginTop: 16 }} title="消费信息">
            <Card style={{ marginTop: 16 }} title="消费概要"></Card>
            <Card style={{ marginTop: 16 }} title="消费信息"></Card>
            <Card style={{ marginTop: 16 }} title="消费金额分布"></Card>
          </Card>
          <Card style={{ marginTop: 16 }} title="地址信息">
            {/* <Card title="消费概要"></Card>
            <Card style={{ marginTop: 16 }} title="消费信息"></Card>
            <Card style={{ marginTop: 16 }} title="消费金额分布"></Card> */}
          </Card>
          <div>
            <div>备注:</div>
            <div>xxxxxx</div>
          </div>
        </div>
        {/* <Form classNameName="detail-form-wrapper">
          <FormItem key='name' {...formItemLayout} label="姓名">
            <div classNameName="readonly-text">{report.name}</div>
          </FormItem>
          <FormItem key='identityNo' {...formItemLayout} label="身份证号">
            <div classNameName="readonly-text">{report.identityNo}</div>
          </FormItem>
          <FormItem key='resultMsg' {...formItemLayout} label="匹配结果">
            <div classNameName="readonly-text">{report.resultMsg}</div>
          </FormItem>
        </Form> */}
      </Spin>
    );
  }
}
