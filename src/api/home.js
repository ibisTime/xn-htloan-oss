import fetch from 'common/js/fetch';
import { getUserId, getRoleCode, getTeamCode } from 'common/js/util';

// 分页查询我的公告
export function getPageMyNotice() {
    return fetch(632725, { start: 1, limit: 5, status: 1 });
}

// 分页查询我的公司制度
export function getPageMyCompanysystem() {
    return fetch(805305, { start: 1, limit: 5, status: 1, notifier: getUserId(), type: 2 });
}

// 分页查询我的待办事项
export function getPageMyToDoList() {
    return fetch(632525, { status: 0, userId: getUserId(), roleCode: getRoleCode(), teamCode: getTeamCode(), start: 1, limit: 5 });
}

// 获取节点
export function getCurNodeCode() {
    return fetch(630147, {});
}
