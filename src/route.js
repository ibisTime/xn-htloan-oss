import asyncComponent from './component/async-component/async-component';

const ROUTES = [
  {
    path: '/system/role',
    component: asyncComponent(() => import('container/security/role/role'))
  },
  {
    path: '/system/role/addedit',
    component: asyncComponent(() => import('container/security/role-addedit/role-addedit'))
  },
  {
    path: '/system/role/menu',
    component: asyncComponent(() => import('container/security/role-menu/role-menu'))
  },
  {
    path: '/system/role/nodemenu',
    component: asyncComponent(() => import('container/security/node-menu/node-menu'))
  },
  {
    path: '/system/menu',
    component: asyncComponent(() => import('container/security/menu/menu'))
  },
  {
    path: '/system/menu/addedit',
    component: asyncComponent(() => import('container/security/menu-addedit/menu-addedit'))
  },
  {
    path: '/system/user',
    component: asyncComponent(() => import('container/security/user/user'))
  },
  {
    path: '/system/user/role',
    component: asyncComponent(() => import('container/security/user/assign'))
  },
  {
    path: '/system/user/pwd_reset',
    component: asyncComponent(() => import('container/security/user/pwdReset'))
  },
  {
    path: '/system/user/post',
    component: asyncComponent(() => import('container/security/user/post'))
  },

  //  系统参数
  {
    path: '/system/sysPara',
    component: asyncComponent(() => import('container/security/sysParam/sysParam'))
  },
  //  系统参数修改
  {
    path: '/system/sysPara/addedit',
    component: asyncComponent(() => import('container/security/sysParam-addedit/sysParam-addedit'))
  },
  {
    path: '/system/dataDict',
    component: asyncComponent(() => import('container/security/dataDict/dataDict'))
  },
  {
    path: '/system/dataDict/addedit',
    component: asyncComponent(() => import('container/security/dataDict-addedit/dataDict-addedit'))
  },
  {
    path: '/system/user/addedit',
    component: asyncComponent(() => import('container/security/user-addedit/user-addedit'))
  },
  {
    path: '/system/node',
    component: asyncComponent(() => import('container/security/node/node'))
  },
  {
    path: '/system/node/addedit',
    component: asyncComponent(() => import('container/security/node-addedit/node-addedit'))
  },
  {
      path: '/system/node/setMateriallist',
      component: asyncComponent(() => import('container/security/node-setMateriallist/node-setMateriallist'))
  },
  {
    path: '/system/compConstruct',
    component: asyncComponent(() => import('container/security/compConstruct/compConstruct'))
  },
  {
    path: '/system/post',
    component: asyncComponent(() => import('container/security/post/post'))
  },
  {
    path: '/public/aboutus_addedit',
    component: asyncComponent(() => import('container/public/aboutus-addedit/aboutus-addedit'))
  },
  {
    path: '/public/hotLine_addedit',
    component: asyncComponent(() => import('container/public/hotLine-addedit/hotLine-addedit'))
  },
  {
    path: '/public/time_addedit',
    component: asyncComponent(() => import('container/public/time-addedit/time-addedit'))
  },
  {
    path: '/public/notice',
    component: asyncComponent(() => import('container/public/notice/notice'))
  },
  {
    path: '/public/notice/addedit',
    component: asyncComponent(() => import('container/public/notice-addedit/notice-addedit'))
  },
  {
    path: '/public/banner',
    component: asyncComponent(() => import('container/public/banner/banner'))
  },
  {
    path: '/public/banner/addedit',
    component: asyncComponent(() => import('container/public/banner-addedit/banner-addedit'))
  },
  {
    path: '/biz/brand',
    component: asyncComponent(() => import('container/biz/carSale/brand'))
  },
  {
    path: '/biz/brand/addedit',
    component: asyncComponent(() => import('container/biz/carSale/brand-addedit'))
  },
  {
    path: '/biz/carSeries',
    component: asyncComponent(() => import('container/biz/carSale/carSeries'))
  },
  {
    path: '/biz/carSeries/addedit',
    component: asyncComponent(() => import('container/biz/carSale/carSeries-addedit'))
  },
  //  车型管理
  {
    path: '/biz/carShape',
    component: asyncComponent(() => import('container/biz/carSale/carShape'))
  },
  //  车型管理详情
  {
    path: '/biz/carShape/addedit',
    component: asyncComponent(() => import('container/biz/carSale/carShape-addedit'))
  },
  //  车贷申请单
  {
    path: '/biz/handleApply',
    component: asyncComponent(() => import('container/biz/carSale/handleApply'))
  },
  //  车贷申请单 处理
  {
    path: '/biz/handleApply/check',
    component: asyncComponent(() => import('container/biz/carSale/handleApply-check'))
  },
  //  历史车贷申请单
  {
    path: '/biz/historicalApply',
    component: asyncComponent(() => import('container/biz/carSale/historicalApply'))
  },
  //  历史车贷申请单 详情
  {
    path: '/biz/historicalApply/addedit',
    component: asyncComponent(() => import('container/biz/carSale/historicalApply-addedit'))
  },
  //  会员查询
  {
    path: '/biz/memberInquiries',
    component: asyncComponent(() => import('container/biz/administration/memberInquiries'))
  },
  //  会员详情
  {
    path: '/biz/memberInquiries/addedit',
    component: asyncComponent(() => import('container/biz/administration/memberInquiries-addedit'))
  },
  //  还款卡查询
  {
    path: '/biz/refundCard',
    component: asyncComponent(() => import('container/biz/administration/refundCard'))
  },
  //  还款卡详情
  {
    path: '/biz/refundCard/addedit',
    component: asyncComponent(() => import('container/biz/administration/refundCard-addedit'))
  },
  {
    path: '/wares/commodity',
    component: asyncComponent(() => import('container/wares/commodity/commodity'))
  },
  {
    path: '/wares/order',
    component: asyncComponent(() => import('container/wares/order/order'))
  },
  {
    path: '/general/textParam',
    component: asyncComponent(() => import('container/general/text-param/text-param'))
  },
  {
    path: '/general/textParam/addedit',
    component: asyncComponent(() => import('container/general/text-param-addedit/text-param-addedit'))
  },
  // 会员账户 -- 账户查询
  {
    path: '/finance/userAccount',
    component: asyncComponent(() => import('container/finance/user-account/user-account'))
  },
  // 会员账户 -- 账户查询 -- 流水
  {
    path: '/finance/userAccount/flows',
    component: asyncComponent(() => import('container/finance/user-flows/user-flows'))
  },
  // 会员账户 -- 流水查询
  {
    path: '/finance/userLedger',
    component: asyncComponent(() => import('container/finance/all-user-flows/all-user-flows'))
  },
  {
    path: '/finance/breakBalance',
    component: asyncComponent(() => import('container/finance/account/account'))
  },
  {
    path: '/finance/breakBalance/ledger',
    component: asyncComponent(() => import('container/finance/account-ledger/account-ledger'))
  },
  {
    path: '/finance/platform_ledger',
    component: asyncComponent(() => import('container/finance/platform-ledger/platform-ledger'))
  },
  {
    path: '/finance/platform_ledger/addedit',
    component: asyncComponent(() => import('container/finance/ledger-addedit/ledger-addedit'))
  },
  {
    path: '/finance/enchashmentRule',
    component: asyncComponent(() => import('container/finance/enchashmentRule/enchashmentRule'))
  },
  {
    path: '/finance/enchashmentRule/addedit',
    component: asyncComponent(() => import('container/finance/enchashmentRule-addedit/enchashmentRule-addedit'))
  },
  {
    path: '/finance/underEnchashment',
    component: asyncComponent(() => import('container/finance/underEnchashment/underEnchashment'))
  },
  {
    path: '/finance/underEnchashment/addedit',
    component: asyncComponent(() => import('container/finance/underEnchashment-addedit/underEnchashment-addedit'))
  },
  {
    path: '/finance/underEnchashment/check',
    component: asyncComponent(() => import('container/finance/underEnchashment-check/underEnchashment-check'))
  },
  {
    path: '/finance/enchashments',
    component: asyncComponent(() => import('container/finance/enchashments/enchashments'))
  },
  {
    path: '/finance/enchashments/addedit',
    component: asyncComponent(() => import('container/finance/enchashments-addedit/enchashments-addedit'))
  },
  //  车辆贷后管理
  //  车贷业务管理
  {
    path: '/biz/carLoanBusiness',
    component: asyncComponent(() => import('container/biz/carLoanRepay/carLoanBusiness'))
  },
  //  车贷业务详情
  {
    path: '/biz/carLoanBusiness/addedit',
    component: asyncComponent(() => import('container/biz/carLoanRepay/carLoanBusiness-addedit'))
  },
  //  车贷业务审核
  {
    path: '/biz/carLoanBusiness/check',
    component: asyncComponent(() => import('container/biz/carLoanRepay/carLoanBusiness-check'))
  },
  //  GPS安装
  {
    path: '/biz/installGps',
    component: asyncComponent(() => import('container/biz/carLoanRepay/installGps'))
  },
  //  GPS安装 详情
  {
    path: '/biz/installGps/addedit',
    component: asyncComponent(() => import('container/biz/carLoanRepay/installGps-addedit'))
  },
  //  GPS安装 录入
  {
    path: '/biz/installGps/enter',
    component: asyncComponent(() => import('container/biz/carLoanRepay/installGps-enter'))
  },
  //  GPS安装 审核
  {
    path: '/biz/installGps/check',
    component: asyncComponent(() => import('container/biz/carLoanRepay/installGps-check'))
  },
  //  银行放款
  {
    path: '/biz/bankMoney',
    component: asyncComponent(() => import('container/biz/carLoanRepay/bankMoney'))
  },
  //  银行放款 详情
  {
    path: '/biz/bankMoney/addedit',
    component: asyncComponent(() => import('container/biz/carLoanRepay/bankMoney-addedit'))
  },
  //  银行放款 车辆落户
  {
    path: '/biz/bankMoney/settle',
    component: asyncComponent(() => import('container/biz/carLoanRepay/bankMoney-settle'))
  },
  //  银行放款 确认提交银行
  {
    path: '/biz/bankMoney/sub',
    component: asyncComponent(() => import('container/biz/carLoanRepay/bankMoney-sub'))
  },
  //  银行放款 确认收款
  {
    path: '/biz/bankMoney/certain',
    component: asyncComponent(() => import('container/biz/carLoanRepay/bankMoney-certain'))
  },
  //  银行放款 录入
  {
    path: '/biz/bankMoney/enter',
    component: asyncComponent(() => import('container/biz/carLoanRepay/bankMoney-enter'))
  },
  //  车辆抵押
  {
    path: '/biz/mortgage',
    component: asyncComponent(() => import('container/biz/carLoanRepay/mortgage'))
  },
  //  车辆抵押 详情
  {
    path: '/biz/mortgage/addedit',
    component: asyncComponent(() => import('container/biz/carLoanRepay/mortgage-addedit'))
  },
  //  车辆抵押 录入抵押信息
  {
    path: '/biz/mortgage/enter',
    component: asyncComponent(() => import('container/biz/carLoanRepay/mortgage-enter'))
  },
  //  车辆抵押 确认提交银行
  {
    path: '/biz/mortgage/sub',
    component: asyncComponent(() => import('container/biz/carLoanRepay/mortgage-sub'))
  },
  //  档案入党
  {
    path: '/biz/archives',
    component: asyncComponent(() => import('container/biz/carLoanRepay/archives'))
  },
  //  档案入党 详情
  {
    path: '/biz/archives/addedit',
    component: asyncComponent(() => import('container/biz/carLoanRepay/archives-addedit'))
  },
  //  档案入党 确认入档
  {
    path: '/biz/archives/certain',
    component: asyncComponent(() => import('container/biz/carLoanRepay/archives-certain'))
  },
  //  还款业务管理
  {
    path: '/biz/refundBusiness',
    component: asyncComponent(() => import('container/biz/carLoanRepay/refundBusiness'))
  },
  //  还款业务详情
  {
    path: '/biz/refundBusiness/addedit',
    component: asyncComponent(() => import('container/biz/carLoanRepay/refundBusiness-addedit'))
  },
  //  还款业务还款计划
  {
    path: '/biz/refundBusiness/plan',
    component: asyncComponent(() => import('container/biz/carLoanRepay/refundBusiness-plan'))
  },
  //  还款业务还款卡变更
  {
    path: '/biz/refundBusiness/changecard',
    component: asyncComponent(() => import('container/biz/carLoanRepay/refundBusiness-changeCard'))
  },
  //  还款业务确认结清
  {
    path: '/biz/refundBusiness/certain',
    component: asyncComponent(() => import('container/biz/carLoanRepay/refundBusiness-certain'))
  },
  //  当月还款名单
  {
    path: '/biz/refundList',
    component: asyncComponent(() => import('container/biz/carLoanRepay/refundList'))
  },
  //  当月还款名单详情
  {
    path: '/biz/refundList/addedit',
    component: asyncComponent(() => import('container/biz/carLoanRepay/refundList-addedit'))
  },
  //  逾期名单
  {
    path: '/biz/overdueList',
    component: asyncComponent(() => import('container/biz/carLoanRepay/overdueList'))
  },
  //  逾期名单详情
  {
    path: '/biz/overdueList/addedit',
    component: asyncComponent(() => import('container/biz/carLoanRepay/overdueList-addedit'))
  },
  //  逾期处理
  {
    path: '/biz/overdueList/dispose',
    component: asyncComponent(() => import('container/biz/carLoanRepay/overdueList-dispose'))
  },
  //  绿名单
  {
    path: '/biz/greenList',
    component: asyncComponent(() => import('container/biz/carLoanRepay/greenList'))
  },
  //  绿名单详情
  {
    path: '/biz/greenList/addedit',
    component: asyncComponent(() => import('container/biz/carLoanRepay/greenList-addedit'))
  },
  //  绿名单 缴纳清收成本
  {
    path: '/biz/greenList/payment',
    component: asyncComponent(() => import('container/biz/carLoanRepay/greenList-payment'))
  },
  //  黑名单
  {
    path: '/biz/blackList',
    component: asyncComponent(() => import('container/biz/carLoanRepay/blackList'))
  },
  //  黑名单详情
  {
    path: '/biz/blackList/addedit',
    component: asyncComponent(() => import('container/biz/carLoanRepay/blackList-addedit'))
  },
  //  黑名单处理
  {
    path: '/biz/blackList/dispose',
    component: asyncComponent(() => import('container/biz/carLoanRepay/blackList-dispose'))
  },
  //  红名单
  {
    path: '/biz/redList',
    component: asyncComponent(() => import('container/biz/carLoanRepay/redList'))
  },
  //  红名单 详情
  {
    path: '/biz/redList/addedit',
    component: asyncComponent(() => import('container/biz/carLoanRepay/redList-addedit'))
  },
  //  红名单 拖车申请
  {
    path: '/biz/redList/apply',
    component: asyncComponent(() => import('container/biz/carLoanRepay/redList-apply'))
  },
  //  红名单 总经理审批
  {
    path: '/biz/redList/check',
    component: asyncComponent(() => import('container/biz/carLoanRepay/redList-check'))
  },
  //  红名单 财务打款
  {
    path: '/biz/redList/pay',
    component: asyncComponent(() => import('container/biz/carLoanRepay/redList-pay'))
  },
  //  拖车管理
  {
    path: '/biz/trailer',
    component: asyncComponent(() => import('container/biz/carLoanRepay/trailer'))
  },
  //  拖车管理 详情
  {
    path: '/biz/trailer/addedit',
    component: asyncComponent(() => import('container/biz/carLoanRepay/trailer-addedit'))
  },
  //  拖车管理 处理结果
  {
    path: '/biz/trailer/dispose',
    component: asyncComponent(() => import('container/biz/carLoanRepay/trailer-dispose'))
  },
  //  司法诉讼
  {
    path: '/biz/litigation',
    component: asyncComponent(() => import('container/biz/carLoanRepay/litigation'))
  },
  //  司法诉讼 详情
  {
    path: '/biz/litigation/addedit',
    component: asyncComponent(() => import('container/biz/carLoanRepay/litigation-addedit'))
  },
  //  司法诉讼 处理结果
  {
    path: '/biz/litigation/dispose',
    component: asyncComponent(() => import('container/biz/carLoanRepay/litigation-dispose'))
  },
  //  历史业务管理
  {
    path: '/biz/historyBusinessManage',
    component: asyncComponent(() => import('container/biz/carLoanRepay/historyBusinessManage'))
  },
  //  历史业务管理详情
  {
    path: '/biz/historyBusinessManage/addedit',
    component: asyncComponent(() => import('container/biz/carLoanRepay/historyBusinessManage-addedit'))
  },
  //  历史业务管理详情的详情
  {
    path: '/biz/historyBusinessManage/addedit/addedit',
    component: asyncComponent(() => import('container/biz/carLoanRepay/historyBusinessManage-addedit-addedit'))
  },
  //  商品分期管理
  //  类别管理
  {
    path: '/wares/category',
    component: asyncComponent(() => import('container/wares/category/category'))
  },
  //  类别管理详情
  {
    path: '/wares/category/addedit',
    component: asyncComponent(() => import('container/wares/category/category-addedit'))
  },
  //  商品管理
  {
    path: '/wares/commodity',
    component: asyncComponent(() => import('container/wares/commodity/commodity'))
  },
  //  商品管理详情
  {
    path: '/wares/commodity/addedit',
    component: asyncComponent(() => import('container/wares/commodity/commodity-addedit'))
  },
  //  订单管理
  {
    path: '/wares/order',
    component: asyncComponent(() => import('container/wares/order/order'))
  },
  //  订单管理详情
  {
    path: '/wares/order/addedit',
    component: asyncComponent(() => import('container/wares/order/order-addedit'))
  },
  //  订单管理 发货
  {
    path: '/wares/order/goods',
    component: asyncComponent(() => import('container/wares/order/order-goods'))
  },
  //  业务规则
  //  信用分规则
  {
    path: '/integral/credit',
    component: asyncComponent(() => import('container/integral/credit/credit'))
  },
  //  信用分规则修改
  {
    path: '/integral/credit/addedit',
    component: asyncComponent(() => import('container/integral/credit/credit-addedit'))
  },
  //  积分规则
  {
    path: '/integral/integral',
    component: asyncComponent(() => import('container/integral/integral/integral'))
  },
  //  积分规则修改
  {
    path: '/integral/integral/addedit',
    component: asyncComponent(() => import('container/integral/integral/integral-addedit'))
  },
  //  积分兑换规则
  {
    path: '/integral/integralexchange',
    component: asyncComponent(() => import('container/integral/integralexchange/integralexchange'))
  },
  //  积分兑换规则修改
  {
    path: '/integral/integralexchange/addedit',
    component: asyncComponent(() => import('container/integral/integralexchange/integralexchange-addedit'))
  },
  //  基础数据
  //  车贷期数
  {
    path: '/basedata/carloan',
    component: asyncComponent(() => import('container/basedata/carloan/carloan'))
  },
  //  车贷期数详情 + 修改
  {
    path: '/basedata/carloan/addedit',
    component: asyncComponent(() => import('container/basedata/carloan/carloan-addedit'))
  },
  //  贷款产品
  {
    path: '/basedata/goodsloan',
    component: asyncComponent(() => import('container/basedata/goodsloan/goodsloan'))
  },
  //  贷款产品详情 + 修改
  {
    path: '/basedata/goodsloan/addedit',
    component: asyncComponent(() => import('container/basedata/goodsloan/goodsloan-addedit'))
  },
  //  提前还款
  {
    path: '/basedata/beforeloan',
    component: asyncComponent(() => import('container/basedata/beforeloan/beforeloan'))
  },
  //  银行管理
  {
    path: '/basedata/bank',
    component: asyncComponent(() => import('container/basedata/bank/bank'))
  },
  //  银行管理详情 + 修改
  {
    path: '/basedata/bank/addedit',
    component: asyncComponent(() => import('container/basedata/bank/bank-addedit'))
  },
  //  返点比例
  {
    path: '/basedata/rebate',
    component: asyncComponent(() => import('container/basedata/rebate/rebate'))
  },
  //  节点材料清单
  {
    path: '/basedata/materiallist',
    component: asyncComponent(() => import('container/basedata/materiallist/materiallist'))
  },
  //  节点材料清单详情 + 修改
  {
    path: '/basedata/materiallist/addedit',
    component: asyncComponent(() => import('container/basedata/materiallist/materiallist-addedit'))
  },
  //  收款账号管理
  {
    path: '/basedata/receivables',
    component: asyncComponent(() => import('container/basedata/receivables/receivables'))
  },
  //  收款账号管理详情 + 修改
  {
    path: '/basedata/receivables/addedit',
    component: asyncComponent(() => import('container/basedata/receivables/receivables-addedit'))
  },
  //  统计分析模块
  //  余额明细
  {
    path: '/statistic/balancedetail',
    component: asyncComponent(() => import('container/analysis/statistic/balancedetail'))
  },
  //  在保余额
  {
    path: '/statistic/protect',
    component: asyncComponent(() => import('container/analysis/statistic/protect'))
  },
  //  在保余额
  {
    path: '/statistic/protect/addedit',
    component: asyncComponent(() => import('container/analysis/statistic/protect-addedit'))
  },
  // 贷前管理
  // 发起征信查询
  {
      path: '/loan/credit',
      component: asyncComponent(() => import('container/loan/credit/credit'))
  },
  // 发起征信查询  发起征信查询
  {
      path: '/loan/credit/addedit',
      component: asyncComponent(() => import('container/loan/credit-addedit/credit-addedit'))
  },
  // 准入申请
  {
    path: '/loan/applyAdmittance',
    component: asyncComponent(() => import('container/loan/apply-admittance/apply-admittance'))
  },
  {
    path: '/loan/applyAdmittance/addedit',
    component: asyncComponent(() => import('container/loan/apply-admittance-addedit/apply-admittance-addedit'))
  },
  // 准入审查
  {
      path: '/loan/admittance',
      component: asyncComponent(() => import('container/loan/admittance/admittance'))
  },
  // 准入审查 发起
  {
      path: '/loan/admittance/addedit',
      component: asyncComponent(() => import('container/loan/admittance-addedit/admittance-addedit'))
  },
  // 准入审查 审核
  {
      path: '/loan/admittance/check',
      component: asyncComponent(() => import('container/loan/admittance-check/admittance-check'))
  },
  // 面签审核
  {
      path: '/loan/faceSign',
      component: asyncComponent(() => import('container/loan/faceSign/faceSign'))
  },
  // 面签审核 录入
  {
      path: '/loan/faceSign/addedit',
      component: asyncComponent(() => import('container/loan/faceSign-addedit/faceSign-addedit'))
  },
  // 财务垫资
  {
      path: '/loan/advMoney',
      component: asyncComponent(() => import('container/loan/advMoney/advMoney'))
  },
  // 财务垫资 垫资
  {
      path: '/loan/advMoney/addedit',
      component: asyncComponent(() => import('container/loan/advMoney-addedit/advMoney-addedit'))
  },
  //  贷前工具
  //  收回手续费
  {
    path: '/loanstools/takeFree',
    component: asyncComponent(() => import('container/loanstools/takeFree/takeFree'))
  },
  //  收回手续费 详情
  {
      path: '/loanstools/takeFree/addedit',
      component: asyncComponent(() => import('container/loanstools/takeFree/takeFree-addedit'))
  },
  //  收回手续费 申请
  {
      path: '/loanstools/takeFree/enter',
      component: asyncComponent(() => import('container/loanstools/takeFree/takeFree-enter'))
  },
  //  退客户垫资款
  {
    path: '/loanstools/refund',
    component: asyncComponent(() => import('container/loanstools/refund/refund'))
  },
  //  退客户垫资款 详情
  {
      path: '/loanstools/refund/addedit',
      component: asyncComponent(() => import('container/loanstools/refund/refund-addedit'))
  },
  //  退客户垫资款 申请
  {
      path: '/loanstools/refund/certain',
      component: asyncComponent(() => import('container/loanstools/refund/refund-certain'))
  },
  //  客户作废
  {
      path: '/loanstools/cancel',
      component: asyncComponent(() => import('container/loanstools/cancel/cancel'))
  },
  //  客户作废 详情
  {
      path: '/loanstools/cancel/addedit',
      component: asyncComponent(() => import('container/loanstools/cancel/cancel-addedit'))
  },
  //  客户作废 申请
  {
      path: '/loanstools/cancel/apply',
      component: asyncComponent(() => import('container/loanstools/cancel/cancel-apply'))
  },
  //  客户作废 审核
  {
      path: '/loanstools/cancel/check',
      component: asyncComponent(() => import('container/loanstools/cancel/cancel-check'))
  },
  //  客户作废 确认放款
  {
      path: '/loanstools/cancel/certain',
      component: asyncComponent(() => import('container/loanstools/cancel/cancel-certain'))
  },
  //  资料传递
  //  资料传递
  {
    path: '/transmit/transmit',
    component: asyncComponent(() => import('container/transmit/transmit/transmit'))
  },
  //  资料传递 详情
  {
    path: '/transmit/transmit/addedit',
    component: asyncComponent(() => import('container/transmit/transmit/transmit-addedit'))
  },
  //  资料传递 发件
  {
    path: '/transmit/transmit/send',
    component: asyncComponent(() => import('container/transmit/transmit/transmit-send'))
  },
  //  资料传递 收件并审核
  {
    path: '/transmit/transmit/check',
    component: asyncComponent(() => import('container/transmit/transmit/transmit-check'))
  },
  //  贷后工具
  //  gps申领
  {
    path: '/postloantools/applyGps',
    component: asyncComponent(() => import('container/postloantools/applyGps/applyGps'))
  },
  //  gps申领 详情
  {
    path: '/postloantools/applyGps/addedit',
    component: asyncComponent(() => import('container/postloantools/applyGps/applyGps-addedit'))
  },
  //  gps申领 申领
  {
    path: '/postloantools/applyGps/apply',
    component: asyncComponent(() => import('container/postloantools/applyGps/applyGps-apply'))
  },
  //  gps申领 GPS管理员审核
  {
    path: '/postloantools/applyGps/check',
    component: asyncComponent(() => import('container/postloantools/applyGps/applyGps-check'))
  },
  //  gps安装
  {
    path: '/postloantools/manageGps',
    component: asyncComponent(() => import('container/postloantools/manageGps/manageGps'))
  },
  //  gps安装 详情
  {
    path: '/postloantools/manageGps/addedit',
    component: asyncComponent(() => import('container/postloantools/manageGps/manageGps-addedit'))
  }
];

export default ROUTES;
