import React from 'react';
import { Spin, Card, Icon } from 'antd';
import { getCreditReport } from 'api/biz';
import { showWarnMsg } from 'common/js/util';
import '../index.css';

export default class MobileCheckReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      /* 控制风险通话检测详细列表是否显示start */
      c110Show: false,
      c120Show: false,
      macaoShow: false,
      courtShow: false,
      lawyerShow: false,
      agencyShow: false,
      loadShow: false,
      bankShow: false,
      /* 控制风险通话检测详细列表是否显示end */
      // 基本信息
      basicInfo: {},
      // 紧急联系人信息
      contactInfo: [],
      // 基本信息检测
      basicInfoCheck: [],
      // 关联信息
      relationInfo: {},
      // 用户画像
      personas: {
        // 风险概况
        riskProfile: {},
        // 社交概况
        socialContactProfile: {},
        // 通话概况
        callProfile: {},
        // 消费概况
        consumptionProfile: {}
      },
      // 风险清单检测
      riskListCheck: [],
      // 信贷逾期检查
      overdueLoanCheck: [],
      // 多头借贷检查
      multiLendCheck: [],
      // 风险通话检测
      riskCallCheck: [],
      // 通话概况
      callAnalysis: {},
      // 活跃情况
      activeCallAnalysis: [],
      // 静默情况
      silenceAnalysis: {},
      // 通话时间段分析
      callDurationAnalysis: [],
      // 消费能力
      consumptionAnalysis: [],
      // 出行信息
      tripAnalysis: [],
      // 社交关系概况
      socialContactAnalysis: [],
      // 通话区域分析
      callAreaAnalysis: [],
      // 通话联系人分析
      contactAnalysis: []
    };
    this.idcard = '14272719950821351X';
  }
  componentDidMount() {
    getCreditReport('mobileReportTask', this.idcard).then((data) => {
      if (!data.result) {
        showWarnMsg('未获取到运营商报告');
        this.setState({ fetching: false });
        return;
      }
      let report = JSON.parse(data.result).data;
      this.setState({
        fetching: false,
        basicInfo: report.basicInfo,
        contactInfo: report.contactInfo,
        basicInfoCheck: report.basicInfoCheck,
        relationInfo: report.relationInfo,
        personas: report.personas,
        riskListCheck: report.riskListCheck,
        overdueLoanCheck: report.overdueLoanCheck,
        multiLendCheck: report.multiLendCheck,
        riskCallCheck: report.riskCallCheck,
        callAnalysis: report.callAnalysis,
        activeCallAnalysis: report.activeCallAnalysis,
        silenceAnalysis: report.silenceAnalysis,
        callDurationAnalysis: report.callDurationAnalysis,
        consumptionAnalysis: report.consumptionAnalysis,
        tripAnalysis: report.tripAnalysis,
        socialContactAnalysis: report.socialContactAnalysis,
        callAreaAnalysis: report.callAreaAnalysis,
        contactAnalysis: report.contactAnalysis
      });
    }).catch(() => this.setState({ fetching: false }));
  }
  // 根据key从匹配项中查询匹配项
  findInBasicCheck(key) {
    const { basicInfoCheck } = this.state;
    if (basicInfoCheck && basicInfoCheck.length) {
      for (let i = 0; i < basicInfoCheck.length; i++) {
        if (basicInfoCheck[i].item === key) {
          return basicInfoCheck[i];
        }
      }
    }
    return {};
  }
  // 根据key从风险通话检测中查询匹配项
  findInRiskCallCheck(key) {
    const { riskCallCheck } = this.state;
    if (riskCallCheck && riskCallCheck.length) {
      for (let i = 0; i < riskCallCheck.length; i++) {
        if (riskCallCheck[i].item === key) {
          return riskCallCheck[i];
        }
      }
    }
    return {};
  }
  // 根据key从社交关系概况中查询匹配项
  findInSocialContact(key) {
    const { socialContactAnalysis } = this.state;
    if (socialContactAnalysis && socialContactAnalysis.length) {
      for (let i = 0; i < socialContactAnalysis.length; i++) {
        if (socialContactAnalysis[i].item === key) {
          return socialContactAnalysis[i];
        }
      }
    }
    return {};
  }
  render() {
    const { fetching, basicInfo, contactInfo, relationInfo, riskListCheck,
      personas, overdueLoanCheck, multiLendCheck, riskCallCheck, c110Show,
      c120Show, macaoShow, courtShow, lawyerShow, agencyShow, loadShow,
      bankShow, creditShow, callAnalysis, activeCallAnalysis, silenceAnalysis,
      callDurationAnalysis, consumptionAnalysis, tripAnalysis, socialContactAnalysis,
      callAreaAnalysis, contactAnalysis } = this.state;
    const mobCheck = this.findInBasicCheck('mobile_check');
    const nameMatch = this.findInBasicCheck('name_match');
    const idcardMatch = this.findInBasicCheck('idcard_match');
    const call110Match = this.findInRiskCallCheck('110');
    const call120Match = this.findInRiskCallCheck('120');
    const callMacaoMatch = this.findInRiskCallCheck('macao');
    const callCourtMatch = this.findInRiskCallCheck('court');
    const callLawyerMatch = this.findInRiskCallCheck('lawyer');
    const callAgencyMatch = this.findInRiskCallCheck('agency');
    const callLoadMatch = this.findInRiskCallCheck('load');
    const callBankMatch = this.findInRiskCallCheck('bank');
    const callCreditMatch = this.findInRiskCallCheck('credit');
    const callNumCnt = this.findInSocialContact('call_num_cnt');
    const interflowContactCnt = this.findInSocialContact('interflow_contact_cnt');
    const friendContactCnt = this.findInSocialContact('friend_circle_contact_cnt');
    const friendCity = this.findInSocialContact('friend_circle_city');
    return (
      <Spin spinning={fetching}>
        <div className="credit-report-wrapper">
          <Card title="身份特征">
            <div>
              <p className="table-title">基本信息</p>
              <table className="outer-table-wrapper" border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                  <tr>
                    <th colSpan="16">姓名</th>
                    <td colSpan="18">{basicInfo.name}</td>
                    <th colSpan="15">性别</th>
                    <td colSpan="18">{basicInfo.gender}</td>
                    <th colSpan="15">年龄</th>
                    <td colSpan="18">{basicInfo.age}</td>
                  </tr>
                  <tr>
                    <th colSpan="16">地址</th>
                    <td colSpan="84">{basicInfo.nativeAddress}</td>
                  </tr>
                  <tr>
                    <th colSpan="16">身份证号</th>
                    <td colSpan="84">
                      <table border="0" cellSpacing="0" cellPadding="0" width="100%" className="child_table" style={{ tableLayout: 'fixed' }}>
                        <tbody>
                          <tr>
                            <td>{basicInfo.identityNo}</td>
                          </tr>
                          <tr>
                            <td>身份证号是否命中风险清单
                              <span className="valid ml_20"><Icon type="check-circle" theme="filled" />未命中</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="16">手机号</th>
                    <td colSpan="84">
                      <table border="0" cellSpacing="0" cellPadding="0" width="100%" className="child_table" style={{ tableLayout: 'fixed' }}>
                        <tbody>
                          <tr style={{ position: 'relative' }}>
                            <td colSpan="3">{basicInfo.mobile}
                              {
                                mobCheck.result === '1'
                                ? <span className="valid ml_20"><Icon type="check-circle" theme="filled" />已实名认证</span>
                                : <span className="unvalid ml_20"><Icon type="close-circle" theme="filled" />未实名认证</span>
                              }
                            </td>
                            <td colSpan="2">
                              <span className="ml_10">入网时间</span>
                              <span className="ml_10">{basicInfo.regTime ? basicInfo.regTime.substr(0, 10) : ''}</span>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="5">手机号是否命中风险清单
                              <span className="valid ml_20"><Icon type="check-circle" theme="filled" />未命中</span>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="5">姓名与运营商数据是否匹配
                              {
                                nameMatch.result === '1'
                                  ? <span className="valid ml_20"><Icon type="check-circle" theme="filled" />匹配成功</span>
                                  : nameMatch.result === '2'
                                    ? <span className="valid ml_20"><Icon type="check-circle" theme="filled" />模糊匹配成功</span>
                                    : nameMatch.result === '0'
                                      ? <span className="unvalid ml_20"><Icon type="close-circle" theme="filled" />{nameMatch.resultDesc}</span>
                                      : <span className="unknow ml_20"><Icon type="check-circle" theme="filled" />未知</span>
                              }
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="5">身份证号与运营商数据是否匹配
                              {
                                idcardMatch.result === '1'
                                  ? <span className="valid ml_20"><Icon type="check-circle" theme="filled" />匹配成功</span>
                                  : idcardMatch.result === '2'
                                    ? <span className="valid ml_20"><Icon type="check-circle" theme="filled" />模糊匹配成功</span>
                                    : idcardMatch.result === '0'
                                      ? <span className="unvalid ml_20"><Icon type="close-circle" theme="filled" />{nameMatch.resultDesc}</span>
                                      : <span className="unknow ml_20"><Icon type="check-circle" theme="filled" />未知</span>
                              }
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="16">紧急联系人</th>
                    <td colSpan="84">
                      <table border="0" cellSpacing="0" cellPadding="0" width="100%" className="child_table mt_14" style={{ tableLayout: 'fixed', marginTop: 0 }}>
                        {
                          contactInfo && contactInfo.length ? (
                            <tbody>
                              <tr>
                                <th colSpan="16">姓名</th>
                                <th colSpan="16">手机号</th>
                                <th colSpan="20">身份证号</th>
                                <th colSpan="10">与本人关系</th>
                                <th colSpan="8">通话次数</th>
                                <th colSpan="10">通话时长(s)</th>
                                <th colSpan="10">通话频度排名</th>
                                <th colSpan="16">是否命中风险清单</th>
                              </tr>
                              {contactInfo.map((c, i) => (
                                <tr key={i}>
                                  <td colSpan="16">{c.name}</td>
                                  <td colSpan="16">{c.mobile}</td>
                                  <td colSpan="20">{c.identityNo}</td>
                                  <td colSpan="10">{c.relationship}</td>
                                  <td colSpan="8">{c.callCnt}</td>
                                  <td colSpan="10">{c.callTime}</td>
                                  <td colSpan="10">{c.callRank}</td>
                                  <td colSpan="16">{c.isHitRiskList === '0' ? '否' : c.isHitRiskList === '1' ? '是' : '未知'}</td>
                                </tr>
                              ))}
                            </tbody>
                          ) : (
                            <tbody><tr><td>无相关数据</td></tr></tbody>
                          )
                        }
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 16 }}>
              <p className="table-title">关联信息</p>
              <table border="0" cellSpacing="0" cellPadding="0" className="outer-table-wrapper">
                <tbody>
                  <tr>
                    <th colSpan="16">手机号关联的<br/>身份证号</th>
                    <td colSpan="84">
                      {
                        relationInfo.identiyNos && relationInfo.identiyNos.length
                          ? relationInfo.identiyNos.map((v, i) => <div key={i}>{v}</div>)
                          : '无相关数据'
                      }
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="16">身份证号关联的<br/>手机号</th>
                    <td colSpan="84">
                      {
                        relationInfo.mobiles && relationInfo.mobiles.length
                          ? relationInfo.mobiles.map((v, i) => <div key={i}>{v}</div>)
                          : '无相关数据'
                      }
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="16">身份证号关联的<br/>家庭地址</th>
                    <td colSpan="84">
                      {
                        relationInfo.homeAddresses && relationInfo.homeAddresses.length
                          ? relationInfo.homeAddresses.map((v, i) => <div key={i}>{v}</div>)
                          : '无相关数据'
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 16 }}>
              <p className="table-title">用户画像</p>
              <table border="0" cellSpacing="0" cellPadding="0" className="outer-table-wrapper">
                <tbody>
                  <tr>
                    <th colSpan="16" rowSpan="4" style={{ paddingTop: 0, paddingBottom: 0, verticalAlign: 'middle' }}>风险情况</th>
                    <td colSpan="84">
                      <table border="0" cellSpacing="0" cellPadding="0" width="100%" style={{ tableLayout: 'fixed' }}>
                        <tbody>
                          <tr>
                            <td colSpan="2">风险清单</td>
                            <td colSpan="3" className="col_999">
                              <span className="fs_16 col_000">{personas.riskProfile.riskListCnt}</span>&nbsp;&nbsp;次
                            </td>
                            <td colSpan="5" className="col_999">本人身份证号、手机号命中风险清单总次数</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="84">
                      <table border="0" cellSpacing="0" cellPadding="0" width="100%" style={{ tableLayout: 'fixed' }}>
                        <tbody>
                          <tr>
                            <td colSpan="2">信贷逾期</td>
                            <td colSpan="3" className="col_999">
                              <span className="fs_16 col_000">{personas.riskProfile.overdueLoanCnt}</span>&nbsp;&nbsp;次
                            </td>
                            <td colSpan="5" className="col_999">本人身份证或手机号命中信贷逾期的情况</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="84">
                      <table border="0" cellSpacing="0" cellPadding="0" width="100%" style={{ tableLayout: 'fixed' }}>
                        <tbody>
                          <tr>
                            <td colSpan="2">多头借贷</td>
                            <td colSpan="3" className="col_999">
                              <span className="fs_16 col_red">{personas.riskProfile.multiLendCnt}</span>&nbsp;&nbsp;次
                            </td>
                            <td colSpan="5" className="col_999">本人身份证或手机号命中多平台借贷申请情况</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="84">
                      <table border="0" cellSpacing="0" cellPadding="0" width="100%" style={{ tableLayout: 'fixed' }}>
                        <tbody>
                          <tr>
                            <td colSpan="2">风险通话</td>
                            <td colSpan="3" className="col_999">
                              <span className="fs_16 col_red">{personas.riskProfile.riskCallCnt}</span>&nbsp;&nbsp;次
                            </td>
                            <td colSpan="5" className="col_999">本手机号与网贷、110等电话联系次数统计</td>
                          </tr>
                        </tbody></table>
                      </td>
                    </tr>
                    <tr>
                      <th colSpan="16" rowSpan="4" style={{ paddingTop: 0, paddingBottom: 0, verticalAlign: 'middle' }}>社交情况</th>
                      <td colSpan="84">
                        <table border="0" cellSpacing="0" cellPadding="0" width="100%" style={{ tableLayout: 'fixed' }}>
                          <tbody>
                            <tr>
                              <td colSpan="2">最常联系区域</td>
                              <td colSpan="3" className="fs_16">{personas.socialContactProfile.freContactArea || '--'}</td>
                              <td colSpan="5" className="col_999">180天内与本人手机通话次数按区域分前3位</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="84">
                        <table border="0" cellSpacing="0" cellPadding="0" width="100%" style={{ tableLayout: 'fixed' }}>
                          <tbody>
                            <tr>
                              <td colSpan="2">联系人号码总数</td>
                              <td colSpan="3" className="col_999">
                                <span className="fs_16 col_333">{personas.socialContactProfile.contactNumCnt}</span>&nbsp;&nbsp;个
                              </td>
                              <td colSpan="5" className="col_999">180天内与本人手机通话的号码总数</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="84">
                        <table border="0" cellSpacing="0" cellPadding="0" width="100%" style={{ tableLayout: 'fixed' }}>
                          <tbody>
                            <tr>
                              <td colSpan="2">互通号码总数</td>
                              <td colSpan="3" className="col_999">
                                <span className="fs_16 col_333">{personas.socialContactProfile.interflowContactCnt}</span>&nbsp;&nbsp;个
                              </td>
                              <td colSpan="5" className="col_999">180天内与本人手机相互通过话的号码总数</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="84">
                        <table border="0" cellSpacing="0" cellPadding="0" width="100%" style={{ tableLayout: 'fixed' }}>
                          <tbody>
                            <tr>
                              <td colSpan="2">联系人风险名单总数</td>
                              <td colSpan="3" className="col_999">
                                <span className="fs_16 col_333">{personas.socialContactProfile.contactRishCnt}</span>&nbsp;&nbsp;个
                              </td>
                              <td colSpan="5" className="col_999">180天内与本人手机号通话的号码命中风险名单的总数</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <th colSpan="16" rowSpan="4" style={{ paddingTop: 0, paddingBottom: 0, verticalAlign: 'middle' }}>通话情况</th>
                      <td colSpan="84">
                        <table border="0" cellSpacing="0" cellPadding="0" width="100%" style={{ tableLayout: 'fixed' }}>
                          <tbody>
                            <tr>
                              <td colSpan="2">日均通话次数</td>
                              <td colSpan="3" className="col_999">
                                <span className="fs_16 col_333">{personas.callProfile.avgCallCnt}</span>&nbsp;&nbsp;次
                              </td>
                              <td colSpan="5" className="col_999">180天内总通话次数按日平均</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="84">
                        <table border="0" cellSpacing="0" cellPadding="0" width="100%" style={{ tableLayout: 'fixed' }}>
                          <tbody>
                            <tr>
                              <td colSpan="2">日均通话时长</td>
                              <td colSpan="3" className="col_999">
                                <span className="fs_16 col_333">{personas.callProfile.avgCallTime}</span>&nbsp;&nbsp;分钟
                              </td>
                              <td colSpan="5" className="col_999">180天内总通话时长按日平均</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="84">
                        <table border="0" cellSpacing="0" cellPadding="0" width="100%" style={{ tableLayout: 'fixed' }}>
                          <tbody>
                            <tr>
                              <td colSpan="2">手机静默次数</td>
                              <td colSpan="3" className="col_999">
                                <span className="fs_16 col_red">{personas.callProfile.silenceCnt}</span>&nbsp;&nbsp;次
                              </td>
                              <td colSpan="5" className="col_999">180天内超过24小时持续无通话无短信的总次数</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="84">
                        <table border="0" cellSpacing="0" cellPadding="0" width="100%" style={{ tableLayout: 'fixed' }}>
                          <tbody>
                            <tr>
                              <td colSpan="2">
                                <p>夜间通话次数</p>
                                <p>平均时长</p>
                              </td>
                              <td colSpan="3" className="col_999">
                                <p>
                                  <span className="fs_16 col_red">{personas.callProfile.nightCallCnt}</span>&nbsp;&nbsp;次
                                </p>
                                <p>
                                  <span className="fs_16 col_red">{personas.callProfile.nightCallTime}</span>&nbsp;&nbsp;分钟
                                </p>
                              </td>
                              <td colSpan="5" className="col_999">统计23:30-5:30的通话次数和平均时长（按次平均）</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <th colSpan="16" style={{ paddingTop: 0, paddingBottom: 0, verticalAlign: 'middle' }}>消费情况</th>
                      <td colSpan="84">
                        <table border="0" cellSpacing="0" cellPadding="0" width="100%" style={{ tableLayout: 'fixed' }}>
                          <tbody>
                            <tr>
                              <td colSpan="2">月均消费</td>
                              <td colSpan="3" className="col_999">
                                <span className="fs_16 col_333">{personas.consumptionProfile.avgFeeMonth}</span>&nbsp;&nbsp;元
                              </td>
                              <td colSpan="5" className="col_999">6个月内总消费按月平均</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </Card>
          <Card title="风险检测" style={{ marginTop: 16 }}>
            <div>
              <p className="table-title">风险清单检测</p>
              <table border="0" cellSpacing="0" cellPadding="0" className="outer-table-wrapper">
                <tbody>
                  <tr>
                    <td colSpan="26">项目</td>
                    <td colSpan="74">命中次数</td>
                  </tr>
                  {
                    riskListCheck && riskListCheck.length ? riskListCheck.map((v, i) => (
                      <tr key={i}>
                        <th colSpan="26" rowSpan="1" style={{ paddingTop: 0, paddingBottom: 0, verticalAlign: 'middle' }}>{v.desc}</th>
                        <td colSpan="74">{v.result === '0' ? '未命中' : '命中'}</td>
                      </tr>
                    )) : null
                  }
                </tbody>
              </table>
              {!riskListCheck || !riskListCheck.length ? <div className="report-none-data">无相关数据</div> : null}
            </div>
            <div style={{ marginTop: 16 }}>
              <p className="table-title">信贷逾期</p>
              <table border="0" cellSpacing="0" cellPadding="0" className="outer-table-wrapper">
                <tbody>
                  <tr>
                    <td colSpan="26">项目</td>
                    <td colSpan="74">命中次数</td>
                  </tr>
                  {
                    overdueLoanCheck && overdueLoanCheck.length ? overdueLoanCheck.map((v, i) => (
                      <tr key={i}>
                        <th colSpan="26" rowSpan="1" style={{ paddingTop: 0, paddingBottom: 0, verticalAlign: 'middle' }}>{v.desc}</th>
                        <td colSpan="74">
                          {
                            <table border="0" cellSpacing="0" cellPadding="0" className="outer-table-wrapper">
                              <tbody>
                                <tr>
                                  <th>逾期金额</th>
                                  <th>逾期天数</th>
                                  <th>逾期时间</th>
                                </tr>
                                {
                                  v.details.length ? v.details.map((d, i) => (
                                    <tr>
                                      <td>{d.overdueAmt}</td>
                                      <td>{d.overdueDays}</td>
                                      <td>{d.overdueTime.substr(0, 7)}</td>
                                    </tr>
                                  )) : null
                                }
                              </tbody>
                            </table>
                          }
                        </td>
                      </tr>
                    )) : null
                  }
                </tbody>
              </table>
              {!overdueLoanCheck || !overdueLoanCheck.length ? <div className="report-none-data">无相关数据</div> : null}
            </div>
            <div style={{ marginTop: 16 }}>
              <p className="table-title">多头借贷</p>
              <table border="0" cellSpacing="0" cellPadding="0" className="outer-table-wrapper">
                <tbody>
                  <tr>
                    <td colSpan="26">项目</td>
                    <td colSpan="74">命中次数</td>
                  </tr>
                  {
                    multiLendCheck && multiLendCheck.length ? multiLendCheck.map((v, i) => (
                      <tr key={i}>
                        <th colSpan="26" rowSpan="1" style={{ paddingTop: 0, paddingBottom: 0, verticalAlign: 'middle' }}>{v.desc}</th>
                        <td colSpan="74">
                          {
                            <table border="0" cellSpacing="0" cellPadding="0" className="outer-table-wrapper">
                              <tbody>
                                <tr>
                                  <th>借贷平台类型</th>
                                  <th>借贷次数</th>
                                </tr>
                                {
                                  v.details.length ? v.details.map((d, i) => (
                                    <tr key={i}>
                                      <td>{d.lendType}</td>
                                      <td>{d.lendCnt}</td>
                                    </tr>
                                  )) : null
                                }
                              </tbody>
                            </table>
                          }
                        </td>
                      </tr>
                    )) : null
                  }
                </tbody>
              </table>
              {!multiLendCheck || !multiLendCheck.length ? <div className="report-none-data">无相关数据</div> : null}
            </div>
            <div style={{ marginTop: 16 }}>
              <p className="table-title">风险通话检测</p>
              <table className="outer-table-wrapper" border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                  <tr>
                    <th colSpan="26">110电话</th>
                    <td colSpan="74">
                      {
                        call110Match.item ? (
                          <div>
                            <div>
                              <div className="dis_line" style="width: 286px;">{call110Match.hitDesc}</div>
                              <div className=" dis_line col_333">
                                通话 <span className="col_red">{call110Match.cnt}次</span>，时长 <span className="col_red">{(call110Match.duration / 60).toFixed(2)}分钟</span>
                              </div>
                              <a href="javascript:void(0);" onClick={() => this.setState({ c110Show: !c110Show })} className="fr a_line credit_toggleTable_a">
                                {c110Show ? '收起明细' : '展开明细'}
                              </a>
                            </div>
                            <div style={{ display: c110Show ? 'block' : 'none' }} className="credit_toggleTable">
                              <table border="0" cellSpacing="0" cellPadding="0">
                                <tbody>
                                  <tr>
                                    <th>通话标记</th>
                                    <th>通话类型</th>
                                    <th>通话次数</th>
                                    <th>通话时长</th>
                                  </tr>
                                  {
                                    call110Match.details.map((v, i) => (
                                      <tr key={i}>
                                        <td>{v.callTag}</td>
                                        <td>{v.callType}</td>
                                        <td>{v.callCnt}<span>次</span></td>
                                        <td>{(v.callTime / 60).toFixed(2)}<span>分钟</span></td>
                                      </tr>
                                    ))
                                  }
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ) : <div className="dis_line" style={{ width: 180 }}>无通话记录</div>
                      }
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="26">120电话</th>
                    <td colSpan="74">
                      {
                        call120Match.item ? (
                          <div>
                            <div>
                              <div className="dis_line" style="width: 286px;">{call120Match.hitDesc}</div>
                              <div className=" dis_line col_333">
                                通话 <span className="col_red">{call120Match.cnt}次</span>，时长 <span className="col_red">{(call120Match.duration / 60).toFixed(2)}分钟</span>
                              </div>
                              <a href="javascript:void(0);" onClick={() => this.setState({ c120Show: !c120Show })} className="fr a_line credit_toggleTable_a">
                                {c120Show ? '收起明细' : '展开明细'}
                              </a>
                            </div>
                            <div style={{ display: c120Show ? 'block' : 'none' }} className="credit_toggleTable">
                              <table border="0" cellSpacing="0" cellPadding="0">
                                <tbody>
                                  <tr>
                                    <th>通话标记</th>
                                    <th>通话类型</th>
                                    <th>通话次数</th>
                                    <th>通话时长</th>
                                  </tr>
                                  {
                                    call120Match.details.map((v, i) => (
                                      <tr key={i}>
                                        <td>{v.callTag}</td>
                                        <td>{v.callType}</td>
                                        <td>{v.callCnt}<span>次</span></td>
                                        <td>{(v.callTime / 60).toFixed(2)}<span>分钟</span></td>
                                      </tr>
                                    ))
                                  }
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ) : <div className="dis_line" style={{ width: 180 }}>无通话记录</div>
                      }
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="26">澳门电话</th>
                    <td colSpan="74">
                      {
                        callMacaoMatch.item ? (
                          <div>
                            <div>
                              <div className="dis_line" style="width: 286px;">{callMacaoMatch.hitDesc}</div>
                              <div className=" dis_line col_333">
                                通话 <span className="col_red">{callMacaoMatch.cnt}次</span>，时长 <span className="col_red">{(callMacaoMatch.duration / 60).toFixed(2)}分钟</span>
                              </div>
                              <a href="javascript:void(0);" onClick={() => this.setState({ macaoShow: !macaoShow })} className="fr a_line credit_toggleTable_a">
                                {macaoShow ? '收起明细' : '展开明细'}
                              </a>
                            </div>
                            <div style={{ display: macaoShow ? 'block' : 'none' }} className="credit_toggleTable">
                              <table border="0" cellSpacing="0" cellPadding="0">
                                <tbody>
                                  <tr>
                                    <th>通话标记</th>
                                    <th>通话类型</th>
                                    <th>通话次数</th>
                                    <th>通话时长</th>
                                  </tr>
                                  {
                                    callMacaoMatch.details.map((v, i) => (
                                      <tr key={i}>
                                        <td>{v.callTag}</td>
                                        <td>{v.callType}</td>
                                        <td>{v.callCnt}<span>次</span></td>
                                        <td>{(v.callTime / 60).toFixed(2)}<span>分钟</span></td>
                                      </tr>
                                    ))
                                  }
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ) : <div className="dis_line" style={{ width: 180 }}>无通话记录</div>
                      }
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="26">法院电话</th>
                    <td colSpan="74">
                      {
                        callCourtMatch.item ? (
                          <div>
                            <div>
                              <div className="dis_line" style="width: 286px;">{callCourtMatch.hitDesc}</div>
                              <div className=" dis_line col_333">
                                通话 <span className="col_red">{callCourtMatch.cnt}次</span>，时长 <span className="col_red">{(callCourtMatch.duration / 60).toFixed(2)}分钟</span>
                              </div>
                              <a href="javascript:void(0);" onClick={() => this.setState({ courtShow: !courtShow })} className="fr a_line credit_toggleTable_a">
                                {courtShow ? '收起明细' : '展开明细'}
                              </a>
                            </div>
                            <div style={{ display: courtShow ? 'block' : 'none' }} className="credit_toggleTable">
                              <table border="0" cellSpacing="0" cellPadding="0">
                                <tbody>
                                  <tr>
                                    <th>通话标记</th>
                                    <th>通话类型</th>
                                    <th>通话次数</th>
                                    <th>通话时长</th>
                                  </tr>
                                  {
                                    callCourtMatch.details.map((v, i) => (
                                      <tr key={i}>
                                        <td>{v.callTag}</td>
                                        <td>{v.callType}</td>
                                        <td>{v.callCnt}<span>次</span></td>
                                        <td>{(v.callTime / 60).toFixed(2)}<span>分钟</span></td>
                                      </tr>
                                    ))
                                  }
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ) : <div className="dis_line" style={{ width: 180 }}>无通话记录</div>
                      }
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="26">律师电话</th>
                    <td colSpan="74">
                      {
                        callLawyerMatch.item ? (
                          <div>
                            <div>
                              <div className="dis_line" style="width: 286px;">{callLawyerMatch.hitDesc}</div>
                              <div className=" dis_line col_333">
                                通话 <span className="col_red">{callLawyerMatch.cnt}次</span>，时长 <span className="col_red">{(callLawyerMatch.duration / 60).toFixed(2)}分钟</span>
                              </div>
                              <a href="javascript:void(0);" onClick={() => this.setState({ lawyerShow: !lawyerShow })} className="fr a_line credit_toggleTable_a">
                                {lawyerShow ? '收起明细' : '展开明细'}
                              </a>
                            </div>
                            <div style={{ display: lawyerShow ? 'block' : 'none' }} className="credit_toggleTable">
                              <table border="0" cellSpacing="0" cellPadding="0">
                                <tbody>
                                  <tr>
                                    <th>通话标记</th>
                                    <th>通话类型</th>
                                    <th>通话次数</th>
                                    <th>通话时长</th>
                                  </tr>
                                  {
                                    callLawyerMatch.details.map((v, i) => (
                                      <tr key={i}>
                                        <td>{v.callTag}</td>
                                        <td>{v.callType}</td>
                                        <td>{v.callCnt}<span>次</span></td>
                                        <td>{(v.callTime / 60).toFixed(2)}<span>分钟</span></td>
                                      </tr>
                                    ))
                                  }
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ) : <div className="dis_line" style={{ width: 180 }}>无通话记录</div>
                      }
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="26">中介电话</th>
                    <td colSpan="74">
                      {
                        callAgencyMatch.item ? (
                          <div>
                            <div>
                              <div className="dis_line" style="width: 286px;">{callAgencyMatch.hitDesc}</div>
                              <div className=" dis_line col_333">
                                通话 <span className="col_red">{callAgencyMatch.cnt}次</span>，时长 <span className="col_red">{(callAgencyMatch.duration / 60).toFixed(2)}分钟</span>
                              </div>
                              <a href="javascript:void(0);" onClick={() => this.setState({ agencyShow: !agencyShow })} className="fr a_line credit_toggleTable_a">
                                {agencyShow ? '收起明细' : '展开明细'}
                              </a>
                            </div>
                            <div style={{ display: agencyShow ? 'block' : 'none' }} className="credit_toggleTable">
                              <table border="0" cellSpacing="0" cellPadding="0">
                                <tbody>
                                  <tr>
                                    <th>通话标记</th>
                                    <th>通话类型</th>
                                    <th>通话次数</th>
                                    <th>通话时长</th>
                                  </tr>
                                  {
                                    callAgencyMatch.details.map((v, i) => (
                                      <tr key={i}>
                                        <td>{v.callTag}</td>
                                        <td>{v.callType}</td>
                                        <td>{v.callCnt}<span>次</span></td>
                                        <td>{(v.callTime / 60).toFixed(2)}<span>分钟</span></td>
                                      </tr>
                                    ))
                                  }
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ) : <div className="dis_line" style={{ width: 180 }}>无通话记录</div>
                      }
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="26">贷款类电话</th>
                    <td colSpan="74">
                      {
                        callLoadMatch.item ? (
                          <div>
                            <div>
                              <div className="dis_line" style="width: 286px;">{callLoadMatch.hitDesc}</div>
                              <div className=" dis_line col_333">
                                通话 <span className="col_red">{callLoadMatch.cnt}次</span>，时长 <span className="col_red">{(callLoadMatch.duration / 60).toFixed(2)}分钟</span>
                              </div>
                              <a href="javascript:void(0);" onClick={() => this.setState({ loadShow: !loadShow })} className="fr a_line credit_toggleTable_a">
                                {loadShow ? '收起明细' : '展开明细'}
                              </a>
                            </div>
                            <div style={{ display: loadShow ? 'block' : 'none' }} className="credit_toggleTable">
                              <table border="0" cellSpacing="0" cellPadding="0">
                                <tbody>
                                  <tr>
                                    <th>通话标记</th>
                                    <th>通话类型</th>
                                    <th>通话次数</th>
                                    <th>通话时长</th>
                                  </tr>
                                  {
                                    callLoadMatch.details.map((v, i) => (
                                      <tr key={i}>
                                        <td>{v.callTag}</td>
                                        <td>{v.callType}</td>
                                        <td>{v.callCnt}<span>次</span></td>
                                        <td>{(v.callTime / 60).toFixed(2)}<span>分钟</span></td>
                                      </tr>
                                    ))
                                  }
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ) : <div className="dis_line" style={{ width: 180 }}>无通话记录</div>
                      }
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="26">银行电话</th>
                    <td colSpan="74">
                      {
                        callBankMatch.item ? (
                          <div>
                            <div>
                              <div className="dis_line" style={{ width: 286 }}>{callBankMatch.hitDesc}</div>
                              <div className=" dis_line col_333">
                                通话 <span className="col_red">{callBankMatch.cnt}次</span>，时长 <span className="col_red">{(callBankMatch.duration / 60).toFixed(2)}分钟</span>
                              </div>
                              <a href="javascript:void(0);" onClick={() => this.setState({ bankShow: !bankShow })} className="fr a_line credit_toggleTable_a">
                                {bankShow ? '收起明细' : '展开明细'}
                              </a>
                            </div>
                            <div style={{ display: bankShow ? 'block' : 'none' }} className="credit_toggleTable">
                              <table border="0" cellSpacing="0" cellPadding="0">
                                <tbody>
                                  <tr>
                                    <th>通话标记</th>
                                    <th>通话类型</th>
                                    <th>通话次数</th>
                                    <th>通话时长</th>
                                  </tr>
                                  {
                                    callBankMatch.details.map((v, i) => (
                                      <tr key={i}>
                                        <td>{v.callTag}</td>
                                        <td>{v.callType}</td>
                                        <td>{v.callCnt}<span>次</span></td>
                                        <td>{(v.callTime / 60).toFixed(2)}<span>分钟</span></td>
                                      </tr>
                                    ))
                                  }
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ) : <div className="dis_line" style={{ width: 180 }}>无通话记录</div>
                      }
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="26">信用卡电话</th>
                    <td colSpan="74">
                      {
                        callCreditMatch.item ? (
                          <div>
                            <div>
                              <div className="dis_line" style={{ width: 286 }}>{callCreditMatch.hitDesc}</div>
                              <div className=" dis_line col_333">
                                通话 <span className="col_red">{callCreditMatch.cnt}次</span>，时长 <span className="col_red">{(callCreditMatch.duration / 60).toFixed(2)}分钟</span>
                              </div>
                              <a href="javascript:void(0);" onClick={() => this.setState({ creditShow: !creditShow })} className="fr a_line credit_toggleTable_a">
                                {creditShow ? '收起明细' : '展开明细'}
                              </a>
                            </div>
                            <div style={{ display: creditShow ? 'block' : 'none' }} className="credit_toggleTable">
                              <table border="0" cellSpacing="0" cellPadding="0">
                                <tbody>
                                  <tr>
                                    <th>通话标记</th>
                                    <th>通话类型</th>
                                    <th>通话次数</th>
                                    <th>通话时长</th>
                                  </tr>
                                  {
                                    callCreditMatch.details.map((v, i) => (
                                      <tr key={i}>
                                        <td>{v.callTag}</td>
                                        <td>{v.callType}</td>
                                        <td>{v.callCnt}<span>次</span></td>
                                        <td>{(v.callTime / 60).toFixed(2)}<span>分钟</span></td>
                                      </tr>
                                    ))
                                  }
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ) : <div className="dis_line" style={{ width: 180 }}>无通话记录</div>
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
          <Card title="通话行为" style={{ marginTop: 16 }}>
            <div>
              <p className="table-title">通话概况</p>
              <table className="outer-table-wrapper message_table" border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                  <tr style={{ borderRight: 'none' }}>
                    <td style={{ borderRight: 'none' }}>
                      <table border="0" cellSpacing="0" cellPadding="0" className="small_table">
                        <tbody>
                          <tr>
                            <td className="col_000">日均通话次数</td>
                            <td colSpan="2" className="col_000">日均通话时长</td>
                          </tr>
                          <tr>
                            <td className="col_999">
                              <span className="fs_20 col_green">{callAnalysis.avgCallCnt}</span>&nbsp;&nbsp;次
                            </td>
                            <td colSpan="2" className="col_999">
                              <span className="fs_20 col_green">{((callAnalysis.avgCallTime || 0) / 60).toFixed(2)}</span>&nbsp;分钟
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td style={{ borderRight: 'none' }}>
                      <table border="0" cellSpacing="0" cellPadding="0" className="small_table">
                        <tbody>
                          <tr>
                            <td className="col_000">日均主叫次数</td>
                            <td colSpan="2" className="col_000">日均主叫时长</td>
                          </tr>
                          <tr>
                            <td className="col_999">
                              <span className="fs_20 col_green">{callAnalysis.avgCallingCnt}</span>&nbsp;&nbsp;次
                            </td>
                            <td colSpan="2" className="col_999">
                              <span className="fs_20 col_green">{((callAnalysis.avgCallingTime || 0) / 60).toFixed(2)}</span>&nbsp;分钟
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ borderRight: 'none' }}>
                      <table border="0" cellSpacing="0" cellPadding="0" className="small_table">
                        <tbody>
                          <tr>
                            <td className="col_000">日均被叫次数</td>
                            <td colSpan="2" className="col_000">日均被叫时长</td>
                          </tr>
                          <tr>
                            <td className="col_999">
                              <span className="fs_20 col_green">{callAnalysis.avgCalledCnt}</span>&nbsp;&nbsp;次
                            </td>
                            <td colSpan="2" className="col_999">
                              <span className="fs_20 col_green">{((callAnalysis.avgCalledTime || 0) / 60).toFixed(2)}</span>&nbsp;分钟
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td style={{ borderRight: 'none' }}>
                      <table border="0" cellSpacing="0" cellPadding="0" className="small_table">
                        <tbody>
                          <tr>
                            <td colSpan="3" className="col_000">本地通话占比</td>
                          </tr>
                          <tr>
                            <td colSpan="3" className="col_999">
                              <span className="fs_20 col_green">{callAnalysis.locCallPct}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 16 }}>
              <p className="table-title">活跃情况</p>
              <table className="outer-table-wrapper" border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                  <tr>
                    <td colSpan="3">项目</td>
                    <td colSpan="2">近1月</td>
                    <td colSpan="2">近3月</td>
                    <td colSpan="2">近6月</td>
                    <td colSpan="2">月均</td>
                  </tr>
                  {
                    activeCallAnalysis && activeCallAnalysis.length
                      ? activeCallAnalysis.map((v, i) => (
                          <tr key={i}>
                            <th colSpan="3">{v.desc}</th>
                            <td colSpan="2">{v.lately1m}</td>
                            <td colSpan="2">{v.lately3m}</td>
                            <td colSpan="2">{v.lately6m}</td>
                            <td colSpan="2">{v.avgMonth}</td>
                          </tr>
                        ))
                      : null
                  }
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 16 }}>
              <p className="table-title">静默情况（近6个月）</p>
              <table className="outer-table-wrapper" border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                  <tr>
                    <th colSpan="11">总静默次数</th>
                    <th colSpan="15">总静默时长(小时)</th>
                    <th colSpan="18">最长一次静默开始时间</th>
                    <th colSpan="19">最长一次静默时长(小时)</th>
                    <th colSpan="18">最近一次静默开始时间</th>
                    <th colSpan="19">最近一次静默时长(小时)</th>
                  </tr>
                  <tr>
                    <td colSpan="11">{silenceAnalysis.silenceCnt}</td>
                    <td colSpan="15">{((silenceAnalysis.silenceTime || 0) / 3600).toFixed(2)}</td>
                    <td colSpan="18">{silenceAnalysis.longestSilenceStart}</td>
                    <td colSpan="19">{((silenceAnalysis.longestSilenceTime || 0) / 3600).toFixed(2)}</td>
                    <td colSpan="18">{silenceAnalysis.lastSilenceStart}</td>
                    <td colSpan="19">{silenceAnalysis.lastSilenceTime}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 16 }}>
              <p className="table-title">通话时间分析（近6个月）</p>
              <table className="outer-table-wrapper" border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                  <tr>
                    <th colSpan="13">时间段</th>
                    <th colSpan="7" style={{ paddingRight: 0 }}>通话<br/>次数</th>
                    <th colSpan="8" style={{ paddingRight: 0 }}>通话<br/>号码数</th>
                    <th colSpan="22">最常联系号码<br/>及联系次数</th>
                    <th colSpan="10" style={{ paddingRight: 0 }}>平均通话<br/>时长(分钟)</th>
                    <th colSpan="10">主叫次数</th>
                    <th colSpan="10">主叫时长<br/>(分钟)</th>
                    <th colSpan="10">被叫次数</th>
                    <th colSpan="10">被叫时长<br/>(分钟)</th>
                  </tr>
                  {
                    callDurationAnalysis && callDurationAnalysis.length
                      ? callDurationAnalysis.map((v, i) => (
                        <tr key={i}>
                          <td colSpan="13">{v.desc}</td>
                          <td colSpan="7" style={{ paddingRight: 0 }}>{v.callCnt}</td>
                          <td colSpan="8" style={{ paddingRight: 0 }}>{v.callNumCnt}</td>
                          <td colSpan="22">{v.freqContactNum}{+v.freqContactNumCnt ? ` : ${v.freqContactNumCnt}次` : '-'}</td>
                          <td colSpan="10" style={{ paddingRight: 0 }}>{((v.avgCallTime || 0) / 60).toFixed(2)}</td>
                          <td colSpan="10">{v.callingCnt}</td>
                          <td colSpan="10">{((v.callingTime || 0) / 60).toFixed(2)}</td>
                          <td colSpan="10">{v.calledCnt}</td>
                          <td colSpan="10">{((v.calledTime || 0) / 60).toFixed(2)}</td>
                        </tr>
                      ))
                      : null
                  }
                </tbody>
              </table>
            </div>
          </Card>
          <Card title="消费能力" style={{ marginTop: 16 }}>
            <p className="table-title">消费能力</p>
            <table className="outer-table-wrapper" border="0" cellSpacing="0" cellPadding="0">
              <tbody>
                <tr>
                  <td colSpan="4">项目</td>
                  <td colSpan="3">近1月</td>
                  <td colSpan="3">近3月</td>
                  <td colSpan="3">近6月</td>
                  <td colSpan="3">平均</td>
                </tr>
                {
                  consumptionAnalysis && consumptionAnalysis.length
                    ? consumptionAnalysis.map((v, i) => (
                      <tr key={i}>
                        <th colSpan="4">{v.desc}(元)</th>
                        <td colSpan="3">{v.lately1m}</td>
                        <td colSpan="3">{v.lately3m}</td>
                        <td colSpan="3">{v.lately6m}</td>
                        <td colSpan="3">{v.avgMonth}</td>
                      </tr>
                    ))
                    : null
                }
              </tbody>
            </table>
          </Card>
          <Card title="出行信息" style={{ marginTop: 16 }}>
            <p className="table-title">出行信息</p>
            <table className="outer-table-wrapper" border="0" cellSpacing="0" cellPadding="0">
              <tbody>
                <tr>
                  <th colSpan="4">出发时间</th>
                  <th colSpan="3">回程时间</th>
                  <th colSpan="3">出发地</th>
                  <th colSpan="3">目的地</th>
                </tr>
                {
                  tripAnalysis && tripAnalysis.length ? tripAnalysis.map((v, i) => (
                    <tr key={i}>
                      <td colSpan="4">{v.departureDate}</td>
                      <td colSpan="3">{v.returnDate}</td>
                      <td colSpan="3">{v.departurePlace}</td>
                      <td colSpan="3">{v.destinationPlace}</td>
                    </tr>
                  )) : null
                }
              </tbody>
            </table>
            {!tripAnalysis || !tripAnalysis.length ? <div className="report-none-data">无相关数据</div> : null}
          </Card>
          <Card title="社交关系" style={{ marginTop: 16 }}>
            <div>
              <p className="table-title">社交关系概况</p>
              <table className="outer-table-wrapper message_table" border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                  <tr>
                    <td style={{ borderRight: 'none' }} colSpan="20">
                      <table border="0" cellSpacing="0" cellPadding="0" className="small_table">
                        <tbody>
                          <tr>
                            <td className="col_000">
                              <div className="small_table_td_name">联系号码总数</div>
                            </td>
                          </tr>
                          <tr>
                            <td className="col_999">
                              <span className="fs_20 col_green">{callNumCnt.content}</span>&nbsp;&nbsp;个
                            </td>
                          </tr>
                          <tr>
                            <td className="col_999">近6个月联系号码数</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td style={{ borderRight: 'none' }} colSpan="27">
                      <table border="0" cellSpacing="0" cellPadding="0" className="small_table">
                        <tbody>
                          <tr>
                            <td className="col_000">
                              <div className="small_table_td_name">互通号码数</div>
                            </td>
                          </tr>
                          <tr>
                            <td className="col_999">
                              <span className="fs_20 col_green">{interflowContactCnt.content}</span>&nbsp;&nbsp;个
                            </td>
                          </tr>
                          <tr>
                            <td className="col_999">近6个月内相互通过电话的号码数</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td style={{ borderRight: 'none' }} colSpan="26">
                      <table border="0" cellSpacing="0" cellPadding="0" className="small_table">
                        <tbody>
                          <tr>
                            <td className="col_000">
                              <div className="small_table_td_name">朋友圈紧密联系人数</div>
                            </td>
                          </tr>
                          <tr>
                            <td className="col_999">
                              <span className="fs_20 col_green">{friendContactCnt.content}</span>&nbsp;&nbsp;个
                            </td>
                          </tr>
                          <tr>
                            <td className="col_999">近6个月累计联系10次以上并且每月通话1次以上号码数量</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td style={{ borderRight: 'none' }} colSpan="27">
                      <table border="0" cellSpacing="0" cellPadding="0" className="small_table">
                        <tbody>
                          <tr>
                            <td className="col_000">
                              <div className="small_table_td_name">朋友圈中心地</div>
                            </td>
                          </tr>
                          <tr>
                            <td className="col_999">
                              <span className="fs_20 col_green">{friendCity.content}</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="col_999">近6个月联系次数最多的归属地</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 16 }}>
              <p className="table-title">通话区域分析</p>
              <table className="outer-table-wrapper padNone" border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                  <tr>
                    <th colSpan="10">通话地</th>
                    <th colSpan="8">通话次数</th>
                    <th colSpan="8">通话号码数</th>
                    <th colSpan="8">通话时长(分钟)</th>
                    <th colSpan="8">主叫次数</th>
                    <th colSpan="8">主叫时长(分钟)</th>
                    <th colSpan="8">被叫次数</th>
                    <th colSpan="8">被叫时长(分钟)</th>
                  </tr>
                  {
                    callAreaAnalysis && callAreaAnalysis.length
                      ? callAreaAnalysis.map((v, i) => (
                        <tr>
                          <td colSpan="10">{v.attribution}</td>
                          <td colSpan="8">{v.callCnt}</td>
                          <td colSpan="8">{v.callNumCnt}</td>
                          <td colSpan="8">{(v.callTime / 60).toFixed(2)}</td>
                          <td colSpan="8">{v.callingCnt}</td>
                          <td colSpan="8">{(v.callingTime / 60).toFixed(2)}</td>
                          <td colSpan="8">{v.calledCnt}</td>
                          <td colSpan="8">{(v.calledTime / 60).toFixed(2)}</td>
                        </tr>
                      )) : null
                  }
                </tbody>
              </table>
              {!callAreaAnalysis || !callAreaAnalysis.length ? <div className="report-none-data">无相关数据</div> : null}
            </div>
            <div style={{ marginTop: 16 }}>
              <p className="table-title">通话联系人分析（按近6月通话次数排名）</p>
              <table border="0" cellSpacing="0" cellPadding="0" className="outer-table-wrapper padNone">
                <tbody>
                  <tr>
                    <th colSpan="16">号码</th>
                    <th colSpan="14">互联网标识</th>
                    <th colSpan="8">风险名单</th>
                    <th colSpan="7">归属地</th>
                    <th colSpan="5">通话<br/>次数</th>
                    <th colSpan="8">通话时长(分钟)</th>
                    <th colSpan="5">主叫次数</th>
                    <th colSpan="8">主叫时长(分钟)</th>
                    <th colSpan="16">最近一次通话时间</th>
                    <th colSpan="8">最近一次通话时长(分钟)</th>
                  </tr>
                  {
                    contactAnalysis && contactAnalysis.length ? contactAnalysis.map((v, i) => (
                      <tr>
                        <td colSpan="16">{v.callNum}</td>
                        <td colSpan="14">{v.callTag}</td>
                        <td colSpan="8">{v.isHitRiskList === '1' ? '是' : '否'}</td>
                        <td colSpan="7">{v.attribution}</td>
                        <td colSpan="5">{v.callCnt}</td>
                        <td colSpan="8">{(v.callTime / 60).toFixed(2)}</td>
                        <td colSpan="5">{v.callingCnt}</td>
                        <td colSpan="8">{(v.callingTime / 60).toFixed(2)}</td>
                        <td colSpan="16">{v.lastStart}</td>
                        <td colSpan="8">{(v.lastTime / 60).toFixed(2)}</td>
                      </tr>
                    )) : null
                  }
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </Spin>
    );
  }
}
