import React from 'react';
import { Spin, Card, Icon } from 'antd';
import { getCreditReport } from 'api/biz';
import { showWarnMsg } from 'common/js/util';
import '../index.css';

export default class TbCheckReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 基本信息
      basicInfo: {},
      // 支付宝信息
      zfbInfos: {},
      // 用户画像
      personas: {
        // 收货地域
        consumeMostCity: {},
        activeTimes: []
      },
      // 消费信息
      consumeInfo: {},
      // 消费金额分布
      consumeMoneyDis: [],
      // 收货地址信息
      recAddInfos: [],
      // 检查项
      contrast: [],
      fetching: true
    };
    this.idcard = '14272719950821351X';
  }
  componentDidMount() {
    getCreditReport('taobao_report', this.idcard).then((data) => {
      if (!data.result) {
        showWarnMsg('未获取到电商报告');
        this.setState({ fetching: false });
        return;
      }
      let report = JSON.parse(data.result).data;
      this.setState({
        fetching: false,
        basicInfo: report.basicInfo,
        zfbInfos: report.zfbInfos,
        personas: report.personas,
        consumeInfo: report.consumeInfo,
        consumeMoneyDis: report.consumeMoneyDis,
        recAddInfos: report.recAddInfos,
        contrast: report.contrast
      });
    }).catch(() => this.setState({ fetching: false }));
  }
  // 根据key从匹配项中查询匹配项
  findInContrast(key) {
    const { contrast } = this.state;
    if (contrast && contrast.length) {
      for (let i = 0; i < contrast.length; i++) {
        if (contrast[i].item === key) {
          return contrast[i];
        }
      }
    }
    return {};
  }
  render() {
    const { basicInfo, zfbInfos, personas, consumeInfo, consumeMoneyDis,
      recAddInfos, fetching } = this.state;
    const tbNameMatch = this.findInContrast('taobao_name_match');
    const tbAddrNameMatch = this.findInContrast('taobao_address_consignee');
    const tbMostNameMatch = this.findInContrast('taobao_most_consignee');
    const tbMobRiskMatch = this.findInContrast('taobao_mobile_isrisk');
    const tbMobArea = this.findInContrast('taobao_mobile_area');
    const tbBindMobMatch = this.findInContrast('taobao_isbdmobile');
    const tbAddrMobMatch = this.findInContrast('taobao_address_mobile');
    const tbAddrMobRiskMatch = this.findInContrast('taobao_address_mobile_isrisk');
    const tbAddrMobArea = this.findInContrast('taobao_address_mobile_area');
    const tbMostAddrMobMatch = this.findInContrast('taobao_most_address_mobile');
    const tbMostAddrMobRiskMatch = this.findInContrast('taobao_most_address_mobile_isrisk');
    const tbMostAddrMobArea = this.findInContrast('taobao_most_address_mobile_area');
    return (
      <Spin spinning={fetching}>
        <div className="credit-report-wrapper">
          <Card title="基本信息">
            <p className="table-title">基本信息</p>
            <table className="outer-table-wrapper" border="0" cellSpacing="0" cellPadding="0">
              <tbody>
                <tr>
                  <th colSpan="16">姓名</th>
                  <td colSpan="34">{basicInfo.username}</td>
                  <th colSpan="16">性别</th>
                  <td colSpan="34">{basicInfo.gender}</td>
                </tr>
                <tr>
                  <th colSpan="16">手机号</th>
                  <td colSpan="34">{basicInfo.mobile}</td>
                  <th colSpan="16">身份证号</th>
                  <td colSpan="34">{basicInfo.idCard}</td>
                </tr>
                <tr>
                  <th colSpan="16">出生日期</th>
                  <td colSpan="34">{basicInfo.birthday}</td>
                  <th colSpan="16">年龄</th>
                  <td colSpan="34">{basicInfo.age}</td>
                </tr>
                <tr>
                  <th colSpan="16">成长值</th>
                  <td colSpan="34">{basicInfo.growthValue}</td>
                  <th colSpan="16">会员等级</th>
                  <td colSpan="34">{basicInfo.vipLevel}</td>
                </tr>
                <tr>
                  <th colSpan="16">好评率</th>
                  <td colSpan="34">{basicInfo.favorableRate}</td>
                  <th colSpan="16">安全等级</th>
                  <td colSpan="34">{basicInfo.securityLevel}</td>
                </tr>
                <tr>
                  <th colSpan="16">实名认证</th>
                  <td colSpan="34">{basicInfo.identityStatus}</td>
                  <th colSpan="16">认证渠道</th>
                  <td colSpan="34">{basicInfo.identityChannel}</td>
                </tr>
                <tr>
                  <th colSpan="16">默认收货地址</th>
                  <td colSpan="84">{basicInfo.addresses}</td>
                </tr>
                <tr>
                  <th colSpan="16" style={{ verticalAlign: 'middle' }}>与输入姓名比对</th>
                  <td colSpan="84" style={{ paddingRight: 0 }}>
                    <table border="0" cellSpacing="0" cellPadding="0" width="100%" className="child_table cols_table" style={{ tableLayout: 'fixed' }}>
                      <tbody>
                        <tr style={{ paddingRight: 20, borderBottom: '1px solid #dfdfdf' }}>
                          <td colSpan="84" style={{ paddingBottom: 10, width: '100%' }}>
                            <strong style={{ paddingRight: 14 }}>输入姓名</strong>{basicInfo.username}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="56" style={{ paddingTop: 12 }}>
                            真实姓名{
                              tbNameMatch.result === '1'
                                ? <span className="valid ml_20"><Icon type="check-circle" theme="filled" />匹配成功</span>
                                : tbNameMatch.result === '0'
                                  ? <span className="unvalid ml_20"><Icon type="close-circle" theme="filled" />匹配失败</span>
                                  : <span className="unknow ml_20"><Icon type="info-circle" theme="filled" />匹配结果未知</span>
                            }
                          </td>
                          <td colSpan="28" className="col_999" style={{ paddingTop: 12 }}>
                            真实姓名 : <span className="col_333">{basicInfo.realName}</span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="56">
                            默认地址收货人姓名{
                              tbAddrNameMatch.result === '1'
                                ? <span className="valid ml_20"><Icon type="check-circle" theme="filled" />匹配成功</span>
                                : tbAddrNameMatch === '0'
                                  ? <span className="unvalid ml_20"><Icon type="close-circle" theme="filled" />匹配失败</span>
                                  : <span className="unknow ml_20"><Icon type="info-circle" theme="filled" />匹配结果未知</span>
                            }
                          </td>
                          <td colSpan="28" className="col_999">
                            默认地址收货人姓名 : <span className="col_333">{basicInfo.defAddName}</span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="56">
                            订单最多收货人姓名{
                              tbMostNameMatch.result === '1'
                                ? <span className="valid ml_20"><Icon type="check-circle" theme="filled" />匹配成功</span>
                                : tbMostNameMatch.result === '0'
                                  ? <span className="unvalid ml_20"><Icon type="close-circle" theme="filled" />匹配失败</span>
                                  : <span className="unknow ml_20"><Icon type="info-circle" theme="filled" />匹配结果未知</span>
                            }
                          </td>
                          <td colSpan="28" className="col_999">
                            订单最多收货人姓名 : <span className="col_333">{basicInfo.recOrderName}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <th colSpan="16" style={{ verticalAlign: 'middle' }}>与输入手机号比对</th>
                  <td colSpan="84" style={{ paddingRight: 0 }}>
                    <table border="0" cellSpacing="0" cellPadding="0" width="100%" className="child_table cols_table" style={{ tableLayout: 'fixed' }}>
                      <tbody>
                        <tr style={{ paddingRight: 20, borderBottom: '1px solid #dfdfdf' }}>
                          <td colSpan="84" style={{ paddingBottom: 10, width: '100%' }}>
                            <strong style={{ paddingRight: 14 }}>输入手机号</strong>{basicInfo.mobile}
                            {
                              tbMobRiskMatch.result === '0'
                              ? <span className="valid ml_20 phoneLine after"><Icon type="check-circle" theme="filled" />未命中风险清单</span>
                              : tbMobRiskMatch.result === '1'
                                ? <span className="unvalid ml_20 phoneLine after"><Icon type="close-circle" theme="filled" />命中风险清单</span>
                                : <span className="unknow ml_20 phoneLine after"><Icon type="info-circle" theme="filled" />风险清单未知</span>
                            }
                            <span className="ml_10">{tbMobArea.resultDesc}</span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="56" style={{ paddingTop: 12 }}>
                            绑定手机号{
                              tbBindMobMatch.result === '3'
                                ? <span className="valid ml_20"><Icon type="check-circle" theme="filled" />模糊匹配成功</span>
                                : tbBindMobMatch.result === '4'
                                  ? <span className="unvalid ml_20"><Icon type="close-circle" theme="filled" />模糊匹配失败</span>
                                  : <span className="unknow ml_20"><Icon type="info-circle" theme="filled" />匹配结果未知</span>
                            }
                          </td>
                          <td colSpan="28" className="col_999" style={{ paddingTop: 12 }}>
                            绑定手机号 : <span className="col_333">{basicInfo.cMobile}</span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="56">默认地址收货电话
                            {
                              tbAddrMobMatch.result === '1'
                                ? <span className="valid ml_20 phoneLine after"><Icon type="check-circle" theme="filled" />匹配成功</span>
                                : tbAddrMobMatch.result === '3'
                                  ? <span className="valid ml_20 phoneLine after"><Icon type="check-circle" theme="filled" />模糊匹配成功</span>
                                  : tbAddrMobMatch.result === '0'
                                    ? <span className="unvalid ml_20 phoneLine after"><Icon type="close-circle" theme="filled" />匹配失败</span>
                                    : tbAddrMobMatch.result === '4'
                                      ? <span className="unvalid ml_20 phoneLine after"><Icon type="close-circle" theme="filled" />模糊匹配失败</span>
                                      : <span className="unknow ml_20 phoneLine after"><Icon type="info-circle" theme="filled" />匹配结果未知</span>
                            }
                            {
                              tbAddrMobRiskMatch.result === '0'
                                ? <span className="valid ml_20 phoneLine after"><Icon type="check-circle" theme="filled" />未命中风险清单</span>
                                : tbAddrMobRiskMatch.result === '1'
                                  ? <span className="unvalid ml_20 phoneLine after"><Icon type="close-circle" theme="filled" />命中风险清单</span>
                                  : <span className="unknow ml_20 phoneLine after"><Icon type="info-circle" theme="filled" />风险情况未知</span>
                            }
                            <span className="ml_10">{tbAddrMobArea.resultDesc}</span>
                          </td>
                          <td colSpan="28" className="col_999">
                            默认地址收货电话 : <span className="col_333">{basicInfo.defAddMobile}</span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="56">订单最多收货电话
                            {
                              tbMostAddrMobMatch.result === '1'
                                ? <span className="valid ml_20 phoneLine after"><Icon type="check-circle" theme="filled" />匹配成功</span>
                                : tbMostAddrMobMatch.result === '0'
                                  ? <span className="unvalid ml_20 phoneLine after"><Icon type="close-circle" theme="filled" />匹配失败</span>
                                  : <span className="unknow ml_20 phoneLine after"><Icon type="info-circle" theme="filled" />匹配结果未知</span>
                            }
                            {
                              tbMostAddrMobRiskMatch.result === '0'
                                ? <span className="valid ml_20 phoneLine after"><Icon type="check-circle" theme="filled" />未命中风险清单</span>
                                : tbMostAddrMobRiskMatch.result === '1'
                                  ? <span className="unvalid ml_20 phoneLine after"><Icon type="close-circle" theme="filled" />命中风险清单</span>
                                  : <span className="unknow ml_20 phoneLine after"><Icon type="info-circle" theme="filled" />风险情况未知</span>
                            }
                            <span className="ml_5">{tbMostAddrMobArea.resultDesc}</span>
                          </td>
                          <td colSpan="28" className="col_999">
                            订单最多收货电话 : <span className="col_333">{basicInfo.recOrderMobile}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
          <Card className="zfb-card" style={{ marginTop: 16 }} title="支付宝信息">
            {zfbInfos && zfbInfos.length ? zfbInfos.map((z, i) => (
              <div>
                <p className="table-title">支付宝信息</p>
                <table key={i} className="outer-table-wrapper" border="0" cellSpacing="0" cellPadding="0">
                  <tbody>
                    <tr>
                      <th colSpan="16">支付宝账号</th>
                      <td colSpan="34">{z.username}</td>
                      <th colSpan="16">绑定手机</th>
                      <td colSpan="34">{z.mobile}</td>
                    </tr>
                    <tr>
                      <th colSpan="16">绑定邮箱</th>
                      <td colSpan="34">{z.email}</td>
                      <th colSpan="16">实名认证状态</th>
                      <td colSpan="34">{z.identityStatus}</td>
                    </tr>
                    <tr>
                      <th colSpan="16">实名认证姓名</th>
                      <td colSpan="34">{z.realName}</td>
                      <th colSpan="16">实名认证身份证号</th>
                      <td colSpan="34">{z.identityNo}</td>
                    </tr>
                    <tr>
                      <th colSpan="16">账户余额</th>
                      <td colSpan="34">{z.accBal} 元</td>
                      <th colSpan="16">余额宝余额</th>
                      <td colSpan="34">{z.yuebaoBal} 元</td>
                    </tr>
                    <tr>
                      <th colSpan="16" style={{ paddingRight: 0 }}>余额宝历史累计收益</th>
                      <td colSpan="34">{z.yuebaoHisIncome} 元</td>
                      <th colSpan="16">花呗信用额度</th>
                      <td colSpan="34">{z.huabeiLimit} 元</td>
                    </tr>
                    <tr>
                      <th colSpan="16">花呗剩余额度</th>
                      <td colSpan="84">{z.huabeiAvailableLimit} 元</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )) : null}
          </Card>
          <Card style={{ marginTop: 16 }} title="用户画像">
            <div>
              <p className="table-title">购物行为</p>
              <table style={{ width: '100%' }} border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'center', padding: '26px 0 20px 0' }}>
                      <span className="fs_14">购物频率</span>
                      <div className="fs_20 col_green" style={{ marginTop: 2 }}>{personas.buyRate}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 16 }}>
              <p className="table-title">收货地域</p>
              <table className="outer-table-wrapper" border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                  <tr>
                    <td colSpan="100" style={{ textAlign: 'center', padding: '26px 0 20px 0' }}>
                      <span className="fs_14">消费最多城市</span>
                      <div className="fs_20 col_green" style={{ marginTop: 2 }}>{personas.consumeMostCity.consumeCity}</div>
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="16">消费金额</th>
                    <td colSpan="34">{personas.consumeMostCity.consumeMoney} 元</td>
                    <th colSpan="16">占总消费金额比重</th>
                    <td colSpan="34">{personas.consumeMostCity.consumeMoneyPro}%</td>
                  </tr>
                  <tr>
                    <th colSpan="16">消费笔数</th>
                    <td colSpan="34">{personas.consumeMostCity.consumeCounts} 笔</td>
                    <th colSpan="16">占总笔数</th>
                    <td colSpan="34">{personas.consumeMostCity.consumeCountsPro}%</td>
                  </tr>
                  <tr>
                    <th colSpan="16">消费时间范围</th>
                    <td colSpan="34">{personas.consumeMostCity.firstOrderTime} 至 {personas.consumeMostCity.lastOrderTime}</td>
                    <th colSpan="16">该城市居住时长</th>
                    <td colSpan="34">{personas.consumeMostCity.liveTime}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 16 }}>
              <p className="table-title">活跃时间段分析</p>
              <table className="outer-table-wrapper border_right_none table_hover" style={{ borderRight: '1px solid #dfdfdf' }} cellSpacing="0" cellPadding="0">
                <tbody>
                  <tr>
                    <th colSpan="14">时间段</th>
                    <th colSpan="10">订单总数</th>
                    <th colSpan="10">总数占比</th>
                    <th colSpan="10">订单总额</th>
                    <th colSpan="10">总额占比</th>
                    <th colSpan="46">使用最多的收货地址</th>
                  </tr>
                  {personas.activeTimes && personas.activeTimes.length
                    ? personas.activeTimes.map((act, i) => (
                        <tr key={i}>
                          <td colSpan="14">{act.desc}</td>
                          <td colSpan="10">{act.orderSum}</td>
                          <td colSpan="10">{act.sumPro}</td>
                          <td colSpan="10">{act.sumMoneyPro}</td>
                          <td colSpan="10">{act.sumMoneyPro}</td>
                          <td colSpan="46" className="overflow" title={act.receiveAddress}>{act.receiveAddress}</td>
                        </tr>
                      )) : null}
                </tbody>
              </table>
            </div>
          </Card>
          <Card style={{ marginTop: 16 }} title="消费信息">
            <div>
              <p className="table-title">消费概要</p>
              <table className="outer-table-wrapper message_table border_right_none" cellSpacing="0" cellPadding="0">
                <tbody>
                  <tr>
                    <td colSpan="25">
                      <span>消费总额</span>
                      <div className="fs_20 col_green" style={{ marginTop: 5 }}>{consumeInfo.sumConsume}</div>
                    </td>
                    <td colSpan="25">
                      <span>消费总笔数</span>
                      <div className="fs_20 col_green" style={{ marginTop: 5 }}>{consumeInfo.sumConsumeCounts}</div>
                    </td>
                    <td colSpan="25">
                      <span>最大单笔消费额</span>
                      <div className="fs_20 col_green" style={{ marginTop: 5 }}>{consumeInfo.maxSingleConsumption}</div>
                    </td>
                    <td colSpan="25">
                      <span>平均每笔消费</span>
                      <div className="fs_20 col_green" style={{ marginTop: 5 }}>{consumeInfo.avgCountConsumeMoney}</div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="25">
                      <span>实物消费总金额</span>
                      <div className="fs_20" style={{ marginTop: 5 }}>{consumeInfo.sumRelConsumeMoney}</div>
                    </td>
                    <td colSpan="25">
                      <span>实物消费总笔数</span>
                      <div className="fs_20" style={{ marginTop: 5 }}>{consumeInfo.sumRelConsumeCounts}</div>
                    </td>
                    <td colSpan="50">
                      <span>实物消费占比</span>
                      <div className="fs_20" style={{ marginTop: 5 }}>{consumeInfo.relConsumeProTo}</div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="25">
                      <span>虚拟消费总金额</span>
                      <div className="fs_20" style={{ marginTop: 5 }}>{consumeInfo.sumFicConsumeMoney}</div>
                    </td>
                    <td colSpan="25">
                      <span>虚拟消费总笔数</span>
                      <div className="fs_20" style={{ marginTop: 5 }}>{consumeInfo.sumFicConsumeCounts}</div>
                    </td>
                    <td colSpan="50">
                      <span>虚拟消费占比</span>
                      <div className="fs_20" style={{ marginTop: 5 }}>{consumeInfo.ficConsumeProTo}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 16 }}>
              <p className="table-title">消费信息</p>
              <table className="outer-table-wrapper border_right_none" style={{ borderRight: '1px solid #dfdfdf' }} cellSpacing="0" cellPadding="0">
                <tbody>
                  <tr>
                    <th colSpan="12">月份</th>
                    <th colSpan="10">消费<br/>总额</th>
                    <th colSpan="8">消费<br/>笔数</th>
                    <th colSpan="10">最大单笔<br/>消费额</th>
                    <th colSpan="10">平均每笔<br/>消费额</th>
                    <th colSpan="10">实物<br/>消费金额</th>
                    <th colSpan="10">实物<br/>消费笔数</th>
                    <th colSpan="10">虚拟<br/>消费金额</th>
                    <th colSpan="10">虚拟<br/>消费笔数</th>
                    <th colSpan="10">虚拟<br/>消费占比</th>
                  </tr>
                  {consumeInfo.consumeMonths && consumeInfo.consumeMonths.length
                    ? consumeInfo.consumeMonths.map((c, i) => (
                        <tr key={i}>
                          <td colSpan="12">{c.desc}</td>
                          <td colSpan="10">{c.consumeSum}</td>
                          <td colSpan="8">{c.consumeCounts}</td>
                          <td colSpan="10">{c.consumeCounts}</td>
                          <td colSpan="10">{c.avgConsume}</td>
                          <td colSpan="10">{c.relConsumeMoney}</td>
                          <td colSpan="10">{c.relConsumeCounts}</td>
                          <td colSpan="10">{c.maxConsumeMoney}</td>
                          <td colSpan="10">{c.ficConsumeCounts}</td>
                          <td colSpan="10">{c.ficConsumePro}</td>
                        </tr>
                      )) : null}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 16 }}>
              <p className="table-title">消费金额分布</p>
              <table style={{ borderRight: '1px solid #dfdfdf' }} cellSpacing="0" cellPadding="0" className="outer-table-wrapper border_right_none">
                <tbody>
                  <tr>
                    <th colSpan="12">金额区间</th>
                    <th colSpan="8">总笔数</th>
                    <th colSpan="10">总金额</th>
                    <th colSpan="10">订单笔数占比</th>
                    <th colSpan="10">实物消费笔数</th>
                    <th colSpan="10">实物消费金额</th>
                    <th colSpan="10">虚拟消费笔数</th>
                    <th colSpan="12">虚拟消费金额</th>
                  </tr>
                  {consumeMoneyDis && consumeMoneyDis.length ? consumeMoneyDis.map((c, i) => (
                    <tr key={i}>
                      <td colSpan="12">{c.desc}</td>
                      <td colSpan="8">{c.sumCounts}</td>
                      <td colSpan="10">{c.sumCounts}</td>
                      <td colSpan="10">{c.orderPro}</td>
                      <td colSpan="10">{c.relConsumeCounts}</td>
                      <td colSpan="10">{c.relConsumeMoney}</td>
                      <td colSpan="10">{c.ficConsumeCounts}</td>
                      <td colSpan="12">{c.ficConsumeMoney}</td>
                    </tr>
                  )) : null}
                </tbody>
              </table>
            </div>
          </Card>
          <Card style={{ marginTop: 16 }} title="地址信息">
            <p className="table-title">地址信息</p>
            {
              recAddInfos && recAddInfos.length ? recAddInfos.map((v, i) => (
                <table key={i} className="outer-table-wrapper message_table border_right_none" border="0" cellSpacing="0" cellPadding="0" style={{ borderRight: '1px solid #dfdfdf', borderLeft: '1px solid #dfdfdf' }}>
                  <tbody>
                    <tr>
                      <td colSpan="100" style={{ textAlign: 'center', padding: '20px 0 20px 0', background: '#f2f3f5' }}>
                        <span className="fs_14">收货地址-{i + 1}</span>
                        <div className="fs_20" style={{ marginTop: 5, position: 'relative' }}>{v.receiveAddress}</div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="25">
                        <span className="col_999">地址出现次数</span>
                        <div className="fs_20 col_green" style={{ marginTop: 5 }}>{v.addCounts}</div>
                      </td>
                      <td colSpan="25">
                        <span className="col_999">消费金额</span>
                        <div className="fs_20 col_green" style={{ marginTop: 5 }}>{v.monetary}</div>
                      </td>
                      <td colSpan="50">
                        <span className="col_999">消费金额占比</span>
                        <div className="fs_20 col_green" style={{ marginTop: 5 }}>{v.monetaryPro}</div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="25">
                        <span className="col_999">收货人</span>
                        <div className="fs_20" style={{ marginTop: 5 }}>{v.receiveName}</div>
                      </td>
                      <td colSpan="25">
                        <span className="col_999">收货人电话</span>
                        <div className="fs_20" style={{ marginTop: 5 }}>{v.receiveMobile}</div>
                      </td>
                      <td colSpan="25">
                        <span className="col_999">是否命中风险清单</span>
                        <div className="fs_20" style={{ marginTop: 5 }}>{
                          v.isHitRiskList === '0' ? '否' : v.isHitRiskList === '1' ? '是' : '未知'
                        }</div>
                      </td>
                      <td colSpan="25">
                        <span className="col_999">收货人电话归属地</span>
                        <div className="fs_20" style={{ marginTop: 5 }}>{v.receiveMobileCity}</div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="25" style={{ borderBottom: 'none', paddingTop: 16 }}>
                        <span className="col_999">地址类型</span>
                        <div style={{ marginTop: 5 }}>{v.addressType}</div>
                      </td>
                      <td colSpan="25" style={{ borderBottom: 'none', paddingTop: 16 }}>
                        <span className="col_999">楼宇/小区名称</span>
                        <div style={{ marginTop: 5 }}>{v.name}</div>
                      </td>
                      <td colSpan="50" style={{ borderBottom: 'none', paddingTop: 16 }}>
                        <span className="col_999">物业电话</span>
                        <div style={{ marginTop: 5 }}>{v.tel || '--'}</div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="25" style={{ paddingBottom: 20 }}>
                        <span className="col_999">地址经纬度</span>
                        <div style={{ marginTop: 5 }}>{v.location}</div>
                      </td>
                      <td colSpan="25" style={{ paddingBottom: 20 }}>
                        <span className="col_999">最近下单时间</span>
                        <div style={{ marginTop: 5 }}>{v.lastOrderTime}</div>
                      </td>
                      <td colSpan="50" style={{ paddingBottom: 20 }}>
                        <span className="col_999">近一年最早下单时间</span>
                        <div style={{ marginTop: 5 }}>{v.firstOrderTime}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )) : null
            }
          </Card>
          <p className="fs_14 col_999 mt_30">备注：</p>
          <p className="fs_14 col_999 mt_14">1.淘宝数据拉取用户1年内订单，最多1500笔。</p>
          <p className="fs_14 col_999 mt_14">2.虚拟消费除购买非实物商品外，还包括机票、酒店、电影票外卖等消费。</p>
          <p className="fs_14 col_999 mt_14">3.电话风险清单通过校验负面信息数据库中各类风险数据，提升客户管控效率，降低违约风险。</p>
        </div>
      </Spin>
    );
  }
}
