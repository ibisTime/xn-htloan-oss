import fetch from 'common/js/fetch';
import { getRoleCode } from 'common/js/util';

/**
 * 获取当前菜单拥有的按钮列表
 * @param parentKey
 */
export function getOwnerBtns(parentCode) {
  // 805026
  return fetch(627056, {
    parentCode,
    roleCode: getRoleCode(),
    type: 2
  });
}

/**
 * 列表获取菜单和按钮
 */
export function getMenuBtnList() {
  return fetch(805001);
}

/**
 * 根据角色列表获取菜单
 */
export function getRoleMenuList() {
  // 805026
  return fetch(627056, {
    type: 1,
    roleCode: getRoleCode()
  });
}

/**
 * 根据角色列表获取菜单和按钮
 */
export function getRoleMenuBtnList(roleCode) {
  roleCode = roleCode || getRoleCode();
  return fetch(805026, { roleCode });
}
