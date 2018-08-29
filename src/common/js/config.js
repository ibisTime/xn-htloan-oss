export const SYSTEM_CODE = 'CD-HTWT000020';
// export const COMPANY_CODE = 'CD-COIN000017';
// 七牛上传地址
export const UPLOAD_URL = 'http://up-z0.qiniup.com';
// 七牛图片前缀
// export const PIC_PREFIX = 'http://ounm8iw2d.bkt.clouddn.com/';
export const PIC_PREFIX = 'http://p9sctbdpk.bkt.clouddn.com/';
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

// 节点详情页
export const curNodePageUrl = {
    // ************贷前管理************
    // 征信
    '001_01': '/loan/credit/addedit?isAddedit=1&code=',
    '001_02': '/loan/credit/addedit?v=1&isEntry=1&code=',
    '001_03': '/loan/credit/addedit?v=1&isCheck=1&code=',
    '001_05': '/loan/credit/addedit?isAddedit=1&code=',
    '001_06': '/loan/credit/addedit?v=1&isEntry=1&code=',
    '001_07': '/loan/credit/addedit?isAddedit=1&code=',

    // 准入单
    '002_01': '/loan/admittance/addedit?code=',
    '002_02': '/loan/admittance/addedit?v=1&isCheckCommissioner=1&code=',
    '002_03': '/loan/admittance/addedit?v=1&isCheckDirector=1&code=',
    '002_04': '/loan/admittance/addedit?code=',
    '002_24': '/loan/admittance/addedit?v=1&isCheckRegionalManager=1&code=',
    '002_25': '/loan/admittance/addedit?v=1&isCheckNq=1&code=',

    // 面签
    '002_05': '/loan/faceSign/addedit?code=',
    '002_06': '/loan/faceSign/addedit?v=1&isCheck=1&code=',
    '002_08': '/loan/faceSign/addedit?code=',
    '002_26': '/loan/faceSign/addedit?v=1&isCheckNq=1&code=',

    // 财务垫资
    '002_07': '/loan/faceSign/addedit?code=',

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
    '002_09': '/biz/installGps/enter?code=',
    '002_10': '/biz/installGps/check?code=',
    '002_12': '/biz/installGps/enter?edit=1&code=',

    // 银行放款
    '002_11': '/biz/bankMoney/settle?code=',
    '002_15': '/biz/bankMoney/sub?code=',
    '002_16': '/biz/bankMoney/enter?code=',
    '002_17': '/biz/bankMoney/certain?code=',

    // 车辆抵押
    '002_18': '/biz/mortgage/enter?code=',
    '002_20': '/biz/mortgage/sub?code=',
    '002_21': '/biz/mortgage/certain?code=',

    // 档案入党
    '002_22': '/biz/archives/certain?code=',

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
    '009_04': '/attendance/travel/managerCheck?code='

};
