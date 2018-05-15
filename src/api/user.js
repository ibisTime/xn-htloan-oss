import fetch from 'common/js/fetch';
import { getUserName } from 'common/js/util';

export function setRoleMenus(menuCodeList, roleCode) {
  return fetch(630020, {
    menuCodeList,
    roleCode,
    updater: getUserName()
  });
}

export function activateUser(userId) {
  return fetch(630057, { userId, updater: getUserName() });
}