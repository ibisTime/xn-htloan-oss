export const SYSTEM_CODE = 'CD-HTWT000020';
// export const COMPANY_CODE = 'CD-COIN000017';
// 七牛上传地址
export const UPLOAD_URL = 'http://up-z0.qiniup.com';
// 七牛图片前缀
export const PIC_PREFIX = 'http://img.fhcdzx.com/';
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
    'a2': '/loan/credit/addedit?v=1&isEntry=1&code=',
    'a3': '/loan/credit/shenhe?v=1&isCheck=1&code=',
    'a1x': '/loan/credit/addedit?isAddedit=1&code=',
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
    '002_04': '/loan/admittance/addedit?code=',

    // 制卡
    'h1': '/loan/madeCard/addedits?&code=',
    'h2': '/loan/madeCard/addedit?v=1&hande=1&code=',
    // 面签
    'b01': '/loan/faceSign/addedit?code=',
    'xx': '/loan/faceSign/addedit?code=',
    'b02': '/loan/faceSign/addedit?v=1&isCheckNq=1&code=',

    // 财务垫资
    'g1': '/loan/advMoney/examine?isAddedit=1&code=',
    'g2': '/loan/advMoney/examines?isAddedit=1&code=',
    'g3': '/loan/advMoney/examiness?isAddedit=1&code=',
    'g4': '/loan/advMoney/examiness?&check=1&code=',
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
    'd2': '/biz/installGps/enter?code=',
    'd1': '/biz/installGps/check?code=',
    'd3': '/biz/installGps/enter?edit=1&code=',

    // 银行放款
    '002_11': '/biz/bankMoney/settle?code=',
    'e3': '/biz/bankMoney/sub?code=',
    'e4': '/biz/bankMoney/enter?code=',
    'e5': '/biz/bankMoney/certain?code=',
    'e6': '/biz/bankMoney/record?code=',

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
    '003_02': '/biz/settlement/collection?code=',
    '003_03': '/biz/settlement/stationed?code=',
    '003_05': '/biz/settlement/finance?code=',
    '003_04': '/biz/settlement/manager?code=',

    // 解除抵押
    '003_06': '/biz/mortgages/relieve?code=',

    // 红名单
    '003_08': '/biz/redList/apply?code=',
    '003_09': '/biz/redList/pay?code=',
    '003_10': '/biz/redList/enter?code=',

    // 司法诉讼
    '003_13': '/biz/litigation/dispose?code=',

    // 用户赎回
    '003_17': '/biz/userRedemption/applyRedeem?code=',
    '003_18': '/biz/userRedemption/checkDirector?code=',
    '003_19': '/biz/userRedemption/checkFinance?code=',

    // ************人事************
    // 出勤审批
    '009_02': '/attendance/travel/departmentCheck?code=',
    '009_03': '/attendance/travel/financeCheck?code=',
    '009_04': '/attendance/travel/managerCheck?code=',

  // 财务退款
    '008_01': '/loanstools/refund/certain?code='

};
