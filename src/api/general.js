import fetch from 'common/js/fetch';
import { COMPANY_CODE } from 'common/js/config';

// 加载七牛token 805951
export function getQiniuToken() {
  return fetch(627091, { companyCode: COMPANY_CODE });
}
