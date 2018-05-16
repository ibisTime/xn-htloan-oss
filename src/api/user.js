import fetch from 'common/js/fetch';
import { getUserName } from 'common/js/util';

export function setRoleMenus(menuCodeList, roleCode) {
  return fetch(630020, {
    menuCodeList,
    roleCode,
    updater: getUserName()
  });
}
// 注销激活平台用户
export function activateSysUser(userId) {
  return fetch(630056, { userId, updater: getUserName() });
}
// 注销激活c端用户
export function activateUser(userId) {
  return fetch(805091, { userId, updater: getUserName() });
}
