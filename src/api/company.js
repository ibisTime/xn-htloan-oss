import fetch from 'common/js/fetch';
import { getRoleCode } from 'common/js/util';

// 列表查询公司
export function getCompList(parentCode) {
  return fetch(630106, { parentCode, status: 1, typeList: [1, 2] });
}

// 删除部门
export function deleteComp(code) {
  return fetch(630101, { code });
}

// 修改部门
export function updateComp(params) {
  return fetch(630102, params);
}

// 列表查询职位
export function getPostList(parentCode) {
  return fetch(630106, { parentCode, status: 1 });
}

// 列表查询角色
export function getRoleList(params) {
    return fetch(630006, params);
}

// 新增角色
export function addUser(params) {
    return fetch(630050, params);
}

// 修改角色
export function editUser(params) {
    return fetch(630060, params);
}

// 列表查询公司
export function getCompanyList(parentCode) {
    return fetch(630106, { parentCode, status: 1, typeList: [1] });
}

// 获取代办数量
// export function getAgencyList() {
// //     return fetch(632911, {
// //       start: 0,
// //       limit: 10,
// //       roleCode: getRoleCode()
// //     });
// }
