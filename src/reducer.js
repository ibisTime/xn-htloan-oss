import { combineReducers } from 'redux';
import { user } from './redux/user';
import { menu } from './redux/menu';
import { modalDetail } from './redux/modal/build-modal-detail';
import { securityRole } from './redux/security/role';
import { securityRoleAddEdit } from './redux/security/role-addedit';
import { securityMenu } from './redux/security/menu';
import { securityMenuAddEdit } from './redux/security/menu-addedit';
import { securitySysParam } from './redux/security/sysParam';
import { securitySysParamAddEdit } from './redux/security/sysParam-addedit';
import { securityUser } from './redux/security/user';
import { securityAssign } from './redux/security/assign';
import { securityPwdReset } from './redux/security/pwdReset';
import { securityUserAddEdit } from './redux/security/user-addedit';
import { securityDataDict } from './redux/security/dataDict';
import { securityDataDictAddEdit } from './redux/security/dataDict-addedit';
import { publicBanner } from './redux/public/banner';
import { publicBannerAddEdit } from './redux/public/banner-addedit';
import { publicAboutusAddEdit } from './redux/public/aboutus-addedit';
import { publicHotLineAddEdit } from './redux/public/hotLine-addedit';
import { publicTimeAddEdit } from './redux/public/time-addedit';
import { publicNotice } from './redux/public/notice';
import { publicNoticeAddEdit } from './redux/public/notice-addedit';
import { bizBrand } from './redux/biz/brand';
import { bizBrandAddEdit } from './redux/biz/brand-addedit';
import { bizCarSeries } from './redux/biz/carSeries';
import { bizCarSeriesAddEdit } from './redux/biz/carSeries-addedit';
import { bizCarShape } from './redux/biz/carShape';
import { bizCarShapeAddEdit } from './redux/biz/carShape-addedit';
import { generalTextParam } from './redux/general/text-param';
import { generalTextParamAddEdit } from './redux/general/text-param-addedit';
/** ***** 财务管理start ***** **/
// 会员账户--账户查询
import { financeUserAccount } from './redux/finance/user-account';
// 会员账户--账户查询--流水
import { financeUserFlows } from './redux/finance/user-flows';
// 会员账户--流水查询
import { financeAllUserFlows } from './redux/finance/all-user-flows';
import { financeAccount } from './redux/finance/account';
import { financeLedgerAddEdit } from '@redux/finance/ledger-addedit';
import { financePlatformLedger } from '@redux/finance/platform-ledger';
import { creditAddEdit } from '@redux/demo/credit-addedit';

//  车贷申请单 + 处理
import { bizHandleApply } from './redux/biz/handleApply';
import { bizHandleApplyCheck } from './redux/biz/handleApply-check';

//  历史车贷申请单 + 处理
import { bizHistoricalApply } from './redux/biz/historicalApply';
import { bizHistoricalApplyCheck } from './redux/biz/historicalApply-addedit';

//  会员查询 + 详情
import { bizMemberInquiries } from './redux/biz/memberInquiries';
import { bizMemberInquiriesAddedit } from './redux/biz/memberInquiries-addedit';

//  还款卡查询 + 详情
import { bizRefundCard } from './redux/biz/refundCard';
import { bizRefundCardAddedit } from './redux/biz/refundCard-addedit';

/** ***** 财务管理end ***** **/
//  车贷业务管理 + 详情
import { bizCarLoanBusiness } from './redux/biz/carLoanBusiness';
import { bizCarLoanBusinessAddedit } from '@redux/biz/carLoanBusiness-addedit';
import { bizCarLoanBusinessCheck } from '@redux/biz/carLoanBusiness-check';

//  还款业务管理 + 详情 + 修改银行卡号 + 查看还款计划 + 确定结清
import { bizRefundBusiness } from './redux/biz/refundBusiness';
import { bizRefundBusinessAddedit } from './redux/biz/refundBusiness-addedit';
import { bizRefundBusinessPlan } from './redux/biz/refundBusiness-plan';
import { bizRefundBusinessChangeCard } from './redux/biz/refundBusiness-changeCard';
import { bizRefundBusinessCertian } from './redux/biz/refundBusiness-certain';

//  当月还款账单 + 详情
import { bizRefundList } from './redux/biz/refundList';
import { bizRefundListAddedit } from './redux/biz/refundList-addedit';

//  逾期名单 + 详情 + 处理
import { bizOverdueList } from './redux/biz/overdueList';
import { bizOverdueListAddedit } from './redux/biz/overdueList-addedit';
import { bizOverdueListDispose } from './redux/biz/overdueList-dispose';

//  绿名单 + 详情 + 缴纳清收成本
import { bizGreenList } from './redux/biz/greenList';
import { bizGreenListAddedit } from './redux/biz/greenList-addedit';
import { bizGreenListPayment } from './redux/biz/greenList-payment';

