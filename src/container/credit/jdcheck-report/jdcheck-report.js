import React from 'react';
import { Spin, Card, Icon } from 'antd';
import { getCreditReport } from 'api/biz';
import { showWarnMsg } from 'common/js/util';
import '../index.css';

export default class JdCheckReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 基本信息
      basicInfo: {},
      // 绑定银行信息
      bankInfo: [],
      // 白条信息
      baiTiaoInfo: {},
      // 地址信息
      addressInfo: [],
      // 订单信息
      orderDetail: [],
      fetching: true
    };
    this.idcard = '14272719950821351X';
  }
  componentDidMount() {
    getCreditReport('jd', this.idcard).then((data) => {
      if (!data.result) {
        showWarnMsg('未获取到京东报告');
        this.setState({ fetching: false });
        return;
      }
      let report = JSON.parse(data.result).data;
      this.setState({
        fetching: false,
        basicInfo: report.basicInfo,
        bankInfo: report.bankInfo,
        baiTiaoInfo: report.baiTiaoInfo,
        addressInfo: report.addressInfo,
        orderDetail: report.orderDetail
      });
    }).catch(() => this.setState({ fetching: false }));
  }
  render() {
    const { fetching, basicInfo, bankInfo, baiTiaoInfo, addressInfo, orderDetail } = this.state;
    return (
      <Spin spinning={fetching}>
        <div className="credit-report-wrapper spec-report-wrapper">
          <Card title="基本信息">
            <p className="table-title">基本信息</p>
            <table className="outer-table-wrapper" border="0" cellSpacing="0" cellPadding="0">
              <tbody>
                <tr>
                  <th colSpan="16">会员名</th>
                  <td colSpan="34">{basicInfo.nickName}</td>
                  <th colSpan="16">会员等级</th>
                  <td colSpan="34">{basicInfo.vipLevel}</td>
                </tr>
                <tr>
                  <th colSpan="16">手机号</th>
                  <td colSpan="34">{basicInfo.mobileNo}</td>
                  <th colSpan="16">邮箱</th>
                  <td colSpan="34">{basicInfo.email}</td>
                </tr>
                <tr>
                  <th colSpan="16">真实姓名</th>
                  <td colSpan="34">{basicInfo.realName}</td>
                  <th colSpan="16">证件号码</th>
                  <td colSpan="34">{basicInfo.idCard}</td>
                </tr>
                <tr>
                  <th colSpan="16">成长值</th>
                  <td colSpan="34">{basicInfo.growthValue}</td>
                  <th colSpan="16">安全等级</th>
                  <td colSpan="34">{basicInfo.securityLevel}</td>
                </tr>
              </tbody>
            </table>
          </Card>
          <Card title="绑定银行卡信息">
            <p className="table-title">绑定银行卡信息</p>
            <table className="outer-table-wrapper" border="0" cellSpacing="0" cellPadding="0">
              <tbody>
                <tr>
                  <th colSpan="16">姓名</th>
                  <th colSpan="34">银行卡</th>
                  <th colSpan="16">银行卡类型</th>
                  <th colSpan="34">电话</th>
                </tr>
                {
                  bankInfo && bankInfo.length ? bankInfo.map((v, i) => (
                    <tr key={i}>
                      <td colSpan="16">{v.name}</td>
                      <td colSpan="34">{v.bankCardID}</td>
                      <td colSpan="16">{v.cardType}</td>
                      <td colSpan="34">{v.tel}</td>
                    </tr>
                  )) : null
                }
              </tbody>
            </table>
          </Card>
          <Card title="京东白条">
            <p className="table-title">京东白条</p>
            <table className="outer-table-wrapper" border="0" cellSpacing="0" cellPadding="0">
              <tbody>
                <tr>
                  <th colSpan="16">总额度</th>
                  <td colSpan="34">{baiTiaoInfo.creditlimit}</td>
                  <th colSpan="16">可用额度</th>
                  <td colSpan="34">{baiTiaoInfo.availablelimit}</td>
                </tr>
                <tr>
                  <th colSpan="16">是否开通</th>
                  <td colSpan="34">{baiTiaoInfo.isOpen}</td>
                  <th colSpan="16">全部待还款</th>
                  <td colSpan="34">{baiTiaoInfo.totalToBePay}</td>
                </tr>
                <tr>
                  <th colSpan="16">下月账单</th>
                  <td colSpan="34">{baiTiaoInfo.monthloan}</td>
                  <th colSpan="16">还款日</th>
                  <td colSpan="34">{baiTiaoInfo.nextRepayMentDate}</td>
                </tr>
                <tr>
                  <th colSpan="16">白条消费</th>
                  <td colSpan="34">{baiTiaoInfo.biaoTiaoConSum}</td>
                  <th colSpan="16">小白信用</th>
                  <td colSpan="34">{baiTiaoInfo.xiaoBaiCreditValue}</td>
                </tr>
              </tbody>
            </table>
          </Card>
          <Card title="地址信息">
            <p className="table-title">地址信息</p>
            <table className="outer-table-wrapper" border="0" cellSpacing="0" cellPadding="0">
              <tbody>
                <tr>
                  <th colSpan="10">联系人</th>
                  <th colSpan="14">电话</th>
                  <th colSpan="76">收货地址</th>
                </tr>
                {
                  addressInfo && addressInfo.length ? addressInfo.map((v, i) => (
                    <tr key={i}>
                      <td colSpan="10">{v.linkman}</td>
                      <td colSpan="14">{v.tel}</td>
                      <td colSpan="76">{v.address}</td>
                    </tr>
                  )) : null
                }
              </tbody>
            </table>
          </Card>
          <Card title="订单记录">
            <p className="table-title">订单记录</p>
            <table className="outer-table-wrapper" border="0" cellSpacing="0" cellPadding="0">
              <tbody>
                <tr>
                  <th>概要信息</th>
                  <th>订单金额</th>
                  <th>收货信息</th>
                  <th>订单状态</th>
                </tr>
                {
                  orderDetail && orderDetail.length ? orderDetail.map((v, i) => (
                    <tr key={i}>
                      <td>
                        <div>{v.orderDetail}</div>
                        <div>{v.goodsName}</div>
                      </td>
                      <td>{v.orderMoney}</td>
                      <td>
                        <div>{v.consigneePerson} {v.tel}</div>
                        <div><span className="col_999">收货地址 : </span>{v.consigneeAddr}</div>
                      </td>
                      <td>{v.orderStatus}</td>
                    </tr>
                  )) : null
                }
              </tbody>
            </table>
          </Card>
        </div>
      </Spin>
    );
  }
}
