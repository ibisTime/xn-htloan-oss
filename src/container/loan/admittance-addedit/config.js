// 金额的字段
export const amountFields = ['invoicePrice', 'originalPrice', 'firstAmount', 'loanAmount', 'monthDeposit',
  'teamFee', 'gpsFee', 'authFee', 'otherFee', 'monthIncome', 'enterpriseMonthOutput',
  'interest1', 'interest2', 'jourIncome', 'jourExpend', 'jourBalance', 'jourMonthIncome', 'jourMonthExpend',
  'zfbInterest1', 'zfbInterest2', 'zfbJourIncome', 'zfbJourExpend', 'zfbJourBalance', 'zfbJourMonthIncome', 'zfbJourMonthExpend',
  'wxInterest1', 'wxInterest2', 'wxJourIncome', 'wxJourExpend', 'wxJourBalance', 'wxJourMonthIncome', 'wxJourMonthExpend',
  'mateInterest1', 'mateInterest2', 'mateJourIncome', 'mateJourExpend', 'mateJourBalance', 'mateJourMonthIncome', 'mateJourMonthExpend',
  'mateZfbInterest1', 'mateZfbInterest2', 'mateZfbJourIncome', 'mateZfbJourExpend', 'mateZfbJourBalance', 'mateZfbJourMonthIncome', 'mateZfbJourMonthExpend',
  'mateWxInterest1', 'mateWxInterest2', 'mateWxJourIncome', 'mateWxJourExpend', 'mateWxJourBalance', 'mateWxJourMonthIncome', 'mateWxJourMonthExpend',
  'guaInterest1', 'guaInterest2', 'guaJourIncome', 'guaJourExpend', 'guaJourBalance', 'guaJourMonthIncome', 'guaJourMonthExpend',
  'guaZfbInterest1', 'guaZfbInterest2', 'guaZfbJourIncome', 'guaZfbJourExpend', 'guaZfbJourBalance', 'guaZfbJourMonthIncome', 'guaZfbJourMonthExpend',
  'guaWxInterest1', 'guaWxInterest2', 'guaWxJourIncome', 'guaWxJourExpend', 'guaWxJourBalance', 'guaWxJourMonthIncome', 'guaWxJourMonthExpend'];
// 日期区间的字段
export const rangeDateFields = [
  ['jourDatetime3', 'jourDatetimeStart', 'jourDatetimeEnd'],
  ['jourDatetime1', 'zfbJourDatetimeStart', 'zfbJourDatetimeEnd'],
  ['jourDatetime2', 'wxJourDatetimeStart', 'wxJourDatetimeEnd'],
  ['jourDatetime6', 'mateJourDatetimeStart', 'mateJourDatetimeEnd'],
  ['jourDatetime4', 'mateZfbJourDatetimeStart', 'mateZfbJourDatetimeEnd'],
  ['jourDatetime5', 'mateWxJourDatetimeStart', 'mateWxJourDatetimeEnd'],
  ['jourDatetime9', 'guaJourDatetimeStart', 'guaJourDatetimeEnd'],
  ['jourDatetime7', 'guaZfbJourDatetimeStart', 'guaZfbJourDatetimeEnd'],
  ['jourDatetime8', 'guaWxJourDatetimeStart', 'guaWxJourDatetimeEnd']
];
// 申请人银行流水
export const sqryhls = ['jourDatetime3', 'jourDatetimeStart',
  'jourDatetimeEnd', 'jourInterest1', 'jourInterest2', 'interest1',
  'interest2', 'jourIncome', 'jourExpend', 'jourBalance',
  'jourMonthIncome', 'jourMonthExpend', 'jourRemark', 'jourPic'];
// 消息
export const dbxx = ['jourDatetime3', 'jourDatetimeStart',
  'jourDatetimeEnd', 'jourInterest1', 'jourInterest2', 'interest1',
  'interest2', 'jourIncome', 'jourExpend', 'jourBalance',
  'jourMonthIncome', 'jourMonthExpend', 'jourRemark', 'jourPic'];
// 申请人支付宝流水
export const sqrzfbls = ['jourDatetime1', 'zfbJourDatetimeStart',
  'zfbJourDatetimeEnd', 'zfbJourInterest1', 'zfbJourInterest2', 'zfbInterest1',
  'zfbInterest2', 'zfbJourIncome', 'zfbJourExpend', 'zfbJourBalance',
  'zfbJourMonthIncome', 'zfbJourMonthExpend', 'zfbJourRemark', 'zfbJourPic'];
// 申请人微信流水
export const sqrwxls = ['jourDatetime2', 'wxJourDatetimeStart',
  'wxJourDatetimeEnd', 'wxJourInterest1', 'wxJourInterest2', 'wxInterest1',
  'wxInterest2', 'wxJourIncome', 'wxJourExpend', 'wxJourBalance',
  'wxJourMonthIncome', 'wxJourMonthExpend', 'wxJourRemark', 'wxJourPic'];
// 配偶银行流水
export const poyhls = ['jourDatetime6', 'mateJourDatetimeStart',
  'mateJourDatetimeEnd', 'mateJourInterest1', 'mateJourInterest2', 'mateInterest1',
  'mateInterest2', 'mateJourIncome', 'mateJourExpend', 'mateJourBalance',
  'mateJourMonthIncome', 'mateJourMonthExpend', 'mateJourRemark', 'mateJourPic'];
// 配偶支付宝流水
export const pozfbls = ['jourDatetime4', 'mateZfbJourDatetimeStart',
  'mateZfbJourDatetimeEnd', 'mateZfbJourInterest1', 'mateZfbJourInterest2', 'mateZfbInterest1',
  'mateZfbInterest2', 'mateZfbJourIncome', 'mateZfbJourExpend', 'mateZfbJourBalance',
  'mateZfbJourMonthIncome', 'mateZfbJourMonthExpend', 'mateZfbJourRemark', 'mateZfbJourPic'];
