import fetch from 'common/js/fetch';
import { getUserName, getUserId } from 'common/js/util';

export function setRoleMenus(menuCodeList, roleCode) {
  return fetch(630020, {
    menuCodeList,
    roleCode,
    updater: getUserId()
  });
}
//  保存节点
export function setNodeMenus(nodeList, roleCode) {
  return fetch(630160, {
    nodeList,
    roleCode,
    updater: getUserId()
  });
}
// 注销激活平台用户
export function activateSysUser(userId) {
  return fetch(630056, { userId, updater: getUserId() });
}
// 注销激活c端用户
export function activateUser(userId) {
  return fetch(805091, { userId, updater: getUserId() });
}

// 获取用户详情
export function getUser() {
  return getUserById(getUserId());
}

// 获取用户详情
export function getUserById(userId) {
  return fetch(630067, { userId });
}

// 为用户设置岗位
export function setUserPost(params) {
  return fetch(630058, {
    ...params,
    updater: getUserId()
  });
}

// 列表获取
export function getListUserArchive(params) {
    return fetch(632805, params);
}

// 分页查询平台用户
export function getPageSysUser(start, limit, keyword) {
  return fetch(630065, {
    start,
    limit,
    keyword,
    status: '0'
  });
}

// 列表查询平台用户
export function getSysUsers() {
  return fetch(630066, { status: '0' });
}

// 修改用户头像
export function setUserPhoto(photo) {
  return fetch(630059, { userId: getUserId(), photo });
}

// 重置c端用户密码
export function resetUserPwd(userId, newLoginPwd) {
  return fetch(805062, { userId, newLoginPwd: 888888 });
}
