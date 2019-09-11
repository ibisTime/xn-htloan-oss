import React from 'react';
import {
    showWarnMsg,
    showSucMsg,
    getUserId,
    findDsct,
    dsctList,
    dsctImgList,
    getQueryString
} from 'common/js/util';
import {Row, Col, Select, Upload, Button, Icon, Modal, DatePicker} from 'antd';
import { getDictList } from 'api/dict';
import './preloanAccess.css';
import {
    sendCreditReportingLs,
    lenderInfoLs,
    baseDsInfoLs,
    preLoanInfoLs,
    costSettlementInfoLs,
    carDsInfoLs,
    materialDsInfoLs,
    investigationImgInfoLs,
    carImgInfoLs,
    cardPositiveLs,
    cardReverseSideLs,
    loanBanksList,
    getQiNiu,
    brandMng,
    carTypeMng,
    findCarType,
    accessInfoSend,
    carBuyingList,
    getCityList,
    sendPjPost,
    accessSlipDetail
} from '../../api/preLoan.js';
import {UPLOAD_URL, PIC_PREFIX} from '../../common/js/config.js';
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
class preloanAccess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 贷款人信息Tab状态
            isMain: true,
            isCommon: false,
            isBack: false,
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
            previewVisibleG: false,
            previewImageG: '',
            previewVisibleG2: false,
            previewImageG2: '',
            previewVisibleG3: false,
            previewImageG3: '',
            cardZ: {},
            cardF: {},
            cardZTwo: {},
            cardFTwo: {},
            fileListB1: [],
            fileListB2: [],
            fileListB3: [],
            previewVisibleB: false,
            previewImageB: '',
            previewVisibleB2: false,
            previewImageB2: '',
            previewVisibleB3: false,
            previewImageB3: '',
            cardZThree: {},
            cardFThree: {},
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
                firstRepayAmount: '',
                highCashAmount: '',
                totalFee: '',
                customerBearRate: '',
                surchargeRate: '',
                surchargeAmount: ''
            },
            loanIptArr: {
                bankCreditResult: '',
                mobile: '',
                bankCreditResult2: '',
                mobile2: '',
                bankCreditResult3: '',
                mobile3: ''
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
                currentPostYears: '',
                yearIncome: '',
                position: '',
                companyAddress: '',
                companyName: '',
                nowAddressProvince: ''
            },
            altogetherPpIptArr: {
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
                otherFee: ''
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
            previewImageJSZ: '',
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
            fileList: [],
            brandList: [],
            carType: [],
            carType3: [],
            budgetOrdeBizTyper: [],
            loanPeriod: [],
            carTypeData: [],
            genderData: [],
            marryState: [],
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
            sfgp: '',
            // 购车车行
            gcch: '',
            // 是否加装
            sfjzgps: ''
        };
        // this.mobileIpt = '';
        // this.bankCreditResultIpt = '';
        // this.mobile2Ipt = '';
        // this.bankCreditResult2Ipt = '';
        // this.mobile3Ipt = '';
        // this.bankCreditResult3Ipt = '';
        this.code = getQueryString('code', this.props.location.search);
        this.typeEdit = getQueryString('type', this.props.location.search);
        if(this.code) {
            this.setState({
                accessInfoCode: this.code
            });
            accessSlipDetail(this.code).then(data => {
                console.log('data.carInfo', data.carInfo);
                this.setState({
                    loanIptArr: {
                        mobile: data.creditUserList[0].mobile,
                        mobile2: data.creditUserList[1].mobile,
                        mobile3: data.creditUserList[2].mobile
                    },
                    mainLoanPpIptArr: data.creditUser,
                    altogetherPpIptArr: data.creditUserList[1],
                    bkGuaranteePpArr: data.creditUserList[2],
                    cardZ: data.creditUserList[0],
                    cardF: data.creditUserList[0],
                    cardZTwo: data.creditUserList[1],
                    cardFTwo: data.creditUserList[1],
                    cardZThree: data.creditUserList[2],
                    cardFThree: data.creditUserList[2],
                    fileList1: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'id_no_front_apply')
                    }],
                    fileList2: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'id_no_reverse_apply')
                    }],
                    fileList3: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'hold_id_card_apply')
                    }],
                    fileListG1: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'id_no_front_gh')
                    }],
                    fileListG2: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'id_no_reverse_gh')
                    }],
                    fileListG3: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'hold_id_card_gh')
                    }],
                    fileListB1: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'id_no_front_gua')
                    }],
                    fileListB2: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'id_no_reverse_gua')
                    }],
                    fileListB3: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'hold_id_card_gua')
                    }],
                    loanInfoArrIpt: data.bankLoan,
                    costSettlementInfoArrIpt: {
                        fxAmount: data.fxAmount,
                        lyDeposit: data.lyDeposit,
                        repointAmount: data.repointAmount,
                        gpsFee: data.gpsFee,
                        otherFee: data.otherFee
                    },
                    carInfoArrIpt: data.carInfo,
                    // 驾驶证
                    fileListJSZ: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'drive_card')
                    }],
                    // 结婚证
                    fileListJHZ: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'marry_pdf')
                    }],
                    // 离婚证
                    fileListLHZ: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'divorce_pdf')
                    }],
                    // 单身证明
                    fileListDSZ: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'single_prove')
                    }],
                    // 收入证明
                    fileListSRZ: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'income_prove')
                    }],
                    // 户口本首页
                    fileListHKBSY: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'hk_book_first_page')
                    }],
                    // 户口本主页
                    fileListHKBZY: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'hk_book_home_page')
                    }],
                    // 户口本本人页
                    fileListHKBRY: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'hk_book_my_page')
                    }],
                    // 房产证
                    fileListFZZ: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'house_property_card_pdf')
                    }],
                    // 居住证
                    fileListJZZ: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'live_prove_pdf')
                    }],
                    // 银行流水首页
                    fileListYHS: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'bank_jour_first_page')
                    }],
                    // 银行流水结息一季度
                    fileListLS1: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'bank_jour_interest_first')
                    }],
                    // 银行流水结息二季度
                    fileListLS2: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'bank_jour_interest_second')
                    }],
                    // 银行流水结息三季度
                    fileListLS3: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'bank_jour_interest_third')
                    }],
                    // 银行流水结息四季度
                    fileListLS4: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'bank_jour_interest_fourth')
                    }],
                    // 银行流水末页
                    fileListLS5: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'bank_jour_last_page')
                    }],
                    // 支付宝流水
                    fileListZFB: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'zfb_jour')
                    }],
                    // 微信流水
                    fileListWX: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'wx_jour')
                    }],
                    // 其他
                    fileListQT: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'other_pdf')
                    }],
                    // 上门照片
                    fileListSM: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'door_photo')
                    }],
                    // 合照
                    fileListHZ: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'group_photo')
                    }],
                    // 家访视频
                    fileListJF: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'house_video')
                    }],
                    // 车头
                    fileListCT: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'car_head')
                    }],
                    // 铭牌
                    fileListCMP: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'nameplate')
                    }],
                    // VIN码
                    fileListVIN: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'vin_number')
                    }],
                    // 仪表盘
                    fileListYBP: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'dashboard')
                    }],
                    // 驾驶室
                    fileListJSS: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'cab')
                    }],
                    // 发动机
                    fileListFDJ: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'car_engine')
                    }],
                    // 中控
                    fileListZK: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'central_control')
                    }],
                    // 天窗
                    fileListTC: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'skylight')
                    }],
                    // 车后座
                    fileListHZC: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'rear_seat')
                    }],
                    // 车尾
                    fileListCW: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'vehicle_tail')
                    }],
                    // 车全身
                    fileListCQS: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'car_body')
                    }],
                    // 车辆登记证书（首页）
                    fileListDJZS: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'car_register_certificate_first')
                    }],
                    // 车辆登记证书（二页）
                    fileListDJZS2: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'car_register_certificate_second')
                    }],
                    // 车辆登记证书（三页）
                    fileListDJZS3: [{
                        uid: '-2',
                        name: 'ot.png',
                        status: 'done',
                        url: PIC_PREFIX + findDsct(dsctImgList(data.attachments), 'car_register_certificate_third')
                    }],
                    hyzt: data.creditUser.marryState,
                    zxjgName1: data.creditUserList[0].bankCreditResult === '0' ? '通过' : '不通过',
                    zxjgName2: data.creditUserList[1].bankCreditResult === '0' ? '通过' : '不通过',
                    zxjgName3: data.creditUserList[2].bankCreditResult === '0' ? '通过' : '不通过',
                    jycd: data.creditUser.education,
                    zflx: data.creditUser.nowHouseType,
                    czlx: data.creditUser.permanentType,
                    yzdgx: data.creditUser.emergencyRelation1,
                    yzdgx2: data.creditUser.emergencyRelation2,
                    lllx: data.bankLoan.rateType,
                    sfdz: data.bankLoan.isAdvanceFund === '0' ? '否' : '是',
                    sftx: data.bankLoan.isDiscount === '0' ? '否' : '是',
                    sfgp: data.bankLoan.isPublicCard === '0' ? '否' : '是',
                    gcch: data.carInfo.shopCarGarageName,
                    sfjzgps: data.bankLoan.isAzGps === '0' ? '否' : '是'
                });
                // 购车途径 显示隐藏
                if(data.bizType === '0') {
                    this.setState({
                        isShowCarGroup: false
                    });
                }else if(data.bizType === '1') {
                    this.setState({
                        isShowCarGroup: true
                    });
                }
            });
        }
        this.getBankList();
    }
    componentDidMount(): void {
        Promise.all([
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
                    dvalue: data.list[i].fullName
                });
            }
            this.setState({
                carBuyingListArrs: arr
            });
        });
        // getCityList
        getCityList(1, 1000).then(data => {
            let arr = [];
            console.log('getCityList', data);
            for(let i = 0; i < data.list.length; i++) {
                arr.push({
                    dkey: data.list[i].id,
                    dvalue: data.list[i].cityName
                });
            }
            this.setState({
                cityList: arr
            });
        });
    }
    onChangeTime = (date, dateString) => {
        if(new Date(dateString).getTime() > new Date().getTime()) {
            showWarnMsg('请选择小于今天的日期');
        }else {
            this.setState({
                regDate: dateString
            });
        }
    };
    // 获取code
    // 获取银行code
    handleChangeBank = (value) => {
        this.setState({
            loanBankCode: value
        });
    }
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
            lllx: event.props.children,
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
            sfgp: event.props.children,
            carInfoIsNotCommonCdCode: value
        });
    }
    // 获取是否GPS
    handleChangecarInfoIsNotGPS = (value, event) => {
        this.setState({
            carInfoIsNotGPSCode: value,
            sfjzgps: event.props.children
        });
    }
    handleChangeCarType1 = (value, event) => {
        this.setState({
            changeBrandName: event.props.children
        });
        carTypeMng(value, 1, 1, 100).then(data => {
            let arr = [];
            for(let i = 0; i < data.list.length; i++) {
                arr.push({
                    name: data.list[i].name,
                    code: data.list[i].code
                });
            }
            this.setState({
                carType: [...arr],
                brandCode: value
            });
        });
    }
    handleChangeCarType = (value, event) => {
        this.setState({
            changeSeriesName: event.props.children
        });
        this.setState({
            seriesCode: value
        });
        findCarType(1, 100, value).then(data => {
            let arr = [];
            for(let i = 0; i < data.list.length; i++) {
                arr.push({
                    name: data.list[i].name,
                    code: data.list[i].code
                });
            }
            this.setState({
                carType3: [...arr]
            });
        });
    }
    handleChangeCar3Type = (value, event) => {
        this.setState({
            carCode: value,
            changeCarName: event.props.children
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
    handleChangeCarBuying = (value) => {
        this.setState({
            bizType: value
        });
        if(value === '0') {
            this.setState({
                isShowCarGroup: false
            });
        }else if(value === '1') {
            this.setState({
                isShowCarGroup: true
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
        }else if(type === 'three') {
            cardPositiveLs(PIC_PREFIX + picUrl).then(data => {
                this.setState({
                    cardZThree: data
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
        }else if(type === 'three') {
            cardReverseSideLs(PIC_PREFIX + picUrl).then(data => {
                this.setState({
                    cardFThree: data
                });
            });
        }
    }
    // 发起征信
    addSendCreditReporting = () => {
        const {fileList, loanBankCode, brandCode, seriesCode, carCode, bizType, accessInfoCode, nowAddressCode, regDate, carUrl, isLoanPpInfo, isBaseInfo, isLoanInfo, isCostSettlement, isCarInfo, isMaterialInfo, isInvestigation, isCarImg} = this.state;
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
                region: nowAddressCode,
                bizType: bizType,
                regDate: regDate,
                mile: this.mileIpt ? this.mileIpt.value : '',
                secondCarReport: carUrl,
                carBrand: brandCode,
                carSeries: seriesCode,
                carModel: carCode
            };
            if(accessInfoCode === '') {
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
            }else {
                if(isLoanPpInfo) {
                    // 贷款人信息
                    this.addLenderInfo(accessInfoCode);
                }else if(isBaseInfo) {
                    // 基本信息
                    this.addBaseInfo(accessInfoCode);
                }else if(isLoanInfo) {
                    // 贷款信息
                    this.addLoanInfo(accessInfoCode);
                }else if(isCostSettlement) {
                    // 费用结算
                    this.addCostSettlementInfo(accessInfoCode);
                }else if(isCarInfo) {
                    // 车辆信息
                    this.addCarDsInfoLs(accessInfoCode);
                }else if(isMaterialInfo) {
                    // 贷款材料图
                    this.addMaterialDsInfoLs(accessInfoCode);
                }else if(isInvestigation) {
                    // 上门调查照片
                    this.addInvestigationImgInfoLs(accessInfoCode);
                }else if(isCarImg) {
                    // 车辆图
                    this.addCarImgInfoLs(accessInfoCode);
                }
            }
    }
    // 贷款人信息
    addLenderInfo = (code) => {
        // code
        const {loanIptArr, fileList1, fileList2, fileList3, fileListG1, fileListG2, fileListG3, fileListB1, fileListB2, fileListB3, cardZ, cardF, cardZTwo, cardFTwo, cardZThree, cardFThree, zXjg1, zXjg2, zXjg3} = this.state;
        let picHash = '';
        let picHash2 = '';
        let picHash3 = '';
        let picHashG = '';
        let picHashG2 = '';
        let picHashG3 = '';
        let picHashB = '';
        let picHashB2 = '';
        let picHashB3 = '';
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
        let creditUserList = [];
        for(let i = 1; i <= 3; i++) {
            if(i === 1) {
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
                    mobile: loanIptArr.mobile
                });
            }else if(i === 2) {
                creditUserList.push({
                    userName: cardZTwo.userName,
                    loanRole: i,
                    gender: cardZTwo.gender,
                    nation: cardZTwo.nation,
                    idNo: cardZTwo.idNo,
                    customerBirth: cardZTwo.customerBirth,
                    birthAddress: cardZTwo.birthAddress,
                    authref: cardFTwo.authref,
                    statdate: cardFTwo.startDate,
                    startDate: cardFTwo.startDate,
                    idFront: picHashG,
                    idReverse: picHashG2,
                    holdIdCardPdf: picHashG3,
                    bankCreditResult: zXjg2,
                    mobile: loanIptArr.mobile2
                });
            }else if(i === 3) {
                creditUserList.push({
                    userName: cardZThree.userName,
                    loanRole: i,
                    gender: cardZThree.gender,
                    nation: cardZThree.nation,
                    idNo: cardZThree.idNo,
                    customerBirth: cardZThree.customerBirth,
                    birthAddress: cardZThree.birthAddress,
                    authref: cardFThree.authref,
                    statdate: cardFThree.startDate,
                    startDate: cardFThree.startDate,
                    idFront: picHashB,
                    idReverse: picHashB2,
                    holdIdCardPdf: picHashB3,
                    bankCreditResult: zXjg3,
                    mobile: loanIptArr.mobile3
                });
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
    // 基本信息
    addBaseInfo = (code) => {
        const {permanentResidenceCode, housingTypeCode, marriageStatusCode, edtCode, mainLoanPpIptArr, altogetherPpIptArr, bkGuaranteePpArr, emergencyRelationCode1, emergencyRelationCode2} = this.state;
        let creditUserList = [];
        for(let i = 1; i <= 3; i++) {
            if(i === 1) {
                creditUserList.push({
                    loanRole: i,
                    education: edtCode,
                    nowAddress: mainLoanPpIptArr.nowAddressProvince,
                    marryState: marriageStatusCode,
                    nowHouseType: housingTypeCode,
                    companyName: mainLoanPpIptArr.companyName,
                    companyAddress: mainLoanPpIptArr.companyAddress,
                    position: mainLoanPpIptArr.position,
                    yearIncome: mainLoanPpIptArr.yearIncome,
                    presentJobYears: mainLoanPpIptArr.currentPostYears,
                    permanentType: permanentResidenceCode,
                    emergencyName1: mainLoanPpIptArr.emergencyName1,
                    emergencyRelation1: emergencyRelationCode1,
                    emergencyMobile1: mainLoanPpIptArr.emergencyMobile1,
                    emergencyName2: mainLoanPpIptArr.emergencyName2,
                    emergencyRelation2: emergencyRelationCode2,
                    emergencyMobile2: mainLoanPpIptArr.emergencyMobile2,
                    localResidencePermit: 'FrLh-zbku8RLBn0Uf2FOmRLgZKoD'
                });
            }else if(i === 2) {
                creditUserList.push({
                    loanRole: i,
                    companyName: altogetherPpIptArr.companyName,
                    position: altogetherPpIptArr.position,
                    nowAddress: altogetherPpIptArr.nowAddress,
                    companyAddress: altogetherPpIptArr.companyAddress
                });
            }else if(i === 3) {
                creditUserList.push({
                    loanRole: i,
                    companyName: bkGuaranteePpArr.companyName,
                    position: bkGuaranteePpArr.position,
                    nowAddress: bkGuaranteePpArr.nowAddress,
                    companyAddress: bkGuaranteePpArr.companyAddress
                });
            }
        }
        let arr = {
            code: code,
            operator: getUserId(),
            creditUserList: creditUserList
        };
        console.log('addBaseInfo', arr);
        baseDsInfoLs(arr).then(data => {
            if(data.isSuccess) {
                showSucMsg('操作成功!');
            }
        });
    }
    // 添加贷款信息 'CB332019090401414B'
    addLoanInfo = (code) => {
        const {loanInfoArrIpt, loanInfoRateTypeCode, loanInfoIsNotAdvanceCode, loanInfoIsNotInterestCode} = this.state;
        let arr = {
            code: code,
            operator: getUserId(),
            loanAmount: loanInfoArrIpt.loanAmount,
            periods: loanInfoArrIpt.periods,
            bankRate: loanInfoArrIpt.bankRate,
            totalRate: loanInfoArrIpt.totalRate,
            rebateRate: loanInfoArrIpt.rebateRate,
            fee: loanInfoArrIpt.fee,
            discountRate: loanInfoArrIpt.discountRate,
            discountAmount: loanInfoArrIpt.discountAmount,
            loanRatio: loanInfoArrIpt.loanRatio,
            wanFactor: loanInfoArrIpt.wanFactor,
            monthAmount: loanInfoArrIpt.monthAmount,
            repayFirstMonthAmount: loanInfoArrIpt.firstRepayAmount,
            highCashAmount: loanInfoArrIpt.highCashAmount,
            totalFee: loanInfoArrIpt.totalFee,
            customerBearRate: loanInfoArrIpt.customerBearRate,
            surchargeRate: loanInfoArrIpt.surchargeRate,
            surchargeAmount: loanInfoArrIpt.surchargeAmount,
            rateType: loanInfoRateTypeCode,
            isAdvanceFund: loanInfoIsNotAdvanceCode,
            isDiscount: loanInfoIsNotInterestCode
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
        const {costSettlementInfoArrIpt} = this.state;
        if(costSettlementInfoArrIpt.fxAmount === '' || costSettlementInfoArrIpt.lyDeposit === '' || costSettlementInfoArrIpt.repointAmount === '' || costSettlementInfoArrIpt.gpsFee === '' || costSettlementInfoArrIpt.otherFee === '') {
            showWarnMsg('请将费用结算信息填写完整');
        }else {
            let arr = {
                code: code,
                operator: getUserId(),
                fxAmount: costSettlementInfoArrIpt.fxAmount,
                lyDeposit: costSettlementInfoArrIpt.lyDeposit,
                repointAmount: costSettlementInfoArrIpt.repointAmount,
                gpsFee: costSettlementInfoArrIpt.gpsFee,
                otherFee: costSettlementInfoArrIpt.otherFee
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
            shopCarGarage: carLineCode,
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
            // 户口本主页
            fileListHKBZY,
            // 户口本本人页
            fileListHKBRY,
            // 房产证
            fileListFZZ,
            // 居住证
            fileListJZZ,
            // 银行流水首页
            fileListYHS,
            // 银行流水结息一季度
            fileListLS1,
            // 银行流水结息二季度
            fileListLS2,
            // 银行流水结息三季度
            fileListLS3,
            // 银行流水结息四季度
            fileListLS4,
            // 银行流水末页
            fileListLS5,
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
                picHashHKBSY = fileListHKBSY[0].response.hash;
            }
        }

        // 户口本主页
        let picHashHKBZY = '';
        if(fileListHKBZY) {
            if (fileListHKBZY[0] === undefined || fileListHKBZY[0] === '') {
                picHashHKBZY = '';
            } else {
                picHashHKBZY = fileListHKBZY[0].response.hash;
            }
        }

        // 户口本本人页
        let picHashHKBRY = '';
        if(fileListHKBRY) {
            if (fileListHKBRY[0] === undefined || fileListHKBRY[0] === '') {
                picHashHKBRY = '';
            } else {
                picHashHKBRY = fileListHKBRY[0].response.hash;
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
                picHashYHS = fileListYHS[0].response.hash;
            }
        }

        // 银行流水结息一季度
        let picHashLS1 = '';
        if(fileListLS1) {
            if (fileListLS1[0] === undefined || fileListLS1[0] === '') {
                picHashLS1 = '';
            } else {
                picHashLS1 = fileListLS1[0].response.hash;
            }
        }

        // 银行流水结息二季度
        let picHashLS2 = '';
        if(fileListLS2) {
            if (fileListLS2[0] === undefined || fileListLS2[0] === '') {
                picHashLS2 = '';
            } else {
                picHashLS2 = fileListLS2[0].response.hash;
            }
        }

        // 银行流水结息三季度
        let picHashLS3 = '';
        if(fileListLS3) {
            if (fileListLS3[0] === undefined || fileListLS3[0] === '') {
                picHashLS3 = '';
            } else {
                picHashLS3 = fileListLS3[0].response.hash;
            }
        }

        // 银行流水结息四季度
        let picHashLS4 = '';
        if(fileListLS4) {
            if (fileListLS4[0] === undefined || fileListLS4[0] === '') {
                picHashLS4 = '';
            } else {
                picHashLS4 = fileListLS4[0].response.hash;
            }
        }

        // 银行流水末页
        let picHashLS5 = '';
        if(fileListLS5) {
            if (fileListLS5[0] === undefined || fileListLS5[0] === '') {
                picHashLS5 = '';
            } else {
                picHashLS5 = fileListLS5[0].response.hash;
            }
        }

        // 支付宝流水
        let picHashZFB = '';
        if(fileListZFB) {
            if (fileListZFB[0] === undefined || fileListZFB[0] === '') {
                picHashZFB = '';
            } else {
                picHashZFB = fileListZFB[0].response.hash;
            }
        }

        // 微信流水 fileListWX
        let picHashWX = '';
        if(fileListZFB) {
            if (fileListWX[0] === undefined || fileListWX[0] === '') {
                picHashWX = '';
            } else {
                picHashWX = fileListWX[0].response.hash;
            }
        }

        // 其他
        let picHashQt = '';
        if(fileListZFB) {
            if (fileListQT[0] === undefined || fileListQT[0] === '') {
                picHashQt = '';
            } else {
                picHashQt = fileListQT[0].response.hash;
            }
        }
        if(picHashJSZ === '' || picHashJHZ === '' || picHashLHZ === '' || picHashDSZ === '' || picHashSRZ === '' || picHashHKBSY === '' || picHashHKBZY === '' || picHashHKBRY === '' || picHashFZZ === '' || picHashJZZ === '' || picHashYHS === '' || picHashLS1 === '' || picHashLS2 === '' || picHashLS3 === '' || picHashLS4 === '' || picHashLS5 === '' || picHashZFB === '' || picHashQt === '' || picHashQt === '') {
            showWarnMsg('请将贷款材料图信息填写完整');
        }else {
            let arr = {
                code: code,
                operator: getUserId(),
                driveCard: picHashJSZ,
                marryPdf: picHashJHZ,
                divorcePdf: picHashLHZ,
                singleProve: picHashDSZ,
                incomeProve: picHashSRZ,
                hkBookFirstPage: picHashHKBSY,
                hkBookHomePage: picHashHKBZY,
                hkBookMyPage: picHashHKBRY,
                housePropertyCardPdf: picHashFZZ,
                liveProvePdf: picHashJZZ,
                bankJourFirstPage: picHashYHS,
                bankJourInterestFirst: picHashLS1,
                bankJourInterestSecond: picHashLS2,
                bankJourInterestThird: picHashLS3,
                bankJourInterestFourth: picHashLS4,
                bankJourLastPage: picHashLS5,
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
                picHashSM = fileListSM[0].response.hash;
            }
        }
        // 合照
        let picHashHZ = '';
        if(fileListHZ) {
            if (fileListHZ[0] === undefined || fileListHZ[0] === '') {
                picHashHZ = '';
            } else {
                picHashHZ = fileListHZ[0].response.hash;
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
        if(picHashSM === '' || picHashHZ === '' || picHashJF === '') {
            showWarnMsg('请将上门调查照片信息填写完整!');
        }else {
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
                picHashCT = fileListCT[0].response.hash;
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
                picHashDJZS = fileListDJZS[0].response.hash;
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
        if(picHashCT === '' || picHashCMP === '' || picHashVIN === '' || picHashYBP === '' || picHashJSS === '' || picHashFDJ === '' || picHashZK === '' || picHashTC === '' || picHashHZC === '' || picHashCW === '' || picHashCQS === '' || picHashDJZS === '' || picHashDJZS2 === '' || picHashDJZS3 === '') {
            showWarnMsg('请将车辆图信息填写完整');
        }else {
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
    }
    // 获取银行列表
    getBankList = () => {
        loanBanksList().then(data => {
            let arr = [];
            for(let i = 0; i < data.length; i++) {
                arr.push({
                    value: data[i].code,
                    name: data[i].bankName
                });
            }
            this.setState({
                bankList: arr
            });
        });
    }
    // 业务操作
    // 保存发起征信
    openSaveCreditReporting = () => {

    }
    // 保存
    openSave = () => {
        const {accessInfoCode, isLoanPpInfo, isBaseInfo, isLoanInfo, isCostSettlement, isCarInfo, isMaterialInfo, isInvestigation, isCarImg} = this.state;
        if(this.typeEdit === 'edit') {
            if(isLoanPpInfo) {
                // 贷款人信息
                this.addLenderInfo(accessInfoCode);
            }else if(isBaseInfo) {
                // 基本信息
                this.addBaseInfo(accessInfoCode);
            }else if(isLoanInfo) {
                // 贷款信息
                this.addLoanInfo(accessInfoCode);
            }else if(isCostSettlement) {
                // 费用结算
                this.addCostSettlementInfo(accessInfoCode);
            }else if(isCarInfo) {
                // 车辆信息
                this.addCarDsInfoLs(accessInfoCode);
            }else if(isMaterialInfo) {
                // 贷款材料图
                this.addMaterialDsInfoLs(accessInfoCode);
            }else if(isInvestigation) {
                // 上门调查照片
                this.addInvestigationImgInfoLs(accessInfoCode);
            }else if(isCarImg) {
                // 车辆图
                this.addCarImgInfoLs(accessInfoCode);
            }
        }else {
            this.addSendCreditReporting();
        }
    }
    accessInfoUp = () => {
        const {accessInfoCode} = this.state;
        accessInfoSend(accessInfoCode).then(data => {
            if(data.isSuccess) {
                showSucMsg('操作成功');
                setTimeout(() => {
                    this.props.history.go(-1);
                }, 1000);
            }
        });
    }
    // 数据双向绑定
    // 发起征信
    iptChangeSendCreditReporting = (e, name) => {
        const {sendCreditReporting} = this.state;
        sendCreditReporting[name] = e.target.value;
        this.setState({
            sendCreditReporting
        });
    }
    // 贷款信息数组
    iptLoanIptArr = (e, name) => {
        const {loanIptArr} = this.state;
        loanIptArr[name] = e.target.value;
        this.setState({
            loanIptArr
        });
    }
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
    }
    // 反担保人信息数组
    iptBkGtPp = (e, name) => {
        const {bkGuaranteePpArr} = this.state;
        bkGuaranteePpArr[name] = e.target.value;
        this.setState({
            bkGuaranteePpArr
        });
    }
    // 贷款信息数组
    iptLoanInfoPp = (e, name) => {
        const {loanInfoArrIpt} = this.state;
        loanInfoArrIpt[name] = e.target.value;
        this.setState({
            loanInfoArrIpt
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
    iptCarInfoArr = (e, name) => {
        const {carInfoArrIpt} = this.state;
        carInfoArrIpt[name] = e.target.value;
        this.setState({
            carInfoArrIpt
        });
    }
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
    handlePreviewCardZG = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageG: file.url || file.preview,
            previewVisibleG: true
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
    // 反
    handleCancelCardFG = () => this.setState({ previewVisibleG2: false });
    handlePreviewCardFG = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageG2: file.url || file.preview,
            previewVisibleG2: true
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
    // 手持
    handleCancelCardSCG = () => this.setState({ previewVisibleG3: false });
    handlePreviewCardSCG = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageG3: file.url || file.preview,
            previewVisibleG3: true
        });
    };
    handleChangeCardSCG = ({ fileList }) => {
        this.setState({
            fileListG3: fileList
        });
    };
    // 反担保人
    // 正
    handleCancelCardZB = () => this.setState({ previewVisibleB: false });
    handlePreviewCardZB = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageB: file.url || file.preview,
            previewVisibleB: true
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
    // 反
    handleCancelCardFB = () => this.setState({ previewVisibleG2: false });
    handlePreviewCardFB = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageB2: file.url || file.preview,
            previewVisibleB2: true
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
    // 手持
    handleCancelCardSCB = () => this.setState({ previewVisibleB3: false });
    handlePreviewCardSCB = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageB3: file.url || file.preview,
            previewVisibleB3: true
        });
    };
    handleChangeCardSCB = ({ fileList }) => {
        this.setState({
            fileListB3: fileList
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
    // 户口本主页
    handleCancelCardHKBZY = () => this.setState({ previewVisibleHKBZY: false });
    handlePreviewCardHKBZY = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageHKBZY: file.url || file.preview,
            previewVisibleHKBZY: true
        });
    };
    handleChangeCardHKBZY = ({ fileList }) => {
        this.setState({
            fileListHKBZY: fileList
        });
    };
    // 户口本本人页
    handleCancelCardHKBRY = () => this.setState({ previewVisibleHKBRY: false });
    handlePreviewCardHKBRY = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageHKBRY: file.url || file.preview,
            previewVisibleHKBRY: true
        });
    };
    handleChangeCardHKBRY = ({ fileList }) => {
        this.setState({
            fileListHKBRY: fileList
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
    // 铭牌
    handleCancelCardCMP = () => this.setState({ previewVisibleCMP: false });
    handlePreviewCardCMP = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageCMP: file.url || file.preview,
            previewVisibleCMP: true
        });
    };
    handleChangeCardCMP = ({ fileList }) => {
        this.setState({
            fileListCMP: fileList
        });
    };
    // VIN码
    handleCancelCardVIN = () => this.setState({ previewVisibleVIN: false });
    handlePreviewCardVIN = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageVIN: file.url || file.preview,
            previewVisibleVIN: true
        });
    };
    handleChangeCardVIN = ({ fileList }) => {
        this.setState({
            fileListVIN: fileList
        });
    };
    // 仪表盘
    handleCancelCardYBP = () => this.setState({ previewVisibleYBP: false });
    handlePreviewCardYBP = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageYBP: file.url || file.preview,
            previewVisibleYBP: true
        });
    };
    handleChangeCardYBP = ({ fileList }) => {
        this.setState({
            fileListYBP: fileList
        });
    };
    // 驾驶室
    handleCancelCardJSS = () => this.setState({ previewVisibleJSS: false });
    handlePreviewCardJSS = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageJSS: file.url || file.preview,
            previewVisibleJSS: true
        });
    };
    handleChangeCardJSS = ({ fileList }) => {
        this.setState({
            fileListJSS: fileList
        });
    };
    // 发动机
    handleCancelCardFDJ = () => this.setState({ previewVisibleFDJ: false });
    handlePreviewCardFDJ = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageFDJ: file.url || file.preview,
            previewVisibleFDJ: true
        });
    };
    handleChangeCardFDJ = ({ fileList }) => {
        this.setState({
            fileListFDJ: fileList
        });
    };
    // 中控
    handleCancelCardZK = () => this.setState({ previewVisibleZK: false });
    handlePreviewCardZK = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageZK: file.url || file.preview,
            previewVisibleZK: true
        });
    };
    handleChangeCardZK = ({ fileList }) => {
        this.setState({
            fileListZK: fileList
        });
    };
    // 天窗
    handleCancelCardTC = () => this.setState({ previewVisibleTC: false });
    handlePreviewCardTC = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageTC: file.url || file.preview,
            previewVisibleTC: true
        });
    };
    handleChangeCardTC = ({ fileList }) => {
        this.setState({
            fileListTC: fileList
        });
    };
    // 车后座
    handleCancelCardHZC = () => this.setState({ previewVisibleHZC: false });
    handlePreviewCardHZC = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageHZC: file.url || file.preview,
            previewVisibleHZC: true
        });
    };
    handleChangeCardHZC = ({ fileList }) => {
        this.setState({
            fileListHZC: fileList
        });
    };
    // 车尾
    handleCancelCardCW = () => this.setState({ previewVisibleCW: false });
    handlePreviewCardCW = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageCW: file.url || file.preview,
            previewVisibleCW: true
        });
    };
    handleChangeCardCW = ({ fileList }) => {
        this.setState({
            fileListCW: fileList
        });
    };
    // 车全身
    handleCancelCardCQS = () => this.setState({ previewVisibleCQS: false });
    handlePreviewCardCQS = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageCQS: file.url || file.preview,
            previewVisibleCQS: true
        });
    };
    handleChangeCardCQS = ({ fileList }) => {
        this.setState({
            fileListCQS: fileList
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
    // 车辆登记证书（二页）
    handleCancelCardDJZS2 = () => this.setState({ previewVisibleDJZS2: false });
    handlePreviewCardDJZS2 = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageDJZS2: file.url || file.preview,
            previewVisibleDJZS2: true
        });
    };
    handleChangeCardDJZS2 = ({ fileList }) => {
        this.setState({
            fileListDJZS2: fileList
        });
    };
    // 车辆登记证书（三页）
    handleCancelCardDJZS3 = () => this.setState({ previewVisibleDJZS3: false });
    handlePreviewCardDJZS3 = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImageDJZS3: file.url || file.preview,
            previewVisibleDJZS3: true
        });
    };
    handleChangeCardDJZS3 = ({ fileList }) => {
        this.setState({
            fileListDJZS3: fileList
        });
    };
    // 返回
    toBack = () => {
        this.props.history.go(-1);
    }
    handleChangeSearchZXJG1 = (value, event) => {
        this.setState({
            zxjgName1: event.props.children,
            zXjg1: value
        });
    }
    handleChangeSearchZXJG2 = (value, event) => {
        this.setState({
            zxjgName2: event.props.children,
            zXjg2: value
        });
    }
    handleChangeSearchZXJG3 = (value, event) => {
        this.setState({
            zxjgName3: event.props.children,
            zXjg3: value
        });
    }

    // 购车行列表
    handleChangeGo = (value, event) => {
        this.carLineName = event.props.children;
        this.setState({
            gcch: event.props.children,
            carLineCode: value
        });
    }
    // 业务发生地点
    handleChangeAddress = (value, event) => {
        console.log(value);
        this.setState({
            nowAddressCode: value
        });
    }
    // 生成评估报告
    sendAssessment = () => {
        const {carCode, regDate, nowAddressCode} = this.state;
        let arr = {
            modelId: carCode,
            regDate: regDate,
            mile: this.mileIpt.value,
            zone: nowAddressCode
        };
        sendPjPost(arr).then(data => {
            this.setState({
                carUrl: data.url,
                modelName: data.model_name
            });
            console.log(this.state.modelName, this.state.carUrl);
        });
    }
    render() {
        const {
            isMain,
            isCommon,
            isBack,
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
            previewVisibleG,
            previewImageG,
            // 反身份证
            fileListG2,
            previewVisibleG2,
            previewImageG2,
            // 手持
            fileListG3,
            previewVisibleG3,
            previewImageG3,
            cardZTwo,
            cardFTwo,
            // 反担保人
            fileListB1,
            previewVisibleB,
            previewImageB,
            // 反身份证
            fileListB2,
            previewVisibleB2,
            previewImageB2,
            // 手持
            fileListB3,
            previewVisibleB3,
            previewImageB3,
            cardZThree,
            cardFThree,
            // 基本信息
            // 主贷人信息
            // 主贷人输入数组
            mainLoanPpIptArr,
            // 共还人输入数组
            altogetherPpIptArr,
            // 反担保人输入数组
            bkGuaranteePpArr,
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
            // 户口本主页
            fileListHKBZY,
            previewVisibleHKBZY,
            previewImageHKBZY,
            // 贷款材料图
            // 户口本本人页
            fileListHKBRY,
            previewVisibleHKBRY,
            previewImageHKBRY,
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
            // 银行流水结息一季度
            fileListLS1,
            previewVisibleLS1,
            previewImageLS1,
            // 贷款材料图
            // 银行流水结息二季度
            fileListLS2,
            previewVisibleLS2,
            previewImageLS2,
            // 贷款材料图
            // 银行流水结息三季度
            fileListLS3,
            previewVisibleLS3,
            previewImageLS3,
            // 贷款材料图
            // 银行流水结息四季度
            fileListLS4,
            previewVisibleLS4,
            previewImageLS4,
            // 贷款材料图
            // 银行流水末页
            fileListLS5,
            previewVisibleLS5,
            previewImageLS5,
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
            // 铭牌
            fileListCMP,
            previewVisibleCMP,
            previewImageCMP,
            // VIN码
            fileListVIN,
            previewVisibleVIN,
            previewImageVIN,
            // 仪表盘
            fileListYBP,
            previewVisibleYBP,
            previewImageYBP,
            // 驾驶室
            fileListJSS,
            previewVisibleJSS,
            previewImageJSS,
            // 发动机
            fileListFDJ,
            previewVisibleFDJ,
            previewImageFDJ,
            // 中控
            fileListZK,
            previewVisibleZK,
            previewImageZK,
            // 天窗
            fileListTC,
            previewVisibleTC,
            previewImageTC,
            // 车后座
            fileListHZC,
            previewVisibleHZC,
            previewImageHZC,
            // 车尾
            fileListCW,
            previewVisibleCW,
            previewImageCW,
            // 车全身
            fileListCQS,
            previewVisibleCQS,
            previewImageCQS,
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
            education,
            permanentType,
            creditUserRelation,
            cityList,
            carUrl,
            modelName,
            // 修改选择框填充
            zxjgName1,
            zxjgName2,
            zxjgName3,
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
            // 利率类型
            lllx,
            // 是否垫资
            sfdz,
            // 是否贴息
            sftx,
            // 是否工牌
            sfgp,
            // 购车车行
            gcch,
            // 是否加装
            sfjzgps
        } = this.state;
        const props = {
            action: UPLOAD_URL,
            onChange: this.handleChangeUpload,
            multiple: true
        };
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
        return (
            <div className="preLoan-body">
                <span className="preLoan-body-tag">发起征信</span>
                <Row className="preLoan-body-row-top-one">
                    <Col span={12}>
                        <span className="preLoan-body-title">经办银行：</span>
                        <Select className="preLoan-body-select" style={{width: '220px'}} onChange={this.handleChangeBank}>
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
                        <span className="preLoan-body-title" style={{width: '100px'}}>业务发生地点：</span>
                        <Select style={{ width: '220px' }} onChange={this.handleChangeAddress}>
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
                        <span className="preLoan-body-title">购车途径：</span>
                        <Select className="preLoan-body-select" style={{width: '220px'}} onChange={this.handleChangeCarBuying}>
                            <Option value="0">新车</Option>
                            <Option value="1">二手车</Option>
                        </Select>
                        <div className="clear"></div>
                    </Col>
                    {
                        isShowCarGroup ? (
                            <div>
                                <Col span={12}>
                                    <span className="preLoan-body-title" style={{width: '100px'}}>上牌时间：</span>
                                    <MonthPicker format={'YYYY-MM'} style={{width: '220px', float: 'left'}} onChange={this.onChangeTime}/>
                                    <div className="clear"></div>
                                </Col>
                            </div>
                        ) : (
                            <div>
                                <Col span={12}></Col>
                            </div>
                        )
                    }
                </Row>
                {
                    isShowCarGroup ? (
                        <div>
                            <Row className="preLoan-body-row-top">
                                <Col span={12}>
                                    <span className="preLoan-body-title">品牌：</span>
                                    <Select placeholder="请选择品牌" className="preLoan-body-select" style={{width: '220px'}} onChange={this.handleChangeCarType1}>
                                        {
                                            brandList.map(data => {
                                                return (
                                                    <Option key={data.code} value={data.code}>{data.name}</Option>
                                                );
                                            })
                                        }
                                    </Select>
                                    <div className="clear"></div>
                                </Col>
                                <Col span={12}>
                                    <span className="preLoan-body-title" style={{width: '100px'}}>车系：</span>
                                    <Select placeholder="请选择车系" className="preLoan-body-select" style={{width: '220px'}} onChange={this.handleChangeCarType}>
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
                                    <span className="preLoan-body-title">车型：</span>
                                    <Select placeholder="请选择车型" className="preLoan-body-select" style={{width: '220px'}} onChange={this.handleChangeCar3Type}>
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
                                <Col span={12}></Col>
                            </Row>
                            <Row className="preLoan-body-row-top">
                                <Col span={12}>
                                    <span className="preLoan-body-title">公里数：</span>
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
                                        <Col span={2} className={isMain ? 'preLoan-body-table-content-tab-in' : 'preLoan-body-table-content-tab-out'} onClick={value => this.getTag('main')}>主贷人信息</Col>
                                        <Col span={2} className={isCommon ? 'preLoan-body-table-content-tab-in' : 'preLoan-body-table-content-tab-out'} style={{marginLeft: '20px'}} onClick={value => this.getTag('common')}>共还人信息</Col>
                                        <Col span={2} className={isBack ? 'preLoan-body-table-content-tab-in' : 'preLoan-body-table-content-tab-out'} style={{marginLeft: '20px'}} onClick={value => this.getTag('back')}>反担保人信息</Col>
                                        <Col span={18}></Col>
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
                                                                fileList={fileList1}
                                                                action={UPLOAD_URL}
                                                                onPreview={this.handlePreviewCardZ}
                                                                onChange={this.handleChangeCardZ}
                                                            >
                                                                {fileList1.length >= 1 ? null : uploadButton}
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
                                                                fileList={fileList2}
                                                                action={UPLOAD_URL}
                                                                onPreview={this.handlePreviewCardF}
                                                                onChange={this.handleChangeCardF}
                                                            >
                                                                {fileList2.length >= 1 ? null : uploadButton}
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
                                                                fileList={fileList3}
                                                                action={UPLOAD_URL}
                                                                onPreview={this.handlePreviewCardSC}
                                                                onChange={this.handleChangeCardSC}
                                                            >
                                                                {fileList3.length >= 1 ? null : uploadButton}
                                                            </Upload>
                                                            <Modal visible={previewVisible3} footer={null} onCancel={this.handleCancelCardSC}>
                                                                <img alt="example" style={{ width: '100%' }} src={previewImage3} />
                                                            </Modal>
                                                        </div>
                                                    </Col>
                                                    <Col span={8}></Col>
                                                </Row>
                                                <Row style={{marginTop: '34px'}}>
                                                    <Col span={12}>姓名：{cardZ.userName}</Col>
                                                    <Col span={12}>性别：{cardZ.gender}</Col>
                                                </Row>
                                                <Row style={{marginTop: '16px'}}>
                                                    <Col span={12}>民族：{cardZ.nation}</Col>
                                                    <Col span={12}>出生日期：{cardZ.customerBirth}</Col>
                                                </Row>
                                                <Row style={{marginTop: '16px'}}>
                                                    <Col span={12}>签证机关：{cardF.authref}</Col>
                                                    <Col span={12}>户籍地：{cardZ.birthAddress}</Col>
                                                </Row>
                                                <Row style={{marginTop: '16px'}}>
                                                    <Col span={12}>有效截止日：{cardF.startDate} - {cardF.statdate}<span style={{color: '#F75151'}}>（有效期不能小于60天）</span></Col>
                                                    <Col span={12}>身份证号：{cardZ.idNo}</Col>
                                                </Row>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title">手机号：</span>
                                                        <input type="text" value={loanIptArr.mobile} ref={input => this.mobileIpt = input} onChange={(e) => { this.iptLoanIptArr(e, 'mobile'); }} className="preLoan-body-input" />
                                                    </Col>
                                                    <Col span={12}>
                                                    </Col>
                                                </Row>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title">征信结果：</span>
                                                        <Select style={{ width: '220px' }} value={zxjgName1} onChange={this.handleChangeSearchZXJG1}>
                                                            <Option value="0">不通过</Option>
                                                            <Option value="1">通过</Option>
                                                        </Select>
                                                    </Col>
                                                    <Col span={12}>
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
                                                                    fileList={fileListG1}
                                                                    action={UPLOAD_URL}
                                                                    onPreview={this.handlePreviewCardZG}
                                                                    onChange={this.handleChangeCardZG}
                                                                >
                                                                    {fileListG1.length >= 1 ? null : uploadButton}
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
                                                                    fileList={fileListG2}
                                                                    action={UPLOAD_URL}
                                                                    onPreview={this.handlePreviewCardFG}
                                                                    onChange={this.handleChangeCardFG}
                                                                >
                                                                    {fileListG2.length >= 1 ? null : uploadButton}
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
                                                                    fileList={fileListG3}
                                                                    action={UPLOAD_URL}
                                                                    onPreview={this.handlePreviewCardSCG}
                                                                    onChange={this.handleChangeCardSCG}
                                                                >
                                                                    {fileListG3.length >= 1 ? null : uploadButton}
                                                                </Upload>
                                                                <Modal visible={previewVisibleG3} footer={null} onCancel={this.handleCancelCardSCG}>
                                                                    <img alt="example" style={{ width: '100%' }} src={previewImageG3} />
                                                                </Modal>
                                                            </div>
                                                        </Col>
                                                        <Col span={8}></Col>
                                                    </Row>
                                                    <Row style={{marginTop: '34px'}}>
                                                        <Col span={12}>姓名：{cardZTwo.userName}</Col>
                                                        <Col span={12}>性别：{cardZTwo.gender}</Col>
                                                    </Row>
                                                    <Row style={{marginTop: '16px'}}>
                                                        <Col span={12}>民族：{cardZTwo.nation}</Col>
                                                        <Col span={12}>出生日期：{cardZTwo.customerBirth}</Col>
                                                    </Row>
                                                    <Row style={{marginTop: '16px'}}>
                                                        <Col span={12}>签证机关：{cardFTwo.authref}</Col>
                                                        <Col span={12}>户籍地：{cardZTwo.birthAddress}</Col>
                                                    </Row>
                                                    <Row style={{marginTop: '16px'}}>
                                                        <Col span={12}>有效截止日：{cardFTwo.startDate} - {cardFTwo.statdate}<span style={{color: '#F75151'}}>（有效期不能小于60天）</span></Col>
                                                        <Col span={12}>身份证号：{cardZTwo.idNo}</Col>
                                                    </Row>
                                                    <Row className="preLoan-body-row-top">
                                                        <Col span={12}>
                                                            <span className="preLoan-body-title">手机号：</span>
                                                            <input type="text" value={loanIptArr.mobile2} ref={input => this.mobile2Ipt = input} onChange={(e) => { this.iptLoanIptArr(e, 'mobile2'); }} className="preLoan-body-input" />
                                                        </Col>
                                                        <Col span={12}>
                                                        </Col>
                                                    </Row>
                                                    <Row className="preLoan-body-row-top">
                                                        <Col span={12}>
                                                            <span className="preLoan-body-title">征信结果：</span>
                                                            <Select style={{ width: '220px' }} value={zxjgName2} onChange={this.handleChangeSearchZXJG2}>
                                                                <Option value="0">不通过</Option>
                                                                <Option value="1">通过</Option>
                                                            </Select>
                                                        </Col>
                                                        <Col span={12}>
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
                                                                fileList={fileListB1}
                                                                action={UPLOAD_URL}
                                                                onPreview={this.handlePreviewCardZB}
                                                                onChange={this.handleChangeCardZB}
                                                            >
                                                                {fileListB1.length >= 1 ? null : uploadButton}
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
                                                                fileList={fileListB2}
                                                                action={UPLOAD_URL}
                                                                onPreview={this.handlePreviewCardFB}
                                                                onChange={this.handleChangeCardFB}
                                                            >
                                                                {fileListB2.length >= 1 ? null : uploadButton}
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
                                                                fileList={fileListB3}
                                                                action={UPLOAD_URL}
                                                                onPreview={this.handlePreviewCardSCB}
                                                                onChange={this.handleChangeCardSCB}
                                                            >
                                                                {fileListB3.length >= 1 ? null : uploadButton}
                                                            </Upload>
                                                            <Modal visible={previewVisibleB3} footer={null} onCancel={this.handleCancelCardSCB}>
                                                                <img alt="example" style={{ width: '100%' }} src={previewImageB3} />
                                                            </Modal>
                                                        </div>
                                                    </Col>
                                                    <Col span={8}></Col>
                                                </Row>
                                                <Row style={{marginTop: '34px'}}>
                                                    <Col span={12}>姓名：{cardZThree.userName}</Col>
                                                    <Col span={12}>性别：{cardZThree.gender}</Col>
                                                </Row>
                                                <Row style={{marginTop: '16px'}}>
                                                    <Col span={12}>民族：{cardZThree.nation}</Col>
                                                    <Col span={12}>出生日期：{cardZThree.customerBirth}</Col>
                                                </Row>
                                                <Row style={{marginTop: '16px'}}>
                                                    <Col span={12}>签证机关：{cardFThree.authref}</Col>
                                                    <Col span={12}>户籍地：{cardZThree.birthAddress}</Col>
                                                </Row>
                                                <Row style={{marginTop: '16px'}}>
                                                    <Col span={12}>有效截止日：{cardFThree.startDate} - {cardFThree.statdate}<span style={{color: '#F75151'}}>（有效期不能小于60天）</span></Col>
                                                    <Col span={12}>身份证号：{cardZThree.idNo}</Col>
                                                </Row>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title">手机号：</span>
                                                        <input type="text" value={loanIptArr.mobile3} ref={input => this.mobile3Ipt = input} onChange={(e) => { this.iptLoanIptArr(e, 'mobile3'); }} className="preLoan-body-input" />
                                                    </Col>
                                                    <Col span={12}>
                                                    </Col>
                                                </Row>
                                                <Row className="preLoan-body-row-top">
                                                    <Col span={12}>
                                                        <span className="preLoan-body-title">征信结果：</span>
                                                        <Select style={{ width: '220px' }} value={zxjgName3} onChange={this.handleChangeSearchZXJG3}>
                                                            <Option value="0">不通过</Option>
                                                            <Option value="1">通过</Option>
                                                        </Select>
                                                    </Col>
                                                    <Col span={12}>
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
                                            <span className="preLoan-body-title">现住地址：</span>
                                            <input type="text" value={mainLoanPpIptArr.nowAddressProvince} ref={input => this.nowAddressProvinceIpt = input} onChange={(e) => { this.iptBaseInfoMainLoanPp(e, 'nowAddressProvince'); }} className="preLoan-body-input" />
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
                                            <input type="text" value={mainLoanPpIptArr.companyName} ref={input => this.companyNameIpt = input} onChange={(e) => { this.iptBaseInfoMainLoanPp(e, 'companyName'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title">单位地址：</span>
                                            <input type="text" value={mainLoanPpIptArr.companyAddress} ref={input => this.companyAddressIpt = input} onChange={(e) => { this.iptBaseInfoMainLoanPp(e, 'companyAddress'); }} className="preLoan-body-input" />
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">职业：</span>
                                            <input type="text" value={mainLoanPpIptArr.position} ref={input => this.positionIpt = input} onChange={(e) => { this.iptBaseInfoMainLoanPp(e, 'position'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title">年收入：</span>
                                            <input type="text" value={mainLoanPpIptArr.yearIncome} ref={input => this.yearIncomeIpt = input} onChange={(e) => { this.iptBaseInfoMainLoanPp(e, 'yearIncome'); }} className="preLoan-body-input" />
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">现职年数：</span>
                                            <input type="text" value={mainLoanPpIptArr.currentPostYears} ref={input => this.currentPostYearsIpt = input} onChange={(e) => { this.iptBaseInfoMainLoanPp(e, 'currentPostYears'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title">常住类型：</span>
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
                                    </Row>
                                    <div className="preLoan-body-row-line"></div>
                                    <span className="preLoan-body-tag">共还人</span>
                                    <div style={{marginTop: '24px'}}><span>姓名：王大锤</span><span style={{marginLeft: '90px'}}>手机号：18038902880</span><span style={{marginLeft: '90px'}}>身份证号：143030199801190533</span></div>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">工作单位：</span>
                                            <input type="text" value={altogetherPpIptArr.companyName} ref={input => this.aPACompanyNameIpt = input} onChange={(e) => { this.iptaltogetherPp(e, 'companyName'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title">职业：</span>
                                            <input type="text" value={altogetherPpIptArr.position} ref={input => this.aPAPositionIpt = input} onChange={(e) => { this.iptaltogetherPp(e, 'position'); }} className="preLoan-body-input" />
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">现住地址：</span>
                                            <input type="text" value={altogetherPpIptArr.nowAddress} ref={input => this.aPANowAddressIpt = input} onChange={(e) => { this.iptaltogetherPp(e, 'nowAddress'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title">单位地址：</span>
                                            <input type="text" value={altogetherPpIptArr.companyAddress} ref={input => this.aPACompanyAddressIpt = input} onChange={(e) => { this.iptaltogetherPp(e, 'companyAddress'); }} className="preLoan-body-input" />
                                        </Col>
                                    </Row>
                                    <div className="preLoan-body-row-line"></div>
                                    <span className="preLoan-body-tag">反担保人信息</span>
                                    <div style={{marginTop: '24px'}}><span>姓名：王大锤</span><span style={{marginLeft: '90px'}}>手机号：18038902880</span><span style={{marginLeft: '90px'}}>身份证号：143030199801190533</span></div>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">工作单位：</span>
                                            <input type="text" value={bkGuaranteePpArr.companyName} ref={input => this.bkGtPompanyNameIpt = input} onChange={(e) => { this.iptBkGtPp(e, 'companyName'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title">职业：</span>
                                            <input type="text" value={bkGuaranteePpArr.position} ref={input => this.bkGtPositionIpt = input} onChange={(e) => { this.iptBkGtPp(e, 'position'); }} className="preLoan-body-input" />
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
                                    <div className="preLoan-body-row-line"></div>
                                    <span className="preLoan-body-tag">紧急联系人</span>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">姓名：</span>
                                            <input type="text" value={mainLoanPpIptArr.emergencyName1} ref={input => this.emergencyName1Ipt = input} onChange={(e) => { this.iptBaseInfoMainLoanPp(e, 'emergencyName1'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title" style={{width: '100px'}}>与主贷人关系：</span>
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
                                            <span className="preLoan-body-title">手机号：</span>
                                            <input type="text" value={mainLoanPpIptArr.emergencyMobile1} ref={input => this.emergencyMobile1Ipt = input} onChange={(e) => { this.iptBaseInfoMainLoanPp(e, 'emergencyMobile1'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                        </Col>
                                    </Row>
                                    <div className="preLoan-body-row-line"></div>
                                    <span className="preLoan-body-tag">紧急联系人2</span>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">姓名：</span>
                                            <input type="text" value={mainLoanPpIptArr.emergencyName2} ref={input => this.emergencyName2Ipt = input} onChange={(e) => { this.iptBaseInfoMainLoanPp(e, 'emergencyName2'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title" style={{width: '100px'}}>与主贷人关系：</span>
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
                                            <span className="preLoan-body-title">手机号：</span>
                                            <input type="text" value={mainLoanPpIptArr.emergencyMobile2} ref={input => this.emergencyMobile2Ipt = input} onChange={(e) => { this.iptBaseInfoMainLoanPp(e, 'emergencyMobile2'); }} className="preLoan-body-input" />
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
                                            <span className="preLoan-body-title">贷款本金：</span>
                                            <br />
                                            <input type="text" value={loanInfoArrIpt.loanAmount} ref={input => this.loanAmountIpt = input} onChange={(e) => { this.iptLoanInfoPp(e, 'loanAmount'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={6}>
                                            <span className="preLoan-body-title">贷款期限：</span>
                                            <br />
                                            <input type="text" value={loanInfoArrIpt.periods} ref={input => this.periodsIpt = input} onChange={(e) => { this.iptLoanInfoPp(e, 'periods'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={6}>
                                            <span className="preLoan-body-title" style={{width: '120px'}}>银行利率（%）：</span>
                                            <br />
                                            <input type="text" value={loanInfoArrIpt.bankRate} ref={input => this.bankRateIpt = input} onChange={(e) => { this.iptLoanInfoPp(e, 'bankRate'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={6}>
                                            <span className="preLoan-body-title">总利率：</span>
                                            <br />
                                            <input type="text" value={loanInfoArrIpt.totalRate} ref={input => this.totalRateIpt = input} onChange={(e) => { this.iptLoanInfoPp(e, 'totalRate'); }} className="preLoan-body-input" />
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <span className="preLoan-body-title">返点利率：</span>
                                            <br />
                                            <input type="text" value={loanInfoArrIpt.rebateRate} ref={input => this.rebateRateIpt = input} onChange={(e) => { this.iptLoanInfoPp(e, 'rebateRate'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={6}>
                                            <span className="preLoan-body-title">服务费：</span>
                                            <br />
                                            <input type="text" value={loanInfoArrIpt.fee} ref={input => this.feeIpt = input} onChange={(e) => { this.iptLoanInfoPp(e, 'fee'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={6}>
                                            <span className="preLoan-body-title">利率类型：</span>
                                            <br />
                                            <Select className="preLoan-body-select" value={lllx} style={{width: '220px'}} onChange={this.handleChangeLoanInfoRateType}>
                                                <Option value="1">传统</Option>
                                                <Option value="2">直客</Option>
                                            </Select>
                                        </Col>
                                        <Col span={6}>
                                            <span className="preLoan-body-title">是否垫资：</span>
                                            <br />
                                            <Select className="preLoan-body-select" value={sfdz} style={{width: '220px'}} onChange={this.handleChangeLoanInfoIsNotAdvance}>
                                                <Option value="0">否</Option>
                                                <Option value="1">是</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <span className="preLoan-body-title">是否贴息：</span>
                                            <br />
                                            <Select className="preLoan-body-select" value={sftx} style={{width: '220px'}} onChange={this.handleChangeLoanInfoIsNotInterest}>
                                                <Option value="0">否</Option>
                                                <Option value="1">是</Option>
                                            </Select>
                                        </Col>
                                        <Col span={6}>
                                            <span className="preLoan-body-title">贴息利率：</span>
                                            <br />
                                            <input type="text" value={loanInfoArrIpt.discountRate} ref={input => this.discountRateIpt = input} onChange={(e) => { this.iptLoanInfoPp(e, 'discountRate'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={6}>
                                            <span className="preLoan-body-title">贴息金额：</span>
                                            <br />
                                            <input type="text" value={loanInfoArrIpt.discountAmount} ref={input => this.discountAmountIpt = input} onChange={(e) => { this.iptLoanInfoPp(e, 'discountAmount'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={6}>
                                            <span className="preLoan-body-title">贷款成数：</span>
                                            <br />
                                            <input type="text" value={loanInfoArrIpt.loanRatio} ref={input => this.loanRatioIpt = input} onChange={(e) => { this.iptLoanInfoPp(e, 'loanRatio'); }} className="preLoan-body-input" />
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <span className="preLoan-body-title">万元系数：</span>
                                            <br />
                                            <input type="text" value={loanInfoArrIpt.wanFactor} ref={input => this.wanFactorIpt = input} onChange={(e) => { this.iptLoanInfoPp(e, 'wanFactor'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={6}>
                                            <span className="preLoan-body-title">月供：</span>
                                            <br />
                                            <input type="text" value={loanInfoArrIpt.monthAmount} ref={input => this.monthAmountIpt = input} onChange={(e) => { this.iptLoanInfoPp(e, 'monthAmount'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={6}>
                                            <span className="preLoan-body-title" style={{width: '120px'}}>首月还款额：</span>
                                            <br />
                                            <input type="text" value={loanInfoArrIpt.firstRepayAmount} ref={input => this.firstRepayAmountIpt = input} onChange={(e) => { this.iptLoanInfoPp(e, 'firstRepayAmount'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={6}>
                                            <span className="preLoan-body-title">高抛金额：</span>
                                            <br />
                                            <input type="text" value={loanInfoArrIpt.highCashAmount} ref={input => this.highCashAmountIpt = input} onChange={(e) => { this.iptLoanInfoPp(e, 'highCashAmount'); }} className="preLoan-body-input" />
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <span className="preLoan-body-title">费用总额：</span>
                                            <br />
                                            <input type="text" value={loanInfoArrIpt.totalFee} ref={input => this.totalFeeIpt = input} onChange={(e) => { this.iptLoanInfoPp(e, 'totalFee'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={6}>
                                            <span className="preLoan-body-title" style={{width: '120px'}}>客户承担利率：</span>
                                            <br />
                                            <input type="text" value={loanInfoArrIpt.customerBearRate} ref={input => this.customerBearRateIpt = input} onChange={(e) => { this.iptLoanInfoPp(e, 'customerBearRate'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={6}>
                                            <span className="preLoan-body-title" style={{width: '120px'}}>附加费费率：</span>
                                            <br />
                                            <input type="text" value={loanInfoArrIpt.surchargeRate} ref={input => this.surchargeRateIpt = input} onChange={(e) => { this.iptLoanInfoPp(e, 'surchargeRate'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={6}>
                                            <span className="preLoan-body-title">附加费：</span>
                                            <br />
                                            <input type="text" value={loanInfoArrIpt.surchargeAmount} ref={input => this.surchargeAmountIpt = input} onChange={(e) => { this.iptLoanInfoPp(e, 'surchargeAmount'); }} className="preLoan-body-input" />
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
                                            <span className="preLoan-body-title" style={{width: '120px'}}>担保风险金：</span>
                                            <br />
                                            <input type="text" value={costSettlementInfoArrIpt.fxAmount} ref={input => this.fxAmountIpt = input} onChange={(e) => { this.iptCostSettlementInfoPp(e, 'fxAmount'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={6}>
                                            <span className="preLoan-body-title">履约押金：</span>
                                            <br />
                                            <input type="text" value={costSettlementInfoArrIpt.lyDeposit} ref={input => this.lyDepositIpt = input} onChange={(e) => { this.iptCostSettlementInfoPp(e, 'lyDeposit'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={6}>
                                            <span className="preLoan-body-title">返点金额：</span>
                                            <br />
                                            <input type="text" value={costSettlementInfoArrIpt.repointAmount} ref={input => this.repointAmountIpt = input} onChange={(e) => { this.iptCostSettlementInfoPp(e, 'repointAmount'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={6}>
                                            <span className="preLoan-body-title">GPS费：</span>
                                            <br />
                                            <input type="text" value={costSettlementInfoArrIpt.gpsFee} ref={input => this.gpsFeeIpt = input} onChange={(e) => { this.iptCostSettlementInfoPp(e, 'gpsFee'); }} className="preLoan-body-input" />
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <span className="preLoan-body-title">其他费用：</span>
                                            <br />
                                            <input type="text" value={costSettlementInfoArrIpt.otherFee} ref={input => this.gpsFeeIpt = input} onChange={(e) => { this.iptCostSettlementInfoPp(e, 'otherFee'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={6}>
                                        </Col>
                                        <Col span={6}>
                                        </Col>
                                        <Col span={6}>
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
                                            <span className="preLoan-body-title">是否公牌：</span>
                                            <Select className="preLoan-body-select" value={sfgp} style={{width: '220px'}} onChange={this.handleChangecarInfoIsNotCommonCd}>
                                                <Option value="0">否</Option>
                                                <Option value="1">是</Option>
                                            </Select>
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title">发动机号：</span>
                                            <input type="text" value={carInfoArrIpt.carEngineNo} ref={input => this.carEngineNoIpt = input} onChange={(e) => { this.iptCarInfoArr(e, 'carEngineNo'); }} className="preLoan-body-input" />
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">上牌地：</span>
                                            <input type="text" value={carInfoArrIpt.regAddress} ref={input => this.regAddressIpt = input} onChange={(e) => { this.iptCarInfoArr(e, 'regAddress'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title">购车车行：</span>
                                            <Select style={{ width: '220px' }} value={gcch} onChange={this.handleChangeGo}>
                                                {
                                                    carBuyingListArrs.map(item => {
                                                        return (
                                                            <Option key={item.dkey} value={item.dkey}>{item.dvalue}</Option>
                                                        );
                                                    })
                                                }
                                            </Select>
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">车辆型号：</span>
                                            <input type="text" value={carInfoArrIpt.model} ref={input => this.modelIpt = input} onChange={(e) => { this.iptCarInfoArr(e, 'model'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title" style={{width: '100px'}}>是否加装GPS：</span>
                                            <Select className="preLoan-body-select" value={sfjzgps} style={{width: '220px'}} onChange={this.handleChangecarInfoIsNotGPS}>
                                                <Option value="0">否</Option>
                                                <Option value="1">是</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">车辆价格：</span>
                                            <input type="text" value={carInfoArrIpt.carPrice} ref={input => this.carPriceIpt = input} onChange={(e) => { this.iptCarInfoArr(e, 'carPrice'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title">发票价格：</span>
                                            <input type="text" value={carInfoArrIpt.invoicePrice} ref={input => this.invoicePriceIpt = input} onChange={(e) => { this.iptCarInfoArr(e, 'invoicePrice'); }} className="preLoan-body-input" />
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">车架号：</span>
                                            <input type="text" value={carInfoArrIpt.carFrameNo} ref={input => this.carFrameNoIpt = input} onChange={(e) => { this.iptCarInfoArr(e, 'carFrameNo'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title">车牌号：</span>
                                            <input type="text" value={carInfoArrIpt.carNumber} ref={input => this.numberIpt = input} onChange={(e) => { this.iptCarInfoArr(e, 'carNumber'); }} className="preLoan-body-input" />
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">评估价格：</span>
                                            <input type="text" value={carInfoArrIpt.evalPrice} ref={input => this.evalPriceIpt = input} onChange={(e) => { this.iptCarInfoArr(e, 'evalPrice'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                            <span className="preLoan-body-title">上牌年份：</span>
                                            <input type="text" value={carInfoArrIpt.regDate} ref={input => this.regDateIpt = input} onChange={(e) => { this.iptCarInfoArr(e, 'regDate'); }} className="preLoan-body-input" />
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={12}>
                                            <span className="preLoan-body-title">行驶里程：</span>
                                            <input type="text" value={carInfoArrIpt.mile} ref={input => this.carInfoMileIpt = input} onChange={(e) => { this.iptCarInfoArr(e, 'mile'); }} className="preLoan-body-input" />
                                        </Col>
                                        <Col span={12}>
                                        </Col>
                                    </Row>
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
                                                    fileList={fileListJSZ}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardJSZ}
                                                    onChange={this.handleChangeCardJSZ}
                                                >
                                                    {fileListJSZ.length >= 1 ? null : uploadButton}
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
                                                    fileList={fileListJHZ}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardJHZ}
                                                    onChange={this.handleChangeCardJHZ}
                                                >
                                                    {fileListJHZ.length >= 1 ? null : uploadButton}
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
                                                    fileList={fileListLHZ}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardLHZ}
                                                    onChange={this.handleChangeCardLHZ}
                                                >
                                                    {fileListLHZ.length >= 1 ? null : uploadButton}
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
                                                    fileList={fileListDSZ}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardDSZ}
                                                    onChange={this.handleChangeCardDSZ}
                                                >
                                                    {fileListDSZ.length >= 1 ? null : uploadButton}
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
                                                    fileList={fileListSRZ}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardSRZ}
                                                    onChange={this.handleChangeCardSRZ}
                                                >
                                                    {fileListSRZ.length >= 1 ? null : uploadButton}
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
                                            <span>户口本首页</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListHKBSY}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardHKBSY}
                                                    onChange={this.handleChangeCardHKBSY}
                                                >
                                                    {fileListHKBSY.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleHKBSY} footer={null} onCancel={this.handleCancelCardHKBSY}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageHKBSY} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <span>户口本主页</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListHKBZY}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardHKBZY}
                                                    onChange={this.handleChangeCardHKBZY}
                                                >
                                                    {fileListHKBZY.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleHKBZY} footer={null} onCancel={this.handleCancelCardHKBZY}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageHKBZY} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <span>户口本本人页</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListHKBRY}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardHKBRY}
                                                    onChange={this.handleChangeCardHKBRY}
                                                >
                                                    {fileListHKBRY.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleHKBRY} footer={null} onCancel={this.handleCancelCardHKBRY}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageHKBRY} />
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
                                                    fileList={fileListFZZ}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardFZZ}
                                                    onChange={this.handleChangeCardFZZ}
                                                >
                                                    {fileListFZZ.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleFZZ} footer={null} onCancel={this.handleCancelCardFZZ}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageFZZ} />
                                                </Modal>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <span>居住证</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListJZZ}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardJZZ}
                                                    onChange={this.handleChangeCardJZZ}
                                                >
                                                    {fileListJZZ.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleJZZ} footer={null} onCancel={this.handleCancelCardJZZ}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageJZZ} />
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
                                            <span>银行流水首页</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListYHS}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardYHS}
                                                    onChange={this.handleChangeCardYHS}
                                                >
                                                    {fileListYHS.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleYHS} footer={null} onCancel={this.handleCancelCardYHS}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageYHS} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <span>银行流水结息一季度</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListLS1}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardLS1}
                                                    onChange={this.handleChangeCardLS1}
                                                >
                                                    {fileListLS1.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleLS1} footer={null} onCancel={this.handleCancelCardLS1}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageLS1} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <span>银行流水结息二季度</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListLS2}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardLS2}
                                                    onChange={this.handleChangeCardLS2}
                                                >
                                                    {fileListLS2.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleLS2} footer={null} onCancel={this.handleCancelCardLS2}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageLS2} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <span>银行流水结息三季度</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListLS3}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardLS3}
                                                    onChange={this.handleChangeCardLS3}
                                                >
                                                    {fileListLS3.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleLS3} footer={null} onCancel={this.handleCancelCardLS3}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageLS3} />
                                                </Modal>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="preLoan-body-row-line"></div>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <span>银行流水结息四季度</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListLS4}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardLS4}
                                                    onChange={this.handleChangeCardLS4}
                                                >
                                                    {fileListLS4.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleLS4} footer={null} onCancel={this.handleCancelCardLS4}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageLS4} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <span>银行流水末页</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListLS5}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardLS5}
                                                    onChange={this.handleChangeCardLS5}
                                                >
                                                    {fileListLS5.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleLS5} footer={null} onCancel={this.handleCancelCardLS5}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageLS5} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <span>支付宝流水</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListZFB}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardZFB}
                                                    onChange={this.handleChangeCardZFB}
                                                >
                                                    {fileListZFB.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleZFB} footer={null} onCancel={this.handleCancelCardZFB}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageZFB} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <span>微信流水</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListWX}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardWX}
                                                    onChange={this.handleChangeCardWX}
                                                >
                                                    {fileListWX.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleWX} footer={null} onCancel={this.handleCancelCardWX}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageWX} />
                                                </Modal>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="preLoan-body-row-line"></div>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <span>其他</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListQT}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardQT}
                                                    onChange={this.handleChangeCardQT}
                                                >
                                                    {fileListQT.length >= 1 ? null : uploadButton}
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
                                        <Col span={6}>
                                            <span>上门照片</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListSM}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardSM}
                                                    onChange={this.handleChangeCardSM}
                                                >
                                                    {fileListSM.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleSM} footer={null} onCancel={this.handleCancelCardSM}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageSM} />
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
                                            <span>合照</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListHZ}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardHZ}
                                                    onChange={this.handleChangeCardHZ}
                                                >
                                                    {fileListHZ.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleHZ} footer={null} onCancel={this.handleCancelCardHZ}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageHZ} />
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
                                    <span className="preLoan-body-tag">车辆图</span>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <span>车头</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListCT}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardCT}
                                                    onChange={this.handleChangeCardCT}
                                                >
                                                    {fileListCT.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleCT} footer={null} onCancel={this.handleCancelCardCT}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageCT} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <span>铭牌</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListCMP}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardCMP}
                                                    onChange={this.handleChangeCardCMP}
                                                >
                                                    {fileListCMP.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleCMP} footer={null} onCancel={this.handleCancelCardCMP}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageCMP} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <span>VIN码</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListVIN}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardVIN}
                                                    onChange={this.handleChangeCardVIN}
                                                >
                                                    {fileListVIN.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleVIN} footer={null} onCancel={this.handleCancelCardVIN}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageVIN} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <span>仪表盘</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListYBP}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardYBP}
                                                    onChange={this.handleChangeCardYBP}
                                                >
                                                    {fileListYBP.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleYBP} footer={null} onCancel={this.handleCancelCardYBP}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageYBP} />
                                                </Modal>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <span>驾驶室</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListJSS}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardJSS}
                                                    onChange={this.handleChangeCardJSS}
                                                >
                                                    {fileListJSS.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleJSS} footer={null} onCancel={this.handleCancelCardJSS}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageJSS} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <span>发动机</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListFDJ}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardFDJ}
                                                    onChange={this.handleChangeCardFDJ}
                                                >
                                                    {fileListFDJ.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleFDJ} footer={null} onCancel={this.handleCancelCardFDJ}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageFDJ} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <span>中控</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListZK}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardZK}
                                                    onChange={this.handleChangeCardZK}
                                                >
                                                    {fileListZK.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleZK} footer={null} onCancel={this.handleCancelCardZK}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageZK} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <span>天窗</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListTC}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardTC}
                                                    onChange={this.handleChangeCardTC}
                                                >
                                                    {fileListTC.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleTC} footer={null} onCancel={this.handleCancelCardTC}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageTC} />
                                                </Modal>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <span>车后座</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListHZC}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardHZC}
                                                    onChange={this.handleChangeCardHZC}
                                                >
                                                    {fileListHZC.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleHZC} footer={null} onCancel={this.handleCancelCardHZC}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageHZC} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <span>车尾</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListCW}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardCW}
                                                    onChange={this.handleChangeCardCW}
                                                >
                                                    {fileListCW.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleCW} footer={null} onCancel={this.handleCancelCardCW}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageCW} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <span>车全身</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListCQS}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardCQS}
                                                    onChange={this.handleChangeCardCQS}
                                                >
                                                    {fileListCQS.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleCQS} footer={null} onCancel={this.handleCancelCardCQS}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageCQS} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}></Col>
                                    </Row>
                                    <div className="preLoan-body-row-line"></div>
                                    <Row className="preLoan-body-row-top">
                                        <Col span={6}>
                                            <span>车辆登记证书（首页）</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListDJZS}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardDJZS}
                                                    onChange={this.handleChangeCardDJZS}
                                                >
                                                    {fileListDJZS.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleDJZS} footer={null} onCancel={this.handleCancelCardDJZS}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageDJZS} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <span>车辆登记证书（二页）</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListDJZS2}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardDJZS2}
                                                    onChange={this.handleChangeCardDJZS2}
                                                >
                                                    {fileListDJZS2.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleDJZS2} footer={null} onCancel={this.handleCancelCardDJZS2}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageDJZS2} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <span>车辆登记证书（三页）</span>
                                            <br />
                                            <div className="preLoan-body-table-content-tab-card">
                                                <Upload
                                                    style={{height: '113px'}}
                                                    listType="picture-card"
                                                    data={{token: uploadToken}}
                                                    fileList={fileListDJZS3}
                                                    action={UPLOAD_URL}
                                                    onPreview={this.handlePreviewCardDJZS3}
                                                    onChange={this.handleChangeCardDJZS3}
                                                >
                                                    {fileListDJZS3.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisibleDJZS3} footer={null} onCancel={this.handleCancelCardDJZS3}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImageDJZS3} />
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col span={6}></Col>
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
