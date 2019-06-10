import React from 'react';
import { getWorkbook } from 'common/js/xlsx-util';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/printing/mortgage-make';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    moneyFormat,
    moneyUppercase,
    dateFormat,
    formatDate,
    numUppercase,
    moneyReplaceComma,
    moneyParse
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';
import { createHt } from '../../../common/js/contract/ICBC-dbht';
import { exportBOCZdzsxffq } from '../../../common/js/contract/BOC-zdzsxffq';
import { exportBOCSxfycx } from '../../../common/js/contract/BOC-sxfycx';
import { exportBOCDy } from '../../../common/js/contract/BOC-dy';
import { exportBOCCt } from '../../../common/js/contract/BOC-ct';
import { exportBOCJcdy } from '../../../common/js/contract/BOC-jcdy';
import { exportBOCZdzfjf } from '../../../common/js/contract/BOC-zdzfjf';
import { exportCCBDy } from '../../../common/js/contract/CCB-dy';
import { exportCCBFwf } from '../../../common/js/contract/CCB-fwf';
import { exportBOCFjd } from '../../../common/js/contract/CCB-fjd';
import { exportCCBJc } from '../../../common/js/contract/CCB-jc';
import { exportCCBXydb } from '../../../common/js/contract/CCB-xydb';
@DetailWrapper(
    state => state.printingMortgageMake, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class MortgageMake extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    createHt(data) {
      const wb = getWorkbook();
      this.createData(wb, data);
      this.createXycdydjb(wb);
      this.createWtsgh(wb);
      this.createWtsqtyh(wb);
      this.createDecdydjb(wb);
      this.createGssqwts(wb);
      this.createTjysqwt(wb);
      this.createDbht(wb);
      this.createDyht(wb);
      wb.downloadXls('车辆抵押-工商银行');
    }
    // 内容
    createData(wb, data) {
      let str = dateFormat(data.pledgePrintDatetime);
      let date = str.split('-');
      date[1] = date[1] - 0;
      date[2] = date[2] - 0;
      let pageData = this.props.pageData;
      let arr01 = ['', '普通', '白金'];
      let arr = [
          ['主贷人姓名', data.customerName],
          ['身份证号码', data.idNo],
          ['配偶姓名', data.ghRealName],
          ['身份证号码', data.ghIdNo],
          ['家庭住址', data.applyNowAddress],
          ['合同编号', data.bankContractCode],
          ['车牌号', data.carNumber],
          ['车架号', data.frameNo],
          ['发动机号', data.engineNo],
          ['贷款（大写）', ''],
          ['贷款（小写）', moneyReplaceComma(moneyFormat(data.loanAmount))],
          ['履约保证金（大写）', ''],
          ['履约保证金（小写）', ''],
          ['年份', date[0]],
          ['月', date[1]],
          ['日', date[2]],
          ['贷款期限（年）', data.loanPeriods / 12],
          ['银行委托人', pageData.bankSubbranch.bankClient],
          ['银行名称', pageData.bankSubbranch.fullName],
          ['银行地址', pageData.bankSubbranch.address],
          ['银行电话', pageData.bankSubbranch.phoneNumber],
          ['委托书有效期', pageData.bankSubbranch.clientValidDate],
          ['授权人姓名', pageData.bankSubbranch.autherName],
          ['授权人身份证', pageData.bankSubbranch.autherIdNo],
          ['授权人住址', pageData.bankSubbranch.autherAddress],
          ['授权人电话', pageData.bankSubbranch.autherPhoneNumber],
          ['信用卡类型', arr01[pageData.bankSubbranch.creditCardType]],
          ['信用卡名称', pageData.bankSubbranch.creditCardName],
          ['所属地区', pageData.bankSubbranch.belongArea]
      ];
      var ws = wb.getSheet(arr, '内容');
      ws['!cols'] = [
        {wch: 27.2},
        {wch: 40.3}
      ];
      ws['!rows'] = [];
      ws['!rows'][20] = {hpt: 15, hpx: 15};
      // formula
      ws['B10'].f = 'TEXT(INT(ROUND(B11,2)),"[$-0804][DBNum2]G/通用格式")';
      ws['B12'].f = 'IF(INT(ROUND(B13,2))*100=ROUND(B13,2)*100,TEXT(INT(ROUND(B13,2)),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(ROUND(B13,2)*10)=ROUND(B13,2)*10,TEXT(INT(ROUND(B13,2)),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(ROUND(B13,2)*10-INT(ROUND(B13,2))*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(ROUND(B13,2)),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(ROUND(B13,2)*10)=INT(ROUND(B13,2))*10,"零",TEXT(RIGHT(INT(ROUND(B13,2)*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(ROUND(B13,2)*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
      ws['B13'].f = 'TEXT(B11*0.03,"0.00")';
      // style
      ws['A22'].s = ws['B22'].s = ws['A29'].s = ws['B29'].s = {font: {color: {rgb: 'FF0000'}}};
    }
    // 新一次抵押登记表
    createXycdydjb(wb) {
      var ws = this.getSheet(wb, 23, 7, '新一次抵押登记表');
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
        {wch: 8.1},
        {wch: 8.1},
        {wch: 8.1},
        {wch: 8.1},
        {wch: 8.1},
        {wch: 19.6},
        {wch: 10.8}
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
        {hpt: 26.25, hpx: 26.25},
        null
      ];
      ws['C6'] = {v: '小型汽车', t: 's', w: '小型汽车'};
      ws['C10'].f = '内容!B1';
      ws['C17'].f = 'IF(内容!B29="温州",内容!B19,IF(内容!B18="陈建忠",内容!B19,IF(内容!B19<>"中国工商银行股份有限公司温州城东支行",内容!B19,"")))';
      ws['C20'].f = 'IF(内容!B19<>"中国工商银行股份有限公司温州城东支行",内容!B20,"")';
      ws['E23'].f = 'IF(内容!B19<>"中国工商银行股份有限公司温州城东支行",内容!B21,"")';
      ws['G6'].f = '内容!B7';

      ws['C6'].s = {font: {sz: 18}, alignment: {horizontal: 'center', vertical: 'bottom'}};
      ws['C10'].s = {font: {sz: 18}, alignment: {horizontal: 'center', vertical: 'center'}};
      ws['C17'].s = ws['C20'].s = {font: {sz: 10}};
      ws['E23'].s = {alignment: {horizontal: 'center', vertical: 'bottom'}};
      ws['G6'].s = {font: {sz: 14}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    }
    // 委托书 (工行)
    createWtsgh(wb) {
      var ws = this.getSheet(wb, 22, 8, '委托书 (工行）');
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
      ws['!cols'] = [
        {wch: 8.1},
        {wch: 8.1},
        {wch: 8.1},
        {wch: 10.6},
        {wch: 8.1},
        {wch: 8.1},
        {wch: 6.3},
        {wch: 8.1}
      ];
      ws['A22'].f = '内容!B19';
      ws['B12'] = {v: '抵押登记', t: 's', w: '抵押登记'};
      ws['H9'].f = '内容!B7';

      ws['A22'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
      ws['B12'].s = {font: {sz: 16}, alignment: {horizontal: 'center', vertical: 'center'}};
      ws['H9'].s = {alignment: {horizontal: 'right', vertical: 'center'}};
    }
    // 委托书（其他银行）
    createWtsqtyh(wb) {
      var ws = this.getSheet(wb, 16, 5, '委托书（其他银行）');
      ws['!merges'] = [{
        e: {c: 3, r: 8},
        s: {c: 2, r: 8}
      }, {
        e: {c: 2, r: 11},
        s: {c: 1, r: 11}
      }];
      ws['!rows'] = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        {hpt: 12.75, hpx: 12.75},
        {hpt: 30, hpx: 30},
        {hpt: 1.5, hpx: 1.5},
        {hidden: true, hpt: 0.75, hpx: 0.75},
        {hpt: 29.25, hpx: 29.25},
        null,
        null,
        {hpt: 36.75, hpx: 36.75}
      ];
      ws['!cols'] = [
        {wch: 8.1},
        {wch: 8.1},
        {wch: 8.1},
        {wch: 9.8},
        {wch: 8.1}
      ];
      ws['B12'].f = '内容!B7';
      ws['C9'].f = '内容!B18';
      ws['E16'].f = '内容!B22';

      ws['B12'].s = {font: {sz: 16}, alignment: {horizontal: 'center', vertical: 'bottom'}};
      ws['C9'].s = {font: {sz: 18}, alignment: {horizontal: 'center', vertical: 'center'}};
      ws['E16'].s = {font: {sz: 14}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    }
    // 新二次抵押登记表
    createDecdydjb(wb) {
      var ws = this.getSheet(wb, 20, 7, '新二次抵押登记表');
      ws['!merges'] = [{
        e: {c: 3, r: 4},
        s: {c: 2, r: 4}
      }, {
        e: {c: 3, r: 8},
        s: {c: 2, r: 8}
      }, {
        e: {c: 5, r: 14},
        s: {c: 2, r: 14}
      }, {
        e: {c: 5, r: 17},
        s: {c: 4, r: 17}
      }];
      ws['!rows'] = [
        null,
        null,
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
      ws['!cols'] = [
        {wch: 8.1},
        {wch: 8.3},
        {wch: 8.1},
        {wch: 8.1},
        {wch: 10.3},
        {wch: 15.8},
        {wch: 10.2}
      ];
      ws['C5'] = {v: '小型汽车', t: 's', w: '小型汽车'};
      ws['C9'].f = '内容!B1';
      ws['C15'].f = '内容!B25';
      ws['C18'] = {v: 325000, t: 'n', w: '325000'};
      ws['D12'].f = '内容!B23';
      ws['E18'].f = '内容!B26';
      ws['G5'].f = '内容!B7';

      ws['C5'].s = {font: {sz: 18}, alignment: {vertical: 'bottom', horizontal: 'center'}};
      ws['C9'].s = {font: {sz: 18}, alignment: {vertical: 'bottom', horizontal: 'right'}};
      ws['C15'].s = {alignment: {vertical: 'center', horizontal: 'left'}};
      ws['C18'].s = {alignment: {vertical: 'bottom', horizontal: 'left'}};
      ws['D12'].s = {font: {sz: 16}, alignment: {vertical: 'top', horizontal: 'center'}};
      ws['E18'].s = {alignment: {vertical: 'bottom', horizontal: 'center'}};
      ws['G5'].s = {font: {sz: 14}, alignment: {vertical: 'bottom', horizontal: 'right'}};
    }
    // 公司授权委托书
    createGssqwts(wb) {
      var ws = this.getSheet(wb, 16, 3, '公司授权委托书');
      ws['!margins'] = this.getMargins();
      ws['!merges'] = [{
        e: {c: 7, r: 9},
        s: {c: 6, r: 9}
      }];
      ws['!rows'] = [
        null,
        null,
        null,
        null,
        {hpt: 9, hpx: 9},
        {hpt: 9.75, hpx: 9.75},
        {hpt: 9, hpx: 9},
        {hpt: 18.75, hpx: 18.75},
        {hpt: 18, hpx: 18},
        {hpt: 27, hpx: 27},
        {hpt: 24, hpx: 24}
      ];
      ws['!cols'] = [
        {wch: 9.3},
        {wch: 6.1},
        {wch: 9.5}
      ];
      ws['A8'].f = 'IF(内容!B29="温州",内容!B29,"")';
      ws['C11'].f = '内容!B7';
      ws['C16'].f = '内容!B22';

      ws['A8'].s = {font: {sz: 14}, alignment: {horizontal: 'left', vertical: 'top'}};
      ws['C11'].s = {alignment: {horizontal: 'center', vertical: 'bottom'}};
      ws['C16'].s = {alignment: {horizontal: 'right', vertical: 'bottom'}};
    }
    // 滕洁瑜授权委托
    createTjysqwt(wb) {
      var ws = this.getSheet(wb, 14, 7, '滕洁瑜授权委托');
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
      ws['!rows'] = [
        null,
        null,
        null,
        {hpt: 21, hpx: 21},
        {hpt: 21, hpx: 21},
        {hpt: 15, hpx: 15},
        {hpt: 20.25, hpx: 20.25},
        {hpt: 0.75, hpx: 0.75},
        {hpt: 9, hpx: 9},
        {hpt: 22.5, hpx: 22.5},
        {hpt: 20.25, hpx: 20.25}
      ];
      ws['!cols'] = [
        {wch: 9.3},
        {wch: 8.1},
        {wch: 8.1},
        {wch: 8.8},
        {wch: 8.1},
        {wch: 8.1},
        {wch: 9.3}
      ];
      ws['A6'].f = 'IF(内容!B29="温州",内容!B29,"")';
      ws['B11'] = {v: '抵押登记', t: 's', w: '抵押登记'};
      ws['C7'].f = '内容!B23';
      ws['E7'].f = '内容!B24';
      ws['F9'].f = '内容!B7';
      ws['G14'].f = 'IF(内容!B28="龙卡信用","90","180")';
      ws['A6'].s = {font: {sz: 14}, alignment: {horizontal: 'left', vertical: 'bottom'}};
      ws['B11'].s = {font: {sz: 14}, alignment: {horizontal: 'left', vertical: 'top'}};
      ws['C7'].s = {font: {sz: 14}, alignment: {horizontal: 'center', vertical: 'bottom'}};
      ws['E7'].s = {font: {sz: 14}, alignment: {horizontal: 'right', vertical: 'center'}};
      ws['F9'].s = {alignment: {horizontal: 'right', vertical: 'center'}};
      ws['G14'].s = {font: {sz: 14}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    }
    // 担保合同
    createDbht(wb) {
      var ws = this.getSheet(wb, 26, 9, '担保合同');
      ws['!merges'] = [{
        s: {c: 1, r: 10},
        e: {c: 2, r: 10}
      }, {
        s: {c: 3, r: 10},
        e: {c: 4, r: 10}
      }, {
        s: {c: 6, r: 24},
        e: {c: 8, r: 24}
      }, {
        s: {c: 6, r: 3},
        e: {c: 8, r: 3}
      }, {
        s: {c: 2, r: 5},
        e: {c: 4, r: 5}
      }, {
        s: {c: 2, r: 6},
        e: {c: 5, r: 6}
      }, {
        s: {c: 7, r: 6},
        e: {c: 8, r: 6}
      }, {
        s: {c: 1, r: 9},
        e: {c: 5, r: 9}
      }, {
        s: {c: 6, r: 9},
        e: {c: 7, r: 9}
      }];
      ws['!rows'] = [
        null,
        {'hpt': 18.75, 'hpx': 18.75},
        {'hpt': 9.75, 'hpx': 9.75},
        {'hpt': 19.5, 'hpx': 19.5},
        null,
        {'hpt': 12.75, 'hpx': 12.75},
        {'hpt': 14.25, 'hpx': 14.25},
        {'hpt': 3, 'hpx': 3},
        {'hpt': 10.5, 'hpx': 10.5},
        {'hpt': 21.75, 'hpx': 21.75},
        {'hpt': 11.25, 'hpx': 11.25},
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        {'hpt': 13.5, 'hpx': 13.5},
        null,
        {'hpt': 8.25, 'hpx': 8.25},
        {'hpt': 21.75, 'hpx': 21.75},
        {'hpt': 15, 'hpx': 15}
      ];
      ws['!cols'] = [
        {wch: 8},
        {wch: 8.54},
        {wch: 5},
        {wch: 5.5},
        {wch: 10.5},
        {wch: 9.3},
        {wch: 4.7},
        {wch: 12.3},
        {wch: 8.1}
      ];
      ws['B10'].f = '内容!B19';
      ws['B11'].f = '内容!B10';
      ws['C5'].f = '内容!B1';
      ws['B26'].f = '内容!B13';
      ws['C6'] = {'v': '温州浩源控股有限公司', 't': 's', 'w': '温州浩源控股有限公司'};
      ws['C7'].f = '内容!B19';
      ws['D11'].f = '内容!B11';
      ws['F11'].f = '内容!B17';
      ws['G4'].f = '内容!B6';
      ws['G10'].f = '内容!B27';
      ws['G25'].f = '内容!B12';
      ws['H7'].f = '内容!B27';

      ws['B10'].s = {font: {sz: 8}, alignment: {vertical: 'center', horizontal: 'center'}};
      ws['B11'].s = {font: {sz: 7}, alignment: {vertical: 'bottom', horizontal: 'center'}};
      ws['B26'].s = {font: {sz: 11}, alignment: {vertical: 'bottom', horizontal: 'left'}};
      ws['C5'].s = ws['C6'].s = {font: {sz: 11}, alignment: {vertical: 'bottom', horizontal: 'left'}};
      ws['C7'].s = {font: {sz: 8}, alignment: {vertical: 'bottom', horizontal: 'center'}};
      ws['D11'].s = {font: {sz: 10}, alignment: {vertical: 'bottom', horizontal: 'center'}};
      ws['F11'].s = {font: {sz: 11}, alignment: {vertical: 'bottom', horizontal: 'center'}};
      ws['G4'].s = {font: {sz: 9}, alignment: {vertical: 'center', horizontal: 'center'}};
      ws['G10'].s = {font: {sz: 8}, alignment: {vertical: 'center', horizontal: 'center'}};
      ws['G25'].s = {font: {sz: 9}, alignment: {vertical: 'center', horizontal: 'center'}};
      ws['H7'].s = {font: {sz: 8}, alignment: {vertical: 'bottom', horizontal: 'center'}};
    }
    // 抵押合同
    createDyht(wb) {
      var ws = this.getSheet(wb, 31, 9, '抵押合同');
      ws['!merges'] = [{
        s: {c: 3, r: 18},
        e: {c: 4, r: 18}
      }, {
        s: {c: 3, r: 19},
        e: {c: 4, r: 19}
      }, {
        s: {c: 3, r: 23},
        e: {c: 4, r: 23}
      }, {
        s: {c: 1, r: 30},
        e: {c: 2, r: 30}
      }, {
        s: {c: 2, r: 28},
        e: {c: 3, r: 29}
      }, {
        s: {c: 1, r: 10},
        e: {c: 4, r: 10}
      }, {
        s: {c: 4, r: 11},
        e: {c: 8, r: 11}
      }, {
        s: {c: 4, r: 12},
        e: {c: 8, r: 12}
      }, {
        s: {c: 2, r: 13},
        e: {c: 3, r: 13}
      }, {
        s: {c: 4, r: 15},
        e: {c: 6, r: 15}
      }, {
        s: {c: 7, r: 15},
        e: {c: 8, r: 15}
      }, {
        s: {c: 1, r: 6},
        e: {c: 2, r: 6}
      }, {
        s: {c: 3, r: 6},
        e: {c: 4, r: 6}
      }, {
        s: {c: 5, r: 6},
        e: {c: 8, r: 6}
      }, {
        s: {c: 1, r: 7},
        e: {c: 2, r: 7}
      }, {
        s: {c: 3, r: 7},
        e: {c: 4, r: 7}
      }, {
        s: {c: 5, r: 7},
        e: {c: 8, r: 7}
      }];
      ws['!rows'] = [
        null,
        null,
        {hpt: 6, hpx: 6},
        {hidden: true, hpt: 12.75, hpx: 12.75},
        {hpt: 24, hpx: 24},
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
      ws['!cols'] = [
        {wch: 7.38},
        {wch: 9.8},
        {wch: 8.8},
        {wch: 13.4},
        {wch: 13.8},
        {wch: 3.8},
        {wpx: 2},
        {wch: 8.1},
        {wch: 8.1}
      ];

      ws['B7'].f = '内容!B1';
      ws['B8'].f = 'IF(LEN(内容!B3)>=2,内容!B3,"")';
      ws['B11'] = {v: '温州浩源控股有限公司', t: 's', w: '温州浩源控股有限公司'};
      ws['B12'].f = '内容!B14';
      ws['B13'].f = '内容!B28';
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

      ws['B7'].s = {alignment: {horizontal: 'center', vertical: 'center'}};
      ws['B8'].s = {alignment: {horizontal: 'center', vertical: 'center'}};
      ws['B11'].s = {font: {sz: 10, color: {rgb: 'FF0000'}}, alignment: {horizontal: 'center', vertical: 'center'}};
      ws['B12'].s = {font: {sz: 10}, alignment: {horizontal: 'right', vertical: 'bottom'}};
      ws['B13'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'bottom'}};
      ws['B31'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'bottom'}};
      ws['C12'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'bottom'}};
      ws['C14'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'center'}};
      ws['C29'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
      ws['D7'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
      ws['D8'].s = {font: {sz: 10}, alignment: {horizontal: 'center', vertical: 'center'}};
      ws['D12'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'bottom'}};
      ws['D19'].s = ws['D20'].s = ws['D24'].s = {font: {sz: 7}, alignment: {horizontal: 'center', vertical: 'bottom'}};
      ws['E12'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'bottom'}};
      ws['E13'].s = {font: {sz: 9}, alignment: {horizontal: 'center', vertical: 'center'}};
      ws['E16'].s = {font: {sz: 8}, alignment: {horizontal: 'center', vertical: 'center'}};
      ws['F7'].s = ws['F8'].s = {font: {sz: 8}, alignment: {horizontal: 'left', vertical: 'center'}};
      ws['H16'].s = {font: {sz: 9}, alignment: {horizontal: 'left', vertical: 'center'}};
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
    render() {
        const fields = [{
            title: '主贷人姓名',
            field: 'customerName',
            readonly: true
        }, {
            title: '身份证号码',
            field: 'idNo',
            readonly: true
        }, {
            title: '配偶姓名',
            field: 'ghRealName',
            readonly: true
        }, {
            title: '身份证号码',
            field: 'ghIdNo',
            readonly: true
        }, {
            title: '家庭地址',
            field: 'applyNowAddress',
            readonly: true
        }, {
            title: '合同编号',
            field: 'bankContractCode',
            readonly: true
        }, {
            title: '账单日',
            field: 'billDatetime',
            readonly: true
        }, {
            title: '车牌号',
            field: 'carNumber',
            required: true
        }, {
            title: '车架号',
            field: 'frameNo',
            required: true
        }, {
            title: '发动机号',
            field: 'engineNo',
            required: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            readonly: true
        }, {
            title: '银行贷款额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '服务费',
            field: 'fee',
            amount: true,
            readonly: true
        }, {
            title: '履约保证金',
            field: 'lyAmount',
            amount: true,
            readonly: true
        }, {
            title: '贷款期限（年）',
            field: 'loanPeriods',
            render: (v, d) => {
                return d.loanPeriods / 12;
            },
            readonly: true
        }, {
            title: '银行全称',
            field: 'fullName',
            formatter: (v, d) => {
                return d.bankSubbranch.fullName;
            },
            readonly: true
        }, {
            title: '银行委托人',
            field: 'bankClient',
            formatter: (v, d) => {
                return d.bankSubbranch.bankClient;
            },
            readonly: true
        }, {
            title: '银行地址',
            field: 'address',
            formatter: (v, d) => {
                return d.bankSubbranch.address;
            },
            readonly: true
        }, {
            title: '银行电话',
            field: 'phoneNumber',
            formatter: (v, d) => {
                return d.bankSubbranch.phoneNumber;
            },
            readonly: true
        }, {
            title: '委托数有效期',
            field: 'clientValidDate',
            formatter: (v, d) => {
                return formatDate(d.bankSubbranch.clientValidDate);
            },
            readonly: true
        }, {
            title: '授权人姓名',
            field: 'autherName',
            formatter: (v, d) => {
                return d.bankSubbranch.autherName;
            },
            readonly: true
        }, {
            title: '授权人身份证',
            field: 'autherIdNo',
            formatter: (v, d) => {
                return d.bankSubbranch.autherIdNo;
            },
            readonly: true
        }, {
            title: '授权人电话',
            field: 'autherPhoneNumber',
            formatter: (v, d) => {
                return d.bankSubbranch.autherPhoneNumber;
            },
            readonly: true
        }, {
            title: '授权人地址',
            field: 'autherAddress',
            formatter: (v, d) => {
                return d.bankSubbranch.autherAddress;
            },
            readonly: true
        }, {
            title: '信用卡类型',
            field: 'creditCardType',
            formatter: (v, d) => {
                return d.bankSubbranch.creditCardType;
            },
            type: 'select',
            key: 'credit_card_type',
            readonly: true
        }, {
            title: '信用卡名称',
            field: 'creditCardName',
            formatter: (v, d) => {
                return d.bankSubbranch.creditCardName;
            },
            readonly: true
        }, {
            title: '所属地区',
            field: 'belongArea',
            formatter: (v, d) => {
                return d.bankSubbranch.belongArea;
            },
            readonly: true
        }, {
            title: '套打模版',
            field: 'pledgePrintTemplateId',
            type: 'select',
            key: 'pledge_print_template_id',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146,
            buttons: [{
                    title: '打印',
                    check: true,
                    handler: (param) => {
                        param.operator = getUserId();
                        this.props.doFetching();
                        let num = param.pledgePrintTemplateId;
                        fetch(632192, param).then((data) => {
                          if(num === '1') {
                            createHt(data);
                          } else if(num === '2') {
                            exportBOCZdzsxffq(data);
                          } else if(num === '3') {
                            exportBOCSxfycx(data);
                          } else if(num === '4') {
                            exportBOCDy(data);
                          } else if(num === '5') {
                            exportBOCCt(data);
                          } else if(num === '6') {
                            exportBOCJcdy(data);
                          } else if(num === '8') {
                            exportBOCZdzfjf(data);
                          } else if(num === '9') {
                            exportCCBDy(data);
                          } else if(num === '10') {
                            exportCCBFwf(data);
                          } else if(num === '11') {
                            exportBOCFjd(data);
                          } else if(num === '12') {
                            exportCCBJc(data);
                          } else if(num === '13') {
                            exportCCBXydb(data);
                          }
                            this.props.cancelFetching();
                            showSucMsg('操作成功');
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching());
                    }
                },
                {
                    title: '返回',
                    handler: (param) => {
                        this.props.history.go(-1);
                    }
                }
            ]
        });
    }
}

export default MortgageMake;
