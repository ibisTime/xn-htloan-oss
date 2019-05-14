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
    this.createDkqrs(wb);
    this.createGthkcns(wb);
    this.createZxKfqbb(wb);
    this.createZxKfqbbPo(wb);
    this.createZxTybzx(wb);
    this.createZxTybzxPo(wb);
    this.createZxTybzxDbr(wb);
    this.createZjht(wb);
    this.createSqwts(wb);
    this.createSt1(wb);
    this.createSt2(wb);
    this.createSt3(wb);
    this.createXht1Bkyxfl(wb);
    this.createXht1(wb);
    this.createXht6(wb);
    this.createXht11(wb);
    this.createXht12(wb);
    this.createXht13(wb);
    this.createKhzl(wb);
    // download
    wb.downloadXls('建设银行-信用+担保');
  }
  // 数据
  createData(wb, data) {
    var ws = wb.getSheet(data, '数据');
    ws['!cols'] = [{
      wch: 27.5
    }, {
      wch: 47.88
    }];
    ws['!rows'] = [];
    ws['!rows'][20] = {hpt: 57, hpx: 57};
      ws['B9'].f = 'IF(INT(B31)*100=B31*100,TEXT(INT(B31),"[$-0804][DBNum2]G/通用格式")&"元整",IF(INT(B31*10)=B31*10,TEXT(INT(B31),"[$-0804][DBNum2]G/通用格式")&"元整"&TEXT(B31*10-INT(B31)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B31),"[$-0804][DBNum2]G/通用格式")&"元整"&IF(INT(B31*10)=INT(B31)*10,"零",TEXT(RIGHT(INT(B31*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B31*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
      ws['B10'].f = 'B31&"元"';
      ws['B14'].f = 'IF(INT(B31*B13/100)*100=B31*B13/100*100,TEXT(INT(B31*B13/100),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(B31*B13/100*10)=B31*B13/100*10,TEXT(INT(B31*B13/100),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(B31*B13/100*10-INT(B31*B13/100)*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(B31*B13/100),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(B31*B13/100*10)=INT(B31*B13/100)*10,"零",TEXT(RIGHT(INT(B31*B13/100*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(B31*B13/100*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
      ws['B19'].f = 'B16-B31';
      ws['B20'].f = 'B19&"元"';
      ws['B21'].f = 'B1&","&IF(MOD(MID(B2,17,1),2),"男","女")&","&IF(LEN(B6)>=2,"已婚",IF(B6=" ","离婚","未婚"))&","&"现居住于"&B3&","&"就业于"&B17&","&"现购自备车壹辆，主要行驶于温州区域。"';
      ws['B22'].f = 'B12/12&"年"';
      ws['B23'].f = 'IF(B12/12=3,"叁",IF(B12/12=2,"贰",IF(B12/12=1.5,"一年半",IF(B12/12=1,"壹","数据错误"))))';

      ws['A13'].s = {font: {color: {rgb: 'FF6600'}}};
      ws['A14'].s = {font: {color: {rgb: 'FF6600'}}};
      ws['A19'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
      ws['A21'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center', wrapText: true}};
      ws['A34'].s = {fill: {fgColor: {rgb: 'C0C0C0'}}};
      ws['A35'].s = {fill: {fgColor: {rgb: 'C0C0C0'}}};
      ws['A36'].s = {fill: {fgColor: {rgb: 'C0C0C0'}}};
      ws['B34'].s = {fill: {fgColor: {rgb: 'C0C0C0'}}};
      ws['B35'].s = {fill: {fgColor: {rgb: 'C0C0C0'}}};
      ws['B36'].s = {fill: {fgColor: {rgb: 'C0C0C0'}}};
  }
  // 贷款确认书
  createDkqrs(wb) {
    var ws = this.getSheet(wb, 48, 9, '贷款确认书');
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
    ws['D10'].f = '数据!B20';
    ws['D12'] = {v: '建行', t: 's', w: '建行'};
    ws['D16'].f = '数据!B21';
    ws['E10'].f = '数据!B22';
    ws['H5'].f = '数据!B1';
    ws['H10'].f = '数据!B10';

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
  // 共同还款承诺书
  createGthkcns(wb) {
    var ws = this.getSheet(wb, 48, 8, '共同还款承诺书');
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
      {wch: 15},
      {wch: 7.75},
      {wch: 10.13},
      {wch: 7.5},
      {wch: 9},
      {wch: 5.25},
      {wch: 8.38},
      {wch: 8.38}
    ];
    ws['!rows'] = [
      {hpt: 46.5, hpx: 46.5},
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
  // 征信-开发区版本
  createZxKfqbb(wb) {
    var ws = this.getSheet(wb, 48, 8, '征信-开发区版本');
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
      {hidden: true, hpt: 0.75, hpx: 0.75},
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
      null,
      null,
      null,
      null,
      null,
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
    ws['C35'] = {v: '身份证', t: 's', w: '身份证'};
    ws['D35'].f = '数据!B2';

    ws['C35'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['D35'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'center'}};
  }
  // 征信-开发区版本（配偶）
  createZxKfqbbPo(wb) {
    var ws = this.getSheet(wb, 48, 8, '征信-开发区版本（配偶）');
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
      {hpt: 18, hpx: 18}
    ];
    ws['C35'] = {v: '身份证', t: 's', w: '身份证'};
    ws['D35'].f = '数据!B7';

    ws['C35'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['D35'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'center'}};
  }
  // 征信-通用版最新
  createZxTybzx(wb) {
    var ws = this.getSheet(wb, 48, 8, '征信-通用版最新');
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
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
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
    ws['C7'].f = 'LEFT(数据!B34,FIND("支行",数据!B34)-1)';
    ws['C38'] = {v: '身份证', t: 's', w: '身份证'};
    ws['D38'].f = '数据!B2';

    ws['C7'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['C38'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['D38'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  }
  // 征信-通用版最新(配偶)
  createZxTybzxPo(wb) {
    var ws = this.getSheet(wb, 48, 8, '征信-通用版最新(配偶)');
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
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
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
    ws['C7'].f = 'LEFT(数据!B34,FIND("支行",数据!B34)-1)';
    ws['C38'] = {v: '身份证', t: 's', w: '身份证'};
    ws['D38'].f = '数据!B7';

    ws['C7'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['C38'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['D38'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  }
  // 征信-通用版最新(担保人)
  createZxTybzxDbr(wb) {
    var ws = this.getSheet(wb, 48, 8, '征信-通用版最新(担保人)');
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
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
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
    ws['C7'].f = 'LEFT(数据!B34,FIND("支行",数据!B34)-1)';
    ws['C38'] = {v: '身份证', t: 's', w: '身份证'};
    ws['D38'].f = '数据!B37';

    ws['C7'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['C38'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['D38'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
  }
  // 中介合同
  createZjht(wb) {
    var ws = this.getSheet(wb, 48, 8, '中介合同');
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
      e: {c: 3, r: 17},
      s: {c: 1, r: 17}
    }, {
      e: {c: 3, r: 6},
      s: {c: 1, r: 6}
    }, {
      e: {c: 4, r: 14},
      s: {c: 5, r: 14}
    }];
    ws['!cols'] = [
      {wch: 9.5},
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
      {hpt: 51.75, hpx: 51.75},
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
    ws['B18'].f = '数据!B10';
    ws['D14'].f = '数据!B32';
    ws['E15'].f = '数据!B34';
    ws['E18'].f = '数据!B23';
    ws['F6'].f = '数据!B2';
    ws['F7'].f = '数据!B5';
    ws['F17'].f = '数据!B34';

    ws['B6'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['B7'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B18'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['D14'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['E15'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['E18'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['F6'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'center'}};
    ws['F7'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['F17'].s = {font: {sz: 9}, alignment: {horizontal: 'left', vertical: 'top'}};
  }
  // 授权委托书
  createSqwts(wb) {
    var ws = this.getSheet(wb, 10, 8, '授权委托书');
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
      {hpt: 13.5, hpx: 13.5},
      {hpt: 6, hpx: 6},
      null,
      null,
      {hpt: 27, hpx: 27}
    ];
    ws['C10'].f = '数据!B34';
    ws['E7'].f = '数据!B34';

    ws['C10'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['E7'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  }
  // 收妥1
  createSt1(wb) {
    var ws = this.getSheet(wb, 48, 10, '收妥1');
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
    ws['B16'].f = '数据!B1';
    ws['C16'].f = '数据!B1';
    ws['E16'].f = 'IF(数据!B34="瑞安支行","车辆登记证书","汽车")';
    ws['E18'].f = 'IF(数据!B34="瑞安支行","发票","")';
    ws['E20'].f = 'IF(数据!B34="瑞安支行","商业险","")';
    ws['G8'].f = '数据!B1';
    ws['I16'].f = '数据!B10';

    ws['B16'].s = {font: {sz: 16}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['C16'].s = {font: {sz: 16}, alignment: {horizontal: 'right', vertical: 'center'}};
    ws['E16'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['E18'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['E20'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['G8'].s = {font: {sz: 16}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['I16'].s = {font: {sz: 16}, alignment: {horizontal: 'left', vertical: 'center'}};
  }
  // 收妥2
  createSt2(wb) {
    var ws = this.getSheet(wb, 49, 8, '收妥2');
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
    ws['G12'].f = '数据!B16';
    ws['G49'] = {v: '商业险', t: 's', w: '商业险'};

    ws['A49'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['E10'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['E49'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['G12'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
    ws['G49'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'center'}};
  }
  // 收妥3
  createSt3(wb) {
    var ws = this.getSheet(wb, 48, 8, '收妥3');
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
      {hpt: 12, hpx: 12},
      {hpt: 12, hpx: 12},
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
    ws['G12'].f = '数据!B16';
    ws['G45'] = {v: '商业险', t: 's', w: '商业险'};

    ws['A45'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['E10'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['E45'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['G12'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
    ws['G45'].s = {font: {sz: 11}, alignment: {horizontal: 'left', vertical: 'center'}};
  }
  // 新合同1（别克与雪佛兰）
  createXht1Bkyxfl(wb) {
    var ws = this.getSheet(wb, 48, 8, '新合同1（别克与雪佛兰）');
    ws['!merges'] = [{
      e: {c: 2, r: 22},
      s: {c: 1, r: 22}
    }, {
      e: {c: 5, r: 22},
      s: {c: 3, r: 22}
    }, {
      e: {c: 3, r: 9},
      s: {c: 1, r: 9}
    }, {
      e: {c: 6, r: 9},
      s: {c: 5, r: 9}
    }, {
      e: {c: 2, r: 16},
      s: {c: 1, r: 16}
    }, {
      e: {c: 7, r: 20},
      s: {c: 5, r: 20}
    }];
    ws['!cols'] = [
      {wch: 4.25},
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
      {hpt: 16.5, hpx: 16.5},
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
      {hpt: 36, hpx: 36},
      null,
      null,
      null,
      {hpt: 10.5, hpx: 10.5},
      null,
      {hpt: 13.5, hpx: 13.5},
      {hpt: 21.75, hpx: 21.75}
    ];
    ws['B10'].f = '数据!B9';
    ws['B15'].f = '数据!B12';
    ws['B17'].f = '数据!B14';
    ws['E11'].f = '数据!B11';
    ws['E17'] = {v: '一', t: 's', w: '一'};
    ws['E30'] = {v: '一', t: 's', w: '一'};
    ws['F10'].f = '数据!B10';
    ws['F11'] = {v: '壹', t: 's', w: '壹'};
    ws['F20'].f = '数据!B13';
    ws['F21'].f = 'B17';
    ws['G14'].f = '数据!B23';

    ws['B10'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['B15'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'top'}};
    ws['B17'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'top', wrapText: true}};
    ws['E11'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['E17'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'top'}};
    ws['E30'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'top'}};
    ws['F10'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['F11'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'center'}};
    ws['F20'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'center'}};
    ws['F21'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['G14'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  }
  // 新合同1
  createXht1(wb) {
    var ws = this.getSheet(wb, 48, 8, '新合同1');
    ws['!merges'] = [{
      e: {c: 7, r: 20},
      s: {c: 5, r: 20}
    }, {
      e: {c: 2, r: 22},
      s: {c: 1, r: 22}
    }, {
      e: {c: 3, r: 9},
      s: {c: 1, r: 9}
    }, {
      e: {c: 6, r: 9},
      s: {c: 5, r: 9}
    }, {
      e: {c: 5, r: 10},
      s: {c: 4, r: 10}
    }, {
      e: {c: 2, r: 16},
      s: {c: 1, r: 16}
    }];
    ws['!cols'] = [
      {wch: 4.25},
      {wch: 9.13},
      {wch: 7.88},
      {wch: 6.75},
      {wch: 12.38},
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
      {hpt: 17.25, hpx: 17.25},
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
      {hpt: 16.5, hpx: 16.5},
      {hpt: 16.5, hpx: 16.5},
      {hpt: 6.75, hpx: 6.75},
      null,
      null,
      null,
      null,
      null,
      {hpt: 35.25, hpx: 35.25},
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
    ws['B15'].f = '数据!B12';
    ws['B17'].f = '数据!B14';
    ws['E11'].f = '数据!B11';
    ws['E24'].f = '数据!B13';
    ws['F10'].f = '数据!B10';
    ws['F17'] = {v: '二', t: 's', w: '二'};
    ws['F30'] = {v: '一', t: 's', w: '一'};
    ws['G11'] = {v: '壹', t: 's', w: '壹'};
    ws['G14'].f = '数据!B23';
    ws['H24'].f = '数据!B14';

    ws['B10'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['B15'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'top'}};
    ws['B17'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'top', wrapText: true}};
    ws['E11'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['E24'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['F10'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['F17'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'top'}};
    ws['F30'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'top'}};
    ws['G11'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['G14'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['H24'].s = {font: {sz: 9}, alignment: {horizontal: 'left', vertical: 'center'}};
  }
  // 新合同6
  createXht6(wb) {
    var ws = this.getSheet(wb, 48, 8, '新合同6');
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
      {hpt: 198, hpx: 198},
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
    ws['G16'].f = '数据!B2';

    ws['C16'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['G16'].s = {font: {sz: 9}, alignment: {horizontal: 'left', vertical: 'center'}};
  }
  // 新合同11
  createXht11(wb) {
    var ws = this.getSheet(wb, 48, 9, '新合同11');
    ws['!merges'] = [{
      e: {c: 8, r: 42},
      s: {c: 7, r: 42}
    }];
    ws['!cols'] = [
      {wch: 8.38},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 6.5},
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
      null,
      null,
      {hpt: 15, hpx: 15},
      null,
      {hpt: 24, hpx: 24},
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
  createXht12(wb) {
    var ws = this.getSheet(wb, 48, 8, '新合同12');
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
      {hpt: 9, hpx: 9},
      null,
      {hpt: 8.25, hpx: 8.25}
    ];
    ws['C45'] = {v: '    本抵押合同生效后，机动车所有人方委托金融机构方，', t: 's', w: '    本抵押合同生效后，机动车所有人方委托金融机构方，'};
    ws['C47'] = {v: '办理相关车辆抵押或解除抵押手续。', t: 's', w: '办理相关车辆抵押或解除抵押手续。'};

    ws['C45'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
    ws['C47'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'center'}};
  }
  // 新合同13
  createXht13(wb) {
    var ws = this.getSheet(wb, 48, 9, '新合同13');
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
      {wch: 13.63},
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
      {hpt: 3.75, hpx: 3.75},
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
    ws['C15'].f = '数据!B36';
    ws['D17'].f = '数据!B1';
    ws['D19'].f = 'G4';
    ws['D21'].f = '数据!B3';
    ws['D23'].f = '数据!B3';
    ws['E8'].f = '数据!B34';
    ws['E11'].f = '数据!B35';
    ws['E13'].f = '数据!B35';
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
  // 客户资料
  createKhzl(wb) {
    var ws = this.getSheet(wb, 48, 12, '客户资料');
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
    ws['C2'].f = '数据!B11';
    ws['D1'] = {v: '部门', t: 's', w: '部门'};
    ws['D2'] = {v: '新车贷', t: 's', w: '新车贷'};
    ws['E1'] = {v: '经办人', t: 's', w: '经办人'};
    ws['F1'] = {v: '车价（万元）', t: 's', w: '车价（万元）'};
    ws['F2'].f = '数据!B16/10000';
    ws['G1'] = {v: '贷款额（万元）', t: 's', w: '贷款额（万元）'};
    ws['G2'].f = '数据!B31/10000';
    ws['H1'] = {v: '备注', t: 's', w: '备注'};
    ws['H2'] = {v: '信用+担保', t: 's', w: '信用+担保'};
    ws['I1'] = {v: '放款银行', t: 's', w: '放款银行'};
    ws['I2'] = {v: '建行', t: 's', w: '建行'};
    ws['J1'] = {v: '收件时间', t: 's', w: '收件时间'};
    ws['J2'] = {v: 43332, t: 'd', f: 'TODAY()', w: '8/20/18'};
    ws['K1'] = {v: '利率', t: 's', w: '利率'};
    ws['K2'].f = '数据!B13';
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
  getMargins() {
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
