import React from 'react';
import {
    dsctImgList,
    dsctList,
    findDsct,
    getQueryString,
    showSucMsg,
    showWarnMsg
} from 'common/js/util';
import {
    accessSlipDetail,
    getCityList,
    getGpsAll,
    queryGps
} from '../../api/preLoan.js';
import {PIC_PREFIX} from '../../common/js/config.js';
import {Col, Row} from 'antd';
import {getDictList} from 'api/dict';
import './preloanAccessDetail.css';
import './preloanAccess.css';
import zanwu from './zanwu.png';

class preloanAccessDetail extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.state = {
            // 贷款人信息Tab状态
            isMain: true,
            isCommon: false,
            isCommon02: false,
            isBack: false,
            isBack02: false,
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
            costSettlement: {},
            cityList: [],
            hkBookFirstPage: [],
            bankJourFirstPage: [],
            zfbJour: [],
            wxJour: [],
            otherPdf: [],
            carHead: [],
            carRegisterCertificateFirst: [],
            gpsAzList: []
        };
    }
    dealWithPic = (fileListPic, type = '') => {
        let fileList = [];
        if (fileListPic === '') {
            fileList.push({
                url: zanwu
            });
        } else if (fileListPic.indexOf('||') !== -1) {
            const picList = fileListPic.split('||');
            picList.forEach((item) => {
                fileList.push({
                    url: PIC_PREFIX + item
                });
            });
        } else {
            fileList.push({
                url: PIC_PREFIX + fileListPic
            });
        }
        return fileList;
    };
    componentDidMount() {
        getCityList(1, 1000).then(async data => {
            let arr = [];
            for (let i = 0; i < data.list.length; i++) {
                arr.push({
                    dkey: data.list[i].id,
                    dvalue: data.list[i].cityName
                });
            }
            this.setState({
                cityList: arr
            });
        });
        accessSlipDetail(this.code).then(data => {
            const card = data.creditUserList.filter(item => item.loanRole === '1');
            const cardZTwo01 = data.creditUserList.filter(item => item.loanRole === '2');
            const cardZTwo02 = data.creditUserList.filter(item => item.loanRole === '5');
            const cardZThree01 = data.creditUserList.filter(item => item.loanRole === '3');
            const cardZThree02 = data.creditUserList.filter(item => item.loanRole === '4');
            const hkBookFirstPage = this.dealWithPic(findDsct(dsctImgList(data.attachments), 'hk_book_first_page'), 'hk');
            const bankJourFirstPage = this.dealWithPic(findDsct(dsctImgList(data.attachments), 'bank_jour_first_page'), 'bj');
            const zfbJour = this.dealWithPic(findDsct(dsctImgList(data.attachments), 'zfb_jour'), 'zfb');
            const wxJour = this.dealWithPic(findDsct(dsctImgList(data.attachments), 'wx_jour'), 'wx');
            const otherPdf = this.dealWithPic(findDsct(dsctImgList(data.attachments), 'other_pdf'), 'other');
            const carHead = this.dealWithPic(findDsct(dsctImgList(data.attachments), 'car_head'), 'ch');
            const carRegisterCertificateFirst = this.dealWithPic(findDsct(dsctImgList(data.attachments), 'car_register_certificate_first'), 'crc');
            this.setState({
                creditUserList1: card.length > 0 ? card[0] : {},
                creditUserList2: cardZTwo01.length > 0 ? cardZTwo01[0] : {},
                creditUserList202: cardZTwo02.length > 0 ? cardZTwo02[0] : {},
                creditUserList3: cardZThree01.length > 0 ? cardZThree01[0] : {},
                creditUserList302: cardZThree02.length > 0 ? cardZThree02[0] : {},
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
                },
                shopCarGarage: data.carInfo ? data.carInfo.shopCarGarageName : '',
                saleUserName: data.saleUserName ? data.saleUserName : '',
                hkBookFirstPage,
                bankJourFirstPage,
                zfbJour,
                wxJour,
                otherPdf,
                carHead,
                carRegisterCertificateFirst
            });
        });
        Promise.all([
            getDictList({parentKey: 'budget_orde_biz_typer'}),
            getDictList({parentKey: 'loan_period'}),
            getDictList({parentKey: 'car_type'}),
            getDictList({parentKey: 'gender'}),
            getDictList({parentKey: 'marry_state'}),
            getDictList({parentKey: 'education'}),
            getDictList({parentKey: 'is_card_mail_address'}),
            getDictList({parentKey: 'credit_contacts_relation'}),
            getDictList({parentKey: 'work_belong_industry'}),
            getDictList({parentKey: 'work_company_property'}),
            getDictList({parentKey: 'main_income'}),
            getDictList({parentKey: 'position'}),
            getDictList({parentKey: 'work_profession'}),
            getDictList({parentKey: 'interest'}),
            getDictList({parentKey: 'car_frame_price_count'}),
            getDictList({parentKey: 'permanent_type'}),
            getDictList({parentKey: 'credit_user_relation'})
        ]).then(([
                     budgetOrdeBizTyper,
                     loanPeriod,
                     carTypeData,
                     genderData,
                     marryState,
                     education,
                     isCardMailAddress,
                     creditContactsRelation,
                     workBelongIndustry,
                     workCompanyProperty,
                     mainIncome,
                     position,
                     workProfession,
                     interest,
                     carFramePriceCount,
                     permanentType,
                     creditUserRelation
                 ]) => {
            this.setState({
                budgetOrdeBizTyper: dsctList(budgetOrdeBizTyper),
                loanPeriod: dsctList(loanPeriod),
                carTypeData: dsctList(carTypeData),
                genderData: dsctList(genderData),
                marryState: dsctList(marryState),
                education: dsctList(education),
                isCardMailAddress: dsctList(isCardMailAddress),
                creditContactsRelation: dsctList(creditContactsRelation),
                workBelongIndustry: dsctList(workBelongIndustry),
                workCompanyProperty: dsctList(workCompanyProperty),
                mainIncome: dsctList(mainIncome),
                position: dsctList(position),
                workProfession: dsctList(workProfession),
                interest: dsctList(interest),
                carFramePriceCount: dsctList(carFramePriceCount),
                permanentType: dsctList(permanentType),
                creditUserRelation: dsctList(creditUserRelation)
            });
        });
        getGpsAll().then(data => {
            if(Array.isArray(data)) {
                let gpsObj = {};
                data.forEach(item => {
                    gpsObj[item.code] = item.gpsDevNo;
                });
                queryGps(this.code).then(data => {
                    // gpsAzList
                    const gpsAzList = data.map(item => ({
                        code: item.code,
                        name: gpsObj[item.code],
                        azPhotos: PIC_PREFIX + item.azPhotos
                    }));
                    this.setState({
                        gpsAzList
                    });
                });
            };
        });
    }
    // 贷款人信息Tab效果
    getTag = (value) => {
        if (value === 'main') {
            this.setState({
                isMain: true,
                isCommon: false,
                isCommon02: false,
                isBack: false,
                isBack02: false
            });
        } else if (value === 'common') {
            this.setState({
                isMain: false,
                isCommon: true,
                isCommon02: false,
                isBack: false,
                isBack02: false
            });
        } else if (value === 'back') {
            this.setState({
                isMain: false,
                isCommon: false,
                isCommon02: false,
                isBack: true,
                isBack02: false
            });
        } else if (value === 'common02') {
            this.setState({
                isMain: false,
                isCommon: false,
                isCommon02: true,
                isBack: false,
                isBack02: false
            });
        } else if (value === 'back02') {
            this.setState({
                isMain: false,
                isCommon: false,
                isCommon02: false,
                isBack: false,
                isBack02: true
            });
        }
    }
    // 返回
    goBack = () => {
        this.props.history.go(-1);
    };
    render() {
        const {
            isMain,
            isCommon,
            isCommon02,
            isBack,
            isBack02,
            headInfo,
            creditUserList1,
            creditUserList2,
            creditUserList202,
            creditUserList3,
            creditUserList302,
            attachments,
            creditUser,
            bankLoan,
            costSettlement,
            carInfo,
            education,
            cityList,
            hkBookFirstPage,
            bankJourFirstPage,
            zfbJour,
            wxJour,
            otherPdf,
            carHead,
            carRegisterCertificateFirst,
            gpsAzList,
            shopCarGarage,
            saleUserName
        } = this.state;
        return (
            <div style={{background: '#fff'}}>
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
                            <Col span={12}>业务发生地：{findDsct(cityList, parseInt(headInfo.region))}</Col>
                        </Row>
                        <Row style={{marginTop: '32px'}}>
                            <Col span={12}>业务员：{saleUserName}</Col>
                            <Col span={12}>汽车经销商：{shopCarGarage}</Col>
                        </Row>
                        <Row style={{marginTop: '32px'}}>
                            <Col span={12}>购车途径：{headInfo.bizType}</Col>
                            <Col span={12}>品牌：{carInfo ? carInfo.carBrandName : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '32px'}}>
                            <Col span={12}>车系：{carInfo ? carInfo.carSeriesName : ''}</Col>
                            <Col span={12}>车型：{carInfo ? carInfo.carModelName : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '32px'}}>
                            <Col span={12}>上牌地：{headInfo.regAddress}</Col>
                            <Col span={12}>公里数（万）：{headInfo.mile}</Col>
                        </Row>
                        <Row style={{marginTop: '32px'}}>
                            <Col span={12}>
                                <span className="preLoan-body-title" style={{width: '300px'}}>评估报告：<a target="_blank" href={headInfo.secondCarReport}>点击进入评估报告</a></span>
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
                            <Col span={2}
                                 className={isMain ? 'preLoan-body-table-content-tab-in' : 'preLoan-body-table-content-tab-out'}
                                 onClick={() => this.getTag('main')}>主贷人信息</Col>
                            {
                                JSON.stringify(creditUserList2) !== '{}' ? (
                                    <Col span={2}
                                         className={isCommon ? 'preLoan-body-table-content-tab-in' : 'preLoan-body-table-content-tab-out'}
                                         style={{marginLeft: '20px'}} onClick={() => this.getTag('common')}>共还人1</Col>
                                ) : null
                            }
                            {
                                JSON.stringify(creditUserList202) !== '{}' ? (
                                    <Col span={2}
                                         className={isCommon02 ? 'preLoan-body-table-content-tab-in' : 'preLoan-body-table-content-tab-out'}
                                         style={{marginLeft: '20px'}} onClick={() => this.getTag('common02')}>共还人2</Col>
                                ) : null
                            }
                            {
                                JSON.stringify(creditUserList3) !== '{}' ? (
                                    <Col span={2}
                                         className={isBack ? 'preLoan-body-table-content-tab-in' : 'preLoan-body-table-content-tab-out'}
                                         style={{marginLeft: '20px'}} onClick={() => this.getTag('back')}>反担保人1</Col>
                                ) : null
                            }
                            {
                                JSON.stringify(creditUserList302) !== '{}' ? (
                                    <Col span={2}
                                         className={isBack02 ? 'preLoan-body-table-content-tab-in' : 'preLoan-body-table-content-tab-out'}
                                         style={{marginLeft: '20px'}} onClick={() => this.getTag('back02')}>反担保人2</Col>
                                ) : null
                            }
                        </Row>
                        {
                            isMain ? (
                                <div>
                                    <Row style={{marginTop: '28px'}}>
                                        <Col span={4}>
                                            <img src={PIC_PREFIX + findDsct(attachments, 'id_no_front_apply')}
                                                 className="preLoan-body-table-content-tab-card"/>
                                        </Col>
                                        <Col span={4} style={{marginLeft: '60px'}}>
                                            <img src={PIC_PREFIX + findDsct(attachments, 'id_no_reverse_apply')}
                                                 className="preLoan-body-table-content-tab-card"/>
                                        </Col>
                                        <Col span={4} style={{marginLeft: '60px'}}>
                                            <img src={PIC_PREFIX + findDsct(attachments, 'hold_id_card_apply')}
                                                 className="preLoan-body-table-content-tab-card"/>
                                        </Col>
                                        <Col span={8}></Col>
                                    </Row>
                                    <Row style={{marginTop: '34px'}}>
                                        <Col span={12}>姓名：{creditUserList1 ? creditUserList1.userName : ''}</Col>
                                        <Col span={12}>性别：{creditUserList1 ? creditUserList1.gender : ''}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>民族：{creditUserList1 ? creditUserList1.nation : ''}</Col>
                                        <Col span={12}>出生日期：{creditUserList1 ? creditUserList1.customerBirth : ''}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>签证机关：{creditUserList1 ? creditUserList1.authref : ''}</Col>
                                        <Col span={12}>户籍地：{creditUserList1 ? creditUserList1.birthAddress : ''}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col
                                            span={12}>有效截止日：{creditUserList1 ? creditUserList1.startDate : ''}至{creditUserList1 ? creditUserList1.statdate : ''}</Col>
                                        <Col span={12}>身份证号：{creditUserList1 ? creditUserList1.idNo : ''}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>手机号：{creditUserList1 ? creditUserList1.mobile : ''}</Col>
                                        <Col
                                            span={12}>征信结果：{creditUserList1 ? (creditUserList1.bankCreditResult === '0' ? '不通过' : '通过') : ''}</Col>
                                    </Row>
                                </div>
                            ) : null
                        }
                        {
                            isCommon ? (
                                <div>
                                    <Row style={{marginTop: '28px'}}>
                                        <Col span={4}>
                                            <img
                                                src={findDsct(attachments, 'id_no_front_gh') === '' ? zanwu : PIC_PREFIX + findDsct(attachments, 'id_no_front_gh')}
                                                className="preLoan-body-table-content-tab-card"/>
                                        </Col>
                                        <Col span={4} style={{marginLeft: '60px'}}>
                                            <img
                                                src={findDsct(attachments, 'id_no_reverse_gh') === '' ? zanwu : PIC_PREFIX + findDsct(attachments, 'id_no_reverse_gh')}
                                                className="preLoan-body-table-content-tab-card"/>
                                        </Col>
                                        <Col span={4} style={{marginLeft: '60px'}}>
                                            <img
                                                src={findDsct(attachments, 'hold_id_card_gh') === '' ? zanwu : PIC_PREFIX + findDsct(attachments, 'hold_id_card_gh')}
                                                className="preLoan-body-table-content-tab-card"/>
                                        </Col>
                                        <Col span={8}></Col>
                                    </Row>
                                    <Row style={{marginTop: '34px'}}>
                                        <Col span={12}>姓名：{creditUserList2 ? creditUserList2.userName : ''}</Col>
                                        <Col span={12}>性别：{creditUserList2 ? creditUserList2.gender : ''}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>民族：{creditUserList2 ? creditUserList2.nation : ''}</Col>
                                        <Col span={12}>出生日期：{creditUserList2 ? creditUserList2.customerBirth : ''}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>签证机关：{creditUserList2 ? creditUserList2.authref : ''}</Col>
                                        <Col span={12}>户籍地：{creditUserList2 ? creditUserList2.birthAddress : ''}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col
                                            span={12}>有效截止日：{creditUserList2 ? creditUserList2.startDate : ''}至{creditUserList2 ? creditUserList2.statdate : ''}</Col>
                                        <Col span={12}>身份证号：{creditUserList2 ? creditUserList2.idNo : ''}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>手机号：{creditUserList2 ? creditUserList2.mobile : ''}</Col>
                                        <Col
                                            span={12}>征信结果：{creditUserList2 ? (creditUserList2.bankCreditResult === '0' ? '不通过' : '通过') : ''}</Col>
                                    </Row>
                                </div>
                            ) : null
                        }
                        {
                            isCommon02 ? (
                                <div>
                                    <Row style={{marginTop: '28px'}}>
                                        <Col span={4}>
                                            <img
                                                src={findDsct(attachments, 'id_no_front_gh1') === '' ? zanwu : PIC_PREFIX + findDsct(attachments, 'id_no_front_gh1')}
                                                className="preLoan-body-table-content-tab-card"/>
                                        </Col>
                                        <Col span={4} style={{marginLeft: '60px'}}>
                                            <img
                                                src={findDsct(attachments, 'id_no_reverse_gh1') === '' ? zanwu : PIC_PREFIX + findDsct(attachments, 'id_no_reverse_gh1')}
                                                className="preLoan-body-table-content-tab-card"/>
                                        </Col>
                                        <Col span={4} style={{marginLeft: '60px'}}>
                                            <img
                                                src={findDsct(attachments, 'hold_id_card_gh1') === '' ? zanwu : PIC_PREFIX + findDsct(attachments, 'hold_id_card_gh1')}
                                                className="preLoan-body-table-content-tab-card"/>
                                        </Col>
                                        <Col span={8}></Col>
                                    </Row>
                                    <Row style={{marginTop: '34px'}}>
                                        <Col span={12}>姓名：{creditUserList202 ? creditUserList202.userName : ''}</Col>
                                        <Col span={12}>性别：{creditUserList202 ? creditUserList202.gender : ''}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>民族：{creditUserList202 ? creditUserList202.nation : ''}</Col>
                                        <Col
                                            span={12}>出生日期：{creditUserList202 ? creditUserList202.customerBirth : ''}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>签证机关：{creditUserList202 ? creditUserList202.authref : ''}</Col>
                                        <Col
                                            span={12}>户籍地：{creditUserList202 ? creditUserList202.birthAddress : ''}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col
                                            span={12}>有效截止日：{creditUserList202 ? creditUserList202.startDate : ''}至{creditUserList202 ? creditUserList202.statdate : ''}</Col>
                                        <Col span={12}>身份证号：{creditUserList202 ? creditUserList202.idNo : ''}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>手机号：{creditUserList202 ? creditUserList202.mobile : ''}</Col>
                                        <Col
                                            span={12}>征信结果：{creditUserList202 ? (creditUserList202.bankCreditResult === '0' ? '不通过' : '通过') : ''}</Col>
                                    </Row>
                                </div>
                            ) : null
                        }
                        {
                            isBack ? (
                                <div>
                                    <Row style={{marginTop: '28px'}}>
                                        <Col span={4}>
                                            <img
                                                src={findDsct(attachments, 'id_no_front_gua') === '' ? zanwu : PIC_PREFIX + findDsct(attachments, 'id_no_front_gua')}
                                                className="preLoan-body-table-content-tab-card"/>
                                        </Col>
                                        <Col span={4} style={{marginLeft: '60px'}}>
                                            <img
                                                src={findDsct(attachments, 'id_no_reverse_gua') === '' ? zanwu : PIC_PREFIX + findDsct(attachments, 'id_no_reverse_gua')}
                                                className="preLoan-body-table-content-tab-card"/>
                                        </Col>
                                        <Col span={4} style={{marginLeft: '60px'}}>
                                            <img
                                                src={findDsct(attachments, 'hold_id_card_gua') === '' ? zanwu : PIC_PREFIX + findDsct(attachments, 'hold_id_card_gua')}
                                                className="preLoan-body-table-content-tab-card"/>
                                        </Col>
                                        <Col span={8}></Col>
                                    </Row>
                                    <Row style={{marginTop: '34px'}}>
                                        <Col span={12}>姓名：{creditUserList3 ? creditUserList3.userName : ''}</Col>
                                        <Col span={12}>性别：{creditUserList3 ? creditUserList3.gender : ''}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>民族：{creditUserList3 ? creditUserList3.nation : ''}</Col>
                                        <Col span={12}>出生日期：{creditUserList3.customerBirth}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>签证机关：{creditUserList3 ? creditUserList3.authref : ''}</Col>
                                        <Col span={12}>户籍地：{creditUserList3 ? creditUserList3.birthAddress : ''}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col
                                            span={12}>有效截止日：{creditUserList3 ? creditUserList3.startDate : ''}至{creditUserList3 ? creditUserList3.statdate : ''}</Col>
                                        <Col span={12}>身份证号：{creditUserList3 ? creditUserList3.idNo : ''}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>手机号：{creditUserList3 ? creditUserList3.mobile : ''}</Col>
                                        <Col
                                            span={12}>征信结果：{creditUserList3 ? (creditUserList3.bankCreditResult === '0' ? '不通过' : '通过') : ''}</Col>
                                    </Row>
                                </div>
                            ) : null
                        }
                        {
                            isBack02 ? (
                                <div>
                                    <Row style={{marginTop: '28px'}}>
                                        <Col span={4}>
                                            <img
                                                src={findDsct(attachments, 'id_no_front_gua1') === '' ? zanwu : PIC_PREFIX + findDsct(attachments, 'id_no_front_gua1')}
                                                className="preLoan-body-table-content-tab-card"/>
                                        </Col>
                                        <Col span={4} style={{marginLeft: '60px'}}>
                                            <img
                                                src={findDsct(attachments, 'id_no_reverse_gua1') === '' ? zanwu : PIC_PREFIX + findDsct(attachments, 'id_no_reverse_gua1')}
                                                className="preLoan-body-table-content-tab-card"/>
                                        </Col>
                                        <Col span={4} style={{marginLeft: '60px'}}>
                                            <img
                                                src={findDsct(attachments, 'hold_id_card_gua1') === '' ? zanwu : PIC_PREFIX + findDsct(attachments, 'hold_id_card_gua1')}
                                                className="preLoan-body-table-content-tab-card"/>
                                        </Col>
                                        <Col span={8}></Col>
                                    </Row>
                                    <Row style={{marginTop: '34px'}}>
                                        <Col span={12}>姓名：{creditUserList302 ? creditUserList302.userName : ''}</Col>
                                        <Col span={12}>性别：{creditUserList302 ? creditUserList302.gender : ''}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>民族：{creditUserList302 ? creditUserList302.nation : ''}</Col>
                                        <Col
                                            span={12}>出生日期：{creditUserList302 ? creditUserList302.customerBirth : ''}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>签证机关：{creditUserList302 ? creditUserList302.authref : ''}</Col>
                                        <Col
                                            span={12}>户籍地：{creditUserList302 ? creditUserList302.birthAddress : ''}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col
                                            span={12}>有效截止日：{creditUserList302 ? creditUserList302.startDate : ''}至{creditUserList302 ? creditUserList302.statdate : ''}</Col>
                                        <Col span={12}>身份证号：{creditUserList302 ? creditUserList302.idNo : ''}</Col>
                                    </Row>
                                    <Row style={{marginTop: '16px'}}>
                                        <Col span={12}>手机号：{creditUserList302 ? creditUserList302.mobile : ''}</Col>
                                        <Col
                                            span={12}>征信结果：{creditUserList302 ? (creditUserList302.bankCreditResult === '0' ? '不通过' : '通过') : ''}</Col>
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
                            <Col span={12}>教育程度：{creditUserList1 ? creditUserList1.educationeName : ''}</Col>
                            <Col span={12}>现住地址：{creditUser ? creditUser.nowAddress : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>婚姻状态：{creditUserList1 ? creditUserList1.marryStateName : ''}</Col>
                            <Col span={12}>住房类型：{creditUserList1 ? creditUserList1.nowHouseTypeName : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>工作单位：{creditUser ? creditUser.companyName : ''}</Col>
                            <Col span={12}>单位地址：{creditUser ? creditUser.companyAddress : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>职业：{creditUser ? creditUser.position : ''}</Col>
                            <Col
                                span={12}>年收入：{creditUser ? (creditUser.yearIncome ? creditUser.yearIncome : '') : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>现职年数：{creditUser ? creditUser.presentJobYears : ''}年</Col>
                            <Col span={12}>常住类型：{creditUserList1 ? creditUserList1.permanentTypeName : ''}</Col>
                        </Row>
                        <div className="preLoan-detail-row-line"></div>
                        <span className="preLoan-body-tag">共还人1信息</span>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>姓名：{creditUserList2 ? creditUserList2.userName : ''}</Col>
                            <Col span={12}>身份证号：{creditUserList2 ? creditUserList2.idNo : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>手机号：{creditUserList2 ? creditUserList2.mobile : ''}</Col>
                            <Col span={12}>职业：{creditUserList2 ? creditUserList2.position : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>工作单位：{creditUserList2 ? creditUserList2.companyName : ''}</Col>
                            <Col span={12}>单位地址：{creditUserList2 ? creditUserList2.companyAddress : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>现住地址：{creditUserList2 ? creditUserList2.nowAddress : ''}</Col>
                            <Col span={12}></Col>
                        </Row>
                        <div className="preLoan-detail-row-line"></div>
                        <span className="preLoan-body-tag">共还人2信息</span>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>姓名：{creditUserList202 ? creditUserList202.userName : ''}</Col>
                            <Col span={12}>身份证号：{creditUserList202 ? creditUserList202.idNo : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>手机号：{creditUserList202 ? creditUserList202.mobile : ''}</Col>
                            <Col span={12}>职业：{creditUserList202 ? creditUserList202.position : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>工作单位：{creditUserList202 ? creditUserList202.companyName : ''}</Col>
                            <Col span={12}>单位地址：{creditUserList202 ? creditUserList202.companyAddress : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>现住地址：{creditUserList202 ? creditUserList202.nowAddress : ''}</Col>
                            <Col span={12}></Col>
                        </Row>
                        <div className="preLoan-detail-row-line"></div>
                        <span className="preLoan-body-tag">反担保人1信息</span>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>姓名：{creditUserList3 ? creditUserList3.userName : ''}</Col>
                            <Col span={12}>身份证号：{creditUserList3 ? creditUserList3.idNo : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>手机号：{creditUserList3 ? creditUserList3.mobile : ''}</Col>
                            <Col span={12}>职业：{creditUserList3 ? creditUserList3.position : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>工作单位：{creditUserList3 ? creditUserList3.companyName : ''}</Col>
                            <Col span={12}>单位地址：{creditUserList3 ? creditUserList3.companyAddress : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>现住地址：{creditUserList3 ? creditUserList3.nowAddress : ''}</Col>
                            <Col span={12}></Col>
                        </Row>
                        <div className="preLoan-detail-row-line"></div>
                        <span className="preLoan-body-tag">反担保人2信息</span>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>姓名：{creditUserList302 ? creditUserList302.userName : ''}</Col>
                            <Col span={12}>身份证号：{creditUserList302 ? creditUserList302.idNo : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>手机号：{creditUserList302 ? creditUserList302.mobile : ''}</Col>
                            <Col span={12}>职业：{creditUserList302 ? creditUserList302.position : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>工作单位：{creditUserList302 ? creditUserList302.companyName : ''}</Col>
                            <Col span={12}>单位地址：{creditUserList302 ? creditUserList302.companyAddress : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>现住地址：{creditUserList302 ? creditUserList302.nowAddress : ''}</Col>
                            <Col span={12}></Col>
                        </Row>
                        <div className="preLoan-detail-row-line"></div>
                        <span className="preLoan-body-tag">紧急联系人</span>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>姓名：{creditUser ? creditUser.emergencyName1 : ''}</Col>
                            <Col
                                span={12}>与主贷人关系：{creditUserList1 ? creditUserList1.setEmergencyRelation1Name : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>联系电话：{creditUser ? creditUser.emergencyMobile1 : ''}</Col>
                            <Col span={12}></Col>
                        </Row>
                        <div className="preLoan-detail-row-line"></div>
                        <span className="preLoan-body-tag">紧急联系人</span>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>姓名：{creditUser ? creditUser.emergencyName2 : ''}</Col>
                            <Col
                                span={12}>与主贷人关系：{creditUserList1 ? creditUserList1.setEmergencyRelation2Name : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={12}>联系电话：{creditUser ? creditUser.emergencyMobile2 : ''}</Col>
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
                            <Col span={8}>贷款本金：{bankLoan ? bankLoan.loanAmount / 1000 : ''}</Col>
                            <Col span={8}>贷款期限：{bankLoan ? bankLoan.periods : ''}期</Col>
                            <Col span={8}>银行利率：{bankLoan ? (Math.floor(bankLoan.bankRate * 10e6) / 10e4).toFixed(4) : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={8}>总利率：{bankLoan ? (Math.floor(bankLoan.totalRate * 10e6) / 10e4).toFixed(4) : ''}</Col>
                            <Col span={8}>车款2利率：{bankLoan ? (Math.floor(bankLoan.rebateRate * 10e6) / 10e4).toFixed(4) : ''}</Col>
                            <Col span={8}>服务费：{bankLoan ? bankLoan.fee / 1000 : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={8}>利率类型：{bankLoan ? (bankLoan.rateType === '1' ? '传统' : '直客') : ''}</Col>
                            <Col span={8}>是否垫资：{bankLoan ? (bankLoan.isAdvanceFund === '0' ? '否' : '是') : ''}</Col>
                            <Col span={8}>是否贴息：{bankLoan ? (bankLoan.isDiscount === '0' ? '否' : '是') : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={8}>贴息利率：{bankLoan ? (Math.floor(bankLoan.discountRate * 10e6) / 10e4).toFixed(4) : ''}</Col>
                            <Col span={8}>贴息金额：{bankLoan ? bankLoan.discountAmount / 1000 : ''}</Col>
                            <Col span={8}>贷款成数：{bankLoan ? bankLoan.loanRatio : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={8}>万元系数：{bankLoan ? bankLoan.wanFactor : ''}</Col>
                            <Col span={8}>月供：{bankLoan ? bankLoan.monthAmount / 1000 : ''}</Col>
                            <Col span={8}>首月还款额：{bankLoan ? bankLoan.repayFirstMonthAmount / 1000 : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={8}>高抛金额：{bankLoan ? bankLoan.highCashAmount / 1000 : ''}</Col>
                            <Col span={8}>贷款总额：{bankLoan ? bankLoan.totalFee / 1000 : ''}</Col>
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
                            <Col
                                span={8}>担保风险金：{costSettlement ? costSettlement.fxAmount ? costSettlement.fxAmount / 1000 : '' : ''}</Col>
                            <Col
                                span={8}>履约押金：{costSettlement ? costSettlement.lyDeposit ? costSettlement.lyDeposit / 1000 : '' : ''}</Col>
                            <Col
                                span={8}>车款2金额：{costSettlement ? costSettlement.repointAmount ? costSettlement.repointAmount / 1000 : '' : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col
                                span={8}>GPS费：{costSettlement ? costSettlement.gpsFee ? costSettlement.gpsFee / 1000 : '' : ''}</Col>
                            <Col
                                span={8}>其他费用：{costSettlement ? costSettlement.otherFee ? costSettlement.otherFee / 1000 : '' : ''}</Col>
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
                            <Col span={12}>是否公牌：{carInfo ? carInfo.isPublicCard === 0 ? '否' : '是' : ''}</Col>
                            <Col span={12}>发动机号：{carInfo ? carInfo.carEngineNo : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>上牌地：{carInfo ? carInfo.regAddress : ''}</Col>
                            <Col span={12}>购车车行：{carInfo
                                ? carInfo.shopCarGarageName : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>车辆型号：{carInfo ? carInfo.model : ''}</Col>
                            <Col span={12}>车辆价格：{carInfo ? carInfo.carPrice : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>发票价格：{carInfo ? carInfo.invoicePrice : ''}</Col>
                            <Col span={12}>车架号：{carInfo ? carInfo.carFrameNo : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>车牌号：{carInfo ? carInfo.carNumber : ''}</Col>
                            <Col span={12}>评估价格：{carInfo ? carInfo.evalPrice : ''}</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>上牌年份：{carInfo ? carInfo.regDate : ''}</Col>
                            <Col span={12}>行驶里程：{carInfo ? carInfo.mile : ''}公里</Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={12}>是否加装GPS：{carInfo ? carInfo.isAzGps === '0' ? '否' : '是' : ''}</Col>
                        </Row>
                        {
                            carInfo && carInfo.isAzGps === '1' && gpsAzList.map(item => (
                                <Row key={item.code} style={{marginTop: '34px'}}>
                                    <Col span={12}>GPS：{item.name}</Col>
                                    <Col span={12}>
                                        GPS图片：
                                        <img
                                            src={item.azPhotos}
                                            className="preLoan-body-table-content-tab-card"/>
                                    </Col>
                                </Row>
                            ))
                        }
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
                                <br/>
                                <img
                                    src={findDsct(attachments, 'drive_card') === '' ? zanwu : PIC_PREFIX + findDsct(attachments, 'drive_card')}
                                    className="preLoan-body-table-content-tab-card"/>
                            </Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                        </Row>
                        <div className="preLoan-detail-row-line"></div>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={6}>
                                <span>结婚证</span>
                                <br/>
                                <img
                                    src={findDsct(attachments, 'marry_pdf') === '' ? zanwu : PIC_PREFIX + findDsct(attachments, 'marry_pdf')}
                                    className="preLoan-body-table-content-tab-card"/>
                            </Col>
                            <Col span={6}>
                                <span>离婚证</span>
                                <br/>
                                <img
                                    src={findDsct(attachments, 'divorce_pdf') === '' ? zanwu : PIC_PREFIX + findDsct(attachments, 'divorce_pdf')}
                                    className="preLoan-body-table-content-tab-card"/>
                            </Col>
                            <Col span={6}>
                                <span>单身证明</span>
                                <br/>
                                <img
                                    src={findDsct(attachments, 'single_prove') === '' ? zanwu : PIC_PREFIX + findDsct(attachments, 'single_prove')}
                                    className="preLoan-body-table-content-tab-card"/>
                            </Col>
                            <Col span={6}>
                                <span>收入证明</span>
                                <br/>
                                <img
                                    src={findDsct(attachments, 'income_prove') === '' ? zanwu : PIC_PREFIX + findDsct(attachments, 'income_prove')}
                                    className="preLoan-body-table-content-tab-card"/>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={24}>
                                <span>户口本</span>
                                <br/>
                                {
                                    hkBookFirstPage.map(item => (
                                        <img
                                            key={item.url}
                                            src={item.url}
                                            className="preLoan-body-table-content-tab-card" style={{marginRight: '20px', 'marginBottom': '20px'}}
                                        />
                                    ))
                                }
                            </Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={6}>
                                <span>居住证</span>
                                <br/>
                                <img
                                    src={findDsct(attachments, 'live_prove_pdf') === '' ? zanwu : PIC_PREFIX + findDsct(attachments, 'live_prove_pdf')}
                                    className="preLoan-body-table-content-tab-card"/>
                            </Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                        </Row>
                        <div className="preLoan-detail-row-line"></div>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={24}>
                                <span>银行流水</span>
                                <br/>
                                {
                                    bankJourFirstPage.map(item => (
                                        <img
                                            key={item.url}
                                            src={item.url}
                                            className="preLoan-body-table-content-tab-card"
                                            style={{marginRight: '20px', 'marginBottom': '20px'}}
                                        />
                                    ))
                                }
                            </Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={24}>
                                <span>支付宝流水</span>
                                <br/>
                                {
                                    zfbJour.map(item => (
                                        <img
                                            key={item.url}
                                            src={item.url}
                                            className="preLoan-body-table-content-tab-card"
                                            style={{marginRight: '20px', 'marginBottom': '20px'}}
                                        />
                                    ))
                                }
                            </Col>
                        </Row>
                        <div className="preLoan-detail-row-line"></div>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={24}>
                                <span>微信流水</span>
                                <br/>
                                {
                                    wxJour.map(item => (
                                        <img
                                            key={item.url}
                                            src={item.url}
                                            className="preLoan-body-table-content-tab-card"
                                            style={{marginRight: '20px', 'marginBottom': '20px'}}
                                        />
                                    ))
                                }
                            </Col>
                        </Row>
                        <div className="preLoan-detail-row-line"></div>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={24}>
                                <span>其他</span>
                                <br/>
                                {
                                    otherPdf.map(item => (
                                        <img
                                            key={item.url}
                                            src={item.url}
                                            className="preLoan-body-table-content-tab-card"
                                            style={{marginRight: '20px', 'marginBottom': '20px'}}
                                        />
                                    ))
                                }
                            </Col>
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
                                <br/>
                                <img
                                    src={findDsct(attachments, 'door_photo') === '' ? zanwu : PIC_PREFIX + findDsct(attachments, 'door_photo')}
                                    className="preLoan-body-table-content-tab-card"/>
                            </Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                        </Row>
                        <div className="preLoan-detail-row-line"></div>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={6}>
                                <span>合照</span>
                                <br/>
                                <img
                                    src={findDsct(attachments, 'group_photo') === '' ? zanwu : PIC_PREFIX + findDsct(attachments, 'group_photo')}
                                    className="preLoan-body-table-content-tab-card"/>
                            </Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                        </Row>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={6}>
                                <span>家访视频</span>
                                <br/>
                                <div><a
                                    src={findDsct(attachments, 'house_video') === '' ? zanwu : PIC_PREFIX + findDsct(attachments, 'house_video')}>点击家访视频</a>
                                </div>
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
                            <Col span={24}>
                                {
                                    carHead.map(item => (
                                        <img
                                            key={item.url}
                                            src={item.url}
                                            className="preLoan-body-table-content-tab-card"
                                            style={{marginRight: '20px', 'marginBottom': '20px'}}
                                        />
                                    ))
                                }
                            </Col>
                        </Row>
                        <div className="preLoan-detail-row-line"></div>
                        <Row style={{marginTop: '34px'}}>
                            <Col span={24}>
                                <span>车辆登记证书</span>
                                <br/>
                                {
                                    carRegisterCertificateFirst.map(item => (
                                        <img
                                            key={item.url}
                                            src={item.url}
                                            className="preLoan-body-table-content-tab-card"
                                            style={{marginRight: '20px', 'marginBottom': '20px'}}
                                        />
                                    ))
                                }
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default preloanAccessDetail;
