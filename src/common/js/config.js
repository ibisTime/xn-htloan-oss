export const SYSTEM_CODE = 'CD-HTWT000020';
// export const COMPANY_CODE = 'CD-COIN000017';
// 七牛上传地址
export const UPLOAD_URL = 'http://up-z0.qiniup.com';
// 七牛图片前缀
export const PIC_PREFIX = 'http://img.wzhaoyuan.com/';
export const PIC_BASEURL_M = '?imageMogr2/auto-orient/thumbnail/!200x200';
export const PIC_BASEURL_L = '?imageMogr2/auto-orient/thumbnail/!1000x1000r';

// 系统userid
export const SYS_USER = 'SYS_USER_ZXZX';
// 系统托管userid
export const SYS_USER_TG = 'SYS_USER_ZXZX_TG';

// 系统根菜单编号
export const ROOT_MENU_CODE = 'HTWTSM201800000000000000';

export const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8}
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16}
    }
};
export const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 8
        }
    }
};

export const tailFormItemLayout1 = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 19,
            offset: 5
        }
    }
};

// 定义 validateFieldsAndScroll 的滚动行为
export const validateFieldsAndScrollOption = {
    scroll: {
        offsetTop: 110
    }
};

export const DATE_FORMAT = 'YYYY-MM-DD';
export const MONTH_FORMAT = 'YYYY-MM';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

// 节点详情页
export const curNodePageUrl = {
    // ************贷前管理************
    // 征信
    'a1': '/loan/credit/addedit?isAddedit=1&code=',
    'a1x': '/loan/credit/query?isAddedit=1&code=',
    'a2': '/loan/credit/query?v=1&isEntry=1&code=',
    'a3': '/loan/credit/shenhe?v=1&isCheck=1&code=',
    // 'a5': '/loan/credit/addedit?v=1&isEntry=1&code=',
    // 'a6': '/loan/credit/addedit?isAddedit=1&code=',
    // 'a7': '/loan/credit/dispatch?code=',

    // 准入单
    'b1': '/loan/admittance/addedit?&code=',
    'b1x': '/loan/admittance/addedit?&code=',
    'b2': '/loan/admittance/shenhe?v=1&isCheckRegionalManager=1&code=',
    'b3': '/loan/admittance/shenhe?v=1&isCheckCommissioner=1&code=',
    'b4': '/loan/admittance/shenhe?v=1&checkCommissionerTwo=1&code=',
    'b5': '/loan/admittance/shenhe?v=1&isCheckDirector=1&code=',
    'b6': '/loan/admittance/shenhe?v=1&isbusinessCheck=1&code=',
    'b7': '/loan/admittance/shenhe?v=1&isCheckNq=1&code=',
    'b8': '/loan/admittance/shenhe?v=1&isCheckHeadquarters=1&code=',
    '002_04': '/loan/admittance/addedit?code=',

    // 制卡
    'h1': '/loan/madeCard/addedits?&code=',
    'h2': '/loan/madeCard/addedit?v=1&hande=1&code=',
    // 面签
    'b01': '/loan/faceSign/addedit?code=',
    'b01x': '/loan/faceSign/addedit?code=',
    'b02': '/loan/faceSign/addedit?v=1&isCheckNq=1&code=',

    // 财务垫资
    'g1': '/loan/advMoney/examine?isAddedit=1&code=',
    'g2': '/loan/advMoney/examines?isAddedit=1&code=',
    'g3': '/loan/advMoney/examiness?isCheck=1&code=',
    'g4': '/loan/advMoney/addedit?&check=1code=',
    'g5': '/loan/advMoney/addedit?&code=',

    // ************贷前工具************
    // 调查报告
    '010_01': '/loanstools/investigateReport/addedit?code=',
    '010_02': '/loanstools/investigateReport/addedit?v=1&isCheckCommissioner=1&code=',
    '010_03': '/loanstools/investigateReport/addedit?v=1&isCheckStationed=1&code=',

    // 客户作废
    '007_02': '/loanstools/cancel/check?code=',
    '007_03': '/loanstools/cancel/certain?code=',

    // ************贷后还款************
    // GPS安装
    'd1': '/biz/installGps/enter?code=',
    'd2': '/biz/installGps/check?code=',
    'd3': '/biz/installGps/enter?edit=1&code=',

    // 银行放款
    '002_11': '/biz/bankMoney/settle?code=',
    'e1': '/biz/bankMoney/record?code=',
    'e1x': '/biz/bankMoney/record?code=',
    'e2': '/biz/bankMoney/record?code=',
    'e3': '/biz/bankMoney/sub?code=',
    'e4': '/biz/bankMoney/enter?code=',
    'e5': '/biz/bankMoney/certain?code=',
    'e6': '/biz/mortgage/apply?code=',
    'e7': '/biz/bankMoney/record?code=',
    'e8': '/biz/bankMoney/record?code=',
    'e9': '/biz/archives/addedit?code=',
    'e10': '/biz/archives/addedit?code=',

    // 录入发保合
    'c1': '/biz/insurance/addedit?code=',
    'c1x': '/biz/insurance/addedit?code=',
    'c2': '/biz/insurance/enter?code=',

    // 车辆抵押
    '002_20': '/biz/mortgage/sub?code=',
    '002_21': '/biz/mortgage/enter?code=',
    '002_33': '/biz/mortgage/apply?code=',
    '002_34': '/biz/mortgage/confirm?check=1&code=',

    // 档案入档
    '002_22': '/biz/archives/addedit?e=1&code=',

    // 结清审核
    'j2': '/biz/settlement/collection?code=',
    'j3': '/biz/settlement/stationed?code=',
    'j5': '/biz/settlement/finance?code=',
    'j4': '/biz/settlement/manager?code=',

    // 解除抵押
    'j6': '/biz/mortgages/relieve?code=',

    // 红名单
    'j8': '/biz/redList/apply?code=',
    'j9': '/biz/redList/pay?code=',
    'j10': '/biz/redList/enter?code=',

    // 司法诉讼
    'j13': '/biz/litigation/dispose?code=',

    // 用户赎回
    'j17': '/biz/userRedemption/applyRedeem?code=',
    'j18': '/biz/userRedemption/checkDirector?code=',
    '19': '/biz/userRedemption/checkFinance?code=',

    // ************人事************
    // 出勤审批
    '009_02': '/attendance/travel/departmentCheck?code=',
    '009_03': '/attendance/travel/financeCheck?code=',
    '009_04': '/attendance/travel/managerCheck?code=',

  // 财务退款
    '008_01': '/loanstools/refund/certain?code=',

    'f1': '/biz/mortgage/confirm?code=',
    'f2': '/transmit/transmit/send?code=',
    'f2x': '/transmit/transmit/send?code=',
    'f3': '/transmit/collection/check?code=',
    'f4': '/biz/mortgage/enter?code=',
    'f5': '/transmit/transmit/send?code=',
    'f5x': '/transmit/transmit/send?code=',
    'f6': '/transmit/collection/check?code=',
    'f7': '/transmit/transmit/send?code=',
    'f8': '/transmit/collection/check?code=',
    'f9': '/biz/mortgage/sub?code=',
    'f11': '/transmit/transmit/send?code=',
    'f12': '/transmit/collection/check?code=',
    'f13': '/biz/archives/addedit?code=',
    'f14': '/biz/archives/certain?certain=1&code=',

    'i1': '/loanstools/cancel/check?code=',
    'i2': '/loanstools/cancel/certain?code='
};
