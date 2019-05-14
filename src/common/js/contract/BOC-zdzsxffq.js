import {
  getWorkbook
} from 'common/js/xlsx-util';
import {
  moneyFormat,
  moneyReplaceComma
} from 'common/js/util';
var B13 = 0;
var B22 = 0;
var B16 = 0;
var B15 = 0;
var B14 = 0;
var B49 = 0;
var B48 = 0;
var B61 = 0;
var B44 = 0;
var B59 = 0;
var B42 = 0;
export function exportBOCZdzsxffq(data) {
  B13 = moneyReplaceComma(moneyFormat(data.loanAmount));
  B22 = moneyReplaceComma(moneyFormat(data.invoicePrice));
  B16 = data.loanPeriods;
  B14 = (data.bankRate * 100).toFixed(2);
  B15 = B13 * B14 / 100;
  B49 = parseInt(B13 / B16);
  B48 = B13 - (B49 * (B16 - 1));
  B61 = parseInt(B49 / B14);
  B44 = B49 + B61;
  B59 = Math.abs(B61 * (B16 - 1) - B15);
  B42 = B48 + B59;
  const wb = getWorkbook();
  createData(wb, data);
  createZx1(wb);
  createZx2(wb);
  createJzd(wb);
  createSqrzzm(wb);
  createWzsfh(wb);
  createDzhtchz(wb);
  createDkzsxcnh(wb);
  createWtsqs(wb);
  createSrzm(wb);
  createDbrsrzm(wb);
  createXykedsqb(wb);
  createGthkrcns(wb);
  createDbrgthkcns(wb);
  createQcgxht(wb);
  createHtfm(wb);
  createHt6(wb);
  createHt7(wb);
  createHt8(wb);
  createBzxy1(wb);
  createBzxy2(wb);
  // download
  wb.downloadXls('中行总对总-手续费分期');
}
// 数据
export function createData(wb, data) {
  let year = data.customerBirth.substr(0, 4);
  let month = data.customerBirth.substr(4, 2) - 0;
  let arr = [
    ['中银信用卡持卡人（甲方）', data.customerName],
    ['身份证件号码', data.idNo],
    ['住所', data.applyNowAddress],
    ['出生年月', year + '.' + month],
    ['家庭电话', data.familyPhone],
    ['电话', data.mobile],
    ['配偶姓名', data.ghRealName],
    ['身份证件号码', data.ghIdNo],
    ['电话', data.ghMobile],
    ['住址', ''],
    ['贷款额（大写）', ''],
    ['贷款额（大写）', ''],
    ['贷款额（小写）', moneyReplaceComma(moneyFormat(data.loanAmount))],
    ['利率', (data.bankRate * 100).toFixed(2)],
    ['总手续费（小写合同）', ''],
    ['分期', data.loanPeriods],
    ['总手续费（大写合同）', ''],
    ['抵押物名称', '汽车'],
    ['车辆颜色', data.carColor],
    ['车架号码', data.frameNo],
    ['发动机号码', data.engineNo],
    ['汽车发票价', moneyReplaceComma(moneyFormat(data.invoicePrice))],
    ['工作单位', data.applyUserCompany],
    ['单位地址', ''],
    ['配偶（担保人）工作单位', data.ghCompanyName],
    ['单位地址', ''],
    ['汽车经销商名称', data.carDealerName],
    ['汽车经销商账号', data.carDealer.jxsCollectBankcardList[0].bankcardNumber],
    ['汽车经销商开户行', data.carDealer.jxsCollectBankcardList[0].bankName],
    ['首付金额', ''],
    ['承保公司', data.insuranceCompany],
    ['年限', ''],
    ['期限', ''],
    ['职务', data.applyUserDuty],
    ['车辆型号', data.carBrand + ' ' + data.carModel],
    ['申请人性别', ''],
    ['共同还款人性别', ''],
    ['跟申请人关系', '夫妻'],
    ['首付金额（大写）', ''],
    ['首付金额（大写）', ''],
    ['首期还款金额（大写）', ''],
    ['首期还款金额（本金+手续费）', ''],
    ['每期还款金额（大写）', ''],
    ['每期还款金额（本金+手续费）', ''],
    ['', ''],
    ['', ''],
    ['汽车发票价大写', ''],
    ['首期还款', ''],
    ['每期还款', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['进账单', '蝉街车分期'],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['首期手续费（大写）', ''],
    ['首期手续费', ''],
    ['每期手续费（大写）', ''],
    ['每期手续费', ''],
    ['首期还款金额', ''],
    ['每期还款金额', ''],
    ['担保人姓名', data.guarantor1Name],
    ['性别', data.guarantor1Sex],
    ['身份证号码', data.guarantor1IdNo],
    ['联系电话', data.guarantor1Mobile],
    ['单位名称', data.guarantorCompanyName],
    ['单位地址', data.guarantorCompanyAddress],
    ['单位电话', data.guarantorCompanyPhone],
    ['住所', data.guarantorNowAddress]
  ];
  var ws = wb.getSheet(arr, '数据');
  ws['!margins'] = getMargins();
  ws['!cols'] = [{
    wch: 24.63
  }, {
    wch: 50.75
  }];
  ws['!rows'] = [];
  ws['!rows'][25] = {hpt: 15, hpx: 15};
  ws['B11'].f = 'IF(INT(B13)*100=B13*100,TEXT(INT(B13),"[$-0804][DBNum2]G/通用格式")&"",IF(INT(B13*10)=B13*10,TEXT(INT(B13),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B13*10-INT(B13)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B13),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B13*10)=INT(B13)*10,"零",TEXT(RIGHT(INT(B13*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B13*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
  ws['B12'].f = 'IF(INT(ROUND(B13,2))*100=ROUND(B13,2)*100,TEXT(INT(ROUND(B13,2)),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(ROUND(B13,2)*10)=B13*10,TEXT(INT(ROUND(B13,2)),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(ROUND(B13,2)*10-INT(ROUND(B13,2))*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(ROUND(B13,2)),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(ROUND(B13,2)*10)=INT(ROUND(B13,2))*10,"零",TEXT(RIGHT(INT(ROUND(B13,2)*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(ROUND(B13,2)*100),"[$-0804][DBNum2]G/通用格式")&"分"))&"整"';
  ws['B15'].f = 'TEXT((B13*B14/100),"0.00")';
  ws['B17'].f = 'IF(INT(B15)*100=B15*100,TEXT(INT(B15),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B15*10)=B15*10,TEXT(INT(B15),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B15*10-INT(B15)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B15),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B15*10)=INT(B15)*10,"零",TEXT(RIGHT(INT(B15*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B121*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
  ws['B30'].f = 'TEXT((B22-B13),"0.00")';
  ws['B32'].f = 'B16/12&"年"';
  ws['B33'].f = 'TEXT((B16/12),"[$-0804][DBNum2]G/通用格式")';
  ws['B36'].f = 'IF(MOD(MID(B2,17,1),2),"男","女")';
  ws['B37'].f = 'IF(MOD(MID(B8,17,1),2),"男","女")';
  ws['B39'].f = 'IF(INT(B30)*100=B30*100,TEXT(INT(B30),"[$-0804][DBNum2]G/通用格式")&"",IF(INT(B30*10)=B30*10,TEXT(INT(B30),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B30*10-INT(B30)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B30),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B30*10)=INT(B30)*10,"零",TEXT(RIGHT(INT(B30*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B30*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
  ws['B40'].f = 'IF(INT(ROUND(B30,2))*100=ROUND(B30,2)*100,TEXT(INT(ROUND(B30,2)),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(ROUND(B30,2)*10)=B30*10,TEXT(INT(ROUND(B30,2)),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(ROUND(B30,2)*10-INT(ROUND(B30,2))*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(ROUND(B30,2)),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(ROUND(B30,2)*10)=INT(ROUND(B30,2))*10,"零",TEXT(RIGHT(INT(ROUND(B30,2)*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(ROUND(B30,2)*100),"[$-0804][DBNum2]G/通用格式")&"分"))&"整"';
  ws['B41'].f = 'IF(INT(B42)*100=B42*100,TEXT(INT(B42),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B42*10)=B42*10,TEXT(INT(B42),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B42*10-INT(B42)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B42),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B42*10)=INT(B42)*10,"零",TEXT(RIGHT(INT(B42*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B42*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
  ws['B42'].f = 'TEXT((B48+B59),"0.00")';
  ws['B43'].f = 'IF(INT(B44)*100=B44*100,TEXT(INT(B44),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B44*10)=B44*10,TEXT(INT(B44),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B44*10-INT(B44)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B44),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B44*10)=INT(B44)*10,"零",TEXT(RIGHT(INT(B44*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B44*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
  ws['B44'].f = 'TEXT((B49+B61),"0.00")';
  ws['B47'].f = 'IF(INT(B22)*100=B22*100,TEXT(INT(B22),"[$-0804][DBNum2]G/通用格式")&"元整",IF(INT(B22*10)=B22*10,TEXT(INT(B22),"[$-0804][DBNum2]G/通用格式")&"元整"&TEXT(B22*10-INT(B22)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B22),"[$-0804][DBNum2]G/通用格式")&"元整"&IF(INT(B22*10)=INT(B22)*10,"零",TEXT(RIGHT(INT(B22*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B22*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
  ws['B48'].f = 'B13-(B49*(B16-1))';
  ws['B49'].f = 'INT(B13/B16)';
  ws['B58'].f = 'IF(INT(B59)*100=B59*100,TEXT(INT(B59),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B59*10)=B59*10,TEXT(INT(B59),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B59*10-INT(B59)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B59),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B59*10)=INT(B59)*10,"零",TEXT(RIGHT(INT(B59*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B59*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
  ws['B59'].f = 'TEXT((ABS(B61*(B16-1)-B15)),"0.00")';
  ws['B60'].f = 'IF(INT(B61)*100=B61*100,TEXT(INT(B61),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B61*10)=B61*10,TEXT(INT(B61),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B61*10-INT(B61)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B61),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B61*10)=INT(B61)*10,"零",TEXT(RIGHT(INT(B61*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B61*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
  ws['B61'].f = 'TEXT((ROUND(B49*B14/100,2)),"0.00")';
  ws['B62'].f = 'TEXT((B48+B59),"0.00")';
  ws['B63'].f = 'TEXT((B49+B61),"0.00")';

  ws['A5'].s = {font: {color: {rgb: 'FF0000'}}};
  ws['A53'].s = {font: {color: {rgb: 'FF0000'}}};
  ws['B53'].s = {font: {color: {rgb: 'FF0000'}}};
  ws['B22'].s = {font: {color: {rgb: 'FF0000'}}};
  ws['B15'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['B30'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['B33'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['B42'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['B44'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['B59'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['B61'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['B62'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['B63'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  ws['A48'].s = {fill: {fgColor: {rgb: '993366'}}};
  ws['A49'].s = {fill: {fgColor: {rgb: '993366'}}};
  ws['A64'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
  ws['A65'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
  ws['A66'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
  ws['A67'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
  ws['A68'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
  ws['A69'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
  ws['A70'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
  ws['A71'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
  ws['B12'].s = {fill: {fgColor: {rgb: 'FFFF00'}}};
  ws['B40'].s = {fill: {fgColor: {rgb: 'FFFF00'}}};
  ws['B48'].s = {fill: {fgColor: {rgb: '993366'}}};
  ws['B49'].s = {fill: {fgColor: {rgb: '993366'}}};
}
// 征信1
function createZx1(wb) {
  var ws = getSheet(wb, 48, 8, '征信1');
  ws['!merges'] = [{
    e: {c: 5, r: 46},
    s: {c: 4, r: 46}
  }, {
    e: {c: 7, r: 47},
    s: {c: 4, r: 47}
  }];
  ws['!cols'] = [
    {wch: 10.13},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [];
  ws['!rows'][45] = {hpt: 3.75, hpx: 3.75};
  ws['B48'] = {v: '身份证', t: 's', w: '身份证'};
  ws['E47'].f = '数据!B6';
  ws['E48'].f = '数据!B2';

  ws['B48'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['E47'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['E48'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
}
// 征信2
function createZx2(wb) {
  var ws = getSheet(wb, 48, 8, '征信2');
  ws['!merges'] = [{
    e: {c: 5, r: 46},
    s: {c: 4, r: 46}
  }, {
    e: {c: 7, r: 47},
    s: {c: 4, r: 47}
  }];
  ws['!cols'] = [
    {wch: 9.63},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [];
  ws['!rows'][45] = {hpt: 5.25, hpx: 5.25};
  ws['B48'] = {v: '身份证', t: 's', w: '身份证'};
  ws['E47'].f = '数据!B9';
  ws['E48'].f = '数据!B8';

  ws['B48'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['E47'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['E48'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
}
// 进账单
function createJzd(wb) {
  var ws = getSheet(wb, 8, 7, '进账单');
  ws['!merges'] = [{
    e: {c: 2, r: 2},
    s: {c: 1, r: 2}
  }, {
    e: {c: 2, r: 3},
    s: {c: 1, r: 3}
  }, {
    e: {c: 2, r: 4},
    s: {c: 1, r: 4}
  }, {
    e: {c: 3, r: 6},
    s: {c: 1, r: 6}
  }, {
    e: {c: 2, r: 7},
    s: {c: 0, r: 7}
  }, {
    e: {c: 6, r: 2},
    s: {c: 4, r: 2}
  }];
  ws['!cols'] = [
    {wch: 7.75},
    {wch: 8.38},
    {wch: 8.88},
    {wch: 15.88},
    {wch: 11},
    {wch: 8.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    {hidden: true},
    {hpt: 15.75, hpx: 15.75},
    {hpt: 18, hpx: 18},
    null,
    {hpt: 16.5, hpx: 16.5},
    {hpt: 11.25, hpx: 11.25},
    null,
    {hpt: 54.75, hpx: 54.75}
  ];
  ws['A8'].f = '数据!B53&数据!B1';
  ws['B3'].f = '数据!B1';
  ws['E3'].f = '数据!B27';
  ws['E4'].f = '数据!B28';
  ws['E5'].f = '数据!B29';
  ws['A8'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['B3'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['E3'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['E4'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['E5'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'bottom'}};
}
// 首期入账证明
function createSqrzzm(wb) {
  var ws = getSheet(wb, 8, 8, '首期入账证明');
  ws['!merges'] = [{
    e: {c: 5, r: 2},
    s: {c: 4, r: 2}
  }, {
    e: {c: 5, r: 4},
    s: {c: 2, r: 4}
  }, {
    e: {c: 3, r: 7},
    s: {c: 1, r: 7}
  }, {
    e: {c: 7, r: 3},
    s: {c: 6, r: 3}
  }, {
    e: {c: 5, r: 3},
    s: {c: 1, r: 3}
  }];
  ws['!cols'] = [
    {wch: 8.5},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 11.25},
    {wch: 9.88},
    {wch: 4}
  ];
  ws['!rows'] = [
    null,
    {hpt: 60, hpx: 60},
    {hpt: 24.75, hpx: 24.75},
    {hpt: 21, hpx: 21},
    {hpt: 39, hpx: 39},
    {hpt: 29.25, hpx: 29.25},
    {hpt: 21.75, hpx: 21.75}
  ];
  ws['B4'].f = '数据!B35';
  ws['B8'].f = '数据!B40';
  ws['C5'].f = '数据!B20';
  ws['E3'].f = '数据!B1';
  ws['G4'].f = '数据!B21';

  ws['B4'].s = {font: {sz: 9, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['B8'].s = {font: {sz: 12, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['C5'].s = {font: {sz: 11, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['E3'].s = {font: {sz: 18, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'top'}};
  ws['G4'].s = {font: {sz: 10, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
}
// 温州市分行
function createWzsfh(wb) {
  var ws = getSheet(wb, 11, 9, '温州市分行');
  ws['!merges'] = [{
    e: {c: 5, r: 10},
    s: {c: 3, r: 10}
  }, {
    e: {c: 2, r: 10},
    s: {c: 1, r: 10}
  }, {
    e: {c: 8, r: 8},
    s: {c: 4, r: 8}
  }];
  ws['!cols'] = [
    {wch: 7.38},
    {wch: 8.38},
    {wch: 8.38},
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
    {hpt: 41.25, hpx: 41.25},
    null,
    {hpt: 18, hpx: 18}
  ];
  ws['B11'].f = '数据!B21';
  ws['C9'].f = '数据!B1';
  ws['D11'].f = '数据!B20';
  ws['E9'].f = '数据!B35';

  ws['B11'].s = {font: {sz: 11, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['C9'].s = {font: {sz: 11, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['D11'].s = {font: {sz: 11, name: '楷体_GB2312'}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['E9'].s = {font: {sz: 11, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
}
// 垫资合同车行章
function createDzhtchz(wb) {
  var ws = getSheet(wb, 8, 8, '垫资合同车行章');
  ws['!merges'] = [{
    e: {c: 7, r: 1},
    s: {c: 4, r: 1}
  }, {
    e: {c: 4, r: 2},
    s: {c: 1, r: 2}
  }, {
    e: {c: 8, r: 3},
    s: {c: 4, r: 3}
  }, {
    e: {c: 5, r: 4},
    s: {c: 3, r: 4}
  }, {
    e: {c: 5, r: 5},
    s: {c: 3, r: 5}
  }, {
    e: {c: 6, r: 7},
    s: {c: 4, r: 7}
  }];
  ws['!cols'] = [
    {wch: 6.5},
    {wch: 8.38},
    {wch: 5.75},
    {wch: 14.38},
    {wch: 8.5},
    {wch: 6.25},
    {wch: 8},
    {wch: 6.88}
  ];
  ws['!rows'] = [
    {hpt: 9.75, hpx: 9.75},
    {hpt: 18, hpx: 18},
    {hpt: 18.75, hpx: 18.75},
    {hpt: 18.75, hpx: 18.75},
    {hpt: 18.75, hpx: 18.75},
    {hpt: 24, hpx: 24},
    {hpt: 25.5, hpx: 25.5},
    {hpt: 17.25, hpx: 17.25}
  ];
  ws['B3'].f = '数据!B1';
  ws['D5'].f = '数据!B35';
  ws['D6'].f = '数据!B11';
  ws['E2'] = {v: '温州保利融资担保有限公司', t: 's', w: '温州保利融资担保有限公司'};
  ws['E4'].f = '数据!B27';
  ws['E8'].f = '数据!B39';

  ws['B3'].s = {font: {sz: 12, name: '楷体_GB2312'}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['D5'].s = {font: {sz: 8, name: '楷体_GB2312'}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['D6'].s = {font: {sz: 12, name: '楷体_GB2312'}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['E2'].s = {font: {sz: 12, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'top'}};
  ws['E4'].s = {font: {sz: 12, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['E8'].s = {font: {sz: 10, name: '楷体_GB2312'}, alignment: {horizontal: 'right', vertical: 'bottom'}};
}
// 贷款真实性承诺函
function createDkzsxcnh(wb) {
  var ws = getSheet(wb, 29, 7, '贷款真实性承诺函');
  ws['!merges'] = [{
    e: {c: 6, r: 28},
    s: {c: 4, r: 28}
  }, {
    e: {c: 6, r: 2},
    s: {c: 5, r: 2}
  }, {
    e: {c: 6, r: 23},
    s: {c: 5, r: 23}
  }];
  ws['!cols'] = [
    {wch: 7},
    {wch: 10.25},
    {wch: 7.5},
    {wch: 11.13},
    {wch: 23.38},
    {wch: 4.13},
    {wch: 9.38}
  ];
  ws['!rows'] = [
    {hpt: 60, hpx: 60},
    {hpt: 1.5, hpx: 1.5},
    {hpt: 18.95, hpx: 18.95},
    {hpt: 39.95, hpx: 39.95},
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
    {hpt: 204, hpx: 204},
    {hpt: 3.75, hpx: 3.75},
    {hpt: 28.5, hpx: 28.5}
  ];
  ws['B4'].f = '数据!B16';
  ws['E29'].f = '数据!B2';
  ws['F3'].f = '数据!B12';

  ws['B4'].s = {font: {sz: 12, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['E29'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['F3'].s = {font: {sz: 9}, alignment: {horizontal: 'left', vertical: 'center'}};
}
// 委托授权书
function createWtsqs(wb) {
  var ws = getSheet(wb, 19, 5, '委托授权书');
  ws['!merges'] = [{
    e: {c: 3, r: 3},
    s: {c: 2, r: 3}
  }, {
    e: {c: 6, r: 5},
    s: {c: 4, r: 5}
  }, {
    e: {c: 4, r: 16},
    s: {c: 2, r: 16}
  }, {
    e: {c: 5, r: 14},
    s: {c: 2, r: 14}
  }];
  ws['!cols'] = [
    {wch: 15.75},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    null,
    {hpt: 30.75, hpx: 30.75},
    {hpt: 11.25, hpx: 11.25},
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 47.25, hpx: 47.25},
    {hpt: 33, hpx: 33}
  ];
  ws['B6'].f = '数据!B1';
  ws['C4'] = {v: '温州蝉街支行', t: 's', w: '温州蝉街支行'};
  ws['C15'].f = '数据!B27';
  ws['C17'].f = '数据!B28';
  ws['C19'].f = '数据!B29';
  ws['E6'].f = '数据!B2';

  ws['B6'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['C4'].s = {font: {sz: 10, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['C15'].s = {font: {sz: 12, name: '黑体', bold: true}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['C17'].s = {font: {sz: 12, name: '黑体', bold: true}, alignment: {horizontal: 'left', vertical: 'top'}};
  ws['C19'].s = {font: {sz: 12, name: '黑体', bold: true}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['E6'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
}
// 收入证明
function createSrzm(wb) {
  var ws = getSheet(wb, 16, 8, '收入证明');
  ws['!merges'] = [{
    e: {c: 2, r: 4},
    s: {c: 1, r: 4}
  }, {
    e: {c: 7, r: 4},
    s: {c: 5, r: 4}
  }, {
    e: {c: 2, r: 15},
    s: {c: 1, r: 15}
  }, {
    e: {c: 7, r: 15},
    s: {c: 5, r: 15}
  }];
  ws['!cols'] = [
    {wch: 10},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 10.75},
    {wch: 8.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    {hpt: 11.25, hpx: 11.25},
    null,
    {hpt: 24.75, hpx: 24.75},
    {hpt: 75, hpx: 75},
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 18, hpx: 18},
    {hpt: 6.75, hpx: 6.75},
    {hpt: 0.75, hpx: 0.75},
    {hidden: true}
  ];
  ws['B5'].f = '数据!B1';
  ws['B16'].f = '数据!B7';
  ws['F5'].f = '数据!B2';
  ws['F16'].f = '数据!B8';

  ws['B5'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['B16'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['F5'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['F16'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
}
// 担保人收入证明
function createDbrsrzm(wb) {
  var ws = getSheet(wb, 16, 8, '担保人收入证明');
  ws['!merges'] = [{
    e: {c: 2, r: 4},
    s: {c: 1, r: 4}
  }, {
    e: {c: 7, r: 4},
    s: {c: 5, r: 4}
  }, {
    e: {c: 2, r: 15},
    s: {c: 1, r: 15}
  }, {
    e: {c: 7, r: 15},
    s: {c: 5, r: 15}
  }];
  ws['!cols'] = [
    {wch: 11.13},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 10.75},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    null,
    null,
    null,
    {hpt: 71.25, hpx: 71.25},
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 18, hpx: 18},
    {hpt: 6.75, hpx: 6.75},
    {hpt: 0.75, hpx: 0.75},
    {hidden: true}
  ];
  ws['B5'].f = '数据!B64';
  ws['B16'] = {v: ' ', t: 's', w: ' '};
  ws['F5'].f = '数据!B66';
  ws['F16'] = {v: ' ', t: 's', w: ' '};

  ws['B5'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['B16'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['F5'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['F16'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
}
// 信用卡额度申请表
function createXykedsqb(wb) {
  var ws = getSheet(wb, 33, 7, '信用卡额度申请表');
  ws['!merges'] = [{
    e: {c: 3, r: 4},
    s: {c: 2, r: 4}
  }, {
    e: {c: 5, r: 9},
    s: {c: 2, r: 9}
  }, {
    e: {c: 5, r: 16},
    s: {c: 2, r: 16}
  }, {
    e: {c: 4, r: 21},
    s: {c: 2, r: 21}
  }, {
    e: {c: 5, r: 22},
    s: {c: 2, r: 22}
  }, {
    e: {c: 6, r: 23},
    s: {c: 2, r: 23}
  }, {
    e: {c: 5, r: 31},
    s: {c: 4, r: 31}
  }, {
    e: {c: 6, r: 13},
    s: {c: 6, r: 12}
  }, {
    e: {c: 3, r: 32},
    s: {c: 2, r: 29}
  }, {
    e: {c: 5, r: 13},
    s: {c: 2, r: 12}
  }, {
    e: {c: 4, r: 10},
    s: {c: 2, r: 10}
  }];
  ws['!cols'] = [
    {wch: 7.38},
    {wch: 15.75},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 12.13},
    {wch: 12.13}
  ];
  ws['!rows'] = [
    {hpt: 33, hpx: 33},
    {hpt: 23.25, hpx: 23.25},
    null,
    {hpt: 2.25, hpx: 2.25},
    null,
    null,
    null,
    {hpt: 21, hpx: 21},
    {hpt: 4.5, hpx: 4.5},
    null,
    {hpt: 17.25, hpx: 17.25},
    {hpt: 10.5, hpx: 10.5},
    null,
    null,
    {hpt: 16.5, hpx: 16.5},
    null,
    null,
    null,
    {hpt: 50.25, hpx: 50.25},
    null,
    {hpt: 3.75, hpx: 3.75},
    {hpt: 17.25, hpx: 17.25},
    {hpt: 17.25, hpx: 17.25},
    {hpt: 21, hpx: 21},
    null,
    {hpt: 5.25, hpx: 5.25},
    {hpt: 18, hpx: 18},
    null,
    {hpt: 10.5, hpx: 10.5},
    null,
    {hpt: 0.75, hpx: 0.75},
    {hpt: 9.75, hpx: 9.75}
  ];
  ws['C3'].f = '数据!B1';
  ws['C5'].f = '数据!B2';
  ws['C10'].f = '数据!B23';
  ws['C11'].f = '数据!B24';
  ws['C13'].f = '数据!B3';
  ws['C16'].f = '数据!B7';
  ws['C17'].f = '数据!B25';
  ws['C20'].f = '数据!B7';
  ws['C22'].f = '数据!B8';
  ws['C23'].f = '数据!B25';
  ws['C24'].f = '数据!B10';
  ws['C28'].f = '数据!B16';
  ws['C30'].f = '数据!B27';
  ws['E32'] = {v: '¥' + moneyFormat(B22 * 1000), t: 's', w: '¥' + moneyFormat(B22 * 1000)};
  ws['F3'].f = '数据!B36';
  ws['F8'].f = '数据!B34';
  ws['F20'].f = '数据!B37';
  ws['F27'] = {v: '¥' + moneyFormat(B13 * 1000), t: 's', w: '¥' + moneyFormat(B13 * 1000)};
  ws['F28'] = {v: '购车', t: 's', w: '购车'};
  ws['G3'].f = '数据!B4';
  ws['G5'].f = '数据!B6';
  ws['G10'].f = '数据!B26';
  ws['G13'].f = '数据!B5';
  ws['G16'].f = '数据!B9';
  ws['G20'].f = '数据!B38';
  ws['G22'].f = '数据!B9';
  ws['G27'] = {v: '人民币', t: 's', w: '人民币'};
  ws['G32'] = {v: '¥' + moneyFormat(B13 * 1000), t: 's', w: '¥' + moneyFormat(B13 * 1000)};

  ws['C3'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['C5'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['C10'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['C11'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['C13'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['C16'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['C17'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['C20'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['C22'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['C23'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['C24'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['C28'].s = {font: {sz: 10, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['C30'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom', wrapText: true}};
  ws['E32'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['F3'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['F8'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['F20'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['F27'].s = {font: {sz: 9}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['F28'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['G3'].s = {font: {sz: 8}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['G5'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['G10'].s = {font: {sz: 8}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['G13'].s = {font: {sz: 8}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['G16'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['G20'].s = {font: {sz: 7}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['G22'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['G27'].s = {font: {sz: 7}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['G32'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'bottom'}};
}
// 共同还款人承诺书
function createGthkrcns(wb) {
  var ws = getSheet(wb, 26, 8, '共同还款人承诺书');
  ws['!merges'] = [{
    e: {c: 4, r: 9},
    s: {c: 3, r: 9}
  }, {
    e: {c: 7, r: 9},
    s: {c: 6, r: 9}
  }, {
    e: {c: 7, r: 11},
    s: {c: 6, r: 11}
  }, {
    e: {c: 6, r: 21},
    s: {c: 4, r: 21}
  }, {
    e: {c: 6, r: 13},
    s: {c: 4, r: 12}
  }];
  ws['!cols'] = [
    {wch: 11.75},
    {wch: 10.75},
    {wch: 1.63},
    {wch: 10},
    {wch: 12.13},
    {wch: 8.38},
    {wch: 6},
    {wch: 6.38}
  ];
  ws['!rows'] = [
    null,
    {hpt: 14.25, hpx: 14.25},
    {hidden: true, hpt: 23.25, hpx: 23.25},
    {hpt: 45, hpx: 45},
    {hpt: 24, hpx: 24},
    null,
    null,
    null,
    {hpt: 12.75, hpx: 12.75},
    null,
    {hpt: 4.5, hpx: 4.5},
    {hpt: 18, hpx: 18},
    {hpt: 14.25, hpx: 14.25},
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 28.5, hpx: 28.5},
    {hidden: true, hpt: 9.75, hpx: 9.75},
    {hpt: 21.75, hpx: 21.75},
    null,
    {hpt: 0.75, hpx: 0.75},
    {hpt: 27, hpx: 27}
  ];
  ws['B26'] = {v: '¥' + moneyFormat(B13 * 1000), t: 's', w: '¥' + moneyFormat(B13 * 1000)};
  ws['C13'].f = '数据!B26';
  ws['D5'].f = '数据!B7';
  ws['D10'].f = '数据!B8';
  ws['D12'].f = '数据!B25';
  ws['D26'].f = '数据!B16';
  ws['E22'].f = '数据!B2';
  ws['F5'].f = '数据!B37';
  ws['G10'].f = '数据!B9';
  ws['G12'].f = '数据!B52';
  ws['H22'].f = '数据!B1';
  ws['H25'] = {v: ' ', t: 's', w: ' '};

  ws['B26'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['C13'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['D5'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
  ws['D10'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['D12'].s = {font: {sz: 8}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['D26'].s = {font: {sz: 9, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['E22'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['F5'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['G10'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['G12'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['H22'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['H25'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
}
// 担保人共同还款承诺书
function createDbrgthkcns(wb) {
  var ws = getSheet(wb, 27, 8, '担保人共同还款承诺书');
  ws['!merges'] = [{
    e: {c: 4, r: 9},
    s: {c: 2, r: 9}
  }, {
    e: {c: 7, r: 9},
    s: {c: 6, r: 9}
  }, {
    e: {c: 4, r: 11},
    s: {c: 2, r: 11}
  }, {
    e: {c: 7, r: 11},
    s: {c: 6, r: 11}
  }, {
    e: {c: 4, r: 12},
    s: {c: 2, r: 12}
  }, {
    e: {c: 5, r: 21},
    s: {c: 4, r: 21}
  }];
  ws['!cols'] = [
    {wch: 8.88},
    {wch: 11},
    {wch: 12.63},
    {wch: 8.38},
    {wch: 12.13},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    null,
    null,
    {hpt: 26.25, hpx: 26.25},
    {hpt: 28.5, hpx: 28.5},
    null,
    null,
    null,
    null,
    {hpt: 19.5, hpx: 19.5},
    null,
    {hpt: 8.25, hpx: 8.25},
    null,
    {hpt: 16.5, hpx: 16.5},
    null,
    null,
    null,
    null,
    null,
    {hpt: 18.75, hpx: 18.75},
    {hpt: 23.25, hpx: 23.25},
    {hidden: true, hpt: 9.75, hpx: 9.75},
    {hpt: 21.75, hpx: 21.75},
    {hpt: 18.75, hpx: 18.75},
    {hpt: 0.75, hpx: 0.75},
    {hpt: 12.75, hpx: 12.75},
    {hpt: 9.75, hpx: 9.75}
  ];
  ws['B27'] = {v: '¥' + moneyFormat(B13 * 1000), t: 's', w: '¥' + moneyFormat(B13 * 1000)};
  ws['C10'].f = '数据!B66';
  ws['C12'].f = '数据!B23';
  ws['C13'].f = '数据!B24';
  ws['D5'].f = '数据!B64';
  ws['D27'].f = '数据!B16';
  ws['E22'].f = '数据!B2';
  ws['F5'].f = '数据!B65';
  ws['G10'].f = '数据!B67';
  ws['G12'] = {v: ' ', t: 's', w: ' '};
  ws['G22'].f = '数据!B1';
  ws['G26'] = {v: ' ', t: 's', w: ' '};

  ws['B27'].s = {font: {sz: 8}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['C10'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['C12'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['C13'].s = {font: {sz: 7}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['D5'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['D27'].s = {font: {sz: 8, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['E22'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['F5'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['G10'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['G12'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['G22'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['G26'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
}
// 汽车购销合同
function createQcgxht(wb) {
  var ws = getSheet(wb, 20, 8, '汽车购销合同');
  ws['!merges'] = [{
    e: {c: 3, r: 14},
    s: {c: 2, r: 14}
  }, {
    e: {c: 5, r: 15},
    s: {c: 3, r: 15}
  }, {
    e: {c: 3, r: 18},
    s: {c: 2, r: 18}
  }, {
    e: {c: 4, r: 19},
    s: {c: 2, r: 19}
  }, {
    e: {c: 6, r: 19},
    s: {c: 5, r: 19}
  }, {
    e: {c: 4, r: 6},
    s: {c: 2, r: 6}
  }, {
    e: {c: 7, r: 13},
    s: {c: 3, r: 13}
  }];
  ws['!cols'] = [
    {wch: 8.38},
    {wch: 6.88},
    {wch: 8.38},
    {wch: 9.88},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    null,
    null,
    null,
    {hpt: 9, hpx: 9},
    {hidden: true},
    {hpt: 10.5, hpx: 10.5},
    null,
    null,
    null,
    null,
    null,
    {hpt: 20.25, hpx: 20.25},
    {hpt: 35.25, hpx: 35.25},
    null,
    {hpt: 17.25, hpx: 17.25},
    {hpt: 17.25, hpx: 17.25},
    null,
    {hpt: 3, hpx: 3}
  ];
  ws['C7'].f = '数据!B27';
  ws['C9'].f = '数据!B1';
  ws['C15'].f = '数据!B21';
  ws['C19'] = {v: '¥' + moneyFormat(B22 * 1000), t: 's', w: '¥' + moneyFormat(B22 * 1000)};
  ws['C20'].f = '数据!B47';
  ws['D14'].f = '数据!B35';
  ws['D16'].f = '数据!B20';
  ws['F20'] = {v: '壹', t: 's', w: '壹'};

  ws['C7'].s = {font: {sz: 12, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['C9'].s = {font: {sz: 12, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['C15'].s = {font: {sz: 12, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['C19'].s = {font: {sz: 12, name: '楷体_GB2312'}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['C20'].s = {font: {sz: 10, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['D14'].s = {font: {sz: 10, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['D16'].s = {font: {sz: 12, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['F20'].s = {font: {sz: 10, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
}
// 合同封面
function createHtfm(wb) {
  var ws = getSheet(wb, 25, 6, '合同封面');
  ws['!merges'] = [{
    e: {c: 3, r: 20},
    s: {c: 2, r: 20}
  }, {
    e: {c: 3, r: 23},
    s: {c: 2, r: 23}
  }, {
    e: {c: 5, r: 23},
    s: {c: 4, r: 23}
  }, {
    e: {c: 5, r: 24},
    s: {c: 2, r: 24}
  }];
  ws['!cols'] = [
    {wch: 8.38},
    {wch: 17.38},
    {wch: 8.38},
    {wch: 12},
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
    {hpt: 24, hpx: 24},
    {hpt: 225.75, hpx: 225.75},
    {hidden: true, hpt: 6, hpx: 6},
    {hpt: 18, hpx: 18},
    {hpt: 16.5, hpx: 16.5},
    {hpt: 58.5, hpx: 58.5},
    {hpt: 21.75, hpx: 21.75},
    {hpt: 24, hpx: 24}
  ];
  ws['C21'].f = '数据!B1';
  ws['C24'].f = '数据!B1';
  ws['C25'] = {v: ' ', t: 's', w: ' '};
  ws['E24'].f = '数据!B7';

  ws['C21'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['C24'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['C25'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['E24'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
}
// 合同6
function createHt6(wb) {
  var ws = getSheet(wb, 58, 8, '合同6');
  ws['!merges'] = [{
    e: {c: 3, r: 24},
    s: {c: 2, r: 24}
  }, {
    e: {c: 4, r: 25},
    s: {c: 3, r: 25}
  }, {
    e: {c: 6, r: 28},
    s: {c: 2, r: 28}
  }, {
    e: {c: 3, r: 30},
    s: {c: 2, r: 30}
  }, {
    e: {c: 6, r: 30},
    s: {c: 4, r: 30}
  }, {
    e: {c: 4, r: 31},
    s: {c: 2, r: 31}
  }, {
    e: {c: 7, r: 31},
    s: {c: 5, r: 31}
  }, {
    e: {c: 7, r: 32},
    s: {c: 2, r: 32}
  }, {
    e: {c: 5, r: 34},
    s: {c: 4, r: 34}
  }, {
    e: {c: 7, r: 34},
    s: {c: 6, r: 34}
  }, {
    e: {c: 4, r: 35},
    s: {c: 3, r: 35}
  }, {
    e: {c: 6, r: 35},
    s: {c: 5, r: 35}
  }, {
    e: {c: 6, r: 42},
    s: {c: 5, r: 42}
  }, {
    e: {c: 2, r: 43},
    s: {c: 2, r: 42}
  }, {
    e: {c: 5, r: 26},
    s: {c: 2, r: 26}
  }];
  ws['!cols'] = [
    {wch: 5.75},
    {wch: 8.88},
    {wch: 10},
    {wch: 9.5},
    {wch: 11.25},
    {wch: 8.38},
    {wch: 13.13},
    {wch: 13.25}
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
    {hpt: 21.75, hpx: 21.75},
    {hpt: 53.25, hpx: 53.25},
    {hpt: 18.75, hpx: 18.75},
    {hpt: 17.25, hpx: 17.25},
    {hpt: 15, hpx: 15},
    {hpt: 18, hpx: 18},
    {hpt: 14.25, hpx: 14.25},
    {hidden: true, hpt: 3.75, hpx: 3.75},
    {hpt: 15, hpx: 15},
    {hpt: 14.25, hpx: 14.25},
    {hpt: 20.25, hpx: 20.25},
    {hpt: 9, hpx: 9},
    {hpt: 21, hpx: 21},
    {hpt: 15.75, hpx: 15.75},
    {hidden: true, hpt: 11.25, hpx: 11.25},
    {hidden: true, hpt: 14.25, hpx: 14.25},
    {hidden: true, hpt: 14.25, hpx: 14.25},
    {hpt: 17.25, hpx: 17.25},
    {hpt: 16.5, hpx: 16.5},
    {hpt: 57.75, hpx: 57.75},
    {hpt: 21, hpx: 21},
    {hpt: 35.25, hpx: 35.25},
    {hidden: true, hpt: 21.75, hpx: 21.75},
    {hidden: true, hpt: 14.25, hpx: 14.25},
    {hpt: 44.25, hpx: 44.25},
    {hidden: true, hpt: 10.5, hpx: 10.5},
    {hpt: 27, hpx: 27},
    {hpt: 24.75, hpx: 24.75},
    null,
    null,
    null,
    null,
    null,
    {hpt: 24.75, hpx: 24.75},
    {hpt: 18.75, hpx: 18.75},
    {hpt: 18.75, hpx: 18.75}
  ];
  ws['B43'] = {v: 1, t: 'n', w: '1'};
  ws['C25'].f = '数据!B1';
  ws['C27'].f = '数据!B3';
  ws['C29'] = {v: '温州市蝉街113号', t: 's', w: '温州市蝉街113号'};
  ws['C31'].f = '数据!B1';
  ws['C32'].f = '数据!B2';
  ws['C33'].f = '数据!B3';
  ws['C40'] = {v: '/', t: 's', w: '/'};
  ws['C43'].f = '数据!B35';
  ws['D26'].f = '数据!B2';
  ws['D36'].f = '数据!B11';
  ws['D43'].f = '数据!B19';
  ws['E31'].f = '数据!B7';
  ws['E35'].f = '数据!B11';
  ws['E40'] = {v: '/', t: 's', w: '/'};
  ws['E41'].f = '数据!B16';
  ws['E43'].f = '数据!B21';
  ws['F28'] = {v: '温州蝉街', t: 's', w: '温州蝉街'};
  ws['F32'].f = '数据!B8';
  ws['F36'] = {v: '¥' + moneyFormat(B13 * 1000), t: 's', w: '¥' + moneyFormat(B13 * 1000)};
  ws['F43'].f = '数据!B20';
  ws['G35'] = {v: '¥' + moneyFormat(B13 * 1000), t: 's', w: '¥' + moneyFormat(B13 * 1000)};
  ws['G44'] = {v: '¥' + moneyFormat(B13 * 1000), t: 's', w: '¥' + moneyFormat(B13 * 1000)};
  ws['H44'].f = '数据!B14';

  ws['B43'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['C25'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['C27'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['C29'].s = {font: {sz: 11, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['C31'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['C32'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['C33'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['C40'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['C43'].s = {font: {sz: 7}, alignment: {horizontal: 'left', vertical: 'top', wrapText: true}};
  ws['D26'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['D36'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['D43'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['E31'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['E35'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['E40'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['E41'].s = {font: {sz: 10, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['E43'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['F28'].s = {font: {sz: 9, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['F32'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['F36'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['F43'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['G35'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['G44'].s = {font: {sz: 8}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['H44'].s = {font: {sz: 8, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'center', vertical: 'bottom'}};
}
// 合同7
function createHt7(wb) {
  var ws = getSheet(wb, 40, 9, '合同7');
  ws['!merges'] = [{
    e: {c: 7, r: 2},
    s: {c: 5, r: 2}
  }, {
    e: {c: 5, r: 4},
    s: {c: 4, r: 4}
  }, {
    e: {c: 7, r: 4},
    s: {c: 6, r: 4}
  }, {
    e: {c: 2, r: 10},
    s: {c: 1, r: 10}
  }, {
    e: {c: 4, r: 10},
    s: {c: 3, r: 10}
  }, {
    e: {c: 8, r: 10},
    s: {c: 7, r: 10}
  }, {
    e: {c: 4, r: 12},
    s: {c: 3, r: 12}
  }, {
    e: {c: 6, r: 16},
    s: {c: 5, r: 16}
  }, {
    e: {c: 4, r: 16},
    s: {c: 3, r: 16}
  }, {
    e: {c: 6, r: 17},
    s: {c: 5, r: 17}
  }, {
    e: {c: 4, r: 17},
    s: {c: 3, r: 17}
  }, {
    e: {c: 8, r: 29},
    s: {c: 5, r: 29}
  }, {
    e: {c: 4, r: 30},
    s: {c: 3, r: 30}
  }, {
    e: {c: 4, r: 32},
    s: {c: 3, r: 32}
  }, {
    e: {c: 4, r: 33},
    s: {c: 3, r: 33}
  }, {
    e: {c: 1, r: 43},
    s: {c: 1, r: 42}
  }, {
    e: {c: 2, r: 44},
    s: {c: 2, r: 42}
  }, {
    e: {c: 3, r: 43},
    s: {c: 3, r: 42}
  }, {
    e: {c: 4, r: 43},
    s: {c: 4, r: 42}
  }, {
    e: {c: 5, r: 43},
    s: {c: 5, r: 42}
  }, {
    e: {c: 8, r: 33},
    s: {c: 8, r: 32}
  }, {
    e: {c: 2, r: 32},
    s: {c: 1, r: 31}
  }, {
    e: {c: 7, r: 19},
    s: {c: 6, r: 19}
  }];
  ws['!cols'] = [
    {wch: 8.75},
    {wch: 9},
    {wch: 9.63},
    {wch: 7.13},
    {wch: 10.88},
    {wch: 6.5},
    {wch: 4},
    {wch: 8.25},
    {wch: 10}
  ];
  ws['!rows'] = [
    null,
    {hpt: 33.75, hpx: 33.75},
    {hpt: 18.75, hpx: 18.75},
    {hpt: 14.25, hpx: 14.25},
    {hpt: 29.25, hpx: 29.25},
    {hpt: 16.5, hpx: 16.5},
    {hpt: 20.25, hpx: 20.25},
    {hpt: 32.25, hpx: 32.25},
    {hidden: true, hpt: 16.5, hpx: 16.5},
    {hpt: 1.5, hpx: 1.5},
    {hpt: 20.25, hpx: 20.25},
    {hpt: 12.75, hpx: 12.75},
    {hpt: 11.25, hpx: 11.25},
    {hidden: true, hpt: 42.75, hpx: 42.75},
    {hidden: true, hpt: 1.5, hpx: 1.5},
    {hpt: 63.75, hpx: 63.75},
    {hpt: 22.5, hpx: 22.5},
    {hpt: 21, hpx: 21},
    {hpt: 36.75, hpx: 36.75},
    {hpt: 22.5, hpx: 22.5},
    {hpt: 26.25, hpx: 26.25},
    {hidden: true, hpt: 14.25, hpx: 14.25},
    {hpt: 42.75, hpx: 42.75},
    {hpt: 40.5, hpx: 40.5},
    {hpt: 72.75, hpx: 72.75},
    {hidden: true, hpt: 31.5, hpx: 31.5},
    {hidden: true, hpt: 21.75, hpx: 21.75},
    {hidden: true, hpt: 10.5, hpx: 10.5},
    {hidden: true, hpt: 15.75, hpx: 15.75},
    {hpt: 14.25, hpx: 14.25},
    {hpt: 3, hpx: 3},
    null,
    null,
    {hpt: 17.25, hpx: 17.25},
    null,
    null,
    null,
    {hpt: 47.25, hpx: 47.25},
    {hpt: 28.5, hpx: 28.5}
  ];
  ws['B11'].f = '数据!B58';
  ws['B13'] = {v: '¥' + moneyFormat(B61 * 1000), t: 's', w: '¥' + moneyFormat(B61 * 1000)};
  ws['B32'].f = '数据!B28';
  ws['D3'] = {v: '/', t: 's', w: '/'};
  ws['D11'] = {v: '¥' + moneyFormat(B59 * 1000), t: 's', w: '¥' + moneyFormat(B59 * 1000)};
  ws['D17'].f = '数据!B41';
  ws['D18'].f = '数据!B43';
  ws['D34'].f = '数据!B31';
  ws['E3'] = {v: '/', t: 's', w: '/'};
  ws['E5'].f = '数据!B17';
  ws['F17'] = {v: '¥' + moneyFormat(B42 * 1000), t: 's', w: '¥' + moneyFormat(B42 * 1000)};
  ws['F18'] = {v: '¥' + moneyFormat(B44 * 1000), t: 's', w: '¥' + moneyFormat(B44 * 1000)};
  ws['F30'].f = '数据!B27';
  ws['G5'] = {v: '¥' + moneyFormat(B15 * 1000), t: 's', w: '¥' + moneyFormat(B15 * 1000)};
  ws['G20'].f = '数据!B1';
  ws['H11'].f = '数据!B60';

  ws['B11'].s = {font: {sz: 8, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['B13'].s = {font: {sz: 8, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['B32'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'top'}};
  ws['D3'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['D11'].s = {font: {sz: 8, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['D17'].s = {font: {sz: 8, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['D18'].s = {font: {sz: 8, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['D34'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['E3'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['E5'].s = {font: {sz: 7}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['F17'].s = {font: {sz: 10, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['F18'].s = {font: {sz: 10, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['F30'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['G5'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['G20'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['H11'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'bottom'}};
}
// 合同8
function createHt8(wb) {
  var ws = getSheet(wb, 44, 8, '合同8');
  ws['!merges'] = [{
    e: {c: 4, r: 1},
    s: {c: 3, r: 1}
  }, {
    e: {c: 2, r: 37},
    s: {c: 1, r: 37}
  }, {
    e: {c: 2, r: 43},
    s: {c: 1, r: 43}
  }, {
    e: {c: 0, r: 5},
    s: {c: 0, r: 4}
  }, {
    e: {c: 1, r: 6},
    s: {c: 1, r: 4}
  }, {
    e: {c: 2, r: 6},
    s: {c: 2, r: 4}
  }, {
    e: {c: 3, r: 6},
    s: {c: 3, r: 4}
  }, {
    e: {c: 4, r: 6},
    s: {c: 4, r: 4}
  }, {
    e: {c: 5, r: 6},
    s: {c: 5, r: 4}
  }, {
    e: {c: 7, r: 6},
    s: {c: 7, r: 4}
  }];
  ws['!cols'] = [
    {wch: 9.75},
    {wch: 8.38},
    {wch: 10},
    {wch: 7.88},
    {wch: 7.38},
    {wch: 10.88},
    {wch: 7.13},
    {wch: 13.25}
  ];
  ws['!rows'] = [
    {hpt: 9, hpx: 9},
    {hpt: 9, hpx: 9},
    {hidden: true, hpt: 61.5, hpx: 61.5},
    {hpt: 2.25, hpx: 2.25},
    null,
    null,
    {hpt: 38.25, hpx: 38.25},
    {hpt: 12.75, hpx: 12.75},
    {hidden: true},
    {hidden: true},
    {hpt: 22.5, hpx: 22.5},
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 26.25, hpx: 26.25},
    {hpt: 18.75, hpx: 18.75},
    {hpt: 13.5, hpx: 13.5},
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 9, hpx: 9},
    null,
    {hpt: 13.5, hpx: 13.5},
    {hidden: true},
    {hidden: true, hpt: 11.25, hpx: 11.25},
    {hidden: true},
    {hpt: 97.5, hpx: 97.5},
    {hidden: true},
    {hidden: true},
    {hidden: true},
    {hidden: true},
    {hidden: true},
    {hidden: true},
    {hidden: true}
  ];
  ws['A12'] = {v: '(二)', t: 's', w: '(二)'};
  ws['B5'].f = '数据!B18';
  ws['B44'] = {v: '温州蝉街支行', t: 's', w: '温州蝉街支行'};
  ws['C5'].f = '数据!B35';
  ws['C19'] = {v: '肆', t: 's', w: '肆'};
  ws['C34'] = {v: ' ', t: 's', w: ' '};
  ws['D5'].f = '数据!B19';
  ws['E5'].f = '数据!B21';
  ws['F5'].f = '数据!B20';
  ws['H5'] = {v: '¥' + moneyFormat(B22 * 1000), t: 's', w: '¥' + moneyFormat(B22 * 1000)};

  ws['A12'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['B5'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['B44'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['C5'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'bottom', wrapText: true}};
  ws['C19'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['D5'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'center'}};
  ws['E5'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'center', wrapText: true}};
  ws['F5'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'center'}};
  ws['H5'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'center'}};
}
// 保证协议1
function createBzxy1(wb) {
  var ws = getSheet(wb, 43, 8, '保证协议1');
  ws['!merges'] = [{
    e: {c: 4, r: 6},
    s: {c: 1, r: 6}
  }, {
    e: {c: 5, r: 15},
    s: {c: 3, r: 15}
  }, {
    e: {c: 7, r: 15},
    s: {c: 6, r: 15}
  }, {
    e: {c: 4, r: 17},
    s: {c: 2, r: 17}
  }, {
    e: {c: 6, r: 17},
    s: {c: 5, r: 17}
  }, {
    e: {c: 4, r: 4},
    s: {c: 2, r: 4}
  }];
  ws['!cols'] = [
    {wch: 9.5},
    {wch: 8.38},
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
    {hpt: 14.25, hpx: 14.25},
    {hpt: 30, hpx: 30},
    null,
    null,
    null,
    {hpt: 30, hpx: 30},
    {hpt: 21, hpx: 21},
    null,
    null,
    null,
    {hpt: 30.75, hpx: 30.75},
    null,
    null,
    {hpt: 21, hpx: 21},
    {hpt: 8.25, hpx: 8.25},
    null,
    {hpt: 9.75, hpx: 9.75},
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
    {hpt: 15, hpx: 15},
    {hpt: 20.25, hpx: 20.25}
  ];
  ws['B7'] = {v: '温州保利融资担保有限公司', t: 's', w: '温州保利融资担保有限公司'};
  ws['B43'] = {v: '(二)', t: 's', w: '(二)'};
  ws['C5'] = {v: '股份有限公司温州蝉街支行', t: 's', w: '股份有限公司温州蝉街支行'};
  ws['C18'].f = '数据!B11';
  ws['C20'] = {v: '/', t: 's', w: '/'};
  ws['D16'].f = '数据!B11';
  ws['E15'].f = '数据!B1';
  ws['F18'] = {v: '¥' + moneyFormat(B13 * 1000), t: 's', w: '¥' + moneyFormat(B13 * 1000)};
  ws['F20'] = {v: '/', t: 's', w: '/'};
  ws['G16'] = {v: '¥' + moneyFormat(B13 * 1000), t: 's', w: '¥' + moneyFormat(B13 * 1000)};
  ws['H9'].f = '数据!B1';

  ws['B7'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['B43'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['C5'].s = {font: {sz: 10, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['C18'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['C20'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['D16'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['E15'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  ws['F18'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['F20'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['G16'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['H9'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
}
// 保证协议2
function createBzxy2(wb) {
  var ws = getSheet(wb, 23, 8, '保证协议2');
  ws['!merges'] = [{
    e: {c: 8, r: 10},
    s: {c: 0, r: 10}
  }, {
    e: {c: 8, r: 11},
    s: {c: 0, r: 11}
  }, {
    e: {c: 2, r: 22},
    s: {c: 1, r: 22}
  }];
  ws['!cols'] = [
    {wch: 9.63},
    {wch: 12.88},
    {wch: 11.25},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38},
    {wch: 8.38}
  ];
  ws['!rows'] = [
    null,
    {hpt: 9.75, hpx: 9.75},
    null,
    null,
    {hpt: 7.5, hpx: 7.5},
    {hpt: 12.75, hpx: 12.75},
    {hpt: 21, hpx: 21},
    {hpt: 14.25, hpx: 14.25},
    {hidden: true, hpt: 1.5, hpx: 1.5},
    {hidden: true},
    {hpt: 17.25, hpx: 17.25},
    {hpt: 21.75, hpx: 21.75},
    null,
    null,
    null,
    null,
    null,
    null,
    {hpt: 17.25, hpx: 17.25}
  ];
  ws['A11'] = {v: '1、朱虹、徐国荣提供全程连带责任保证，详见最高额保证合同编号2017温蝉保利保证A。', t: 's', w: '1、朱虹、徐国荣提供全程连带责任保证，详见最高额保证合同编号2017温蝉保利保证A。'};
  ws['A12'] = {v: '2、本合同生效后，机动车所有人方委托金融机构方办理相关车辆抵押或解除抵押手续。', t: 's', w: '2、本合同生效后，机动车所有人方委托金融机构方办理相关车辆抵押或解除抵押手续。'};
  ws['B23'] = {v: '温州蝉街支行', t: 's', w: '温州蝉街支行'};
  ws['C7'] = {v: '肆', t: 's', w: '肆'};

  ws['A11'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['A12'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  ws['B23'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  ws['C7'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
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