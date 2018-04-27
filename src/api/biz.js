import { getUserName } from 'common/js/util';
import fetch from 'common/js/fetch';

export function lowerFrame(code) {
  return fetch(630404, { code, updater: getUserName() });
}

export function onShelf(code) {
  return fetch(630403, { code, updater: getUserName() });
}

export function lowerFrameSys(code, location, orderNo) {
  return fetch(630414, { code, updater: getUserName(), location, orderNo });
}

export function onShelfSys(code, location, orderNo) {
  return fetch(630413, { code, updater: getUserName(), location, orderNo });
}

export function lowerFrameShape(code, location, orderNo) {
  return fetch(630424, { code, updater: getUserName(), location, orderNo });
}

export function onShelfShape(code, location, orderNo) {
  return fetch(630423, { code, updater: getUserName(), location, orderNo });
}