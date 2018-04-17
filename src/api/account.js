// import cookies from 'browser-cookies';
// import { COMPANY_CODE } from 'common/js/config';
import fetch from 'common/js/fetch';
import { COMPANY_CODE, SYS_USER, SYS_USER_TG } from 'common/js/config';

/**
 * 分页查询账号
 * @param start
 * @param limit
 * @param type
 */
export function getPageAccount({ start, limit, type }) {
  return fetch(802500, {
    // updater: cookies.get('userName'),
    companyCode: COMPANY_CODE,
    start,
    limit,
    type
  });
}

/**
 * 平台ETH币统计
 */
export function getEthStatistics() {
  return fetch(802900);
}

/**
 * 根据userid获取账户
 */
export function getAccountByUserId(userId) {
  return fetch(802503, { userId });
}

/**
 * 获取托管账户
 */
export function getTgAccount() {
  return getAccountByUserId(SYS_USER_TG);
}

/**
 * 获取平台账户
 */
export function getSysAccount() {
  return getAccountByUserId(SYS_USER);
}
