import fetch from 'common/js/fetch';

export function setRoleMenus(menuCodeList, roleCode) {
  return fetch(805027, { menuCodeList, roleCode });
}

export function activateUser(userId) {
  return fetch(627303, { userId });
}
