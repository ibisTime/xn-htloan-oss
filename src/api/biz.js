import { getUserName, getUserId } from 'common/js/util';
import fetch from 'common/js/fetch';

export function lowerFrame(code) {
  return fetch(630404, { code, updater: getUserId() });
}

export function onShelf(code) {
  return fetch(630403, { code, updater: getUserId() });
}

export function lowerFrameSys(code, location, orderNo) {
  return fetch(630414, { code, updater: getUserId(), location, orderNo });
}

export function onShelfSys(code, location, orderNo) {
  return fetch(630413, { code, updater: getUserId(), location, orderNo });
}

export function lowerFrameShape(code, location, orderNo) {
  return fetch(630424, { code, updater: getUserId(), location, orderNo });
}

export function onShelfShape(code, location, orderNo) {
  return fetch(630423, { code, updater: getUserId(), location, orderNo });
}

//  发送短信，消息推送
export function sendMsg(code, way) {
  return fetch(630531, { code, way });
}

//  商品分类上架
export function putaway(code) {
  return fetch(808003, { code, updater: getUserId() });
}

//  商品分类下架
export function soldOut(code) {
  return fetch(808004, { code, updater: getUserId() });
}

//  商品上架
export function goodsputaway(code) {
  return fetch(808013, { code, updater: getUserId() });
}

//  商品下架
export function goodssoldOut(code) {
  return fetch(808014, { code, updater: getUserId() });
}

//  确认收货
export function receiveGoods(code) {
  return fetch(808057, { code, updater: getUserId() });
}

//  取消订单
export function cancelBill(code) {
  return fetch(808053, { code, updater: getUserId() });
}

//  贷款商品上架
export function loanGoodsPutaway(code) {
  return fetch(632173, { code, updater: getUserId() });
}

//  贷款商品下架
export function loanGoodsSoldOut(code) {
  return fetch(632174, { code, updater: getUserId() });
}
// 列表获取贷款产品
export function getListProduct() {
    return fetch(632177, { status: '3' });
}
// 公车管理  作废
export function toVoid(code) {
    return fetch(632781, { code, updater: getUserId() });
}
