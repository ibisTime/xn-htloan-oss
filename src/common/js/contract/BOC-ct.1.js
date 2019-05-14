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
    this.createFjfsm(wb);
    this.createZx1(wb);
    this.createZx2(wb);
    this.createJzd(wb);
    this.createSqrzzm(wb);
    this.createWzsfh(wb);
    this.createDzhtchz(wb);
    this.createDkzsxcnh(wb);
    this.createFjfhqjysqs(wb);
    this.createWtsqs(wb);
    this.createSrzm(wb);
    this.createDbrsrzm(wb);
    this.createXykedsqb(wb);
    this.createGthkrcns(wb);
    this.createQcgxht(wb);
    this.createHtfm(wb);
    this.createHt6(wb);
    this.createHt7(wb);
    this.createHt8(wb);
    // download
    wb.downloadXls('中行-传统');
  }
  // 数据
  createData(wb, data) {
    var ws = wb.getSheet(data, '数据');
    ws['!cols'] = [{
      wch: 24.63
    }, {
      wch: 50.75
    }];
    ws['B10'].f = 'IF(INT(B12)*100=B12*100,TEXT(INT(B12),"[$-0804][DBNum2]G/通用格式")&"",IF(INT(B12*10)=B12*10,TEXT(INT(B12),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B12*10-INT(B12)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B12),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B12*10)=INT(B12)*10,"零",TEXT(RIGHT(INT(B12*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B12*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B11'].f = 'IF(INT(ROUND(B12,2))*100=ROUND(B12,2)*100,TEXT(INT(ROUND(B12,2)),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(ROUND(B12,2)*10)=B12*10,TEXT(INT(ROUND(B12,2)),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(ROUND(B12,2)*10-INT(ROUND(B12,2))*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(ROUND(B12,2)),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(ROUND(B12,2)*10)=INT(ROUND(B12,2))*10,"零",TEXT(RIGHT(INT(ROUND(B12,2)*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(ROUND(B12,2)*100),"[$-0804][DBNum2]G/通用格式")&"分"))&"整"';
    ws['B13'].f = 'B12*0.085';
    ws['B15'].f = 'B14-8.5';
    ws['B17'] = {v: 8.5, t: 's', w: '8.5'};
    ws['B18'].f = 'IF(INT(B13)*100=B13*100,TEXT(INT(B13),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B13*10)=B13*10,TEXT(INT(B13),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B13*10-INT(B13)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B13),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B13*10)=INT(B13)*10,"零",TEXT(RIGHT(INT(B13*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B135*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B29'].f = 'B23-B12';
    ws['B31'].f = 'B16/12&"年"';
    ws['B32'].f = 'TEXT((B16/12),"[$-0804][DBNum2]G/通用格式")';
    ws['B35'].f = 'IF(MOD(MID(B2,17,1),2),"男","女")';
    ws['B36'].f = 'IF(MOD(MID(B8,17,1),2),"男","女")';
    ws['B38'].f = 'IF(INT(B29)*100=B29*100,TEXT(INT(B29),"[$-0804][DBNum2]G/通用格式")&"",IF(INT(B29*10)=B29*10,TEXT(INT(B29),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B29*10-INT(B29)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B29),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B29*10)=INT(B29)*10,"零",TEXT(RIGHT(INT(B29*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B29*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B39'].f = 'IF(INT(ROUND(B29,2))*100=ROUND(B29,2)*100,TEXT(INT(ROUND(B29,2)),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(ROUND(B29,2)*10)=B29*10,TEXT(INT(ROUND(B29,2)),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(ROUND(B29,2)*10-INT(ROUND(B29,2))*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(ROUND(B29,2)),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(ROUND(B29,2)*10)=INT(ROUND(B29,2))*10,"零",TEXT(RIGHT(INT(ROUND(B29,2)*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(ROUND(B29,2)*100),"[$-0804][DBNum2]G/通用格式")&"分"))&"整"';
    ws['B40'].f = 'IF(INT(B41)*100=B41*100,TEXT(INT(B41),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B41*10)=B41*10,TEXT(INT(B41),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B41*10-INT(B41)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B41),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B41*10)=INT(B41)*10,"零",TEXT(RIGHT(INT(B41*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B41*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B41'].f = 'B67';
    ws['B42'].f = 'IF(INT(B43)*100=B43*100,TEXT(INT(B43),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B43*10)=B43*10,TEXT(INT(B43),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B43*10-INT(B43)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B43),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B43*10)=INT(B43)*10,"零",TEXT(RIGHT(INT(B43*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B43*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B43'].f = 'B68';
    ws['B44'].f = 'B12*B15/100';
    ws['B45'].f = 'IF(INT(B44)*100=B44*100,TEXT(INT(B44),"[$-0804][DBNum2]G/通用格式"),IF(INT(B44*10)=B44*10,TEXT(INT(B44),"[$-0804][DBNum2]G/通用格式")&TEXT(B44*10-INT(B44)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B44),"[$-0804][DBNum2]G/通用格式")&IF(INT(B44*10)=INT(B44)*10,"零",TEXT(RIGHT(INT(B44*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B44*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B46'].f = 'B12+B44';
    ws['B47'].f = 'B46*B17/100';
    ws['B48'].f = 'IF(INT(B47)*100=B47*100,TEXT(INT(B47),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B47*10)=B47*10,TEXT(INT(B47),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B47*10-INT(B47)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B47),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B47*10)=INT(B47)*10,"零",TEXT(RIGHT(INT(B47*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B47*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B49'].f = 'IF(INT(B46)*100=B46*100,TEXT(INT(B46),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B46*10)=B46*10,TEXT(INT(B46),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B46*10-INT(B46)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B46),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B46*10)=INT(B46)*10,"零",TEXT(RIGHT(INT(B46*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B46*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B50'].f = 'IF(INT(B46)*100=B46*100,TEXT(INT(B46),"[$-0804][DBNum2]G/通用格式"),IF(INT(B46*10)=B46*10,TEXT(INT(B46),"[$-0804][DBNum2]G/通用格式")&TEXT(B46*10-INT(B46)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B46),"[$-0804][DBNum2]G/通用格式")&IF(INT(B46*10)=INT(B46)*10,"零",TEXT(RIGHT(INT(B46*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B46*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B60'].f = 'IF(INT(B23)*100=B23*100,TEXT(INT(B23),"[$-0804][DBNum2]G/通用格式")&"元整",IF(INT(B23*10)=B23*10,TEXT(INT(B23),"[$-0804][DBNum2]G/通用格式")&"元整"&TEXT(B23*10-INT(B23)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B23),"[$-0804][DBNum2]G/通用格式")&"元整"&IF(INT(B23*10)=INT(B23)*10,"零",TEXT(RIGHT(INT(B23*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B23*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B61'].f = 'B12-(B62*(B16-1))';
    ws['B62'].f = 'INT(B12/B16)';
    ws['B64'].f = 'ABS(B66*35-B13)';
    ws['B66'].f = 'B62*B17/100';
    ws['B67'].f = 'B61+B64+B72+B74';
    ws['B68'].f = 'B62+B66+B73+B75';
    ws['B71'].f = 'B44*B17/100';
    ws['B72'].f = '(B73*(B16-1)-B44)*-1';
    ws['B73'].f = 'INT(D73)';
    ws['B74'].f = '(B75*(B16-1)-B71)*-1';
    ws['B75'].f = 'ROUND(B73*B17/100,2)';
    ws['B77'].f = 'B74+B64';
    ws['B78'].f = 'IF(INT(B77)*100=B77*100,TEXT(INT(B77),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B77*10)=B77*10,TEXT(INT(B77),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B77*10-INT(B77)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B77),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B77*10)=INT(B77)*10,"零",TEXT(RIGHT(INT(B77*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B77*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B79'].f = 'B75+B66';
    ws['B80'].f = 'IF(INT(B79)*100=B79*100,TEXT(INT(B79),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B79*10)=B79*10,TEXT(INT(B79),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B79*10-INT(B79)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B79),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B79*10)=INT(B79)*10,"零",TEXT(RIGHT(INT(B79*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B79*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['D73'].f = 'B44/B16';

    ws['A5'].s = {font: {color: {rgb: 'FF0000'}}};
    ws['A47'].s = {font: {color: {rgb: 'FF0000'}}};
    ws['A48'].s = {font: {color: {rgb: 'FF0000'}}};
    ws['A69'].s = {font: {color: {rgb: 'FF0000'}}};
    ws['A71'].s = {font: {color: {rgb: 'FF0000'}}};
    ws['A72'].s = {font: {color: {rgb: 'FF0000'}}};
    ws['A73'].s = {font: {color: {rgb: 'FF0000'}}};
    ws['A74'].s = {font: {color: {rgb: 'FF0000'}}};
    ws['A75'].s = {font: {color: {rgb: 'FF0000'}}};
    ws['A24'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
    ws['A25'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
    ws['A26'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
    ws['A27'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
    ws['A51'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
    ws['A52'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
    ws['A53'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
    ws['A54'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
    ws['A55'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
    ws['A56'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
    ws['A57'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
    ws['A58'].s = {fill: {fgColor: {rgb: 'CCFFFF'}}};
    ws['A61'].s = {fill: {fgColor: {rgb: '993366'}}};
    ws['A62'].s = {fill: {fgColor: {rgb: '993366'}}};
    ws['A63'].s = {fill: {fgColor: {rgb: '993366'}}};
    ws['A64'].s = {fill: {fgColor: {rgb: '993366'}}};
    ws['A65'].s = {fill: {fgColor: {rgb: '33CCCC'}}};
    ws['A66'].s = {fill: {fgColor: {rgb: '33CCCC'}}};
    ws['A77'].s = {fill: {fgColor: {rgb: 'FFFF00'}}};
    ws['A78'].s = {fill: {fgColor: {rgb: 'FFFF00'}}};
    ws['A79'].s = {fill: {fgColor: {rgb: 'FFFF00'}}};
    ws['A80'].s = {fill: {fgColor: {rgb: 'FFFF00'}}};
    ws['B23'].s = {font: {color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B11'].s = {fill: {fgColor: {rgb: 'FFFF00'}}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B39'].s = {fill: {fgColor: {rgb: 'FFFF00'}}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B49'].s = {font: {color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B50'].s = {font: {color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B60'].s = {fill: {fgColor: {rgb: 'FFFF00'}}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B61'].s = {fill: {fgColor: {rgb: '993366'}}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B62'].s = {fill: {fgColor: {rgb: '993366'}}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B69'].s = {font: {color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B78'].s = {font: {color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B80'].s = {font: {color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B80'].s = {font: {color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B13'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B15'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B29'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B32'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B41'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B43'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B44'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B45'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B46'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B47'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B64'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B66'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B67'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B68'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B71'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B72'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B73'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B74'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B75'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B77'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
    ws['B79'].s = {alignment: {horizontal: 'left', vertical: 'center'}};
  }
  // 附加费情况说明
  createFjfsm(wb) {
    var ws = this.getSheet(wb, 24, 6, '附加费情况说明');
    ws['!merges'] = [{
      e: {c: 7, r: 2},
      s: {c: 6, r: 2}
    }, {
      e: {c: 5, r: 3},
      s: {c: 4, r: 3}
    }, {
      e: {c: 7, r: 23},
      s: {c: 6, r: 23}
    }, {
      e: {c: 5, r: 5},
      s: {c: 2, r: 5}
    }, {
      e: {c: 4, r: 7},
      s: {c: 2, r: 7}
    }];
    ws['!cols'] = [
      {wch: 8.38},
      {wch: 6.63},
      {wch: 7.38},
      {wch: 8.38},
      {wch: 7.5},
      {wch: 24.38}
    ];
    ws['!rows'] = [
      {hpt: 58.5, hpx: 58.5},
      {hidden: true, hpt: 3, hpx: 3},
      {hpt: 35.25, hpx: 35.25},
      {hpt: 17.25, hpx: 17.25},
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
      {hidden: true, hpt: 3.75, hpx: 3.75},
      {hpt: 27, hpx: 27}
    ];
    ws['C4'].f = '数据!B1';
    ws['C6'].f = '数据!B28';
    ws['C8'].f = '数据!B34';
    ws['C10'].f = '数据!B11';
    ws['E4'].f = '数据!B2';

    ws['C4'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C6'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C8'].s = {font: {sz: 12, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['C10'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['E4'].s = {font: {sz: 11}, alignment: {horizontal: 'right', vertical: 'bottom'}};
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
      {wch: 9.88},
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
      {wch: 10.38},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 8.38}
    ];
    ws['!rows'] = [];
    ws['!rows'][45] = {hpt: 4.5, hpx: 4.5};
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
      e: {c: 2, r: 6},
      s: {c: 0, r: 6}
    }, {
      e: {c: 2, r: 7},
      s: {c: 0, r: 7}
    }, {
      e: {c: 6, r: 1},
      s: {c: 4, r: 1}
    }, {
      e: {c: 5, r: 2},
      s: {c: 4, r: 2}
    }];
    ws['!cols'] = [
      {wch: 7.38},
      {wch: 8.38},
      {wch: 8.88},
      {wch: 17.13},
      {wch: 11},
      {wch: 8.38},
      {wch: 8.38}
    ];
    ws['!rows'] = [
      {hidden: true},
      {hpt: 26.25, hpx: 26.25},
      {hpt: 17.25, hpx: 17.25},
      {hpt: 16.5, hpx: 16.5},
      {hpt: 11.25, hpx: 11.25},
      null,
      {hpt: 54.75, hpx: 54.75}
    ];
    ws['A7'].f = '数据!B69&数据!B1';
    ws['B2'].f = '数据!B1';
    ws['B6'].f = '数据!B11';
    ws['E2'] = {v: '温州保利融资担保有限公司', t: 's', w: '温州保利融资担保有限公司'};
    ws['E3'] = {v: '364958350985', t: 's', w: '364958350985'};
    ws['E4'] = {v: '中国银行', t: 's', w: '中国银行'};

    ws['A7'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B2'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['B6'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['E2'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['E3'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['E4'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
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
      {hpt: 61.5, hpx: 61.5},
      {hpt: 24.75, hpx: 24.75},
      {hpt: 30, hpx: 30},
      {hpt: 30, hpx: 30},
      {hpt: 29.25, hpx: 29.25},
      {hpt: 15.95, hpx: 15.949999999999998}
    ];
    ws['B4'].f = '数据!B34';
    ws['B8'].f = '数据!B39';
    ws['C5'].f = '数据!B21';
    ws['E3'].f = '数据!B1';
    ws['G4'].f = '数据!B22';

    ws['B4'].s = {font: {sz: 8, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
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
      e: {c: 5, r: 8},
      s: {c: 4, r: 8}
    }];
    ws['!cols'] = [
      {wch: 6.5},
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
      null,
      null,
      null,
      null,
      null,
      {hpt: 42, hpx: 42},
      null,
      {hpt: 18, hpx: 18}
    ];
    ws['B11'].f = '数据!B22';
    ws['C9'].f = '数据!B1';
    ws['D11'].f = '数据!B21';
    ws['E9'].f = '数据!B34';

    ws['B11'].s = {font: {sz: 11, name: '黑体'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C9'].s = {font: {sz: 11, name: '黑体'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['D11'].s = {font: {sz: 11, name: '黑体'}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['E9'].s = {font: {sz: 11, name: '黑体'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  }
  // 垫资合同车行章
  createDzhtchz(wb) {
    var ws = this.getSheet(wb, 8, 8, '垫资合同车行章');
    ws['!merges'] = [{
      e: {c: 6, r: 1},
      s: {c: 3, r: 1}
    }, {
      e: {c: 3, r: 2},
      s: {c: 1, r: 2}
    }, {
      e: {c: 7, r: 3},
      s: {c: 3, r: 3}
    }, {
      e: {c: 6, r: 4},
      s: {c: 2, r: 4}
    }, {
      e: {c: 4, r: 5},
      s: {c: 3, r: 5}
    }, {
      e: {c: 4, r: 6},
      s: {c: 3, r: 6}
    }, {
      e: {c: 5, r: 7},
      s: {c: 3, r: 7}
    }];
    ws['!cols'] = [
      {wch: 6.5},
      {wch: 4.25},
      {wch: 18},
      {wch: 8.5},
      {wch: 8.5},
      {wch: 9.88},
      {wch: 6.88},
      {wch: 10.38}
    ];
    ws['!rows'] = [
      {hpt: 11.25, hpx: 11.25},
      {hpt: 18.75, hpx: 18.75},
      {hpt: 18.75, hpx: 18.75},
      {hpt: 18.75, hpx: 18.75},
      {hpt: 18.75, hpx: 18.75},
      {hpt: 21, hpx: 21},
      {hpt: 15, hpx: 15},
      {hpt: 37.5, hpx: 37.5}
    ];
    ws['B3'].f = '数据!B1';
    ws['C5'].f = '数据!B34';
    ws['D2'] = {v: '温州保利融资担保有限公司', t: 's', w: '温州保利融资担保有限公司'};
    ws['D4'].f = '数据!B28';
    ws['D6'].f = '数据!B49';
    ws['D8'].f = '数据!B38';

    ws['B3'].s = {font: {sz: 12, name: '楷体_GB2312'}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['C5'].s = {font: {sz: 9, name: '楷体_GB2312'}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['D2'].s = {font: {sz: 12, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'top'}};
    ws['D4'].s = {font: {sz: 12, name: '楷体_GB2312'}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['D6'].s = {font: {sz: 8, name: '楷体_GB2312', color: {rgb: 'FF0000'}}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['D8'].s = {font: {sz: 8, name: '楷体_GB2312'}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  }
  // 贷款真实性承诺函
  createDkzsxcnh(wb) {
    var ws = this.getSheet(wb, 29, 7, '贷款真实性承诺函');
    ws['!merges'] = [{
      e: {c: 6, r: 28},
      s: {c: 4, r: 28}
    }, {
      e: {c: 6, r: 23},
      s: {c: 5, r: 23}
    }];
    ws['!cols'] = [
      {wch: 5.38},
      {wch: 8.75},
      {wch: 7.5},
      {wch: 11.13},
      {wch: 25.13},
      {wch: 3.38},
      {wch: 9.38}
    ];
    ws['!rows'] = [
      {hpt: 57, hpx: 57},
      {hidden: true, hpt: 6, hpx: 6},
      {hpt: 32.25, hpx: 32.25},
      {hpt: 30.95, hpx: 30.95},
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
      {hpt: 194.25, hpx: 194.25},
      {hidden: true, hpt: 3.75, hpx: 3.75},
      {hidden: true, hpt: 28.5, hpx: 28.5},
      null,
      null,
      {hpt: 63.75, hpx: 63.75},
      {hidden: true}
    ];
    ws['B4'].f = '数据!B16';
    ws['E29'].f = '数据!B2';
    ws['G3'].f = '数据!B11';

    ws['B4'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['E29'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['G3'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  }
  // 附加费划款交易授权书
  createFjfhqjysqs(wb) {
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
    ws['B20'].f = '数据!B32';
    ws['C7'].f = '数据!B1';
    ws['C18'].f = 'TEXT((数据!B44),"0.00")';
    ws['C25'] = {v: '温州保利融资担保有限公司', t: 's', w: '温州保利融资担保有限公司'};
    ws['C27'] = {v: 364958350985, t: 's', w: '364958350985'};
    ws['C29'] = {v: '中国银行', t: 's', w: '中国银行'};
    ws['E23'] = {v: '温州保利融资担保有限公司', t: 's', w: '温州保利融资担保有限公司'};
    ws['F11'] = {v: '温州保利融资担保有限公司', t: 's', w: '温州保利融资担保有限公司'};
    ws['H16'].f = '数据!B12';
    ws['H18'].f = '数据!B46';

    ws['B20'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C7'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['C18'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C25'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C27'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C29'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['E23'].s = {font: {sz: 14}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['F11'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['H16'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['H18'].s = {font: {sz: 12, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'right', vertical: 'bottom'}};
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
      {hpt: 11.25, hpx: 11.25},
      {hpt: 32.25, hpx: 32.25},
      {hpt: 12, hpx: 12},
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      {hpt: 41.25, hpx: 41.25},
      {hpt: 38.25, hpx: 38.25}
    ];
    ws['B6'].f = '数据!B1';
    ws['C4'] = {v: '温州蝉街支行', t: 's', w: '温州蝉街支行'};
    ws['C15'] = {v: '温州保利融资担保有限公司', t: 's', w: '温州保利融资担保有限公司'};
    ws['C17'] = {v: 364958350985, t: 's', w: '364958350985'};
    ws['C19'] = {v: '中国银行', t: 's', w: '中国银行'};
    ws['E6'].f = '数据!B2';

    ws['B6'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C4'].s = {font: {sz: 10, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C15'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C17'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'top'}};
    ws['C19'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
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
      {wch: 10.88},
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
      {hpt: 17.25, hpx: 17.25},
      {hpt: 73.5, hpx: 73.5},
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
      {wch: 11.75},
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
    ws['B5'].f = '数据!B51';
    ws['B16'] = {v: ' ', t: 's', w: ' '};
    ws['F5'].f = '数据!B53';
    ws['F16'] = {v: ' ', t: 's', w: ' '};

    ws['B5'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['B16'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['F5'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['F16'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  }
  // 信用卡额度申请表
  createXykedsqb(wb) {
    var ws = this.getSheet(wb, 34, 7, '信用卡额度申请表');
    ws['!merges'] = [{
      e: {c: 3, r: 33},
      s: {c: 2, r: 31}
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
      e: {c: 4, r: 10},
      s: {c: 2, r: 10}
    }];
    ws['!cols'] = [
      {wch: 7.75},
      {wch: 14},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 12.63},
      {wch: 12.13},
      {wch: 8.38}
    ];
    ws['!rows'] = [
      {hpt: 22.5, hpx: 22.5},
      {hpt: 27, hpx: 27},
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
      null,
      null,
      null,
      {hpt: 25.5, hpx: 25.5},
      {hpt: 38.25, hpx: 38.25},
      null,
      {hpt: 3.75, hpx: 3.75},
      {hpt: 18, hpx: 18},
      {hpt: 20.25, hpx: 20.25},
      {hpt: 18, hpx: 18},
      null,
      {hpt: 6, hpx: 6},
      {hpt: 18, hpx: 18},
      null,
      {hpt: 11.25, hpx: 11.25},
      {hpt: 10.5, hpx: 10.5},
      {hpt: 4.5, hpx: 4.5}
    ];
    ws['C3'].f = '数据!B1';
    ws['C5'].f = '数据!B2';
    ws['C10'].f = '数据!B24';
    ws['C11'].f = '数据!B25';
    ws['C13'].f = '数据!B3';
    ws['C16'].f = '数据!B7';
    ws['C17'].f = '数据!B26';
    ws['C20'].f = '数据!B7';
    ws['C22'].f = '数据!B8';
    ws['C23'].f = '数据!B26';
    ws['C24'].f = '数据!B3';
    ws['C28'].f = '数据!B16';
    ws['C32'].f = '数据!B28';
    ws['E32'].f = '数据!B23';
    ws['F3'].f = '数据!B35';
    ws['F8'].f = '数据!B33';
    ws['F20'].f = '数据!B36';
    ws['F27'].f = '数据!B46';
    ws['F28'] = {v: '购车', t: 's', w: '购车'};
    ws['G3'].f = '数据!B4';
    ws['G5'].f = '数据!B6';
    ws['G10'].f = '数据!B26';
    ws['G16'].f = '数据!B9';
    ws['G20'].f = '数据!B37';
    ws['G22'].f = '数据!B9';
    ws['G27'] = {v: '人民币', t: 's', w: '人民币'};
    ws['G32'].f = '数据!B12';
    ws['G34'].f = '数据!B44';

    ws['C3'].s = {alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C5'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C10'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C11'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C13'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['C16'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C17'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C20'].s = {font: {sz: 11}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['C22'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C23'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C24'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C28'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C30'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['E32'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'bottom', wrapText: true}};
    ws['F3'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['F8'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['F20'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['F27'].s = {font: {sz: 11}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['F28'].s = {font: {sz: 11}, alignment: {horizontal: 'right', vertical: 'center'}};
    ws['G3'].s = {font: {sz: 11}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['G5'].s = {font: {sz: 11}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['G10'].s = {font: {sz: 11}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['G13'].s = {font: {sz: 11}, alignment: {horizontal: 'right', vertical: 'center'}};
    ws['G16'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'center'}};
    ws['G20'].s = {font: {sz: 11}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['G22'].s = {font: {sz: 11}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['G27'].s = {font: {sz: 11}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['G32'].s = {font: {sz: 11}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['G34'].s = {font: {sz: 11}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  }
  // 共同还款人承诺书
  createGthkrcns(wb) {
    var ws = this.getSheet(wb, 27, 8, '共同还款人承诺书');
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
      e: {c: 5, r: 13},
      s: {c: 2, r: 12}
    }];
    ws['!cols'] = [
      {wch: 10},
      {wch: 10.13},
      {wch: 3.5},
      {wch: 9.38},
      {wch: 12.13},
      {wch: 7.13},
      {wch: 6},
      {wch: 7.88}
    ];
    ws['!rows'] = [
      null,
      {hpt: 14.25, hpx: 14.25},
      {hidden: true, hpt: 23.25, hpx: 23.25},
      {hpt: 48, hpx: 48},
      {hpt: 20.25, hpx: 20.25},
      null,
      null,
      null,
      {hpt: 14.1, hpx: 14.1},
      null,
      {hpt: 4.5, hpx: 4.5},
      {hpt: 18, hpx: 18},
      null,
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
      {hpt: 13.5, hpx: 13.5}
    ];
    ws['B27'].f = '数据!B46';
    ws['C13'].f = '数据!B27';
    ws['D5'].f = '数据!B7';
    ws['D10'].f = '数据!B8';
    ws['D12'].f = '数据!B26';
    ws['E22'].f = '数据!B2';
    ws['E27'].f = '数据!B16';
    ws['F5'] = {v: ' ', t: 's', w: ' '};
    ws['G5'].f = '数据!B36';
    ws['G10'].f = '数据!B9';
    ws['G12'].f = '数据!B26';
    ws['H22'].f = '数据!B1';

    ws['B27'].s = {font: {sz: 9}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['C13'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['D5'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
    ws['D10'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['D12'].s = {font: {sz: 8}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['E22'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['E27'].s = {font: {sz: 9, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['F5'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['G5'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['G10'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['G12'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['H22'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['H25'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
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
      {hpt: 16.5, hpx: 16.5},
      {hidden: true},
      {hpt: 8.25, hpx: 8.25},
      null,
      null,
      null,
      null,
      null,
      null,
      {hpt: 34.5, hpx: 34.5},
      {hpt: 18, hpx: 18},
      {hpt: 18, hpx: 18},
      {hpt: 15.75, hpx: 15.75},
      null,
      {hpt: 3, hpx: 3}
    ];
    ws['C7'].f = '数据!B28';
    ws['C9'].f = '数据!B1';
    ws['C15'].f = '数据!B22';
    ws['C19'].f = '数据!B23';
    ws['C20'].f = '数据!B60';
    ws['D14'].f = '数据!B34';
    ws['D16'].f = '数据!B21';
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
      {hpt: 21.75, hpx: 21.75},
      {hpt: 188.25, hpx: 188.25},
      {hpt: 19.5, hpx: 19.5},
      {hpt: 22.5, hpx: 22.5},
      {hpt: 16.5, hpx: 16.5},
      {hpt: 48, hpx: 48},
      {hpt: 26.25, hpx: 26.25},
      {hpt: 30, hpx: 30}
    ];
    ws['C21'].f = '数据!B1';
    ws['C24'].f = '数据!B1';
    ws['C25'] = {v: '温州保利融资担保有限公司', t: 's', w: '温州保利融资担保有限公司'};
    ws['E24'].f = '数据!B7';

    ws['C21'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C24'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C25'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['E24'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  }
  // 合同6
  createHt6(wb) {
    var ws = this.getSheet(wb, 46, 9, '合同6');
    ws['!merges'] = [{
      e: {c: 3, r: 4},
      s: {c: 2, r: 4}
    }, {
      e: {c: 4, r: 5},
      s: {c: 3, r: 5}
    }, {
      e: {c: 5, r: 7},
      s: {c: 2, r: 7}
    }, {
      e: {c: 6, r: 8},
      s: {c: 2, r: 8}
    }, {
      e: {c: 6, r: 9},
      s: {c: 2, r: 9}
    }, {
      e: {c: 6, r: 10},
      s: {c: 4, r: 10}
    }, {
      e: {c: 6, r: 11},
      s: {c: 2, r: 11}
    }, {
      e: {c: 6, r: 13},
      s: {c: 4, r: 13}
    }, {
      e: {c: 4, r: 14},
      s: {c: 2, r: 14}
    }, {
      e: {c: 7, r: 14},
      s: {c: 5, r: 14}
    }, {
      e: {c: 7, r: 15},
      s: {c: 2, r: 15}
    }, {
      e: {c: 5, r: 16},
      s: {c: 3, r: 16}
    }, {
      e: {c: 7, r: 16},
      s: {c: 6, r: 16}
    }, {
      e: {c: 2, r: 18},
      s: {c: 1, r: 18}
    }, {
      e: {c: 5, r: 32},
      s: {c: 4, r: 32}
    }, {
      e: {c: 7, r: 32},
      s: {c: 6, r: 32}
    }, {
      e: {c: 3, r: 38},
      s: {c: 2, r: 38}
    }, {
      e: {c: 7, r: 38},
      s: {c: 6, r: 38}
    }, {
      e: {c: 5, r: 39},
      s: {c: 4, r: 39}
    }, {
      e: {c: 4, r: 45},
      s: {c: 3, r: 45}
    }, {
      e: {c: 2, r: 25},
      s: {c: 2, r: 24}
    }, {
      e: {c: 5, r: 25},
      s: {c: 5, r: 24}
    }, {
      e: {c: 5, r: 6},
      s: {c: 2, r: 6}
    }];
    ws['!cols'] = [
      {wch: 8.25},
      {wch: 6.5},
      {wch: 10},
      {wch: 9.13},
      {wch: 10.5},
      {wch: 11.5},
      {wch: 11.88},
      {wch: 8.13},
      {wch: 8.38}
    ];
    ws['!rows'] = [
      {hpt: 15, hpx: 15},
      {hidden: true, hpt: 2.25, hpx: 2.25},
      {hidden: true, hpt: 29.25, hpx: 29.25},
      {hidden: true, hpt: 6, hpx: 6},
      {hpt: 22.5, hpx: 22.5},
      {hpt: 14.25, hpx: 14.25},
      {hpt: 19.5, hpx: 19.5},
      {hpt: 10.5, hpx: 10.5},
      {hpt: 17.25, hpx: 17.25},
      {hpt: 24, hpx: 24},
      {hpt: 12.95, hpx: 12.949999999999998},
      {hpt: 11.25, hpx: 11.25},
      {hpt: 3, hpx: 3},
      {hpt: 14.25, hpx: 14.25},
      {hpt: 17.25, hpx: 17.25},
      {hpt: 17.25, hpx: 17.25},
      {hpt: 39, hpx: 39},
      {hpt: 8.25, hpx: 8.25},
      {hpt: 15.75, hpx: 15.75},
      {hidden: true, hpt: 11.25, hpx: 11.25},
      {hidden: true},
      {hidden: true},
      {hpt: 17.25, hpx: 17.25},
      {hpt: 59.25, hpx: 59.25},
      {hpt: 24, hpx: 24},
      {hpt: 26.25, hpx: 26.25},
      {hidden: true, hpt: 21.75, hpx: 21.75},
      {hidden: true},
      {hidden: true, hpt: 0.75, hpx: 0.75},
      {hpt: 6.75, hpx: 6.75},
      {hpt: 37.5, hpx: 37.5},
      {hpt: 9, hpx: 9},
      {hpt: 42, hpx: 42},
      null,
      null,
      {hpt: 9.75, hpx: 9.75},
      {hpt: 12, hpx: 12},
      {hpt: 23.25, hpx: 23.25},
      {hpt: 18.75, hpx: 18.75},
      {hpt: 18.75, hpx: 18.75}
    ];
    ws['B19'].f = '数据!B45';
    ws['B25'] = {v: 1, t: 'n', w: '1'};
    ws['C5'].f = '数据!B1';
    ws['C7'].f = '数据!B3';
    ws['C8'] = {v: '温州蝉街', t: 'n', w: '温州蝉街'};
    ws['C9'] = {v: '温州市蝉街113号', t: 'n', w: '温州蝉街'};
    ws['C10'] = {v: '温州保利融资担保有限公司', t: 'n', w: '温州保利融资担保有限公司'};
    ws['C12'] = {v: '温州市温州大道3号2幢', t: 'n', w: '温州市温州大道3号2幢'};
    ws['C14'].f = '数据!B1';
    ws['C15'].f = '数据!B2';
    ws['C16'].f = '数据!B3';
    ws['C25'].f = '数据!B34';
    ws['C39'].f = '数据!B78';
    ws['C40'].f = '数据!B79';
    ws['D6'].f = '数据!B2';
    ws['D17'].f = '数据!B50';
    ws['D18'].f = '数据!B10';
    ws['D25'].f = '数据!B20';
    ws['D46'].f = '数据!B40';
    ws['E11'] = {v: '913303006671217164', t: 's', w: '913303006671217164'};
    ws['E14'].f = '数据!B7';
    ws['E19'].f = '数据!B44';
    ws['E23'].f = '数据!B16';
    ws['E25'].f = '数据!B22';
    ws['E31'].f = '数据!B44';
    ws['E32'].f = '数据!B17';
    ws['E33'].f = '数据!B48';
    ws['E39'].f = '数据!B77';
    ws['F15'].f = '数据!B8';
    ws['F18'].f = '数据!B12';
    ws['F25'].f = '数据!B21';
    ws['F46'].f = '数据!B41';
    ws['G17'].f = '数据!B46';
    ws['G31'].f = '数据!B12';
    ws['G33'].f = '数据!B47';
    ws['G39'].f = '数据!B80';
    ws['H31'].f = '数据!B17';

    ws['B19'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['B25'].s = {font: {sz: 9}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['C5'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['C7'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['C8'].s = {font: {sz: 10, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['C9'].s = {font: {sz: 10, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C10'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['C12'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C14'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['C15'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C16'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C25'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'top', wrapText: true}};
    ws['C39'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['C40'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['D6'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['D17'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['D18'].s = {font: {sz: 8}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['D25'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['D46'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['E11'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['E14'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['E19'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['E23'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['E25'].s = {font: {sz: 9}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['E31'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['E32'].s = {font: {sz: 9}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['E33'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['E39'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['F15'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['F18'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['F25'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'top', wrapText: true}};
    ws['F46'].s = {font: {sz: 8}, alignment: {horizontal: 'right', vertical: 'center'}};
    ws['G17'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['G31'].s = {font: {sz: 8}, alignment: {horizontal: 'right', vertical: 'top'}};
    ws['G33'].s = {font: {sz: 9}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['G39'].s = {font: {sz: 8}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['H31'].s = {font: {sz: 9}, alignment: {horizontal: 'right', vertical: 'center'}};
  }
  // 合同7
  createHt7(wb) {
    var ws = this.getSheet(wb, 50, 9, '合同7');
    ws['!merges'] = [{
      e: {c: 5, r: 3},
      s: {c: 3, r: 3}
    }, {
      e: {c: 7, r: 3},
      s: {c: 6, r: 3}
    }, {
      e: {c: 5, r: 4},
      s: {c: 3, r: 4}
    }, {
      e: {c: 7, r: 4},
      s: {c: 6, r: 4}
    }, {
      e: {c: 7, r: 6},
      s: {c: 5, r: 6}
    }, {
      e: {c: 8, r: 22},
      s: {c: 6, r: 22}
    }, {
      e: {c: 2, r: 23},
      s: {c: 1, r: 23}
    }, {
      e: {c: 2, r: 24},
      s: {c: 1, r: 24}
    }, {
      e: {c: 4, r: 25},
      s: {c: 3, r: 25}
    }, {
      e: {c: 1, r: 36},
      s: {c: 1, r: 35}
    }, {
      e: {c: 2, r: 38},
      s: {c: 2, r: 35}
    }, {
      e: {c: 3, r: 36},
      s: {c: 3, r: 35}
    }, {
      e: {c: 4, r: 36},
      s: {c: 4, r: 35}
    }, {
      e: {c: 5, r: 36},
      s: {c: 5, r: 35}
    }, {
      e: {c: 8, r: 36},
      s: {c: 8, r: 35}
    }];
    ws['!cols'] = [
      {wch: 8.63},
      {wch: 9},
      {wch: 7.38},
      {wch: 5},
      {wch: 11.88},
      {wch: 6.5},
      {wch: 3.75},
      {wch: 8.38},
      {wch: 10}
    ];
    ws['!rows'] = [
      {hidden: true, hpt: 10.5, hpx: 10.5},
      {hidden: true},
      {hidden: true, hpt: 1.5, hpx: 1.5},
      {hidden: true, hpt: 22.5, hpx: 22.5},
      {hpt: 15, hpx: 15},
      {hpt: 25.5, hpx: 25.5},
      {hpt: 45, hpx: 45},
      null,
      null,
      {hidden: true},
      null,
      null,
      null,
      null,
      {hpt: 12, hpx: 12},
      {hidden: true, hpt: 43.5, hpx: 43.5},
      null,
      null,
      {hpt: 12, hpx: 12},
      null,
      {hpt: 7.5, hpx: 7.5},
      {hpt: 19.5, hpx: 19.5},
      {hpt: 18, hpx: 18},
      {hpt: 9, hpx: 9},
      {hpt: 15, hpx: 15},
      {hpt: 27.75, hpx: 27.75},
      null,
      null,
      null,
      null,
      null,
      {hpt: 1.5, hpx: 1.5},
      {hpt: 19.5, hpx: 19.5},
      {hpt: 16.5, hpx: 16.5},
      {hpt: 16.5, hpx: 16.5},
      {hpt: 14.25, hpx: 14.25},
      null,
      null,
      null,
      {hpt: 10.5, hpx: 10.5},
      {hidden: true, hpt: 0.75, hpx: 0.75},
      {hidden: true, hpt: 0.75, hpx: 0.75},
      null,
      null,
      null,
      null,
      {hpt: 47.25, hpx: 47.25},
      {hpt: 28.5, hpx: 28.5}
    ];
    ws['A44'] = {v: '（二）', t: 's', w: '（二）'};
    ws['B25'] = {v: '364958350985', t: 's', w: '364958350985'};
    ws['B36'].f = '数据!B19';
    ws['C36'].f = '数据!B34';
    ws['C49'] = {v: '肆', t: 's', w: '肆'};
    ws['D5'].f = '数据!B42';
    ws['D26'].f = '数据!B30';
    ws['D36'].f = '数据!B20';
    ws['E36'].f = '数据!B22';
    ws['F7'].f = '数据!B1';
    ws['F36'].f = '数据!B21';
    ws['G5'].f = '数据!B43';
    ws['G23'] = {v: '温州保利融资担保有限公司', t: 's', w: '温州保利融资担保有限公司'};
    ws['I36'].f = '数据!B23';
    ws['J24'] = {v: ' ', t: 's', w: ' '};

    ws['A44'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['B25'].s = {alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['B36'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['C36'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'top', wrapText: true}};
    ws['C49'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom', wrapText: true}};
    ws['D5'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['D26'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['D36'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['E36'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['F7'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
    ws['F36'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'center', wrapText: true}};
    ws['G5'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['G23'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['I36'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['J24'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  }
  // 合同8
  createHt8(wb) {
    var ws = this.getSheet(wb, 38, 9, '合同8');
    ws['!merges'] = [{
      e: {c: 8, r: 9},
      s: {c: 0, r: 9}
    }, {
      e: {c: 8, r: 10},
      s: {c: 0, r: 10}
    }, {
      e: {c: 3, r: 17},
      s: {c: 1, r: 17}
    }, {
      e: {c: 2, r: 38},
      s: {c: 1, r: 38}
    }];
    ws['!cols'] = [
      {wch: 8.25},
      {wch: 8.38},
      {wch: 8},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 8.38}
    ];
    ws['!rows'] = [
      null,
      {hidden: true, hpt: 9, hpx: 9},
      {hidden: true, hpt: 21, hpx: 21},
      {hidden: true, hpt: 30, hpx: 30},
      {hidden: true, hpt: 24.75, hpx: 24.75},
      {hidden: true, hpt: 39, hpx: 39},
      {hidden: true, hpt: 15.75, hpx: 15.75},
      {hidden: true, hpt: 30, hpx: 30},
      {hidden: true, hpt: 9, hpx: 9},
      {hpt: 17.25, hpx: 17.25},
      {hpt: 17.25, hpx: 17.25},
      null,
      null,
      {hpt: 34.5, hpx: 34.5},
      {hpt: 76.5, hpx: 76.5},
      {hidden: true, hpt: 15.75, hpx: 15.75},
      {hidden: true, hpt: 18.75, hpx: 18.75},
      {hpt: 19.5, hpx: 19.5},
      {hpt: 19.5, hpx: 19.5},
      null,
      null,
      {hpt: 11.25, hpx: 11.25},
      null,
      null,
      null,
      {hpt: 11.25, hpx: 11.25},
      {hpt: 19.5, hpx: 19.5},
      {hpt: 21, hpx: 21},
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      {hpt: 17.25, hpx: 17.25}
    ];
    ws['A10'] = {v: '1、朱虹、徐国荣提供全程连带责任保证，详见最高额保证合同编号2017温蝉保利保证A。', t: 's', w: '1、朱虹、徐国荣提供全程连带责任保证，详见最高额保证合同编号2017温蝉保利保证A。'};
    ws['A11'] = {v: '2、本合同生效后，机动车所有人方委托金融机构方办理相关车辆抵押或解除抵押手续。', t: 's', w: '2、本合同生效后，机动车所有人方委托金融机构方办理相关车辆抵押或解除抵押手续。'};
    ws['B18'] = {v: '温州蝉街支行', t: 's', w: '温州蝉街支行'};
    ws['C25'] = {v: ' ', t: 's', w: ' '};

    ws['A10'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['A11'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['B18'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C25'].s = {alignment: {horizontal: 'right', vertical: 'bottom'}};
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