//  黑名单 + 详情
import { bizBlackList } from './redux/biz/blackList';
import { bizBlackListAddedit } from './redux/biz/blackList-addedit';
import { bizBlackListDispose } from './redux/biz/blackList-dispose';

//  历史业务管理 + 详情
import { bizHistoryBusinessManage } from './redux/biz/historyBusinessManage';
import { bizHistoryBusinessManageAddedit } from './redux/biz/historyBusinessManage-addedit';

//  类别管理 + 详情
import { waresCategory } from './redux/wares/category';
import { bizCategoryAddedit } from './redux/wares/category-addedit';

//  商品管理 + 详情
import { waresCommodity } from './redux/wares/commodity';
import { bizCommoditAddedit } from './redux/wares/commodity-addedit';

//  订单管理 + 详情 + 发货
import { waresOrder } from './redux/wares/order';
import { bizOrderAddedit } from './redux/wares/order-addedit';
import { bizOrderGoods } from './redux/wares/order-goods';

//  信用分规则 + 修改
import { bizCredit } from './redux/integral/credit';
import { bizCreditAddEdit } from './redux/integral/credit-addedit';

//  积分规则 + 修改
import { bizIntegral } from './redux/integral/integral';
import { bizIntegralAddEdit } from './redux/integral/integral-addedit';

//  积分兑换规则 + 修改
import { bizIntegralexchange } from './redux/integral/integralexchange';
import { bizIntegralexchangeAddEdit } from './redux/integral/integralexchange-addedit';

//  基础数据
//  车贷期数管理 + 详情 + 修改 + 删除
import { bizCarloan } from './redux/basedata/carloan';
import { bizCarloanAddEdit } from './redux/basedata/carloan-addedit';

//  商品期数管理 + 详情 + 修改 + 删除
import { bizGoodsloan } from './redux/basedata/goodsloan';
import { bizGoodsloanAddEdit } from './redux/basedata/goodsloan-addedit';

//  提前还款管理
import { bizBeforeloan } from './redux/basedata/beforeloan';

//  银行管理 + 详情 + 修改 + 删除
import { bizBank } from './redux/basedata/bank';
import { bizBankAddEdit } from './redux/basedata/bank-addedit';
export default combineReducers({
  user,
  menu,
  modalDetail,
  securityRole,
  securityRoleAddEdit,
  securityMenu,
  securityMenuAddEdit,
  securityUser,
  securityAssign,
  securityPwdReset,
  securitySysParam,
  securitySysParamAddEdit,
  securityUserAddEdit,
  securityDataDict,
  securityDataDictAddEdit,
  publicHotLineAddEdit,
  publicBanner,
  publicBannerAddEdit,
  publicAboutusAddEdit,
  publicTimeAddEdit,
  publicNotice,
  publicNoticeAddEdit,
  bizMemberInquiries,
  bizBrand,
  bizBrandAddEdit,
  bizCarSeries,
  bizCarSeriesAddEdit,
  bizCarShape,
  bizCarShapeAddEdit,
  bizHandleApply,
  waresCategory,
  waresOrder,
  bizMemberInquiriesAddedit,
  generalTextParam,
  generalTextParamAddEdit,
  financeUserAccount,
  financeUserFlows,
  financeAllUserFlows,
  financeAccount,
  financePlatformLedger,
  creditAddEdit,
  bizCarLoanBusiness,
  bizCarLoanBusinessAddedit,
  bizRefundBusiness,
  bizRefundBusinessAddedit,
  bizRefundList,
  bizOverdueList,
  bizGreenList,
  bizBlackList,
  bizHistoryBusinessManage,
  bizCarLoanBusinessCheck,
  bizRefundBusinessPlan,
  bizRefundBusinessChangeCard,
  bizRefundBusinessCertian,
  bizOverdueListDispose,
  bizBlackListDispose,
  bizGreenListPayment,
  bizOverdueListAddedit,
  bizCategoryAddedit,
  waresCommodity,
  bizCommoditAddedit,
  bizOrderAddedit,
  bizOrderGoods,
  bizIntegral,
  bizCreditAddEdit,
  bizCredit,
  bizIntegralAddEdit,
  bizIntegralexchange,
  bizIntegralexchangeAddEdit,
  bizCarloan,
  bizCarloanAddEdit,
  bizGoodsloan,
  bizGoodsloanAddEdit,
  bizBeforeloan,
  bizBank,
  bizBankAddEdit,
  bizRefundCard,
  bizRefundCardAddedit,
  bizHandleApplyCheck,
  bizHistoricalApply,
  bizHistoricalApplyCheck,
  bizGreenListAddedit,
  bizRefundListAddedit,
  bizHistoryBusinessManageAddedit,
  bizBlackListAddedit
});