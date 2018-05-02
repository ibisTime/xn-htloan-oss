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
    path: '/security/role',
    component: asyncComponent(() => import('container/security/role/role'))
  },
  {
    path: '/security/role/addedit',
    component: asyncComponent(() => import('container/security/role-addedit/role-addedit'))
  },
  {
    path: '/security/role/menu',
    component: asyncComponent(() => import('container/security/role-menu/role-menu'))
  },
  {
    path: '/security/menu',
    component: asyncComponent(() => import('container/security/menu/menu'))
  },
  {
    path: '/security/menu/addedit',
    component: asyncComponent(() => import('container/security/menu-addedit/menu-addedit'))
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
    path: '/biz/memberInquiries',
    component: asyncComponent(() => import('container/biz/administration/memberInquiries'))
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
    path: '/biz/carLoanBusiness',
    component: asyncComponent(() => import('container/biz/carLoanRepay/carLoanBusiness'))
  },
  {
    path: '/biz/memberInquiries/addedit',
    component: asyncComponent(() => import('container/biz/administration/memberInquiries-addedit'))
  },
  {
    path: '/wares/category',
    component: asyncComponent(() => import('container/wares/category/category'))
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

  {
    path: '/finance/breakBalance',
    component: asyncComponent(() => import('container/finance/account/account'))
  },
  {
    path: '/finance/breakBalance/ledger',
    component: asyncComponent(() => import('container/finance/ledger/ledger'))
  },
  {
    path: '/finance/breakBalance/ledger/addedit',
    component: asyncComponent(() => import('container/finance/ledger-addedit/ledger-addedit'))
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
    path: '/finance/diviAddress',
    component: asyncComponent(() => import('container/finance/dist-addr/dist-addr'))
  },
  {
    path: '/finance/diviAddress/ledger',
    component: asyncComponent(() => import('container/finance/dist-addr-ledger/dist-addr-ledger'))
  },
// demo
  {
    path: '/demo/credit/addedit',
    component: asyncComponent(() => import('container/demo/credit-addedit'))
  }
];

export default ROUTES;
