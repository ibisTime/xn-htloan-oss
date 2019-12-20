import fetch from 'common/js/fetch';
import { getUserId } from 'common/js/util';

// 头部信息 - 发起征信
export function sendCreditReportingLs(params) {
    return fetch(632538, {
        operator: getUserId(),
        ...params
    });
}

// 贷款人信息
export function lenderInfoLs(params) {
    return fetch(632530, {...params});
}

// 基本信息
export function baseDsInfoLs(params) {
    return fetch(632531, {...params});
}

// 贷款信息
export function preLoanInfoLs(params) {
    return fetch(632532, {...params});
}

// 费用结算
export function costSettlementInfoLs(params) {
    return fetch(632533, {...params});
}

// 车辆信息
export function carDsInfoLs(params) {
    return fetch(632534, {...params});
}

// 贷款材料图
export function materialDsInfoLs(params) {
    return fetch(632535, {...params});
}

// 上门调查照片
export function investigationImgInfoLs(params) {
    return fetch(632536, {...params});
}

// 车辆图
export function carImgInfoLs(params) {
    return fetch(632537, {...params});
}

// 根据图片获取身份证正面信息
export function cardPositiveLs(picUrl) {
    return fetch(630092, {picUrl});
}

// 根据图片获取身份证反面信息
export function cardReverseSideLs(picUrl) {
    return fetch(630093, {picUrl});
}

// 经办银行
export function loanBanksList() {
    return fetch(632037);
}

// 获取七牛云
export function getQiNiu() {
    return fetch(630081);
}

// 品牌管理列表
export function brandMng(status, type, name) {
    return fetch(630406, {status, type, name});
}

// 车系管理 brandCode(品牌编号)
export function carTypeMng(brandCode, type, start, limit) {
    return fetch(630415, {brandCode, type, start, limit});
}

// 车型查询
export function findCarType(start, limit, seriesCode) {
    return fetch(630425, {start, limit, seriesCode});
}

// 分页查准入单
export function accessSlip(start, limit, code, customerName, curNodeCode, curNodeCodeList) {
    return fetch(632515, {start, limit, code, customerName, curNodeCode, curNodeCodeList});
}

// 分页查准入单
export function accessSlipNotAdvance(start, limit, code, customerName) {
    return fetch(632515, {start, limit, code, customerName, userId: getUserId(), isAdvanceFund: '0'});
}

// 分页查准入单
export function accessSlipNotFinance(start, limit, code, customerName, financeStatusList) {
    return fetch(632515, {start, limit, code, customerName, financeStatusList});
}

// 分页查我的业务
export function myBusinessPage(start, limit, code, customerName, applyDatetimeStart, applyDatetimeEnd) {
    return fetch(632515, {start, limit, code, customerName, isMy: '1', userId: getUserId(), applyDatetimeStart, applyDatetimeEnd});
}

// 统计查询
export function accessSlipNot(start, limit, code, customerName, applyDatetimeStart, applyDatetimeEnd) {
    return fetch(632519, {start, limit, code, customerName, applyDatetimeStart, applyDatetimeEnd});
}

// 分页查准入单
export function accessSlipCar(start, limit, code, customerName, curNodeCode, pledgeNodeCodeList) {
    return fetch(632515, {start, limit, code, customerName, curNodeCode, pledgeNodeCodeList});
}

// 准入列表状态
export function accessSlipStatus(code) {
    return fetch(630147, {code});
}

// 详情查准入
export function accessSlipDetail(code) {
    return fetch(632516, {code});
}

// 准入审核
export function accessExamine(params) {
    return fetch(632540, {
        operator: getUserId(),
        ...params
    });
}

// 准入信息提交
export function accessInfoSend(code) {
    return fetch(632539, {
        operator: getUserId(),
        code
    });
}

// 用款申请
export function sendApplicationForPayment(params) {
    return fetch(632550, {
        operator: getUserId(),
        ...params
    });
}

// 制单回录
export function sendApplicationForPaymentBack(params) {
    return fetch(632553, {
        operator: getUserId(),
        ...params
    });
}

// 收款账号列表
export function accountBlankList(start, limit, code) {
    return fetch(632005, {start, limit, code, type: '4'});
}

// 购车车行
export function carBuyingList(start, limit) {
    return fetch(632065, {start, limit});
}

// 用款一审
export function examineOne(params) {
    return fetch(632551, {
        operator: getUserId(),
        ...params
    });
}

// 用户二审
export function examineTwo(params) {
    return fetch(632552, {
        operator: getUserId(),
        ...params
    });
}

// 垫资回录
export function recall(params) {
    return fetch(632554, {
        operator: getUserId(),
        ...params
    });
}

// 理件完成
export function sendRationaleOk(params) {
    return fetch(632560, {
        operator: getUserId(),
        ...params
    });
}

// 打件完成
export function sendTypingOk(params) {
    return fetch(632561, {
        operator: getUserId(),
        ...params
    });
}

// 确认提交完成
export function sendCmSucess(params) {
    return fetch(632571, {
        operator: getUserId(),
        ...params
    });
}

// 银行放款
export function sendBankAmount(params) {
    return fetch(632570, {
        operator: getUserId(),
        ...params
    });
}

// 录入放款信息
export function enterBankAmountInfo(params) {
    return fetch(632572, {
        operator: getUserId(),
        ...params
    });
}

// 确认收款
export function sendBkAmount(params) {
    return fetch(632573, {
        operator: getUserId(),
        ...params
    });
}

// 入档
export function sendEnterArchives(params) {
    return fetch(632590, {
        operator: getUserId(),
        ...params
    });
}

// 确认
export function sendEnterArchivesCm(params) {
    return fetch(632591, {
        operator: getUserId(),
        ...params
    });
}

// 获取城市
export function getCityList(start, limit) {
    return fetch(630475, {start, limit});
}

// 生成评估报告
export function sendPjPost(params) {
    return fetch(630479, {...params});
}

// 档案位置
export function archivesPath(start, limit) {
    return fetch(632825, {start, limit});
}

// 执行人列表
export function executorList(start, limit) {
    return fetch(630065, {start, limit, status: 1});
}

// 文件内容列表
export function fileCtList(start, limit) {
    return fetch(632215, {start, limit, category: 'node_file_list'});
}

// 根据权限显示可显示按钮
export function showButton(params) {
    return fetch(630025, {...params});
}

// 计算月供
export function calculateMonthly(params) {
    return fetch(632541, params);
}

// 安装GPS
export function installationGps(params) {
    return fetch(632126, params);
}

// 获取GPS
export function getGps() {
    return fetch(632707, {
        applyStatus: '1',
        applyUser: getUserId(),
        useStatus: '0'
    });
}

// 获取全部的GPS
export function getGpsAll() {
    return fetch(632707);
}

// 查询GPS
export function queryGps(code) {
    return fetch(632542, {code});
}

// 查询业务团队信息
export function findTeamInfo(code) {
    return fetch(630196, {code});
}

// 获取业务员列表
export function findSalesmanList() {
    return fetch(630066, {roleCode: 'SR201800000000000000YWY'});
}

// 流程回退
export function giveBack(code, node) {
    return fetch(632593, {code, node});
}
