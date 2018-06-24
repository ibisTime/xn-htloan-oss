import fetch from 'common/js/fetch';
import { getUserId } from 'common/js/util';

// 分页查询我的公告
export function getPageMyNotice() {
  return fetch(632728, { userId: getUserId(), start: 1, limit: 5 });
}

// 分页查询我的公司制度
export function getPageMyCompanysystem() {
    return fetch(632738, { userId: getUserId(), start: 1, limit: 5 });
}
