import { getWorkbook } from 'common/js/xlsx-util';
import { moneyFormat, moneyReplaceComma } from 'common/js/util';
export function exportCCBDy(data) {
    const wb = getWorkbook();
    createData(wb, data);
    createXycdydjb(wb);
    createWtsGh(wb);
    createGpWtsQtyh(wb);
    createXecdydjb(wb);
    createGssqwts(wb);
    createTjysqwt(wb);
    createDbht(wb);
    createDyht(wb);
    // download
    wb.downloadXls('建设银行-抵押');
  }
  // 内容
  function createData(wb, data) {
    let year = data.customerBirth.substr(0, 4);
    let month = data.customerBirth.substr(4, 2) - 0;
    let day = data.customerBirth.substr(6, 2) - 0;
    let arr01 = ['', '普通', '白金'];
    let arr = [
      ['主贷人姓名', data.customerName],
      ['身份证件号码', data.idNo],
      ['配偶姓名', data.ghRealName],
      ['身份证件号码', data.ghIdNo],
      ['家庭住址', data.applyNowAddress],
      ['合同编号', data.bankContractCode],
      ['车架号', data.frameNo],
      ['车牌号', data.carNumber],
      ['发动机号', data.engineNo],
      ['贷款额（大写）', ''],
      ['贷款额（小写）', moneyReplaceComma(moneyFormat(data.loanAmount)) * 1000 / 1000],
      ['履约保证金（大写）', ''],
      ['履约保证金（小写）', ''],
      ['年份', year],
      ['月', month],
      ['日', day],
      ['贷款期限（年）', data.loanPeriods / 12],
      ['银行委托人', '银行委托人'],
      ['银行名称', '银行名称'],
      ['银行地址', '银行地址'],
      ['银行电话', '银行电话'],
      ['委托书有效期', '委托书有效期'],
      ['授权人姓名', '授权人姓名'],
      ['授权人身份证', '授权人身份证'],
      ['授权人住址', '授权人住址'],
      ['授权人电话', '授权人电话'],
      ['信用卡类型', '信用卡类型'],
      ['信用卡名称', '信用卡名称'],
      ['所属地区', '所属地区']
    ];
    var ws = wb.getSheet(arr, '内容');
    ws['!cols'] = [{
      wch: 18.63
    }, {
      wch: 56.88
    }];
    ws['B10'].f = 'TEXT(INT(ROUND(B11,2)),"[$-0804][DBNum2]G/通用格式")';
    ws['B12'].f = 'IF(INT(ROUND(B13,2))*100=ROUND(B13,2)*100,TEXT(INT(ROUND(B13,2)),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(ROUND(B13,2)*10)=ROUND(B13,2)*10,TEXT(INT(ROUND(B13,2)),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(ROUND(B13,2)*10-INT(ROUND(B13,2))*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(ROUND(B13,2)),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(ROUND(B13,2)*10)=INT(ROUND(B13,2))*10,"零",TEXT(RIGHT(INT(ROUND(B13,2)*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(ROUND(B13,2)*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B13'].f = 'B11*0.03';

    ws['A22'].s = {font: {color: {rgb: 'FF0000'}}};
    ws['A29'].s = {font: {color: {rgb: 'FF0000'}}};
    ws['B22'].s = {font: {color: {rgb: 'FF0000'}}};
    ws['B29'].s = {font: {color: {rgb: 'FF0000'}}};
    ws['A13'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  }
  // 新一次抵押登记表
  function createXycdydjb(wb) {
    var ws = getSheet(wb, 23, 7, '新一次抵押登记表');
    ws['!merges'] = [{
      e: {c: 3, r: 5},
      s: {c: 2, r: 5}
    }, {
      e: {c: 4, r: 9},
      s: {c: 2, r: 9}
    }, {
      e: {c: 3, r: 15},
      s: {c: 2, r: 15}
    }, {
      e: {c: 5, r: 16},
      s: {c: 2, r: 16}
    }, {
      e: {c: 5, r: 19},
      s: {c: 2, r: 19}
    }, {
      e: {c: 5, r: 22},
      s: {c: 4, r: 22}
    }];
    ws['!cols'] = [
      {wch: 8.38},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 19.88},
      {wch: 11}
    ];
    ws['!rows'] = [
      null,
      null,
      {hpt: 37.5, hpx: 37.5},
      {hidden: true},
      {hidden: true},
      {hpt: 34.5, hpx: 34.5},
      null,
      null,
      {hpt: 36.75, hpx: 36.75},
      {hpt: 33.75, hpx: 33.75},
      null,
      null,
      null,
      {hpt: 112.5, hpx: 112.5},
      null,
      null,
      null,
      null,
      {hpt: 19.5, hpx: 19.5},
      null,
      null,
      {hpt: 26.25, hpx: 26.25}
    ];
    ws['C6'] = {v: '小型汽车', t: 's', w: '小型汽车'};
    ws['C10'].f = '内容!B1';
    ws['C17'].f = 'IF(内容!B29="温州",内容!B19,IF(内容!B18="陈建忠",内容!B19,IF(内容!B19<>"中国工商银行股份有限公司温州城东支行",内容!B19,"")))';
    ws['C20'].f = 'IF(内容!B19<>"中国工商银行股份有限公司温州城东支行",内容!B20,"")';
    ws['E23'].f = 'IF(内容!B19<>"中国工商银行股份有限公司温州城东支行",内容!B21,"")';
    ws['G6'].f = '内容!B7';

    ws['C6'].s = {font: {sz: 18}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C10'].s = {font: {sz: 18}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['C17'].s = ws['C20'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['E23'].s = {alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['G6'].s = {font: {sz: 14}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  }
  // 委托书 (工行)
  function createWtsGh(wb) {
    var ws = getSheet(wb, 23, 8, '委托书 (工行)');
    ws['!merges'] = [{
      e: {c: 3, r: 8},
      s: {c: 2, r: 8}
    }, {
      e: {c: 2, r: 11},
      s: {c: 1, r: 11}
    }, {
      e: {c: 3, r: 21},
      s: {c: 0, r: 21}
    }];
    ws['!cols'] = [
      {wch: 8.38},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 10.88},
      {wch: 8.38},
      {wch: 6.5},
      {wch: 8.38},
      {wch: 8.38}
    ];
    ws['!rows'] = [
      null,
      null,
      null,
      null,
      {hpt: 21, hpx: 21},
      null,
      null,
      {hpt: 5.25, hpx: 5.25},
      {hpt: 30, hpx: 30},
      {hpt: 1.5, hpx: 1.5},
      {hidden: true, hpt: 0.75, hpx: 0.75},
      {hpt: 31.5, hpx: 31.5},
      null,
      null,
      null,
      null,
      {hpt: 10.5, hpx: 10.5}
    ];
    ws['A22'].f = '内容!B19';
    ws['B12'] = {v: '抵押登记', t: 's', w: '抵押登记'};
    ws['H9'].f = '内容!B7';

    ws['A22'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B12'].s = {font: {sz: 16}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['H9'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
  }
  // 委托书 （其他银行）
  function createGpWtsQtyh(wb) {
    // 设置当前页面的的行数，列数，名称
    var ws = getSheet(wb, 17, 5, '委托书 （其他银行）');
    // 合并单元格
    ws['!merges'] = [{
      e: {c: 3, r: 8},
      s: {c: 2, r: 8}
    }, {
      e: {c: 2, r: 11},
      s: {c: 1, r: 11}
    }];
    // 设置列宽
    ws['!cols'] = [
      {wch: 8.38},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 10},
      {wch: 8.38}
    ];
    // 设置行高
    ws['!rows'] = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      {hpt: 11.25, hpx: 11.25},
      {hpt: 12.95, hpx: 12.95},
      {hpt: 1.5, hpx: 1.5},
      {hidden: true, hpt: 0.75, hpx: 0.75},
      {hpt: 29.25, hpx: 29.25},
      null,
      null,
      {hpt: 36.75, hpx: 36.75},
      {hpt: 36.75, hpx: 36.75}
    ];
    // 设置表格内容
    ws['B12'].f = '内容!B7';
    ws['C9'].f = '内容!B18';
    ws['C16'] = {v: ' ', t: 's', w: ' '};
    ws['E16'].f = '内容!B22';
    // 设置表格样式
    ws['B12'].s = {font: {sz: 16}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C9'].s = {font: {sz: 19}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['C16'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['E16'].s = {font: {sz: 14}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  }
  // 新二次抵押登记表
  function createXecdydjb(wb) {
    // 设置当前页面的的行数，列数，名称
    var ws = getSheet(wb, 19, 7, '新二次抵押登记表');
    // 合并单元格
    ws['!merges'] = [{
      e: {c: 3, r: 4},
      s: {c: 2, r: 4}
    }, {
      e: {c: 3, r: 8},
      s: {c: 2, r: 8}
    }, {
      e: {c: 5, r: 17},
      s: {c: 4, r: 17}
    }, {
      e: {c: 5, r: 14},
      s: {c: 2, r: 14}
    }];
    // 设置列宽
    ws['!cols'] = [
      {wch: 8.38},
      {wch: 8.63},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 10.63},
      {wch: 16},
      {wch: 10.38}
    ];
    // 设置行高
    ws['!rows'] = [
      null,
      {hpt: 30, hpx: 30},
      null,
      {hpt: 3, hpx: 3},
      {hpt: 34.5, hpx: 34.5},
      null,
      null,
      {hpt: 36.75, hpx: 36.75},
      {hpt: 33.75, hpx: 33.75},
      {hpt: 10.5, hpx: 10.5},
      null,
      {hpt: 33.75, hpx: 33.75},
      null,
      {hpt: 8.25, hpx: 8.25},
      {hpt: 30, hpx: 30},
      {hpt: 18.75, hpx: 18.75},
      {hpt: 8.25, hpx: 8.25},
      {hpt: 16.5, hpx: 16.5},
      {hpt: 27, hpx: 27}
    ];
    // 设置表格内容
    ws['C5'] = {v: '小型汽车', t: 's', w: '小型汽车'};
    ws['C9'].f = '内容!B1';
    ws['C15'].f = '内容!B25';
    ws['C18'] = {v: 325000, t: 'n', w: '325000'};
    ws['D12'].f = '内容!B23';
    ws['E18'].f = '内容!B26';
    ws['G5'].f = '内容!B7';
    // 设置表格样式
    ws['C5'].s = {font: {sz: 18}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C9'].s = {font: {sz: 18}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['C15'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['C18'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['D12'].s = {font: {sz: 16}, alignment: {horizontal: 'center', vertical: 'top'}};
    ws['E18'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['G5'].s = {font: {sz: 14}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  }
  // 公司授权委托书
  function createGssqwts(wb) {
    // 设置当前页面的的行数，列数，名称
    var ws = getSheet(wb, 11, 3, '公司授权委托书');
    // 合并单元格
    ws['!merges'] = [{
      e: {c: 7, r: 9},
      s: {c: 6, r: 9}
    }];
    // 设置列宽
    ws['!cols'] = [
      {wch: 9.63},
      {wch: 6.38},
      {wch: 9.75}
    ];
    // 设置行高
    ws['!rows'] = [
      null,
      null,
      {hpt: 9, hpx: 9},
      null,
      {hpt: 9, hpx: 9},
      {hpt: 9.75, hpx: 9.75},
      {hpt: 9, hpx: 9},
      {hpt: 18.75, hpx: 18.75},
      {hpt: 18, hpx: 18},
      {hpt: 27, hpx: 27},
      {hpt: 24, hpx: 24}
    ];
    // 设置表格内容
    ws['A8'].f = 'IF(内容!B29="温州",内容!B29,"")';
    ws['C11'].f = '内容!B7';
    // 设置表格样式
    ws['A8'].s = {font: {sz: 14}, alignment: {horizontal: 'left', vertical: 'top'}};
    ws['C11'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  }
  // 滕洁瑜授权委托
  function createTjysqwt(wb) {
    // 设置当前页面的的行数，列数，名称
    var ws = getSheet(wb, 14, 7, '滕洁瑜授权委托');
    // 合并单元格
    ws['!merges'] = [{
      e: {c: 6, r: 6},
      s: {c: 4, r: 6}
    }, {
      e: {c: 7, r: 7},
      s: {c: 4, r: 7}
    }, {
      e: {c: 2, r: 10},
      s: {c: 1, r: 10}
    }, {
      e: {c: 6, r: 9},
      s: {c: 5, r: 8}
    }];
    // 设置列宽
    ws['!cols'] = [
      {wch: 9.63},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 9.13},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 9.63}
    ];
    // 设置行高
    ws['!rows'] = [
      null,
      null,
      null,
      {hpt: 29.25, hpx: 29.25},
      {hpt: 21, hpx: 21},
      {hpt: 15, hpx: 15},
      {hpt: 20.25, hpx: 20.25},
      {hpt: 0.75, hpx: 0.75},
      {hpt: 9, hpx: 9},
      {hpt: 22.5, hpx: 22.5},
      {hpt: 20.25, hpx: 20.25}
    ];
    // 设置表格内容
    ws['A6'].f = 'IF(内容!B29="温州",内容!B29,"")';
    ws['B11'] = {v: '抵押登记', t: 's', w: '抵押登记'};
    ws['C7'].f = '内容!B23';
    ws['C8'] = {v: ' ', t: 's', w: ' '};
    ws['E7'].f = '内容!B24';
    ws['E8'] = {v: ' ', t: 's', w: ' '};
    ws['F9'].f = '内容!B7';
    ws['G14'] = {v: 180, t: 's', w: '180'};
    // 设置表格样式
    ws['A6'].s = {font: {sz: 14}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B11'].s = {font: {sz: 14}, alignment: {horizontal: 'left', vertical: 'top'}};
    ws['C7'].s = {font: {sz: 14}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C8'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['E7'].s = {font: {sz: 16}, alignment: {horizontal: 'right', vertical: 'center'}};
    ws['E8'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['F9'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
    ws['G14'].s = {font: {sz: 14}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  }
  // 担保合同
  function createDbht(wb) {
    // 设置当前页面的的行数，列数，名称
    var ws = getSheet(wb, 26, 9, '担保合同');
    // 合并单元格
    ws['!merges'] = [{
      e: {c: 8, r: 3},
      s: {c: 6, r: 3}
    }, {
      e: {c: 4, r: 5},
      s: {c: 2, r: 5}
    }, {
      e: {c: 5, r: 6},
      s: {c: 2, r: 6}
    }, {
      e: {c: 8, r: 6},
      s: {c: 7, r: 6}
    }, {
      e: {c: 5, r: 9},
      s: {c: 1, r: 9}
    }, {
      e: {c: 7, r: 9},
      s: {c: 6, r: 9}
    }, {
      e: {c: 2, r: 10},
      s: {c: 1, r: 10}
    }, {
      e: {c: 4, r: 10},
      s: {c: 3, r: 10}
    }, {
      e: {c: 8, r: 24},
      s: {c: 6, r: 24}
    }];
    // 设置列宽
    ws['!cols'] = [
      {wch: 8.25},
      {wch: 8.75},
      {wch: 5.25},
      {wch: 5.75},
      {wch: 10.75},
      {wch: 9.5},
      {wch: 4.88},
      {wch: 12.5},
      {wch: 8.38}
    ];
    // 设置行高
    ws['!rows'] = [
      null,
      {hpt: 11.25, hpx: 11.25},
      {hpt: 9.95, hpx: 9.95},
      {hpt: 19.5, hpx: 19.5},
      null,
      {hpt: 12.75, hpx: 12.75},
      {hpt: 14.25, hpx: 14.25},
      {hpt: 3, hpx: 3},
      {hpt: 10.5, hpx: 10.5},
      {hpt: 21.75, hpx: 21.75},
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
      null,
      {hpt: 13.5, hpx: 13.5},
      null,
      {hpt: 8.25, hpx: 8.25},
      {hpt: 21.75, hpx: 21.75},
      {hpt: 15, hpx: 15}
    ];
    // 设置表格内容
    ws['B10'].f = '内容!B19';
    ws['B11'].f = '内容!B10';
    ws['B26'].f = '内容!B13';
    ws['C5'].f = '内容!B1';
    ws['C6'] = {v: '温州浩源控股有限公司', t: 's', w: '温州浩源控股有限公司'};
    ws['C7'].f = '内容!B19';
    ws['D11'].f = '内容!B11';
    ws['D23'] = {v: ' ', t: 's', w: ' '};
    ws['F11'].f = '内容!B17';
    ws['G4'].f = '内容!B6';
    ws['G10'].f = '内容!B27';
    ws['G25'].f = '内容!B12';
    ws['H7'].f = '内容!B27';
    // 设置表格样式
    ws['B10'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['B11'].s = {font: {sz: 7}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['B26'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C5'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C6'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C7'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['D11'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['D23'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['F11'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['G4'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['G10'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['G25'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['H7'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  }
  // 抵押合同
  function createDyht(wb) {
    // 设置当前页面的的行数，列数，名称
    var ws = getSheet(wb, 31, 10, '抵押合同');
    // 合并单元格
    ws['!merges'] = [{
      e: {c: 2, r: 6},
      s: {c: 1, r: 6}
    }, {
      e: {c: 4, r: 6},
      s: {c: 3, r: 6}
    }, {
      e: {c: 8, r: 6},
      s: {c: 5, r: 6}
    }, {
      e: {c: 2, r: 7},
      s: {c: 1, r: 7}
    }, {
      e: {c: 4, r: 7},
      s: {c: 3, r: 7}
    }, {
      e: {c: 8, r: 7},
      s: {c: 5, r: 7}
    }, {
      e: {c: 4, r: 10},
      s: {c: 1, r: 10}
    }, {
      e: {c: 8, r: 11},
      s: {c: 4, r: 11}
    }, {
      e: {c: 8, r: 12},
      s: {c: 4, r: 12}
    }, {
      e: {c: 3, r: 13},
      s: {c: 2, r: 13}
    }, {
      e: {c: 6, r: 15},
      s: {c: 4, r: 15}
    }, {
      e: {c: 8, r: 15},
      s: {c: 7, r: 15}
    }, {
      e: {c: 4, r: 18},
      s: {c: 3, r: 18}
    }, {
      e: {c: 4, r: 19},
      s: {c: 3, r: 19}
    }, {
      e: {c: 4, r: 23},
      s: {c: 3, r: 23}
    }, {
      e: {c: 2, r: 30},
      s: {c: 1, r: 30}
    }, {
      e: {c: 3, r: 29},
      s: {c: 2, r: 28}
    }];
    // 设置列宽
    ws['!cols'] = [
      {wch: 7.63},
      {wch: 10},
      {wch: 9},
      {wch: 13.5},
      {wch: 14},
      {wch: 4.13},
      {wch: 0.23},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 8.38}
    ];
    // 设置行高
    ws['!rows'] = [
      null,
      null,
      {hpt: 6, hpx: 6},
      {hidden: true, hpt: 12.75, hpx: 12.75},
      {hpt: 15, hpx: 15},
      {hidden: true, hpt: 4.5, hpx: 4.5},
      {hpt: 24, hpx: 24},
      {hpt: 25.5, hpx: 25.5},
      null,
      {hpt: 9.75, hpx: 9.75},
      {hpt: 16.5, hpx: 16.5},
      {hpt: 21, hpx: 21},
      {hpt: 19.5, hpx: 19.5},
      {hpt: 24, hpx: 24},
      {hpt: 13.5, hpx: 13.5},
      {hpt: 21, hpx: 21},
      {hpt: 22.5, hpx: 22.5},
      {hidden: true, hpt: 1.5, hpx: 1.5},
      null,
      {hpt: 20.25, hpx: 20.25}
    ];
    // 设置表格内容
    ws['B7'].f = '内容!B1';
    ws['B8'].f = 'IF(LEN(内容!B3)>=2,内容!B3,"")';
    ws['B11'] = {v: '温州浩源控股有限公司', t: 's', w: '温州浩源控股有限公司'};
    ws['B12'].f = '内容!B14';
    ws['B13'].F = '内容!B28';
    ws['B31'].f = '内容!B6';
    ws['C12'].f = '内容!B15';
    ws['C14'].f = '内容!B10';
    ws['C29'].f = '内容!B28';
    ws['D7'].f = '内容!B2';
    ws['D8'].f = 'IF(LEN(内容!B3)>=2,内容!B4,"")';
    ws['D12'].f = '内容!B16';
    ws['D19'].f = '内容!B19';
    ws['D20'].f = '内容!B19';
    ws['D24'].f = '内容!B19';
    ws['E12'].f = '内容!B19';
    ws['E13'].f = '内容!B6';
    ws['E16'].f = '内容!B9';
    ws['F7'].f = '内容!B5';
    ws['F8'].f = 'IF(LEN(内容!B3)>=2,内容!B5,"")';
    ws['H16'].f = '内容!B8';
    ws['J17'] = {v: ' ', t: 's', w: ' '};
    // 设置表格样式
    ws['B7'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['B8'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['B11'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['B12'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['B13'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['B31'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C12'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C14'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['C29'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['D7'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['D8'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['D12'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['D19'].s = {font: {sz: 7}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['D20'].s = {font: {sz: 7}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['D24'].s = {font: {sz: 7}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['E12'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['E13'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['E16'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['F7'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['F8'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['H16'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['J17'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
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