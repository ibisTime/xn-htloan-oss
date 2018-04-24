import fetch from 'common/js/fetch';
import { getRoleCode } from 'common/js/util';
import { ROOT_MENU_CODE } from 'common/js/config';

/**
 * 获取当前菜单拥有的按钮列表
 * @param parentKey
 */
export function getOwnerBtns(parentCode) {
  // 805026
  return fetch(630025, {
    parentCode,
    roleCode: getRoleCode(),
    type: 2
  });
}

/**
 * 列表获取菜单和按钮
 */
export function getMenuBtnList() {
  return fetch(630016);
}

/**
 * 根据角色列表获取菜单
 */
export function getRoleMenuList() {
  // 805026
  return fetch(630025, {
    type: 1,
    roleCode: getRoleCode(),
    parentCode: ROOT_MENU_CODE
  });
}

/**
 * 根据角色列表获取菜单和按钮
 */
export function getRoleMenuBtnList(roleCode) {
  roleCode = roleCode || getRoleCode();
  return fetch(630025, { roleCode });
}
