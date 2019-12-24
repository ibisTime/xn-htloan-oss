import React from 'react';
import {
    dsctImgList,
    dsctList,
    findDsct,
    getNowTime,
    getQueryString,
    getUserId,
    showSucMsg,
    showWarnMsg
} from 'common/js/util';
import {
    Button,
    Col,
    DatePicker,
    Icon,
    Input,
    message,
    Modal,
    Row,
    Select,
    Upload
} from 'antd';
import {getDictList} from 'api/dict';
import './preloanAccess.css';
import moment from 'moment';
import zanwu from './zanwu1.png';
import {AreaCascader} from 'react-area-linkage';
import {pcaa} from 'area-data';
import {
    accessInfoSend,
    accessSlipDetail,
    baseDsInfoLs,
    brandMng,
    calculateMonthly,
    carBuyingList,
    cardPositiveLs,
    cardReverseSideLs,
    carDsInfoLs,
    carImgInfoLs,
    carTypeMng,
    costSettlementInfoLs,
    findCarType,
    findSalesmanList,
    getCityList,
    getGps,
    getQiNiu,
    installationGps,
    investigationImgInfoLs,
    lenderInfoLs,
    loanBanksList,
    materialDsInfoLs,
    preLoanInfoLs,
    queryGps,
    sendCreditReportingLs,
    sendPjPost
} from '../../api/preLoan.js';
import {PIC_PREFIX, UPLOAD_URL} from '../../common/js/config.js';
import 'react-area-linkage/dist/index.css';

