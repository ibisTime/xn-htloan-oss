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
  {
    path: '/system/user/edit',
    component: asyncComponent(() => import('container/security/user/edit'))
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
  //  银行放款 资料补录
  {
    path: '/biz/bankMoney/record',
    component: asyncComponent(() => import('container/biz/carLoanRepay/bankMoney-record'))
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
  //  车辆抵押 抵押完成
  {
    path: '/biz/mortgage/certain',
    component: asyncComponent(() => import('container/biz/carLoanRepay/mortgage-certain'))
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
  //  黄名单
  {
    path: '/biz/yellowList',
    component: asyncComponent(() => import('container/biz/carLoanRepay/yellowList'))
  },
  //  黄名单 详情
  {
    path: '/biz/yellowList/addedit',
    component: asyncComponent(() => import('container/biz/carLoanRepay/yellowList-addedit'))
  },
  //  黄名单 缴纳清收成本
  {
    path: '/biz/yellowList/payCost',
    component: asyncComponent(() => import('container/biz/carLoanRepay/yellowList-payCost'))
  },
  //  黄名单 缴纳代偿款
  {
    path: '/biz/yellowList/payCompensate',
    component: asyncComponent(() => import('container/biz/carLoanRepay/yellowList-payCompensate'))
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
  //  红名单 录入拖车结果
  {
    path: '/biz/redList/enter',
    component: asyncComponent(() => import('container/biz/carLoanRepay/redList-enter'))
  },
  //  红名单 财务打款
  {
    path: '/biz/redList/pay',
    component: asyncComponent(() => import('container/biz/carLoanRepay/redList-pay'))
  },
  //  红名单 总经理审核
  {
    path: '/biz/redList/check',
    component: asyncComponent(() => import('container/biz/carLoanRepay/redList-check'))
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
  //  用户赎回
  {
    path: '/biz/userRedemption',
    component: asyncComponent(() => import('container/biz/carLoanRepay/userRedemption'))
  },
  //  用户赎回 详情
  {
    path: '/biz/userRedemption/addedit',
    component: asyncComponent(() => import('container/biz/carLoanRepay/userRedemption-addedit'))
  },
  //  用户赎回 申请赎回
  {
    path: '/biz/userRedemption/applyRedeem',
    component: asyncComponent(() => import('container/biz/carLoanRepay/userRedemption-applyRedeem'))
  },
  //  用户赎回 风控主管审核
  {
    path: '/biz/userRedemption/checkDirector',
    component: asyncComponent(() => import('container/biz/carLoanRepay/userRedemption-checkDirector'))
  },
  //  用户赎回 财务经理审核
  {
    path: '/biz/userRedemption/checkFinance',
    component: asyncComponent(() => import('container/biz/carLoanRepay/userRedemption-checkFinance'))
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
  //  结清审核
  {
    path: '/biz/settlement',
    component: asyncComponent(() => import('container/biz/carLoanRepay/settlement'))
  },
  //  结清审核 详情
  {
    path: '/biz/settlement/addedit',
    component: asyncComponent(() => import('container/biz/carLoanRepay/settlement-addedit'))
  },
  //  结清审核 清欠催收部审核
  {
    path: '/biz/settlement/collection',
    component: asyncComponent(() => import('container/biz/carLoanRepay/settlement-collection'))
  },
  //  结清审核 驻行人员审核
  {
    path: '/biz/settlement/stationed',
    component: asyncComponent(() => import('container/biz/carLoanRepay/settlement-stationed'))
  },
  //  结清审核 总经理审核
  {
    path: '/biz/settlement/manager',
    component: asyncComponent(() => import('container/biz/carLoanRepay/settlement-manager'))
  },
  //  结清审核 财务审核
  {
    path: '/biz/settlement/finance',
    component: asyncComponent(() => import('container/biz/carLoanRepay/settlement-finance'))
  },
  //  解除抵押
  {
    path: '/biz/mortgages',
    component: asyncComponent(() => import('container/biz/carLoanRepay/mortgages'))
  },
  //  解除抵押 详情
  {
    path: '/biz/mortgages/addedit',
    component: asyncComponent(() => import('container/biz/carLoanRepay/mortgages-addedit'))
  },
  //  解除抵押 解除抵押
  {
    path: '/biz/mortgages/relieve',
    component: asyncComponent(() => import('container/biz/carLoanRepay/mortgages-relieve'))
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
  //  银行管理类别
  {
    path: '/basedata/bankType',
    component: asyncComponent(() => import('container/basedata/bankType/bankType'))
  },
  //  银行管理类别详情 + 新增
  {
    path: '/basedata/bankType/addedit',
    component: asyncComponent(() => import('container/basedata/bankType/bankType-addedit'))
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
  //  征信统计表
  {
      path: '/statistic/credit-report',
      component: asyncComponent(() => import('container/statistic/creditReport/creditReport'))
  },
  //  贷后统计表
  {
      path: '/statistic/postloan-report',
      component: asyncComponent(() => import('container/statistic/postloanReport/postloanReport'))
  },
  //  业务报表
  {
      path: '/statistic/business-report',
      component: asyncComponent(() => import('container/statistic/businessReport/businessReport'))
  },
  //  团队统计表
  {
      path: '/statistic/team-report',
      component: asyncComponent(() => import('container/statistic/teamReport/teamReport'))
  },
  //  进度日报表
  {
    path: '/statistic/day-report',
    component: asyncComponent(() => import('container/statistic/dayReport/dayReport'))
  },
  //  垫资超1天未放款
  {
    path: '/statistic/one-report',
    component: asyncComponent(() => import('container/statistic/oneReport/oneReport'))
  },
  {
    path: '/statistic/one-report/addedit',
    component: asyncComponent(() => import('container/loan/admittance-addedit/admittance-addedit'))
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
      // component: asyncComponent(() => import('container/loan/credit-addedit/demo'))
  },
  // 发起征信查询  内勤主管派单
  {
      path: '/loan/credit/dispatch',
      component: asyncComponent(() => import('container/loan/credit/credit-dispatch'))
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
      // component: asyncComponent(() => import('container/loan/admittance-addedit/demo'))
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
  //  调查报告
  {
      path: '/loanstools/investigateReport',
      component: asyncComponent(() => import('container/loanstools/investigateReport/investigateReport'))
  },
  //  收回手续费 详情
  {
      path: '/loanstools/investigateReport/addedit',
      component: asyncComponent(() => import('container/loanstools/investigateReport/investigateReport-addedit'))
  },

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
  //  客户作废 业务总监审核
  {
      path: '/loanstools/cancel/check',
      component: asyncComponent(() => import('container/loanstools/cancel/cancel-check'))
  },
  //  客户作废 财务总监审核
  {
      path: '/loanstools/cancel/certain',
      component: asyncComponent(() => import('container/loanstools/cancel/cancel-certain'))
  },
  //  资料传递
  //  发件列表
  {
    path: '/transmit/transmit',
    component: asyncComponent(() => import('container/transmit/transmit/transmit'))
  },
  //  发件 详情
  {
    path: '/transmit/transmit/addedit',
    component: asyncComponent(() => import('container/transmit/transmit/transmit-addedit'))
  },
  //  发件 发件
  {
    path: '/transmit/transmit/send',
    component: asyncComponent(() => import('container/transmit/transmit/transmit-send'))
  },
  //  收件
  {
    path: '/transmit/collection',
    component: asyncComponent(() => import('container/transmit/collection/collection'))
  },
  //  收件 详情
  {
    path: '/transmit/collection/addedit',
    component: asyncComponent(() => import('container/transmit/collection/collection-addedit'))
  },
  //  收件 收件并审核
  {
    path: '/transmit/collection/check',
    component: asyncComponent(() => import('container/transmit/collection/collection-check'))
  },
  //  GPS发件列表
  {
    path: '/transmit/transmitGps',
    component: asyncComponent(() => import('container/transmit/transmitGPS/transmit'))
  },
  //  GPS发件 详情
  {
    path: '/transmit/transmitGps/addedit',
    component: asyncComponent(() => import('container/transmit/transmitGPS/transmit-addedit'))
  },
  //  GPS发件 发件
  {
    path: '/transmit/transmitGps/send',
    component: asyncComponent(() => import('container/transmit/transmitGPS/transmit-send'))
  },
  //  GPS收件
  {
    path: '/transmit/collectionGPS',
    component: asyncComponent(() => import('container/transmit/collectionGPS/collectionGPS'))
  },
  //  GPS收件 详情
  {
    path: '/transmit/collectionGPS/addedit',
    component: asyncComponent(() => import('container/transmit/collectionGPS/collectionGPS-addedit'))
  },
  //  GPS收件 收件并审核
  {
    path: '/transmit/collectionGPS/check',
    component: asyncComponent(() => import('container/transmit/collectionGPS/collectionGPS-check'))
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
  //  gps库存管理
  {
    path: '/postloantools/manageGps',
    component: asyncComponent(() => import('container/postloantools/manageGps/manageGps'))
  },
  //  gps库存管理 详情
  {
    path: '/postloantools/manageGps/addedit',
    component: asyncComponent(() => import('container/postloantools/manageGps/manageGps-addedit'))
  },
  //  gps库存管理 导入
  {
    path: '/postloantools/manageGps/import',
    component: asyncComponent(() => import('container/postloantools/manageGps/manageGps-import'))
  },
  //  导入逾期名单
  {
    path: '/postloantools/import',
    component: asyncComponent(() => import('container/postloantools/import/import'))
  },
  //  导入逾期名单 详情
  {
    path: '/postloantools/import/addedit',
    component: asyncComponent(() => import('container/postloantools/import/import-addedit'))
  },
  //  导入逾期名单 导入
  {
    path: '/postloantools/import/import',
    component: asyncComponent(() => import('container/postloantools/import/import-import'))
  },
  //  导入逾期名单 处理
  {
    path: '/postloantools/import/dispose',
    component: asyncComponent(() => import('container/postloantools/import/import-dispose'))
  },
  //  人事
  //  人事档案
  {
    path: '/personalarchives/parchives',
    component: asyncComponent(() => import('container/personalarchives/parchives/parchives'))
  },
  //  人事档案 详情
  {
    path: '/personalarchives/parchives/addedit',
    component: asyncComponent(() => import('container/personalarchives/parchives/parchives-addedit'))
  },
  //  人事档案 详情
  {
    path: '/personalarchives/parchives/enter',
    component: asyncComponent(() => import('container/personalarchives/parchives/parchives-enter'))
  },
  //  人事分析
  {
    path: '/personalarchives/panalysis',
    component: asyncComponent(() => import('container/personalarchives/panalysis/panalysis'))
  },
  //  车贷档案
  {
      path: '/loanarchives/locationcode',
      component: asyncComponent(() => import('container/loanarchives/loanarchives/locationcode'))
  },
  //  车贷档案 详情
  {
      path: '/loanarchives/locationcode/addedit',
      component: asyncComponent(() => import('container/loanarchives/loanarchives/locationcode-addedit'))
  },
  //  车贷档案查询
  {
      path: '/loanarchives/archivesquery',
      component: asyncComponent(() => import('container/loanarchives/loanarchives/archivesquery'))
  },
  //  离职档案
  {
    path: '/personalarchives/quitarchives',
    component: asyncComponent(() => import('container/personalarchives/quitarchives/quitarchives'))
  },
  //  离职档案 详情
  {
    path: '/personalarchives/quitarchives/addedit',
    component: asyncComponent(() => import('container/personalarchives/quitarchives/quitarchives-addedit'))
  },
  //  合同管理
  {
    path: '/contract/manage',
    component: asyncComponent(() => import('container/contract/manage/manage'))
  },
  //  合同管理 详情
  {
    path: '/contract/manage/addedit',
    component: asyncComponent(() => import('container/contract/manage/manage-addedit'))
  },
  //  合同管理 续约
  {
    path: '/contract/manage/continue',
    component: asyncComponent(() => import('container/contract/manage/manage-continue'))
  },
  //  合同管理预警
  {
    path: '/contract/warning',
    component: asyncComponent(() => import('container/contract/warning/warning'))
  },
  //  应聘登记
  {
    path: '/recruit/register',
    component: asyncComponent(() => import('container/recruit/register/register'))
  },
  //  应聘登记 详情
  {
    path: '/recruit/register/addedit',
    component: asyncComponent(() => import('container/recruit/register/register-addedit'))
  },
  //  应聘登记 录入
  {
    path: '/recruit/register/enter',
    component: asyncComponent(() => import('container/recruit/register/register-enter'))
  },
  //  应聘登记 申请
  {
    path: '/recruit/register/apply',
    component: asyncComponent(() => import('container/recruit/register/register-apply'))
  },
  //  用人申请
  {
    path: '/recruit/apply',
    component: asyncComponent(() => import('container/recruit/apply/apply'))
  },
  //  用人申请 详情
  {
    path: '/recruit/apply/addedit',
    component: asyncComponent(() => import('container/recruit/apply/apply-addedit'))
  },
  //  用人申请 申请
  {
    path: '/recruit/apply/apply',
    component: asyncComponent(() => import('container/recruit/apply/apply-apply'))
  },
  //  用人申请 审核
  {
    path: '/recruit/apply/check',
    component: asyncComponent(() => import('container/recruit/apply/apply-check'))
  },
  //  入职申请
  {
    path: '/recruit/entry',
    component: asyncComponent(() => import('container/recruit/entry/entry'))
  },
  //  入职申请 详情
  {
    path: '/recruit/entry/addedit',
    component: asyncComponent(() => import('container/recruit/entry/entry-addedit'))
  },
  //  入职申请 申请
  {
    path: '/recruit/entry/apply',
    component: asyncComponent(() => import('container/recruit/entry/entry-apply'))
  },
  //  入职申请 审核
  {
    path: '/recruit/entry/check',
    component: asyncComponent(() => import('container/recruit/entry/entry-check'))
  },
  //  转正申请
  {
    path: '/recruit/formal',
    component: asyncComponent(() => import('container/recruit/formal/formal'))
  },
  //  转正申请 详情
  {
    path: '/recruit/formal/addedit',
    component: asyncComponent(() => import('container/recruit/formal/formal-addedit'))
  },
  //  转正申请 申请
  {
    path: '/recruit/formal/apply',
    component: asyncComponent(() => import('container/recruit/formal/formal-apply'))
  },
  //  转正申请 审核
  {
    path: '/recruit/formal/check',
    component: asyncComponent(() => import('container/recruit/formal/formal-check'))
  },
  //  调岗申请
  {
    path: '/recruit/post',
    component: asyncComponent(() => import('container/recruit/post/post'))
  },
  //  调岗申请 详情
  {
    path: '/recruit/post/addedit',
    component: asyncComponent(() => import('container/recruit/post/post-addedit'))
  },
  //  调岗申请 详情
  {
    path: '/recruit/post/check',
    component: asyncComponent(() => import('container/recruit/post/post-check'))
  },
  //  请假申请
  {
    path: '/attendance/leave',
    component: asyncComponent(() => import('container/attendance/leave/leave'))
  },
  //  请假申请 详情
  {
    path: '/attendance/leave/addedit',
    component: asyncComponent(() => import('container/attendance/leave/leave-addedit'))
  },
  //  补签申请
  {
      path: '/attendance/supplement',
      component: asyncComponent(() => import('container/attendance/supplement/supplement'))
  },
  //  补签申请 详情
  {
      path: '/attendance/supplement/addedit',
      component: asyncComponent(() => import('container/attendance/supplement/supplement-addedit'))
  },
  //  加班申请
  {
      path: '/attendance/overtime',
      component: asyncComponent(() => import('container/attendance/overtime/overtime'))
  },
  //  加班申请 详情
  {
      path: '/attendance/overtime/addedit',
      component: asyncComponent(() => import('container/attendance/overtime/overtime-addedit'))
  },
  //  出差申请
  {
      path: '/attendance/travel',
      component: asyncComponent(() => import('container/attendance/travel/travel'))
  },
  //  出差申请 详情
  {
      path: '/attendance/travel/addedit',
      component: asyncComponent(() => import('container/attendance/travel/travel-addedit'))
  },
  //  出差申请 申请
  {
      path: '/attendance/travel/apply',
      component: asyncComponent(() => import('container/attendance/travel/travel-apply'))
  },
  //  出差申请 部门主管审核
  {
      path: '/attendance/travel/departmentCheck',
      component: asyncComponent(() => import('container/attendance/travel/travel-departmentCheck'))
  },
  //  出差申请 财务经理审核
  {
      path: '/attendance/travel/financeCheck',
      component: asyncComponent(() => import('container/attendance/travel/travel-financeCheck'))
  },
  //  出差申请 总经理审核
  {
      path: '/attendance/travel/managerCheck',
      component: asyncComponent(() => import('container/attendance/travel/travel-managerCheck'))
  },
  //  公出申请
  {
      path: '/attendance/publicity',
      component: asyncComponent(() => import('container/attendance/publicity/publicity'))
  },
  //  公出申请 详情
  {
      path: '/attendance/publicity/addedit',
      component: asyncComponent(() => import('container/attendance/publicity/publicity-addedit'))
  },
  //  考勤汇总
  {
      path: '/attendance/summary',
      component: asyncComponent(() => import('container/attendance/summary/summary'))
  },
  //  休息日定义
  {
      path: '/attendance/restDay',
      component: asyncComponent(() => import('container/attendance/restDay/restDay'))
  },
  // 行政
  // 库存管理
  // 类别管理
  {
      path: '/stock/category',
      component: asyncComponent(() => import('container/stock/category/category'))
  },
  // 类别管理 详情
  {
      path: '/stock/category/addedit',
      component: asyncComponent(() => import('container/stock/category/category-addedit'))
  },
  // 品名管理
  {
      path: '/stock/productname',
      component: asyncComponent(() => import('container/stock/productname/productname'))
  },
  // 品名管理 详情
  {
      path: '/stock/productname/addedit',
      component: asyncComponent(() => import('container/stock/productname/productname-addedit'))
  },
  // 出库管理
  {
      path: '/stock/outtreasury',
      component: asyncComponent(() => import('container/stock/outtreasury/outtreasury'))
  },
  // 出库管理 详情
  {
      path: '/stock/outtreasury/addedit',
      component: asyncComponent(() => import('container/stock/outtreasury/outtreasury-addedit'))
  },
  // 库存管理
  {
      path: '/stock/stock',
      component: asyncComponent(() => import('container/stock/stock/stock'))
  },
  // 库存管理 详情
  {
      path: '/stock/stock/addedit',
      component: asyncComponent(() => import('container/stock/stock/stock-addedit'))
  },
  // 通知公告
  // 公告管理
  {
      path: '/notice/notice',
      component: asyncComponent(() => import('container/notice/notice/notice'))
  },
  // 公告管理 详情
  {
      path: '/notice/notice/addedit',
      component: asyncComponent(() => import('container/notice/notice/notice-addedit'))
  },
  // 公司制度
  {
      path: '/notice/companysystem',
      component: asyncComponent(() => import('container/notice/companysystem/companysystem'))
  },
  // 公司制度 详情
  {
      path: '/notice/companysystem/addedit',
      component: asyncComponent(() => import('container/notice/companysystem/companysystem-addedit'))
  },
  //  行政审批
  //  车辆违章处理
  {
      path: '/administrative/carHandle',
      component: asyncComponent(() => import('container/administrative/carHandle/carHandle'))
  },
  //  车辆违章处理 详情
  {
      path: '/administrative/carHandle/addedit',
      component: asyncComponent(() => import('container/administrative/carHandle/carHandle-addedit'))
  },
  //  车辆违章处理 审核
  {
      path: '/administrative/carHandle/check',
      component: asyncComponent(() => import('container/administrative/carHandle/carHandle-check'))
  },
  //  福利发放申请
  {
      path: '/administrative/welfare',
      component: asyncComponent(() => import('container/administrative/welfare/welfare'))
  },
  //  福利发放申请 详情
  {
      path: '/administrative/welfare/addedit',
      component: asyncComponent(() => import('container/administrative/welfare/welfare-addedit'))
  },
  //  福利发放申请 审核
  {
      path: '/administrative/welfare/check',
      component: asyncComponent(() => import('container/administrative/welfare/welfare-check'))
  },
  // 办公用品申请
  {
      path: '/administrative/officeSupplies',
      component: asyncComponent(() => import('container/administrative/officeSupplies/officeSupplies'))
  },
  // 办公用品申请 详情
  {
      path: '/administrative/officeSupplies/addedit',
      component: asyncComponent(() => import('container/administrative/officeSupplies/officeSupplies-addedit'))
  },
  // 固定资产申请
  {
      path: '/administrative/fixedAssets',
      component: asyncComponent(() => import('container/administrative/fixedAssets/fixedAssets'))
  },
  // 固定资产申请 详情
  {
      path: '/administrative/fixedAssets/addedit',
      component: asyncComponent(() => import('container/administrative/fixedAssets/fixedAssets-addedit'))
  },
  // 领导请示申请
  {
      path: '/administrative/leader',
      component: asyncComponent(() => import('container/administrative/leader/leader'))
  },
  // 领导请示申请 详情
  {
      path: '/administrative/leader/addedit',
      component: asyncComponent(() => import('container/administrative/leader/leader-addedit'))
  },
  //  费用预支申请
  {
      path: '/administrative/cost',
      component: asyncComponent(() => import('container/administrative/cost/cost'))
  },
  //  费用预支申请 申请 审核
  {
      path: '/administrative/cost/addedit',
      component: asyncComponent(() => import('container/administrative/cost/cost-addedit'))
  },
  //  费用预支申请 详情
  {
      path: '/administrative/cost/detail',
      component: asyncComponent(() => import('container/administrative/cost/cost-detail'))
  },
  //  公车管理
  //  公车管理
  {
      path: '/bus/busmanager',
      component: asyncComponent(() => import('container/bus/busmanager/busmanager'))
  },
  //  公车管理 详情
  {
      path: '/bus/busmanager/addedit',
      component: asyncComponent(() => import('container/bus/busmanager/busmanager-addedit'))
  },
  //  公车管理 历史
  {
      path: '/bus/busmanager/bushistory',
      component: asyncComponent(() => import('container/bus/busmanager/bushistory'))
  },
  //  公车管理 历史详情
  {
      path: '/bus/busmanager/bushistory/addedit',
      component: asyncComponent(() => import('container/bus/busmanager/bushistory-addedit'))
  },
  //  公车使用申领
  {
      path: '/bus/busapply',
      component: asyncComponent(() => import('container/bus/busapply/busapply'))
  },
  //  公车使用申领 详情
  {
      path: '/bus/busapply/addedit',
      component: asyncComponent(() => import('container/bus/busapply/busapply-addedit'))
  },
  //  公车使用申领 申请
  {
      path: '/bus/busapply/apply',
      component: asyncComponent(() => import('container/bus/busapply/busapply-apply'))
  },
  //  公车使用申领 审核
  {
      path: '/bus/busapply/check',
      component: asyncComponent(() => import('container/bus/busapply/busapply-check'))
  },
  //  公车归还
  {
      path: '/bus/busreturn',
      component: asyncComponent(() => import('container/bus/busreturn/busreturn'))
  },
  //  公车归还 详情
  {
      path: '/bus/busreturn/addedit',
      component: asyncComponent(() => import('container/bus/busreturn/busreturn-addedit'))
  },
  //  公车归还 归还
  {
      path: '/bus/busreturn/return',
      component: asyncComponent(() => import('container/bus/busreturn/busreturn-return'))
  },
  //  公车归还 审核
  {
      path: '/bus/busreturn/check',
      component: asyncComponent(() => import('container/bus/busreturn/busreturn-check'))
  },
  // // 系统管理-公司管理
  //  业务团队
  {
      path: '/system/businessTeam',
      component: asyncComponent(() => import('container/security/businessTeam/businessTeam'))
  },
  //  业务团队 详情
  {
      path: '/system/businessTeam/addedit',
      component: asyncComponent(() => import('container/security/businessTeam/businessTeam-addedit'))
  },
  //  业务团队 成员管理
  {
      path: '/system/businessTeam/memberList',
      component: asyncComponent(() => import('container/security/businessTeam/memberList'))
  },
  //  业务团队 成员管理 详情
  {
      path: '/system/businessTeam/memberList/addedit',
      component: asyncComponent(() => import('container/security/businessTeam/memberList-addedit'))
  },
  //  财务管理
  //  返点支付
  {
      path: '/carloanfinance/pointreturn',
      component: asyncComponent(() => import('container/carloanfinance/pointreturn/pointreturn'))
  },
  //  返点支付 详情
  {
      path: '/carloanfinance/pointreturn/addedit',
      component: asyncComponent(() => import('container/carloanfinance/pointreturn/pointreturn-addedit'))
  },
  //  返点支付 成员管理
  {
      path: '/carloanfinance/pointreturn/return',
      component: asyncComponent(() => import('container/carloanfinance/pointreturn/pointreturn-return'))
  },
  //  还款业务管理
  {
      path: '/wares/refundBusiness',
      component: asyncComponent(() => import('container/wares/loanRepay/refundBusiness'))
  },
  //  还款业务详情
  {
      path: '/wares/refundBusiness/addedit',
      component: asyncComponent(() => import('container/wares/loanRepay/refundBusiness-addedit'))
  },
  //  还款业务还款计划
  {
      path: '/wares/refundBusiness/plan',
      component: asyncComponent(() => import('container/wares/loanRepay/refundBusiness-plan'))
  },
  //  还款业务还款卡变更
  {
      path: '/wares/refundBusiness/changecard',
      component: asyncComponent(() => import('container/wares/loanRepay/refundBusiness-changeCard'))
  },
  //  还款业务确认结清
  {
      path: '/wares/refundBusiness/certain',
      component: asyncComponent(() => import('container/wares/loanRepay/refundBusiness-certain'))
  },
  //  当月还款名单
  {
      path: '/wares/refundList',
      component: asyncComponent(() => import('container/wares/loanRepay/refundList'))
  },
  //  当月还款名单详情
  {
      path: '/wares/refundList/addedit',
      component: asyncComponent(() => import('container/wares/loanRepay/refundList-addedit'))
  },
  //  逾期名单
  {
      path: '/wares/overdueList',
      component: asyncComponent(() => import('container/wares/loanRepay/overdueList'))
  },
  //  逾期名单详情
  {
      path: '/wares/overdueList/addedit',
      component: asyncComponent(() => import('container/wares/loanRepay/overdueList-addedit'))
  },
  //  逾期处理
  {
      path: '/wares/overdueList/dispose',
      component: asyncComponent(() => import('container/wares/loanRepay/overdueList-dispose'))
  },
  //  绿名单
  {
      path: '/wares/greenList',
      component: asyncComponent(() => import('container/wares/loanRepay/greenList'))
  },
  //  绿名单详情
  {
      path: '/wares/greenList/addedit',
      component: asyncComponent(() => import('container/wares/loanRepay/greenList-addedit'))
  },
  //  绿名单 缴纳清收成本
  {
      path: '/wares/greenList/payment',
      component: asyncComponent(() => import('container/wares/loanRepay/greenList-payment'))
  },
  //  黑名单
  {
      path: '/wares/blackList',
      component: asyncComponent(() => import('container/wares/loanRepay/blackList'))
  },
  //  黑名单详情
  {
      path: '/wares/blackList/addedit',
      component: asyncComponent(() => import('container/wares/loanRepay/blackList-addedit'))
  },
  //  黑名单处理
  {
      path: '/wares/blackList/dispose',
      component: asyncComponent(() => import('container/wares/loanRepay/blackList-dispose'))
  },
  //  历史业务管理
  {
      path: '/wares/historyBusinessManage',
      component: asyncComponent(() => import('container/wares/loanRepay/historyBusinessManage'))
  },
  //  历史业务管理详情
  {
      path: '/wares/historyBusinessManage/addedit',
      component: asyncComponent(() => import('container/wares/loanRepay/historyBusinessManage-addedit'))
  },
  //  home公告列表
  {
      path: '/home/notices',
      component: asyncComponent(() => import('container/home/notices'))
  },
  //  home公告详情
  {
      path: '/home/noticeDetail',
      component: asyncComponent(() => import('container/home/notice-detail'))
  },
  //  home制度列表
  {
      path: '/home/regulations',
      component: asyncComponent(() => import('container/home/regulations'))
  },
  //  home制度详情
  {
      path: '/home/regulationDetail',
      component: asyncComponent(() => import('container/home/regulation-detail'))
  },
  //  历史业务管理
  {
      path: '/home/toDoList',
      component: asyncComponent(() => import('container/home/toDoList'))
  },
  //  征信单日志
  {
      path: '/circulationLog/creditBill',
      component: asyncComponent(() => import('container/circulationLog/creditBill/creditBill'))
  },
  //  征信单日志 详情
  {
      path: '/circulationLog/creditBill/addedit',
      component: asyncComponent(() => import('container/circulationLog/creditBill/creditBill-addedit'))
  },
  //  准入单日志
  {
      path: '/circulationLog/admittanceBill',
      component: asyncComponent(() => import('container/circulationLog/admittanceBill/admittanceBill'))
  },
  //  准入单日志 详情
  {
      path: '/circulationLog/admittanceBill/addedit',
      component: asyncComponent(() => import('container/circulationLog/admittanceBill/admittanceBill-addedit'))
  },
  //  贷后单日志
  {
      path: '/circulationLog/repayment',
      component: asyncComponent(() => import('container/circulationLog/repayment/repayment'))
  },
  //  贷后单日志 详情
  {
      path: '/circulationLog/repayment/addedit',
      component: asyncComponent(() => import('container/circulationLog/repayment/repayment-addedit'))
  }
];

export default ROUTES;
