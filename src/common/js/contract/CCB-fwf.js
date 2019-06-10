import { getWorkbook } from 'common/js/xlsx-util';
import { moneyFormat, moneyFormat2, moneyReplaceComma, keepTwoDecimalFull } from 'common/js/util';
let B11 = 0;
let B20 = 0;
let B26 = 0;
let B42 = 0;
let B43 = 0;
let B44 = 0;
let B46 = 0;
export function exportCCBFwf(data) {
  B42 = moneyReplaceComma(moneyFormat(data.invoicePrice));
  B43 = moneyReplaceComma(moneyFormat(data.loanAmount));
  B46 = moneyReplaceComma(moneyFormat(data.fee));
  B20 = B42;
  B44 = B43;
  B11 = B43 + B46;
  B26 = B42 - B43;
  const wb = getWorkbook();
  createData(wb, data);
  createZxfqsq(wb);
  createZxKfqbb(wb);
  createZxKfqbbPo(wb);
  createZxTybzx(wb);
  createZxTybzxPo(wb);
  createZxTybzxDbr(wb);
  createGthkcns(wb);
  createGthkcnsDbr(wb);
  createZjht(wb);
  createDbfqfwxy(wb);
  createZfpz(wb);
  createSqwts(wb);
  createSksj(wb);
  createSt1(wb);
  createSt2(wb);
  createSt3(wb);
  createXht1(wb);
  createXht6(wb);
  createXht11(wb);
  createXht12(wb);
  createXht13(wb);
  createDkqrs(wb);
  createKhzl(wb);
  // download
  wb.downloadXls('建设银行-服务费');
}
// 数据
function createData(wb, data) {
  let arr = [
    ['龙卡信用卡持卡人（甲方）', data.customerName],
    ['身份证件号码', data.idNo],
    ['住所', data.applyNowAddress],
    ['邮政编码', data.postcode],
    ['手机电话', data.mobile],
    ['配偶姓名', data.ghRealName],
    ['身份证件号码（配偶）', data.ghIdNo],
    ['电话（配偶）', data.ghMobile],
    ['贷款额（大写）', ''],
    ['贷款额（小写）', moneyReplaceComma(moneyFormat2(data.loanAmount))],
    ['总贷款额（无元）', ''],
    ['车型', data.carBrand],
    ['分期', data.loanPeriods],
    ['总手续费（大同）', ''],
    ['每期手续费（大写）', ''],
    ['品牌型号', data.carBrand + ' ' + data.carModel],
    ['车辆颜色', data.carColor],
    ['车架号码', data.frameNo],
    ['发动机号码', data.engineNo],
    ['汽车发票价(带元)', moneyReplaceComma(moneyFormat2(data.invoicePrice)) + '元'],
    ['汽车发票价(大写元整)', ''],
    ['工作单位', data.applyUserCompany],
    ['汽车经销商名称', data.carDealerName],
    ['汽车经销商（联系电话）', '汽车经销商（联系电话）'],
    ['首付金额', ''],
    ['首付金额（无元）', ''],
    ['首付金额（大写）', ''],
    ['每期手续费（小写）', ''],
    ['承保公司', data.insuranceCompany],
    ['客户具体情况说明', ''],
    ['年限', ''],
    ['期限', ''],
    ['职务', data.applyUserDuty],
    ['月费率', ''],
    ['车辆型号', data.carModel],
    ['担保人姓名', data.guarantor1Name],
    ['担保人身份证', data.guarantor1IdNo],
    ['担保人电话', data.guarantor1Mobile],
    ['担保人单位', data.guarantorCompanyName],
    ['担保人住址', data.guarantorNowAddress],
    ['开票日期', '开票日期'],
    ['汽车发票价', moneyFormat2(data.invoicePrice)],
    ['贷款额（小写）', moneyFormat2(data.loanAmount)],
    ['贷款额（带元）', moneyReplaceComma(moneyFormat2(data.loanAmount)) + '元'],
    ['贷款额（大写）', ''],
    ['服务费', moneyFormat2(data.fee)],
    ['担保费', '担保费'],
    ['银行利率', data.bankRate],
    ['', ''],
    ['', ''],
    ['建行名称', data.loanBankName],
    ['建行地址', '建行地址'],
    ['建行电话', '建行电话'],
    ['', '']
  ];
  var ws = wb.getSheet(arr, '数据');
  ws['!cols'] = [{
    wch: 27.5
  }, {
    wch: 47.88
  }];
  ws['!rows'] = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 15.75, hpx: 15.75},
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 48.75, hpx: 48.75}
  ];
  ws['B9'].f = 'IF(INT(B43+B46)*100=(B43+B46)*100,TEXT(INT(B43+B46),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B43+B46*10)=(B43+B46)*10,TEXT(INT(B43+B46),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT((B43+B46)*10-INT(B43+B46)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B43+B46),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT((B43+B46)*10)=INT(B43+B46)*10,"零",TEXT(RIGHT(INT((B43+B46)*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT((B43+B46)*100),"[$-0804][DBNum2]G/通用格式")&"分"))&"整"';
  ws['B10'].f = 'B43+B46&"元"';
  ws['B11'].f = 'B43+B46';
  ws['B14'].f = 'IF(INT(ROUND(B11*B48/100,2))*100=ROUND(B11*B48/100,2)*100,TEXT(INT(ROUND(B11*B48/100,2)),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(ROUND(B11*B48/100,2)*10)=ROUND(B11*B48/100,2)*10,TEXT(INT(ROUND(B11*B48/100,2)),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(ROUND(B11*B48/100,2)*10-INT(ROUND(B11*B48/100,2))*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(ROUND(B11*B48/100,2)),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(ROUND(B11*B48/100,2)*10)=INT(ROUND(B11*B48/100,2))*10,"零",TEXT(RIGHT(INT(ROUND(B11*B48/100,2)*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(ROUND(B11*B48/100,2)*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
  ws['B15'].f = 'IF(INT(ROUND(B11*B48/100/B13,2))*100=ROUND(B11*B48/100/B13,2)*100,TEXT(INT(ROUND(B11*B48/100/B13,2)),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(ROUND(B11*B48/100/B13,2)*10)=ROUND(B11*B48/100/B13,2)*10,TEXT(INT(ROUND(B11*B48/100/B13,2)),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(ROUND(B11*B48/100/B13,2)*10-INT(ROUND(B11*B48/100/B13,2))*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(ROUND(B11*B48/100/B13,2)),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(ROUND(B11*B48/100/B13,2)*10)=INT(ROUND(B11*B48/100/B13,2))*10,"零",TEXT(RIGHT(INT(ROUND(B11*B48/100/B13,2)*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(ROUND(B11*B48/100/B13,2)*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
  // ws['B20'].f = 'B42&"元"';
  ws['B21'].f = 'IF(INT(B42)*100=B42*100,TEXT(INT(B42),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B42*10)=B42*10,TEXT(INT(B42),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B42*10-INT(B42)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B42),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B42*10)=INT(B42)*10,"零",TEXT(RIGHT(INT(B42*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B42*100),"[$-0804][DBNum2]G/通用格式")&"分"))&"整"';
  ws['B25'].f = 'B42-B43&"元"';
  ws['B26'].f = 'B42-B43';
  ws['B27'].f = 'IF(INT(B42-B43)*100=(B42-B43)*100,TEXT(INT(B42-B43),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B43+B46*10)=(B42-B43)*10,TEXT(INT(B42-B43),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT((B42-B43)*10-INT(B42-B43)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B42-B43),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT((B42-B43)*10)=INT(B42-B43)*10,"零",TEXT(RIGHT(INT((B42-B43)*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT((B42-B43)*100),"[$-0804][DBNum2]G/通用格式")&"分"))&"整"';
  ws['B28'].f = '"¥"&TEXT((B11*B48/B13/100),"0.00")';
  ws['B30'].f = 'B1&","&IF(MOD(MID(B2,17,1),2),"男","女")&","&IF(LEN(B6)>=2,"已婚",IF(B6=" ","离婚","未婚"))&","&"现居住于"&B3&","&"就业于"&B22&","&"现购自备车壹辆，主要行驶于温州区域。"';
  ws['B31'].f = 'B13/12&"年"';
  ws['B32'].f = 'IF(B13/12=3,"叁",IF(B13/12=2,"贰",IF(B13/12=1.5,"一年半",IF(B13/12=1,"壹","数据错误"))))';
  ws['B34'].f = 'B48/100/B13*100&"%"';
  // ws['B44'].f = 'B43&"元"';
  ws['B45'].f = 'IF(INT(B43)*100=B43*100,TEXT(INT(B43),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B43*10)=B43*10,TEXT(INT(B43),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B43*10-INT(B43)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B43),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B43*10)=INT(B43)*10,"零",TEXT(RIGHT(INT(B43*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B43*100),"[$-0804][DBNum2]G/通用格式")&"分"))&"整"';

  ws['A24'].s = {font: {color: {rgb: 'FF0000'}}};
  ws['A28'].s = {font: {color: {rgb: 'FF0000'}}};
  ws['A42'].s = {font: {color: {rgb: 'FF0000'}}};
  ws['A43'].s = {font: {color: {rgb: 'FF0000'}}};
  ws['A44'].s = {font: {color: {rgb: 'FF0000'}}};
  ws['A45'].s = {font: {color: {rgb: 'FF0000'}}};
  ws['A46'].s = {font: {color: {rgb: 'FF0000'}}};
  ws['A47'].s = {font: {color: {rgb: 'FF0000'}}};
  ws['A48'].s = {font: {color: {rgb: '0066CC'}}};
  ws['B20'].s = {font: {color: {rgb: 'FF0000'}}};
  ws['B24'].s = {font: {color: {rgb: 'FF0000'}}};
  ws['B25'].s = {font: {color: {rgb: 'FF0000'}}};
  ws['B28'].s = {font: {color: {rgb: 'FF0000'}}};
  ws['B42'].s = {font: {color: {rgb: 'FF0000'}}};
  ws['B43'].s = {font: {color: {rgb: 'FF0000'}}};
  ws['B44'].s = {font: {color: {rgb: 'FF0000'}}};
  ws['B45'].s = {font: {color: {rgb: 'FF0000'}}};
  ws['B46'].s = {font: {color: {rgb: 'FF0000'}}};
  ws['B47'].s = {font: {color: {rgb: 'FF0000'}}};
  ws['B48'].s = {font: {color: {rgb: '0066CC'}}};
  ws['A28'].s = {fill: {fgColor: {rgb: 'CCCCFF'}}};
  ws['A50'].s = {fill: {fgColor: {rgb: 'CCCCFF'}}};
  ws['A51'].s = {fill: {fgColor: {rgb: 'CCCCFF'}}};
  ws['A52'].s = {fill: {fgColor: {rgb: 'CCCCFF'}}};
  ws['A53'].s = {fill: {fgColor: {rgb: 'CCCCFF'}}};
  ws['A54'].s = {fill: {fgColor: {rgb: 'CCCCFF'}}};
  ws['B50'].s = {fill: {fgColor: {rgb: 'CCCCFF'}}};
  ws['B52'].s = {fill: {fgColor: {rgb: 'CCCCFF'}}};
  ws['B53'].s = {fill: {fgColor: {rgb: 'CCCCFF'}}};
  ws['B54'].s = {fill: {fgColor: {rgb: 'CCCCFF'}}};
  ws['B11'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['B26'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['B28'].s = {fill: {fgColor: {rgb: 'CCCCFF'}}, font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['B30'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center', wrapText: true}};
  ws['B34'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
}
// 最新分期申请
function createZxfqsq(wb) {
  var ws = getSheet(wb, 48, 8, '最新分期申请');
  ws['!merges'] = [{
    e: {c: 7, r: 10},
    s: {c: 3, r: 10}
  }, {
    e: {c: 3, r: 16},
    s: {c: 1, r: 16}
  }, {
    e: {c: 4, r: 18},
    s: {c: 3, r: 18}
  }, {
    e: {c: 4, r: 20},
    s: {c: 1, r: 20}
  }, {
    e: {c: 4, r: 8},
    s: {c: 2, r: 8}
  }, {
    e: {c: 1, r: 9},
    s: {c: 0, r: 9}
  }, {
    e: {c: 3, r: 9},
    s: {c: 2, r: 9}
  }, {
    e: {c: 7, r: 9},
    s: {c: 5, r: 9}
  }, {
    e: {c: 7, r: 33},
    s: {c: 6, r: 33}
  }, {
    e: {c: 2, r: 25},
    s: {c: 1, r: 25}
  }, {
    e: {c: 2, r: 26},
    s: {c: 1, r: 26}
  }, {
    e: {c: 2, r: 29},
    s: {c: 1, r: 29}
  }, {
    e: {c: 5, r: 29},
    s: {c: 4, r: 29}
  }, {
    e: {c: 2, r: 31},
    s: {c: 1, r: 31}
  }, {
    e: {c: 2, r: 33},
    s: {c: 1, r: 33}
  }, {
    e: {c: 6, r: 25},
    s: {c: 5, r: 25}
  }, {
    e: {c: 6, r: 26},
    s: {c: 5, r: 26}
  }];
  ws['!cols'] = [
    {wch: 11},
    {wch: 9.88},
    {wch: 9.63},
    {wch: 4.13},
    {wch: 9.63},
    {wch: 8.88},
    {wch: 11},
    {wch: 11.75}
  ];
  ws['!rows'] = [
    null,
    null,
    null,
    {hpt: 4.5, hpx: 4.5},
    {hpt: 35.25, hpx: 35.25},
    {hidden: true},
    {hidden: true},
    {hpt: 7.5, hpx: 7.5},
    {hpt: 26.25, hpx: 26.25},
    {hpt: 18, hpx: 18},
    {hpt: 16.5, hpx: 16.5},
    null,
    {hpt: 43.5, hpx: 43.5},
    {hpt: 3.75, hpx: 3.75},
    {hidden: true, hpt: 9, hpx: 9},
    {hidden: true, hpt: 0.75, hpx: 0.75},
    {hpt: 17.25, hpx: 17.25},
    {hpt: 9.75, hpx: 9.75},
    {hpt: 20.25, hpx: 20.25},
    {hpt: 22.5, hpx: 22.5},
    {hpt: 20.25, hpx: 20.25},
    {hpt: 7.5, hpx: 7.5},
    {hpt: 16.5, hpx: 16.5},
    {hpt: 8.25, hpx: 8.25},
    {hpt: 6, hpx: 6},
    {hpt: 22.5, hpx: 22.5},
    {hpt: 20.25, hpx: 20.25},
    {hpt: 21, hpx: 21},
    {hpt: 8.25, hpx: 8.25},
    null,
    {hpt: 6.75, hpx: 6.75},
    {hpt: 15.75, hpx: 15.75},
    {hpt: 15.75, hpx: 15.75},
    {hpt: 18.75, hpx: 18.75}
  ];
  ws['A9'] = {v: ' ', t: 's', w: ' '};
  ws['A10'].f = '数据!B5';
  ws['A30'] = {v: ' ', t: 's', w: ' '};
  ws['B9'].f = '数据!B1';
  ws['B11'] = {v: '身份证', t: 's', w: '身份证'};
  ws['B21'].f = '数据!B23';
  ws['B26'].f = '数据!B12';
  ws['B27'] = {v: moneyFormat2(B20 * 1000) + '元', t: 's', w: moneyFormat2(B20 * 1000) + '元'};
  ws['B30'].f = '数据!B10';
  ws['B32'] = {v: moneyReplaceComma(moneyFormat2(B44 * 1000)) + '元', t: 's', w: moneyReplaceComma(moneyFormat2(B44 * 1000)) + '元'};
  ws['B34'].f = '数据!B34';
  ws['C9'].f = '数据!B22';
  ws['C19'] = {v: 86508880, t: 's', w: '86508880'};
  ws['C23'].f = '数据!B24';
  ws['D19'] = {v: '金晶晶', t: 's', w: '金晶晶'};
  ws['D30'] = {v: ' ', t: 's', w: ' '};
  ws['E10'] = {v: ' ', t: 's', w: ' '};
  ws['E30'].f = '数据!B9';
  ws['F10'].f = '数据!B3';
  ws['F26'].f = '数据!B35';
  ws['F27'].f = '数据!B25';
  ws['F32'].f = '数据!B46';
  ws['F33'].f = '数据!B13';
  ws['G9'].f = '数据!B33';
  ws['G34'].f = '数据!B28';
  ws['H19'] = {v: 86508880, t: 's', w: '86508880'};
  ws['I29'] = {v: ' ', t: 's', w: ' '};

  ws['A9'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['A10'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['A30'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['B9'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['B11'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['B21'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['B26'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['B27'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['B30'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['B32'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['B34'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['C9'].s = {font: {sz: 9}, alignment: {horizontal: 'left', vertical: 'center', wrapText: true}};
  ws['C19'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['C23'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['D19'].s = {font: {sz: 10, color: {rgb: '00CCFF'}}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['D30'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['E10'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'top'}};
  ws['E30'].s = {font: {sz: 8}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['F10'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'center', wrapText: true}};
  ws['F26'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['F27'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['F32'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['F33'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['G9'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['G34'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['H19'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['I29'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
}
// 资信-开发区版本
function createZxKfqbb(wb) {
  var ws = getSheet(wb, 48, 8, '资信-开发区版本');
  ws['!merges'] = [{
    e: {c: 4, r: 4},
    s: {c: 2, r: 4}
  }, {
    e: {c: 2, r: 9},
    s: {c: 0, r: 9}
  }, {
    e: {c: 5, r: 34},
    s: {c: 3, r: 34}
  }];
  ws['!cols'] = [
    {wch: 10.38},
    {wch: 9.25},
    {wch: 6.63},
    {wch: 5.25},
    {wch: 8.38},
    {wch: 5.88},
    {wch: 8.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    {hpt: 33.75, hpx: 33.75},
    {hpt: 11.25, hpx: 11.25},
    {hpt: 6.75, hpx: 6.75},
    {hpt: 9, hpx: 9},
    {hpt: 14.25, hpx: 14.25},
    {hidden: true},
    null,
    {hpt: 13.5, hpx: 13.5},
    {hidden: true, hpt: 0.75, hpx: 0.75}
  ];
  ws['C23'] = {v: '                  ', t: 's', w: ' '};
  ws['A35'] = {v: '身份证', t: 's', w: '身份证'};
  ws['D35'].f = '数据!B2';

  ws['C23'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['A35'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['D35'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'center'}};
}
// 资信-开发区版本（配偶）
function createZxKfqbbPo(wb) {
  var ws = getSheet(wb, 48, 8, '资信-开发区版本（配偶）');
  ws['!merges'] = [{
    e: {c: 4, r: 4},
    s: {c: 2, r: 4}
  }, {
    e: {c: 2, r: 9},
    s: {c: 0, r: 9}
  }, {
    e: {c: 5, r: 34},
    s: {c: 3, r: 34}
  }];
  ws['!cols'] = [
    {wch: 10.38},
    {wch: 9.25},
    {wch: 6.63},
    {wch: 5.25},
    {wch: 8.38},
    {wch: 5.88},
    {wch: 8.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    {hpt: 33.75, hpx: 33.75},
    {hpt: 11.25, hpx: 11.25},
    {hpt: 6.75, hpx: 6.75},
    {hpt: 9, hpx: 9},
    {hpt: 14.25, hpx: 14.25},
    {hidden: true},
    null,
    {hpt: 13.5, hpx: 13.5},
    {hidden: true, hpt: 0.75, hpx: 0.75}
  ];
  ws['A35'] = {v: '身份证', t: 's', w: '身份证'};
  ws['D35'].f = '数据!B7';

  ws['A35'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['D35'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'center'}};
}
// 资信-通用版最新
function createZxTybzx(wb) {
  var ws = getSheet(wb, 48, 8, '资信-通用版最新');
  ws['!merges'] = [{
    e: {c: 4, r: 6},
    s: {c: 2, r: 6}
  }, {
    e: {c: 2, r: 9},
    s: {c: 0, r: 9}
  }, {
    e: {c: 5, r: 37},
    s: {c: 3, r: 37}
  }];
  ws['!cols'] = [
    {wch: 10.38},
    {wch: 9.25},
    {wch: 6.63},
    {wch: 5.25},
    {wch: 8.38},
    {wch: 5.88},
    {wch: 8.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    {hpt: 33.75, hpx: 33.75},
    {hpt: 11.25, hpx: 11.25},
    {hpt: 6.75, hpx: 6.75},
    {hpt: 9, hpx: 9},
    {hpt: 14.25, hpx: 14.25},
    {hidden: true},
    null,
    {hpt: 13.5, hpx: 13.5},
    {hidden: true, hpt: 0.75, hpx: 0.75},
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 18, hpx: 18}
  ];
  ws['C7'].f = 'LEFT(数据!B51,FIND("支行",数据!B51)-1)';
  ws['C38'] = {v: '身份证', t: 's', w: '身份证'};
  ws['D38'].f = '数据!B2';

  ws['C7'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['C38'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['D38'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
}
// 资信-通用版最新(配偶)
function createZxTybzxPo(wb) {
  var ws = getSheet(wb, 48, 8, '资信-通用版最新(配偶)');
  ws['!merges'] = [{
    e: {c: 4, r: 6},
    s: {c: 2, r: 6}
  }, {
    e: {c: 2, r: 9},
    s: {c: 0, r: 9}
  }, {
    e: {c: 5, r: 34},
    s: {c: 3, r: 34}
  }];
  ws['!cols'] = [
    {wch: 10.38},
    {wch: 9.25},
    {wch: 6.63},
    {wch: 5.25},
    {wch: 8.38},
    {wch: 5.88},
    {wch: 8.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    {hpt: 33.75, hpx: 33.75},
    {hpt: 11.25, hpx: 11.25},
    {hpt: 6.75, hpx: 6.75},
    {hpt: 9, hpx: 9},
    {hpt: 14.25, hpx: 14.25},
    {hidden: true},
    null,
    {hpt: 13.5, hpx: 13.5},
    {hidden: true, hpt: 0.75, hpx: 0.75},
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 18, hpx: 18}
  ];
  ws['C7'].f = 'LEFT(数据!B51,FIND("支行",数据!B51)-1)';
  ws['C38'] = {v: '身份证', t: 's', w: '身份证'};
  ws['D38'].f = '数据!B7';

  ws['C7'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['C38'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['D38'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
}
// 资信-通用版最新(担保人)
function createZxTybzxDbr(wb) {
  var ws = getSheet(wb, 48, 8, '资信-通用版最新(担保人)');
  ws['!merges'] = [{
    e: {c: 4, r: 6},
    s: {c: 2, r: 6}
  }, {
    e: {c: 2, r: 9},
    s: {c: 0, r: 9}
  }, {
    e: {c: 5, r: 34},
    s: {c: 3, r: 34}
  }];
  ws['!cols'] = [
    {wch: 10.38},
    {wch: 9.25},
    {wch: 6.63},
    {wch: 5.25},
    {wch: 8.38},
    {wch: 5.88},
    {wch: 8.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    {hpt: 33.75, hpx: 33.75},
    {hpt: 11.25, hpx: 11.25},
    {hpt: 6.75, hpx: 6.75},
    {hpt: 9, hpx: 9},
    {hpt: 14.25, hpx: 14.25},
    {hidden: true},
    null,
    {hpt: 13.5, hpx: 13.5},
    {hidden: true, hpt: 0.75, hpx: 0.75},
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 18, hpx: 18}
  ];
  ws['C7'].f = 'LEFT(数据!B51,FIND("支行",数据!B51)-1)';
  ws['C38'] = {v: '身份证', t: 's', w: '身份证'};
  ws['D38'].f = '数据!B37';

  ws['C7'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['C38'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['D38'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
}
// 共同还款承诺书
function createGthkcns(wb) {
  var ws = getSheet(wb, 48, 8, '共同还款承诺书');
  ws['!merges'] = [{
    e: {c: 7, r: 1},
    s: {c: 4, r: 1}
  }, {
    e: {c: 3, r: 28},
    s: {c: 1, r: 28}
  }, {
    e: {c: 3, r: 30},
    s: {c: 1, r: 30}
  }, {
    e: {c: 4, r: 32},
    s: {c: 1, r: 32}
  }];
  ws['!cols'] = [
    {wch: 13.75},
    {wch: 7.75},
    {wch: 10.13},
    {wch: 7.5},
    {wch: 9},
    {wch: 5.25},
    {wch: 8.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    {hpt: 42, hpx: 42},
    {hpt: 15, hpx: 15},
    {hpt: 6.75, hpx: 6.75},
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 27, hpx: 27},
    null,
    null,
    null,
    null,
    {hpt: 18.75, hpx: 18.75},
    {hpt: 20.25, hpx: 20.25},
    {hpt: 4.5, hpx: 4.5},
    {hpt: 20.25, hpx: 20.25},
    {hpt: 9, hpx: 9},
    {hpt: 16.5, hpx: 16.5},
    {hpt: 3, hpx: 3},
    {hpt: 21, hpx: 21},
    {hpt: 6, hpx: 6},
    {hpt: 16.5, hpx: 16.5}
  ];
  ws['A4'] = {v: '夫妻', t: 's', w: '夫妻'};
  ws['B29'].f = '数据!B7';
  ws['B31'].f = '数据!B8';
  ws['C2'].f = '数据!B1';
  ws['E2'].f = '数据!B2';
  ws['E4'] = {v: '购车', t: 's', w: '购车'};

  ws['A4'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['B29'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['B31'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['C2'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['E2'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['E4'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
}
// 共同还款承诺书(担保人)
function createGthkcnsDbr(wb) {
  var ws = getSheet(wb, 48, 8, '共同还款承诺书(担保人)');
  ws['!merges'] = [{
    e: {c: 7, r: 1},
    s: {c: 4, r: 1}
  }, {
    e: {c: 3, r: 28},
    s: {c: 1, r: 28}
  }, {
    e: {c: 3, r: 30},
    s: {c: 1, r: 30}
  }, {
    e: {c: 4, r: 32},
    s: {c: 1, r: 32}
  }];
  ws['!cols'] = [
    {wch: 13.75},
    {wch: 7.75},
    {wch: 10.13},
    {wch: 7.5},
    {wch: 9},
    {wch: 5.25},
    {wch: 8.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    {hpt: 42, hpx: 42},
    {hpt: 15, hpx: 15},
    {hpt: 6.75, hpx: 6.75},
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 27, hpx: 27},
    null,
    null,
    null,
    null,
    {hpt: 18.75, hpx: 18.75},
    {hpt: 20.25, hpx: 20.25},
    {hpt: 4.5, hpx: 4.5},
    {hpt: 20.25, hpx: 20.25},
    {hpt: 9, hpx: 9},
    {hpt: 16.5, hpx: 16.5},
    {hpt: 3, hpx: 3},
    {hpt: 21, hpx: 21},
    {hpt: 6, hpx: 6},
    {hpt: 16.5, hpx: 16.5}
  ];
  ws['A4'] = {v: '父子', t: 's', w: '父子'};
  ws['B29'].f = '数据!B37';
  ws['B31'].f = '数据!B38';
  ws['C2'].f = '数据!B1';
  ws['E2'].f = '数据!B2';
  ws['E4'] = {v: '购车', t: 's', w: '购车'};

  ws['A4'].s = {font: {sz: 12, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['B29'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['B31'].s = {font: {sz: 12, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['C2'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['E2'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['E4'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
}
// 中介合同
function createZjht(wb) {
  var ws = getSheet(wb, 48, 8, '中介合同');
  ws['!merges'] = [{
    e: {c: 2, r: 5},
    s: {c: 1, r: 5}
  }, {
    e: {c: 3, r: 10},
    s: {c: 2, r: 10}
  }, {
    e: {c: 3, r: 11},
    s: {c: 1, r: 11}
  }, {
    e: {c: 2, r: 17},
    s: {c: 1, r: 17}
  }, {
    e: {c: 3, r: 6},
    s: {c: 1, r: 6}
  }, {
    e: {c: 4, r: 14},
    s: {c: 5, r: 14}
  }];
  ws['!cols'] = [
    {wch: 9.63},
    {wch: 8.75},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 10.88},
    {wch: 16.88},
    {wch: 15.88},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    null,
    {hpt: 24, hpx: 24},
    {hpt: 24, hpx: 24},
    {hpt: 47.25, hpx: 47.25},
    {hidden: true, hpt: 3, hpx: 3},
    {hpt: 27, hpx: 27},
    {hpt: 23.25, hpx: 23.25},
    null,
    null,
    {hpt: 14.25, hpx: 14.25},
    {hpt: 19.5, hpx: 19.5},
    {hpt: 15.75, hpx: 15.75},
    null,
    null,
    null,
    null,
    {hpt: 32.25, hpx: 32.25},
    {hpt: 15.75, hpx: 15.75},
    {hpt: 18.75, hpx: 18.75}
  ];
  ws['B6'].f = '数据!B1';
  ws['B7'].f = '数据!B3';
  ws['B12'].f = '数据!B18';
  ws['B18'].f = '数据!B10';
  ws['C11'].f = '数据!B16';
  ws['D14'].f = '数据!B47';
  ws['E15'].f = '数据!B51';
  ws['E18'].f = '数据!B32';
  ws['F6'].f = '数据!B2';
  ws['F7'].f = '数据!B5';
  ws['F11'].f = '数据!B19';
  ws['F12'] = {v: moneyReplaceComma(moneyFormat2(B20 * 1000)) + '元', t: 's', w: moneyReplaceComma(moneyFormat2(B20 * 1000)) + '元'};
  ws['F17'].f = '数据!B51';
  ws['F19'].f = '数据!B29';

  ws['B6'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['B7'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['B12'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['B18'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['C11'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['D14'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['E15'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['E18'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['F6'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['F7'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['F11'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['F12'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['F17'].s = {font: {sz: 9}, alignment: {horizontal: 'left', vertical: 'top'}};
  ws['F19'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'center'}};
}
// 担保分期服务协议
function createDbfqfwxy(wb) {
  var ws = getSheet(wb, 48, 8, '担保分期服务协议');
  ws['!merges'] = [{
    e: {c: 5, r: 20},
    s: {c: 4, r: 20}
  }, {
    e: {c: 3, r: 38},
    s: {c: 2, r: 38}
  }, {
    e: {c: 4, r: 40},
    s: {c: 2, r: 40}
  }, {
    e: {c: 6, r: 6},
    s: {c: 5, r: 6}
  }, {
    e: {c: 3, r: 12},
    s: {c: 1, r: 12}
  }, {
    e: {c: 7, r: 12},
    s: {c: 6, r: 12}
  }, {
    e: {c: 3, r: 14},
    s: {c: 2, r: 14}
  }, {
    e: {c: 6, r: 14},
    s: {c: 5, r: 14}
  }, {
    e: {c: 2, r: 4},
    s: {c: 1, r: 4}
  }];
  ws['!cols'] = [
    {wch: 7.13},
    {wch: 8.88},
    {wch: 8.88},
    {wch: 9.13},
    {wch: 8.38},
    {wch: 10.13},
    {wch: 11.88},
    {wch: 9.88}
  ];
  ws['!rows'] = [
    null,
    null,
    null,
    {hpt: 23.25, hpx: 23.25},
    null,
    {hpt: 12.75, hpx: 12.75},
    null,
    null,
    null,
    null,
    null,
    {hpt: 16.5, hpx: 16.5},
    null,
    {hpt: 11.25, hpx: 11.25},
    null,
    {hpt: 9, hpx: 9},
    null,
    {hpt: 8.25, hpx: 8.25},
    null,
    {hpt: 11.25, hpx: 11.25},
    null,
    {hpt: 9, hpx: 9},
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 21.75, hpx: 21.75},
    {hpt: 15.75, hpx: 15.75},
    {hpt: 9.75, hpx: 9.75},
    null,
    {hpt: 12.75, hpx: 12.75},
    null,
    {hpt: 8.25, hpx: 8.25}
  ];
  ws['B5'] = {v: '温州浩源控股有限', t: 's', w: '温州浩源控股有限'};
  ws['B7'].f = '数据!B1';
  ws['B13'].f = '数据!B16';
  ws['B21'] = {v: B46, t: 's', w: B46};
  ws['C15'].f = '数据!B21';
  ws['C39'] = {v: 1396886112, t: 's', w: '1396886112'};
  ws['C41'] = {v: '温州市东龙路19号16幢1601室', t: 's', w: '温州市东龙路19号16幢1601室'};
  ws['C43'] = {v: 325000, t: 's', w: '325000'};
  ws['D19'].f = '数据!B45';
  ws['D23'].f = '数据!B13';
  ws['E21'].f = '数据!B9';
  ws['F7'].f = '数据!B2';
  ws['F13'].f = '数据!B19';
  ws['F15'] = {v: B42, t: 's', w: B42};
  ws['F17'].f = '数据!B27';
  ws['F19'] = {v: B43, t: 's', w: B43};
  ws['G13'].f = '数据!B18';
  ws['G21'] = {v: B11, t: 's', w: B11};
  ws['G37'].f = '数据!B6';
  ws['G39'].f = '数据!B8';
  ws['G43'].f = '数据!B4';
  ws['H17'] = {v: B26, t: 's', w: B26};

  ws['B5'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['B7'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['B13'].s = {font: {sz: 8}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['B21'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['C15'].s = {font: {sz: 8}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['C39'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['C41'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['C43'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['D19'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['D23'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['E21'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['F7'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['F13'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['F15'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['F17'].s = {font: {sz: 7}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['F19'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['G13'].s = {font: {sz: 9}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['G21'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['G37'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['G39'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['G43'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['H17'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
}
// 支付凭证
function createZfpz(wb) {
  var ws = getSheet(wb, 7, 8, '支付凭证');
  ws['!merges'] = [{
    e: {c: 2, r: 2},
    s: {c: 1, r: 2}
  }, {
    e: {c: 5, r: 2},
    s: {c: 4, r: 2}
  }, {
    e: {c: 5, r: 3},
    s: {c: 4, r: 3}
  }, {
    e: {c: 5, r: 4},
    s: {c: 4, r: 4}
  }, {
    e: {c: 2, r: 6},
    s: {c: 1, r: 6}
  }];
  ws['!cols'] = [
    {wch: 8.38},
    {wch: 12.5},
    {wch: 8.38},
    {wch: 15.13},
    {wch: 8.75},
    {wch: 11},
    {wch: 8.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    null,
    {hpt: 9.75, hpx: 9.75},
    {hpt: 16.5, hpx: 16.5},
    {hpt: 17.25, hpx: 17.25},
    null,
    {hpt: 11.25, hpx: 11.25}
  ];
  ws['B3'].f = '数据!B1';
  ws['B7'].f = '数据!B9';
  ws['E3'] = {v: '温州浩源控股有限', t: 's', w: '温州浩源控股有限'};
  ws['E4'] = {v: '33050162613500000312', t: 's', w: '33050162613500000312'};
  ws['E5'] = {v: '建行瑞安支行', t: 's', w: '建行瑞安支行'};
  ws['F7'] = {v: B11, t: 's', w: B11};

  ws['B3'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['B7'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['E3'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['E4'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['E5'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['F7'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
}
// 授权委托书
function createSqwts(wb) {
  var ws = getSheet(wb, 10, 8, '授权委托书');
  ws['!merges'] = [{
    e: {c: 4, r: 9},
    s: {c: 2, r: 9}
  }, {
    e: {c: 5, r: 6},
    s: {c: 4, r: 6}
  }];
  ws['!cols'] = [
    {wch: 8.38},
    {wch: 9.5},
    {wch: 8.38},
    {wch: 5.88},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    null,
    null,
    null,
    {hpt: 12, hpx: 12},
    {hpt: 9.75, hpx: 9.75},
    {hpt: 9, hpx: 9},
    null,
    null,
    {hpt: 27, hpx: 27}
  ];
  ws['C10'].f = ' E7';
  ws['E7'].f = '数据!B51';

  ws['C10'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['E7'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
}
// 收款收据
function createSksj(wb) {
  var ws = getSheet(wb, 16, 10, '收款收据');
  ws['!merges'] = [{
    e: {c: 5, r: 15},
    s: {c: 4, r: 15}
  }, {
    e: {c: 8, r: 15},
    s: {c: 7, r: 15}
  }, {
    e: {c: 6, r: 11},
    s: {c: 2, r: 11}
  }, {
    e: {c: 5, r: 13},
    s: {c: 1, r: 13}
  }];
  ws['!cols'] = [
    {wch: 14.88},
    {wch: 5.13},
    {wch: 1.38},
    {wch: 4.75},
    {wch: 0.92},
    {wch: 2.13},
    {wch: 1.75},
    {wch: 2.13},
    {wch: 17},
    {wch: 8.88}
  ];
  ws['!rows'] = [
    {hpt: 34.5, hpx: 34.5},
    null,
    {hpt: 6.75, hpx: 6.75},
    {hpt: 9.75, hpx: 9.75},
    null,
    null,
    {hpt: 6, hpx: 6},
    {hpt: 5.25, hpx: 5.25},
    {hpt: 5.25, hpx: 5.25},
    null,
    {hpt: 6.75, hpx: 6.75},
    null,
    null,
    null,
    {hpt: 10.5, hpx: 10.5}
  ];
  ws['B5'].f = ' 数据!B1';
  ws['B14'].f = '数据!B27';
  ws['C12'].f = '数据!B12&"首付款"';
  ws['F2'].f = 'MID(YEAR(数据!B41),3,2)';
  ws['G16'] = {v: '滕', t: 's', w: '滕'};
  ws['H2'].f = 'MONTH(数据!B41)';
  ws['I2'].f = '"   "&DAY(数据!B41)';
  ws['J14'] = {v: B26, t: 's', w: B26};

  ws['B5'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['B14'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['C12'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['F2'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['G16'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['H2'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['I2'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['J14'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'center'}};
}
// 收妥1
function createSt1(wb) {
  var ws = getSheet(wb, 48, 10, '收妥1');
  ws['!merges'] = [{
    e: {c: 7, r: 7},
    s: {c: 6, r: 7}
  }, {
    e: {c: 5, r: 15},
    s: {c: 4, r: 15}
  }, {
    e: {c: 9, r: 15},
    s: {c: 8, r: 15}
  }, {
    e: {c: 5, r: 17},
    s: {c: 4, r: 17}
  }, {
    e: {c: 5, r: 18},
    s: {c: 4, r: 18}
  }, {
    e: {c: 5, r: 19},
    s: {c: 4, r: 19}
  }];
  ws['!cols'] = [
    {wch: 5.88},
    {wch: 11.75},
    {wch: 11},
    {wch: 5.88},
    {wch: 8.38},
    {wch: 4.75},
    {wch: 8.38},
    {wch: 7},
    {wch: 9.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    null,
    null,
    null,
    null,
    {hpt: 75, hpx: 75},
    {hpt: 7.5, hpx: 7.5},
    null,
    null,
    {hpt: 18.75, hpx: 18.75},
    {hpt: 8.25, hpx: 8.25},
    null,
    {hpt: 18, hpx: 18},
    null,
    {hpt: 3, hpx: 3}
  ];
  ws['B11'] = {v: moneyReplaceComma(moneyFormat2(B42 * 1000)), t: 's', w: moneyReplaceComma(moneyFormat2(B42 * 1000))};
  ws['B16'].f = '数据!B1';
  ws['C16'].f = '数据!B1';
  ws['E16'].f = 'IF(数据!B51="瑞安支行","车辆登记证书","汽车")';
  ws['E18'].f = 'IF(数据!B51="瑞安支行","发票","")';
  ws['E20'].f = 'IF(数据!B51="瑞安支行","商业险","")';
  ws['G8'].f = '数据!B1';
  ws['I16'].f = '数据!B10';

  ws['B11'].s = {font: {sz: 16}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['B16'].s = {font: {sz: 16}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['C16'].s = {font: {sz: 16}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['E16'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['E18'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['E20'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['G8'].s = {font: {sz: 16}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['I16'].s = {font: {sz: 16}, alignment: {horizontal: 'left', vertical: 'center'}};
}
// 收妥2
function createSt2(wb) {
  var ws = getSheet(wb, 49, 8, '收妥2');
  ws['!merges'] = [{
    e: {c: 1, r: 48},
    s: {c: 0, r: 48}
  }];
  ws['!cols'] = [
    {wch: 8.38},
    {wch: 9.5},
    {wch: 8.38},
    {wch: 5.88},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    null,
    null,
    null,
    {hpt: 12, hpx: 12},
    {hpt: 9.75, hpx: 9.75},
    {hpt: 5.25, hpx: 5.25},
    null,
    null,
    {hpt: 44.25, hpx: 44.25},
    {hpt: 19.5, hpx: 19.5},
    {hpt: 7.5, hpx: 7.5},
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 10.5, hpx: 10.5},
    {hpt: 10.5, hpx: 10.5},
    null,
    {hpt: 6, hpx: 6},
    {hpt: 11.25, hpx: 11.25}
  ];
  ws['A49'] = {v: '车辆登记证书', t: 's', w: '车辆登记证书'};
  ws['E10'].f = '数据!B1';
  ws['E49'] = {v: '发票', t: 's', w: '发票'};
  ws['G12'].f = '数据!B42';
  ws['G49'] = {v: '商业险', t: 's', w: '商业险'};

  ws['A49'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['E10'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['E49'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['G12'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['G49'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'center'}};
}
// 收妥3
function createSt3(wb) {
  var ws = getSheet(wb, 48, 8, '收妥3');
  ws['!merges'] = [{
    e: {c: 1, r: 44},
    s: {c: 0, r: 44}
  }];
  ws['!cols'] = [
    {wch: 8.38},
    {wch: 9.5},
    {wch: 8.38},
    {wch: 5.88},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    null,
    null,
    null,
    {hpt: 12, hpx: 12},
    {hpt: 9.75, hpx: 9.75},
    {hpt: 5.25, hpx: 5.25},
    null,
    null,
    {hpt: 85.5, hpx: 85.5},
    {hpt: 19.5, hpx: 19.5},
    {hpt: 7.5, hpx: 7.5},
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 10.5, hpx: 10.5},
    null,
    {hpt: 6, hpx: 6},
    {hpt: 11.25, hpx: 11.25},
    null,
    null,
    {hpt: 26.25, hpx: 26.25}
  ];
  ws['A45'] = {v: '车辆登记证书', t: 's', w: '车辆登记证书'};
  ws['E10'].f = '数据!B1';
  ws['E45'] = {v: '发票', t: 's', w: '发票'};
  ws['G12'].f = '数据!B42';
  ws['G45'] = {v: '商业险', t: 's', w: '商业险'};

  ws['A45'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['E10'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['E45'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['G12'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['G45'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'center'}};
}
// 新合同1
function createXht1(wb) {
  var ws = getSheet(wb, 48, 8, '新合同1');
  ws['!merges'] = [{
    e: {c: 2, r: 22},
    s: {c: 1, r: 22}
  }, {
    e: {c: 5, r: 22},
    s: {c: 3, r: 22}
  }, {
    e: {c: 3, r: 19},
    s: {c: 1, r: 19}
  }, {
    e: {c: 6, r: 19},
    s: {c: 5, r: 19}
  }, {
    e: {c: 2, r: 16},
    s: {c: 1, r: 16}
  }, {
    e: {c: 7, r: 20},
    s: {c: 5, r: 20}
  }, {
    e: {c: 3, r: 33},
    s: {c: 2, r: 33}
  }, {
    e: {c: 6, r: 33},
    s: {c: 5, r: 33}
  }, {
    e: {c: 3, r: 9},
    s: {c: 1, r: 9}
  }, {
    e: {c: 6, r: 34},
    s: {c: 5, r: 34}
  }];
  ws['!cols'] = [
    {wch: 5.88},
    {wch: 9.13},
    {wch: 7.88},
    {wch: 6.75},
    {wch: 13},
    {wch: 7.63},
    {wch: 9.25},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    null,
    {hpt: 25.5, hpx: 25.5},
    {hpt: 18, hpx: 18},
    {hpt: 13.5, hpx: 13.5},
    null,
    {hpt: 15, hpx: 15},
    null,
    {hpt: 11.25, hpx: 11.25},
    {hpt: 15, hpx: 15},
    {hpt: 17.25, hpx: 17.25},
    null,
    {hpt: 13.5, hpx: 13.5},
    {hpt: 9, hpx: 9},
    {hpt: 12.75, hpx: 12.75},
    {hpt: 20.25, hpx: 20.25},
    {hpt: 23.25, hpx: 23.25},
    {hpt: 24, hpx: 24},
    null,
    {hpt: 8.25, hpx: 8.25},
    {hpt: 21, hpx: 21},
    null,
    {hpt: 16.5, hpx: 16.5},
    {hpt: 18.75, hpx: 18.75},
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 33, hpx: 33},
    null,
    null,
    null,
    {hpt: 10.5, hpx: 10.5},
    null,
    {hpt: 13.5, hpx: 13.5},
    {hpt: 21.75, hpx: 21.75}
  ];
  ws['B10'].f = '数据!B9';
  ws['B15'].f = '数据!B13';
  ws['B17'].f = '数据!B14';
  ws['C34'] = {v: '温州浩源控股有限公司', t: 's', w: '温州浩源控股有限公司'};
  ws['C35'] = {v: '瑞安支', t: 's', w: '瑞安支'};
  ws['E11'].f = '数据!B12';
  ws['E17'] = {v: '一', t: 's', w: '一'};
  ws['E30'] = {v: '二', t: 's', w: '二'};
  ws['F10'].f = '数据!B10';
  ws['F11'] = {v: '壹', t: 's', w: '壹'};
  ws['F20'].f = '数据!B34*100';
  ws['F21'].f = '数据!B15';
  ws['F35'] = {v: '33050162613500000312', t: 's', w: '33050162613500000312'};
  ws['G14'].f = '数据!B32';

  ws['B10'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['B15'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'top'}};
  ws['B17'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'top', wrapText: true}};
  ws['C34'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'top'}};
  ws['C35'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['E11'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['E17'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'top'}};
  ws['E30'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'top'}};
  ws['F10'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['F11'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['F20'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['F21'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['F35'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['G14'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
}
// 新合同6
function createXht6(wb) {
  var ws = getSheet(wb, 48, 8, '新合同6');
  ws['!merges'] = [{
    e: {c: 7, r: 13},
    s: {c: 6, r: 13}
  }, {
    e: {c: 7, r: 17},
    s: {c: 6, r: 17}
  }, {
    e: {c: 3, r: 20},
    s: {c: 2, r: 20}
  }, {
    e: {c: 7, r: 15},
    s: {c: 6, r: 15}
  }];
  ws['!cols'] = [
    {wch: 10.13},
    {wch: 17.25},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 5.88},
    {wch: 10.63},
    {wch: 8.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    null,
    null,
    {hpt: 29.25, hpx: 29.25},
    {hpt: 190.5, hpx: 190.5},
    {hpt: 13.5, hpx: 13.5},
    null,
    {hpt: 18, hpx: 18},
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 33.75, hpx: 33.75},
    {hpt: 81.75, hpx: 81.75},
    {hpt: 14.25, hpx: 14.25},
    {hpt: 11.25, hpx: 11.25},
    {hpt: 20.25, hpx: 20.25},
    null,
    {hpt: 10.5, hpx: 10.5},
    null,
    {hpt: 12, hpx: 12},
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 20.25, hpx: 20.25},
    null,
    null,
    null,
    {hpt: 10.5, hpx: 10.5},
    null,
    {hpt: 13.5, hpx: 13.5},
    {hpt: 21.75, hpx: 21.75}
  ];
  ws['C16'].f = '数据!B1';
  ws['C18'] = {v: '汽车', t: 's', w: '汽车'};
  ws['C21'].f = '数据!B18';
  ws['C23'] = {v: moneyReplaceComma(moneyFormat2(B20)) + '元', t: 's', w: moneyReplaceComma(moneyFormat2(B20)) + '元'};
  ws['E7'] = {v: '㈡', t: 's', w: '㈡'};
  ws['G16'].f = '数据!B2';
  ws['G18'].f = '数据!B16';
  ws['G19'].f = '数据!B17';
  ws['G21'].f = '数据!B19';

  ws['C16'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['C18'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['C21'].s = {font: {sz: 9}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['C23'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['E7'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['G16'].s = {font: {sz: 9}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['G18'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['G19'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['G21'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
}
// 新合同11
function createXht11(wb) {
  var ws = getSheet(wb, 48, 9, '新合同11');
  ws['!merges'] = [{
    e: {c: 8, r: 42},
    s: {c: 7, r: 42}
  }, {
    e: {c: 8, r: 24},
    s: {c: 6, r: 24}
  }];
  ws['!cols'] = [
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8},
    {wch: 7.63},
    {wch: 6.88},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 18.75, hpx: 18.75},
    null,
    null,
    null,
    {hpt: 11.25, hpx: 11.25},
    null,
    {hpt: 15.75, hpx: 15.75},
    null,
    {hpt: 27.75, hpx: 27.75},
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 16.5, hpx: 16.5},
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 15, hpx: 15}
  ];
  ws['G25'].f = '数据!B14';

  ws['G25'].s = {font: {sz: 9}, alignment: {horizontal: 'left', vertical: 'center'}};
}
// 新合同12
function createXht12(wb) {
  var ws = getSheet(wb, 48, 8, '新合同12');
  ws['!merges'] = [{
    e: {c: 6, r: 44},
    s: {c: 2, r: 44}
  }, {
    e: {c: 4, r: 46},
    s: {c: 2, r: 46}
  }];
  ws['!cols'] = [
    {wch: 4.5},
    {wch: 13.25},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 16.5, hpx: 16.5},
    null,
    null,
    null,
    null,
    null,
    {hpt: 46.5, hpx: 46.5},
    {hpt: 11.25, hpx: 11.25},
    null,
    {hpt: 13.5, hpx: 13.5},
    null,
    {hpt: 8.25, hpx: 8.25}
  ];
  ws['C45'] = {v: '    本抵押合同生效后，机动车所有人方委托金融机构方，', t: 's', w: '    本抵押合同生效后，机动车所有人方委托金融机构方，'};
  ws['C47'] = {v: '办理相关车辆抵押或解除抵押手续。', t: 's', w: '办理相关车辆抵押或解除抵押手续。'};

  ws['C45'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['C47'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
}
// 新合同13
function createXht13(wb) {
  var ws = getSheet(wb, 48, 9, '新合同13');
  ws['!merges'] = [{
    e: {c: 3, r: 5},
    s: {c: 2, r: 5}
  }, {
    e: {c: 8, r: 6},
    s: {c: 7, r: 6}
  }, {
    e: {c: 5, r: 7},
    s: {c: 4, r: 7}
  }, {
    e: {c: 6, r: 12},
    s: {c: 4, r: 12}
  }, {
    e: {c: 4, r: 22},
    s: {c: 3, r: 22}
  }, {
    e: {c: 7, r: 22},
    s: {c: 6, r: 22}
  }, {
    e: {c: 5, r: 34},
    s: {c: 4, r: 34}
  }, {
    e: {c: 3, r: 14},
    s: {c: 2, r: 14}
  }, {
    e: {c: 4, r: 16},
    s: {c: 3, r: 16}
  }, {
    e: {c: 5, r: 20},
    s: {c: 3, r: 20}
  }, {
    e: {c: 8, r: 20},
    s: {c: 6, r: 20}
  }, {
    e: {c: 5, r: 18},
    s: {c: 3, r: 18}
  }, {
    e: {c: 6, r: 10},
    s: {c: 4, r: 10}
  }, {
    e: {c: 7, r: 3},
    s: {c: 6, r: 3}
  }, {
    e: {c: 8, r: 18},
    s: {c: 6, r: 18}
  }, {
    e: {c: 8, r: 12},
    s: {c: 7, r: 12}
  }];
  ws['!cols'] = [
    {wch: 3.88},
    {wch: 16.5},
    {wch: 8.75},
    {wch: 4},
    {wch: 12},
    {wch: 9.13},
    {wch: 14.38},
    {wch: 5.13},
    {wch: 6.13}
  ];
  ws['!rows'] = [
    null,
    null,
    {hpt: 21, hpx: 21},
    null,
    {hpt: 9.75, hpx: 9.75},
    {hpt: 28.5, hpx: 28.5},
    null,
    null,
    null,
    {hpt: 6, hpx: 6},
    null,
    {hpt: 7.5, hpx: 7.5},
    null,
    {hpt: 6.75, hpx: 6.75},
    null,
    {hpt: 10.5, hpx: 10.5},
    null,
    null,
    null,
    {hpt: 9.75, hpx: 9.75},
    {hpt: 22.5, hpx: 22.5},
    {hpt: 3.75, hpx: 3.75},
    {hpt: 22.5, hpx: 22.5},
    null,
    {hpt: 5.25, hpx: 5.25},
    null,
    null,
    null,
    {hpt: 5.25, hpx: 5.25},
    {hpt: 24.75, hpx: 24.75},
    {hpt: 16.5, hpx: 16.5},
    {hpt: 7.5, hpx: 7.5},
    {hpt: 21, hpx: 21},
    {hpt: 6.75, hpx: 6.75},
    {hpt: 24, hpx: 24},
    null,
    {hpt: 22.5, hpx: 22.5},
    {hpt: 23.25, hpx: 23.25},
    {hpt: 18, hpx: 18},
    {hpt: 23.25, hpx: 23.25}
  ];
  ws['C4'].f = '数据!B1';
  ws['C6'].f = '数据!B3';
  ws['C15'].f = '数据!B53';
  ws['D17'].f = '数据!B1';
  ws['D19'].f = 'G4';
  ws['D21'].f = '数据!B3';
  ws['D23'].f = '数据!B3';
  ws['E8'].f = '数据!B51';
  ws['E11'].f = '数据!B52';
  ws['E13'].f = '数据!B52';
  ws['E26'].f = '数据!B5';
  ws['E33'] = {v: '温州浩源控股有限公司', t: 's', w: '温州浩源控股有限公司'};
  ws['E35'] = {v: '91330300MA2874D937', t: 's', w: '91330300MA2874D937'};
  ws['E36'] = {v: '温州市东龙路19号16幢1601室', t: 's', w: '温州市东龙路19号16幢1601室'};
  ws['E37'] = {v: 325000, t: 's', w: '325000'};
  ws['E38'] = {v: '0577-86508880', t: 's', w: '0577-86508880'};
  ws['E39'] = {v: 13857761616, t: 's', w: '13857761616'};
  ws['E40'] = {v: '蔡盛义', t: 's', w: '蔡盛义'};
  ws['F23'].f = '数据!B4';
  ws['G4'].f = '"身份证："&数据!B2';
  ws['G6'].f = '数据!B3';
  ws['G7'].f = '数据!B5';
  ws['G17'].f = '数据!B6';
  ws['G19'].f = '"身份证："&数据!B7';
  ws['G21'].f = 'D21';
  ws['G23'].f = 'D23';
  ws['G26'].f = '数据!B8';
  ws['H6'].f = '数据!B4';
  ws['H13'] = {v: '325000', t: 's', w: '325000'};
  ws['I23'].f = 'F23';

  ws['C4'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['C6'].s = {font: {sz: 7}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['C15'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['D17'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['D19'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['D21'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'center', wrapText: true}};
  ws['D23'].s = {font: {sz: 7}, alignment: {horizontal: 'center', vertical: 'center', wrapText: true}};
  ws['E8'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['E11'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['E13'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['E26'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['E33'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'center', wrapText: true}};
  ws['E35'].s = {font: {sz: 9}, alignment: {horizontal: 'left', vertical: 'center', wrapText: true}};
  ws['E36'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center', wrapText: true}};
  ws['E37'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center', wrapText: true}};
  ws['E38'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center', wrapText: true}};
  ws['E39'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['E40'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['F23'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['G4'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['G6'].s = {font: {sz: 7}, alignment: {horizontal: 'center', vertical: 'center', wrapText: true}};
  ws['G7'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['G17'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['G19'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['G21'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'center', wrapText: true}};
  ws['G23'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'center', wrapText: true}};
  ws['G26'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['H6'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['H13'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['I23'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'center'}};
}
// 贷款确认书
function createDkqrs(wb) {
  var ws = getSheet(wb, 48, 9, '贷款确认书');
  ws['!merges'] = [{
    e: {c: 4, r: 7},
    s: {c: 3, r: 7}
  }, {
    e: {c: 8, r: 20},
    s: {c: 3, r: 15}
  }, {
    e: {c: 7, r: 11},
    s: {c: 6, r: 11}
  }];
  ws['!cols'] = [
    {whidden: true},
    {wch: 6.63},
    {wch: 5.63},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.75},
    {wch: 10.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    null,
    null,
    {hpt: 26.25, hpx: 26.25},
    {hpt: 22.5, hpx: 22.5},
    {hpt: 17.25, hpx: 17.25},
    null,
    {hpt: 7.5, hpx: 7.5},
    {hpt: 20.25, hpx: 20.25},
    {hpt: 12.75, hpx: 12.75},
    null,
    null,
    null,
    {hpt: 11.25, hpx: 11.25},
    {hpt: 9.75, hpx: 9.75},
    {hidden: true, hpt: 3, hpx: 3},
    {hpt: 14.25, hpx: 14.25}
  ];
  ws['D5'].f = '数据!B1';
  ws['D8'].f = '数据!B16';
  ws['D10'].f = '数据!B25';
  ws['D12'] = {v: '建行', t: 's', w: '建行'};
  ws['D16'].f = '数据!B30';
  ws['E10'].f = '数据!B31';
  ws['H5'].f = '数据!B1';
  ws['H8'] = {v: moneyFormat2(B20) + '元', t: 's', w: moneyFormat2(B20) + '元'};
  ws['H10'].f = '数据!B10';
  ws['H12'].f = '数据!B29';

  ws['D5'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['D8'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['D10'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['D12'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['D16'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center', wrapText: true}};
  ws['E10'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['H5'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['H8'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['H10'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['H12'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
}
// 客户资料
function createKhzl(wb) {
  var ws = getSheet(wb, 48, 12, '客户资料');
  ws['!cols'] = [
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 14},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 13.38},
    {wch: 12.13},
    {wch: 13.63},
    {wch: 11.25},
    {wch: 10.38},
    {wch: 10.63},
    {wch: 8.38}
  ];
  ws['A1'] = {v: '客户姓名', t: 's', w: '客户姓名'};
  ws['A2'].f = '数据!B1';
  ws['B1'] = {v: '车行', t: 's', w: '车行'};
  ws['C1'] = {v: '车型', t: 's', w: '车型'};
  ws['C2'].f = '数据!B12';
  ws['D1'] = {v: '部门', t: 's', w: '部门'};
  ws['D2'] = {v: '新车贷', t: 's', w: '新车贷'};
  ws['E1'] = {v: '经办人', t: 's', w: '经办人'};
  ws['F1'] = {v: '车价（万元）', t: 's', w: '车价（万元）'};
  ws['F2'].f = '数据!B42/10000';
  ws['G1'] = {v: '贷款额（万元）', t: 's', w: '贷款额（万元）'};
  ws['G2'].f = '数据!B43/10000';
  ws['H1'] = {v: '备注', t: 's', w: '备注'};
  ws['H2'].f = '"服务费"&数据!B46';
  ws['I1'] = {v: '放款银行', t: 's', w: '放款银行'};
  ws['I2'] = {v: '建行', t: 's', w: '建行'};
  ws['J1'] = {v: '收件时间', t: 's', w: '收件时间'};
  ws['J2'] = {v: 43332, t: 'd', f: 'TODAY()', w: '8/20/18'};
  ws['K1'] = {v: '利率', t: 's', w: '利率'};
  ws['K2'].f = '数据!B48';
  ws['L1'] = {v: '抵押时间', t: 's', w: '抵押时间'};

  ws['A1'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['A2'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['B1'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['C1'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['C2'].s = {alignment: {horizontal: 'left', vertical: 'center', wrapText: true}};
  ws['D1'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['D2'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['E1'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['F1'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['F2'].s = {alignment: {horizontal: 'right', vertical: 'center'}};
  ws['G1'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['G2'].s = {alignment: {horizontal: 'right', vertical: 'center'}};
  ws['H1'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['H2'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['I1'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['I2'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['J1'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['J2'].s = {alignment: {horizontal: 'right', vertical: 'center'}};
  ws['K1'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['K2'].s = {alignment: {horizontal: 'right', vertical: 'center'}};
  ws['L1'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
}
// 获取margins
function getMargins() {
  return {
    bottom: 0.75,
    footer: 0.5,
    header: 0.5,
    left: 0.7,
    right: 0.7,
    top: 0.75
  };
}
// 获取sheet
function getSheet(wb, row, col, name) {
  console.log(wb, row, col, name);
  var tmp = [];
  for (let i = col; i > 0; i--) {
    tmp.push('');
  }
  var data = [];
  for (let i = row; i > 0; i--) {
    data.push(tmp);
  }
  let ws = wb.getSheet(data, name);
  ws['!margins'] = getMargins();
  return ws;
}