const { Option } = Select;
const { MonthPicker } = DatePicker;
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
let timeout;
let currentValue;
function fetch(value, callback) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    function fake() {
        const datas = [];
        brandMng(1, 1, value).then(data => {
            for(let i = 0; i < data.length; i++) {
                datas.push({
                    value: data[i].code,
                    text: data[i].name
                });
            }
            callback(datas);
        });
    }
    timeout = setTimeout(fake, 300);
}
function fetch2(value, callback) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    function fake() {
        const datas = [];
        brandMng(1, 1, value).then(data => {
            for(let i = 0; i < data.length; i++) {
                datas.push({
                    value: data[i].code,
                    text: data[i].name
                });
            }
            callback(datas);
        });
    }
    timeout = setTimeout(fake, 300);
}
class preloanAccess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data2: [],
            // 贷款人信息Tab状态
            isHideGpsAz: false,
            isMain: true,
            isCommon: false,
            isCommon02: false,
            isCommon02Vis: false,
            isBack: false,
            isBack02: false,
            isBack02Vis: false,
            // 贷款信息Tab状态
            isLoanPpInfo: true,
            isBaseInfo: false,
            isLoanInfo: false,
            isCostSettlement: false,
            isCarInfo: false,
            isMaterialInfo: false,
            isInvestigation: false,
            isCarImg: false,
            // 是否显示品牌、车系、车型
            isShowCarGroup: false,
            gpsList: [],
            gpsAzList: [],
            // 发起征信
            sendCreditReporting: {
                operator: getUserId(),
                loanBankCode: '',
                region: '',
                bizType: '',
                regAddress: '',
                mile: '',
                secondCarReport: '',
                carBrand: '',
                carSeries: '',
                carModel: ''
            },
            loanBankCode: '',
            brandCode: '',
            seriesCode: '',
            carCode: '',
            bizType: '',
            // 贷款人信息
            lenderInfo: {
                code: '',
                operator: '',
                creditUserList: {
                    userName: '',
                    loanRole: '',
                    gender: '',
                    nation: '',
                    idNo: '',
                    customerBirth: '',
                    birthAddress: '',
                    authref: '',
                    statdate: '',
                    mobile: '',
                    bankCreditResult: '',
                    idFront: '',
                    idReverse: '',
                    holdIdCardPdf: ''
                }
            },
            zXjg1: '',
            zXjg2: '',
            zXjg3: '',
            fileList1: [],
            fileList2: [],
            fileList3: [],
            previewVisible: false,
            previewImage: '',
            previewVisible2: false,
            previewImage2: '',
            previewVisible3: false,
            previewImage3: '',
            fileListG1: [],
            fileListG2: [],
            fileListG3: [],
            fileListG102: [],
            fileListG202: [],
            fileListG302: [],
            previewVisibleG: false,
            previewVisibleG02: false,
            previewImageG: '',
            previewImageG02: '',
            previewVisibleG202: false,
            previewImageG2: '',
            previewImageG202: '',
            previewVisibleG302: false,
            previewImageG3: '',
            previewImageG302: '',
            cardZ: {},
            cardF: {},
            cardZTwo: {},
            cardFTwo: {},
            cardZTwo02: {},
            cardFTwo02: {},
            fileListB1: [],
            fileListB2: [],
            fileListB3: [],
            fileListB102: [],
            fileListB202: [],
            fileListB302: [],
            previewVisibleB: false,
            previewVisibleB02: false,
            previewImageB: '',
            previewImageB02: '',
            previewVisibleB2: false,
            previewVisibleB202: false,
            previewImageB2: '',
            previewImageB202: '',
            previewVisibleB3: false,
            previewVisibleB302: false,
            previewImageB3: '',
            previewImageB302: '',
            cardZThree: {},
            cardFThree: {},
            cardZThree02: {},
            cardFThree02: {},
            // 基本信息
            baseInfo: {
                code: '',
                operator: '',
                creditUserList: {
                    code: '',
                    loanRole: '',
                    education: '',
                    nowAddressProvince: '',
                    nowAddressCity: '',
                    nowAddressArea: '',
                    nowAddress: '',
                    marryState: '',
                    nowHouseType: '',
                    companyName: '',
                    companyProvince: '',
                    companyCity: '',
                    companyArea: '',
                    companyAddress: '',
                    position: '',
                    yearIncome: '',
                    currentPostYears: '',
                    permanentType: '',
                    emergencyName1: '',
                    emergencyRelation1: '',
                    emergencyMobile1: '',
                    emergencyName2: '',
                    emergencyRelation2: '',
                    emergencyMobile2: '',
                    localBirthAddress: '',
                    localResidencePermit: '',
                    presentJobYears: ''
                }
            },
            // 共还人与主贷关系
            ghyzdgx1: '',
            ghyzdgx2: '',
            // 担保人与主贷关系
            dbryzdgx1: '',
            dbryzdgx2: '',
            // 贷款信息
            loanInfo: {
                code: '',
                loanAmount: '',
                periods: '',
                bankRate: '',
                totalRate: '',
                rebateRate: '',
                fee: '',
                rateType: '',
                isAdvanceFund: '',
                isDiscount: '',
                discountRate: '',
                discountAmount: '',
                loanRatio: '',
                wanFactor: '',
                monthAmount: '',
                firstRepayAmount: '',
                highCashAmount: '',
                totalFee: '',
                customerBearRate: '',
                surchargeRate: '',
                surchargeAmount: ''
            },
            loanInfoArrIpt: {
                loanAmount: '',
                periods: '',
                bankRate: '',
                totalRate: '',
                rebateRate: '',
                fee: '',
                discountRate: '',
                discountAmount: '',
                loanRatio: '',
                wanFactor: '',
                monthAmount: '',
                repayFirstMonthAmount: '',
                openCardAmount: '',
                highCashAmount: '',
                totalFee: '',
                customerBearRate: '',
                surchargeRate: '',
                surchargeAmount: '',
                notes: ''
            },
            loanIptArr: {
                bankCreditResult: '',
                mobile: '',
                bankCreditResult2: '',
                mobile2: '',
                bankCreditResult3: '',
                mobile3: '',
                bankCreditResultRemark: '',
                bankCreditResultRemark2: '',
                bankCreditResultRemark3: ''
            },
            errorInfo: {
                mobile: '格式错误'
            },
            // 主贷人选择框信息
            permanentResidenceCode: '',
            housingTypeCode: '',
            marriageStatusCode: '',
            edtCode: '',
            mainLoanPpIptArr: {
                emergencyMobile2: '',
                emergencyRelation2: '',
                emergencyName2: '',
                emergencyMobile1: '',
                emergencyRelation1: '',
                emergencyName1: '',
                presentJobYears: '',
                yearIncome: '',
                position: '',
                companyAddress: '',
                companyName: '',
                nowAddress: '',
                nowAddressMobile: '',
                nowAddressDate: '',
                nowAddressState: '',
                workCompanyProperty: '',
                workDatetime: '',
                nowAddressProvince: '',
                nowAddressCity: '',
                nowAddressArea: '',
                companyProvince: '',
                companyCity: '',
                companyArea: ''
            },
            altogetherPpIptArr: {
                companyName: '',
                position: '',
                nowAddress: '',
                companyAddress: ''
            },
            altogetherPpIptArr02: {
                companyName: '',
                position: '',
                nowAddress: '',
                companyAddress: ''
            },
            bkGuaranteePpArr: {
                companyName: '',
                position: '',
                nowAddress: '',
                companyAddress: ''
            },
            bkGuaranteePpArr02: {
                companyName: '',
                position: '',
                nowAddress: '',
                companyAddress: ''
            },
            // 费用结算
            costSettlementInfo: {
                code: '',
                fxAmount: '',
                lyDeposit: '',
                repointAmount: '',
                gpsFee: '',
                otherFee: ''
            },
            costSettlementInfoArrIpt: {
                fxAmount: '',
                lyDeposit: '',
                repointAmount: '',
                gpsFee: '',
                otherFee: '',
                loanAmount: '',
                carFunds3: '',
                carFunds4: '',
                carFunds5: ''
            },
            // 车辆信息
            carInfo: {
                code: '',
                isPublicCard: '',
                carEngineNo: '',
                regAddress: '',
                shopCarGarage: '',
                model: '',
                isAzGps: '',
                carPrice: '',
                invoicePrice: '',
                carFrameNo: '',
                number: '',
                evalPrice: '',
                regDate: '',
                mile: ''
            },
            // 车辆信息输入
            carInfoArrIpt: {
                carEngineNo: '',
                regAddress: '',
                shopCarGarage: '',
                model: '',
                carPrice: '',
                invoicePrice: '',
                carFrameNo: '',
                carNumber: '',
                evalPrice: '',
                regDate: '',
                mile: ''
            },
            // 贷款材料图
            materialInfo: {
                code: '',
                driveCard: '',
                marryPdf: '',
                divorcePdf: '',
                singleProve: '',
                incomeProve: '',
                hkBookFirstPage: '',
                hkBookHomePage: '',
                hkBookMyPage: '',
                housePropertyCardPdf: '',
                liveProvePdf: '',
                bankJourFirstPage: '',
                bankJourInterestFirst: '',
                bankJourInterestSecond: '',
                bankJourInterestThird: '',
                bankJourInterestFourth: '',
                bankJourLastPage: '',
                zfbJour: '',
                wxJour: '',
                otherPdf: ''
            },
            // 驾驶证
            fileListJSZ: [],
            previewVisibleJSZ: false,
            previewVisibleGPS: false,
            previewImageJSZ: '',
            previewImageGPS: '',
            // 结婚证
            fileListJHZ: [],
            previewVisibleJHZ: false,
            previewImageJHZ: '',
            // 离婚证
            fileListLHZ: [],
            previewVisibleLHZ: false,
            previewImageLHZ: '',
            // 单身证明
            fileListDSZ: [],
            previewVisibleDSZ: false,
            previewImageDSZ: '',
            // 收入证明
            fileListSRZ: [],
            previewVisibleSRZ: false,
            previewImageSRZ: '',
            // 户口本首页
            fileListHKBSY: [],
            previewVisibleHKBSY: false,
            previewImageHKBSY: '',
            // 户口本主页
            fileListHKBZY: [],
            previewVisibleHKBZY: false,
            previewImageHKBZY: '',
            // 户口本本人页
            fileListHKBRY: [],
            previewVisibleHKBRY: false,
            previewImageHKBRY: '',
            // 房产证内容页
            fileListFZZ: [],
            previewVisibleFZZ: false,
            previewImageFZZ: '',
            // 居住证
            fileListJZZ: [],
            previewVisibleJZZ: false,
            previewImageJZZ: '',
            // 银行流水首页
            fileListYHS: [],
            previewVisibleYHS: false,
            previewImageYHS: '',
            // 银行流水结息一季度
            fileListLS1: [],
            previewVisibleLS1: false,
            previewImageLS1: '',
            // 银行流水结息二季度
            fileListLS2: [],
            previewVisibleLS2: false,
            previewImageLS2: '',
            // 银行流水结息三季度
            fileListLS3: [],
            previewVisibleLS3: false,
            previewImageLS3: '',
            // 银行流水结息四季度
            fileListLS4: [],
            previewVisibleLS4: false,
            previewImageLS4: '',
            // 银行流水末页
            fileListLS5: [],
            previewVisibleLS5: false,
            previewImageLS5: '',
            // 支付宝流水
            fileListZFB: [],
            previewVisibleZFB: false,
            previewImageZFB: '',
            // 微信流水
            fileListWX: [],
            previewVisibleWX: false,
            previewImageWX: '',
            // 其他
            fileListQT: [],
            previewVisibleQT: false,
            previewImageQT: '',
            // 上门调查照片
            investigationImgInfo: {
                code: '',
                doorPdf: '',
                groupPhoto: '',
                houseVideo: ''
            },
            // 上门调查照片
            // 上门照片
            fileListSM: [],
            previewVisibleSM: false,
            previewImageSM: '',
            // 上门调查照片
            // 合照
            fileListHZ: [],
            previewVisibleHZ: false,
            previewImageHZ: '',
            // 上门调查照片
            // 家访视频
            fileListJF: [],
            // 车辆图
            carImgInfo: {
                code: '',
                carHead: '',
                nameplate: '',
                vinNumber: '',
                dashboard: '',
                cab: '',
                carEngine: '',
                centralControl: '',
                skylight: '',
                rearSeat: '',
                vehicleTail: '',
                carBody: '',
                carRegisterCertificateFirst: '',
                carRegisterCertificateSecond: '',
                carRegisterCertificateThird: ''
            },
            // 车头
            fileListCT: [],
            previewVisibleCT: false,
            previewImageCT: '',
            // 铭牌
            fileListCMP: [],
            previewVisibleCMP: false,
            previewImageCMP: '',
            // VIN码
            fileListVIN: [],
            previewVisibleVIN: false,
            previewImageVIN: '',
            // 仪表盘
            fileListYBP: [],
            previewVisibleYBP: false,
            previewImageYBP: '',
            // 驾驶室
            fileListJSS: [],
            previewVisibleJSS: false,
            previewImageJSS: '',
            // 发动机
            fileListFDJ: [],
            previewVisibleFDJ: false,
            previewImageFDJ: '',
            // 中控
            fileListZK: [],
            previewVisibleZK: false,
            previewImageZK: '',
            // 天窗
            fileListTC: [],
            previewVisibleTC: false,
            previewImageTC: '',
            // 车后座
            fileListHZC: [],
            previewVisibleHZC: false,
            previewImageHZC: '',
            // 车尾
            fileListCW: [],
            previewVisibleCW: false,
            previewImageCW: '',
            // 车全身
            fileListCQS: [],
            previewVisibleCQS: false,
            previewImageCQS: '',
            // 车辆登记证书（首页）
            fileListDJZS: [],
            previewVisibleDJZS: false,
            previewImageDJZS: '',
            // 车辆登记证书（二页）
            fileListDJZS2: [],
            previewVisibleDJZS2: false,
            previewImageDJZS2: '',
            // 车辆登记证书（三页）
            fileListDJZS3: [],
            previewVisibleDJZS3: false,
            previewImageDJZS3: '',
            bankList: [],
            bankRateList: [],
            fileList: [],
            brandList: [],
            carType: [],
            carType3: [],
            budgetOrdeBizTyper: [],
            loanPeriod: [],
            carTypeData: [],
            genderData: [],
            marryState: [],
            nowAddressStateList: [],
            workCompanyPropertyList: [],
            education: [],
            isCardMailAddress: [],
            creditContactsRelation: [],
            workBelongIndustry: [],
            workCompanyProperty: [],
            mainIncome: [],
            position: [],
            workProfession: [],
            interest: [],
            carFramePriceCount: [],
            permanentType: [],
            accessInfoCode: '',
            carBuyingListArrs: [],
            carLineCode: '',
            creditUserRelation: [],
            emergencyRelationCode1: '',
            emergencyRelationCode2: '',
            emergencyRelationghyzdgx1: '',
            emergencyRelationghyzdgx2: '',
            emergencyRelationdbryzdgx1: '',
            emergencyRelationdbryzdgx2: '',
            cityList: [],
            nowAddressCode: '',
            regDate: '',
            carUrl: '',
            modelName: '',
            pAcreditUserList1: {},
            pAcreditUserList2: {},
            pAcreditUserList3: {},
            // 修改选择框
            zxjgName1: '',
            zxjgName2: '',
            zxjgName3: '',
            zxjgName202: '',
            zxjgName302: '',
            // 教育程度
            jycd: '',
            // 婚姻状态
            hyzt: '',
            // 住房类型
            zflx: '',
            // 常住类型
            czlx: '',
            // 与主贷关系
            yzdgx: '',
            // 与主贷关系
            yzdgx2: '',
            // 利率类型
            lllx: '',
            // 是否垫资
            sfdz: '',
            // 是否贴息
            sftx: '',
            // 是否工牌
            carInfoIsNotCommonCdCode: '0',
            // 是否加装
            carInfoIsNotGPSCode: '',
            // 利率
            rebateRate: '',
            // 汽车经销商
            shopCarGarage: '',
            ywyList: [],
            ywyCode: ''
        };
        // this.mobileIpt = '';
        // this.bankCreditResultIpt = '';
        // this.mobile2Ipt = '';
        // this.bankCreditResult2Ipt = '';
        // this.mobile3Ipt = '';
        // this.bankCreditResult3Ipt = '';
        this.code = getQueryString('code', this.props.location.search);
        this.typeEdit = getQueryString('type', this.props.location.search);
        let datas = [];
        brandMng(1, 1, '').then(data => {
            for(let i = 0; i < data.length; i++) {
                datas.push({
                    value: data[i].code,
                    text: data[i].name
                });
            }
            this.setState({
                data: datas
            });
        });
        // 获取业务员列表
        findSalesmanList().then(data => {
            let arr = [];
            for (let i = 0; i < data.length; i++) {
                arr.push({
                    dkey: data[i].userId,
                    dvalue: data[i].realName
                });
            }
            this.setState({
                ywyList: arr
            });
        });
        // getCityList
        getCityList(1, 1000).then(async data => {
            let arr = [];
            for (let i = 0; i < data.list.length; i++) {
                arr.push({
                    dkey: (data.list[i].id).toString(),
                    dvalue: data.list[i].provName + '-' + data.list[i].cityName
                });
            }
            this.setState({
                cityList: arr
            });
            if (this.code) {
                this.setState({
                    accessInfoCode: this.code
                });
                await accessSlipDetail(this.code).then(data => {
                    console.log('data.region', data.region);
                    const card = data.creditUserList.filter(item => item.loanRole === '1');
                    const cardZTwo01 = data.creditUserList.filter(item => item.loanRole === '2');
                    const cardZTwo02 = data.creditUserList.filter(item => item.loanRole === '5');
                    const cardZThree01 = data.creditUserList.filter(item => item.loanRole === '3');
                    const cardZThree02 = data.creditUserList.filter(item => item.loanRole === '4');
                    const fileListHKBSY = findDsct(dsctImgList(data.attachments), 'hk_book_first_page');
                    const fileListZFB = findDsct(dsctImgList(data.attachments), 'zfb_jour');
                    const fileListWX = findDsct(dsctImgList(data.attachments), 'wx_jour');
                    const fileListYHS = findDsct(dsctImgList(data.attachments), 'bank_jour_first_page');
                    const fileListQT = findDsct(dsctImgList(data.attachments), 'other_pdf');
                    const fileListCT = findDsct(dsctImgList(data.attachments), 'car_head');
                    const fileListHZ = findDsct(dsctImgList(data.attachments), 'group_photo');
                    const fileListSM = findDsct(dsctImgList(data.attachments), 'door_photo');
                    const fileListDJZS = findDsct(dsctImgList(data.attachments), 'car_register_certificate_first');
                    const fileList = this.dealWithPic(fileListHKBSY);
                    const fileListZfb = this.dealWithPic(fileListZFB, 'zfb');
                    const fileListWx = this.dealWithPic(fileListWX, 'wx');
                    const fileListQt = this.dealWithPic(fileListQT, 'qt');
                    const fileListCt = this.dealWithPic(fileListCT, 'ct');
                    const fileListDjzs = this.dealWithPic(fileListDJZS, 'djzs');
                    const fileListYhs = this.dealWithPic(fileListYHS, 'yhs');
                    const fileListHZs = this.dealWithPic(fileListHZ, 'hzs');
                    const fileListSMs = this.dealWithPic(fileListSM, 'sms');
                    this.setState({
                        isCommon02Vis: cardZTwo02.length > 0,
                        isBack02Vis: cardZThree02.length > 0,
                        loanIptArr: {
                            mobile: card.length > 0 ? card[0].mobile : '',
                            mobile2: cardZTwo01.length > 0 ? cardZTwo01[0].mobile : '',
                            mobile202: cardZTwo02.length > 0 ? cardZTwo02[0].mobile : '',
                            mobile3: cardZThree01.length > 0 ? cardZThree01[0].mobile : '',
                            mobile302: cardZThree02.length > 0 ? cardZThree02[0].mobile : '',
                            bankCreditResultRemark: card.length > 0 ? card[0].bankCreditResultRemark : '',
                            bankCreditResultRemark2: cardZTwo01.length > 0 ? cardZTwo01[0].bankCreditResultRemark : '',
                            bankCreditResultRemark202: cardZTwo02.length > 0 ? cardZTwo02[0].bankCreditResultRemark : '',
                            bankCreditResultRemark3: cardZThree01.length > 0 ? cardZThree01[0].bankCreditResultRemark : '',
                            bankCreditResultRemark302: cardZThree02.length > 0 ? cardZThree02[0].bankCreditResultRemark : ''
                        },
                        regDate2: data.creditUser ? (data.creditUser.nowAddressDate ? data.creditUser.nowAddressDate : getNowTime()) : getNowTime(),
                        regDate3: data.creditUser ? (data.creditUser.workDatetime ? data.creditUser.workDatetime : getNowTime()) : getNowTime(),
                        mainLoanPpIptArr: data.creditUser ? data.creditUser : {
                            emergencyMobile2: '',
                            emergencyRelation2: '',
                            emergencyName2: '',
                            emergencyMobile1: '',
                            emergencyRelation1: '',
                            emergencyName1: '',
                            presentJobYears: '',
                            yearIncome: '',
                            position: '',
                            companyAddress: '',
                            companyName: '',
                            nowAddress: '',
                            nowAddressProvince: '',
                            nowAddressCity: '',
                            nowAddressArea: '',
                            nowAddressMobile: '',
                            nowAddressDate: '',
                            nowAddressState: '',
                            companyProvince: '',
                            companyCity: '',
                            companyArea: '',
                            workCompanyProperty: '',
                            workDatetime: ''
                        },
                        altogetherPpIptArr: cardZTwo01.length > 0 ? cardZTwo01[0] : {
                            companyName: '',
                            position: '',
                            nowAddress: '',
                            companyAddress: ''
                        },
                        altogetherPpIptArr02: cardZTwo02.length > 0 ? cardZTwo02[0] : {
                            companyName: '',
                            position: '',
                            nowAddress: '',
                            companyAddress: ''
                        },
                        bkGuaranteePpArr: cardZThree01.length > 0 ? cardZThree01[0] : {
                            companyName: '',
                            position: '',
                            nowAddress: '',
                            companyAddress: ''
                        },
                        bkGuaranteePpArr02: cardZThree02.length > 0 ? cardZThree02[0] : {
                            companyName: '',
                            position: '',
                            nowAddress: '',
                            companyAddress: ''
                        },
                        cardZ: card.length > 0 ? card[0] : {},
                        cardF: card.length > 0 ? card[0] : {},
                        cardZTwo: cardZTwo01.length > 0 ? cardZTwo01[0] : {},
                        cardFTwo: cardZTwo01.length > 0 ? cardZTwo01[0] : {},
                        cardZThree: cardZThree01.length > 0 ? cardZThree01[0] : {},
                        cardFThree: cardZThree01.length > 0 ? cardZThree01[0] : {},
                        cardZTwo02: cardZTwo02.length > 0 ? cardZTwo02[0] : {},
                        cardFTwo02: cardZTwo02.length > 0 ? cardZTwo02[0] : {},
                        cardZThree02: cardZThree02.length > 0 ? cardZThree02[0] : {},
                        cardFThree02: cardZThree02.length > 0 ? cardZThree02[0] : {},
                        attachmentsList: data.attachments,
                        fileList1: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'id_no_front_apply') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'id_no_front_apply')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'id_no_front_apply')
                            }
                        }],
                        fileList2: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'id_no_reverse_apply') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'id_no_reverse_apply')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'id_no_reverse_apply')
                            }

                        }],
                        fileList3: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'hold_id_card_apply') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'hold_id_card_apply')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'hold_id_card_apply')
                            }
                        }],
                        fileListG1: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'id_no_front_gh') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'id_no_front_gh')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'id_no_front_gh')
                            }
                        }],
                        fileListG2: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'id_no_reverse_gh') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'id_no_reverse_gh')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'id_no_reverse_gh')
                            }
                        }],
                        fileListG3: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'hold_id_card_gh') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'hold_id_card_gh')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'hold_id_card_gh')
                            }
                        }],
                        fileListG102: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'id_no_front_gh1') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'id_no_front_gh1')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'id_no_front_gh1')
                            }
                        }],
                        fileListG202: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'id_no_reverse_gh1') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'id_no_reverse_gh1')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'id_no_reverse_gh1')
                            }
                        }],
                        fileListG302: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'hold_id_card_gh1') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'hold_id_card_gh1')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'hold_id_card_gh1')
                            }
                        }],
                        fileListB1: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'id_no_front_gua') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'id_no_front_gua')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'id_no_front_gua')
                            }
                        }],
                        fileListB2: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'id_no_reverse_gua') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'id_no_reverse_gua')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'id_no_reverse_gua')
                            }
                        }],
                        fileListB3: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'hold_id_card_gua') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'hold_id_card_gua')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'hold_id_card_gua')
                            }
                        }],
                        fileListB102: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'id_no_front_gua1') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'id_no_front_gua1')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'id_no_front_gua1')
                            }
                        }],
                        fileListB202: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'id_no_reverse_gua1') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'id_no_reverse_gua1')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'id_no_reverse_gua1')
                            }
                        }],
                        fileListB302: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'hold_id_card_gua1') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'hold_id_card_gua1')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'hold_id_card_gua1')
                            }
                        }],
                        loanInfoArrIpt: data.bankLoan ? {
                            ...data.bankLoan,
                            rebateRate: data.bankLoan.rebateRate ? (Math.floor(data.bankLoan.rebateRate * 10e6) / 10e4).toFixed(4) : '',
                            bankRate: data.bankLoan.bankRate ? (Math.floor(data.bankLoan.bankRate * 10e6) / 10e4).toFixed(4) : '0',
                            totalRate: data.bankLoan.totalRate ? (Math.floor(data.bankLoan.totalRate * 10e6) / 10e4).toFixed(4) : '',
                            discountRate: data.bankLoan.discountRate ? (Math.floor(data.bankLoan.discountRate * 10e6) / 10e4).toFixed(4) : '',
                            customerBearRate: data.bankLoan.customerBearRate ? (Math.floor(data.bankLoan.customerBearRate * 10e6) / 10e4).toFixed(4) : '',
                            surchargeRate: data.bankLoan.surchargeRate ? (Math.floor(data.bankLoan.surchargeRate * 10e6) / 10e4).toFixed(4) : '',
                            loanAmount: data.bankLoan.loanAmount ? data.bankLoan.loanAmount / 1000 : '',
                            monthAmount: data.bankLoan.monthAmount ? data.bankLoan.monthAmount / 1000 : '',
                            repayFirstMonthAmount: data.bankLoan.repayFirstMonthAmount ? data.bankLoan.repayFirstMonthAmount / 1000 : '',
                            openCardAmount: data.bankLoan.openCardAmount ? data.bankLoan.openCardAmount / 1000 : '',
                            highCashAmount: data.bankLoan.highCashAmount ? data.bankLoan.highCashAmount / 1000 : '',
                            fee: data.bankLoan.fee ? data.bankLoan.fee / 1000 : '',
                            totalFee: data.bankLoan.totalFee ? data.bankLoan.totalFee / 1000 : '',
                            discountAmount: data.bankLoan.discountAmount ? data.bankLoan.discountAmount / 1000 : '',
                            surchargeAmount: data.bankLoan.surchargeAmount ? data.bankLoan.surchargeAmount / 1000 : '',
                            notes: data.bankLoan.notes
                        } : {
                            loanAmount: '',
                            periods: '',
                            bankRate: '',
                            totalRate: '',
                            rebateRate: '',
                            fee: '',
                            discountRate: '',
                            discountAmount: '',
                            loanRatio: '',
                            wanFactor: '',
                            monthAmount: '',
                            repayFirstMonthAmount: '',
                            openCardAmount: '',
                            highCashAmount: '',
                            totalFee: '',
                            customerBearRate: '',
                            surchargeRate: '',
                            surchargeAmount: ''
                        },
                        costSettlementInfoArrIpt: {
                            fxAmount: data.fxAmount ? data.fxAmount / 1000 : '',
                            lyDeposit: data.lyDeposit ? data.lyDeposit / 1000 : '',
                            repointAmount: data.repointAmount ? data.repointAmount / 1000 : '',
                            gpsFee: data.gpsFee ? data.gpsFee / 1000 : '',
                            otherFee: data.otherFee ? data.otherFee / 1000 : '',
                            loanAmount: data.bankLoan ? data.bankLoan.loanAmount / 1000 : '',
                            carFunds3: data.carFunds3 ? data.carFunds3 / 1000 : '',
                            carFunds4: data.carFunds4 ? data.carFunds4 / 1000 : '',
                            carFunds5: data.carFunds5 ? data.carFunds5 / 1000 : ''
                        },
                        carInfoArrIpt: data.carInfo ? data.carInfo : {
                            carEngineNo: '',
                            regAddress: '',
                            model: '',
                            carPrice: '',
                            invoicePrice: '',
                            carFrameNo: '',
                            carNumber: '',
                            evalPrice: '',
                            regDate: data.bizType === '1' ? data.carInfo ? data.carInfo.regDate : '' : '',
                            mile: ''
                        },
                        // 驾驶证
                        fileListJSZ: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'drive_card') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'drive_card')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'drive_card')
                            }
                        }],
                        // 结婚证
                        fileListJHZ: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'marry_pdf') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'marry_pdf')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'marry_pdf')
                            }
                        }],
                        // 离婚证
                        fileListLHZ: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'divorce_pdf') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'divorce_pdf')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'divorce_pdf')
                            }
                        }],
                        // 单身证明
                        fileListDSZ: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'single_prove') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'single_prove')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'single_prove')
                            }
                        }],
                        // 收入证明
                        fileListSRZ: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'income_prove') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'income_prove')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'income_prove')
                            }
                        }],
                        // 户口本首页
                        fileListHKBSY: fileList,
                        // 户口本主页
                        fileListHKBZY: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'hk_book_home_page') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'hk_book_home_page')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'hk_book_home_page')
                            }
                        }],
                        // 户口本本人页
                        fileListHKBRY: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'hk_book_my_page') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'hk_book_my_page')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'hk_book_my_page')
                            }
                        }],
                        // 房产证
                        fileListFZZ: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'house_property_card_pdf') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'house_property_card_pdf')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'house_property_card_pdf')
                            }
                        }],
                        // 居住证
                        fileListJZZ: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'live_prove_pdf') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'live_prove_pdf')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'live_prove_pdf')
                            }
                        }],
                        // 银行流水首页
                        fileListYHS: fileListYhs,
                        // 支付宝流水
                        fileListZFB: fileListZfb,
                        // 微信流水
                        fileListWX: fileListWx,
                        // 其他
                        fileListQT: fileListQt,
                        // 上门照片
                        fileListSM: fileListSMs,
                        // 合照
                        fileListHZ: fileListHZs,
                        // 家访视频
                        fileListJF: [{
                            uid: '-2',
                            name: 'ot.png',
                            status: 'done',
                            url: findDsct(dsctImgList(data.attachments), 'house_video') === '' ? zanwu : (PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'house_video')),
                            response: {
                                hash: findDsct(dsctImgList(data.attachments), 'house_video')
                            }
                        }],
                        // 车头
                        fileListCT: fileListCt,
                        // 车辆登记证书（首页）
                        fileListDJZS: fileListDjzs,
                        hyzt: data.creditUser ? data.creditUser.marryState : '',
                        zzzk: data.creditUser ? data.creditUser.nowAddressState : '',
                        dwxz: data.creditUser ? data.creditUser.workCompanyProperty : '',
                        zxjgName1: card.length > 0 ? (card[0].bankCreditResult === '0' ? '不通过' : '通过') : '',
                        zxjgName2: cardZTwo01.length > 0 ? (cardZTwo01[0].bankCreditResult === '0' ? '不通过' : '通过') : '',
                        zxjgName202: cardZTwo02.length > 0 ? (cardZTwo02[0].bankCreditResult === '0' ? '不通过' : '通过') : '',
                        zxjgName3: cardZThree01.length > 0 ? (cardZThree01[0].bankCreditResult === '0' ? '不通过' : '通过') : '',
                        zxjgName302: cardZThree02.length > 0 ? (cardZThree02[0].bankCreditResult === '0' ? '不通过' : '通过') : '',
                        jycd: data.creditUser ? data.creditUser.education : '',
                        zflx: data.creditUser ? data.creditUser.nowHouseType : '',
                        czlx: data.creditUser ? data.creditUser.permanentType : '',
                        yzdgx: data.creditUser ? data.creditUser.emergencyRelation1 : '',
                        yzdgx2: data.creditUser ? data.creditUser.emergencyRelation2 : '',
                        loanInfoRateTypeCode: data.bankLoan ? data.bankLoan.rateType : '',
                        sfdz: data.bankLoan ? (data.bankLoan.isAdvanceFund === '0' ? '否' : '是') : '',
                        sftx: data.bankLoan ? (data.bankLoan.isDiscount === '0' ? '否' : '是') : '',
                        carInfoIsNotCommonCdCode: data.carInfo ? data.carInfo.isPublicCard ? data.carInfo.isPublicCard : '0' : '0',
                        carInfoIsNotGPSCode: data.carInfo ? data.carInfo.isAzGps ? data.carInfo.isAzGps : '' : '',
                        isHideGpsAz: !!(data.carInfo ? data.carInfo.isAzGps ? +data.carInfo.isAzGps : '' : ''),
                        sendCreditReporting: {
                            mile: data.mile
                        },
                        // 经办银行
                        loanBankCode: data.loanBank,
                        // 业务发生地点
                        nowAddressCode: data.region,
                        // 汽车经销商
                        shopCarGarage: data.carInfo ? data.carInfo.shopCarGarage : '',
                        // 购车途径
                        bizType: data.bizType,
                        // 上牌时间
                        regDate: data.carInfo ? data.carInfo.regDate : '',
                        // 品牌
                        brandCode: data.carInfo ? data.carInfo.carBrand : '',
                        brandName1: data.carInfo ? data.carInfo.carBrandName : '',
                        // 车系
                        seriesCode: data.carInfo ? data.carInfo.carSeries : '',
                        seriesName1: data.carInfo ? data.carInfo.carSeriesName : '',
                        // 车型
                        carCode: data.carInfo ? data.carInfo.carModel : '',
                        carUrl: data.carInfo ? data.carInfo.secondCarReport : '',
                        modelName: data.carInfo ? data.carInfo.carModelName : '',
                        loanPeriodCode: data.periods,
                        // 基本信息默认code
                        permanentResidenceCode: data.creditUser ? data.creditUser.permanentType : '',
                        housingTypeCode: data.creditUser ? data.creditUser.nowHouseType : '',
                        marriageStatusCode: data.creditUser ? data.creditUser.marryState : '',
                        nowAddressStateCode: data.creditUser ? data.creditUser.nowAddressState : '',
                        workCompanyPropertyCode: data.creditUser ? data.creditUser.workCompanyProperty : '',
                        edtCode: data.creditUser ? data.creditUser.education : '',
                        emergencyRelationCode1: data.creditUser ? data.creditUser.emergencyRelation1 : '',
                        emergencyRelationCode2: data.creditUser ? data.creditUser.emergencyRelation2 : '',
                        emergencyRelationghyzdgx1: data.creditUserList[1] ? data.creditUserList[1].relation : '',
                        emergencyRelationghyzdgx2: data.creditUserList[2] ? data.creditUserList[2].relation : '',
                        emergencyRelationdbryzdgx1: data.creditUserList[3] ? data.creditUserList[3].relation : '',
                        emergencyRelationdbryzdgx2: data.creditUserList[4] ? data.creditUserList[4].relation : '',
                        ghyzdgx1: data.creditUserList[1] ? data.creditUserList[1].relation : '',
                        ghyzdgx2: data.creditUserList[2] ? data.creditUserList[2].relation : '',
                        dbryzdgx1: data.creditUserList[3] ? data.creditUserList[3].relation : '',
                        dbryzdgx2: data.creditUserList[4] ? data.creditUserList[4].relation : '',
                        ywyCode: data.saleUserId ? data.saleUserId : '',
                        ywyUserName: data.saleUserName ? data.saleUserName : ''
                    }, () => {
                        if(this.state.brandCode) {
                            // this.setState({
                            //     value: this.state.brandCode
                            // });
                            this.fandCarTypeMng(this.state.brandCode, true);
                        }
                        if(this.state.seriesCode) {
                            this.findCarTypeFn(this.state.seriesCode, true);
                        }
                    });
                    // 购车途径 显示隐藏
                    if (data.bizType === '0') {
                        this.setState({
                            isShowCarGroup: false
                        });
                    } else if (data.bizType === '1') {
                        this.setState({
                            isShowCarGroup: true
                        });
                    }
                    // permanentResidenceCode
                    // housingTypeCode
                    // marriageStatusCode
                    // edtCode
                    // emergencyRelationCode1
                    // emergencyRelationCode2
                });
            }
            this.getBankList();
        });
    }
    dealWithPic = (fileListPic, type = '') => {
        let fileList = [];
        if(fileListPic === '') {
            fileList.push({
                uid: `${type}-2`,
                name: 'ot.png',
                status: 'done',
                url: zanwu,
                response: {
                    hash: ''
                }
            });
        } else if(fileListPic.indexOf('||') !== -1) {
            const picList = fileListPic.split('||');
            picList.forEach((item, index) => {
                fileList.push({
                    uid: `${type}_ot_${index}`,
                    name: 'ot.png',
                    status: 'done',
                    url: PIC_PREFIX + item,
                    response: {
                        hash: item
                    }
                });
            });
        } else {
            fileList.push({
                uid: `${type}_ot_0`,
                name: 'ot.png',
                status: 'done',
                url: PIC_PREFIX + fileListPic,
                response: {
                    hash: fileListPic
                }
            });
        }
        return fileList;
    };
    componentDidMount() {
        const hasMsg = message.loading('', 100);
        Promise.all([
            getDictList({ parentKey: 'now_address_state' }),
            getDictList({ parentKey: 'work_company_property' }),
            getDictList({ parentKey: 'budget_orde_biz_typer' }),
            getDictList({ parentKey: 'loan_period' }),
            getDictList({ parentKey: 'car_type' }),
            getDictList({ parentKey: 'gender' }),
            getDictList({ parentKey: 'marry_state' }),
            getDictList({ parentKey: 'education' }),
            getDictList({ parentKey: 'is_card_mail_address' }),
            getDictList({ parentKey: 'credit_contacts_relation' }),
            getDictList({ parentKey: 'work_belong_industry' }),
            getDictList({ parentKey: 'work_company_property' }),
            getDictList({ parentKey: 'main_income' }),
            getDictList({ parentKey: 'position' }),
            getDictList({ parentKey: 'work_profession' }),
            getDictList({ parentKey: 'interest' }),
            getDictList({ parentKey: 'car_frame_price_count' }),
            getDictList({ parentKey: 'permanent_type' }),
            getDictList({ parentKey: 'credit_user_relation' })
        ]).then(([
                     nowAddressState,
                     workCompanyProperty1,
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
            hasMsg();
            this.setState({
                nowAddressStateList: dsctList(nowAddressState),
                workCompanyPropertyList: dsctList(workCompanyProperty1),
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
        }).catch(hasMsg);
        getGps().then(data => {
            if(Array.isArray(data)) {
                const gpsList = data.map(item => ({
                    dkey: item.code,
                    dvalue: item.gpsDevNo
                }));
                this.setState({
                    gpsList
                });
            };
        });
        if(this.code) {
            queryGps(this.code).then(data => {
                // gpsAzList
                const gpsAzList = data.map(item => ({
                    code: item.code,
                    azPhotos: item.azPhotos,
                    fileListGPS: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + item.azPhotos,
                        response: {
                            hash: PIC_PREFIX + item.azPhotos
                        }
                    }]
                }));
                this.setState({
                    gpsAzList
                });
            });
        }
        getQiNiu().then(data => {
            this.setState({
                uploadToken: data.uploadToken
            });
        });
        brandMng(1, 1).then(data => {
            for(let i = 0; i < data.length; i++) {
                this.setState({
                    brandList: data
                });
            }
        });
        // 购车行
        carBuyingList(1, 100).then(data => {
            let arr = [];
            for(let i = 0; i < data.list.length; i++) {
                arr.push({
                    dkey: data.list[i].code,
                    dvalue: data.list[i].fullName,
                    rebateRate: data.list[i].rebateRate
                });
            }
            this.setState({
                carBuyingListArrs: arr
            });
        });
    }
    onChangeTime = (date, dateString) => {
        if(new Date(dateString).getTime() > new Date().getTime()) {
            showWarnMsg('请选择小于今天的日期');
        }else {
            this.setState({
                regDate: dateString === '' ? getNowTime() : dateString,
                carInfoArrIpt: {
                    ...this.state.carInfoArrIpt,
                    regDate: dateString === '' ? getNowTime() : dateString
                }
            });
        }
    };
    onChangeTime2 = (date, dateString) => {
        if(new Date(dateString).getTime() > new Date().getTime()) {
            showWarnMsg('请选择小于今天的日期');
        }else {
            this.setState({
                regDate2: dateString === '' ? getNowTime() : dateString
            });
        }
    };
    onChangeTime3 = (date, dateString) => {
        if(new Date(dateString).getTime() > new Date().getTime()) {
            showWarnMsg('请选择小于今天的日期');
        }else {
            this.setState({
                regDate3: dateString === '' ? getNowTime() : dateString
            });
        }
    };
    computedMonthly = (isInvoicePrice = false) => {
        const {loanInfoArrIpt, loanPeriodCode, loanBankCode, carInfoArrIpt} = this.state;
        if(loanBankCode && loanInfoArrIpt.loanAmount && loanPeriodCode && (loanInfoArrIpt.bankRate || loanInfoArrIpt.bankRate === 0) && loanInfoArrIpt.totalRate) {
            calculateMonthly({
                loanBankCode,
                loanPeriods: loanPeriodCode,
                loanAmount: loanInfoArrIpt.loanAmount * 1000,
                bankRate: loanInfoArrIpt.bankRate / 100,
                totalRate: loanInfoArrIpt.totalRate / 100,
                invoicePrice: isInvoicePrice ? carInfoArrIpt.invoicePrice * 1000 : ''
            }).then(data => {
                if(isInvoicePrice) {
                    this.state.loanInfoArrIpt.loanRatio = data.loanRatio;
                }
                this.setState({
                    loanInfoArrIpt: {
                        ...this.state.loanInfoArrIpt,
                        repayFirstMonthAmount: +data.initialAmount / 1000,
                        monthAmount: +data.annualAmount / 1000,
                        openCardAmount: +data.openCardAmount / 1000,
                        fee: +data.poundage / 1000
                    }
                });
            });
        }
    };
    // 获取code
    // 获取银行code
    handleChangeBank = (value) => {
        this.setState({
            loanBankCode: value
        }, () => {
            this.computedMonthly();
        });
    };
    // 获取主贷人关系1 Code emergencyRelation1code
    handleChangeEmergency = (value, event) => {
        this.setState({
            yzdgx: event.props.children,
            emergencyRelationCode1: value
        });
    }
    // 获取主贷人关系2 Code emergencyRelation1code
    handleChangeEmergency2 = (value, event) => {
        this.setState({
            yzdgx2: event.props.children,
            emergencyRelationCode2: value
        });
    }
    // 共还人与主贷关系
    // ghyzdgx1,ghyzdgx2
    // 担保人与主贷关系
    // dbryzdgx1,dbryzdgx2
    // 获取共还人1与主贷人关系1 Code emergencyRelation1code
    handleChangeGhyzdgx1 = (value, event) => {
        this.setState({
            ghyzdgx1: event.props.children,
            emergencyRelationghyzdgx1: value
        });
    }
    handleChangeGhyzdgx2 = (value, event) => {
        this.setState({
            ghyzdgx2: event.props.children,
            emergencyRelationghyzdgx2: value
        });
    }
    handleChangeDbryzdgx1 = (value, event) => {
        this.setState({
            dbryzdgx1: event.props.children,
            emergencyRelationdbryzdgx1: value
        });
    }
    handleChangeDbryzdgx2 = (value, event) => {
        this.setState({
            dbryzdgx2: event.props.children,
            emergencyRelationdbryzdgx2: value
        });
    }
    // 贷款期限 code
    handleChangeLoanPeriod = (value, event) => {
        const {bankRateList, loanBankCode, loanInfoArrIpt} = this.state;
        let rateValue = '';
        switch (value) {
            case '12':
                rateValue = bankRateList.find(item => item.code === loanBankCode).rate12 * 100;
                break;
            case '18':
                rateValue = bankRateList.find(item => item.code === loanBankCode).rate18 * 100;
                break;
            case '24':
                rateValue = bankRateList.find(item => item.code === loanBankCode).rate24 * 100;
                break;
            case '36':
                rateValue = bankRateList.find(item => item.code === loanBankCode).rate36 * 100;
                break;
        }
        loanInfoArrIpt['bankRate'] = rateValue;
        this.setState({
            loanPeriodCode: value,
            loanInfoArrIpt
        }, () => {
            this.computedMonthly();
        });
    }
    // 获取学历code
    handleChangeEdt = (value, event) => {
        this.setState({
            jycd: event.props.children,
            edtCode: value
        });
    }
    // 获取婚姻状态code
    handleChangeMarriageStatus = (value, event) => {
        this.setState({
            hyzt: event.props.children,
            marriageStatusCode: value
        });
    }
    // 获取住宅状况code
    handleChangeNowAddressState = (value, event) => {
        this.setState({
            zzzk: event.props.children,
            nowAddressStateCode: value
        });
    }
    // 获取单位性质code
    handleChangeWorkCompanyProperty = (value, event) => {
        this.setState({
            dwxz: event.props.children,
            workCompanyPropertyCode: value
        });
    }
    // 获取住房类型code
    handleChangeHousingType = (value, event) => {
        this.setState({
            zflx: event.props.children,
            housingTypeCode: value
        });
    }
    // 常住类型code
    handleChangePermanentResidence = (value, event) => {
        this.setState({
            czlx: event.props.children,
            permanentResidenceCode: value
        });
    }
    // 获取利率类型
    handleChangeLoanInfoRateType = (value, event) => {
        this.setState({
            loanInfoRateTypeCode: value
        });
    }
    // 获取是否垫资
    handleChangeLoanInfoIsNotAdvance = (value, event) => {
        this.setState({
            sfdz: event.props.children,
            loanInfoIsNotAdvanceCode: value
        });
    }
    // 获取是否贴息
    handleChangeLoanInfoIsNotInterest = (value, event) => {
        this.setState({
            sftx: event.props.children,
            loanInfoIsNotInterestCode: value
        });
    }
    // 获取是否公牌
    handleChangecarInfoIsNotCommonCd = (value, event) => {
        this.setState({
            carInfoIsNotCommonCdCode: value
        });
    }
    // 获取是否GPS
    handleChangecarInfoIsNotGPS = (value) => {
        if(value === '1') {
            const {gpsAzList} = this.state;
            if(gpsAzList.length === 0) {
                this.setState({
                    gpsAzList: [
                        {
                            code: '',
                            azPhotos: '',
                            fileListGPS: []
                        }
                    ],
                    isHideGpsAz: true
                });
            }else {
                this.setState({
                    gpsAzList: [
                        ...gpsAzList
                    ],
                    isHideGpsAz: true
                });
            }
        }else {
            this.setState({
                isHideGpsAz: false
            });
        }
        this.setState({
            carInfoIsNotGPSCode: value
        });
    };
    fandCarTypeMng = (value, isFirst = false) => {
        carTypeMng(value, 1, 1, 100).then(data => {
            let arr = [];
            for(let i = 0; i < data.list.length; i++) {
                arr.push({
                    name: data.list[i].name,
                    code: data.list[i].code
                });
            }
            if(!isFirst) {
                this.setState({
                    carType: [...arr],
                    brandCode: value,
                    seriesCode: '',
                    carCode: ''
                });
            }else {
                this.setState({
                    carType: [...arr]
                });
            }
        });
    };
    handleChangeCarType1 = (value, event) => {
        this.fandCarTypeMng(value);
    };
    findCarTypeFn = (value, isFirst) => {
        findCarType(1, 100, value).then(data => {
            let arr = [];
            for(let i = 0; i < data.list.length; i++) {
                arr.push({
                    name: data.list[i].name,
                    code: data.list[i].code
                });
            }
            if(!isFirst) {
                this.setState({
                    carType3: [...arr],
                    seriesCode: value,
                    carCode: ''
                });
            }else {
                this.setState({
                    carType3: [...arr]
                });
            }
        });
    };
    handleChangeCarType = (value, event) => {
        this.findCarTypeFn(value);
    }
    handleChangeCar3Type = (value, event) => {
        this.setState({
            carCode: value
        });
    }
    handleChangeYwy = (value, event) => {
        this.setState({
            ywyCode: value,
            ywyUserName: event.props.children
        });
    }
    // 发起征信文件上传
    handleChangeUpload = info => {
        let fileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-2);

        // 2. Read from response and show file link
        fileList = fileList.map(file => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        this.setState({ fileList });
    };
    handleChangeCarBuying = (value, event) => {
        this.setState({
            bizType: value
        });
        if(value === '0') {
            this.setState({
                isShowCarGroup: false,
                carInfoArrIpt: {
                    ...this.state.carInfoArrIpt,
                    regDate: ''
                }
            });
        }else if(value === '1') {
            this.setState({
                isShowCarGroup: true,
                carInfoArrIpt: {
                    ...this.state.carInfoArrIpt,
                    regDate: getNowTime().split('-')[0] + '-' + getNowTime().split('-')[1]
                }
            });
        }
    }
    // 贷款信息Tab效果
    loanInfoTab = (value) => {
        switch (value) {
            case 'loanPpInfo':
                this.setState({
                    isLoanPpInfo: true,
                    isBaseInfo: false,
                    isLoanInfo: false,
                    isCostSettlement: false,
                    isCarInfo: false,
                    isMaterialInfo: false,
                    isInvestigation: false,
                    isCarImg: false
                });
                break;
            case 'baseInfo':
                this.setState({
                    isLoanPpInfo: false,
                    isBaseInfo: true,
                    isLoanInfo: false,
                    isCostSettlement: false,
                    isCarInfo: false,
                    isMaterialInfo: false,
                    isInvestigation: false,
                    isCarImg: false
                });
                break;
            case 'loanInfo':
                this.setState({
                    isLoanPpInfo: false,
                    isBaseInfo: false,
                    isLoanInfo: true,
                    isCostSettlement: false,
                    isCarInfo: false,
                    isMaterialInfo: false,
                    isInvestigation: false,
                    isCarImg: false
                });
                break;
            case 'costSettlement':
                // 计算返点金额
                const {loanInfoArrIpt, costSettlementInfoArrIpt} = this.state;
                let amount = 0;
                if(loanInfoArrIpt.rebateRate && loanInfoArrIpt.loanAmount) {
                    amount = loanInfoArrIpt.loanAmount * loanInfoArrIpt.rebateRate / 100;
                }
                costSettlementInfoArrIpt['repointAmount'] = amount;
                costSettlementInfoArrIpt['carFunds3'] = Math.round(((loanInfoArrIpt.totalRate - loanInfoArrIpt.rebateRate - loanInfoArrIpt.bankRate) * loanInfoArrIpt.loanAmount) / 100);
                this.setState({
                    costSettlementInfoArrIpt
                });
                this.setState({
                    isLoanPpInfo: false,
                    isBaseInfo: false,
                    isLoanInfo: false,
                    isCostSettlement: true,
                    isCarInfo: false,
                    isMaterialInfo: false,
                    isInvestigation: false,
                    isCarImg: false
                });
                break;
            case 'carInfo':
                this.setState({
                    isLoanPpInfo: false,
                    isBaseInfo: false,
                    isLoanInfo: false,
                    isCostSettlement: false,
                    isCarInfo: true,
                    isMaterialInfo: false,
                    isInvestigation: false,
                    isCarImg: false
                });
                break;
            case 'materialInfo':
                this.setState({
                    isLoanPpInfo: false,
                    isBaseInfo: false,
                    isLoanInfo: false,
                    isCostSettlement: false,
                    isCarInfo: false,
                    isMaterialInfo: true,
                    isInvestigation: false,
                    isCarImg: false
                });
                break;
            case 'investigation':
                this.setState({
                    isLoanPpInfo: false,
                    isBaseInfo: false,
                    isLoanInfo: false,
                    isCostSettlement: false,
                    isCarInfo: false,
                    isMaterialInfo: false,
                    isInvestigation: true,
                    isCarImg: false
                });
                break;
            case 'carImg':
                this.setState({
                    isLoanPpInfo: false,
                    isBaseInfo: false,
                    isLoanInfo: false,
                    isCostSettlement: false,
                    isCarInfo: false,
                    isMaterialInfo: false,
                    isInvestigation: false,
                    isCarImg: true
                });
                break;
            default:
                break;
        }
    }
    accSub = (arg1, arg2) => {
        let r1, r2, m, n;
        try {
            r1 = arg1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0;
        };
        try {
            r2 = arg2.toString().split('.')[1].length;
        } catch (e) {
            r2 = 0;
        };
        m = Math.pow(10, Math.max(r1, r2));
        // 动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    }
    // 贷款人信息Tab效果
    getTag = (value) => {
        if(value === 'main') {
            this.setState({
                isMain: true,
                isCommon: false,
                isBack: false,
                isBack02: false,
                isCommon02: false
            });
        }else if(value === 'common') {
            this.setState({
                isMain: false,
                isCommon: true,
                isCommon02: false,
                isBack: false,
                isBack02: false
            });
        }else if(value === 'common02') {
            this.setState({
                isMain: false,
                isCommon: false,
                isCommon02: true,
                isBack: false,
                isBack02: false
            });
        }else if(value === 'back') {
            this.setState({
                isMain: false,
                isCommon: false,
                isCommon02: false,
                isBack: true,
                isBack02: false
            });
        }else if(value === 'back02') {
            this.setState({
                isMain: false,
                isCommon: false,
                isCommon02: false,
                isBack: false,
                isBack02: true
            });
        }
    }
    // 添加共还人2
    addCommon = () => {
        this.setState({
            isMain: false,
            isCommon: false,
            isCommon02: true,
            isCommon02Vis: true,
            isBack: false,
            isBack02: false
        });
    };
    // 添加反担保人2
    addBack02 = () => {
        this.setState({
            isMain: false,
            isCommon: false,
            isCommon02: false,
            isBack: false,
            isBack02: true,
            isBack02Vis: true
        });
    };
    // 接口调用
    // 根据图片获取身份证正面信息
    getCardPositiveLs = (picUrl, type) => {
        if(type === 'one') {
            cardPositiveLs(PIC_PREFIX + picUrl).then(data => {
                this.setState({
                    cardZ: data
                });
            });
        }else if(type === 'two') {
            cardPositiveLs(PIC_PREFIX + picUrl).then(data => {
                this.setState({
                    cardZTwo: data
                });
            });
        }else if(type === 'two02') {
            cardPositiveLs(PIC_PREFIX + picUrl).then(data => {
                this.setState({
                    cardZTwo02: data
                });
            });
        }else if(type === 'three') {
            cardPositiveLs(PIC_PREFIX + picUrl).then(data => {
                this.setState({
                    cardZThree: data
                });
            });
        } else if(type === 'three02') {
            cardPositiveLs(PIC_PREFIX + picUrl).then(data => {
                this.setState({
                    cardZThree02: data
                });
            });
        }
    }
    // 根据图片获取身份证反面信息
    getCardReverseSideLs = (picUrl, type) => {
        if(type === 'one') {
            cardReverseSideLs(PIC_PREFIX + picUrl).then(data => {
                this.setState({
                    cardF: data
                });
            });
        }else if(type === 'two') {
            cardReverseSideLs(PIC_PREFIX + picUrl).then(data => {
                this.setState({
                    cardFTwo: data
                });
            });
        }else if(type === 'two02') {
            cardReverseSideLs(PIC_PREFIX + picUrl).then(data => {
                this.setState({
                    cardFTwo02: data
                });
            });
        }else if(type === 'three') {
            cardReverseSideLs(PIC_PREFIX + picUrl).then(data => {
                this.setState({
                    cardFThree: data
                });
            });
        }else if(type === 'three02') {
            cardReverseSideLs(PIC_PREFIX + picUrl).then(data => {
                this.setState({
                    cardFThree02: data
                });
            });
        }
    }
    // 发起征信
    addSendCreditReporting = () => {
        const {ywyCode, fileList, loanBankCode, brandCode, seriesCode, carCode, bizType, shopCarGarage, accessInfoCode, nowAddressCode, regDate, carUrl, isLoanPpInfo, isBaseInfo, isLoanInfo, isCostSettlement, isCarInfo, isMaterialInfo, isInvestigation, isCarImg} = this.state;
        let picHash = '';
        if(fileList[0] === undefined) {
            picHash = '';
        }else{
            if (fileList[0].response === undefined || fileList[0].response === '') {
                picHash = '';
            } else {
                picHash = fileList[0].response.hash;
            }
        }
        let arr = {
            loanBankCode: loanBankCode,
            region: nowAddressCode === '' ? '1' : nowAddressCode,
            bizType: bizType,
            shopCarGarage,
            regDate: regDate,
            mile: this.mileIpt ? this.mileIpt.value : '',
            secondCarReport: carUrl,
            carBrand: brandCode,
            carSeries: seriesCode,
            carModel: carCode,
            code: accessInfoCode,
            saleUserId: ywyCode
        };
        sendCreditReportingLs(arr).then(data => {
            this.setState({
                accessInfoCode: data
            });
            if(isLoanPpInfo) {
                // 贷款人信息
                this.addLenderInfo(data);
            }else if(isBaseInfo) {
                // 基本信息
                this.addBaseInfo(data);
            }else if(isLoanInfo) {
                // 贷款信息
                this.addLoanInfo(data);
            }else if(isCostSettlement) {
                // 费用结算
                this.addCostSettlementInfo(data);
            }else if(isCarInfo) {
                installationGps({
                    gpsAzList: this.state.gpsAzList,
                    code: data,
                    operator: getUserId()
                });
                // 车辆信息
                this.addCarDsInfoLs(data);
            }else if(isMaterialInfo) {
                // 贷款材料图
                this.addMaterialDsInfoLs(data);
            }else if(isInvestigation) {
                // 上门调查照片
                this.addInvestigationImgInfoLs(data);
            }else if(isCarImg) {
                // 车辆图
                this.addCarImgInfoLs(data);
            }
        });
    };
    // 贷款人信息
    addLenderInfo = (code) => {
        // code
        const {loanIptArr, fileList1, fileList2, fileList3, fileListG1, fileListG2, fileListG3, fileListG102, fileListG202, fileListG302, fileListB1, fileListB2, fileListB3, fileListB102, fileListB202, fileListB302, cardZ, cardF, cardZTwo, cardZTwo02, cardFTwo, cardFTwo02, cardZThree, cardZThree02, cardFThree, cardFThree02, zXjg1, zXjg2, zXjg202, zXjg3, zXjg302} = this.state;
        let picHash = '';
        let picHash2 = '';
        let picHash3 = '';
        let picHashG = '';
        let picHashG2 = '';
        let picHashG3 = '';
        let picHashG02 = '';
        let picHashG202 = '';
        let picHashG302 = '';
        let picHashB = '';
        let picHashB2 = '';
        let picHashB3 = '';
        let picHashB02 = '';
        let picHashB202 = '';
        let picHashB302 = '';
        // 贷款人
        if(fileList1[0] === undefined) {
            picHash = '';
        }else{
            if (fileList1[0].response === undefined || fileList1[0].response === '') {
                picHash = '';
            } else {
                picHash = fileList1[0].response.hash;
            }
        }
        if(fileList2[0] === undefined) {
            picHash2 = '';
        }else{
            if (fileList2[0].response === undefined || fileList2[0].response === '') {
                picHash2 = '';
            } else {
                picHash2 = fileList2[0].response.hash;
            }
        }
        if(fileList3[0] === undefined) {
            picHash3 = '';
        }else{
            if (fileList3[0].response === undefined || fileList3[0].response === '') {
                picHash3 = '';
            } else {
                picHash3 = fileList3[0].response.hash;
            }
        }
        // 公还人
        if(fileListG1[0] === undefined) {
            picHashG = '';
        }else{
            if (fileListG1[0].response === undefined || fileListG1[0].response === '') {
                picHashG = '';
            } else {
                picHashG = fileListG1[0].response.hash;
            }
        }
        if(fileListG2[0] === undefined) {
            picHashG2 = '';
        }else{
            if (fileListG2[0].response === undefined || fileListG2[0].response === '') {
                picHashG2 = '';
            } else {
                picHashG2 = fileListG2[0].response.hash;
            }
        }
        if(fileListG3[0] === undefined) {
            picHashG3 = '';
        }else{
            if (fileListG3[0].response === undefined || fileListG3[0].response === '') {
                picHashG3 = '';
            } else {
                picHashG3 = fileListG3[0].response.hash;
            }
        }
        // 公还人02
        if(fileListG102[0] === undefined) {
            picHashG02 = '';
        }else{
            if (fileListG102[0].response === undefined || fileListG102[0].response === '') {
                picHashG02 = '';
            } else {
                picHashG02 = fileListG102[0].response.hash;
            }
        }
        if(fileListG202[0] === undefined) {
            picHashG202 = '';
        }else{
            if (fileListG202[0].response === undefined || fileListG202[0].response === '') {
                picHashG202 = '';
            } else {
                picHashG202 = fileListG202[0].response.hash;
            }
        }
        if(fileListG302[0] === undefined) {
            picHashG302 = '';
        }else{
            if (fileListG302[0].response === undefined || fileListG302[0].response === '') {
                picHashG302 = '';
            } else {
                picHashG302 = fileListG302[0].response.hash;
            }
        }
        // 反担保人
        if(fileListB1[0] === undefined) {
            picHashB = '';
        }else{
            if (fileListB1[0].response === undefined || fileListB1[0].response === '') {
                picHashB = '';
            } else {
                picHashB = fileListB1[0].response.hash;
            }
        }
        if(fileListB2[0] === undefined) {
            picHashB2 = '';
        }else{
            if (fileListB2[0].response === undefined || fileListB2[0].response === '') {
                picHashB2 = '';
            } else {
                picHashB2 = fileListB2[0].response.hash;
            }
        }
        if(fileListB3[0] === undefined) {
            picHashB3 = '';
        }else{
            if (fileListB3[0].response === undefined || fileListB3[0].response === '') {
                picHashB3 = '';
            } else {
                picHashB3 = fileListB3[0].response.hash;
            }
        }
        // 反担保人2
        if(fileListB102[0] === undefined) {
            picHashB02 = '';
        }else{
            if (fileListB102[0].response === undefined || fileListB102[0].response === '') {
                picHashB02 = '';
            } else {
                picHashB02 = fileListB102[0].response.hash;
            }
        }
        if(fileListB202[0] === undefined) {
            picHashB202 = '';
        }else{
            if (fileListB202[0].response === undefined || fileListB202[0].response === '') {
                picHashB202 = '';
            } else {
                picHashB202 = fileListB202[0].response.hash;
            }
        }
        if(fileListB302[0] === undefined) {
            picHashB302 = '';
        }else{
            if (fileListB302[0].response === undefined || fileListB302[0].response === '') {
                picHashB302 = '';
            } else {
                picHashB302 = fileListB302[0].response.hash;
            }
        }
        if(loanIptArr.mobile === '' || loanIptArr.bankCreditResultRemark === '') {
            showWarnMsg('请将主贷人信息填写完整!');
        }else {
            let creditUserList = [];
            for(let i = 1; i <= 5; i++) {
                if(i === 1) {
                    if(picHash) {
                        if(this.hasMobileError(loanIptArr.mobile)) {
                            message.warning('手机号格式错误', 1.5);
                            return;
                        }
                        creditUserList.push({
                            userName: cardZ.userName,
                            loanRole: i,
                            gender: cardZ.gender,
                            nation: cardZ.nation,
                            idNo: cardZ.idNo,
                            customerBirth: cardZ.customerBirth,
                            birthAddress: cardZ.birthAddress,
                            authref: cardF.authref,
                            statdate: cardF.startDate,
                            startDate: cardF.startDate,
                            idFront: picHash,
                            idReverse: picHash2,
                            holdIdCardPdf: picHash3,
                            bankCreditResult: zXjg1,
                            mobile: loanIptArr.mobile,
                            bankCreditResultRemark: loanIptArr.bankCreditResultRemark
                        });
                    }
                }else if(i === 2) {
                    if(picHashG) {
                        if(this.hasMobileError(loanIptArr.mobile2)) {
                            message.warning('手机号格式错误', 1.5);
                            return;
                        }
                        creditUserList.push({
                            userName: cardZTwo ? cardZTwo.userName : '',
                            loanRole: i,
                            gender: cardZTwo ? cardZTwo.gender : '',
                            nation: cardZTwo ? cardZTwo.nation : '',
                            idNo: cardZTwo ? cardZTwo.idNo : '',
                            customerBirth: cardZTwo ? cardZTwo.customerBirth : '',
                            birthAddress: cardZTwo ? cardZTwo.birthAddress : '',
                            authref: cardFTwo ? cardFTwo.authref : '',
                            statdate: cardFTwo ? cardFTwo.startDate : '',
                            startDate: cardFTwo ? cardFTwo.startDate : '',
                            idFront: picHashG,
                            idReverse: picHashG2,
                            holdIdCardPdf: picHashG3,
                            bankCreditResult: zXjg2,
                            mobile: loanIptArr ? loanIptArr.mobile2 : '',
                            bankCreditResultRemark: loanIptArr ? loanIptArr.bankCreditResultRemark2 : ''
                        });
                    }
                }else if(i === 3) {
                    if(picHashB) {
                        if(this.hasMobileError(loanIptArr.mobile3)) {
                            message.warning('手机号格式错误', 1.5);
                            return;
                        }
                        creditUserList.push({
                            userName: cardZThree ? cardZThree.userName : '',
                            loanRole: i,
                            gender: cardZThree ? cardZThree.gender : '',
                            nation: cardZThree ? cardZThree.nation : '',
                            idNo: cardZThree ? cardZThree.idNo : '',
                            customerBirth: cardZThree ? cardZThree.customerBirth : '',
                            birthAddress: cardZThree ? cardZThree.birthAddress : '',
                            authref: cardFThree ? cardFThree.authref : '',
                            statdate: cardFThree ? cardFThree.startDate : '',
                            startDate: cardFThree ? cardFThree.startDate : '',
                            idFront: picHashB,
                            idReverse: picHashB2,
                            holdIdCardPdf: picHashB3,
                            bankCreditResult: zXjg3,
                            mobile: loanIptArr ? loanIptArr.mobile3 : '',
                            bankCreditResultRemark: loanIptArr ? loanIptArr.bankCreditResultRemark3 : ''
                        });
                    }
                }else if(i === 4) {
                    if(picHashB02) {
                        if(this.hasMobileError(loanIptArr.mobile302)) {
                            message.warning('手机号格式错误', 1.5);
                            return;
                        }
                        creditUserList.push({
                            userName: cardZThree02 ? cardZThree02.userName : '',
                            loanRole: i,
                            gender: cardZThree02 ? cardZThree02.gender : '',
                            nation: cardZThree02 ? cardZThree02.nation : '',
                            idNo: cardZThree02 ? cardZThree02.idNo : '',
                            customerBirth: cardZThree02 ? cardZThree02.customerBirth : '',
                            birthAddress: cardZThree02 ? cardZThree02.birthAddress : '',
                            authref: cardFThree02 ? cardFThree02.authref : '',
                            statdate: cardFThree02 ? cardFThree02.startDate : '',
                            startDate: cardFThree02 ? cardFThree02.startDate : '',
                            idFront: picHashB02,
                            idReverse: picHashB202,
                            holdIdCardPdf: picHashB302,
                            bankCreditResult: zXjg302,
                            mobile: loanIptArr ? loanIptArr.mobile302 : '',
                            bankCreditResultRemark: loanIptArr ? loanIptArr.bankCreditResultRemark302 : ''
                        });
                    }
                }else if(i === 5) {
                    if(picHashG02) {
                        if(this.hasMobileError(loanIptArr.mobile202)) {
                            message.warning('手机号格式错误', 1.5);
                            return;
                        }
                        creditUserList.push({
                            userName: cardZTwo02 ? cardZTwo02.userName : '',
                            loanRole: i,
                            gender: cardZTwo02 ? cardZTwo02.gender : '',
                            nation: cardZTwo02 ? cardZTwo02.nation : '',
                            idNo: cardZTwo02 ? cardZTwo02.idNo : '',
                            customerBirth: cardZTwo02 ? cardZTwo02.customerBirth : '',
                            birthAddress: cardZTwo02 ? cardZTwo02.birthAddress : '',
                            authref: cardFTwo02 ? cardFTwo02.authref : '',
                            statdate: cardFTwo02 ? cardFTwo02.startDate : '',
                            startDate: cardFTwo02 ? cardFTwo02.startDate : '',
                            idFront: picHashG02,
                            idReverse: picHashG202,
                            holdIdCardPdf: picHashG302,
                            bankCreditResult: zXjg202,
                            mobile: loanIptArr ? loanIptArr.mobile202 : '',
                            bankCreditResultRemark: loanIptArr ? loanIptArr.bankCreditResultRemark202 : ''
                        });
                    }
                }
            }
            let arr = {
                code: code,
                operator: getUserId(),
                creditUserList: creditUserList
            };
            lenderInfoLs(arr).then(data => {
                if(data.isSuccess) {
                    showSucMsg('操作成功!');
                }
            });
        }
    }
    // 基本信息
    addBaseInfo = (code) => {
        const {permanentResidenceCode, housingTypeCode, marriageStatusCode, edtCode, mainLoanPpIptArr, altogetherPpIptArr, altogetherPpIptArr02, bkGuaranteePpArr, bkGuaranteePpArr02, emergencyRelationCode1, emergencyRelationCode2, emergencyRelationghyzdgx1, emergencyRelationghyzdgx2, emergencyRelationdbryzdgx1, emergencyRelationdbryzdgx2, nowAddressStateCode, workCompanyPropertyCode, regDate2, regDate3} = this.state;
        let creditUserList = [];
        for(let i = 1; i <= 5; i++) {
            if(i === 1) {
                if(this.hasMobileError(mainLoanPpIptArr.emergencyMobile1) || this.hasMobileError(mainLoanPpIptArr.emergencyMobile2)) {
                    message.warning('手机号格式错误', 1.5);
                    return;
                }
                creditUserList.push({
                    loanRole: i,
                    education: edtCode,
                    nowAddress: mainLoanPpIptArr.nowAddress,
                    marryState: marriageStatusCode,
                    nowHouseType: housingTypeCode,
                    companyName: mainLoanPpIptArr.companyName,
                    companyAddress: mainLoanPpIptArr.companyAddress,
                    position: mainLoanPpIptArr.position,
                    yearIncome: mainLoanPpIptArr.yearIncome,
                    presentJobYears: mainLoanPpIptArr.presentJobYears,
                    permanentType: permanentResidenceCode,
                    emergencyName1: mainLoanPpIptArr.emergencyName1,
                    emergencyRelation1: emergencyRelationCode1,
                    emergencyMobile1: mainLoanPpIptArr.emergencyMobile1,
                    emergencyName2: mainLoanPpIptArr.emergencyName2,
                    emergencyRelation2: emergencyRelationCode2,
                    emergencyMobile2: mainLoanPpIptArr.emergencyMobile2,
                    localResidencePermit: 'FrLh-zbku8RLBn0Uf2FOmRLgZKoD',
                    nowAddressProvince: mainLoanPpIptArr.nowAddressProvince,
                    nowAddressCity: mainLoanPpIptArr.nowAddressCity,
                    nowAddressArea: mainLoanPpIptArr.nowAddressArea,
                    nowAddressMobile: mainLoanPpIptArr.nowAddressMobile,
                    nowAddressDate: regDate2,
                    nowAddressState: nowAddressStateCode,
                    companyProvince: mainLoanPpIptArr.companyProvince,
                    companyCity: mainLoanPpIptArr.companyCity,
                    companyArea: mainLoanPpIptArr.companyArea,
                    workCompanyProperty: workCompanyPropertyCode,
                    workDatetime: regDate3
                });
            }else if(i === 2) {
                creditUserList.push({
                    loanRole: i,
                    companyName: altogetherPpIptArr.companyName,
                    position: altogetherPpIptArr.position,
                    nowAddress: altogetherPpIptArr.nowAddress,
                    companyAddress: altogetherPpIptArr.companyAddress,
                    relation: emergencyRelationghyzdgx1
                });
            }else if(i === 3) {
                creditUserList.push({
                    loanRole: i,
                    companyName: bkGuaranteePpArr.companyName,
                    position: bkGuaranteePpArr.position,
                    nowAddress: bkGuaranteePpArr.nowAddress,
                    companyAddress: bkGuaranteePpArr.companyAddress,
                    relation: emergencyRelationghyzdgx2
                });
            }else if(i === 4) {
                creditUserList.push({
                    loanRole: i,
                    companyName: bkGuaranteePpArr02.companyName,
                    position: bkGuaranteePpArr02.position,
                    nowAddress: bkGuaranteePpArr02.nowAddress,
                    companyAddress: bkGuaranteePpArr02.companyAddress,
                    relation: emergencyRelationdbryzdgx1
                });
            }else if(i === 5) {
                creditUserList.push({
                    loanRole: i,
                    companyName: altogetherPpIptArr02.companyName,
                    position: altogetherPpIptArr02.position,
                    nowAddress: altogetherPpIptArr02.nowAddress,
                    companyAddress: altogetherPpIptArr02.companyAddress,
                    relation: emergencyRelationdbryzdgx2
                });
            }
        }
        let arr = {
            code: code,
            operator: getUserId(),
            creditUserList: creditUserList
        };
        baseDsInfoLs(arr).then(data => {
            if(data.isSuccess) {
                showSucMsg('操作成功!');
            }
        });
    }
    // 添加贷款信息 'CB332019090401414B'
    addLoanInfo = (code) => {
        const {loanInfoArrIpt, loanInfoRateTypeCode, loanInfoIsNotAdvanceCode, loanInfoIsNotInterestCode, loanPeriodCode} = this.state;
        let arr = {
            code: code,
            operator: getUserId(),
            loanAmount: loanInfoArrIpt.loanAmount * 1000,
            periods: loanPeriodCode,
            bankRate: loanInfoArrIpt.bankRate ? loanInfoArrIpt.bankRate / 100 : '0',
            totalRate: loanInfoArrIpt.totalRate ? loanInfoArrIpt.totalRate / 100 : '0',
            rebateRate: loanInfoArrIpt.rebateRate ? loanInfoArrIpt.rebateRate / 100 : '0',
            fee: loanInfoArrIpt.fee * 1000,
            discountRate: loanInfoArrIpt.discountRate ? loanInfoArrIpt.discountRate / 100 : '0',
            discountAmount: loanInfoArrIpt.discountAmount * 1000,
            loanRatio: loanInfoArrIpt.loanRatio,
            wanFactor: loanInfoArrIpt.wanFactor,
            monthAmount: loanInfoArrIpt.monthAmount * 1000,
            repayFirstMonthAmount: loanInfoArrIpt.repayFirstMonthAmount * 1000,
            openCardAmount: loanInfoArrIpt.openCardAmount * 1000,
            highCashAmount: loanInfoArrIpt.highCashAmount * 1000,
            totalFee: loanInfoArrIpt.totalFee * 1000,
            customerBearRate: loanInfoArrIpt.customerBearRate ? loanInfoArrIpt.customerBearRate / 100 : '',
            surchargeRate: loanInfoArrIpt.surchargeRate ? loanInfoArrIpt.surchargeRate / 100 : '',
            surchargeAmount: loanInfoArrIpt.surchargeAmount * 1000,
            rateType: loanInfoRateTypeCode,
            isAdvanceFund: loanInfoIsNotAdvanceCode,
            isDiscount: loanInfoIsNotInterestCode,
            notes: loanInfoArrIpt.notes ? loanInfoArrIpt.notes : ''
        };
        preLoanInfoLs(arr).then(data => {
            // 基本信息
            if(data.isSuccess) {
                showSucMsg('操作成功!');
            }
        });
    }
    // 费用结算
    addCostSettlementInfo = (code) => {
        const {costSettlementInfoArrIpt, loanInfoArrIpt} = this.state;
        if (costSettlementInfoArrIpt.gpsFee === '') {
            showWarnMsg('请将费用结算信息填写完整');
        }else {
            let arr = {
                code: code,
                operator: getUserId(),
                fxAmount: costSettlementInfoArrIpt.fxAmount * 1000,
                lyDeposit: costSettlementInfoArrIpt.lyDeposit * 1000,
                repointAmount: costSettlementInfoArrIpt.repointAmount * 1000,
                gpsFee: costSettlementInfoArrIpt.gpsFee * 1000,
                otherFee: costSettlementInfoArrIpt.otherFee * 1000,
                loanAmount: loanInfoArrIpt.loanAmount * 1000,
                carFunds3: costSettlementInfoArrIpt.carFunds3 * 1000,
                carFunds4: costSettlementInfoArrIpt.carFunds4 * 1000,
                carFunds5: costSettlementInfoArrIpt.carFunds5 * 1000
            };
            costSettlementInfoLs(arr).then(data => {
                showSucMsg('操作成功!');
            });
        }
    }
    // 车辆信息
    addCarDsInfoLs = (code) => {
        const {carInfoArrIpt, carInfoIsNotCommonCdCode, carInfoIsNotGPSCode, carLineCode} = this.state;
        let arr = {
            code: code,
            operator: getUserId(),
            isPublicCard: carInfoIsNotCommonCdCode,
            isAzGps: carInfoIsNotGPSCode,
            carEngineNo: carInfoArrIpt.carEngineNo,
            regAddress: carInfoArrIpt.regAddress,
            model: carInfoArrIpt.model,
            carPrice: carInfoArrIpt.carPrice,
            invoicePrice: carInfoArrIpt.invoicePrice,
            carFrameNo: carInfoArrIpt.carFrameNo,
            carNumber: carInfoArrIpt.carNumber,
            evalPrice: carInfoArrIpt.evalPrice,
            regDate: carInfoArrIpt.regDate,
            mile: carInfoArrIpt.mile
        };
        carDsInfoLs(arr).then(data => {
            if(data.isSuccess) {
                showSucMsg('操作成功!');
            }
        });
    }
    // 贷款材料图
    addMaterialDsInfoLs = (code) => {
        const {
            // 驾驶证
            fileListJSZ,
            // 结婚证
            fileListJHZ,
            // 离婚证
            fileListLHZ,
            // 单身证明
            fileListDSZ,
            // 收入证明
            fileListSRZ,
            // 户口本首页
            fileListHKBSY,
            // 房产证
            fileListFZZ,
            // 居住证
            fileListJZZ,
            // 银行流水首页
            fileListYHS,
            // 支付宝流水
            fileListZFB,
            // 微信流水
            fileListWX,
            // 其他
            fileListQT
        } = this.state;
        // 驾驶证
        let picHashJSZ = '';
        if(fileListJSZ) {
            if (fileListJSZ[0] === undefined || fileListJSZ[0] === '') {
                picHashJSZ = '';
            } else {
                picHashJSZ = fileListJSZ[0].response.hash;
            }
        }
        // 结婚证
        let picHashJHZ = '';
        if(fileListJHZ) {
            if (fileListJHZ[0] === undefined || fileListJHZ[0] === '') {
                picHashJHZ = '';
            } else {
                picHashJHZ = fileListJHZ[0].response.hash;
            }
        }
        // 离婚证
        let picHashLHZ = '';
        if(fileListLHZ) {
            if (fileListLHZ[0] === undefined || fileListLHZ[0] === '') {
                picHashLHZ = '';
            } else {
                picHashLHZ = fileListLHZ[0].response.hash;
            }
        }
        // 单身证明
        let picHashDSZ = '';
        if(fileListDSZ) {
            if (fileListDSZ[0] === undefined || fileListDSZ[0] === '') {
                picHashDSZ = '';
            } else {
                picHashDSZ = fileListDSZ[0].response.hash;
            }
        }
        // 收入证明
        let picHashSRZ = '';
        if(fileListSRZ) {
            if (fileListSRZ[0] === undefined || fileListSRZ[0] === '') {
                picHashSRZ = '';
            } else {
                picHashSRZ = fileListSRZ[0].response.hash;
            }
        }

        // 户口本首页
        let picHashHKBSY = '';
        if(fileListHKBSY) {
            if (fileListHKBSY[0] === undefined || fileListHKBSY[0] === '') {
                picHashHKBSY = '';
            } else {
                let len = fileListHKBSY.length;
                fileListHKBSY.forEach((item, index) => {
                    if(index === len - 1) {
                        picHashHKBSY += item.response.hash;
                    }else {
                        picHashHKBSY += item.response.hash + '||';
                    }
                });
            }
        }
        // 房产证 fileListFZZ
        let picHashFZZ = '';
        if(fileListFZZ) {
            if (fileListFZZ[0] === undefined || fileListFZZ[0] === '') {
                picHashFZZ = '';
            } else {
                picHashFZZ = fileListFZZ[0].response.hash;
            }
        }

        // 居住证
        let picHashJZZ = '';
        if(fileListJZZ) {
            if (fileListJZZ[0] === undefined || fileListJZZ[0] === '') {
                picHashJZZ = '';
            } else {
                picHashJZZ = fileListJZZ[0].response.hash;
            }
        }

        // 银行流水首页
        let picHashYHS = '';
        if(fileListYHS) {
            if (fileListYHS[0] === undefined || fileListYHS[0] === '') {
                picHashYHS = '';
            } else {
                let len = fileListYHS.length;
                fileListYHS.forEach((item, index) => {
                    if(index === len - 1) {
                        picHashYHS += item.response.hash;
                    }else {
                        picHashYHS += item.response.hash + '||';
                    }
                });
            }
        }

        // 支付宝流水
        let picHashZFB = '';
        if(fileListZFB) {
            if (fileListZFB[0] === undefined || fileListZFB[0] === '') {
                picHashZFB = '';
            } else {
                let len = fileListZFB.length;
                fileListZFB.forEach((item, index) => {
                    if(index === len - 1) {
                        picHashZFB += item.response.hash;
                    }else {
                        picHashZFB += item.response.hash + '||';
                    }
                });
            }
        }

        // 微信流水 fileListWX
        let picHashWX = '';
        if(fileListZFB) {
            if (fileListWX[0] === undefined || fileListWX[0] === '') {
                picHashWX = '';
            } else {
                let len = fileListWX.length;
                fileListWX.forEach((item, index) => {
                    if(index === len - 1) {
                        picHashWX += item.response.hash;
                    }else {
                        picHashWX += item.response.hash + '||';
                    }
                });
            }
        }

        // 其他
        let picHashQt = '';
        if(fileListZFB) {
            if (fileListQT[0] === undefined || fileListQT[0] === '') {
                picHashQt = '';
            } else {
                let len = fileListQT.length;
                fileListQT.forEach((item, index) => {
                    if(index === len - 1) {
                        picHashQt += item.response.hash;
                    }else {
                        picHashQt += item.response.hash + '||';
                    }
                });
            }
        }
        let arr = {
            code: code,
            operator: getUserId(),
            driveCard: picHashJSZ,
            marryPdf: picHashJHZ,
            divorcePdf: picHashLHZ,
            singleProve: picHashDSZ,
            incomeProve: picHashSRZ,
            hkBookFirstPage: picHashHKBSY,
            housePropertyCardPdf: picHashFZZ,
            liveProvePdf: picHashJZZ,
            bankJourFirstPage: picHashYHS,
            zfbJour: picHashZFB,
            wxJour: picHashWX,
            otherPdf: picHashQt
        };
        materialDsInfoLs(arr).then(data => {
            if(data.isSuccess) {
                showSucMsg('操作成功!');
            }
        });
    }
    // 上门调查照片
    addInvestigationImgInfoLs = (code) => {
        const {
            // 上门照片
            fileListSM,
            // 合照
            fileListHZ,
            //
            fileListJF
        } = this.state;
        // 上门照片
        let picHashSM = '';
        if(fileListSM) {
            if (fileListSM[0] === undefined || fileListSM[0] === '') {
                picHashSM = '';
            } else {
                let len = fileListSM.length;
                fileListSM.forEach((item, index) => {
                    if(index === len - 1) {
                        picHashSM += item.response.hash;
                    }else {
                        picHashSM += item.response.hash + '||';
                    }
                });
            }
        }

        // 合照
        let picHashHZ = '';
        if(fileListHZ) {
            if (fileListHZ[0] === undefined || fileListHZ[0] === '') {
                picHashHZ = '';
            } else {
                let len = fileListHZ.length;
                fileListHZ.forEach((item, index) => {
                    if(index === len - 1) {
                        picHashHZ += item.response.hash;
                    }else {
                        picHashHZ += item.response.hash + '||';
                    }
                });
            }
        }
        // 家访视频
        let picHashJF = '';
        if(fileListJF) {
            if (fileListJF[0] === undefined || fileListJF[0] === '') {
                picHashJF = '';
            } else {
                picHashJF = fileListJF[0].response.hash;
            }
        }
        let arr = {
            code: code,
            operator: getUserId(),
            doorPdf: picHashSM,
            groupPhoto: picHashHZ,
            houseVideo: picHashJF
        };
        investigationImgInfoLs(arr).then(data => {
            if(data.isSuccess) {
                showSucMsg('操作成功!');
            }
        });
    }
    // 车辆图
    addCarImgInfoLs = (code) => {
        const {
            // 车头
            fileListCT,
            // 铭牌
            fileListCMP,
            // VIN码
            fileListVIN,
            // 仪表盘
            fileListYBP,
            // 驾驶室
            fileListJSS,
            // 发动机
            fileListFDJ,
            // 中控
            fileListZK,
            // 天窗
            fileListTC,
            // 车后座
            fileListHZC,
            // 车尾
            fileListCW,
            // 车全身
            fileListCQS,
            // 车辆登记证书（首页）
            fileListDJZS,
            // 车辆登记证书（二页）
            fileListDJZS2,
            // 车辆登记证书（三页）
            fileListDJZS3
        } = this.state;

        // 车头 fileListCT
        let picHashCT = '';
        if(fileListCT) {
            if (fileListCT[0] === undefined || fileListCT[0] === '') {
                picHashCT = '';
            } else {
                let len = fileListCT.length;
                fileListCT.forEach((item, index) => {
                    if(index === len - 1) {
                        picHashCT += item.response.hash;
                    }else {
                        picHashCT += item.response.hash + '||';
                    }
                });
            }
        }

        // 铭牌 fileListCMP
        let picHashCMP = '';
        if(fileListCMP) {
            if (fileListCMP[0] === undefined || fileListCMP[0] === '') {
                picHashCMP = '';
            } else {
                picHashCMP = fileListCMP[0].response.hash;
            }
        }

        // VIN码 fileListVIN
        let picHashVIN = '';
        if(fileListVIN) {
            if (fileListVIN[0] === undefined || fileListVIN[0] === '') {
                picHashVIN = '';
            } else {
                picHashVIN = fileListVIN[0].response.hash;
            }
        }

        // 仪表盘 fileListYBP
        let picHashYBP = '';
        if(fileListYBP) {
            if (fileListYBP[0] === undefined || fileListYBP[0] === '') {
                picHashYBP = '';
            } else {
                picHashYBP = fileListYBP[0].response.hash;
            }
        }

        // 驾驶室 fileListJSS
        let picHashJSS = '';
        if(fileListJSS) {
            if (fileListJSS[0] === undefined || fileListJSS[0] === '') {
                picHashJSS = '';
            } else {
                picHashJSS = fileListJSS[0].response.hash;
            }
        }

        // 发动机 fileListFDJ
        let picHashFDJ = '';
        if(fileListFDJ) {
            if (fileListFDJ[0] === undefined || fileListFDJ[0] === '') {
                picHashFDJ = '';
            } else {
                picHashFDJ = fileListFDJ[0].response.hash;
            }
        }

        // 中控 fileListZK
        let picHashZK = '';
        if(fileListZK) {
            if (fileListZK[0] === undefined || fileListZK[0] === '') {
                picHashZK = '';
            } else {
                picHashZK = fileListZK[0].response.hash;
            }
        }

        // 天窗 fileListTC
        let picHashTC = '';
        if(fileListTC) {
            if (fileListTC[0] === undefined || fileListTC[0] === '') {
                picHashTC = '';
            } else {
                picHashTC = fileListTC[0].response.hash;
            }
        }

        // 车后座 fileListHZC
        let picHashHZC = '';
        if(fileListHZC) {
            if (fileListHZC[0] === undefined || fileListHZC[0] === '') {
                picHashHZC = '';
            } else {
                picHashHZC = fileListHZC[0].response.hash;
            }
        }

        // 车尾 fileListCW
        let picHashCW = '';
        if(fileListCW) {
            if (fileListCW[0] === undefined || fileListCW[0] === '') {
                picHashCW = '';
            } else {
                picHashCW = fileListCW[0].response.hash;
            }
        }

        // 车全身 fileListCQS
        let picHashCQS = '';
        if(fileListCQS) {
            if (fileListCQS[0] === undefined || fileListCQS[0] === '') {
                picHashCQS = '';
            } else {
                picHashCQS = fileListCQS[0].response.hash;
            }
        }

        // 车辆登记证书（首页）fileListDJZS
        let picHashDJZS = '';
        if(fileListDJZS) {
            if (fileListDJZS[0] === undefined || fileListDJZS[0] === '') {
                picHashDJZS = '';
            } else {
                let len = fileListDJZS.length;
                fileListDJZS.forEach((item, index) => {
                    if(index === len - 1) {
                        picHashDJZS += item.response.hash;
                    }else {
                        picHashDJZS += item.response.hash + '||';
                    }
                });
            }
        }

        // 车辆登记证书（二页）fileListDJZS2
        let picHashDJZS2 = '';
        if(fileListDJZS2) {
            if (fileListDJZS2[0] === undefined || fileListDJZS2[0] === '') {
                picHashDJZS2 = '';
            } else {
                picHashDJZS2 = fileListDJZS2[0].response.hash;
            }
        }

        // 车辆登记证书（三页）fileListDJZS3
        let picHashDJZS3 = '';
        if(fileListDJZS3) {
            if (fileListDJZS3[0] === undefined || fileListDJZS3[0] === '') {
                picHashDJZS3 = '';
            } else {
                picHashDJZS3 = fileListDJZS3[0].response.hash;
            }
        }
        let arr = {
            code: code,
            operator: getUserId(),
            carHead: picHashCT,
            nameplate: picHashCMP,
            vinNumber: picHashVIN,
            dashboard: picHashYBP,
            cab: picHashJSS,
            carEngine: picHashFDJ,
            centralControl: picHashZK,
            skylight: picHashTC,
            rearSeat: picHashHZC,
            vehicleTail: picHashCW,
            carBody: picHashCQS,
            carRegisterCertificateFirst: picHashDJZS,
            carRegisterCertificateSecond: picHashDJZS2,
            carRegisterCertificateThird: picHashDJZS3
        };
        carImgInfoLs(arr).then(data => {
            if(data.isSuccess) {
                showSucMsg('操作成功!');
            }
        });
    }
    // 获取银行列表
    getBankList = () => {
        loanBanksList().then(data => {
            let arr = [];
            for(let i = 0; i < data.length; i++) {
                arr.push({
                    value: data[i].code,
                    name: data[i].bankName + '-' + data[i].subbranch
                });
            }
            let rateArr = [];
            for(let i = 0; i < data.length; i++) {
                rateArr.push({
                    code: data[i].code,
                    rate12: data[i].rate12,
                    rate18: data[i].rate18,
                    rate24: data[i].rate24,
                    rate36: data[i].rate36
                });
            }
            this.setState({
                bankList: arr,
                bankRateList: rateArr
            });
        });
    }
    // 业务操作
    // 保存发起征信
    openSaveCreditReporting = () => {

    }
    // 保存
    openSave = () => {
        this.addSendCreditReporting();
    }
    accessInfoUp = () => {
        const {accessInfoCode} = this.state;
        if(this.typeEdit === 'edit') {
            accessInfoSend(this.code).then(data => {
                if(data.isSuccess) {
                    showSucMsg('操作成功');
                    setTimeout(() => {
                        this.props.history.go(-1);
                    }, 1000);
                }
            });
        }else {
            accessInfoSend(accessInfoCode).then(data => {
                if(data.isSuccess) {
                    showSucMsg('操作成功');
                    setTimeout(() => {
                        this.props.history.go(-1);
                    }, 1000);
                }
            });
        }
    }
    // 数据双向绑定
    // 发起征信
    iptChangeSendCreditReporting = (e, name) => {
        const {sendCreditReporting, carInfoArrIpt} = this.state;
        if(name === 'mile') {
            carInfoArrIpt['mile'] = e.target.value;
        }
        sendCreditReporting[name] = e.target.value;
        this.setState({
            sendCreditReporting,
            carInfoArrIpt
        });
    }
    // 贷款信息数组
    iptLoanIptArr = (e, name) => {
        const {loanIptArr} = this.state;
        loanIptArr[name] = e.target.value;
        this.setState({
            loanIptArr
        });
    };
    changeUserName = (e, name, isF = false) => {
        if (isF) {
            const {cardF} = this.state;
            cardF[name] = e.target.value;
            this.setState({
                cardF
            });
        } else {
            const {cardZ} = this.state;
            cardZ[name] = e.target.value;
            this.setState({
                cardZ
            });
        }
    };
    changePicker = (v, cardObj, cardName) => {
        const time = moment(v).format('YYYY-MM-DD');
        this.state[cardObj][cardName] = time;
        this.setState({
            [cardObj]: this.state[cardObj]
        });
    };
    changeCardZTwo = (e, name, isF = false) => {
        if (isF) {
            const {cardFTwo} = this.state;
            cardFTwo[name] = e.target.value;
            this.setState({
                cardFTwo
            });
        } else {
            const {cardZTwo} = this.state;
            cardZTwo[name] = e.target.value;
            this.setState({
                cardZTwo
            });
        }
    };
    changeCardZTwo02 = (e, name, isF = false) => {
        if (isF) {
            const {cardFTwo02} = this.state;
            cardFTwo02[name] = e.target.value;
            this.setState({
                cardFTwo02
            });
        } else {
            const {cardZTwo02} = this.state;
            cardZTwo02[name] = e.target.value;
            this.setState({
                cardZTwo02
            });
        }
    };
    changeCardZThree = (e, name, isF = false) => {
        if (isF) {
            const {cardFThree} = this.state;
            cardFThree[name] = e.target.value;
            this.setState({
                cardFThree
            });
        } else {
            const {cardZThree} = this.state;
            cardZThree[name] = e.target.value;
            this.setState({
                cardZThree
            });
        }
    };
    changeCardZThree02 = (e, name, isF = false) => {
        if (isF) {
            const {cardFThree02} = this.state;
            cardFThree02[name] = e.target.value;
            this.setState({
                cardFThree02
            });
        } else {
            const {cardZThree02} = this.state;
            cardZThree02[name] = e.target.value;
            this.setState({
                cardZThree02
            });
        }
    };
    // 主贷人信息数组
    iptBaseInfoMainLoanPp = (e, name) => {
        const {mainLoanPpIptArr} = this.state;
        mainLoanPpIptArr[name] = e.target.value;
        this.setState({
            mainLoanPpIptArr
        });
    }
    // 共还人信息数组
    iptaltogetherPp = (e, name) => {
        const {altogetherPpIptArr} = this.state;
        altogetherPpIptArr[name] = e.target.value;
        this.setState({
            altogetherPpIptArr
        });
    };
    // 共还人2信息数组
    iptaltogetherPp02 = (e, name) => {
        const {altogetherPpIptArr02} = this.state;
        altogetherPpIptArr02[name] = e.target.value;
        this.setState({
            altogetherPpIptArr02
        });
    };
    // 反担保人信息数组
    iptBkGtPp = (e, name) => {
        const {bkGuaranteePpArr} = this.state;
        bkGuaranteePpArr[name] = e.target.value;
        this.setState({
            bkGuaranteePpArr
        });
    };
    // 反担保人2信息数组
    iptBkGtPp02 = (e, name) => {
        const {bkGuaranteePpArr02} = this.state;
        bkGuaranteePpArr02[name] = e.target.value;
        this.setState({
            bkGuaranteePpArr02
        });
    };
    // 贷款信息数组
    iptLoanInfoPpTime = null;
    iptLoanInfoPp = (e, name) => {
        const {loanInfoArrIpt} = this.state;
        loanInfoArrIpt[name] = e.target.value;
        this.setState({
            loanInfoArrIpt
        }, () => {
            if(this.iptLoanInfoPpTime) {
                clearTimeout(this.iptLoanInfoPpTime);
            }
            this.iptLoanInfoPpTime = setTimeout(() => {
                if(name === 'loanAmount' || name === 'bankRate' || name === 'totalRate') {
                    this.computedMonthly();
                }
            }, 500);
        });
    }
    // 费用结算数组
    iptCostSettlementInfoPp = (e, name) => {
        const {costSettlementInfoArrIpt} = this.state;
        costSettlementInfoArrIpt[name] = e.target.value;
        this.setState({
            costSettlementInfoArrIpt
        });
    }
    // 车辆信息数组
    iptTimer = null;
    iptCarInfoArr = (e, name) => {
        if(name === 'invoicePrice') {
            if(this.iptTimer) {
                clearTimeout(this.iptTimer);
            }
            this.iptTimer = setTimeout(() => {
                this.computedMonthly(true);
            }, 300);
        }
        const {carInfoArrIpt} = this.state;
        carInfoArrIpt[name] = e.target.value;
        this.setState({
            carInfoArrIpt
        });
    };
    addGps = () => {
        const {gpsAzList} = this.state;
        gpsAzList.push({
            code: '',
            azPhotos: '',
            fileListGPS: []
        });
        this.setState({
            gpsAzList
        });
    };
    // 图片上传相关
    // 申请人 正
    handleCancelCardZ = () => this.setState({ previewVisible: false });
    handlePreviewCardZ = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true
        });
    };
    handleChangeCardZ = ({ fileList }) => {
        this.setState({
            fileList1: fileList
        });
        if(fileList[0]) {
            if(fileList[0].response) {
                this.getCardPositiveLs(fileList[0].response.hash, 'one');
            }
        }
    };
    // 反
    handleCancelCardF = () => this.setState({ previewVisible2: false });
    handlePreviewCardF = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImage2: file.url || file.preview,
            previewVisible2: true
        });
    };
    handleChangeCardF = ({ fileList }) => {
        this.setState({
            fileList2: fileList
        });
        if(fileList[0]) {
            if(fileList[0].response) {
                this.getCardReverseSideLs(fileList[0].response.hash, 'one');
            }
        }
    };
    // 手持
    handleCancelCardSC = () => this.setState({ previewVisible3: false });
    handlePreviewCardSC = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImage3: file.url || file.preview,
            previewVisible3: true
        });
    };
    handleChangeCardSC = ({ fileList }) => {
        this.setState({
            fileList3: fileList
        });
    };
    // 公还人
    // 正
    handleCancelCardZG = () => this.setState({ previewVisibleG: false });
    handleCancelCardZG02 = () => this.setState({ previewVisibleG02: false });
    handlePreviewCardZG = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageG: file.url || file.preview,
            previewVisibleG: true
        });
    };
    handlePreviewCardZG02 = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageG02: file.url || file.preview,
            previewVisibleG02: true
        });
    };
    handleChangeCardZG = ({ fileList }) => {
        this.setState({
            fileListG1: fileList
        });
        if(fileList[0]) {
            if(fileList[0].response) {
                this.getCardPositiveLs(fileList[0].response.hash, 'two');
            }
        }
    };
    handleChangeCardZG02 = ({ fileList }) => {
        this.setState({
            fileListG102: fileList
        });
        if(fileList[0]) {
            if(fileList[0].response) {
                this.getCardPositiveLs(fileList[0].response.hash, 'two02');
            }
        }
    };
    // 反
    handleCancelCardFG = () => this.setState({ previewVisibleG2: false });
    handleCancelCardFG02 = () => this.setState({ previewVisibleG202: false });
    handlePreviewCardFG = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageG2: file.url || file.preview,
            previewVisibleG2: true
        });
    };
    handlePreviewCardFG02 = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageG202: file.url || file.preview,
            previewVisibleG202: true
        });
    };
    handleChangeCardFG = ({ fileList }) => {
        this.setState({
            fileListG2: fileList
        });
        if(fileList[0]) {
            if(fileList[0].response) {
                this.getCardReverseSideLs(fileList[0].response.hash, 'two');
            }
        }
    };
    handleChangeCardFG02 = ({ fileList }) => {
        this.setState({
            fileListG202: fileList
        });
        if(fileList[0]) {
            if(fileList[0].response) {
                this.getCardReverseSideLs(fileList[0].response.hash, 'two02');
            }
        }
    };
    // 手持
    handleCancelCardSCG = () => this.setState({ previewVisibleG3: false });
    handleCancelCardSCG02 = () => this.setState({ previewVisibleG302: false });
    handlePreviewCardSCG = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageG3: file.url || file.preview,
            previewVisibleG3: true
        });
    };
    handlePreviewCardSCG02 = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageG302: file.url || file.preview,
            previewVisibleG302: true
        });
    };
    handleChangeCardSCG = ({ fileList }) => {
        this.setState({
            fileListG3: fileList
        });
    };
    handleChangeCardSCG02 = ({ fileList }) => {
        this.setState({
            fileListG302: fileList
        });
    };
    // 反担保人
    // 正
    handleCancelCardZB = () => this.setState({ previewVisibleB: false });
    handleCancelCardZB02 = () => this.setState({ previewVisibleB02: false });
    handlePreviewCardZB = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageB: file.url || file.preview,
            previewVisibleB: true
        });
    };
    handlePreviewCardZB02 = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageB02: file.url || file.preview,
            previewVisibleB02: true
        });
    };
    handleChangeCardZB = ({ fileList }) => {
        this.setState({
            fileListB1: fileList
        });
        if(fileList[0]) {
            if(fileList[0].response) {
                this.getCardPositiveLs(fileList[0].response.hash, 'three');
            }
        }
    };
    handleChangeCardZB02 = ({ fileList }) => {
        this.setState({
            fileListB102: fileList
        });
        if(fileList[0]) {
            if(fileList[0].response) {
                this.getCardPositiveLs(fileList[0].response.hash, 'three02');
            }
        }
    };
    // 反
    handleCancelCardFB = () => this.setState({ previewVisibleG2: false });
    handleCancelCardFB02 = () => this.setState({ previewVisibleG202: false });
    handlePreviewCardFB = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageB2: file.url || file.preview,
            previewVisibleB2: true
        });
    };
    handlePreviewCardFB02 = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageB202: file.url || file.preview,
            previewVisibleB202: true
        });
    };
    handleChangeCardFB = ({ fileList }) => {
        this.setState({
            fileListB2: fileList
        });
        if(fileList[0]) {
            if(fileList[0].response) {
                this.getCardReverseSideLs(fileList[0].response.hash, 'three');
            }
        }
    };
    handleChangeCardFB02 = ({ fileList }) => {
        this.setState({
            fileListB202: fileList
        });
        if(fileList[0]) {
            if(fileList[0].response) {
                this.getCardReverseSideLs(fileList[0].response.hash, 'three02');
            }
        }
    };
    // 手持
    handleCancelCardSCB = () => this.setState({ previewVisibleB3: false });
    handleCancelCardSCB02 = () => this.setState({ previewVisibleB302: false });
    handlePreviewCardSCB = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageB3: file.url || file.preview,
            previewVisibleB3: true
        });
    };
    handlePreviewCardSCB02 = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageB302: file.url || file.preview,
            previewVisibleB302: true
        });
    };
    handleChangeCardSCB = ({ fileList }) => {
        this.setState({
            fileListB3: fileList
        });
    };
    handleChangeCardSCB02 = ({ fileList }) => {
        this.setState({
            fileListB302: fileList
        });
    };
    // 驾驶证
    handleCancelCardJSZ = () => this.setState({ previewVisibleJSZ: false });
    handlePreviewCardJSZ = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageJSZ: file.url || file.preview,
            previewVisibleJSZ: true
        });
    };
    handleChangeCardJSZ = ({ fileList }) => {
        this.setState({
            fileListJSZ: fileList
        });
    };
    handleCancelCardGPS = () => this.setState({ previewVisibleGPS: false });
    handlePreviewCardGPS = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageGPS: file.url || file.preview,
            previewVisibleGPS: true
        });
    };
    handleChangeCardGPS = ({ fileList }, gpsIndex) => {
        const hash = fileList[0] ? fileList[0].response ? fileList[0].response.hash : '' : '';
        const {gpsAzList} = this.state;
        gpsAzList.forEach((item, index) => {
            if(index === gpsIndex) {
                item.azPhotos = hash;
                item.fileListGPS = fileList;
            }
        });
        this.setState({
            gpsAzList
        });
    };
    // 结婚证
    handleCancelCardJHZ = () => this.setState({ previewVisibleJHZ: false });
    handlePreviewCardJHZ = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageJHZ: file.url || file.preview,
            previewVisibleJHZ: true
        });
    };
    handleChangeCardJHZ = ({ fileList }) => {
        this.setState({
            fileListJHZ: fileList
        });
    };
    // 离婚证
    handleCancelCardLHZ = () => this.setState({ previewVisibleLHZ: false });
    handlePreviewCardLHZ = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageLHZ: file.url || file.preview,
            previewVisibleLHZ: true
        });
    };
    handleChangeCardLHZ = ({ fileList }) => {
        this.setState({
            fileListLHZ: fileList
        });
    };
    // 单身证明
    handleCancelCardDSZ = () => this.setState({ previewVisibleDSZ: false });
    handlePreviewCardDSZ = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageDSZ: file.url || file.preview,
            previewVisibleDSZ: true
        });
    };
    handleChangeCardDSZ = ({ fileList }) => {
        this.setState({
            fileListDSZ: fileList
        });
    };
    // 收入证明
    handleCancelCardSRZ = () => this.setState({ previewVisibleSRZ: false });
    handlePreviewCardSRZ = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageSRZ: file.url || file.preview,
            previewVisibleSRZ: true
        });
    };
    handleChangeCardSRZ = ({ fileList }) => {
        this.setState({
            fileListSRZ: fileList
        });
    };
    // 户口本首页
    handleCancelCardHKBSY = () => this.setState({ previewVisibleHKBSY: false });
    handlePreviewCardHKBSY = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageHKBSY: file.url || file.preview,
            previewVisibleHKBSY: true
        });
    };
    handleChangeCardHKBSY = ({ fileList }) => {
        this.setState({
            fileListHKBSY: fileList
        });
    };
    // 房产证内容页
    handleCancelCardFZZ = () => this.setState({ previewVisibleFZZ: false });
    handlePreviewCardFZZ = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageFZZ: file.url || file.preview,
            previewVisibleFZZ: true
        });
    };
    handleChangeCardFZZ = ({ fileList }) => {
        this.setState({
            fileListFZZ: fileList
        });
    };
    // 居住证
    handleCancelCardJZZ = () => this.setState({ previewVisibleJZZ: false });
    handlePreviewCardJZZ = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageJZZ: file.url || file.preview,
            previewVisibleJZZ: true
        });
    };
    handleChangeCardJZZ = ({ fileList }) => {
        this.setState({
            fileListJZZ: fileList
        });
    };
    // 银行流水首页
    handleCancelCardYHS = () => this.setState({ previewVisibleYHS: false });
    handlePreviewCardYHS = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageYHS: file.url || file.preview,
            previewVisibleYHS: true
        });
    };
    handleChangeCardYHS = ({ fileList }) => {
        this.setState({
            fileListYHS: fileList
        });
    };
    // 银行流水结息一季度
    handleCancelCardLS1 = () => this.setState({ previewVisibleLS1: false });
    handlePreviewCardLS1 = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageLS1: file.url || file.preview,
            previewVisibleLS1: true
        });
    };
    handleChangeCardLS1 = ({ fileList }) => {
        this.setState({
            fileListLS1: fileList
        });
    };
    // 银行流水结息二季度
    handleCancelCardLS2 = () => this.setState({ previewVisibleLS2: false });
    handlePreviewCardLS2 = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageLS2: file.url || file.preview,
            previewVisibleLS2: true
        });
    };
    handleChangeCardLS2 = ({ fileList }) => {
        this.setState({
            fileListLS2: fileList
        });
    };
    // 银行流水结息三季度
    handleCancelCardLS3 = () => this.setState({ previewVisibleLS3: false });
    handlePreviewCardLS3 = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageLS3: file.url || file.preview,
            previewVisibleLS3: true
        });
    };
    handleChangeCardLS3 = ({ fileList }) => {
        this.setState({
            fileListLS3: fileList
        });
    };
    // 银行流水结息四季度
    handleCancelCardLS4 = () => this.setState({ previewVisibleLS4: false });
    handlePreviewCardLS4 = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageLS4: file.url || file.preview,
            previewVisibleLS4: true
        });
    };
    handleChangeCardLS4 = ({ fileList }) => {
        this.setState({
            fileListLS4: fileList
        });
    };
    // 银行流水末页
    handleCancelCardLS5 = () => this.setState({ previewVisibleLS5: false });
    handlePreviewCardLS5 = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageLS5: file.url || file.preview,
            previewVisibleLS5: true
        });
    };
    handleChangeCardLS5 = ({ fileList }) => {
        this.setState({
            fileListLS5: fileList
        });
    };
    // 支付宝流水
    handleCancelCardZFB = () => this.setState({ previewVisibleZFB: false });
    handlePreviewCardZFB = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageZFB: file.url || file.preview,
            previewVisibleZFB: true
        });
    };
    handleChangeCardZFB = ({ fileList }) => {
        this.setState({
            fileListZFB: fileList
        });
    };
    // 微信流水
    handleCancelCardWX = () => this.setState({ previewVisibleWX: false });
    handlePreviewCardWX = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageWX: file.url || file.preview,
            previewVisibleWX: true
        });
    };
    handleChangeCardWX = ({ fileList }) => {
        this.setState({
            fileListWX: fileList
        });
    };
    // 其他
    handleCancelCardQT = () => this.setState({ previewVisibleQT: false });
    handlePreviewCardQT = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageQT: file.url || file.preview,
            previewVisibleQT: true
        });
    };
    handleChangeCardQT = ({ fileList }) => {
        this.setState({
            fileListQT: fileList
        });
    };
    // 上门照片
    handleCancelCardSM = () => this.setState({ previewVisibleSM: false });
    handlePreviewCardSM = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageSM: file.url || file.preview,
            previewVisibleSM: true
        });
    };
    handleChangeCardSM = ({ fileList }) => {
        this.setState({
            fileListSM: fileList
        });
    };
    // 合照
    handleCancelCardHZ = () => this.setState({ previewVisibleHZ: false });
    handlePreviewCardHZ = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageHZ: file.url || file.preview,
            previewVisibleHZ: true
        });
    };
    handleChangeCardHZ = ({ fileList }) => {
        this.setState({
            fileListHZ: fileList
        });
    };
    // 家访视频文件
    handleChangeUploadJF = info => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-2);
        fileList = fileList.map(file => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });
        this.setState({
            fileListJF: fileList
        });
    };
    // 车头
    handleCancelCardCT = () => this.setState({ previewVisibleCT: false });
    handlePreviewCardCT = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageCT: file.url || file.preview,
            previewVisibleCT: true
        });
    };
    handleChangeCardCT = ({ fileList }) => {
        this.setState({
            fileListCT: fileList
        });
    };
    // 车辆登记证书（首页）
    handleCancelCardDJZS = () => this.setState({ previewVisibleDJZS: false });
    handlePreviewCardDJZS = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageDJZS: file.url || file.preview,
            previewVisibleDJZS: true
        });
    };
    handleChangeCardDJZS = ({ fileList }) => {
        this.setState({
            fileListDJZS: fileList
        });
    };
    handleChangeGPS = (v, gpsIndex) => {
        const {gpsAzList} = this.state;
        gpsAzList.forEach((item, index) => {
            if(index === gpsIndex) {
                item.code = v;
            }
        });
        this.setState({
            gpsAzList
        });
    };
    // 返回
    toBack = () => {
        this.props.history.go(-1);
    };
    handleChangeSearchZXJG1 = (value, event) => {
        this.setState({
            zxjgName1: event.props.children,
            zXjg1: value
        });
    };
    handleChangeSearchZXJG2 = (value, event) => {
        this.setState({
            zxjgName2: event.props.children,
            zXjg2: value
        });
    };
    handleChangeSearchZXJG202 = (value, event) => {
        this.setState({
            zxjgName202: event.props.children,
            zXjg202: value
        });
    }
    handleChangeSearchZXJG3 = (value, event) => {
        this.setState({
            zxjgName3: event.props.children,
            zXjg3: value
        });
    }
    handleChangeSearchZXJG302 = (value, event) => {
        this.setState({
            zxjgName302: event.props.children,
            zXjg302: value
        });
    };
    // 业务发生地点
    handleChangeAddress = (value, event) => {
        this.setState({
            nowAddressCode: value
        });
    };
    handleChangeIptBaseInfoMainLoanPp = (value) => {
        this.setState({
            mainLoanPpIptArr: {
                ...this.state.mainLoanPpIptArr,
                position: value
            }
        });
    };
    handleChangeAltogetherPpIptArr = (value) => {
        this.setState({
            altogetherPpIptArr: {
                ...this.state.altogetherPpIptArr,
                position: value
            }
        });
    };
    handleChangeAltogetherPpIptArr02 = (value) => {
        this.setState({
            altogetherPpIptArr02: {
                ...this.state.altogetherPpIptArr02,
                position: value
            }
        });
    };
    handleChangeBkGuaranteePpArr = (value) => {
        this.setState({
            bkGuaranteePpArr: {
                ...this.state.bkGuaranteePpArr,
                position: value
            }
        });
    };
    handleChangeBkGuaranteePpArr02 = (value) => {
        this.setState({
            bkGuaranteePpArr02: {
                ...this.state.bkGuaranteePpArr02,
                position: value
            }
        });
    };
    // 生成评估报告
    sendAssessment = () => {
        const {carCode, regDate, nowAddressCode} = this.state;
        let arr = {
            modelId: carCode,
            regDate: regDate === '' ? getNowTime(true) : regDate,
            mile: this.mileIpt.value,
            zone: nowAddressCode === '' ? '1' : nowAddressCode
        };
        sendPjPost(arr).then(data => {
            this.setState({
                carUrl: data.url,
                modelName: data.model_name
            });
        });
    };
    // 选择汽车经销商
    showRebateRate = (v) => {
        const rebateRate = this.state.carBuyingListArrs.filter(item => item.dkey === v)[0].rebateRate || '';
        this.setState({
            shopCarGarage: v,
            loanInfoArrIpt: {
                ...this.state.loanInfoArrIpt,
                rebateRate: rebateRate ? (Math.floor(rebateRate * 10e6) / 10e4).toFixed(4) : ''
            }
        });
    };
    hasMobileError = (mobile) => {
        if(mobile && !(/^1[3456789]\d{9}$/.test(mobile))) {
            return true;
        }
        return false;
    };
    handleSearch1 = value => {
        if (value) {
            fetch(value, data => this.setState({ data }));
        } else {
            let datas = [];
            brandMng(1, 1, '').then(data => {
                for(let i = 0; i < data.length; i++) {
                    datas.push({
                        value: data[i].code,
                        text: data[i].name
                    });
                }
                this.setState({
                    data: datas
                });
            });
        }
    };
    handleChange1 = value => {
        console.log('value7', value);
        this.fandCarTypeMng(value, true);
        this.setState({
            value,
            brandCode: value
        });
    };

    handleSearch2 = value => {
        if (value) {
            fetch2(value, data => this.setState({ data2: data }));
        } else {
            this.setState({ data2: [] });
        }
    };
    handleChange2 = value => {
        this.setState({ value2: value });
    };
    selectedChange = (e) => {
        const {mainLoanPpIptArr} = this.state;
        mainLoanPpIptArr['nowAddressProvince'] = e[0];
        mainLoanPpIptArr['nowAddressCity'] = e[1];
        mainLoanPpIptArr['nowAddressArea'] = e[2];
        this.setState({
            mainLoanPpIptArr
        });
    };
    selectedChange2 = (e) => {
        const {mainLoanPpIptArr} = this.state;
        mainLoanPpIptArr['companyProvince'] = e[0];
        mainLoanPpIptArr['companyCity'] = e[1];
        mainLoanPpIptArr['companyArea'] = e[2];
        this.setState({
            mainLoanPpIptArr
        });
    };
    render() {
        const {
            isMain,
            isCommon,
            isCommon02,
            isCommon02Vis,
            isBack,
            isBack02,
            isBack02Vis,
            isLoanPpInfo,
            isBaseInfo,
            isLoanInfo,
            isCostSettlement,
            isCarInfo,
            isMaterialInfo,
            isInvestigation,
            isCarImg,
            // 发起征信
            bankList,
            uploadToken,
            fileList,
            isShowCarGroup,
            brandList,
            carType,
            carType3,
            sendCreditReporting,
            // 贷款信息人
            // 贷款输入数组
            loanIptArr,
            errorInfo,
            // 正身份证
            fileList1,
            previewVisible,
            previewImage,
            // 反身份证
            fileList2,
            previewVisible2,
            previewImage2,
            // 手持
            fileList3,
            previewVisible3,
            previewImage3,
            cardZ,
            cardF,
            // 公还人
            fileListG1,
            fileListG102,
            previewVisibleG,
            previewVisibleG02,
            previewImageG,
            previewImageG02,
            // 反身份证
            fileListG2,
            fileListG202,
            previewVisibleG2,
            previewVisibleG202,
            previewImageG2,
            previewImageG202,
            // 手持
            fileListG3,
            fileListG302,
            previewVisibleG3,
            previewVisibleG302,
            previewImageG3,
            previewImageG302,
            cardZTwo,
            cardZTwo02,
            cardFTwo,
            cardFTwo02,
            // 反担保人
            fileListB1,
            fileListB102,
            previewVisibleB,
            previewVisibleB02,
            previewImageB,
            previewImageB02,
            // 反身份证
            fileListB2,
            fileListB202,
            previewVisibleB2,
            previewVisibleB202,
            previewImageB2,
            previewImageB202,
            // 手持
            fileListB3,
            fileListB302,
            previewVisibleB3,
            previewVisibleB302,
            previewImageB3,
            previewImageB302,
            cardZThree,
            cardFThree,
            cardZThree02,
            cardFThree02,
            // 基本信息
            // 主贷人信息
            // 主贷人输入数组
            mainLoanPpIptArr,
            // 共还人输入数组
            altogetherPpIptArr,
            // 共还人2输入数组
            altogetherPpIptArr02,
            // 反担保人输入数组
            bkGuaranteePpArr,
            // 反担保人02输入数组
            bkGuaranteePpArr02,
            // 贷款信息输入数组
            loanInfoArrIpt,
            // 费用结算输入数组
            costSettlementInfoArrIpt,
            // 车辆信息输入数组
            carInfoArrIpt,
            // 贷款材料图
            // 驾驶证
            fileListJSZ,
            previewVisibleJSZ,
            previewImageJSZ,
            previewVisibleGPS,
            previewImageGPS,
            // 贷款材料图
            // 结婚证
            fileListJHZ,
            previewVisibleJHZ,
            previewImageJHZ,
            // 贷款材料图
            // 离婚证
            fileListLHZ,
            previewVisibleLHZ,
            previewImageLHZ,
            // 贷款材料图
            // 单身证明
            fileListDSZ,
            previewVisibleDSZ,
            previewImageDSZ,
            // 贷款材料图
            // 收入证明
            fileListSRZ,
            previewVisibleSRZ,
            previewImageSRZ,
            // 贷款材料图
            // 户口本首页
            fileListHKBSY,
            previewVisibleHKBSY,
            previewImageHKBSY,
            // 贷款材料图
            // 房产证
            fileListFZZ,
            previewVisibleFZZ,
            previewImageFZZ,
            // 贷款材料图
            // 居住证
            fileListJZZ,
            previewVisibleJZZ,
            previewImageJZZ,
            // 贷款材料图
            // 银行流水首页
            fileListYHS,
            previewVisibleYHS,
            previewImageYHS,
            // 贷款材料图
            // 支付宝流水
            fileListZFB,
            previewVisibleZFB,
            previewImageZFB,
            // 贷款材料图
            // 微信流水
            fileListWX,
            previewVisibleWX,
            previewImageWX,
            // 贷款材料图
            // 其他
            fileListQT,
            previewVisibleQT,
            previewImageQT,
            // 上门调查照片
            // 上门照片
            fileListSM,
            previewVisibleSM,
            previewImageSM,
            // 上门调查照片
            // 合照
            fileListHZ,
            previewVisibleHZ,
            previewImageHZ,
            // 上门调查照片
            // 家访视频
            fileListJF,
            // 车辆图
            // 车头
            fileListCT,
            previewVisibleCT,
            previewImageCT,
            // 车辆登记证书（首页）
            fileListDJZS,
            previewVisibleDJZS,
            previewImageDJZS,
            // 车辆登记证书（二页）
            fileListDJZS2,
            previewVisibleDJZS2,
            previewImageDJZS2,
            // 车辆登记证书（三页）
            fileListDJZS3,
            previewVisibleDJZS3,
            previewImageDJZS3,
            // 购车行
            carBuyingListArrs,
            // 字典
            marryState,
            nowAddressStateList,
            workCompanyPropertyList,
            zzzk,
            dwxz,
            education,
            permanentType,
            creditUserRelation,
            cityList,
            workProfession,
            carUrl,
            modelName,
            // 修改选择框填充
            zxjgName1,
            zxjgName2,
            zxjgName202,
            zxjgName3,
            zxjgName302,
            // 教育程度
            jycd,
            // 婚姻状态
            hyzt,
            // 住房类型
            zflx,
            // 常住类型
            czlx,
            // 与主贷关系
            yzdgx,
            // 与主贷关系
            yzdgx2,
            // 共还人与主贷关系
            ghyzdgx1,
            ghyzdgx2,
            // 担保人与主贷关系
            dbryzdgx1,
            dbryzdgx2,
            // 利率类型
            loanInfoRateTypeCode,
            // 是否垫资
            sfdz,
            // 是否贴息
            sftx,
            // 是否工牌
            carInfoIsNotCommonCdCode,
            // 是否加装
            carInfoIsNotGPSCode,
            // 经办银行
            loanBankCode,
            // 业务发生地点
            nowAddressCode,
            // 购车途径
            bizType,
            // 上牌时间
            regDate,
            // 品牌
            brandCode,
            brandName1,
            // 车系
            seriesCode,
            seriesName1,
            // 车型
            carCode,
            // 公里
            gl,
            loanPeriod,
            // 贷款期限
            loanPeriodCode,
            // 汽车经销商
            shopCarGarage,
            gpsList,
            gpsAzList,
            isHideGpsAz,
            attachmentsList,
            ywyList,
            ywyCode,
            ywyUserName,
            regDate2,
            regDate3
        } = this.state;
        const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
        const options2 = this.state.data2.map(d => <Option key={d.value}>{d.text}</Option>);
        // sendCreditReporting.mile === '' ? null : carInfoArrIpt['mile'] = sendCreditReporting.mile;
        carInfoArrIpt['regAddress'] = '浙江-温州';
        const propsJF = {
            action: UPLOAD_URL,
            onChange: this.handleChangeUploadJF,
            multiple: true
        };
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const uploadButtonZ = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">身份证正面照</div>
            </div>
        );
        const uploadButtonF = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">身份证反面照</div>
            </div>
        );
        const uploadButtonHz = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">身份证与本人合照</div>
            </div>
        );
        return (
            <div className="preLoan-body">
                <span className="preLoan-body-tag">发起征信</span>
                <Row className="preLoan-body-row-top-one">
                    <Col span={12}>
                        <span className="preLoan-body-title" style={{width: '100px'}}><span style={{color: 'red'}}>* </span>经办银行：</span>
                        <Select className="preLoan-body-select" style={{width: '220px'}} value={loanBankCode} onChange={this.handleChangeBank}>
                            {
                                bankList.map(data => {
                                    return (
                                        <Option key={data.value} value={data.value}>{data.name}</Option>
                                    );
                                })
                            }
                        </Select>
                        <div className="clear"></div>
                    </Col>
                    <Col span={12}>
                        <span className="preLoan-body-title" style={{width: '120px'}}><span style={{color: 'red'}}>* </span>业务发生地点：</span>
                        <Select style={{ width: '220px' }} value={nowAddressCode === '' ? '1' : nowAddressCode} onChange={this.handleChangeAddress}>
                            {
                                cityList.map(item => {
                                    return (
                                        <Option key={item.dkey} value={item.dkey}>{item.dvalue}</Option>
                                    );
                                })
                            }
                        </Select>
                        <div className="clear"></div>
                    </Col>
                </Row>
                <Row className="preLoan-body-row-top">
                    <Col span={12}>
                        <span className="preLoan-body-title" style={{width: '100px'}}><span style={{color: 'red'}}>* </span>业务员：</span>
                        <Select placeholder="请选择业务员" value={ywyUserName} className="preLoan-body-select" style={{width: '220px'}} onChange={this.handleChangeYwy}>
                            {
                                ywyList.map(item => {
                                    return (
                                        <Option key={item.dkey} value={item.dkey}>{item.dvalue}</Option>
                                    );
                                })
                            }
                        </Select>
                        <div className="clear"></div>
                    </Col>
                </Row>
                <Row className="preLoan-body-row-top">
                    <Col span={12}>
                        <span className="preLoan-body-title" style={{width: '100px'}}><span style={{color: 'red'}}>* </span>汽车经销商：</span>
                        <Select style={{ width: '220px' }} value={shopCarGarage} onChange={ this.showRebateRate }>
                            {
                                carBuyingListArrs.map(item => {
                                    return (
                                        <Option key={item.dkey} value={item.dkey}>{item.dvalue}</Option>
                                    );
                                })
                            }
                        </Select>
                    </Col>
                    <Col span={12}>
                        <span className="preLoan-body-title" style={{width: '120px'}}><span style={{color: 'red'}}>* </span>购车途径：</span>
                        <Select className="preLoan-body-select" style={{width: '220px'}} value={bizType} onChange={this.handleChangeCarBuying}>
                            <Option key="2" value="0">新车</Option>
                            <Option value="1">二手车</Option>
                        </Select>
                    </Col>
                </Row>
                <Row className="preLoan-body-row-top">
                    <Col span={12}>
                        <span className="preLoan-body-title" style={{width: '100px'}}><span style={{color: 'red'}}>* </span>品牌：</span>
                        <Select
                            showSearch
                            value={this.state.value ? this.state.value : brandName1}
                            defaultValue={this.state.value}
                            placeholder={this.props.placeholder}
                            style={{width: '220px'}}
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            onSearch={this.handleSearch1}
                            onChange={this.handleChange1}
                            notFoundContent={null}
                        >
                            {options}
                        </Select>
                        <div className="clear"></div>
                    </Col>
                    <Col span={12}>
                        <span className="preLoan-body-title" style={{width: '120px'}}><span style={{color: 'red'}}>* </span>车系：</span>
                        <Select placeholder="请选择车系" value={seriesCode} className="preLoan-body-select" style={{width: '220px'}} onChange={this.handleChangeCarType}>
                            {
                                carType.map(data => {
                                    return (
                                        <Option key={data.code} value={data.code}>{data.name}</Option>
                                    );
                                })
                            }
                        </Select>
                        <div className="clear"></div>
                    </Col>
                </Row>
                <Row className="preLoan-body-row-top">
                    <Col span={12}>
                        <span className="preLoan-body-title" style={{width: '100px'}}><span style={{color: 'red'}}>* </span>车型：</span>
                        <Select placeholder="请选择车型" value={carCode} className="preLoan-body-select" style={{width: '220px'}} onChange={this.handleChangeCar3Type}>
                            {
                                carType3.map(data => {
                                    return (
                                        <Option key={data.code} value={data.code}>{data.name}</Option>
                                    );
                                })
                            }
                        </Select>
                        <div className="clear"></div>
                    </Col>
                    {
                        isShowCarGroup ? (
                            <Col span={12}>
                                <span className="preLoan-body-title" style={{width: '120px'}}><span style={{color: 'red'}}>* </span>上牌时间：</span>
                                <MonthPicker format={'YYYY-MM'} style={{width: '220px', float: 'left'}} defaultValue={moment(regDate === '' ? new Date() : regDate)} onChange={this.onChangeTime}/>
                                <div className="clear"></div>
                            </Col>
                        ) : null
                    }
                </Row>
                {
                    isShowCarGroup ? (
                        <div>
                            <Row className="preLoan-body-row-top">
                                <Col span={12}>
                                    <span className="preLoan-body-title" style={{width: '100px'}}><span style={{color: 'red'}}>* </span>公里数(万)：</span>
                                    <input type="text" value={sendCreditReporting.mile} ref={input => this.mileIpt = input} onChange={(e) => { this.iptChangeSendCreditReporting(e, 'mile'); }} className="preLoan-body-input" />
                                </Col>
                                <Col span={12}>
                                </Col>
                            </Row>
                            <Row className="preLoan-body-row-top">
                                <Col span={12}>
                                    <span className="preLoan-body-title">评估报告：</span>
                                    <span className="preLoan-body-title" style={{width: '140px'}} onClick={this.sendAssessment}>点击生成评报告</span>
                                    <a target="_blank" className="preLoan-body-title" style={{width: '300px'}} href={carUrl === '' ? '' : carUrl}>{modelName === '' ? '' : modelName}</a>
                                    <a></a>
                                </Col>
                                <Col span={12}>
                                </Col>
                            </Row>
                        </div>
                    ) : null
                }
                <Row style={{marginTop: '36px'}}></Row>
                <span className="preLoan-body-tag">贷款信息</span>
                <Row className="preLoan-body-table-content">
                    <Row className="preLoan-body-table-content-header">
                        <div className="preLoan-body-table-content-header-item" onClick={value => this.loanInfoTab('loanPpInfo')}>
                            <span className={isLoanPpInfo ? 'preLoan-body-table-content-header-item-tag-in' : 'preLoan-body-table-content-header-item-tag-out'}>
                                贷款人信息
                            </span>
                        </div>
                        <div className="preLoan-body-table-content-header-item" onClick={value => this.loanInfoTab('baseInfo')}>
                            <span className={isBaseInfo ? 'preLoan-body-table-content-header-item-tag-in' : 'preLoan-body-table-content-header-item-tag-out'}>
                                基本信息
                            </span>
                        </div>
                        <div className="preLoan-body-table-content-header-item" onClick={value => this.loanInfoTab('loanInfo')}>
                            <span className={isLoanInfo ? 'preLoan-body-table-content-header-item-tag-in' : 'preLoan-body-table-content-header-item-tag-out'}>
                                贷款信息
                            </span>
                        </div>
                        <div className="preLoan-body-table-content-header-item" onClick={value => this.loanInfoTab('costSettlement')}>
                            <span className={isCostSettlement ? 'preLoan-body-table-content-header-item-tag-in' : 'preLoan-body-table-content-header-item-tag-out'}>
                                费用结算
                            </span>
                        </div>
                        <div className="preLoan-body-table-content-header-item" onClick={value => this.loanInfoTab('carInfo')}>
                            <span className={isCarInfo ? 'preLoan-body-table-content-header-item-tag-in' : 'preLoan-body-table-content-header-item-tag-out'}>
                                车辆信息
                            </span>
                        </div>
                        <div className="preLoan-body-table-content-header-item" onClick={value => this.loanInfoTab('materialInfo')}>
                            <span className={isMaterialInfo ? 'preLoan-body-table-content-header-item-tag-in' : 'preLoan-body-table-content-header-item-tag-out'}>
                                贷款材料图
                            </span>
                        </div>
                        <div className="preLoan-body-table-content-header-item" onClick={value => this.loanInfoTab('investigation')}>
                            <span className={isInvestigation ? 'preLoan-body-table-content-header-item-tag-in' : 'preLoan-body-table-content-header-item-tag-out'}>
                                上门调查照片
                            </span>
                        </div>
                        <div className="preLoan-body-table-content-header-item" onClick={value => this.loanInfoTab('carImg')}>
                            <span className={isCarImg ? 'preLoan-body-table-content-header-item-tag-in' : 'preLoan-body-table-content-header-item-tag-out'}>
                                车辆图
                            </span>
                        </div>
                        <div className="clear"></div>
                    </Row>
                    <Row className="preLoan-body-table-content-result">
                        {/* 贷款人信息 */}
                        {
                            isLoanPpInfo ? (
                                <div>
                                    <Row>
                                        <Col span={2} style={{cursor: 'pointer'}} className={isMain ? 'preLoan-body-table-content-tab-in' : 'preLoan-body-table-content-tab-out'} onClick={value => this.getTag('main')}>主贷人信息</Col>
                                        <Col span={2} className={isCommon ? 'preLoan-body-table-content-tab-in' : 'preLoan-body-table-content-tab-out'} style={{marginLeft: '20px', cursor: 'pointer'}} onClick={value => this.getTag('common')}>共还人1</Col>
                                        <Col span={2} className={isCommon02 ? 'preLoan-body-table-content-tab-in' : 'preLoan-body-table-content-tab-out'} style={{marginLeft: '20px', cursor: 'pointer', display: isCommon02Vis ? '' : 'none'}} onClick={value => this.getTag('common02')}>共还人2</Col>
                                        <Col span={4} className={isBack ? 'preLoan-body-table-content-tab-in' : 'preLoan-body-table-content-tab-out'} style={{marginLeft: '20px', cursor: 'pointer'}} onClick={value => this.getTag('back')}>反担保人1</Col>
                                        <Col span={4} className={isBack02 ? 'preLoan-body-table-content-tab-in' : 'preLoan-body-table-content-tab-out'} style={{marginLeft: '20px', cursor: 'pointer', display: isBack02Vis ? '' : 'none'}} onClick={value => this.getTag('back02')}>反担保人2</Col>
                                        <Col span={10}></Col>
                                    </Row>
                                    {
                                        isMain ? (
                                            <div>
                                                <Row style={{marginTop: '28px'}}>
                                                    <Col span={4}>
                                                        <div className="preLoan-body-table-content-tab-card">
                                                            <Upload
                                                                style={{height: '113px'}}
                                                                listType="picture-card"
                                                                data={{token: uploadToken}}
                                                                fileList={fileList1[0] ? (fileList1[0]['url'] === zanwu ? [] : fileList1) : fileList1}
                                                                action={UPLOAD_URL}
                                                                onPreview={this.handlePreviewCardZ}
                                                                onChange={this.handleChangeCardZ}
                                                            >
                                                                {fileList1[0] ? (fileList1[0]['url'] === zanwu ? uploadButtonZ : (fileList1.length >= 1 ? null : uploadButtonZ)) : uploadButtonZ}
                                                            </Upload>
                                                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancelCardZ}>
                                                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                                            </Modal>
                                                        </div>
                                                    </Col>
                                                    <Col span={4} style={{marginLeft: '30px'}}>
                                                        <div className="preLoan-body-table-content-tab-card">
                                                            <Upload
                                                                style={{height: '113px'}}
                                                                listType="picture-card"
                                                                data={{token: uploadToken}}
                                                                fileList={fileList2[0] ? (fileList2[0]['url'] === zanwu ? [] : fileList2) : fileList2}
                                                                action={UPLOAD_URL}
                                                                onPreview={this.handlePreviewCardF}
                                                                onChange={this.handleChangeCardF}
                                                            >
                                                                {fileList2[0] ? (fileList2[0]['url'] === zanwu ? uploadButtonF : (fileList2.length >= 1 ? null : uploadButtonF)) : uploadButtonF}
                                                            </Upload>
                                                            <Modal visible={previewVisible2} footer={null} onCancel={this.handleCancelCardF}>
                                                                <img alt="example" style={{ width: '100%' }} src={previewImage2} />
                                                            </Modal>
                                                        </div>
                                                    </Col>
                                                    <Col span={4} style={{marginLeft: '30px'}}>
                                                        <div className="preLoan-body-table-content-tab-card">
                                                            <Upload
                                                                style={{height: '113px'}}
                                                                listType="picture-card"
                                                                data={{token: uploadToken}}
                                                                fileList={fileList3[0] ? (fileList3[0]['url'] === zanwu ? [] : fileList3) : fileList3}
                                                                action={UPLOAD_URL}
                                                                onPreview={this.handlePreviewCardSC}
                                                                onChange={this.handleChangeCardSC}
                                                            >
                                                                {fileList3[0] ? (fileList3[0]['url'] === zanwu ? uploadButtonHz : (fileList3.length >= 1 ? null : uploadButtonHz)) : uploadButtonHz}
                                                            </Upload>
                                                            <Modal visible={previewVisible3} footer={null} onCancel={this.handleCancelCardSC}>
                                                                <img alt="example" style={{ width: '100%' }} src={previewImage3} />
                                                            </Modal>
                                                        </div>
                                                    </Col>
                                                    <Col span={8}></Col>
                                                </Row>
                                                <Row style={{marginTop: '34px'}}>
                                                    <Col span={12}>姓名：<Input style={{width: '50%'}} value={cardZ ? cardZ.userName : ''} onChange={(e) => { this.changeUserName(e, 'userName'); }}/></Col>
                                                    <Col span={12}>性别：<Input style={{width: '50%'}} value={cardZ ? cardZ.gender : ''} onChange={(e) => { this.changeUserName(e, 'gender'); }}/></Col>
                                                </Row>
                                                <Row style={{marginTop: '16px'}}>
                                                    <Col span={12}>民族：<Input style={{width: '50%'}} value={cardZ ? cardZ.nation : ''} onChange={(e) => { this.changeUserName(e, 'nation'); }}/></Col>
                                                    <Col span={12}>出生日期：<Input style={{width: '50%'}} value={cardZ ? cardZ.customerBirth : ''} onChange={(e) => { this.changeUserName(e, 'customerBirth'); }}/></Col>
                                                </Row>
                                                <Row style={{marginTop: '16px'}}>
                                                    <Col span={12}>签证机关：<Input
                                                        style={{width: '50%'}}
                                                        value={cardF
                                                            ? cardF.authref
                                                            : ''}
                                                        onChange={(e) => {
                                                            this.changeUserName(
                                                                e, 'authref',
                                                                true);
                                                        }}/></Col>
                                                    <Col span={12}>户籍地：<Input style={{width: '50%'}} value={cardZ ? cardZ.birthAddress : ''} onChange={(e) => { this.changeUserName(e, 'birthAddress'); }}/></Col>
                                                </Row>
                                                <Row style={{marginTop: '16px'}}>
                                                    <Col span={12}>有效截止日：
                                                        <DatePicker
                                                            style={{width: '25%'}}
                                                            value={cardF.startDate ? moment(cardF.startDate, 'YYYY-MM-DD') : null}
                                                            format='YYYY-MM-DD'
                                                            onChange={(val) => this.changePicker(val, 'cardF', 'startDate')}
                                                            placeholder='请选择日期'
                                                        />
                                                        -
                                                        <DatePicker
                                                            style={{width: '25%'}}
                                                            value={cardF.statdate ? moment(cardF.statdate, 'YYYY-MM-DD') : null}
                                                            format='YYYY-MM-DD'
                                                            onChange={(val) => this.changePicker(val, 'cardF', 'statdate')}
                                                            placeholder='请选择日期'
                                                        />
                                                        <span style={{color: '#F75151'}}>（有效期不能小于60天）</span>
                                                    </Col>
                                                    <Col span={12}>身份证号：<Input style={{width: '50%'}} value={cardZ ? cardZ.idNo : ''} onChange={(e) => { this.changeUserName(e, 'idNo'); }}/></Col>
                                                </Row>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title" style={{width: '100px'}}><span style={{color: 'red'}}>* </span>手机号：</span>
                                                        <input type="text" value={loanIptArr.mobile} onChange={(e) => { this.iptLoanIptArr(e, 'mobile'); }} className="preLoan-body-input" />
                                                        <span style={{color: 'red', marginLeft: '10px', display: this.hasMobileError(loanIptArr.mobile) ? '' : 'none'}}>{errorInfo.mobile}</span>
                                                    </Col>
                                                    <Col span={12}>
                                                    </Col>
                                                </Row>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title" style={{width: '100px'}}><span style={{color: 'red'}}>* </span>征信结果：</span>
                                                        <Select style={{ width: '220px' }} value={zxjgName1} onChange={this.handleChangeSearchZXJG1}>
                                                            <Option value="0">不通过</Option>
                                                            <Option value="1">通过</Option>
                                                        </Select>
                                                    </Col>
                                                    <Col span={12}>
                                                    </Col>
                                                </Row>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={20}>
                                                        <span className="preLoan-body-title" style={{width: '100px'}}><span style={{color: 'red'}}>* </span>征信说明：</span>
                                                        <textarea value={loanIptArr.bankCreditResultRemark} ref={input => this.bankCreditResultRemarkIpt = input} onChange={(e) => { this.iptLoanIptArr(e, 'bankCreditResultRemark'); }} className="afp-body-textarea" style={{float: 'left'}}></textarea>
                                                    </Col>
                                                    <Col span={4}>
                                                    </Col>
                                                </Row>
                                            </div>
                                        ) : null
                                    }
                                    {
                                        isCommon ? (
                                            <div>
                                                <div>
                                                    <Row style={{marginTop: '28px'}}>
                                                        <Col span={4}>
                                                            <div className="preLoan-body-table-content-tab-card">
                                                                <Upload
                                                                    style={{height: '113px'}}
                                                                    listType="picture-card"
                                                                    data={{token: uploadToken}}
                                                                    fileList={fileListG1[0] ? (fileListG1[0]['url'] === zanwu ? [] : fileListG1) : fileListG1}
                                                                    action={UPLOAD_URL}
                                                                    onPreview={this.handlePreviewCardZG}
                                                                    onChange={this.handleChangeCardZG}
                                                                >
                                                                    {fileListG1[0] ? (fileListG1[0]['url'] === zanwu ? uploadButtonZ : (fileListG1.length >= 1 ? null : uploadButtonZ)) : uploadButtonZ}
                                                                </Upload>
                                                                <Modal visible={previewVisibleG} footer={null} onCancel={this.handleCancelCardZG}>
                                                                    <img alt="example" style={{ width: '100%' }} src={previewImageG} />
                                                                </Modal>
                                                            </div>
                                                        </Col>
                                                        <Col span={4} style={{marginLeft: '30px'}}>
                                                            <div className="preLoan-body-table-content-tab-card">
                                                                <Upload
                                                                    style={{height: '113px'}}
                                                                    listType="picture-card"
                                                                    data={{token: uploadToken}}
                                                                    fileList={fileListG2[0] ? (fileListG2[0]['url'] === zanwu ? [] : fileListG2) : fileListG2}
                                                                    action={UPLOAD_URL}
                                                                    onPreview={this.handlePreviewCardFG}
                                                                    onChange={this.handleChangeCardFG}
                                                                >
                                                                    {fileListG2[0] ? (fileListG2[0]['url'] === zanwu ? uploadButtonF : (fileListG2.length >= 1 ? null : uploadButtonF)) : uploadButtonF}
                                                                </Upload>
                                                                <Modal visible={previewVisibleG2} footer={null} onCancel={this.handleCancelCardFG}>
                                                                    <img alt="example" style={{ width: '100%' }} src={previewImageG2} />
                                                                </Modal>
                                                            </div>
                                                        </Col>
                                                        <Col span={4} style={{marginLeft: '30px'}}>
                                                            <div className="preLoan-body-table-content-tab-card">
                                                                <Upload
                                                                    style={{height: '113px'}}
                                                                    listType="picture-card"
                                                                    data={{token: uploadToken}}
                                                                    fileList={fileListG3[0] ? (fileListG3[0]['url'] === zanwu ? [] : fileListG3) : fileListG3}
                                                                    action={UPLOAD_URL}
                                                                    onPreview={this.handlePreviewCardSCG}
                                                                    onChange={this.handleChangeCardSCG}
                                                                >
                                                                    {fileListG3[0] ? (fileListG3[0]['url'] === zanwu ? uploadButtonHz : (fileListG3.length >= 1 ? null : uploadButtonHz)) : uploadButtonHz}
                                                                </Upload>
                                                                <Modal visible={previewVisibleG3} footer={null} onCancel={this.handleCancelCardSCG}>
                                                                    <img alt="example" style={{ width: '100%' }} src={previewImageG3} />
                                                                </Modal>
                                                            </div>
                                                        </Col>
                                                        <Col span={8}></Col>
                                                    </Row>
                                                    <Row style={{marginTop: '34px'}}>
                                                        <Col span={12}>姓名：
                                                            <Input style={{width: '50%'}} value={cardZTwo ? cardZTwo.userName : ''} onChange={(e) => { this.changeCardZTwo(e, 'userName'); }}/>
                                                        </Col>
                                                        <Col span={12}>性别：
                                                            <Input style={{width: '50%'}} value={cardZTwo ? cardZTwo.gender : ''} onChange={(e) => { this.changeCardZTwo(e, 'gender'); }}/>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginTop: '16px'}}>
                                                        <Col span={12}>民族：<Input style={{width: '50%'}} value={cardZTwo ? cardZTwo.nation : ''} onChange={(e) => { this.changeCardZTwo(e, 'nation'); }}/></Col>
                                                        <Col span={12}>出生日期：
                                                            <Input style={{width: '50%'}} value={cardZTwo ? cardZTwo.customerBirth : ''} onChange={(e) => { this.changeCardZTwo(e, 'customerBirth'); }}/>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginTop: '16px'}}>
                                                        <Col span={12}>签证机关：
                                                            <Input
                                                                style={{width: '50%'}}
                                                                value={cardFTwo
                                                                    ? cardFTwo.authref
                                                                    : ''}
                                                                onChange={(e) => {
                                                                    this.changeCardZTwo(
                                                                        e,
                                                                        'authref',
                                                                        true);
                                                                }}/>
                                                        </Col>
                                                        <Col span={12}>户籍地：
                                                            <Input style={{width: '50%'}} value={cardZTwo ? cardZTwo.birthAddress : ''} onChange={(e) => { this.changeCardZTwo(e, 'birthAddress'); }}/>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginTop: '16px'}}>
                                                        <Col span={12}>有效截止日：
                                                            <DatePicker
                                                                style={{width: '25%'}}
                                                                value={cardFTwo.startDate ? moment(cardFTwo.startDate, 'YYYY-MM-DD') : null}
                                                                format='YYYY-MM-DD'
                                                                onChange={(val) => this.changePicker(val, 'cardFTwo', 'startDate')}
                                                                placeholder='请选择日期'
                                                            />
                                                            -
                                                            <DatePicker
                                                                style={{width: '25%'}}
                                                                value={cardFTwo.statdate ? moment(cardFTwo.statdate, 'YYYY-MM-DD') : null}
                                                                format='YYYY-MM-DD'
                                                                onChange={(val) => this.changePicker(val, 'cardFTwo', 'statdate')}
                                                                placeholder='请选择日期'
                                                            />
                                                            <span style={{color: '#F75151'}}>（有效期不能小于60天）</span>
                                                        </Col>
                                                        <Col span={12}>身份证号：
                                                            <Input style={{width: '50%'}} value={cardZTwo ? cardZTwo.idNo : ''} onChange={(e) => { this.changeCardZTwo(e, 'idNo'); }}/>
                                                        </Col>
                                                    </Row>
                                                    <Row className="preLoan-body-row-top">
                                                        <Col span={12}>
                                                            <span className="preLoan-body-title" style={{width: '100px'}}>手机号：</span>
                                                            <input type="text" value={loanIptArr.mobile2} onChange={(e) => { this.iptLoanIptArr(e, 'mobile2'); }} className="preLoan-body-input" />
                                                            <span style={{color: 'red', marginLeft: '10px', display: this.hasMobileError(loanIptArr.mobile2) ? '' : 'none'}}>{errorInfo.mobile}</span>
                                                        </Col>
                                                        <Col span={12}>
                                                        </Col>
                                                    </Row>
                                                    <Row className="preLoan-body-row-top">
                                                        <Col span={12}>
                                                            <span className="preLoan-body-title" style={{width: '100px'}}>征信结果：</span>
                                                            <Select style={{ width: '220px' }} value={zxjgName2} onChange={this.handleChangeSearchZXJG2}>
                                                                <Option value="0">不通过</Option>
                                                                <Option value="1">通过</Option>
                                                            </Select>
                                                        </Col>
                                                        <Col span={12}>
                                                        </Col>
                                                    </Row>
                                                    <Row className="preLoan-body-row-top">
                                                        <Col span={20}>
                                                            <span className="preLoan-body-title" style={{width: '100px'}}>征信说明：</span>
                                                            <textarea value={loanIptArr.bankCreditResultRemark2} ref={input => this.bankCreditResultRemark2Ipt = input} onChange={(e) => { this.iptLoanIptArr(e, 'bankCreditResultRemark2'); }} className="afp-body-textarea" style={{float: 'left'}}></textarea>
                                                        </Col>
                                                        <Col span={4}>
                                                        </Col>
                                                    </Row>
                                                    <Row className="preLoan-body-row-top" style={{display: isCommon02Vis ? 'none' : ''}}>
                                                        <Col span={5} style={{cursor: 'pointer'}} onClick={this.addCommon}>
                                                            <span style={{
                                                                display: 'inline-block',
                                                                height: '20px',
                                                                width: '20px',
                                                                textAlign: 'center',
                                                                lineHeight: '16px',
                                                                marginRight: '5px',
                                                                borderRadius: '100%',
                                                                'backgroundColor': '#42b983',
                                                                'color': '#fff',
                                                                fontSize: '24px',
                                                                fontWeight: 600
                                                            }}>+</span>
                                                            <span>添加共还人</span>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        ) : null
                                    }
                                    {
                                        isCommon02 ? (
                                            <div>
                                                <div>
                                                    <Row style={{marginTop: '28px'}}>
                                                        <Col span={4}>
                                                            <div className="preLoan-body-table-content-tab-card">
                                                                <Upload
                                                                    style={{height: '113px'}}
                                                                    listType="picture-card"
                                                                    data={{token: uploadToken}}
                                                                    fileList={fileListG102[0] ? (fileListG102[0]['url'] === zanwu ? [] : fileListG102) : fileListG102}
                                                                    action={UPLOAD_URL}
                                                                    onPreview={this.handlePreviewCardZG02}
                                                                    onChange={this.handleChangeCardZG02}
                                                                >
                                                                    {fileListG102[0] ? (fileListG102[0]['url'] === zanwu ? uploadButtonZ : (fileListG102.length >= 1 ? null : uploadButtonZ)) : uploadButtonZ}
                                                                </Upload>
                                                                <Modal visible={previewVisibleG02} footer={null} onCancel={this.handleCancelCardZG02}>
                                                                    <img alt="example" style={{ width: '100%' }} src={previewImageG02} />
                                                                </Modal>
                                                            </div>
                                                        </Col>
                                                        <Col span={4} style={{marginLeft: '30px'}}>
                                                            <div className="preLoan-body-table-content-tab-card">
                                                                <Upload
                                                                    style={{height: '113px'}}
                                                                    listType="picture-card"
                                                                    data={{token: uploadToken}}
                                                                    fileList={fileListG202[0] ? (fileListG202[0]['url'] === zanwu ? [] : fileListG202) : fileListG202}
                                                                    action={UPLOAD_URL}
                                                                    onPreview={this.handlePreviewCardFG02}
                                                                    onChange={this.handleChangeCardFG02}
                                                                >
                                                                    {fileListG202[0] ? (fileListG202[0]['url'] === zanwu ? uploadButtonF : (fileListG202.length >= 1 ? null : uploadButtonF)) : uploadButtonF}
                                                                </Upload>
                                                                <Modal visible={previewVisibleG202} footer={null} onCancel={this.handleCancelCardFG02}>
                                                                    <img alt="example" style={{ width: '100%' }} src={previewImageG202} />
                                                                </Modal>
                                                            </div>
                                                        </Col>
                                                        <Col span={4} style={{marginLeft: '30px'}}>
                                                            <div className="preLoan-body-table-content-tab-card">
                                                                <Upload
                                                                    style={{height: '113px'}}
                                                                    listType="picture-card"
                                                                    data={{token: uploadToken}}
                                                                    fileList={fileListG302[0] ? (fileListG302[0]['url'] === zanwu ? [] : fileListG302) : fileListG302}
                                                                    action={UPLOAD_URL}
                                                                    onPreview={this.handlePreviewCardSCG02}
                                                                    onChange={this.handleChangeCardSCG02}
                                                                >
                                                                    {fileListG302[0] ? (fileListG302[0]['url'] === zanwu ? uploadButtonHz : fileListG302.length >= 1 ? null : uploadButtonHz) : uploadButtonHz}
                                                                </Upload>
                                                                <Modal visible={previewVisibleG302} footer={null} onCancel={this.handleCancelCardSCG02}>
                                                                    <img alt="example" style={{ width: '100%' }} src={previewImageG302} />
                                                                </Modal>
                                                            </div>
                                                        </Col>
                                                        <Col span={8}></Col>
                                                    </Row>
                                                    <Row style={{marginTop: '34px'}}>
                                                        <Col span={12}>姓名：
                                                            <Input style={{width: '50%'}} value={cardZTwo02 ? cardZTwo02.userName : ''} onChange={(e) => { this.changeCardZTwo02(e, 'userName'); }}/>
                                                        </Col>
                                                        <Col span={12}>性别：
                                                            <Input style={{width: '50%'}} value={cardZTwo02 ? cardZTwo02.gender : ''} onChange={(e) => { this.changeCardZTwo02(e, 'gender'); }}/>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginTop: '16px'}}>
                                                        <Col span={12}>民族：
                                                            <Input style={{width: '50%'}} value={cardZTwo02 ? cardZTwo02.nation : ''} onChange={(e) => { this.changeCardZTwo02(e, 'nation'); }}/>
                                                        </Col>
                                                        <Col span={12}>出生日期：
                                                            <Input style={{width: '50%'}} value={cardZTwo02 ? cardZTwo02.customerBirth : ''} onChange={(e) => { this.changeCardZTwo02(e, 'customerBirth'); }}/>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginTop: '16px'}}>
                                                        <Col span={12}>签证机关：
                                                            <Input
                                                                style={{width: '50%'}}
                                                                value={cardFTwo02
                                                                    ? cardFTwo02.authref
                                                                    : ''}
                                                                onChange={(e) => {
                                                                    this.changeCardZTwo02(
                                                                        e,
                                                                        'authref',
                                                                        true);
                                                                }}/>
                                                        </Col>
                                                        <Col span={12}>户籍地：
                                                            <Input style={{width: '50%'}} value={cardZTwo02 ? cardZTwo02.birthAddress : ''} onChange={(e) => { this.changeCardZTwo02(e, 'birthAddress'); }}/>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginTop: '16px'}}>
                                                        <Col span={12}>有效截止日：
                                                            <DatePicker
                                                                style={{width: '25%'}}
                                                                value={cardFTwo02.startDate ? moment(cardFTwo02.startDate, 'YYYY-MM-DD') : null}
                                                                format='YYYY-MM-DD'
                                                                onChange={(val) => this.changePicker(val, 'cardFTwo02', 'startDate')}
                                                                placeholder='请选择日期'
                                                            />
                                                            -
                                                            <DatePicker
                                                                style={{width: '25%'}}
                                                                value={cardFTwo02.statdate ? moment(cardFTwo02.statdate, 'YYYY-MM-DD') : null}
                                                                format='YYYY-MM-DD'
                                                                onChange={(val) => this.changePicker(val, 'cardFTwo02', 'statdate')}
                                                                placeholder='请选择日期'
                                                            />
                                                            <span style={{color: '#F75151'}}>（有效期不能小于60天）</span>
                                                        </Col>
                                                        <Col span={12}>身份证号：
                                                            <Input style={{width: '50%'}} value={cardZTwo02 ? cardZTwo02.idNo : ''} onChange={(e) => { this.changeCardZTwo02(e, 'idNo'); }}/>
                                                        </Col>
                                                    </Row>
                                                    <Row className="preLoan-body-row-top">
                                                        <Col span={12}>
                                                            <span className="preLoan-body-title" style={{width: '100px'}}>手机号：</span>
                                                            <input type="text" value={loanIptArr.mobile202} onChange={(e) => { this.iptLoanIptArr(e, 'mobile202'); }} className="preLoan-body-input" />
                                                            <span style={{color: 'red', marginLeft: '10px', display: this.hasMobileError(loanIptArr.mobile202) ? '' : 'none'}}>{errorInfo.mobile}</span>
                                                        </Col>
                                                        <Col span={12}>
                                                        </Col>
                                                    </Row>
                                                    <Row className="preLoan-body-row-top">
                                                        <Col span={12}>
                                                            <span className="preLoan-body-title" style={{width: '100px'}}>征信结果：</span>
                                                            <Select style={{ width: '220px' }} value={zxjgName202} onChange={this.handleChangeSearchZXJG202}>
                                                                <Option value="0">不通过</Option>
                                                                <Option value="1">通过</Option>
                                                            </Select>
                                                        </Col>
                                                        <Col span={12}>
                                                        </Col>
                                                    </Row>
                                                    <Row className="preLoan-body-row-top">
                                                        <Col span={20}>
                                                            <span className="preLoan-body-title" style={{width: '100px'}}>征信说明：</span>
                                                            <textarea value={loanIptArr.bankCreditResultRemark202} ref={input => this.bankCreditResultRemark2Ipt = input} onChange={(e) => { this.iptLoanIptArr(e, 'bankCreditResultRemark202'); }} className="afp-body-textarea" style={{float: 'left'}}></textarea>
                                                        </Col>
                                                        <Col span={4}>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        ) : null
                                    }
                                    {
                                        isBack ? (
                                            <div>
                                                <Row style={{marginTop: '28px'}}>
                                                    <Col span={4}>
                                                        <div className="preLoan-body-table-content-tab-card">
                                                            <Upload
                                                                style={{height: '113px'}}
                                                                listType="picture-card"
                                                                data={{token: uploadToken}}
                                                                fileList={fileListB1[0] ? (fileListB1[0]['url'] === zanwu ? [] : fileListB1) : fileListB1}
                                                                action={UPLOAD_URL}
                                                                onPreview={this.handlePreviewCardZB}
                                                                onChange={this.handleChangeCardZB}
                                                            >
                                                                {fileListB1[0] ? (fileListB1[0]['url'] === zanwu ? uploadButtonZ : (fileListB1.length >= 1 ? null : uploadButtonZ)) : uploadButtonZ}
                                                            </Upload>
                                                            <Modal visible={previewVisibleB} footer={null} onCancel={this.handleCancelCardZB}>
                                                                <img alt="example" style={{ width: '100%' }} src={previewImageB} />
                                                            </Modal>
                                                        </div>
                                                    </Col>
                                                    <Col span={4} style={{marginLeft: '30px'}}>
                                                        <div className="preLoan-body-table-content-tab-card">
                                                            <Upload
                                                                style={{height: '113px'}}
                                                                listType="picture-card"
                                                                data={{token: uploadToken}}
                                                                fileList={fileListB2[0] ? (fileListB2[0]['url'] === zanwu ? [] : fileListB2) : fileListB2}
                                                                action={UPLOAD_URL}
                                                                onPreview={this.handlePreviewCardFB}
                                                                onChange={this.handleChangeCardFB}
                                                            >
                                                                {fileListB2[0] ? (fileListB2[0]['url'] === zanwu ? uploadButtonF : (fileListB2.length >= 1 ? null : uploadButtonF)) : uploadButtonF}
                                                            </Upload>
                                                            <Modal visible={previewVisibleB2} footer={null} onCancel={this.handleCancelCardFB}>
                                                                <img alt="example" style={{ width: '100%' }} src={previewImageB2} />
                                                            </Modal>
                                                        </div>
                                                    </Col>
                                                    <Col span={4} style={{marginLeft: '30px'}}>
                                                        <div className="preLoan-body-table-content-tab-card">
                                                            <Upload
                                                                style={{height: '113px'}}
                                                                listType="picture-card"
                                                                data={{token: uploadToken}}
                                                                fileList={fileListB3[0] ? (fileListB3[0]['url'] === zanwu ? [] : fileListB3) : fileListB3}
                                                                action={UPLOAD_URL}
                                                                onPreview={this.handlePreviewCardSCB}
                                                                onChange={this.handleChangeCardSCB}
                                                            >
                                                                {fileListB3[0] ? (fileListB3[0]['url'] === zanwu ? uploadButtonHz : (fileListB3.length >= 1 ? null : uploadButtonHz)) : uploadButtonHz}
                                                            </Upload>
                                                            <Modal visible={previewVisibleB3} footer={null} onCancel={this.handleCancelCardSCB}>
                                                                <img alt="example" style={{ width: '100%' }} src={previewImageB3} />
                                                            </Modal>
                                                        </div>
                                                    </Col>
                                                    <Col span={8}></Col>
                                                </Row>
                                                <Row style={{marginTop: '34px'}}>
                                                    <Col span={12}>姓名：
                                                        <Input style={{width: '50%'}} value={cardZThree ? cardZThree.userName : ''} onChange={(e) => { this.changeCardZThree(e, 'userName'); }}/>
                                                    </Col>
                                                    <Col span={12}>性别：
                                                        <Input style={{width: '50%'}} value={cardZThree ? cardZThree.gender : ''} onChange={(e) => { this.changeCardZThree(e, 'gender'); }}/>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop: '16px'}}>
                                                    <Col span={12}>民族：
                                                        <Input style={{width: '50%'}} value={cardZThree ? cardZThree.nation : ''} onChange={(e) => { this.changeCardZThree(e, 'nation'); }}/>
                                                    </Col>
                                                    <Col span={12}>出生日期：
                                                        <Input style={{width: '50%'}} value={cardZThree ? cardZThree.customerBirth : ''} onChange={(e) => { this.changeCardZThree(e, 'customerBirth'); }}/>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop: '16px'}}>
                                                    <Col span={12}>签证机关：
                                                        <Input
                                                            style={{width: '50%'}}
                                                            value={cardFThree
                                                                ? cardFThree.authref
                                                                : ''}
                                                            onChange={(e) => {
                                                                this.changeCardZThree(
                                                                    e,
                                                                    'authref',
                                                                    true);
                                                            }}/>
                                                    </Col>
                                                    <Col span={12}>户籍地：
                                                        <Input style={{width: '50%'}} value={cardZThree ? cardZThree.birthAddress : ''} onChange={(e) => { this.changeCardZThree(e, 'birthAddress'); }}/>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop: '16px'}}>
                                                    <Col span={12}>有效截止日：
                                                        <DatePicker
                                                            style={{width: '25%'}}
                                                            value={cardFThree.startDate ? moment(cardFThree.startDate, 'YYYY-MM-DD') : null}
                                                            format='YYYY-MM-DD'
                                                            onChange={(val) => this.changePicker(val, 'cardFThree', 'startDate')}
                                                            placeholder='请选择日期'
                                                        />
                                                        -
                                                        <DatePicker
                                                            style={{width: '25%'}}
                                                            value={cardFThree.statdate ? moment(cardFThree.statdate, 'YYYY-MM-DD') : null}
                                                            format='YYYY-MM-DD'
                                                            onChange={(val) => this.changePicker(val, 'cardFThree', 'statdate')}
                                                            placeholder='请选择日期'
                                                        />
                                                        <span style={{color: '#F75151'}}>（有效期不能小于60天）</span>
                                                    </Col>
                                                    <Col span={12}>身份证号：
                                                        <Input style={{width: '50%'}} value={cardZThree ? cardZThree.idNo : ''} onChange={(e) => { this.changeCardZThree(e, 'idNo'); }}/>
                                                    </Col>
                                                </Row>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={12} style={{position: 'relative'}}>
                                                        <span className="preLoan-body-title" style={{width: '100px'}}>手机号：</span>
                                                        <input type="text" value={loanIptArr.mobile3} onChange={(e) => { this.iptLoanIptArr(e, 'mobile3'); }} className="preLoan-body-input" />
                                                        <span style={{color: 'red', marginLeft: '10px', display: this.hasMobileError(loanIptArr.mobile3) ? '' : 'none'}}>{errorInfo.mobile}</span>
                                                    </Col>
                                                    <Col span={12}>
                                                    </Col>
                                                </Row>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title" style={{width: '100px'}}>征信结果：</span>
                                                        <Select style={{ width: '220px' }} value={zxjgName3} onChange={this.handleChangeSearchZXJG3}>
                                                            <Option value="0">不通过</Option>
                                                            <Option value="1">通过</Option>
                                                        </Select>
                                                    </Col>
                                                    <Col span={12}>
                                                    </Col>
                                                </Row>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={20}>
                                                        <span className="preLoan-body-title" style={{width: '100px'}}>征信说明：</span>
                                                        <textarea value={loanIptArr.bankCreditResultRemark3} ref={input => this.bankCreditResultRemark3Ipt = input} onChange={(e) => { this.iptLoanIptArr(e, 'bankCreditResultRemark3'); }} className="afp-body-textarea" style={{float: 'left'}}></textarea>
                                                    </Col>
                                                    <Col span={4}>
                                                    </Col>
                                                </Row>
                                                <Row className="preLoan-body-row-top" style={{display: isBack02Vis ? 'none' : ''}}>
                                                    <Col span={5} style={{cursor: 'pointer'}} onClick={this.addBack02}>
                                                            <span style={{
                                                                display: 'inline-block',
                                                                height: '20px',
                                                                width: '20px',
                                                                textAlign: 'center',
                                                                lineHeight: '16px',
                                                                marginRight: '5px',
                                                                borderRadius: '100%',
                                                                'backgroundColor': '#42b983',
                                                                'color': '#fff',
                                                                fontSize: '24px',
                                                                fontWeight: 600
                                                            }}>+</span>
                                                        <span>添加反担保人</span>
                                                    </Col>
                                                </Row>
                                            </div>
                                        ) : null
                                    }
                                    {
                                        isBack02 ? (
                                            <div>
                                                <Row style={{marginTop: '28px'}}>
                                                    <Col span={4}>
                                                        <div className="preLoan-body-table-content-tab-card">
                                                            <Upload
                                                                style={{height: '113px'}}
                                                                listType="picture-card"
                                                                data={{token: uploadToken}}
                                                                fileList={fileListB102[0] ? (fileListB102[0]['url'] === zanwu ? [] : fileListB102) : fileListB102}
                                                                action={UPLOAD_URL}
                                                                onPreview={this.handlePreviewCardZB02}
                                                                onChange={this.handleChangeCardZB02}
                                                            >
                                                                {fileListB102[0] ? (fileListB102[0]['url'] === zanwu ? uploadButtonZ : (fileListB102.length >= 1 ? null : uploadButtonZ)) : uploadButtonZ}
                                                            </Upload>
                                                            <Modal visible={previewVisibleB02} footer={null} onCancel={this.handleCancelCardZB02}>
                                                                <img alt="example" style={{ width: '100%' }} src={previewImageB02} />
                                                            </Modal>
                                                        </div>
                                                    </Col>
                                                    <Col span={4} style={{marginLeft: '30px'}}>
                                                        <div className="preLoan-body-table-content-tab-card">
                                                            <Upload
                                                                style={{height: '113px'}}
                                                                listType="picture-card"
                                                                data={{token: uploadToken}}
                                                                fileList={fileListB202[0] ? (fileListB202[0]['url'] === zanwu ? [] : fileListB202) : fileListB202}
                                                                action={UPLOAD_URL}
                                                                onPreview={this.handlePreviewCardFB02}
                                                                onChange={this.handleChangeCardFB02}
                                                            >
                                                                {fileListB202[0] ? (fileListB202[0]['url'] === zanwu ? uploadButtonF : (fileListB202.length >= 1 ? null : uploadButtonF)) : uploadButtonF}
                                                            </Upload>
                                                            <Modal visible={previewVisibleB202} footer={null} onCancel={this.handleCancelCardFB02}>
                                                                <img alt="example" style={{ width: '100%' }} src={previewImageB202} />
                                                            </Modal>
                                                        </div>
                                                    </Col>
                                                    <Col span={4} style={{marginLeft: '30px'}}>
                                                        <div className="preLoan-body-table-content-tab-card">
                                                            <Upload
                                                                style={{height: '113px'}}
                                                                listType="picture-card"
                                                                data={{token: uploadToken}}
                                                                fileList={fileListB302[0] ? (fileListB302[0]['url'] === zanwu ? [] : fileListB302) : fileListB302}
                                                                action={UPLOAD_URL}
                                                                onPreview={this.handlePreviewCardSCB02}
                                                                onChange={this.handleChangeCardSCB02}
                                                            >
                                                                {fileListB302[0] ? (fileListB302[0]['url'] === zanwu ? uploadButtonHz : (fileListB302.length >= 1 ? null : uploadButtonHz)) : uploadButtonHz}
                                                            </Upload>
                                                            <Modal visible={previewVisibleB302} footer={null} onCancel={this.handleCancelCardSCB02}>
                                                                <img alt="example" style={{ width: '100%' }} src={previewImageB302} />
                                                            </Modal>
                                                        </div>
                                                    </Col>
                                                    <Col span={8}></Col>
                                                </Row>
                                                <Row style={{marginTop: '34px'}}>
                                                    <Col span={12}>姓名：
                                                        <Input style={{width: '50%'}} value={cardZThree02 ? cardZThree02.userName : ''} onChange={(e) => { this.changeCardZThree02(e, 'userName'); }}/>
                                                    </Col>
                                                    <Col span={12}>性别：
                                                        <Input style={{width: '50%'}} value={cardZThree02 ? cardZThree02.gender : ''} onChange={(e) => { this.changeCardZThree02(e, 'gender'); }}/>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop: '16px'}}>
                                                    <Col span={12}>民族：
                                                        <Input style={{width: '50%'}} value={cardZThree02 ? cardZThree02.nation : ''} onChange={(e) => { this.changeCardZThree02(e, 'nation'); }}/>
                                                    </Col>
                                                    <Col span={12}>出生日期：
                                                        <Input style={{width: '50%'}} value={cardZThree02 ? cardZThree02.customerBirth : ''} onChange={(e) => { this.changeCardZThree02(e, 'customerBirth'); }}/>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop: '16px'}}>
                                                    <Col span={12}>签证机关：
                                                        <Input
                                                            style={{width: '50%'}}
                                                            value={cardFThree02
                                                                ? cardFThree02.authref
                                                                : ''}
                                                            onChange={(e) => {
                                                                this.changeCardZThree02(
                                                                    e,
                                                                    'authref',
                                                                    true);
                                                            }}/>
                                                    </Col>
                                                    <Col span={12}>户籍地：
                                                        <Input style={{width: '50%'}} value={cardZThree02 ? cardZThree02.birthAddress : ''} onChange={(e) => { this.changeCardZThree02(e, 'birthAddress'); }}/>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop: '16px'}}>
                                                    <Col span={12}>有效截止日：
                                                        <DatePicker
                                                            style={{width: '25%'}}
                                                            value={cardFThree02.startDate ? moment(cardFThree02.startDate, 'YYYY-MM-DD') : null}
                                                            format='YYYY-MM-DD'
                                                            onChange={(val) => this.changePicker(val, 'cardFThree02', 'startDate')}
                                                            placeholder='请选择日期'
                                                        />
                                                        -
                                                        <DatePicker
                                                            style={{width: '25%'}}
                                                            value={cardFThree02.statdate ? moment(cardFThree02.statdate, 'YYYY-MM-DD') : null}
                                                            format='YYYY-MM-DD'
                                                            onChange={(val) => this.changePicker(val, 'cardFThree02', 'statdate')}
                                                            placeholder='请选择日期'
                                                        />
                                                        <span style={{color: '#F75151'}}>（有效期不能小于60天）</span>
                                                    </Col>
                                                    <Col span={12}>身份证号：
                                                        <Input style={{width: '50%'}} value={cardZThree02 ? cardZThree02.idNo : ''} onChange={(e) => { this.changeCardZThree02(e, 'idNo'); }}/>
                                                    </Col>
                                                </Row>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title" style={{width: '100px'}}>手机号：</span>
                                                        <input type="text" value={loanIptArr.mobile302} onChange={(e) => { this.iptLoanIptArr(e, 'mobile302'); }} className="preLoan-body-input" />
                                                        <span style={{color: 'red', marginLeft: '10px', display: this.hasMobileError(loanIptArr.mobile302) ? '' : 'none'}}>{errorInfo.mobile}</span>
                                                    </Col>
                                                    <Col span={12}>
                                                    </Col>
                                                </Row>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title" style={{width: '100px'}}>征信结果：</span>
                                                        <Select style={{ width: '220px' }} value={zxjgName302} onChange={this.handleChangeSearchZXJG302}>
                                                            <Option value="0">不通过</Option>
                                                            <Option value="1">通过</Option>
                                                        </Select>
                                                    </Col>
                                                    <Col span={12}>
                                                    </Col>
                                                </Row>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={20}>
                                                        <span className="preLoan-body-title" style={{width: '100px'}}>征信说明：</span>
                                                        <textarea value={loanIptArr.bankCreditResultRemark302} ref={input => this.bankCreditResultRemark3Ipt = input} onChange={(e) => { this.iptLoanIptArr(e, 'bankCreditResultRemark302'); }} className="afp-body-textarea" style={{float: 'left'}}></textarea>
                                                    </Col>
                                                    <Col span={4}>
                                                    </Col>
                                                </Row>
                                            </div>
                                        ) : null
                                    }
                                </div>
                            ) : null
                        }
                        {/* 基本信息 */}
                        {
                            isBaseInfo ? (
                                <div>
                                    <span className="preLoan-body-tag">主贷人</span>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">教育程度：</span>
                                            <Select className="preLoan-body-select" value={jycd} style={{width: '220px'}} onChange={this.handleChangeEdt}>
                                                {
                                                    education.map(data => {
                                                        return (
                                                            <Option key={data.dkey} value={data.dkey}>{data.dvalue}</Option>
                                                        );
                                                    })
                                                }
                                            </Select>
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title">住宅：</span>
                                            <AreaCascader
                                                type="text"
                                                placeholder={`${mainLoanPpIptArr.nowAddressProvince ? mainLoanPpIptArr.nowAddressProvince : ''}-${mainLoanPpIptArr.nowAddressCity ? mainLoanPpIptArr.nowAddressCity : ''}-${mainLoanPpIptArr.nowAddressArea ? mainLoanPpIptArr.nowAddressArea : ''}`}
                                                onChange={this.selectedChange}
                                                level={1}
                                                data={pcaa}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">住宅详细地址：</span>
                                            <input type="text" value={mainLoanPpIptArr.nowAddress} ref={input => this.nowAddressProvinceIpt = input} onChange={(e) => { this.iptBaseInfoMainLoanPp(e, 'nowAddress'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title">住宅电话：</span>
                                            <input type="text" value={mainLoanPpIptArr.nowAddressMobile} onChange={(e) => { this.iptBaseInfoMainLoanPp(e, 'nowAddressMobile'); }} className="preLoan-body-input" />
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">入住日期：</span>
                                            <MonthPicker format={'YYYY-MM'} style={{width: '220px', float: 'left'}} defaultValue={moment(regDate2)} onChange={this.onChangeTime2}/>
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title">住宅状况：</span>
                                            <Select className="preLoan-body-select" style={{width: '220px'}} value={zzzk} onChange={this.handleChangeNowAddressState}>
                                                {
                                                    nowAddressStateList.map(data => {
                                                        return (
                                                            <Option key={data.dkey} value={data.dkey}>{data.dvalue}</Option>
                                                        );
                                                    })
                                                }
                                            </Select>
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">婚姻状态：</span>
                                            <Select className="preLoan-body-select" style={{width: '220px'}} value={hyzt} onChange={this.handleChangeMarriageStatus}>
                                                {
                                                    marryState.map(data => {
                                                        return (
                                                            <Option key={data.dkey} value={data.dkey}>{data.dvalue}</Option>
                                                        );
                                                    })
                                                }
                                            </Select>
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title">住房类型：</span>
                                            <Select className="preLoan-body-select" value={zflx} style={{width: '220px'}} onChange={this.handleChangeHousingType}>
                                                <Option value="0">自有</Option>
                                                <Option value="1">租用</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">工作单位：</span>
                                            <input type="text" value={mainLoanPpIptArr.companyName} onChange={(e) => { this.iptBaseInfoMainLoanPp(e, 'companyName'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title">单位地址：</span>
                                            <AreaCascader width={200} type="text" placeholder={`${mainLoanPpIptArr.companyProvince ? mainLoanPpIptArr.companyProvince : ''}-${mainLoanPpIptArr.companyCity ? mainLoanPpIptArr.companyCity : ''}-${mainLoanPpIptArr.companyArea ? mainLoanPpIptArr.companyArea : ''}`} onChange={this.selectedChange2} level={1} data={pcaa} />
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">单位详细地址：</span>
                                            <input type="text" value={mainLoanPpIptArr.companyAddress} onChange={(e) => { this.iptBaseInfoMainLoanPp(e, 'companyAddress'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title">单位性质：</span>
                                            <Select className="preLoan-body-select" style={{width: '220px'}} value={dwxz} onChange={this.handleChangeWorkCompanyProperty}>
                                                {
                                                    workCompanyPropertyList.map(data => {
                                                        return (
                                                            <Option key={data.dkey} value={data.dkey}>{data.dvalue}</Option>
                                                        );
                                                    })
                                                }
                                            </Select>
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title" style={{width: '140px'}}>何时进入现单位工作：</span>
                                            <MonthPicker format={'YYYY-MM'} style={{width: '220px', float: 'left'}} defaultValue={moment(regDate3)} onChange={this.onChangeTime3}/>
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title">职业：</span>
                                            <Select className="preLoan-body-select" style={{width: '220px'}} value={mainLoanPpIptArr.position} onChange={this.handleChangeIptBaseInfoMainLoanPp}>
                                                {
                                                    workProfession.map(data => {
                                                        return (
                                                            <Option key={data.dkey} value={data.dkey}>{data.dvalue}</Option>
                                                        );
                                                    })
                                                }
                                            </Select>
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title" style={{width: '140px'}}>月收入：</span>
                                            <input type="text" value={mainLoanPpIptArr.yearIncome} ref={input => this.yearIncomeIpt = input} onChange={(e) => { this.iptBaseInfoMainLoanPp(e, 'yearIncome'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title">现职年数：</span>
                                            <input type="text" value={mainLoanPpIptArr.presentJobYears} ref={input => this.currentPostYearsIpt = input} onChange={(e) => { this.iptBaseInfoMainLoanPp(e, 'presentJobYears'); }} className="preLoan-body-input" />
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title" style={{width: '140px'}}>常住类型：</span>
                                            <Select className="preLoan-body-select" value={czlx} style={{width: '220px'}} onChange={this.handleChangePermanentResidence}>
                                                {
                                                    permanentType.map(data => {
                                                        return (
                                                            <Option key={data.dkey} value={data.dkey}>{data.dvalue}</Option>
                                                        );
                                                    })
                                                }
                                            </Select>
                                        </Col>
                                        <Col span={12}></Col>
                                    </Row>
                                    <div className="preLoan-body-row-line"></div>
                                    {
                                        cardZTwo && cardZTwo.userName ? (
                                            <div>
                                                <span className="preLoan-body-tag">共还人1</span>
                                                <div style={{marginTop: '24px'}}><span>姓名：{cardZTwo ? (cardZTwo.userName === '' ? '暂无人员信息' : cardZTwo.userName) : ''}</span><span style={{marginLeft: '90px'}}>手机号：{loanIptArr ? (loanIptArr.mobile2 === '' ? '暂无手机号信息' : loanIptArr.mobile2) : ''}</span><span style={{marginLeft: '90px'}}>身份证号：{cardZTwo ? (cardZTwo.idNo === '' ? '暂无身份证号信息' : cardZTwo.idNo) : ''}</span></div>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title">工作单位：</span>
                                                        <input type="text" value={altogetherPpIptArr.companyName} onChange={(e) => { this.iptaltogetherPp(e, 'companyName'); }} className="preLoan-body-input" />
                                                    </Col>
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title">职业：</span>
                                                        <Select className="preLoan-body-select" style={{width: '220px'}} value={altogetherPpIptArr.position} onChange={this.handleChangeAltogetherPpIptArr}>
                                                            {
                                                                workProfession.map(data => {
                                                                    return (
                                                                        <Option key={data.dkey} value={data.dkey}>{data.dvalue}</Option>
                                                                    );
                                                                })
                                                            }
                                                        </Select>
                                                    </Col>
                                                </Row>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title">现住地址：</span>
                                                        <input type="text" value={altogetherPpIptArr.nowAddress} onChange={(e) => { this.iptaltogetherPp(e, 'nowAddress'); }} className="preLoan-body-input" />
                                                    </Col>
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title">单位地址：</span>
                                                        <input type="text" value={altogetherPpIptArr.companyAddress} onChange={(e) => { this.iptaltogetherPp(e, 'companyAddress'); }} className="preLoan-body-input" />
                                                    </Col>
                                                </Row>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title" style={{width: '120px'}}>与主贷人关系：</span>
                                                        <Select className="preLoan-body-select" value={ghyzdgx1} style={{width: '220px'}} onChange={this.handleChangeGhyzdgx1}>
                                                            {
                                                                creditUserRelation.map(data => {
                                                                    return (
                                                                        <Option key={data.dkey} value={data.dkey}>{data.dvalue}</Option>
                                                                    );
                                                                })
                                                            }
                                                        </Select>
                                                    </Col>
                                                    <Col span={12}></Col>
                                                </Row>
                                                <div className="preLoan-body-row-line"></div>
                                            </div>
                                        ) : null
                                    }
                                    {
                                        cardZTwo02 && cardZTwo02.userName ? (
                                            <div>
                                                <span className="preLoan-body-tag">共还人2</span>
                                                <div style={{marginTop: '24px'}}><span>姓名：{cardZTwo02 ? (cardZTwo02.userName === '' ? '暂无人员信息' : cardZTwo02.userName) : ''}</span><span style={{marginLeft: '90px'}}>手机号：{loanIptArr ? (loanIptArr.mobile202 === '' ? '暂无手机号信息' : loanIptArr.mobile202) : ''}</span><span style={{marginLeft: '90px'}}>身份证号：{cardZTwo02 ? (cardZTwo02.idNo === '' ? '暂无身份证号信息' : cardZTwo02.idNo) : ''}</span></div>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title">工作单位：</span>
                                                        <input type="text" value={altogetherPpIptArr02.companyName} onChange={(e) => { this.iptaltogetherPp02(e, 'companyName'); }} className="preLoan-body-input" />
                                                    </Col>
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title">职业：</span>
                                                        <Select className="preLoan-body-select" style={{width: '220px'}} value={altogetherPpIptArr02.position} onChange={this.handleChangeAltogetherPpIptArr02}>
                                                            {
                                                                workProfession.map(data => {
                                                                    return (
                                                                        <Option key={data.dkey} value={data.dkey}>{data.dvalue}</Option>
                                                                    );
                                                                })
                                                            }
                                                        </Select>
                                                    </Col>
                                                </Row>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title">现住地址：</span>
                                                        <input type="text" value={altogetherPpIptArr02.nowAddress} onChange={(e) => { this.iptaltogetherPp02(e, 'nowAddress'); }} className="preLoan-body-input" />
                                                    </Col>
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title">单位地址：</span>
                                                        <input type="text" value={altogetherPpIptArr02.companyAddress} onChange={(e) => { this.iptaltogetherPp02(e, 'companyAddress'); }} className="preLoan-body-input" />
                                                    </Col>
                                                </Row>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title" style={{width: '120px'}}>与主贷人关系：</span>
                                                        <Select className="preLoan-body-select" value={ghyzdgx2} style={{width: '220px'}} onChange={this.handleChangeGhyzdgx2}>
                                                            {
                                                                creditUserRelation.map(data => {
                                                                    return (
                                                                        <Option key={data.dkey} value={data.dkey}>{data.dvalue}</Option>
                                                                    );
                                                                })
                                                            }
                                                        </Select>
                                                    </Col>
                                                    <Col span={12}></Col>
                                                </Row>
                                                <div className="preLoan-body-row-line"></div>
                                            </div>
                                        ) : null
                                    }
                                    {
                                        cardZThree && cardZThree.userName ? (
                                            <div>
                                                <span className="preLoan-body-tag">反担保人1</span>
                                                <div style={{marginTop: '24px'}}><span>姓名：{cardZThree ? (cardZThree.userName === '' ? '暂无人员信息' : cardZThree.userName) : cardZThree}</span><span style={{marginLeft: '90px'}}>手机号：{loanIptArr ? (loanIptArr.mobile3 === '' ? '暂无手机号信息' : loanIptArr.mobile3) : ''}</span><span style={{marginLeft: '90px'}}>身份证号：{cardZThree ? (cardZThree.idNo === '' ? '暂无身份证号信息' : cardZThree.idNo) : ''}</span></div>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title">工作单位：</span>
                                                        <input type="text" value={bkGuaranteePpArr.companyName} onChange={(e) => { this.iptBkGtPp(e, 'companyName'); }} className="preLoan-body-input" />
                                                    </Col>
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title">职业：</span>
                                                        <Select className="preLoan-body-select" style={{width: '220px'}} value={bkGuaranteePpArr.position} onChange={this.handleChangeBkGuaranteePpArr}>
                                                            {
                                                                workProfession.map(data => {
                                                                    return (
                                                                        <Option key={data.dkey} value={data.dkey}>{data.dvalue}</Option>
                                                                    );
                                                                })
                                                            }
                                                        </Select>
                                                    </Col>
                                                </Row>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title">现住地址：</span>
                                                        <input type="text" value={bkGuaranteePpArr.nowAddress} ref={input => this.bkGtNowAddressIpt = input} onChange={(e) => { this.iptBkGtPp(e, 'nowAddress'); }} className="preLoan-body-input" />
                                                    </Col>
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title">单位地址：</span>
                                                        <input type="text" value={bkGuaranteePpArr.companyAddress} ref={input => this.bkGtCompanyAddressIpt = input} onChange={(e) => { this.iptBkGtPp(e, 'companyAddress'); }} className="preLoan-body-input" />
                                                    </Col>
                                                </Row>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title" style={{width: '120px'}}>与主贷人关系：</span>
                                                        <Select className="preLoan-body-select" value={dbryzdgx1} style={{width: '220px'}} onChange={this.handleChangeDbryzdgx1}>
                                                            {
                                                                creditUserRelation.map(data => {
                                                                    return (
                                                                        <Option key={data.dkey} value={data.dkey}>{data.dvalue}</Option>
                                                                    );
                                                                })
                                                            }
                                                        </Select>
                                                    </Col>
                                                    <Col span={12}></Col>
                                                </Row>
                                                <div className="preLoan-body-row-line"></div>
                                            </div>
                                        ) : null
                                    }
                                    {
                                        cardZThree02 && cardZThree02.userName ? (
                                            <div>
                                                <span className="preLoan-body-tag">反担保人2</span>
                                                <div style={{marginTop: '24px'}}><span>姓名：{cardZThree02 ? (cardZThree02.userName === '' ? '暂无人员信息' : cardZThree02.userName) : ''}</span><span style={{marginLeft: '90px'}}>手机号：{loanIptArr ? (loanIptArr.mobile302 === '' ? '暂无手机号信息' : loanIptArr.mobile302) : ''}</span><span style={{marginLeft: '90px'}}>身份证号：{cardZThree02 ? (cardZThree02.idNo === '' ? '暂无身份证号信息' : cardZThree02.idNo) : ''}</span></div>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title">工作单位：</span>
                                                        <input type="text" value={bkGuaranteePpArr02.companyName} onChange={(e) => { this.iptBkGtPp02(e, 'companyName'); }} className="preLoan-body-input" />
                                                    </Col>
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title">职业：</span>
                                                        <Select className="preLoan-body-select" style={{width: '220px'}} value={bkGuaranteePpArr02.position} onChange={this.handleChangeBkGuaranteePpArr02}>
                                                            {
                                                                workProfession.map(data => {
                                                                    return (
                                                                        <Option key={data.dkey} value={data.dkey}>{data.dvalue}</Option>
                                                                    );
                                                                })
                                                            }
                                                        </Select>
                                                    </Col>
                                                </Row>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title">现住地址：</span>
                                                        <input type="text" value={bkGuaranteePpArr02.nowAddress} onChange={(e) => { this.iptBkGtPp02(e, 'nowAddress'); }} className="preLoan-body-input" />
                                                    </Col>
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title">单位地址：</span>
                                                        <input type="text" value={bkGuaranteePpArr02.companyAddress} onChange={(e) => { this.iptBkGtPp02(e, 'companyAddress'); }} className="preLoan-body-input" />
                                                    </Col>
                                                </Row>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title" style={{width: '120px'}}>与主贷人关系：</span>
                                                        <Select className="preLoan-body-select" value={dbryzdgx2} style={{width: '220px'}} onChange={this.handleChangeDbryzdgx2}>
                                                            {
                                                                creditUserRelation.map(data => {
                                                                    return (
                                                                        <Option key={data.dkey} value={data.dkey}>{data.dvalue}</Option>
                                                                    );
                                                                })
                                                            }
                                                        </Select>
                                                    </Col>
                                                    <Col span={12}></Col>
                                                </Row>
                                                <div className="preLoan-body-row-line"></div>
                                            </div>
                                        ) : null
                                    }
                                    <span className="preLoan-body-tag">紧急联系人</span>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title"><span style={{color: 'red'}}>* </span>姓名：</span>
                                            <input type="text" value={mainLoanPpIptArr.emergencyName1} ref={input => this.emergencyName1Ipt = input} onChange={(e) => { this.iptBaseInfoMainLoanPp(e, 'emergencyName1'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title" style={{width: '120px'}}><span style={{color: 'red'}}>* </span>与主贷人关系：</span>
                                            <Select className="preLoan-body-select" value={yzdgx} style={{width: '220px'}} onChange={this.handleChangeEmergency}>
                                                {
                                                    creditUserRelation.map(data => {
                                                        return (
                                                            <Option key={data.dkey} value={data.dkey}>{data.dvalue}</Option>
                                                        );
                                                    })
                                                }
                                            </Select>
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title"><span style={{color: 'red'}}>* </span>手机号：</span>
                                            <input type="text" value={mainLoanPpIptArr.emergencyMobile1} onChange={(e) => { this.iptBaseInfoMainLoanPp(e, 'emergencyMobile1'); }} className="preLoan-body-input" />
                                            <span style={{color: 'red', marginLeft: '10px', display: this.hasMobileError(mainLoanPpIptArr.emergencyMobile1) ? '' : 'none'}}>{errorInfo.mobile}</span>
                                        </Col>
                                        <Col span={12}>
                                        </Col>
                                    </Row>
                                    <div className="preLoan-body-row-line"></div>
                                    <span className="preLoan-body-tag">紧急联系人二</span>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title"><span style={{color: 'red'}}>* </span>姓名：</span>
                                            <input type="text" value={mainLoanPpIptArr.emergencyName2} onChange={(e) => { this.iptBaseInfoMainLoanPp(e, 'emergencyName2'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title" style={{width: '120px'}}><span style={{color: 'red'}}>* </span>与主贷人关系：</span>
                                            <Select className="preLoan-body-select" value={yzdgx2} style={{width: '220px'}} onChange={this.handleChangeEmergency2}>
                                                {
                                                    creditUserRelation.map(data => {
                                                        return (
                                                            <Option key={data.dkey} value={data.dkey}>{data.dvalue}</Option>
                                                        );
                                                    })
                                                }
                                            </Select>
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title"><span style={{color: 'red'}}>* </span>手机号：</span>
                                            <input type="text" value={mainLoanPpIptArr.emergencyMobile2} onChange={(e) => { this.iptBaseInfoMainLoanPp(e, 'emergencyMobile2'); }} className="preLoan-body-input" />
                                            <span style={{color: 'red', marginLeft: '10px', display: this.hasMobileError(mainLoanPpIptArr.emergencyMobile2) ? '' : 'none'}}>{errorInfo.mobile}</span>
                                        </Col>
                                        <Col span={12}>
                                        </Col>
                                    </Row>
                                </div>
                            ) : null
                        }
                        {/* 贷款信息 */}
                        {
                            isLoanInfo ? (
                                <div>
                                    <span className="preLoan-body-tag">贷款信息</span>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <div><span className="preLoan-body-title" style={{width: '100px'}}><span style={{color: 'red'}}>* </span>贷款本金：</span></div>
                                            <div>
                                                <input
                                                    type="number"
                                                    value={loanInfoArrIpt.loanAmount}
                                                    onChange={(e) => { this.iptLoanInfoPp(e, 'loanAmount'); }}
                                                    className="preLoan-body-input"
                                                />
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div><span className="preLoan-body-title" style={{width: '100px'}}><span style={{color: 'red'}}>* </span>贷款期数：</span></div>
                                            <div>
                                                <Select className="preLoan-body-select" value={loanPeriodCode} style={{width: '220px'}} onChange={this.handleChangeLoanPeriod}>
                                                    {
                                                        loanPeriod.map(data => {
                                                            return (
                                                                <Option key={data.dkey} value={data.dkey}>{data.dvalue}</Option>
                                                            );
                                                        })
                                                    }
                                                </Select>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title" style={{width: '120px'}}><span style={{color: 'red'}}>* </span>银行利率(%)：</span>
                                            </div>
                                            <div>
                                                <input type="number" readOnly="readonly" value={loanInfoArrIpt.bankRate} onChange={(e) => { this.iptLoanInfoPp(e, 'bankRate'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title" style={{width: '100px'}}><span style={{color: 'red'}}>* </span>总利率(%)：</span>
                                            </div>
                                            <div>
                                                <input type="number" value={loanInfoArrIpt.totalRate} onChange={(e) => { this.iptLoanInfoPp(e, 'totalRate'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title" style={{width: '120px'}}><span style={{color: 'red'}}>* </span>返存利率(%)：</span>
                                            </div>
                                            <div>
                                                <input type="number" value={loanInfoArrIpt.rebateRate} onChange={(e) => { this.iptLoanInfoPp(e, 'rebateRate'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title" style={{width: '100px'}}><span style={{color: 'red'}}>* </span>是否垫资：</span>
                                            </div>
                                            <div>
                                                <Select className="preLoan-body-select" value={sfdz} style={{width: '220px'}} onChange={this.handleChangeLoanInfoIsNotAdvance}>
                                                    <Option value="0">否</Option>
                                                    <Option value="1">是</Option>
                                                </Select>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title" style={{width: '100px'}}><span style={{color: 'red'}}>* </span>月供：</span>
                                            </div>
                                            <div>
                                                <input type="number" value={loanInfoArrIpt.monthAmount} onChange={(e) => { this.iptLoanInfoPp(e, 'monthAmount'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title" style={{width: '120px'}}><span style={{color: 'red'}}>* </span>首月还款额：</span>
                                            </div>
                                            <div>
                                                <input type="number" value={loanInfoArrIpt.repayFirstMonthAmount} onChange={(e) => { this.iptLoanInfoPp(e, 'repayFirstMonthAmount'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title" style={{width: '120px'}}><span style={{color: 'red'}}>* </span>开卡金额：</span>
                                            </div>
                                            <div>
                                                <input type="number" value={loanInfoArrIpt.openCardAmount} onChange={(e) => { this.iptLoanInfoPp(e, 'openCardAmount'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title" style={{width: '120px'}}>贴息利率(%)：</span>
                                            </div>
                                            <div>
                                                <input type="number" value={loanInfoArrIpt.discountRate} onChange={(e) => { this.iptLoanInfoPp(e, 'discountRate'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title">贴息金额：</span>
                                            </div>
                                            <div>
                                                <input type="number" value={loanInfoArrIpt.discountAmount} onChange={(e) => { this.iptLoanInfoPp(e, 'discountAmount'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title">发票价格：</span>
                                            </div>
                                            <div>
                                                <input type="text" value={carInfoArrIpt.invoicePrice} onChange={(e) => { this.iptCarInfoArr(e, 'invoicePrice'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title">贷款成数：</span>
                                            </div>
                                            <div>
                                                <input type="number" value={loanInfoArrIpt.loanRatio} onChange={(e) => { this.iptLoanInfoPp(e, 'loanRatio'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title">万元系数：</span>
                                            </div>
                                            <div>
                                                <input type="text" value={loanInfoArrIpt.wanFactor} onChange={(e) => { this.iptLoanInfoPp(e, 'wanFactor'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title">利率类型：</span>
                                            </div>
                                            <div>
                                                <Select className="preLoan-body-select" value={loanInfoRateTypeCode} style={{width: '220px'}} onChange={this.handleChangeLoanInfoRateType}>
                                                    <Option value="1">传统</Option>
                                                    <Option value="2">直客</Option>
                                                </Select>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title" style={{width: '100px'}}>服务费：</span>
                                            </div>
                                            <div>
                                                <input type="number" value={loanInfoArrIpt.fee} onChange={(e) => { this.iptLoanInfoPp(e, 'fee'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title">是否贴息：</span>
                                            </div>
                                            <div>
                                                <Select className="preLoan-body-select" value={sftx} style={{width: '220px'}} onChange={this.handleChangeLoanInfoIsNotInterest}>
                                                    <Option value="0">否</Option>
                                                    <Option value="1">是</Option>
                                                </Select>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title">高抛金额：</span>
                                            </div>
                                            <div>
                                                <input type="number" value={loanInfoArrIpt.highCashAmount} onChange={(e) => { this.iptLoanInfoPp(e, 'highCashAmount'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title">费用总额：</span>
                                            </div>
                                            <div>
                                                <input type="number" value={loanInfoArrIpt.totalFee = parseInt(loanInfoArrIpt.loanAmount) + parseInt(loanInfoArrIpt.fee)} onChange={(e) => { this.iptLoanInfoPp(e, 'totalFee'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title" style={{width: '140px'}}>客户承担利率(%)：</span>
                                            </div>
                                            <div>
                                                <input type="number" value={loanInfoArrIpt.customerBearRate} onChange={(e) => { this.iptLoanInfoPp(e, 'customerBearRate'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title" style={{width: '120px'}}>附加费费率(%)：</span>
                                            </div>
                                            <div>
                                                <input type="number" value={loanInfoArrIpt.surchargeRate} onChange={(e) => { this.iptLoanInfoPp(e, 'surchargeRate'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title">附加费：</span>
                                            </div>
                                            <div>
                                                <input type="number" value={loanInfoArrIpt.surchargeAmount} onChange={(e) => { this.iptLoanInfoPp(e, 'surchargeAmount'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                        <Col></Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title">备注事项：</span>
                                            </div>
                                            <div>
                                                <textarea value={loanInfoArrIpt.notes} onChange={(e) => { this.iptLoanInfoPp(e, 'notes'); }} className="afp-body-textarea" />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            ) : null
                        }
                        {/* 费用结算 */}
                        {
                            isCostSettlement ? (
                                <div>
                                    <span className="preLoan-body-tag">费用结算</span>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title"><span style={{color: 'red'}}>* </span>GPS费：</span>
                                            </div>
                                            <div>
                                                <input type="text" value={costSettlementInfoArrIpt.gpsFee} ref={input => this.gpsFeeIpt = input} onChange={(e) => { this.iptCostSettlementInfoPp(e, 'gpsFee'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title" style={{width: '120px'}}>担保风险金：</span>
                                            </div>
                                            <div>
                                                <input type="text" value={costSettlementInfoArrIpt.fxAmount} ref={input => this.fxAmountIpt = input} onChange={(e) => { this.iptCostSettlementInfoPp(e, 'fxAmount'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title" style={{width: '120px'}}>履约押金：</span>
                                            </div>
                                            <div>
                                                <input type="text" value={costSettlementInfoArrIpt.lyDeposit} ref={input => this.lyDepositIpt = input} onChange={(e) => { this.iptCostSettlementInfoPp(e, 'lyDeposit'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title">其他费用：</span>
                                            </div>
                                            <div>
                                                <input type="text" value={costSettlementInfoArrIpt.otherFee} ref={input => this.gpsFeeIpt = input} onChange={(e) => { this.iptCostSettlementInfoPp(e, 'otherFee'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title">车款1：</span>
                                            </div>
                                            <div>
                                                <input type="text" value={loanInfoArrIpt.loanAmount} onChange={(e) => { this.iptLoanInfoPp(e, 'loanAmount'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title">车款2：</span>
                                            </div>
                                            <div>
                                                <input type="text" value={costSettlementInfoArrIpt.repointAmount} ref={input => this.repointAmountIpt = input} onChange={(e) => { this.iptCostSettlementInfoPp(e, 'repointAmount'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title">车款3：</span>
                                            </div>
                                            <div>
                                                <input type="text" value={costSettlementInfoArrIpt.carFunds3} onChange={(e) => { this.iptCostSettlementInfoPp(e, 'carFunds3'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title">车款4：</span>
                                            </div>
                                            <div>
                                                <input type="text" value={costSettlementInfoArrIpt.carFunds4} onChange={(e) => { this.iptCostSettlementInfoPp(e, 'carFunds4'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <div>
                                                <span className="preLoan-body-title">车款5：</span>
                                            </div>
                                            <div>
                                                <input type="text" value={costSettlementInfoArrIpt.carFunds5} onChange={(e) => { this.iptCostSettlementInfoPp(e, 'carFunds5'); }} className="preLoan-body-input" />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            ) : null
                        }
                        {/* 车辆信息 */}
                        {
                            isCarInfo ? ( //
                                <div>
                                    <span className="preLoan-body-tag">车辆信息</span>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">车辆型号：</span>
                                            <input type="text" value={carInfoArrIpt.model} onChange={(e) => { this.iptCarInfoArr(e, 'model'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title"
                                                  style={{width: '85px'}}>厂商指导价：</span>
                                            <input type="text" value={carInfoArrIpt.carPrice} onChange={(e) => { this.iptCarInfoArr(e, 'carPrice'); }} className="preLoan-body-input" />
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">车架号：</span>
                                            <input type="text" value={carInfoArrIpt.carFrameNo} onChange={(e) => { this.iptCarInfoArr(e, 'carFrameNo'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title">发动机号：</span>
                                            <input type="text" value={carInfoArrIpt.carEngineNo} onChange={(e) => { this.iptCarInfoArr(e, 'carEngineNo'); }} className="preLoan-body-input" />
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">车牌号：</span>
                                            <input type="text" value={carInfoArrIpt.carNumber} onChange={(e) => { this.iptCarInfoArr(e, 'carNumber'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title">行驶里程：</span>
                                            <input type="text" value={carInfoArrIpt.mile} onChange={(e) => { this.iptCarInfoArr(e, 'mile'); }} className="preLoan-body-input" />
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">评估价格：</span>
                                            <input type="text" value={carInfoArrIpt.evalPrice} onChange={(e) => { this.iptCarInfoArr(e, 'evalPrice'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title">上牌时间：</span>
                                            <input type="text" value={carInfoArrIpt.regDate} onChange={(e) => { this.iptCarInfoArr(e, 'regDate'); }} className="preLoan-body-input" />
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">上牌地：</span>
                                            <input type="text" value={carInfoArrIpt.regAddress} onChange={(e) => { this.iptCarInfoArr(e, 'regAddress'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title">是否公牌：</span>
                                            <Select className="preLoan-body-select" value={carInfoIsNotCommonCdCode} style={{width: '220px'}} onChange={this.handleChangecarInfoIsNotCommonCd}>
                                                <Option value="0">否</Option>
                                                <Option value="1">是</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title" style={{width: '100px'}}>是否加装GPS：</span>
                                            <Select className="preLoan-body-select" value={carInfoIsNotGPSCode} style={{width: '220px'}} onChange={this.handleChangecarInfoIsNotGPS}>
                                                <Option value="0">否</Option>
                                                <Option value="1">是</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                    {
                                        isHideGpsAz && gpsAzList.map((gpsItem, index) => (
                                            <Row className="preLoan-body-row-top" style={{marginBottom: '30px', 'position': 'relative'}} key={`gps_${index}`}>
                                                <Col span={12}>
                                                    <span className="preLoan-body-title"><span style={{color: 'red'}}>* </span>GPS：</span>
                                                    <Select
                                                        className="preLoan-body-select"
                                                        value={gpsItem.code} style={{width: '220px'}}
                                                        onChange={
                                                            (ev) => {
                                                                this.handleChangeGPS(ev, index);
                                                            }
                                                        }
                                                    >
                                                        {
                                                            gpsList.map(item => (
                                                                <Option key={item.dkey} value={item.dkey}>{item.dvalue}</Option>
                                                            ))
                                                        }
                                                    </Select>
                                                </Col>
                                                <Col span={12} style={{display: 'flex'}}>
                                                    <span className="preLoan-body-title" style={{width: '100px'}}><span style={{color: 'red'}}>* </span>GPS图片：</span>
                                                    <div
                                                        className="preLoan-body-table-content-tab-card"
                                                        style={{
                                                            flex: 1,
                                                            height: 'auto'
                                                        }}
                                                    >
                                                        <Upload
                                                            style={{height: '113px'}}
                                                            listType="picture-card"
                                                            data={{token: uploadToken}}
                                                            fileList={gpsItem.fileListGPS}
                                                            action={UPLOAD_URL}
                                                            onPreview={this.handlePreviewCardGPS}
                                                            onChange={(ev) => {
                                                                this.handleChangeCardGPS(ev, index);
                                                            }}
                                                        >
                                                            {uploadButton}
                                                        </Upload>
                                                        <Modal visible={previewVisibleGPS} footer={null} onCancel={this.handleCancelCardGPS}>
                                                            <img alt="example" style={{ width: '100%' }} src={previewImageGPS} />
                                                        </Modal>
                                                    </div>
                                                </Col>
                                                <div style={{cursor: 'pointer', position: 'absolute', bottom: '0', display: (gpsAzList.length === index + 1) ? '' : 'none'}} onClick={this.addGps}>
                                            <span style={{
                                                display: 'inline-block',
                                                height: '20px',
                                                width: '20px',
                                                textAlign: 'center',
                                                lineHeight: '16px',
                                                marginRight: '5px',
                                                borderRadius: '100%',
                                                'backgroundColor': '#42b983',
                                                'color': '#fff',
                                                fontSize: '24px',
                                                fontWeight: 600
                                            }}>+</span>
                                                    <span>添加GPS</span>
                                                </div>
                                            </Row>
                                        ))
                                    }
                                </div>
                            ) : null
                        }
                        {/* 贷款材料图 */}
                        {
                            isMaterialInfo ? (
                                <div>
                                    <span className="preLoan-body-tag">贷款材料图</span>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <span>驾驶证</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListJSZ[0] ? (fileListJSZ[0]['url'] === zanwu ? [] : fileListJSZ) : fileListJSZ}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardJSZ}
                                                    onChange={this.handleChangeCardJSZ}
                                                >
                                                    {fileListJSZ[0] ? (fileListJSZ[0]['url'] === zanwu ? uploadButton : (fileListJSZ.length >= 1 ? null : uploadButton)) : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleJSZ} footer={null} onCancel={this.handleCancelCardJSZ}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageJSZ} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}></Col>
                                        <Col span={6}></Col>
                                        <Col span={6}></Col>
                                    </Row>
                                    <div className="preLoan-body-row-line"></div>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <span>结婚证</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListJHZ[0] ? (fileListJHZ[0]['url'] === zanwu ? [] : fileListJHZ) : fileListJHZ}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardJHZ}
                                                    onChange={this.handleChangeCardJHZ}
                                                >
                                                    {fileListJHZ[0] ? (fileListJHZ[0]['url'] === zanwu ? uploadButton : (fileListJHZ.length >= 1 ? null : uploadButton)) : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleJHZ} footer={null} onCancel={this.handleCancelCardJHZ}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageJHZ} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <span>离婚证</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListLHZ[0] ? (fileListLHZ[0]['url'] === zanwu ? [] : fileListLHZ) : fileListLHZ}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardLHZ}
                                                    onChange={this.handleChangeCardLHZ}
                                                >
                                                    {fileListLHZ[0] ? (fileListLHZ[0]['url'] === zanwu ? uploadButton : (fileListLHZ.length >= 1 ? null : uploadButton)) : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleLHZ} footer={null} onCancel={this.handleCancelCardLHZ}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageLHZ} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <span>单身证明</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListDSZ[0] ? (fileListDSZ[0]['url'] === zanwu ? [] : fileListDSZ) : fileListDSZ}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardDSZ}
                                                    onChange={this.handleChangeCardDSZ}
                                                >
                                                    {fileListDSZ[0] ? (fileListDSZ[0]['url'] === zanwu ? uploadButton : (fileListDSZ.length >= 1 ? null : uploadButton)) : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleDSZ} footer={null} onCancel={this.handleCancelCardDSZ}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageDSZ} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <span>收入证明</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListSRZ[0] ? (fileListSRZ[0]['url'] === zanwu ? [] : fileListSRZ) : fileListSRZ}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardSRZ}
                                                    onChange={this.handleChangeCardSRZ}
                                                >
                                                    {fileListSRZ[0] ? (fileListSRZ[0]['url'] === zanwu ? uploadButton : (fileListSRZ.length >= 1 ? null : uploadButton)) : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleSRZ} footer={null} onCancel={this.handleCancelCardSRZ}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageSRZ} />
                                                </Modal>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="preLoan-body-row-line"></div>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <span>居住证</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListJZZ[0] ? (fileListJZZ[0]['url'] === zanwu ? [] : fileListJZZ) : fileListJZZ}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardJZZ}
                                                    onChange={this.handleChangeCardJZZ}
                                                >
                                                    {fileListJZZ[0] ? (fileListJZZ[0]['url'] === zanwu ? uploadButton : (fileListJZZ.length >= 1 ? null : uploadButton)) : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleJZZ} footer={null} onCancel={this.handleCancelCardJZZ}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageJZZ} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <span>房产证内容页</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListFZZ[0] ? (fileListFZZ[0]['url'] === zanwu ? [] : fileListFZZ) : fileListFZZ}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardFZZ}
                                                    onChange={this.handleChangeCardFZZ}
                                                >
                                                    {fileListFZZ[0] ? (fileListFZZ[0]['url'] === zanwu ? uploadButton : (fileListFZZ.length >= 1 ? null : uploadButton)) : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleFZZ} footer={null} onCancel={this.handleCancelCardFZZ}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageFZZ} />
                                                </Modal>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={24}>
                                            <span>户口本(多选)</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card" style={{display: 'inline'}}>
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListHKBSY[0] ? (fileListHKBSY[0]['url'] === zanwu ? [] : fileListHKBSY) : fileListHKBSY}
                                                    action={UPLOAD_URL}
                                                    multiple={true}
                                                    onPreview={this.handlePreviewCardHKBSY}
                                                    onChange={this.handleChangeCardHKBSY}
                                                >
                                                    {fileListHKBSY[0] ? (fileListHKBSY[0]['url'] === zanwu ? uploadButton : ((fileListHKBSY.length > 0 && fileListHKBSY[0].uid === '-2') ? null : uploadButton)) : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleHKBSY} footer={null} onCancel={this.handleCancelCardHKBSY}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageHKBSY} />
                                                </Modal>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="preLoan-body-row-line"></div>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={24}>
                                            <span>银行流水(多选)</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card" style={{display: 'inline'}}>
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListYHS[0] ? (fileListYHS[0]['url'] === zanwu ? [] : fileListYHS) : fileListYHS}
                                                    action={UPLOAD_URL}
                                                    multiple={true}
                                                    onPreview={this.handlePreviewCardYHS}
                                                    onChange={this.handleChangeCardYHS}
                                                >
                                                    {fileListYHS[0] ? (fileListYHS[0]['url'] === zanwu ? uploadButton : (fileListYHS.length >= 1 && fileListYHS[0].uid === 'yhs-2' ? null : uploadButton)) : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleYHS} footer={null} onCancel={this.handleCancelCardYHS}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageYHS} />
                                                </Modal>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="preLoan-body-row-line"></div>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={24}>
                                            <span>支付宝流水(多选)</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card" style={{display: 'inline'}}>
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListZFB[0] ? (fileListZFB[0]['url'] === zanwu ? [] : fileListZFB) : fileListZFB}
                                                    multiple={true}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardZFB}
                                                    onChange={this.handleChangeCardZFB}
                                                >
                                                    {fileListZFB[0] ? (fileListZFB[0]['url'] === zanwu ? uploadButton : ((fileListZFB.length >= 1 && fileListZFB[0].uid === 'zfb-2') ? null : uploadButton)) : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleZFB} footer={null} onCancel={this.handleCancelCardZFB}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageZFB} />
                                                </Modal>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="preLoan-body-row-line"></div>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={24}>
                                            <span>微信流水(多选)</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card" style={{display: 'inline'}}>
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListWX[0] ? (fileListWX[0]['url'] === zanwu ? [] : fileListWX) : fileListWX}
                                                    multiple={true}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardWX}
                                                    onChange={this.handleChangeCardWX}
                                                >
                                                    {fileListWX[0] ? (fileListWX[0]['url'] === zanwu ? uploadButton : ((fileListWX.length > 0 && fileListWX[0].uid === 'wx-2') ? null : uploadButton)) : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleWX} footer={null} onCancel={this.handleCancelCardWX}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageWX} />
                                                </Modal>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="preLoan-body-row-line"></div>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={24}>
                                            <span>其他(多选)</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card" style={{display: 'inline'}}>
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListQT[0] ? (fileListQT[0]['url'] === zanwu ? [] : fileListQT) : fileListQT}
                                                    action={UPLOAD_URL}
                                                    multiple={true}
                                                    onPreview={this.handlePreviewCardQT}
                                                    onChange={this.handleChangeCardQT}
                                                >
                                                    {fileListQT[0] ? (fileListQT[0]['url'] === zanwu ? uploadButton : ((fileListQT.length > 0 && fileListQT[0].uid === 'qt-2') ? null : uploadButton)) : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleQT} footer={null} onCancel={this.handleCancelCardQT}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageQT} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}></Col>
                                        <Col span={6}></Col>
                                        <Col span={6}></Col>
                                    </Row>
                                </div>
                            ) : null
                        }
                        {/* 上门调查照片 */}
                        {
                            isInvestigation ? (
                                <div>
                                    <span className="preLoan-body-tag">上门调查照片</span>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={24}>
                                            <span>上门照片(多选)</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card" style={{display: 'inline'}}>
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListSM[0] ? (fileListSM[0]['url'] === zanwu ? [] : fileListSM) : fileListSM}
                                                    action={UPLOAD_URL}
                                                    multiple={true}
                                                    onPreview={this.handlePreviewCardSM}
                                                    onChange={this.handleChangeCardSM}
                                                >
                                                    {uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleSM} footer={null} onCancel={this.handleCancelCardSM}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageSM} />
                                                </Modal>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="preLoan-body-row-line"></div>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={24}>
                                            <span>合照(多选)</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card" style={{display: 'inline'}}>
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListHZ[0] ? (fileListHZ[0]['url'] === zanwu ? [] : fileListHZ) : fileListHZ}
                                                    action={UPLOAD_URL}
                                                    multiple={true}
                                                    onPreview={this.handlePreviewCardHZ}
                                                    onChange={this.handleChangeCardHZ}
                                                >
                                                    {uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleHZ} footer={null} onCancel={this.handleCancelCardHZ}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageHZ} />
                                                </Modal>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="preLoan-body-row-line"></div>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <span>家访视频</span>
                                            <br />
                                            <Upload {...propsJF} data={{token: uploadToken}} fileList={fileListJF}>
                                                <Button>
                                                    <Icon type="upload" /> Upload
                                                </Button>
                                            </Upload>
                                        </Col>
                                        <Col span={6}></Col>
                                        <Col span={6}></Col>
                                        <Col span={6}></Col>
                                    </Row>
                                </div>
                            ) : null
                        }
                        {/* 车辆图 */}
                        {
                            isCarImg ? (
                                <div>
                                    <span className="preLoan-body-tag">车辆评估图</span>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={24}>
                                            <div className="preLoan-body-table-content-tab-card" style={{display: 'inline'}}>
                                                <span>车辆评估图(多选)</span>
                                                <br />
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListCT[0] ? (fileListCT[0]['url'] === zanwu ? [] : fileListCT) : fileListCT}
                                                    action={UPLOAD_URL}
                                                    multiple={true}
                                                    onPreview={this.handlePreviewCardCT}
                                                    onChange={this.handleChangeCardCT}
                                                >
                                                    {fileListCT[0] ? (fileListCT[0]['url'] === zanwu ? uploadButton : ((fileListCT.length >= 1 && fileListCT[0].uid === 'ct-2') ? null : uploadButton)) : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleCT} footer={null} onCancel={this.handleCancelCardCT}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageCT} />
                                                </Modal>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="preLoan-body-row-line"></div>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={24}>
                                            <span>车辆登记证书(多选)</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card" style={{display: 'inline'}}>
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListDJZS[0] ? (fileListDJZS[0]['url'] === zanwu ? [] : fileListDJZS) : fileListDJZS}
                                                    action={UPLOAD_URL}
                                                    multiple={true}
                                                    onPreview={this.handlePreviewCardDJZS}
                                                    onChange={this.handleChangeCardDJZS}
                                                >
                                                    {fileListDJZS[0] ? (fileListDJZS[0]['url'] === zanwu ? uploadButton : ((fileListDJZS.length >= 1 && fileListDJZS[0].uid === 'djzs-2') ? null : uploadButton)) : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleDJZS} footer={null} onCancel={this.handleCancelCardDJZS}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageDJZS} />
                                                </Modal>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            ) : null
                        }
                    </Row>
                </Row>
                <Row>
                    <div className="preLoan-body-btn-group">
                        <span className="preLoan-body-btn-gray" onClick={this.openSave}>保存</span>
                        <span className="preLoan-body-btn-gray" onClick={this.accessInfoUp} style={{marginLeft: '60px'}}>提交</span>
                        <span className="preLoan-body-btn-gray" style={{float: 'right'}} onClick={this.toBack}>返回</span>
                        <div className="clear"></div>
                    </div>
                </Row>
            </div>
        );
    }
}

export default preloanAccess;
