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
    path: '/system/sysPara',
    component: asyncComponent(() => import('container/security/sysParam/sysParam'))
  },
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
    path: '/biz/MemberInquiries',
    component: asyncComponent(() => import('container/biz/administration/MemberInquiries'))
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
  {
    path: '/biz/carShape',
    component: asyncComponent(() => import('container/biz/carSale/carShape'))
  },
  {
    path: '/biz/carShape/addedit',
    component: asyncComponent(() => import('container/biz/carSale/carShape-addedit'))
  },
  {
    path: '/biz/handleApply',
    component: asyncComponent(() => import('container/biz/carSale/handleApply'))
  },
  {
    path: '/biz/memberInquiries/addedit',
    component: asyncComponent(() => import('container/biz/administration/memberInquiries-addedit'))
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
  //  历史业务管理
  {
    path: '/biz/historyBusinessManage',
    component: asyncComponent(() => import('container/biz/carLoanRepay/historyBusinessManage'))
  },
  //  历史业务管理详情
  {
    path: '/biz/historyBusinessManage',
    component: asyncComponent(() => import('container/biz/carLoanRepay/historyBusinessManage-addedit'))
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
  //  积分规则
  {
    path: '/integral/integralexchange',
    component: asyncComponent(() => import('container/integral/integralexchange/integralexchange'))
  },
  //  积分规则修改
  {
    path: '/integral/integralexchange/addedit',
    component: asyncComponent(() => import('container/integral/integralexchange/integralexchange-addedit'))
  }
];

export default ROUTES;
