import fetch from 'common/js/fetch';

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
