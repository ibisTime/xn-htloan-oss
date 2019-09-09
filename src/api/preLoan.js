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
export function brandMng(status, type) {
    return fetch(630406, {status, type});
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
export function accessSlip(start, limit, code, customerName, curNodeCode) {
    return fetch(632515, {start, limit, code, customerName, curNodeCode});
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

// 收款账号列表
export function accountBlankList(start, limit, code) {
    return fetch(632005, {start, limit, code});
}

// 购车车行
export function carBuyingList(start, limit) {
    return fetch(632065, {start, limit});
}
