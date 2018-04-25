import fetch from 'common/js/fetch';

export function setRoleMenus(menuCodeList, roleCode, updater) {
  return fetch(630020, { menuCodeList, roleCode, updater });
}

export function activateUser(userId) {
  return fetch(627303, { userId });
}