// 配偶微信流水
export const powxls = ['jourDatetime5', 'mateWxJourDatetimeStart',
  'mateWxJourDatetimeEnd', 'mateWxJourInterest1', 'mateWxJourInterest2', 'mateWxInterest1',
  'mateWxInterest2', 'mateWxJourIncome', 'mateWxJourExpend', 'mateWxJourBalance',
  'mateWxJourMonthIncome', 'mateWxJourMonthExpend', 'mateWxJourRemark', 'mateWxJourPic'];
// 担保人银行流水
export const dbryhls = ['jourDatetime9', 'guaJourDatetimeStart',
  'guaJourDatetimeEnd', 'guaJourInterest1', 'guaJourInterest2', 'guaInterest1',
  'guaInterest2', 'guaJourIncome', 'guaJourExpend', 'guaJourBalance',
  'guaJourMonthIncome', 'guaJourMonthExpend', 'guaJourRemark', 'guaJourPic'];
// 担保人支付宝流水
export const dbrzfbls = ['jourDatetime7', 'guaZfbJourDatetimeStart',
  'guaZfbJourDatetimeEnd', 'guaZfbJourInterest1', 'guaZfbJourInterest2', 'guaZfbInterest1',
  'guaZfbInterest2', 'guaZfbJourIncome', 'guaZfbJourExpend', 'guaZfbJourBalance',
  'guaZfbJourMonthIncome', 'guaZfbJourMonthExpend', 'guaZfbJourRemark', 'guaZfbJourPic'];
// 担保人微信流水
export const dbrwxls = ['jourDatetime8', 'guaWxJourDatetimeStart',
  'guaWxJourDatetimeEnd', 'guaWxJourInterest1', 'guaWxJourInterest2', 'guaWxInterest1',
  'guaWxInterest2', 'guaWxJourIncome', 'guaWxJourExpend', 'guaWxJourBalance',
  'guaWxJourMonthIncome', 'guaWxJourMonthExpend', 'guaWxJourRemark', 'guaWxJourPic'];
// 每一步的校验
export const checkFieldsMap = {
  '0': [
    [
      'loanBankName', 'periods', 'bankRate', 'loanAmount', 'loanProductCode',
      'monthDeposit', 'gpsFee', 'authFee', 'teamFee', 'otherFee', 'invoicePrice',
      'sfAmount', 'sfRate', 'isAdvanceFund', 'isFinacing', 'isAzGps',
      'isPlatInsure'
    ],
    ['loanAmount', 'monthDeposit', 'gpsFee', 'authFee', 'teamFee', 'otherFee',
    'invoicePrice', 'sfAmount']
  ],
  '1': [
    [
      'bizType', 'vehicleCompanyName', 'invoiceCompany', 'carType', 'carBrand',
      'carSeries', 'carModel', 'carColor', 'carFrameNo', 'carEngineNo',
      'originalPrice', 'region', 'carDealerSubsidy', 'oilSubsidyKil', 'oilSubsidy',
      'settleAddress', 'carPic', 'carHgzPic'
    ],
    ['originalPrice', 'carDealerSubsidy', 'oilSubsidy']
  ],
  '7': [
    [
      'pledgeUser', 'pledgeUserIdCard', 'pledgeUserIdCardFront', 'pledgeUserIdCardReverse',
      'pledgeAddress'
    ],
    []
  ],
  '2': [
    [
      'applyUserName', 'mobile', 'idNo', 'gender', 'age', 'nation', 'political',
      'education', 'workProfession', 'postTitle', 'isDriceLicense', 'carTypeNow',
      'mainIncome', 'otherIncomeNote', 'isHouseProperty', 'emergencyName1',
      'emergencyRelation1', 'emergencyMobile1', 'emergencyName2',
      'emergencyRelation2', 'emergencyMobile2', 'englishName', 'authref', 'statdate', 'emergencySex1', 'emergencySex2'
    ],
    []
  ],
  '3': [
    [
      'marryState', 'familyNumber', 'familyPhone', 'familyMainAsset', 'mainAssetInclude',
      'birthAddressProvinceAll', 'birthAddress', 'birthPostCode', 'nowHouseType',
      'nowAddressProvinceAll', 'nowAddress', 'nowPostCode', 'hkBookPdf', 'houseContract',
      'houseInvoice', 'liveProvePdf', 'buildProvePdf', 'housePictureApply',
      'marryPdf', 'nowAddressDate'
    ],
    ['familyMainAsset']
  ],
  '4': [
    [
      'workBelongIndustry', 'workCompanyProperty', 'companyName', 'companyContactNo',
      'companyAddress', 'employeeQuantity', 'enterpriseMonthOutput', 'workDatetime',
      'position', 'monthIncome', 'otherWorkNote', 'improvePdf', 'frontTablePic',
      'workPlacePic', 'salerAndcustomer', 'companyAddressProvince'
    ],
    ['monthIncome']
  ],
  '5': [
    [
      'mateName', 'mateRelation', 'mateMobile', 'mateIdNo', 'mateEducation',
      'mateBirthAddressProvince', 'mateBirthAddress', 'matePostCode',
      'mateCompanyName', 'mateCompanyAddress', 'mateCompanyContactNo',
      'mateAssetPdf'
    ],
    []
  ],
  '6': [
    [
      'userName', 'guaRelation', 'guaMobile', 'guaIdNo', 'guaEducation',
      'guaBirthAddressProvince', 'guaBirthAddress', 'guaPostCode',
      'guaCompanyName', 'guaCompanyAddress', 'guaCompanyContactNo',
      'guaAssetPdf'
    ],
    []
  ]
};
