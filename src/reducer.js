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
import { securityCompConstruct } from './redux/security/compConstruct';
import { securityPost } from './redux/security/post';
import { securityNode } from './redux/security/node';
import { securityNodeAddEdit } from './redux/security/node-addedit';
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
import { financeEnchashmentRule } from '@redux/finance/enchashmentRule';
import { financeEnchashmentRuleAddEdit } from '@redux/finance/enchashmentRule-addedit';
import { financeUnderEnchashment } from '@redux/finance/underEnchashment';
import { financeUnderEnchashmentAddEdit } from '@redux/finance/underEnchashment-addedit';
import { financeUnderEnchashmentCheck } from '@redux/finance/underEnchashment-check';
import { financeEnchashments } from '@redux/finance/enchashments';
import { financeEnchashmentsAddEdit } from '@redux/finance/enchashments-addedit';
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

//  GPS安装 + 详情 + 审核 + 录入安装信息
import { bizinstallGps } from './redux/biz/installGps';
import { bizinstallGpsAddEdit } from './redux/biz/installGps-addedit';
import { bizinstallGpsCheck } from './redux/biz/installGps-check';
import { bizinstallGpsEnter } from './redux/biz/installGps-enter';

//  银行放款 + 详情 + 录入抵押信息 + 确认提交银行 + 低压完成
import { bizBankMoney } from './redux/biz/bankMoney';
import { bizBankMoneyAddEdit } from './redux/biz/bankMoney-addedit';
import { bizBankMoneySettle } from './redux/biz/bankMoney-settle';
import { bizBankMoneySub } from './redux/biz/bankMoney-sub';
import { bizBankMoneyCertain } from './redux/biz/bankMoney-certain';

//  车辆抵押 + 详情 + 车辆落户 + 确认提交银行 + 确认收款
import { bizMortgage } from './redux/biz/mortgage';
import { bizMortgageAddEdit } from './redux/biz/mortgage-addedit';
import { bizMortgageEnter } from './redux/biz/mortgage-enter';
import { bizMortgageSub } from './redux/biz/mortgage-sub';
import { bizMortgageCertain } from './redux/biz/mortgage-certain';

//  档案入党 + 详情 + 确认入党
import { bizArchives } from './redux/biz/archives';
import { bizArchivesAddEdit } from './redux/biz/archives-addedit';
import { bizArchivesCertain } from './redux/biz/archives-certain';

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

//  红名单 + 详情 + 申请拖车 + 总经理审批 + 财务打款 + 录入拖车结果
import { bizredList } from './redux/biz/redList';
import { bizredListAddEdit } from './redux/biz/redList-addedit';
import { bizredListApply } from './redux/biz/redList-apply';
import { bizredListCheck } from './redux/biz/redList-check';
import { bizredListPay } from './redux/biz/redList-pay';
import { bizredListEnter } from './redux/biz/redList-enter';

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

/**
 * 贷前管理
 */
// 发起征信查询
import { loanCredit } from './redux/loan/credit';
import { loanCreditAddedit } from './redux/loan/credit-addedit';

// 准入审查
import { loanApplyAdmittance } from './redux/loan/apply-admittance';
import { loanApplyAdmittanceAddedit } from './redux/loan/apply-admittance-addedit';
import { loanAdmittance } from './redux/loan/admittance';
import { loanAdmittanceAddedit } from './redux/loan/admittance-addedit';
import { loanAdmittanceCheck } from './redux/loan/admittance-check';

// 面签审核
import { loanFaceSign } from './redux/loan/faceSign';
import { loanFaceSignAddedit } from './redux/loan/faceSign-addedit';

// 财务垫资
import { loanAdvMoney } from './redux/loan/advMoney';
import { loanAdvMoneyAddedit } from './redux/loan/advMoney-addedit';

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
  securityCompConstruct,
  securityPost,
  securityNode,
  securityNodeAddEdit,
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
  financeEnchashmentRule,
  financeEnchashmentRuleAddEdit,
  financeUnderEnchashment,
  financeUnderEnchashmentAddEdit,
  financeUnderEnchashmentCheck,
  financeEnchashments,
  financeEnchashmentsAddEdit,
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
  bizBlackListAddedit,
  bizinstallGps,
  bizinstallGpsAddEdit,
  bizinstallGpsCheck,
  bizinstallGpsEnter,
  bizBankMoney,
  bizBankMoneyAddEdit,
  bizBankMoneySettle,
  bizBankMoneySub,
  bizBankMoneyCertain,
  bizMortgage,
  bizMortgageAddEdit,
  bizMortgageEnter,
  bizMortgageSub,
  bizMortgageCertain,
  bizArchives,
  bizArchivesAddEdit,
  bizArchivesCertain,
  bizredList,
  bizredListAddEdit,
  bizredListApply,
  bizredListCheck,
  bizredListPay,
  bizredListEnter,
  loanCredit,
  loanCreditAddedit,
  loanApplyAdmittance,
  loanApplyAdmittanceAddedit,
  loanAdmittance,
  loanAdmittanceAddedit,
  loanAdmittanceCheck,
  loanFaceSign,
  loanFaceSignAddedit,
  loanAdvMoney,
  loanAdvMoneyAddedit
});
