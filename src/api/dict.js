import fetch from 'common/js/fetch';

// import {  } from 'common/js/config';

/**
 * 获取数据字典列表
 * @param parentKey
 * @param bizType
 */
export function getDictList({parentKey, bizType = 630036}) {
    if (getDictList[parentKey]) {
        return getDictList[parentKey];
    }
    getDictList[parentKey] = fetch(bizType, {
        parentKey
    }).then(data => {
        return data;
    });
    return getDictList[parentKey];
}

/**
 * 根据ckey查询系统参数
 * @param key
 * @param bizType
 */
export function getSystormParam({key, bizType = 630047}) {
    if (getSystormParam[key]) {
        return Promise.resolve(getSystormParam[key]);
    }
    return fetch(bizType, {
        key
    }).then(data => {
        getSystormParam[key] = data;
        return data;
    });
}
