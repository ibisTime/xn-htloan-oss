import React from 'react';
import {
    showWarnMsg,
    showSucMsg,
    getQueryString,
    dsctImgList,
    findDsct
} from 'common/js/util';
import {
    sendCreditReportingLs,
    accessSlipDetail
} from '../../api/preLoan.js';
import {UPLOAD_URL, PIC_PREFIX} from '../../common/js/config.js';
import {Row, Col} from 'antd';
import './preloanAccessDetail.css';
import './preloanAccess.css';

class preloanAccessDetail extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.state = {
            // 贷款人信息Tab状态
            isMain: true,
            isCommon: false,
            isBack: false,
            // 征信人列表
            creditUserList1: {},
            creditUserList2: {},
            creditUserList3: {},
            // 贷款信息
            bankLoan: {},
            // 车辆信息
            carInfo: {},
            // 发起征信
            headInfo: {},
            // 图片列表
            attachments: [],
            // 基本信息
            creditUser: {},
            // 费用结算
            costSettlement: {}
        };
    }
    componentDidMount(): void {
        accessSlipDetail(this.code).then(data => {
            this.setState({
                creditUserList1: data.creditUserList[0],
                creditUserList2: data.creditUserList[1],
                creditUserList3: data.creditUserList[2],
                bankLoan: data.bankLoan,
                carInfo: data.carInfo,
                headInfo: {
                    loanBankName: data.loanBankName,
                    region: data.region,
                    bizType: data.bizType === '0' ? '新车' : '二手车',
                    regAddress: data.regAddress,
                    mile: data.mile,
                    secondCarReport: data.secondCarReport
                },
                attachments: dsctImgList(data.attachments),
                creditUser: data.creditUser,
                costSettlement: {
                    fxAmount: data.fxAmount,
                    lyDeposit: data.lyDeposit,
                    repointAmount: data.repointAmount,
                    gpsFee: data.gpsFee,
                    otherFee: data.otherFee
                }
            });
            console.log(this.state.attachments);
        });
    }

    // 贷款人信息Tab效果
    getTag = (value) => {
        if(value === 'main') {
            this.setState({
                isMain: true,
                isCommon: false,
                isBack: false
            });
        }else if(value === 'common') {
            this.setState({
                isMain: false,
                isCommon: true,
                isBack: false
            });
        }else if(value === 'back') {
            this.setState({
                isMain: false,
                isCommon: false,
                isBack: true
            });
        }
    }
    // 返回
    goBack = () => {
        this.props.history.go(-1);
    }
    render() {
        const {
            isMain,
            isCommon,
            isBack,
            headInfo,
            creditUserList1,
            creditUserList2,
            creditUserList3,
            attachments,
            creditUser,
            bankLoan,
            costSettlement,
            carInfo
        } = this.state;
        return (
            <div>
                <div className="sendRmk">
                    <div className="box">
                        <div className="btnGray" onClick={this.goBack}>返回</div>
                    </div>
                </div>
                {/* 发起征信 */}
                <div className="preLoan-detail-box">
                    <div className="preLoan-detail-box-header">
                        <span>发起征信</span>
                    </div>
                    <div className="preLoan-detail-box-content">
                        <Row>
                            <Col span={12}>经办银行：{headInfo.loanBankName}</Col>
                            <Col span={12}>业务发生地：{headInfo.region}</Col>
                        </Row>
                        <Row style={{marginTop: '32px'}}>
                            <Col span={12}>购车途径：{headInfo.bizType}</Col>
                            <Col span={12}>上牌地：{headInfo.regAddress}</Col>
                        </Row>
                        <Row style={{marginTop: '32px'}}>
                            <Col span={12}>公里数：{headInfo.mile}</Col>
                            <Col span={12}></Col>
                        </Row>
                        <Row style={{marginTop: '32px'}}>
                            <Col span={12}>
                                <span className="preLoan-body-title" style={{width: '300px'}}>评估报告：<a href={headInfo.secondCarReport}>点击进入评估报告</a></span>
                                {/* <div className="preLoan-body-presentation-upload"></div> */}
                            </Col>
                            <Col span={12}>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="preLoan-detail-empty"></div>
                {/* 贷款信息 */}
                <div className="preLoan-detail-box">
                    <div className="preLoan-detail-box-header">
                        <span>贷款信息</span>
                    </div>
                    <div className="preLoan-detail-box-content">
                        <Row>
                            <Col span={2} className={isMain ? 'preLoan-body-table-content-tab-in' : 'preLoan-body-table-content-tab-out'} onClick={value => this.getTag('main')}>主贷人信息</Col>
                            <Col span={2} className={isCommon ? 'preLoan-body-table-content-tab-in' : 'preLoan-body-table-content-tab-out'} style={{marginLeft: '20px'}} onClick={value => this.getTag('common')}>共还人信息</Col>
                            <Col span={2} className={isBack ? 'preLoan-body-table-content-tab-in' : 'preLoan-body-table-content-tab-out'} style={{marginLeft: '20px'}} onClick={value => this.getTag('back')}>反担保人信息</Col>
                            <Col span={18}></Col>
                        </Row>
                        {
                            isMain ? (
                                <div>
                                    <Row style={{marginTop: '28px'}}>
                                        <Col span={4} >
                                            <img src={PIC_PREFIX + findDsct(attachments, 'id_no_front_apply')} className="preLoan-body-table-content-tab-card" />
                                        </Col>
                                        <Col span={4} style={{marginLeft: '60px'}}>
                                            <img src={PIC_PREFIX + findDsct(attachments, 'id_no_reverse_apply')} className="preLoan-body-table-content-tab-card" />
                                        </Col>
                                        <Col span={4} style={{marginLeft: '60px'}}>
                                            <img src={PIC_PREFIX + findDsct(attachments, 'hold_id_card_apply')} className="preLoan-body-table-content-tab-card" />
                                        </Col>
                                        <Col span={8}></Col>
                                    </Row>
                                    <Row style={{marginTop: '34px'}}>
                                        <Col span={12}>姓名：{creditUserList1.userName}</Col>
                                        <Col span={12}>性别：{creditUserList1.gender}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>民族：{creditUserList1.nation}</Col>
                                        <Col span={12}>出生日期：{creditUserList1.customerBirth}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>签证机关：{creditUserList1.authref}</Col>
                                        <Col span={12}>户籍地：{creditUserList1.birthAddress}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>有效截止日：{creditUserList1.startDate}至{creditUserList1.statdate}</Col>
                                        <Col span={12}>身份证号：{creditUserList1.idNo}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>手机号：{creditUserList1.mobile}</Col>
                                        <Col span={12}>征信结果：{creditUserList1.bankCreditResult === '0' ? '通过' : '不通过'}</Col>
                                    </Row>
                                </div>
                            ) : null
                        }
                        {
                            isCommon ? (
                                <div>
                                    <Row style={{marginTop: '28px'}}>
                                        <Col span={4} >
                                            <img src={PIC_PREFIX + findDsct(attachments, 'id_no_front_gh')} className="preLoan-body-table-content-tab-card" />
                                        </Col>
                                        <Col span={4} style={{marginLeft: '60px'}}>
                                            <img src={PIC_PREFIX + findDsct(attachments, 'id_no_reverse_gh')} className="preLoan-body-table-content-tab-card" />
                                        </Col>
                                        <Col span={4} style={{marginLeft: '60px'}}>
                                            <img src={PIC_PREFIX + findDsct(attachments, 'hold_id_card_gh')} className="preLoan-body-table-content-tab-card" />
                                        </Col>
                                        <Col span={8}></Col>
                                    </Row>
                                    <Row style={{marginTop: '34px'}}>
                                        <Col span={12}>姓名：{creditUserList2.userName}</Col>
                                        <Col span={12}>性别：{creditUserList2.gender}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>民族：{creditUserList2.nation}</Col>
                                        <Col span={12}>出生日期：{creditUserList2.customerBirth}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>签证机关：{creditUserList2.authref}</Col>
                                        <Col span={12}>户籍地：{creditUserList2.birthAddress}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>有效截止日：{creditUserList2.startDate}至{creditUserList2.statdate}</Col>
                                        <Col span={12}>身份证号：{creditUserList2.idNo}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>手机号：{creditUserList2.mobile}</Col>
                                        <Col span={12}>征信结果：{creditUserList2.bankCreditResult === '0' ? '通过' : '不通过'}</Col>
                                    </Row>
                                </div>
                            ) : null
                        }
                        {
                            isBack ? (
                                <div>
                                    <Row style={{marginTop: '28px'}}>
                                        <Col span={4} >
                                            <img src={PIC_PREFIX + findDsct(attachments, 'id_no_front_gua')} className="preLoan-body-table-content-tab-card" />
                                        </Col>
                                        <Col span={4} style={{marginLeft: '60px'}}>
                                            <img src={PIC_PREFIX + findDsct(attachments, 'id_no_reverse_gua')} className="preLoan-body-table-content-tab-card" />
                                        </Col>
                                        <Col span={4} style={{marginLeft: '60px'}}>
                                            <img src={PIC_PREFIX + findDsct(attachments, 'hold_id_card_gua')} className="preLoan-body-table-content-tab-card" />
                                        </Col>
                                        <Col span={8}></Col>
                                    </Row>
                                    <Row style={{marginTop: '34px'}}>
                                        <Col span={12}>姓名：{creditUserList3.userName}</Col>
                                        <Col span={12}>性别：{creditUserList3.gender}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>民族：{creditUserList3.nation}</Col>
                                        <Col span={12}>出生日期：{creditUserList3.customerBirth}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>签证机关：{creditUserList3.authref}</Col>
                                        <Col span={12}>户籍地：{creditUserList3.birthAddress}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>有效截止日：{creditUserList3.startDate}至{creditUserList3.statdate}</Col>
                                        <Col span={12}>身份证号：{creditUserList3.idNo}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>手机号：{creditUserList3.mobile}</Col>
                                        <Col span={12}>征信结果：{creditUserList3.bankCreditResult === '0' ? '通过' : '不通过'}</Col>
                                    </Row>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
                <div className="preLoan-detail-empty"></div>
                {/* 基本信息 */}
                <div className="preLoan-detail-box">
                    <div className="preLoan-detail-box-header">
                        <span>基本信息</span>
                    </div>
                    <div className="preLoan-detail-box-content">
                        <span className="preLoan-body-tag">主贷人</span>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>教育程度：{creditUser.education}</Col>
                            <Col span={12}>现住地址：{creditUser.nowAddress}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>婚姻状态：{creditUser.marryState}</Col>
                            <Col span={12}>住房类型：{creditUser.nowHouseType}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>工作单位：{creditUser.companyName}</Col>
                            <Col span={12}>单位地址：{creditUser.companyAddress}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>职业：{creditUser.position}</Col>
                            <Col span={12}>年收入：{creditUser.yearIncome ? creditUser.yearIncome : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>现职年数：{creditUser.presentJobYears}年</Col>
                            <Col span={12}>常住类型：{creditUser.permanentType}</Col>
                        </Row>
                        <Row className="preLoan-body-row-top">
                            <Col span={6}>
                                <span>结婚证</span>
                                <br />
                                <div className="preLoan-body-table-content-tab-card"></div>
                            </Col>
                            <Col span={6}>
                                <span>离婚证</span>
                                <br />
                                <div className="preLoan-body-table-content-tab-card"></div>
                            </Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                        </Row>
                        <div className="preLoan-detail-row-line"></div>
                        <span className="preLoan-body-tag">共还人信息</span>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>姓名：{creditUserList2.userName}</Col>
                            <Col span={12}>身份证号：{creditUserList2.idNo}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>手机号：{creditUserList2.mobile}</Col>
                            <Col span={12}>职业：{creditUserList2.position}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>工作单位：{creditUserList2.companyName}</Col>
                            <Col span={12}>单位地址：{creditUserList2.companyAddress}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>现住地址：{creditUserList2.nowAddress}</Col>
                            <Col span={12}></Col>
                        </Row>
                        <div className="preLoan-detail-row-line"></div>
                        <span className="preLoan-body-tag">反担保人信息</span>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>姓名：{creditUserList3.userName}</Col>
                            <Col span={12}>身份证号：{creditUserList3.idNo}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>手机号：{creditUserList3.mobile}</Col>
                            <Col span={12}>职业：{creditUserList3.position}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>工作单位：{creditUserList3.companyName}</Col>
                            <Col span={12}>单位地址：{creditUserList3.companyAddress}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>现住地址：{creditUserList3.nowAddress}</Col>
                            <Col span={12}></Col>
                        </Row>
                        <div className="preLoan-detail-row-line"></div>
                        <span className="preLoan-body-tag">紧急联系人</span>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>姓名：{creditUser.emergencyName1}</Col>
                            <Col span={12}>与主贷人关系：{creditUser.emergencyRelation1}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>联系电话：{creditUser.emergencyMobile1}</Col>
                            <Col span={12}></Col>
                        </Row>
                        <div className="preLoan-detail-row-line"></div>
                        <span className="preLoan-body-tag">紧急联系人</span>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>姓名：{creditUser.emergencyName2}</Col>
                            <Col span={12}>与主贷人关系：{creditUser.emergencyRelation2}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>联系电话：{creditUser.emergencyMobile2}</Col>
                            <Col span={12}></Col>
                        </Row>
                    </div>
                </div>
                {/* 贷款信息 */}
                <div className="preLoan-detail-empty"></div>
                {/* 基本信息 */}
                <div className="preLoan-detail-box">
                    <div className="preLoan-detail-box-header">
                        <span>贷款信息</span>
                    </div>
                    <div className="preLoan-detail-box-content">
                        <span className="preLoan-body-tag">贷款信息</span>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={8}>贷款本金：{bankLoan.loanAmount}</Col>
                            <Col span={8}>贷款期限：{bankLoan.periods}年</Col>
                            <Col span={8}>银行利率（%）：{bankLoan.bankRate}%</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={8}>总利率：{bankLoan.totalRate}%</Col>
                            <Col span={8}>返点利率：{bankLoan.rebateRate}%</Col>
                            <Col span={8}>服务费：{bankLoan.fee}</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={8}>利率类型：{bankLoan.rateType}</Col>
                            <Col span={8}>是否垫资：{bankLoan.isAdvanceFund}</Col>
                            <Col span={8}>是否贴息：{bankLoan.isDiscount}</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={8}>贴息利率：{bankLoan.discountRate}%</Col>
                            <Col span={8}>贴息金额：{bankLoan.discountAmount}</Col>
                            <Col span={8}>贷款成数：{bankLoan.loanRatio}%</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={8}>万元系数：{bankLoan.wanFactor}</Col>
                            <Col span={8}>月供：{bankLoan.monthAmount}</Col>
                            <Col span={8}>首月还款额：{bankLoan.firstRepayAmount}</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={8}>高抛金额：{bankLoan.highCashAmount}</Col>
                            <Col span={8}>贷款总额：{bankLoan.totalFee}</Col>
                            <Col span={8}></Col>
                        </Row>
                    </div>
                </div>
                <div className="preLoan-detail-empty"></div>
                {/* 费用结算 */}
                <div className="preLoan-detail-box">
                    <div className="preLoan-detail-box-header">
                        <span>费用结算</span>
                    </div>
                    <div className="preLoan-detail-box-content">
                        <Row style={{marginTop: '34px'}}>
                            <Col span={8}>担保风险金：{costSettlement.fxAmount}</Col>
                            <Col span={8}>履约押金：{costSettlement.lyDeposit}</Col>
                            <Col span={8}>返点金额：{costSettlement.repointAmount}</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={8}>GPS费：{costSettlement.gpsFee}</Col>
                            <Col span={8}>其他费用：{costSettlement.otherFee}</Col>
                            <Col span={8}></Col>
                        </Row>
                    </div>
                </div>
                <div className="preLoan-detail-empty"></div>
                {/* 车辆信息 */}
                <div className="preLoan-detail-box">
                    <div className="preLoan-detail-box-header">
                        <span>车辆信息</span>
                    </div>
                    <div className="preLoan-detail-box-content">
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>是否公牌：{carInfo.isPublicCard === 0 ? '否' : '是'}</Col>
                            <Col span={12}>发动机号：{carInfo.carEngineNo}</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>上牌地：{carInfo.regAddress}</Col>
                            <Col span={12}>购车车行：{carInfo.shopCarGarage}</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>车辆型号：{carInfo.model}</Col>
                            <Col span={12}>是否加装GPS：{carInfo.isAzGps}</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>车辆价格：{carInfo.carPrice}</Col>
                            <Col span={12}>发票价格：{carInfo.invoicePrice}</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>车架号：{carInfo.carFrameNo}</Col>
                            <Col span={12}>车牌号：{carInfo.carNumber}</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>评估价格：{carInfo.evalPrice}</Col>
                            <Col span={12}>上牌年份：{carInfo.regDate}</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>行驶里程：{carInfo.mile}公里</Col>
                            <Col span={12}></Col>
                        </Row>
                    </div>
                </div>
                <div className="preLoan-detail-empty"></div>
                {/* 贷款材料图 */}
                <div className="preLoan-detail-box">
                    <div className="preLoan-detail-box-header">
                        <span>贷款材料图</span>
                    </div>
                    <div className="preLoan-detail-box-content">
                        <Row style={{marginTop: '34px'}}>
                            <Col span={6}>
                                <span>驾驶证</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'drive_card')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                        </Row>
                        <div className="preLoan-detail-row-line"></div>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={6}>
                                <span>结婚证</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'marry_pdf')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}>
                                <span>离婚证</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'divorce_pdf')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}>
                                <span>单身证明</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'single_prove')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}>
                                <span>收入证明</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'income_prove')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={6}>
                                <span>户口本首页</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'hk_book_first_page')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}>
                                <span>户口本主页</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'hk_book_home_page')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}>
                                <span>户口本本人页</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'hk_book_my_page')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}>
                                <span>房产证内容页</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'house_property_card_pdf')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={6}>
                                <span>居住证</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'live_prove_pdf')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                        </Row>
                        <div className="preLoan-detail-row-line"></div>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={6}>
                                <span>银行流水首页</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'bank_jour_first_page')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}>
                                <span>银行流水结息一季度</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'bank_jour_interest_first')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}>
                                <span>银行流水结息二季度</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'bank_jour_interest_second')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}>
                                <span>银行流水结息三季度</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'bank_jour_interest_third')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={6}>
                                <span>银行流水结息四季度</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'bank_jour_interest_fourth')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}>
                                <span>银行流水末页</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'bank_jour_last_page')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}>
                                <span>支付宝流水</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'zfb_jour')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}>
                                <span>微信流水</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'wx_jour')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                        </Row>
                        <div className="preLoan-detail-row-line"></div>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={6}>
                                <span>其他</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'other_pdf')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                        </Row>
                    </div>
                </div>
                <div className="preLoan-detail-empty"></div>
                {/* 上门调查照片 */}
                <div className="preLoan-detail-box">
                    <div className="preLoan-detail-box-header">
                        <span>上门调查照片</span>
                    </div>
                    <div className="preLoan-detail-box-content">
                        <Row style={{marginTop: '34px'}}>
                            <Col span={6}>
                                <span>上门照片</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'door_photo')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                        </Row>
                        <div className="preLoan-detail-row-line"></div>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={6}>
                                <span>合照</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'group_photo')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={6}>
                                <span>家访视频</span>
                                <br />
                                <div><a src={PIC_PREFIX + findDsct(attachments, 'house_video')}>点击家访视频</a></div>
                            </Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                        </Row>
                    </div>
                </div>
                <div className="preLoan-detail-empty"></div>
                {/* 车辆图 */}
                <div className="preLoan-detail-box">
                    <div className="preLoan-detail-box-header">
                        <span>车辆图</span>
                    </div>
                    <div className="preLoan-detail-box-content">
                        <Row style={{marginTop: '34px'}}>
                            <Col span={6}>
                                <span>车头</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'car_head')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}>
                                <span>铭牌</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'nameplate')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}>
                                <span>VIN码</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'vin_number')} className="preLoan-body-table-content-tab-card" />

                            </Col>
                            <Col span={6}>
                                <span>仪表盘</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'dashboard')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={6}>
                                <span>驾驶室</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'cab')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}>
                                <span>发动机</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'car_engine')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}>
                                <span>中控</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'central_control')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}>
                                <span>天窗</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'skylight')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={6}>
                                <span>车后座</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'rear_seat')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}>
                                <span>车尾</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'vehicle_tail')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}>
                                <span>车全身</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'car_body')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}></Col>
                        </Row>
                        <div className="preLoan-detail-row-line"></div>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={6}>
                                <span>车辆登记证书（首页）</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'car_register_certificate_first')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}>
                                <span>车辆登记证书（二页）</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'car_register_certificate_second')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                            <Col span={6}>
                                <span>车辆登记证书（三页）</span>
                                <br />
                                <img src={PIC_PREFIX + findDsct(attachments, 'car_register_certificate_third')} className="preLoan-body-table-content-tab-card" />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default preloanAccessDetail;
