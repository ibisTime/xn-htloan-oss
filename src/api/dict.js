import fetch from 'common/js/fetch';
// import {  } from 'common/js/config';

/**
 * 获取数据字典列表
 * @param parentKey
 * @param bizType
 */
export function getDictList({ parentKey, bizType = 627076 }) {
  if (getDictList[parentKey]) {
    return Promise.resolve(getDictList[parentKey]);
  }
  // 625907/805906
  return fetch(bizType, {
    parentKey
  }).then(data => {
    getDictList[parentKey] = data;
    return data;
  });
}
