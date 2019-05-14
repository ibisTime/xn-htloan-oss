import React from 'react';
import { Button } from 'antd';
import { getWorkbook, readXls } from 'common/js/xlsx-util';

class ExportImport extends React.Component {
  constructor(props) {
    super(props);
    this.handleExport = this.handleExport.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      data: []
    };
  }
  handleExport() {
    const wb = getWorkbook();
    this.createData(wb, this.state.data);
    this.createZx1(wb);
    this.createZx2(wb);
    this.createJzd(wb);
    this.createSqrzzm(wb);
    this.createWzsfh(wb);
    this.createDzhtchz(wb);
    this.createDkzsxcnh(wb);
    this.createFjfhkjysqs(wb);
    this.createWtsqs(wb);
    this.createSrzm(wb);
    this.createDbrsrzm(wb);
    this.createXykedsqb(wb);
    this.createDbrgthkcns(wb);
    this.createQcgxht(wb);
    this.createHtfm(wb);
    this.createHt6(wb);
    this.createHt7(wb);
    this.createHt8(wb);
    this.createBzxy1(wb);
    this.createBzxy2(wb);
    // download
    wb.downloadXls('中行总对总-高息');
  }
  // 数据
  createData(wb, data) {
    var ws = wb.getSheet(data, '数据');
    ws['!cols'] = [{
      wch: 37.63
    }, {
      wch: 50.75
    }];
    ws['!rows'] = [];
    ws['!rows'][25] = {hpt: 15, hpx: 15};
    ws['B11'].f = 'IF(INT(B13)*100=B13*100,TEXT(INT(B13),"[$-0804][DBNum2]G/通用格式")&"",IF(INT(B13*10)=B13*10,TEXT(INT(B13),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B13*10-INT(B13)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B13),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B13*10)=INT(B13)*10,"零",TEXT(RIGHT(INT(B13*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B13*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B12'].f = 'IF(INT(ROUND(B13,2))*100=ROUND(B13,2)*100,TEXT(INT(ROUND(B13,2)),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(ROUND(B13,2)*10)=B13*10,TEXT(INT(ROUND(B13,2)),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(ROUND(B13,2)*10-INT(ROUND(B13,2))*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(ROUND(B13,2)),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(ROUND(B13,2)*10)=INT(ROUND(B13,2))*10,"零",TEXT(RIGHT(INT(ROUND(B13,2)*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(ROUND(B13,2)*100),"[$-0804][DBNum2]G/通用格式")&"分"))&"整"';
    ws['B15'].f = 'B13*B14/100';
    ws['B17'].f = 'IF(INT(B15)*100=B15*100,TEXT(INT(B15),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B15*10)=B15*10,TEXT(INT(B15),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B15*10-INT(B15)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B15),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B15*10)=INT(B15)*10,"零",TEXT(RIGHT(INT(B15*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B121*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B30'].f = 'B22-B13';
    ws['B32'].f = 'B16/12&"年"';
    ws['B33'].f = 'TEXT((B16/12),"[$-0804][DBNum2]G/通用格式")';
    ws['B36'].f = 'IF(MOD(MID(B2,17,1),2),"男","女")';
    ws['B37'].f = 'IF(MOD(MID(B8,17,1),2),"男","女")';
    ws['B39'].f = 'IF(INT(B30)*100=B30*100,TEXT(INT(B30),"[$-0804][DBNum2]G/通用格式")&"",IF(INT(B30*10)=B30*10,TEXT(INT(B30),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B30*10-INT(B30)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B30),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B30*10)=INT(B30)*10,"零",TEXT(RIGHT(INT(B30*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B30*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B40'].f = 'IF(INT(ROUND(B30,2))*100=ROUND(B30,2)*100,TEXT(INT(ROUND(B30,2)),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(ROUND(B30,2)*10)=B30*10,TEXT(INT(ROUND(B30,2)),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(ROUND(B30,2)*10-INT(ROUND(B30,2))*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(ROUND(B30,2)),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(ROUND(B30,2)*10)=INT(ROUND(B30,2))*10,"零",TEXT(RIGHT(INT(ROUND(B30,2)*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(ROUND(B30,2)*100),"[$-0804][DBNum2]G/通用格式")&"分"))&"整"';
    ws['B41'].f = 'IF(INT(B42)*100=B42*100,TEXT(INT(B42),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B42*10)=B42*10,TEXT(INT(B42),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B42*10-INT(B42)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B42),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B42*10)=INT(B42)*10,"零",TEXT(RIGHT(INT(B42*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B42*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B42'].f = 'B58';
    ws['B43'].f = 'IF(INT(B44)*100=B44*100,TEXT(INT(B44),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B44*10)=B44*10,TEXT(INT(B44),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B44*10-INT(B44)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B44),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B44*10)=INT(B44)*10,"零",TEXT(RIGHT(INT(B44*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B44*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B44'].f = 'B59';
    ws['B47'].f = 'IF(INT(B22)*100=B22*100,TEXT(INT(B22),"[$-0804][DBNum2]G/通用格式")&"元整",IF(INT(B22*10)=B22*10,TEXT(INT(B22),"[$-0804][DBNum2]G/通用格式")&"元整"&TEXT(B22*10-INT(B22)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B22),"[$-0804][DBNum2]G/通用格式")&"元整"&IF(INT(B22*10)=INT(B22)*10,"零",TEXT(RIGHT(INT(B22*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B22*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B48'].f = 'B13-(B49*35)';
    ws['B49'].f = 'INT(B13/B16)';
    ws['B54'].f = 'IF(INT(B55)*100=B55*100,TEXT(INT(B55),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B55*10)=B55*10,TEXT(INT(B55),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B55*10-INT(B55)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B55),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B55*10)=INT(B55)*10,"零",TEXT(RIGHT(INT(B55*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B55*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B55'].f = 'ABS(B57*(B16-1)-B15)';
    ws['B56'].f = 'IF(INT(B57)*100=B57*100,TEXT(INT(B57),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B57*10)=B57*10,TEXT(INT(B57),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B57*10-INT(B57)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B57),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B57*10)=INT(B57)*10,"零",TEXT(RIGHT(INT(B57*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B57*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B57'].f = 'ROUND(B49*B14/100,2)';
    ws['B58'].f = 'B48+B55+B76+B79';
    ws['B59'].f = 'B49+B57+B77+B80';
    ws['B70'].f = 'B69-B14';
    ws['B71'].f = 'B13*B70/100';
    ws['B72'].f = 'IF(INT(B71)*100=B71*100,TEXT(INT(B71),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B71*10)=B71*10,TEXT(INT(B71),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B71*10-INT(B71)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B71),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B71*10)=INT(B71)*10,"零",TEXT(RIGHT(INT(B71*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B71*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B76'].f = 'ABS(B77*(B16-1)-B71)';
    ws['B77'].f = 'ROUND(B71/B16,2)';
    ws['B79'].f = 'ABS(B80*(B16-1)-B74)';
    ws['B80'].f = 'ROUND(B77*B73/100,2)';
    ws['B82'].f = 'B55+B79';
    ws['B83'].f = 'IF(INT(B82)*100=B82*100,TEXT(INT(B82),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B82*10)=B82*10,TEXT(INT(B82),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B82*10-INT(B82)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B82),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B82*10)=INT(B82)*10,"零",TEXT(RIGHT(INT(B82*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B82*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B84'].f = 'B57+B80';
    ws['B85'].f = 'IF(INT(B84)*100=B84*100,TEXT(INT(B84),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B784*10)=B84*10,TEXT(INT(B84),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B84*10-INT(B84)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B84),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B84*10)=INT(B84)*10,"零",TEXT(RIGHT(INT(B84*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B84*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B88'].f = 'B15+B74';
    ws['B89'].f = 'IF(INT(B88)*100=B88*100,TEXT(INT(B88),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B88*10)=B88*10,TEXT(INT(B88),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B88*10-INT(B88)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B88),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B88*10)=INT(B88)*10,"零",TEXT(RIGHT(INT(B88*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B88*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B90'].f = 'B13+B71';
    ws['B91'].f = 'IF(INT(B90)*100=B90*100,TEXT(INT(B90),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B90*10)=B90*10,TEXT(INT(B90),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B90*10-INT(B90)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B90),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B90*10)=INT(B90)*10,"零",TEXT(RIGHT(INT(B90*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B90*100),"[$-0804][DBNum2]G/通用格式")&"分"))';

    ws['A48'].s = {fill: {fgColor: {rgb: '993366'}}};
    ws['A49'].s = {fill: {fgColor: {rgb: '993366'}}};
    ws['A51'].s = {font: {color: {rgb: 'FF0000'}}};
    ws['A60'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
    ws['A61'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
    ws['A62'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
    ws['A63'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
    ws['A64'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
    ws['A65'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
    ws['A66'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
    ws['A67'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
    ws['A69'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
    ws['A70'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
    ws['A71'].s = {fill: {fgColor: {rgb: 'FFFF00'}}};
    ws['A72'].s = {fill: {fgColor: {rgb: 'FFFF00'}}};
    ws['A73'].s = {fill: {fgColor: {rgb: 'FFFF00'}}};
    ws['A74'].s = {fill: {fgColor: {rgb: 'FFFF00'}}};
    ws['A82'].s = {fill: {fgColor: {rgb: 'FFFF00'}}};
    ws['A83'].s = {fill: {fgColor: {rgb: 'FFFF00'}}};
    ws['A84'].s = {fill: {fgColor: {rgb: 'FFFF00'}}};
    ws['A85'].s = {fill: {fgColor: {rgb: 'FFFF00'}}};
    ws['A79'].s = {fill: {fgColor: {rgb: 'FF99CC'}}};
    ws['A80'].s = {fill: {fgColor: {rgb: 'FF99CC'}}};
    ws['A88'].s = {fill: {fgColor: {rgb: '92D050'}}};
    ws['A89'].s = {fill: {fgColor: {rgb: '92D050'}}};
    ws['A90'].s = {fill: {fgColor: {rgb: '92D050'}}};
    ws['A91'].s = {fill: {fgColor: {rgb: '92D050'}}};
    ws['B48'].s = {fill: {fgColor: {rgb: '993366'}}};
    ws['B49'].s = {fill: {fgColor: {rgb: '993366'}}};
    ws['B51'].s = {font: {color: {rgb: 'FF0000'}}};
    ws['B40'].s = {fill: {fgColor: {rgb: 'FFFF00'}}};
    ws['B12'].s = {fill: {fgColor: {rgb: 'FFFF00'}}};
    ws['B22'].s = {font: {color: {rgb: 'FF0000'}}};
    ws['B15'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B30'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B33'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B42'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B44'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B48'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B49'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B55'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B57'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B58'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B59'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B70'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B71'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B76'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B77'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B79'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B80'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B82'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B84'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B88'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B90'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
  }
  // 征信1
  createZx1(wb) {
    var ws = this.getSheet(wb, 48, 8, '征信1');
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
    ws['!rows'][45] = {hpt: 11.25, hpx: 11.25};
    ws['B48'] = {v: '身份证', t: 's', w: '身份证'};
    ws['E47'].f = '数据!B6';
    ws['E48'].f = '数据!B2';

    ws['B48'].s = {alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['E47'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['E48'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
  }
  // 征信2
  createZx2(wb) {
    var ws = this.getSheet(wb, 48, 8, '征信2');
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
    ws['!rows'][45] = {hpt: 7.5, hpx: 7.5};
    ws['B48'] = {v: '身份证', t: 's', w: '身份证'};
    ws['E47'].f = '数据!B9';
    ws['E48'].f = '数据!B8';

    ws['B48'].s = {alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['E47'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['E48'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
  }
  // 进账单
  createJzd(wb) {
    var ws = this.getSheet(wb, 8, 7, '进账单');
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
    ws['A8'].f = '数据!B51&数据!B1';
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
  createSqrzzm(wb) {
    var ws = this.getSheet(wb, 8, 8, '首期入账证明');
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
      e: {c: 3, r: 3},
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
  createWzsfh(wb) {
    var ws = this.getSheet(wb, 11, 9, '温州市分行');
    ws['!merges'] = [{
      e: {c: 5, r: 10},
      s: {c: 3, r: 10}
    }, {
      e: {c: 2, r: 10},
      s: {c: 1, r: 10}
    }, {
      e: {c: 7, r: 8},
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
  createDzhtchz(wb) {
    var ws = this.getSheet(wb, 8, 8, '垫资合同车行章');
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
      {hpt: 12, hpx: 12},
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
  createDkzsxcnh(wb) {
    var ws = this.getSheet(wb, 29, 7, '贷款真实性承诺函');
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
      {hpt: 66, hpx: 66},
      {hidden: true, hpt: 12, hpx: 12},
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

    ws['B4'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['E29'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['F3'].s = {font: {sz: 9}, alignment: {horizontal: 'left', vertical: 'center'}};
  }
  // 附加费划款交易授权书
  createFjfhkjysqs(wb) {
    var ws = this.getSheet(wb, 29, 8, '附加费划款交易授权书');
    ws['!merges'] = [{
      e: {c: 7, r: 10},
      s: {c: 5, r: 10}
    }, {
      e: {c: 4, r: 17},
      s: {c: 3, r: 17}
    }, {
      e: {c: 3, r: 26},
      s: {c: 2, r: 26}
    }, {
      e: {c: 4, r: 24},
      s: {c: 2, r: 24}
    }, {
      e: {c: 7, r: 22},
      s: {c: 4, r: 22}
    }];
    ws['!cols'] = [
      {wch: 6.5},
      {wch: 8.63},
      {wch: 10.13},
      {wch: 8.5},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 2.25},
      {wch: 14.5}
    ];
    ws['!rows'] = [
      null,
      null,
      null,
      {hpt: 9.75, hpx: 9.75},
      {hpt: 6, hpx: 6},
      {hpt: 34.5, hpx: 34.5},
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
      {hpt: 17.25, hpx: 17.25},
      null,
      {hpt: 17.25, hpx: 17.25},
      null,
      null,
      {hpt: 15.75, hpx: 15.75},
      {hpt: 30, hpx: 30},
      {hpt: 15, hpx: 15},
      null,
      {hpt: 15, hpx: 15},
      null,
      {hpt: 9, hpx: 9},
      {hpt: 19.5, hpx: 19.5}
    ];
    ws['B20'].f = '数据!B33';
    ws['C7'].f = '数据!B1';
    ws['C18'].f = '数据!B71';
    ws['C25'].f = '数据!B27';
    ws['C27'].f = '数据!B28';
    ws['C29'].f = '数据!B29';
    ws['E23'].f = '数据!B27';
    ws['F11'] = {v: '温州保利融资担保有限公司', t: 's', w: '温州保利融资担保有限公司'};
    ws['H16'].f = '数据!B13';
    ws['H18'].f = '数据!B90';

    ws['B12'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C7'].s = {alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['C18'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C25'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C27'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C29'].s = {alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['E23'].s = {font: {sz: 14}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['F11'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['H16'].s = {alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['H18'].s = {font: {color: {rgb: 'FF0000'}}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  }
  // 委托授权书
  createWtsqs(wb) {
    var ws = this.getSheet(wb, 19, 5, '委托授权书');
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
    ws['E6'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
  }
  // 收入证明
  createSrzm(wb) {
    var ws = this.getSheet(wb, 16, 8, '收入证明');
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
      {wch: 8.38},
      {wch: 8.38}
    ];
    ws['!rows'] = [
      {hpt: 11.25, hpx: 11.25},
      null,
      {hpt: 24.75, hpx: 24.75},
      {hpt: 65.25, hpx: 65.25},
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
  createDbrsrzm(wb) {
    var ws = this.getSheet(wb, 16, 8, '担保人收入证明');
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
      {hpt: 64.5, hpx: 64.5},
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
    ws['B5'].f = '数据!B60';
    ws['B16'] = {v: ' ', t: 's', w: ' '};
    ws['F5'].f = '数据!B62';
    ws['F16'] = {v: ' ', t: 's', w: ' '};

    ws['B5'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['B16'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['F5'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['F16'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  }
  // 信用卡额度申请表
  createXykedsqb(wb) {
    var ws = this.getSheet(wb, 33, 7, '信用卡额度申请表');
    ws['!merges'] = [{
      e: {c: 3, r: 32},
      s: {c: 2, r: 29}
    }, {
      e: {c: 3, r: 4},
      s: {c: 2, r: 4}
    }, {
      e: {c: 5, r: 9},
      s: {c: 2, r: 9}
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
      e: {c: 5, r: 13},
      s: {c: 2, r: 12}
    }, {
      e: {c: 4, r: 16},
      s: {c: 2, r: 16}
    }, {
      e: {c: 3, r: 10},
      s: {c: 2, r: 10}
    }];
    ws['!cols'] = [
      {wch: 7.38},
      {wch: 14.88},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 9.5},
      {wch: 12.13},
      {wch: 12.13}
    ];
    ws['!rows'] = [
      {hpt: 33, hpx: 33},
      {hpt: 17.25, hpx: 17.25},
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
      {hpt: 9.75, hpx: 9.75},
      {hpt: 19.5, hpx: 19.5}
    ];
    ws['C3'].f = '数据!B1';
    ws['C5'].f = '数据!B2';
    ws['C10'].f = '数据!B23';
    ws['C11'].f = '数据!B24';
    ws['C13'].f = '数据!B3';
    ws['C20'].f = '数据!B7';
    ws['C22'].f = '数据!B8';
    ws['C23'].f = '数据!B25';
    ws['C24'].f = '数据!B10';
    ws['C28'].f = '数据!B16';
    ws['C30'].f = '数据!B27';
    ws['E32'].f = '数据!B22';
    ws['F3'].f = '数据!B36';
    ws['F8'].f = '数据!B34';
    ws['F20'].f = '数据!B37';
    ws['F27'].f = '数据!B90';
    ws['F28'] = {v: '购车', t: 's', w: '购车'};
    ws['G3'].f = '数据!B4';
    ws['G5'].f = '数据!B6';
    ws['G10'].f = '数据!B25';
    ws['G13'].f = '数据!B5';
    ws['G20'].f = '数据!B38';
    ws['G22'].f = '数据!B9';
    ws['G27'] = {v: '人民币', t: 's', w: '人民币'};
    ws['G32'].f = '数据!B13';
    ws['G33'].f = '数据!B71';

    ws['C3'].s = {alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C5'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C10'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C11'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C13'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['C20'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['C22'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C23'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C24'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C28'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C30'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom', wrapText: true}};
    ws['E32'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['F3'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['F8'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['F20'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['F27'].s = {font: {sz: 9}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['F28'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
    ws['G3'].s = {font: {sz: 8}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['G5'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['G10'].s = {font: {sz: 8}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['G13'].s = {font: {sz: 8}, alignment: {horizontal: 'right', vertical: 'center'}};
    ws['G16'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'center'}};
    ws['G20'].s = {font: {sz: 7}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['G22'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['G27'].s = {font: {sz: 7}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['G32'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['G33'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  }
  // 担保人共同还款承诺书
  createDbrgthkcns(wb) {
    var ws = this.getSheet(wb, 27, 8, '担保人共同还款承诺书');
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
      {hpt: 21.75, hpx: 21.75},
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
    ws['B27'].f = '数据!B90';
    ws['C10'].f = '数据!B8';
    ws['C12'].f = '数据!B25';
    ws['C13'].f = '数据!B26';
    ws['D5'].f = '数据!B7';
    ws['D27'].f = '数据!B16';
    ws['E22'].f = '数据!B2';
    ws['F5'].f = '数据!B37';
    ws['G10'].f = '数据!B9';
    ws['G12'] = {v: ' ', t: 's', w: ' '};
    ws['G22'].f = '数据!B1';
    ws['G26'] = {v: ' ', t: 's', w: ' '};

    ws['B27'].s = {font: {sz: 8}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['C10'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C12'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C13'].s = {font: {sz: 7}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['D5'].s = {alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['D27'].s = {font: {sz: 8, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['E22'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['F5'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['G10'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['G12'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['G22'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['G26'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  }
  // 汽车购销合同
  createQcgxht(wb) {
    var ws = this.getSheet(wb, 20, 8, '汽车购销合同');
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
      e: {c: 6, r: 19},
      s: {c: 5, r: 19}
    }, {
      e: {c: 4, r: 19},
      s: {c: 2, r: 19}
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
      {hpt: 13.5, hpx: 13.5},
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
    ws['C19'].f = '数据!B22';
    ws['C20'].f = '数据!B47';
    ws['D14'].f = '数据!B35';
    ws['D16'].f = '数据!B20';
    ws['F20'] = {v: '壹', t: 's', w: '壹'};

    ws['C7'].s = {font: {sz: 12, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C9'].s = {font: {sz: 12, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C15'].s = {font: {sz: 12, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C19'].s = {font: {sz: 12, name: '楷体_GB2312'}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C20'].s = {font: {sz: 9, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['D14'].s = {font: {sz: 12, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['D16'].s = {font: {sz: 12, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['F20'].s = {font: {sz: 10, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  }
  // 合同封面
  createHtfm(wb) {
    var ws = this.getSheet(wb, 25, 6, '合同封面');
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
    ws['E24'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  }
  // 合同6
  createHt6(wb) {
    var ws = this.getSheet(wb, 58, 8, '合同6');
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
    }, {
      e: {c: 2, r: 39},
      s: {c: 1, r: 39}
    }];
    ws['!cols'] = [
      {wch: 5.75},
      {wch: 8.63},
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
      {hpt: 51, hpx: 51},
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
      {hpt: 62.25, hpx: 62.25},
      {hpt: 21, hpx: 21},
      {hpt: 30.75, hpx: 30.75},
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
    ws['B40'].f = '数据!E40';
    ws['B43'] = {v: 1, t: 'n', w: '1'};
    ws['C25'].f = '数据!B1';
    ws['C27'].f = '数据!B3';
    ws['C29'] = {v: '温州市蝉街113号', t: 's', w: '温州市蝉街113号'};
    ws['C31'].f = '数据!B1';
    ws['C32'].f = '数据!B2';
    ws['C33'].f = '数据!B3';
    ws['C43'].f = '数据!B35';
    ws['D26'].f = '数据!B2';
    ws['D36'].f = '数据!B11';
    ws['D43'].f = '数据!B19';
    ws['E31'].f = '数据!B7';
    ws['E35'].f = 'G35';
    ws['E40'].f = '数据!B71';
    ws['E41'].f = '数据!B16';
    ws['E43'].f = '数据!B21';
    ws['F28'] = {v: '温州蝉街', t: 's', w: '温州蝉街'};
    ws['F32'].f = '数据!B8';
    ws['F36'].f = '数据!B13';
    ws['F43'].f = '数据!B20';
    ws['G35'].f = '数据!B90';
    ws['G44'].f = '数据!B13';
    ws['H44'].f = '数据!B14';

    ws['B40'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['B43'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['C25'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['C27'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C29'].s = {font: {sz: 11, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C31'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C32'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C33'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C43'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'top', wrapText: true}};
    ws['D26'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['D36'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['D43'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['E31'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['E35'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['E40'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['E41'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['E43'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['F28'].s = {font: {sz: 9, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['F32'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['F36'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['F43'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['G35'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['G44'].s = {font: {sz: 8}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['H44'].s = {font: {sz: 8, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  }
  // 合同7
  createHt7(wb) {
    var ws = this.getSheet(wb, 40, 9, '合同7');
    ws['!merges'] = [{
      e: {c: 7, r: 2},
      s: {c: 5, r: 2}
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
    }, {
      e: {c: 5, r: 4},
      s: {c: 3, r: 4}
    }];
    ws['!cols'] = [
      {wch: 8.88},
      {wch: 8.38},
      {wch: 10},
      {wch: 7.88},
      {wch: 7.38},
      {wch: 10.88},
      {wch: 7.13},
      {wch: 13.25}
    ];
    ws['!rows'] = [
      null,
      {hpt: 36, hpx: 36},
      {hpt: 18.75, hpx: 18.75},
      {hpt: 14.25, hpx: 14.25},
      {hpt: 24, hpx: 24},
      {hpt: 16.5, hpx: 16.5},
      {hpt: 20.25, hpx: 20.25},
      {hpt: 38.25, hpx: 38.25},
      {hidden: true, hpt: 16.5, hpx: 16.5},
      {hidden: true, hpt: 20.25, hpx: 20.25},
      {hpt: 20.25, hpx: 20.25},
      {hpt: 12.75, hpx: 12.75},
      {hpt: 11.25, hpx: 11.25},
      {hidden: true, hpt: 42.75, hpx: 42.75},
      {hidden: true, hpt: 1.5, hpx: 1.5},
      {hpt: 61.5, hpx: 61.5},
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
      null,
      null,
      null,
      null,
      {hpt: 47.25, hpx: 47.25},
      {hpt: 28.5, hpx: 28.5}
    ];
    ws['B11'].f = '数据!B83';
    ws['B13'].f = '数据!B84';
    ws['B32'].f = '数据!B28';
    ws['D3'].f = '数据!B71';
    ws['D5'].f = '数据!B89';
    ws['D11'].f = '数据!B82';
    ws['D17'].f = '数据!B41';
    ws['D18'].f = '数据!B43';
    ws['E3'].f = '数据!B73';
    ws['F17'].f = '数据!B42';
    ws['F18'].f = '数据!B44';
    ws['F30'].f = '数据!B27';
    ws['G5'].f = '数据!B88';
    ws['G20'].f = '数据!B1';
    ws['H11'].f = '数据!B85';

    ws['B11'].s = {font: {sz: 8, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B13'].s = {font: {sz: 8, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B32'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'top'}};
    ws['D3'].s = {font: {sz: 9}, alignment: {horizontal: 'right', vertical: 'top'}};
    ws['D5'].s = {font: {sz: 8}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['D11'].s = {font: {sz: 8, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['D17'].s = {font: {sz: 8, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['D18'].s = {font: {sz: 8, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['E3'].s = {font: {sz: 8, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['F17'].s = {font: {sz: 10, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['F18'].s = {font: {sz: 10, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['F30'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['G5'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['G20'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['H11'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  }
  // 合同8
  createHt8(wb) {
    var ws = this.getSheet(wb, 44, 8, '合同8');
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
      {wch: 8.88},
      {wch: 8.38},
      {wch: 10},
      {wch: 7.88},
      {wch: 7.38},
      {wch: 10.88},
      {wch: 7.13},
      {wch: 13.25}
    ];
    ws['!rows'] = [
      null,
      {hpt: 6.75, hpx: 6.75},
      {hidden: true, hpt: 61.5, hpx: 61.5},
      {hidden: true, hpt: 69, hpx: 69},
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
    ws['H5'].f = '数据!B22';

    ws['A12'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['B5'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['B44'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C5'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'center', wrapText: true}};
    ws['C19'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['D5'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['E5'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['F5'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['H5'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'center'}};
  }
  // 保证协议1
  createBzxy1(wb) {
    var ws = this.getSheet(wb, 43, 8, '保证协议1');
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
    }, {
      e: {c: 3, r: 19},
      s: {c: 1, r: 19}
    }];
    ws['!cols'] = [
      {wch: 9.5},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 9.88},
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
    ws['B20'].f = '数据!C71';
    ws['D16'].f = '数据!B91';
    ws['E15'].f = '数据!B1';
    ws['F18'].f = '数据!B13';
    ws['F20'].f = '数据!B71';
    ws['G16'].f = '数据!B13';
    ws['H9'].f = '数据!B1';

    ws['B7'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B43'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C5'].s = {font: {sz: 10, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C18'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['B20'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['D16'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['E15'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['F18'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['F20'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['G16'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['H9'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  }
  // 保证协议2
  createBzxy2(wb) {
    var ws = this.getSheet(wb, 23, 8, '保证协议2');
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
  getMargins() {
    return {
        bottom: 1,
        footer: 0.5,
        header: 0.5,
        left: 0.75,
        right: 0.75,
        top: 1
    };
  }
  // 获取sheet
  getSheet(wb, row, col, name) {
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
    ws['!margins'] = this.getMargins();
    return ws;
  }
  handleChange(files) {
    files = files.target.files;
    if (!files || !files.length) {
      return;
    }
    readXls(files[0]).then(data => {
      this.setState({
        data
      });
    }).catch((msg) => {
      alert(msg);
    });
  }
  render() {
    return (
      <div>
        <input type="file" onChange={this.handleChange}/>
        <Button onClick={this.handleExport}>导出</Button>
        <table className="table table-striped">
          <tbody>
            {this.state.data.map((r, i) => <tr key={i}>
              {r.map((c, j) => <td key={j}>{c}</td>)}
            </tr>)}
          </tbody>
        </table>
      </div>
      );
  }
}

export default ExportImport;
