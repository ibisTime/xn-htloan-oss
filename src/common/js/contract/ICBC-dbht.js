import {
    getWorkbook
} from 'common/js/xlsx-util';
import {
    moneyFormat,
    moneyReplaceComma
} from 'common/js/util';
// 生成担保合同
export function createHt(data) {
    const wb = getWorkbook();
    createData(wb, data);
    createGkhs(wb);
    createDhhsd(wb);
    createSddzqrs(wb);
    createQgd(wb);
    createTesqs(wb);
    createTesqs2(wb);
    createGckxsttzs(wb);
    createYwfksqs(wb);
    createSqwts(wb);
    createJzd(wb);
    createQcgxht(wb);
    createDbcnh(wb);
    createGhhtfm(wb);
    createD1(wb);
    createD1x(wb);
    createD2(wb);
    createD3(wb);
    createD3x(wb);
    createD4(wb);
    createD5(wb);
    createD6(wb);
    createD7(wb);
    createD11(wb);
    wb.downloadXls('担保合同-工商银行');
}
// 数据
function createData(wb, data) {
    let year = data.customerBirth.substr(0, 4);
    let month = data.customerBirth.substr(4, 2) - 0;
    let arr = [
        ['工行姓名', data.customerName],
        ['出生年月', year + '.' + month],
        ['性别', data.customerSex],
        ['身份证号码', data.idNo],
        ['手机号码', data.mobile],
        ['工作单位', data.applyUserCompany],
        ['现住址', data.applyNowAddress],
        ['配偶姓名', data.ghRealName],
        ['身份证号码', data.ghIdNo],
        ['工作单位', data.ghCompanyName],
        ['手机号码', data.ghMobile],
        ['费利率（银行利率）', (data.bankRate * 100).toFixed(2)],
        ['贷款额', moneyFormat(data.loanAmount)],
        ['服务费', moneyReplaceComma(moneyFormat(data.fee))],
        ['总贷款额（包含服务费）', ''],
        ['贷款额（大写无元）', ''],
        ['服务费（大写无元）', ''],
        ['总贷款额（大写无元）', ''],
        ['分期期数', data.loanPeriods],
        ['分期期数大写', ''],
        ['手续费总额', ''],
        ['手续费总额大写', ''],
        ['月还款额', ''],
        ['总贷款额和手续费总额', ''],
        ['车辆总价', moneyReplaceComma(moneyFormat(data.originalPrice))],
        ['车辆总价大写不带元', ''],
        ['车辆总价大写带元整', ''],
        ['首付额', ''],
        ['首付额（大写无元）', ''],
        ['车辆品牌', data.carBrand],
        ['经销商', data.carDealerName],
        ['发动机号', data.engineNo],
        ['车架号', data.frameNo],
        ['品牌型号', data.carModel],
        ['担保人姓名', data.guarantor1IdNo],
        ['性别', data.guarantor1Sex],
        ['身份证号码', data.guarantor1IdNo],
        ['手机号码', data.guarantor1Mobile],
        ['现住址', data.guarantorNowAddress],
        ['工作单位', data.guarantorCompanyName],
        ['总的首期还款金额', ''],
        ['总的每期还款金额', ''],
        ['原车发票价格', moneyReplaceComma(moneyFormat(data.invoicePrice))],
        ['原车发票价格大写', '']
    ];

    var ws = wb.getSheet(arr, '数据');
    ws['!margins'] = getMargins();
    ws['!cols'] = [{
            wch: 27.2
        },
        {
            wch: 40.3
        }
    ];
    ws['!rows'] = [];
    ws['!rows'][41] = {
        hpt: 20,
        hpx: 20
    };
    // formula
    ws['B15'].f = 'TEXT(B13+B14,"0.00")';
    ws['B16'].f = 'IF(INT(ROUND(B13,2))*100=ROUND(B13,2)*100,TEXT(INT(ROUND(B13,2)),"[$-0804][DBNum2]G/通用格式")&"",IF(INT(ROUND(B13,2)*10)=B43*10,TEXT(INT(ROUND(B13,2)),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(ROUND(B13,2)*10-INT(ROUND(B13,2))*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(ROUND(B13,2)),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(ROUND(B13,2)*10)=INT(ROUND(B13,2))*10,"零",TEXT(RIGHT(INT(ROUND(B13,2)*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(ROUND(B13,2)*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B17'].f = 'IF(INT(ROUND(B14,2))*100=ROUND(B14,2)*100,TEXT(INT(ROUND(B14,2)),"[$-0804][DBNum2]G/通用格式")&"",IF(INT(ROUND(B14,2)*10)=B44*10,TEXT(INT(ROUND(B14,2)),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(ROUND(B14,2)*10-INT(ROUND(B14,2))*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(ROUND(B14,2)),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(ROUND(B14,2)*10)=INT(ROUND(B14,2))*10,"零",TEXT(RIGHT(INT(ROUND(B14,2)*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(ROUND(B14,2)*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B18'].f = 'IF(INT(ROUND(B15,2))*100=ROUND(B15,2)*100,TEXT(INT(ROUND(B15,2)),"[$-0804][DBNum2]G/通用格式")&"",IF(INT(ROUND(B15,2)*10)=B45*10,TEXT(INT(ROUND(B15,2)),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(ROUND(B15,2)*10-INT(ROUND(B15,2))*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(ROUND(B15,2)),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(ROUND(B15,2)*10)=INT(ROUND(B15,2))*10,"零",TEXT(RIGHT(INT(ROUND(B15,2)*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(ROUND(B15,2)*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B20'].f = 'IF(INT(ROUND(B19,2))*100=ROUND(B19,2)*100,TEXT(INT(ROUND(B19,2)),"[$-0804][DBNum2]G/通用格式"))';
    ws['B21'].f = 'TEXT(B15*B12/100,"0.00")';
    ws['B22'].f = 'IF(INT(ROUND(B21,2))*100=ROUND(B21,2)*100,TEXT(INT(ROUND(B21,2)),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(ROUND(B21,2)*10)=ROUND(B21,2)*10,TEXT(INT(ROUND(B21,2)),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(ROUND(B21,2)*10-INT(ROUND(B21,2))*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(ROUND(B21,2)),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(ROUND(B21,2)*10)=INT(ROUND(B21,2))*10,"零",TEXT(RIGHT(INT(ROUND(B21,2)*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(ROUND(B21,2)*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    ws['B23'].f = 'TEXT(B41,"0.00")&"/"&TEXT(B42,"0.00")';
    ws['B24'].f = 'TEXT(B15+B21,"0.00")';
    ws['B26'].f = 'IF(INT(B25)*100=B25*100,TEXT(INT(B25),"[$-0804][DBNum2]G/通用格式"))';
    ws['B27'].f = 'IF(INT(ROUND(B25,2))*100=ROUND(B25,2)*100,TEXT(INT(ROUND(B25,2)),"[$-0804][DBNum2]G/通用格式")&"元",IF(INT(ROUND(B25,2)*10)=B45*10,TEXT(INT(ROUND(B25,2)),"[$-0804][DBNum2]G/通用格式")&"元"&TEXT(ROUND(B25,2)*10-INT(ROUND(B25,2))*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(ROUND(B25,2)),"[$-0804][DBNum2]G/通用格式")&"元"&IF(INT(ROUND(B25,2)*10)=INT(ROUND(B25,2))*10,"零",TEXT(RIGHT(INT(ROUND(B25,2)*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(ROUND(B25,2)*100),"[$-0804][DBNum2]G/通用格式")&"分"))&"整"';
    ws['B28'].f = 'TEXT(B25-B15,"0.00")';
    ws['B29'].f = 'IF(INT(ROUND(B28,2))*100=ROUND(B28,2)*100,TEXT(INT(ROUND(B28,2)),"[$-0804][DBNum2]G/通用格式"))';
    ws['B41'].f = 'TEXT(-(B42*(B19-1)-B15-B21),"0.00")';
    ws['B42'].f = 'TEXT(INT(B15/B19)+INT(B21/B19),"0.00")';
    ws['B44'].f = 'IF(INT(ROUND(B43,2))*100=ROUND(B43,2)*100,TEXT(INT(ROUND(B43,2)),"[$-0804][DBNum2]G/通用格式")&"元整",IF(INT(ROUND(B43,2)*10)=ROUND(B43,2)*10,TEXT(INT(ROUND(B43,2)),"[$-0804][DBNum2]G/通用格式")&"元整"&TEXT(ROUND(B43,2)*10-INT(ROUND(B43,2))*10,"[$-0804][DBNum2]G/通用格式")&"角",TEXT(INT(ROUND(B43,2)),"[$-0804][DBNum2]G/通用格式")&"元整"&IF(INT(ROUND(B43,2)*10)=INT(ROUND(B43,2))*10,"零",TEXT(RIGHT(INT(ROUND(B43,2)*10)),"[$-0804][DBNum2]G/通用格式")&"角")&TEXT(RIGHT(ROUND(B43,2)*100),"[$-0804][DBNum2]G/通用格式")&"分"))';
    // style
    ws['B2'].s = ws['B22'].s = ws['B25'].s = {
        font: {
            color: {
                rgb: 'FF0000'
            }
        }
    };
    ws['B19'].s = {
        alignment: {
            horizontal: 'left',
            vertical: 'center'
        }
    };
    ws['A13'].s = ws['A14'].s = ws['B13'].s = ws['B14'].s = {
        fill: {
            fgColor: {
                rgb: 'FFCC00'
            }
        }
    };
    ws['B26'].s = {
        fill: {
            fgColor: {
                rgb: 'CCFFCC'
            }
        }
    };
    ws['A43'].s = ws['A44'].s = {
        fill: {
            fgColor: {
                rgb: 'FF0000'
            }
        }
    };
}
// 告客户书
function createGkhs(wb) {
    var ws = getSheet(wb, 40, 8, '告客户书');
    ws['!merges'] = [{
        e: {
            c: 1,
            r: 39
        },
        s: {
            c: 0,
            r: 39
        }
    }, {
        e: {
            c: 5,
            r: 9
        },
        s: {
            c: 3,
            r: 9
        }
    }, {
        e: {
            c: 2,
            r: 13
        },
        s: {
            c: 1,
            r: 13
        }
    }, {
        e: {
            c: 7,
            r: 18
        },
        s: {
            c: 5,
            r: 18
        }
    }, {
        e: {
            c: 4,
            r: 31
        },
        s: {
            c: 1,
            r: 31
        }
    }];
    ws['!cols'] = [{
            wch: 12.1
        },
        {
            wch: 8
        },
        {
            wch: 8.2
        },
        {
            wch: 5.8
        },
        {
            wch: 10.2
        },
        {
            wch: 8.2
        },
        {
            wch: 8.2
        },
        {
            wch: 8.2
        }
    ];
    ws['!rows'] = [];
    ws['!rows'][0] = ws['!rows'][29] = ws['!rows'][31] =
        ws['!rows'][32] = ws['!rows'][33] = ws['!rows'][34] =
        ws['!rows'][35] = ws['!rows'][36] = ws['!rows'][37] =
        ws['!rows'][39] = {
            hpt: 13,
            hpx: 13
        };
    ws['!rows'][1] = ws['!rows'][2] = {
        hpt: 12,
        hpx: 12
    };
    ws['!rows'][3] = {
        hpt: 32.25,
        hpx: 32.25
    };
    ws['!rows'][4] = {
        hpt: 30.75,
        hpx: 30.75
    };
    ws['!rows'][8] = {
        hpt: 9,
        hpx: 9
    };
    ws['!rows'][12] = {
        hpt: 20.25,
        hpx: 20.25
    };
    ws['!rows'][14] = {
        hpt: 8.25,
        hpx: 8.25
    };
    ws['!rows'][18] = {
        hpt: 19.5,
        hpx: 19.5
    };
    ws['!rows'][19] = {
        hpt: 16.5,
        hpx: 16.5
    };
    ws['!rows'][20] = ws['!rows'][21] = {
        hidden: true
    };
    ws['!rows'][22] = {
        hidden: true,
        hpt: 9,
        hpx: 9
    };
    ws['!rows'][23] = {
        hpt: 18,
        hpx: 18
    };
    ws['!rows'][24] = {
        hpt: 17,
        hpx: 17
    };
    ws['!rows'][28] = {
        hpt: 24.75,
        hpx: 24.75
    };
    ws['!rows'][30] = {
        hpt: 7.5,
        hpx: 7.5
    };
    ws['!rows'][38] = {
        hpt: 9.75,
        hpx: 9.75
    };
    ws['A40'].f = '数据!B5';
    ws['A40'].s = {
        font: {
            name: '楷体_GB2312'
        },
        alignment: {
            horizontal: 'right'
        }
    };
    ws['B6'].f = '数据!B1';
    ws['B6'].s = {
        font: {
            name: '楷体_GB2312'
        },
        alignment: {
            horizontal: 'left'
        }
    };
    ws['B32'] = {
        v: '温州市鹿城区东门大厦',
        t: 's',
        w: '温州市鹿城区东门大厦',
        s: {
            font: {
                name: '楷体_GB2312'
            },
            alignment: {
                horizontal: 'center'
            }
        }
    };
    ws['B37'] = {
        v: 88185645,
        t: 'n',
        w: '88185645',
        s: {
            font: {
                name: '楷体_GB2312'
            },
            alignment: {
                horizontal: 'right'
            }
        }
    };
    ws['C20'] = {
        v: 56650881,
        t: 'n',
        w: '56650881',
        s: {
            font: {
                name: '楷体_GB2312'
            },
            alignment: {
                horizontal: 'right'
            }
        }
    };
    ws['F19'] = {
        v: '温州浩源控股有限公司',
        t: 's',
        w: '温州浩源控股有限公司',
        s: {
            font: {
                name: '楷体_GB2312'
            },
            alignment: {
                horizontal: 'center',
                vertical: 'top'
            }
        }
    };
    ws['H30'] = {
        v: '温州城东',
        t: 's',
        w: '温州城东',
        s: {
            font: {
                name: '楷体_GB2312'
            },
            alignment: {
                horizontal: 'left'
            }
        }
    };
}
// 电话核实单
function createDhhsd(wb) {
    var ws = getSheet(wb, 22, 4, '电话核实单');
    ws['!merges'] = [{
        e: {
            c: 3,
            r: 0
        },
        s: {
            c: 0,
            r: 0
        }
    }, {
        e: {
            c: 3,
            r: 1
        },
        s: {
            c: 0,
            r: 1
        }
    }, {
        e: {
            c: 3,
            r: 7
        },
        s: {
            c: 0,
            r: 7
        }
    }, {
        e: {
            c: 3,
            r: 14
        },
        s: {
            c: 0,
            r: 14
        }
    }, {
        e: {
            c: 3,
            r: 20
        },
        s: {
            c: 0,
            r: 20
        }
    }, {
        e: {
            c: 3,
            r: 21
        },
        s: {
            c: 0,
            r: 21
        }
    }, {
        e: {
            c: 3,
            r: 15
        },
        s: {
            c: 0,
            r: 15
        }
    }, {
        e: {
            c: 3,
            r: 17
        },
        s: {
            c: 0,
            r: 17
        }
    }, {
        e: {
            c: 3,
            r: 18
        },
        s: {
            c: 0,
            r: 18
        }
    }, {
        e: {
            c: 3,
            r: 19
        },
        s: {
            c: 0,
            r: 19
        }
    }];
    ws['!rows'] = [{
            hpt: 54.75,
            hpx: 54.75
        },
        {
            hpt: 24.75,
            hpx: 24.75
        },
        {
            hpt: 21.75,
            hpx: 21.75
        },
        {
            hpt: 21.75,
            hpx: 21.75
        },
        {
            hpt: 21.75,
            hpx: 21.75
        },
        {
            hpt: 24.75,
            hpx: 24.75
        },
        {
            hpt: 21.75,
            hpx: 21.75
        },
        {
            hpt: 33,
            hpx: 33
        },
        {
            hpt: 21.75,
            hpx: 21.75
        },
        {
            hpt: 21.75,
            hpx: 21.75
        },
        {
            hpt: 21.75,
            hpx: 21.75
        },
        {
            hpt: 21.75,
            hpx: 21.75
        },
        {
            hpt: 21.75,
            hpx: 21.75
        },
        {
            hpt: 21.75,
            hpx: 21.75
        },
        {
            hpt: 36,
            hpx: 36
        },
        {
            hpt: 99,
            hpx: 99
        },
        {
            hpt: 33.75,
            hpx: 33.75
        },
        {
            hpt: 23,
            hpx: 23
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        }
    ];
    ws['!cols'] = [{
            wch: 15.6
        },
        {
            wch: 20.8
        },
        {
            wch: 18
        },
        {
            wch: 23.05
        }
    ];
    ws['B3'].f = '数据!B1';
    ws['B3'].s = {
        alignment: {
            horizontal: 'center',
            vertical: 'center'
        }
    };
    ws['B4'].f = '数据!B15';
    ws['B4'].s = {
        alignment: {
            horizontal: 'center',
            vertical: 'center'
        }
    };
    ws['B5'].f = '数据!B28';
    ws['B5'].s = {
        alignment: {
            horizontal: 'center',
            vertical: 'center'
        }
    };
    ws['B6'].f = '数据!B34';
    ws['B6'].s = {
        font: {
            sz: 10
        },
        alignment: {
            horizontal: 'center',
            vertical: 'center'
        }
    };
    ws['D3'].f = '数据!B4';
    ws['D3'].s = {
        alignment: {
            horizontal: 'center',
            vertical: 'center'
        }
    };
    ws['D4'].f = '数据!B19';
    ws['D4'].s = {
        alignment: {
            horizontal: 'center',
            vertical: 'center'
        }
    };
    ws['D5'].f = '数据!B25';
    ws['D5'].s = {
        alignment: {
            horizontal: 'center',
            vertical: 'center'
        }
    };
    ws['D6'].f = '数据!B31';
    ws['D6'].s = {
        font: {
            sz: 9
        },
        alignment: {
            horizontal: 'left',
            vertical: 'center'
        }
    };
}
// 送达地址确认书
function createSddzqrs(wb) {
    var ws = getSheet(wb, 24, 8, '送达地址确认书');
    ws['!merges'] = [{
        e: {
            c: 6,
            r: 7
        },
        s: {
            c: 5,
            r: 7
        }
    }, {
        e: {
            c: 4,
            r: 19
        },
        s: {
            c: 3,
            r: 19
        }
    }, {
        e: {
            c: 8,
            r: 19
        },
        s: {
            c: 5,
            r: 19
        }
    }, {
        e: {
            c: 5,
            r: 23
        },
        s: {
            c: 4,
            r: 23
        }
    }];
    ws['!rows'] = [
        null,
        null,
        null,
        {
            hpt: 11,
            hpx: 11
        },
        null,
        null,
        {
            hpt: 6.75,
            hpx: 6.75
        },
        {
            hpt: 27,
            hpx: 27
        },
        {
            hpt: 4.5,
            hpx: 4.5
        },
        {
            hpt: 6,
            hpx: 6
        },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        {
            hpt: 12,
            hpx: 12
        },
        {
            hpt: 9,
            hpx: 9
        },
        {
            hpt: 17,
            hpx: 17
        },
        null,
        null,
        null,
        {
            hpt: 21,
            hpx: 21
        }
    ];
    ws['!cols'] = [{
            wch: 5.2
        },
        {
            wch: 2.3
        },
        {
            wch: 5.8
        },
        {
            wch: 12.6
        },
        {
            wch: 5
        },
        {
            wch: 6.8
        },
        {
            wch: 16.6
        },
        {
            wch: 12.8
        }
    ];
    ws['C20'].f = '数据!B1';
    ws['C20'].s = {
        font: {
            sz: 11
        },
        alignment: {
            horizontal: 'left'
        }
    };
    ws['D20'].f = '数据!B4';
    ws['D20'].s = {
        font: {
            sz: 11
        },
        alignment: {
            horizontal: 'left'
        }
    };
    ws['E24'].f = '数据!B5';
    ws['E24'].s = {
        alignment: {
            horizontal: 'right',
            vertical: 'bottom'
        }
    };
    ws['F8'] = {
        v: 'FQ-JC-12032110-201800',
        t: 's',
        w: 'FQ-JC-12032110-201800'
    };
    ws['F8'].s = {
        font: {
            sz: 10
        },
        alignment: {
            horizontal: 'left',
            vertical: 'center'
        }
    };
    ws['F20'].f = '数据!B7';
    ws['F20'].s = {
        font: {
            sz: 10
        },
        alignment: {
            horizontal: 'left',
            vertical: 'bottom'
        }
    };
    ws['H8'] = {
        v: '牡丹信用卡透支分期付款/抵押合同',
        t: 's',
        w: '牡丹信用卡透支分期付款/抵押合同'
    };
    ws['H8'].s = {
        font: {
            sz: 8
        },
        alignment: {
            horizontal: 'left',
            vertical: 'center',
            wrapText: true
        }
    };
}
// 签购单
function createQgd(wb) {
    var ws = getSheet(wb, 7, 4, '签购单');
    ws['!merges'] = [{
        e: {
            c: 1,
            r: 5
        },
        s: {
            c: 0,
            r: 5
        }
    }, {
        e: {
            c: 1,
            r: 2
        },
        s: {
            c: 0,
            r: 2
        }
    }, {
        e: {
            c: 1,
            r: 6
        },
        s: {
            c: 0,
            r: 6
        }
    }];
    ws['!rows'] = [{
            hpt: 19.5,
            hpx: 19.5
        },
        {
            hpt: 9,
            hpx: 9
        },
        null,
        null,
        {
            hpt: 9.75,
            hpx: 9.75
        }
    ];
    ws['!cols'] = [{
            wch: 8.2
        },
        {
            wch: 15
        },
        {
            wch: 8.2
        },
        {
            wch: 10.8
        }
    ];
    ws['A3'].f = '数据!B4';
    ws['A3'].s = {
        alignment: {
            horizontal: 'left'
        }
    };
    ws['A6'] = {
        v: '温州浩源控股有限公司',
        t: 's',
        w: '温州浩源控股有限公司'
    };
    ws['A6'].s = {
        font: {
            sz: 8
        },
        alignment: {
            horizontal: 'center',
            vertical: 'bottom'
        }
    };
    ws['D7'].f = 'TEXT(数据!B15,"0.00")&" "';
    ws['D7'].s = {
        alignment: {
            horizontal: 'right',
            vertical: 'bottom'
        }
    };
}
// 调额申请书
function createTesqs(wb) {
    var ws = getSheet(wb, 21, 12, '调额申请书');
    ws['!rows'] = [{
            hpt: 45,
            hpx: 45
        },
        {
            hpt: 8.25,
            hpx: 8.25
        },
        {
            hpt: 3.75,
            hpx: 3.75
        },
        {
            hpt: 17,
            hpx: 17
        },
        {
            hpt: 20.25,
            hpx: 20.25
        },
        {
            hpt: 16.5,
            hpx: 16.5
        },
        {
            hpt: 21.75,
            hpx: 21.75
        },
        {
            hpt: 24,
            hpx: 24
        },
        {
            hpt: 6.75,
            hpx: 6.75
        },
        {
            hpt: 15.75,
            hpx: 15.75
        },
        {
            hpt: 16.5,
            hpx: 16.5
        },
        {
            hpt: 20.25,
            hpx: 20.25
        },
        {
            hpt: 24,
            hpx: 24
        },
        {
            hpt: 23,
            hpx: 23
        },
        {
            hpt: 18.75,
            hpx: 18.75
        },
        {
            hpt: 12.75,
            hpx: 12.75
        },
        {
            hpt: 12,
            hpx: 12
        },
        {
            hpt: 21,
            hpx: 21
        },
        {
            hpt: 24.75,
            hpx: 24.75
        },
        {
            hpt: 15.75,
            hpx: 15.75
        },
        {
            hpt: 15.75,
            hpx: 15.75
        }
    ];
    ws['!cols'] = [{
        wch: 5.5
    }, {
        wch: 5.8
    }, {
        wch: 1.8
    }, {
        wch: 6.3
    }, {
        wch: 6.5
    }, {
        wch: 9.5
    }, {
        wch: 4.8
    }, {
        wch: 4.26
    }, {
        wch: 9.6
    }, {
        wch: 10.7
    }, {
        wch: 12.8
    }];
    ws['!merges'] = [{
        s: {
            c: 9,
            r: 15
        },
        e: {
            c: 10,
            r: 16
        }
    }, {
        s: {
            c: 3,
            r: 15
        },
        e: {
            c: 5,
            r: 16
        }
    }, {
        s: {
            c: 3,
            r: 19
        },
        e: {
            c: 4,
            r: 19
        }
    }, {
        s: {
            c: 7,
            r: 19
        },
        e: {
            c: 10,
            r: 19
        }
    }, {
        s: {
            c: 3,
            r: 20
        },
        e: {
            c: 5,
            r: 20
        }
    }, {
        s: {
            c: 8,
            r: 20
        },
        e: {
            c: 10,
            r: 20
        }
    }, {
        s: {
            c: 3,
            r: 17
        },
        e: {
            c: 5,
            r: 17
        }
    }, {
        s: {
            c: 9,
            r: 17
        },
        e: {
            c: 10,
            r: 17
        }
    }, {
        s: {
            c: 3,
            r: 18
        },
        e: {
            c: 5,
            r: 18
        }
    }, {
        s: {
            c: 7,
            r: 18
        },
        e: {
            c: 8,
            r: 18
        }
    }, {
        s: {
            c: 3,
            r: 13
        },
        e: {
            c: 4,
            r: 13
        }
    }, {
        s: {
            c: 7,
            r: 13
        },
        e: {
            c: 8,
            r: 13
        }
    }, {
        s: {
            c: 9,
            r: 13
        },
        e: {
            c: 10,
            r: 13
        }
    }, {
        s: {
            c: 3,
            r: 14
        },
        e: {
            c: 4,
            r: 14
        }
    }, {
        s: {
            c: 9,
            r: 14
        },
        e: {
            c: 10,
            r: 14
        }
    }, {
        s: {
            c: 3,
            r: 11
        },
        e: {
            c: 5,
            r: 11
        }
    }, {
        s: {
            c: 9,
            r: 11
        },
        e: {
            c: 10,
            r: 11
        }
    }, {
        s: {
            c: 3,
            r: 12
        },
        e: {
            c: 4,
            r: 12
        }
    }, {
        s: {
            c: 9,
            r: 12
        },
        e: {
            c: 10,
            r: 12
        }
    }, {
        s: {
            c: 3,
            r: 9
        },
        e: {
            c: 4,
            r: 9
        }
    }, {
        s: {
            c: 8,
            r: 9
        },
        e: {
            c: 10,
            r: 9
        }
    }, {
        s: {
            c: 3,
            r: 10
        },
        e: {
            c: 7,
            r: 10
        }
    }, {
        s: {
            c: 9,
            r: 10
        },
        e: {
            c: 12,
            r: 10
        }
    }, {
        s: {
            c: 3,
            r: 6
        },
        e: {
            c: 5,
            r: 6
        }
    }, {
        s: {
            c: 7,
            r: 6
        },
        e: {
            c: 8,
            r: 6
        }
    }, {
        s: {
            c: 3,
            r: 7
        },
        e: {
            c: 8,
            r: 7
        }
    }, {
        s: {
            c: 10,
            r: 7
        },
        e: {
            c: 12,
            r: 7
        }
    }, {
        s: {
            c: 8,
            r: 0
        },
        e: {
            c: 9,
            r: 0
        }
    }, {
        s: {
            c: 3,
            r: 4
        },
        e: {
            c: 4,
            r: 4
        }
    }, {
        s: {
            c: 7,
            r: 4
        },
        e: {
            c: 8,
            r: 4
        }
    }, {
        s: {
            c: 3,
            r: 5
        },
        e: {
            c: 5,
            r: 5
        }
    }, {
        s: {
            c: 9,
            r: 5
        },
        e: {
            c: 12,
            r: 5
        }
    }, {
        s: {
            c: 9,
            r: 2
        },
        e: {
            c: 10,
            r: 3
        }
    }, {
        s: {
            c: 9,
            r: 18
        },
        e: {
            c: 10,
            r: 18
        }
    }];
    ws['D5'].f = '数据!B1';
    ws['D6'].f = '数据!B4';
    ws['D7'].f = '数据!B6';
    ws['D7'].s = {
        font: {
            sz: 10
        },
        alignment: {
            vertical: 'bottom',
            horizontal: 'center'
        }
    };
    ws['D8'].f = '数据!B7';
    ws['D10'].f = '数据!B8';
    ws['D11'].f = '数据!B10';
    ws['D12'].f = '数据!B11';
    ws['D13'].f = 'TEXT(数据!B15,"0.00")&" "';
    ws['D14'].f = 'TEXT(数据!B21,"0.00")&" "';
    ws['D15'].f = 'TEXT(数据!B25,"0.00")&" "';
    ws['D16'].f = '数据!B34';
    ws['D18'] = {
        v: '南宁 车管所',
        t: 's',
        w: '南宁 车管所'
    };
    ws['D19'] = {
        v: '温州浩源控股有限公司',
        t: 's',
        w: '温州浩源控股有限公司'
    };
    ws['D20'] = {
        v: '蔡盛义',
        t: 's',
        w: '蔡盛义'
    };
    ws['D21'] = {
        v: '1203211019200128617',
        t: 's',
        w: '1203211019200128617'
    };
    ws['H5'].f = '数据!B2';
    ws['H14'].f = '数据!B42';
    ws['H19'] = {
        v: 56650881,
        t: 'n',
        w: '56650881'
    };
    ws['H20'] = {
        v: '温州市东龙路19号16幢1601室',
        t: 's',
        w: '温州市东龙路19号16幢1601室'
    };
    ws['I1'] = {
        v: '温州城东',
        t: 's',
        w: '温州城东'
    };
    ws['I10'].f = '数据!B9';
    ws['I21'] = {
        v: '工行城东支行',
        t: 's',
        w: '工行城东支行'
    };
    ws['J3'] = {
        v: 'FQ-JC-12032110-201800',
        t: 's',
        w: 'FQ-JC-12032110-201800'
    };
    ws['J6'].f = '数据!B5';
    ws['J13'].f = '数据!B19';
    ws['J14'].f = 'TEXT(数据!B41,"0.00")&" "';
    ws['J15'].f = '数据!B31';
    ws['J16'].f = '数据!B32';
    ws['J18'].f = '数据!B33';
    ws['J19'] = {
        v: '91330300MA2874D937',
        t: 's',
        w: '91330300MA2874D937'
    };
    ws['K5'].f = '数据!B3';

    ws['D13'].s = ws['D14'].s = ws['D15'].s = ws['J3'].s =
        ws['J14'].s = ws['J19'].s = {
            font: {
                sz: 10
            },
            alignment: {
                vertical: 'center',
                horizontal: 'right'
            }
        };
    ws['D5'].s = ws['D6'].s = ws['D8'].s = ws['D10'].s = ws['D11'].s =
        ws['D12'].s = ws['D16'].s = ws['D18'].s = ws['D19'].s = ws['D20'].s =
        ws['D21'].s = ws['H5'].s = ws['H14'].s = ws['H19'].s = ws['H20'].s =
        ws['I10'].s = ws['I21'].s = ws['J13'].s = ws['K5'].s = {
            font: {
                sz: 10
            },
            alignment: {
                vertical: 'center',
                horizontal: 'center'
            }
        };
    ws['I1'].s = {
        font: {
            sz: 15
        },
        alignment: {
            vertical: 'center',
            horizontal: 'right'
        }
    };
    ws['J6'].s = ws['J15'].s = ws['J16'].s = ws['J18'].s = {
        font: {
            sz: 10
        },
        alignment: {
            vertical: 'center',
            horizontal: 'left'
        }
    };
}
// 调额申请书2
function createTesqs2(wb) {
    var ws = getSheet(wb, 28, 14, '调额申请书2');
    ws['!rows'] = [];
    for (let i = 0; i < 17; i++) {
        ws['!rows'].push({
            hpt: 24,
            hpx: 24
        });
    }
    ws['!rows'][17] = {
        hpt: 32.25,
        hpx: 32.25
    };
    ws['!rows'][18] = {
        hpt: 34.5,
        hpx: 34.5
    };
    ws['!rows'][19] = {
        hpt: 30,
        hpx: 30
    };
    ws['!rows'][20] = {
        hpt: 19.5,
        hpx: 19.5
    };
    ws['!rows'][21] = ws['!rows'][22] = ws['!rows'][23] = ws['!rows'][28] = ws['!rows'][24] = {
        hpt: 24,
        hpx: 24
    };
    ws['!rows'][25] = {
        hpt: 31.5,
        hpx: 31.5
    };
    ws['!rows'][26] = {
        hpt: 47,
        hpx: 47
    };
    ws['!rows'][27] = {
        hpt: 18.75,
        hpx: 18.75
    };
    ws['!rows'][28] = {
        hpt: 32.25,
        hpx: 32.25
    };
    ws['!cols'] = [{
            wch: 4.8
        },
        {
            wch: 4.8
        },
        {
            wch: 3.45
        },
        {
            wch: 3.4
        },
        {
            wch: 4.8
        },
        {
            wch: 4.8
        },
        {
            wch: 4.8
        },
        {
            wch: 6
        },
        {
            wch: 4.8
        },
        {
            wch: 5.5
        },
        {
            wch: 4.8
        },
        {
            wch: 6.5
        },
        {
            wch: 7.38
        },
        {
            wch: 5.4
        }
    ];
    ws['!merges'] = [{
        e: {
            c: 13,
            r: 26
        },
        s: {
            c: 11,
            r: 26
        }
    }, {
        e: {
            c: 13,
            r: 27
        },
        s: {
            c: 11,
            r: 27
        }
    }, {
        e: {
            c: 5,
            r: 19
        },
        s: {
            c: 3,
            r: 19
        }
    }, {
        e: {
            c: 9,
            r: 19
        },
        s: {
            c: 8,
            r: 19
        }
    }, {
        e: {
            c: 5,
            r: 20
        },
        s: {
            c: 3,
            r: 20
        }
    }, {
        e: {
            c: 9,
            r: 20
        },
        s: {
            c: 8,
            r: 20
        }
    }];
    ws['D21'].f = 'TEXT(数据!B12,"0.0000")&"%"';
    ws['D21'].s = {
        font: {
            color: {
                rgb: 'FF0000'
            }
        },
        alignment: {
            horizontal: 'center',
            vertical: 'bottom'
        }
    };
    ws['I20'].f = 'TEXT(数据!B15,"0.00")&" "';
    ws['I20'].s = {
        alignment: {
            horizontal: 'right',
            vertical: 'center'
        }
    };
    ws['I21'].f = 'TEXT(数据!B21,"0.00")&" "';
    ws['I21'].s = {
        alignment: {
            horizontal: 'right',
            vertical: 'bottom'
        }
    };
    ws['L27'].f = '数据!B24';
    ws['L27'].s = {
        alignment: {
            horizontal: 'left',
            vertical: 'bottom'
        }
    };
    ws['M20'].f = '数据!B19';
    ws['M20'].s = {
        alignment: {
            horizontal: 'center',
            vertical: 'center'
        }
    };
    ws['M21'].f = 'TEXT(数据!B42,"0.00")&" "';
    ws['M21'].s = {
        font: {
            sz: 10
        },
        alignment: {
            horizontal: 'right',
            vertical: 'bottom'
        }
    };
}
// 购车款项收妥通知书
function createGckxsttzs(wb) {
    var ws = getSheet(wb, 11, 9, '购车款项收妥通知书');
    ws['!merges'] = [{
        e: {
            c: 8,
            r: 6
        },
        s: {
            c: 6,
            r: 6
        }
    }, {
        e: {
            c: 6,
            r: 8
        },
        s: {
            c: 4,
            r: 8
        }
    }, {
        e: {
            c: 2,
            r: 10
        },
        s: {
            c: 0,
            r: 10
        }
    }, {
        e: {
            c: 5,
            r: 5
        },
        s: {
            c: 4,
            r: 5
        }
    }];
    ws['!rows'] = [{
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 21,
            hpx: 21
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 5.25,
            hpx: 5.25
        },
        {
            hpt: 39.75,
            hpx: 39.75
        },
        {
            hpt: 30,
            hpx: 30
        },
        {
            hpt: 18,
            hpx: 18
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 13,
            hpx: 13
        }
    ];
    ws['!cols'] = [{
            wch: 7.6
        },
        {
            wch: 8.2
        },
        {
            wch: 9.6
        },
        {
            wch: 3
        },
        {
            wch: 11
        },
        {
            wch: 10.6
        },
        {
            wch: 6.6
        },
        {
            wch: 8.2
        }
    ];
    ws['A11'].f = '数据!B18';
    ws['B9'].f = '数据!B1';
    ws['E6'] = {
        v: '温州城东支行',
        t: 's',
        w: '温州城东支行'
    };
    ws['E9'].f = '数据!B34';
    ws['G7'] = {
        v: '温州浩源控股有限公司',
        t: 's',
        w: '温州浩源控股有限公司'
    };

    ws['A11'].s = ws['G7'].s = {
        font: {
            sz: 10,
            name: '楷体_GB2312'
        },
        alignment: {
            vertical: 'bottom',
            horizontal: 'left'
        }
    };
    ws['B9'].s = ws['E6'].s = {
        font: {
            name: '楷体_GB2312'
        },
        alignment: {
            vertical: 'bottom',
            horizontal: 'left'
        }
    };
    ws['E9'].s = {
        font: {
            sz: 10,
            name: '楷体_GB2312'
        },
        alignment: {
            vertical: 'bottom',
            horizontal: 'center'
        }
    };
}
// 业务付款申请书
function createYwfksqs(wb) {
    var ws = getSheet(wb, 35, 9, '业务付款申请书');
    ws['!merges'] = [{
        s: {
            c: 7,
            r: 10
        },
        e: {
            c: 7,
            r: 11
        }
    }, {
        s: {
            c: 2,
            r: 10
        },
        e: {
            c: 3,
            r: 10
        }
    }, {
        s: {
            c: 2,
            r: 11
        },
        e: {
            c: 3,
            r: 11
        }
    }, {
        s: {
            c: 0,
            r: 30
        },
        e: {
            c: 1,
            r: 30
        }
    }, {
        s: {
            c: 1,
            r: 35
        },
        e: {
            c: 2,
            r: 35
        }
    }, {
        s: {
            c: 1,
            r: 4
        },
        e: {
            c: 2,
            r: 4
        }
    }, {
        s: {
            c: 1,
            r: 6
        },
        e: {
            c: 2,
            r: 6
        }
    }, {
        s: {
            c: 4,
            r: 6
        },
        e: {
            c: 5,
            r: 6
        }
    }, {
        s: {
            c: 4,
            r: 9
        },
        e: {
            c: 5,
            r: 9
        }
    }];
    ws['!rows'] = [];
    ws['!rows'][1] = {
        hpt: 11.25,
        hpx: 11.25
    };
    ws['!rows'][3] = {
        hidden: true,
        hpt: 8.25,
        hpx: 8.25
    };
    ws['!rows'][5] = {
        hpt: 9,
        hpx: 9
    };
    ws['!rows'][6] = {
        hpt: 17,
        hpx: 17
    };
    ws['!rows'][9] = {
        hpt: 20.25,
        hpx: 20.25
    };
    ws['!rows'][10] = {
        hpt: 24,
        hpx: 24
    };
    ws['!rows'][11] = {
        hpt: 11.25,
        hpx: 11.25
    };
    ws['!rows'][30] = {
        hpt: 27,
        hpx: 27
    };
    ws['!rows'][33] = {
        hpt: 20.25,
        hpx: 20.25
    };
    ws['!rows'][34] = {
        hpt: 3.75,
        hpx: 3.75
    };

    ws['!cols'] = [{
            wch: 8.54
        },
        {
            wch: 8.2
        },
        {
            wch: 8.2
        },
        {
            wch: 8.2
        },
        {
            wch: 8.2
        },
        {
            wch: 9.2
        },
        {
            wch: 11.2
        },
        {
            wch: 11.8
        },
        {
            wch: 3.4
        }
    ];

    ws['B5'].f = '数据!B1';
    ws['B7'] = {
        v: '身份证',
        t: 's',
        w: '身份证'
    };
    ws['B10'] = {
        v: '人民币',
        t: 's',
        w: '人民币'
    };
    ws['E7'].f = '数据!B4';
    ws['E10'].f = '数据!B15';
    ws['H5'].f = '数据!B5';
    ws['H10'].f = '数据!B19';

    ws['B5'].s = ws['B7'].s = ws['B10'].s = ws['E7'].s = {
        alignment: {
            vertical: 'bottom',
            horizontal: 'left'
        }
    };
    ws['E10'].s = ws['H10'].s = {
        alignment: {
            vertical: 'bottom',
            horizontal: 'center'
        }
    };
    ws['H5'].s = {
        font: {
            sz: 11
        },
        alignment: {
            vertical: 'bottom',
            horizontal: 'right'
        }
    };
}
// 授权委托书
function createSqwts(wb) {
    var ws = getSheet(wb, 23, 8, '授权委托书');
    ws['!merges'] = [{
        e: {
            c: 5,
            r: 7
        },
        s: {
            c: 3,
            r: 7
        }
    }, {
        e: {
            c: 2,
            r: 11
        },
        s: {
            c: 1,
            r: 11
        }
    }, {
        e: {
            c: 7,
            r: 5
        },
        s: {
            c: 3,
            r: 5
        }
    }, {
        e: {
            c: 7,
            r: 21
        },
        s: {
            c: 5,
            r: 21
        }
    }, {
        e: {
            c: 3,
            r: 22
        },
        s: {
            c: 1,
            r: 22
        }
    }];
    ws['!rows'] = [{
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 12,
            hpx: 12
        },
        {
            hpt: 27.75,
            hpx: 27.75
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 9,
            hpx: 9
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 20.25,
            hpx: 20.25
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 8.25,
            hpx: 8.25
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 30.75,
            hpx: 30.75
        },
        {
            hpt: 10.5,
            hpx: 10.5
        },
        {
            hidden: true
        },
        {
            hidden: true
        },
        {
            hidden: true,
            hpt: 9,
            hpx: 9
        },
        {
            hpt: 18,
            hpx: 18
        },
        {
            hpt: 17,
            hpx: 17
        }
    ];
    ws['!cols'] = [{
            wch: 12.1
        },
        {
            wch: 8
        },
        {
            wch: 8.1
        },
        {
            wch: 5.8
        },
        {
            wch: 8.1
        },
        {
            wch: 8.1
        },
        {
            wch: 8.1
        },
        {
            wch: 8.1
        }
    ];
    ws['B12'].f = 'TEXT(数据!B15,"0.00")&" "';
    ws['B23'] = {
        v: '1203211019200128617',
        t: 's',
        w: '1203211019200128617'
    };
    ws['D4'].f = '数据!B1';
    ws['D6'] = {
        v: '中国工商银行股份有限公司温州城东支行',
        t: 's',
        w: '中国工商银行股份有限公司温州城东支行'
    };
    ws['D8'] = {
        v: '温州浩源控股有限公司',
        t: 's',
        w: '温州浩源控股有限公司'
    };
    ws['F12'] = {
        v: 3,
        t: 'n',
        w: '3'
    };
    ws['F22'] = {
        v: '温州浩源控股有限公司',
        t: 's',
        w: '温州浩源控股有限公司'
    };
    ws['F23'] = {
        v: '工行',
        t: 's',
        w: '工行'
    };

    ws['B12'].s = ws['F23'].s = {
        font: {
            name: '楷体_GB2312'
        },
        alignment: {
            horizontal: 'right',
            vertical: 'bottom'
        }
    };
    ws['B23'].s = ws['D4'].s = ws['D6'].s = ws['D8'].s = ws['F12'].s = {
        font: {
            name: '楷体_GB2312'
        },
        alignment: {
            horizontal: 'left',
            vertical: 'bottom'
        }
    };
    ws['F22'].s = {
        font: {
            name: '楷体_GB2312'
        },
        alignment: {
            horizontal: 'left',
            vertical: 'center'
        }
    };
}
// 进账单
function createJzd(wb) {
    var ws = getSheet(wb, 23, 8, '进账单');
    ws['!merges'] = [{
        e: {
            c: 2,
            r: 2
        },
        s: {
            c: 1,
            r: 2
        }
    }, {
        e: {
            c: 3,
            r: 8
        },
        s: {
            c: 2,
            r: 8
        }
    }, {
        e: {
            c: 5,
            r: 2
        },
        s: {
            c: 4,
            r: 2
        }
    }, {
        e: {
            c: 5,
            r: 3
        },
        s: {
            c: 4,
            r: 3
        }
    }, {
        e: {
            c: 5,
            r: 4
        },
        s: {
            c: 4,
            r: 4
        }
    }];
    ws['!rows'] = [];
    ws['!rows'][0] = {
        hidden: true
    };
    ws['!rows'][1] = {
        hpt: 5.25,
        hpx: 5.25
    };
    ws['!rows'][2] = {
        hpt: 14,
        hpx: 14
    };
    ws['!rows'][7] = {
        hpt: 54.75,
        hpx: 54.75
    };

    ws['!cols'] = [{
            wch: 6.5
        },
        {
            wch: 8.1
        },
        {
            wch: 8.1
        },
        {
            wch: 16.8
        },
        {
            wch: 10.8
        },
        {
            wch: 8.1
        },
        {
            wch: 8.1
        }
    ];

    ws['B3'].f = '数据!B1';
    ws['B4'] = {
        v: 255,
        t: 'n',
        w: '255'
    };
    ws['C9'] = {
        v: '金额、账号已核实',
        t: 's',
        w: '金额、账号已核实'
    };
    ws['E3'] = {
        v: '温州浩源控股有限公司',
        t: 's',
        w: '温州浩源控股有限公司'
    };
    ws['E4'] = {
        v: '1203211019200128617',
        t: 's',
        w: '1203211019200128617'
    };
    ws['E5'] = {
        v: '工行城东支行',
        t: 's',
        w: '工行城东支行'
    };

    ws['B3'].s = {
        alignment: {
            vertical: 'bottom',
            horizontal: 'center'
        }
    };
    ws['B4'].s = {
        alignment: {
            vertical: 'bottom',
            horizontal: 'right'
        }
    };
    ws['C9'].s = ws['E3'].s = ws['E4'].s = ws['E5'].s = {
        alignment: {
            vertical: 'bottom',
            horizontal: 'left'
        }
    };
}
// 汽车购销合同
function createQcgxht(wb) {
    var ws = getSheet(wb, 20, 7, '汽车购销合同');
    ws['!merges'] = [{
        s: {
            c: 2,
            r: 19
        },
        e: {
            c: 4,
            r: 19
        }
    }, {
        s: {
            c: 5,
            r: 19
        },
        e: {
            c: 6,
            r: 19
        }
    }, {
        s: {
            c: 3,
            r: 13
        },
        e: {
            c: 5,
            r: 13
        }
    }, {
        s: {
            c: 2,
            r: 14
        },
        e: {
            c: 3,
            r: 14
        }
    }, {
        s: {
            c: 3,
            r: 15
        },
        e: {
            c: 5,
            r: 15
        }
    }, {
        s: {
            c: 2,
            r: 18
        },
        e: {
            c: 3,
            r: 18
        }
    }, {
        s: {
            c: 2,
            r: 6
        },
        e: {
            c: 5,
            r: 6
        }
    }];
    ws['!rows'] = [{
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 15.75,
            hpx: 15.75
        },
        {
            hidden: true
        },
        {
            hidden: true,
            hpt: 3,
            hpx: 3
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 39.75,
            hpx: 39.75
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 18,
            hpx: 18
        },
        {
            hpt: 15.75,
            hpx: 15.75
        },
        {
            hpt: 10.5,
            hpx: 10.5
        },
        {
            hpt: 6.75,
            hpx: 6.75
        },
        {
            hpt: 13,
            hpx: 13
        },
        {
            hpt: 13,
            hpx: 13
        }
    ];
    ws['!cols'] = [{
            wch: 8.1
        },
        {
            wch: 8
        },
        {
            wch: 8.1
        },
        {
            wch: 9.6
        },
        {
            wch: 8.1
        },
        {
            wch: 8.1
        },
        {
            wch: 8.1
        }
    ];

    ws['C7'].f = '数据!B31';
    ws['C9'].f = '数据!B1';
    ws['C15'].f = '数据!B32';
    ws['C19'].f = '数据!B43';
    ws['C20'].f = '数据!B44';
    ws['D14'].f = '数据!B34';
    ws['D16'].f = '数据!B33';
    ws['F20'] = {
        v: '壹',
        t: 's',
        w: '壹'
    };

    ws['C7'].s = ws['C9'].s = ws['C15'].s = ws['D14'].s = ws['D16'].s = {
        font: {
            name: '楷体_GB2312'
        },
        alignment: {
            vertical: 'bottom',
            horizontal: 'left'
        }
    };
    ws['C19'].s = {
        font: {
            name: '楷体_GB2312'
        },
        alignment: {
            vertical: 'bottom',
            horizontal: 'center'
        }
    };
    ws['C20'].s = ws['F20'].s = {
        font: {
            name: '楷体_GB2312',
            sz: 10
        },
        alignment: {
            vertical: 'bottom',
            horizontal: 'left'
        }
    };
}
// 担保承诺函
function createDbcnh(wb) {
    var ws = getSheet(wb, 10, 7, '担保承诺函');
    ws['!merges'] = [{
        e: {
            c: 4,
            r: 4
        },
        s: {
            c: 3,
            r: 4
        }
    }, {
        e: {
            c: 6,
            r: 7
        },
        s: {
            c: 5,
            r: 7
        }
    }, {
        e: {
            c: 3,
            r: 9
        },
        s: {
            c: 1,
            r: 9
        }
    }];
    ws['!rows'] = [
        null,
        {
            hpt: 31.5,
            hpx: 31.5
        },
        {
            hpt: 10.5,
            hpx: 10.5
        },
        {
            hpt: 6,
            hpx: 6
        },
        null,
        null,
        {
            hpt: 15.75,
            hpx: 15.75
        },
        {
            hpt: 18,
            hpx: 18
        },
        {
            hpt: 9,
            hpx: 9
        }
    ];
    ws['!cols'] = [{
            wch: 17
        },
        {
            wch: 8.1
        },
        {
            wch: 8.1
        },
        {
            wch: 8.1
        },
        {
            wch: 12.8
        },
        {
            wch: 8.1
        },
        {
            wch: 8.1
        }
    ];
    ws['B10'].f = '数据!B4';
    ws['B10'].s = ws['F8'].s = {
        alignment: {
            horizontal: 'left',
            vertical: 'bottom'
        }
    };
    ws['D5'] = {
        v: '温州城东支行',
        t: 's',
        w: '温州城东支行'
    };
    ws['D5'].s = {
        alignment: {
            horizontal: 'center',
            vertical: 'bottom'
        }
    };
    ws['F8'].f = '数据!B1';
}
// 工行合同封面
function createGhhtfm(wb) {
    var ws = getSheet(wb, 26, 9, '工行合同封面');
    ws['!merges'] = [{
        e: {
            c: 8,
            r: 12
        },
        s: {
            c: 6,
            r: 12
        }
    }, {
        e: {
            c: 6,
            r: 21
        },
        s: {
            c: 3,
            r: 21
        }
    }, {
        e: {
            c: 6,
            r: 23
        },
        s: {
            c: 3,
            r: 23
        }
    }, {
        e: {
            c: 6,
            r: 25
        },
        s: {
            c: 3,
            r: 25
        }
    }];
    ws['!rows'] = [{
            hidden: true,
            hpt: 9,
            hpx: 9
        },
        {
            hidden: true,
            hpt: 4.5,
            hpx: 4.5
        },
        {
            hidden: true
        },
        {
            hpt: 15.75,
            hpx: 15.75
        },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        {
            hpt: 18,
            hpx: 18
        },
        null,
        null,
        null,
        null,
        null,
        {
            hpt: 9.75,
            hpx: 9.75
        },
        {
            hpt: 120,
            hpx: 120
        },
        {
            hpt: 24,
            hpx: 24
        },
        {
            hpt: 21,
            hpx: 21
        },
        {
            hpt: 18.75,
            hpx: 18.75
        },
        {
            hpt: 6,
            hpx: 6
        },
        {
            hpt: 18.75,
            hpx: 18.75
        },
        {
            hpt: 5,
            hpx: 5
        },
        {
            hpt: 18.75,
            hpx: 18.75
        }
    ];
    ws['!cols'] = [{
            wch: 7.9
        },
        {
            wch: 8.8
        },
        {
            wch: 10.3
        },
        {
            wch: 8.1
        },
        {
            wch: 8.1
        },
        {
            wch: 6.1
        },
        {
            wch: 8.1
        },
        {
            wch: 8.1
        },
        {
            wch: 5.1
        }
    ];
    ws['D22'] = {
        v: '温州城东支行',
        t: 's',
        w: '温州城东支行'
    };
    ws['D24'].f = ws['D26'].f = '数据!B1';
    ws['G13'] = {
        v: 'FQ-JC-12032110-201800',
        t: 's',
        w: 'FQ-JC-12032110-201800'
    };
    ws['D24'].s = ws['D26'].s = {
        alignment: {
            horizontal: 'left',
            vertical: 'center'
        }
    };
    ws['D22'].s = ws['G13'].s = {
        alignment: {
            horizontal: 'right',
            vertical: 'center'
        }
    };
}
// 第一
function createD1(wb) {
    var ws = getSheet(wb, 41, 9, '第一');
    ws['!merges'] = [{
        s: {
            c: 3,
            r: 40
        },
        e: {
            c: 4,
            r: 40
        }
    }, {
        s: {
            c: 3,
            r: 31
        },
        e: {
            c: 4,
            r: 31
        }
    }, {
        s: {
            c: 0,
            r: 33
        },
        e: {
            c: 1,
            r: 33
        }
    }, {
        s: {
            c: 2,
            r: 35
        },
        e: {
            c: 3,
            r: 35
        }
    }, {
        s: {
            c: 5,
            r: 35
        },
        e: {
            c: 6,
            r: 35
        }
    }, {
        s: {
            c: 6,
            r: 11
        },
        e: {
            c: 7,
            r: 11
        }
    }, {
        s: {
            c: 6,
            r: 18
        },
        e: {
            c: 7,
            r: 18
        }
    }, {
        s: {
            c: 6,
            r: 27
        },
        e: {
            c: 8,
            r: 27
        }
    }, {
        s: {
            c: 3,
            r: 28
        },
        e: {
            c: 5,
            r: 28
        }
    }, {
        s: {
            c: 4,
            r: 37
        },
        e: {
            c: 5,
            r: 37
        }
    }, {
        s: {
            c: 7,
            r: 37
        },
        e: {
            c: 8,
            r: 37
        }
    }];
    ws['!rows'] = [{
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 20.25,
            hpx: 20.25
        },
        {
            hpt: 18.75,
            hpx: 18.75
        },
        {
            hpt: 24,
            hpx: 24
        },
        {
            hpt: 14,
            hpx: 14
        },
        {
            hpt: 17,
            hpx: 17
        },
        {
            hpt: 21,
            hpx: 21
        },
        {
            hpt: 5,
            hpx: 5
        },
        {
            hpt: 21,
            hpx: 21
        },
        {
            hpt: 29,
            hpx: 29
        },
        {
            hpt: 24,
            hpx: 24
        },
        {
            hpt: 3.75,
            hpx: 3.75
        },
        {
            hpt: 26,
            hpx: 26
        },
        {
            hpt: 26,
            hpx: 26
        },
        {
            hpt: 6,
            hpx: 6
        },
        null,
        null,
        null,
        null,
        null,
        null,
        {
            hpt: 5.25,
            hpx: 5.25
        },
        null,
        {
            hpt: 4.5,
            hpx: 4.5
        }
    ];
    ws['!cols'] = [{
            wch: 6.3
        },
        {
            wch: 9.8
        },
        {
            wch: 8
        },
        {
            wch: 11.8
        },
        {
            wch: 8.3
        },
        {
            wch: 6.8
        },
        {
            wch: 11.8
        },
        {
            wch: 8.6
        },
        {
            wch: 8.1
        }
    ];
    ws['A34'].f = '数据!B29';
    ws['C36'] = {
        v: '温州浩源控股有限公司',
        t: 's',
        w: '温州浩源控股有限公司'
    };
    ws['D29'].f = '数据!B31';
    ws['D31'] = {
        v: '汽车',
        t: 's',
        w: '汽车'
    };
    ws['D32'].f = '数据!B26';
    ws['D41'].f = '数据!B17';
    ws['E38'].f = '数据!B17';
    ws['F36'] = {
        v: '担保费',
        t: 's',
        w: '担保费'
    };
    ws['G28'].f = '数据!B18';
    ws['G35'].f = '数据!B16';

    ws['A34'].s = {
        font: {
            sz: 10
        },
        alignment: {
            horizontal: 'right',
            vertical: 'bottom'
        }
    };
    ws['C36'].s = {
        font: {
            sz: 10
        },
        alignment: {
            horizontal: 'left',
            vertical: 'bottom'
        }
    };
    ws['D29'].s = {
        font: {
            sz: 9
        },
        alignment: {
            horizontal: 'center',
            vertical: 'center'
        }
    };
    ws['D31'].s = {
        font: {
            sz: 11
        },
        alignment: {
            horizontal: 'center',
            vertical: 'center'
        }
    };
    ws['D32'].s = ws['D41'].s = {
        font: {
            sz: 10
        },
        alignment: {
            horizontal: 'center',
            vertical: 'bottom'
        }
    };
    ws['E38'].s = {
        font: {
            sz: 10
        },
        alignment: {
            horizontal: 'center',
            vertical: 'center'
        }
    };
    ws['F36'].s = {
        font: {
            sz: 11
        },
        alignment: {
            horizontal: 'center',
            vertical: 'bottom'
        }
    };
    ws['G28'].s = {
        font: {
            sz: 10
        },
        alignment: {
            horizontal: 'left',
            vertical: 'bottom'
        }
    };
    ws['G35'].s = {
        font: {
            sz: 10
        },
        alignment: {
            horizontal: 'center',
            vertical: 'bottom'
        }
    };
}
// 第1【新】
function createD1x(wb) {
    var ws = getSheet(wb, 43, 9, '第1【新】');
    ws['!merges'] = [{
        s: {
            c: 3,
            r: 40
        },
        e: {
            c: 4,
            r: 40
        }
    }, {
        s: {
            c: 2,
            r: 42
        },
        e: {
            c: 3,
            r: 42
        }
    }, {
        s: {
            c: 5,
            r: 35
        },
        e: {
            c: 6,
            r: 35
        }
    }, {
        s: {
            c: 4,
            r: 37
        },
        e: {
            c: 5,
            r: 37
        }
    }, {
        s: {
            c: 7,
            r: 37
        },
        e: {
            c: 8,
            r: 37
        }
    }, {
        s: {
            c: 2,
            r: 38
        },
        e: {
            c: 3,
            r: 38
        }
    }, {
        s: {
            c: 3,
            r: 31
        },
        e: {
            c: 4,
            r: 31
        }
    }, {
        s: {
            c: 0,
            r: 33
        },
        e: {
            c: 1,
            r: 33
        }
    }, {
        s: {
            c: 2,
            r: 33
        },
        e: {
            c: 3,
            r: 33
        }
    }, {
        s: {
            c: 2,
            r: 35
        },
        e: {
            c: 3,
            r: 35
        }
    }, {
        s: {
            c: 6,
            r: 11
        },
        e: {
            c: 7,
            r: 11
        }
    }, {
        s: {
            c: 6,
            r: 18
        },
        e: {
            c: 7,
            r: 18
        }
    }, {
        s: {
            c: 6,
            r: 27
        },
        e: {
            c: 8,
            r: 27
        }
    }, {
        s: {
            c: 3,
            r: 28
        },
        e: {
            c: 5,
            r: 28
        }
    }];
    ws['!rows'] = [{
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 20.25,
            hpx: 20.25
        },
        {
            hpt: 18.75,
            hpx: 18.75
        },
        {
            hpt: 24,
            hpx: 24
        },
        {
            hpt: 14,
            hpx: 14
        },
        {
            hpt: 17,
            hpx: 17
        },
        {
            hpt: 21,
            hpx: 21
        },
        {
            hpt: 5,
            hpx: 5
        },
        {
            hpt: 21,
            hpx: 21
        },
        {
            hpt: 29,
            hpx: 29
        },
        {
            hpt: 24,
            hpx: 24
        },
        {
            hpt: 3.75,
            hpx: 3.75
        },
        {
            hpt: 26,
            hpx: 26
        },
        {
            hpt: 26,
            hpx: 26
        },
        {
            hpt: 6,
            hpx: 6
        },
        null,
        null,
        null,
        null,
        null,
        null,
        {
            hpt: 5.25,
            hpx: 5.25
        },
        null,
        {
            hpt: 4.5,
            hpx: 4.5
        }
    ];
    ws['!cols'] = [{
            wch: 6.3
        },
        {
            wch: 9.8
        },
        {
            wch: 8
        },
        {
            wch: 11.8
        },
        {
            wch: 8.3
        },
        {
            wch: 6.8
        },
        {
            wch: 11.8
        },
        {
            wch: 8.6
        },
        {
            wch: 8.1
        }
    ];
    ws['C34'].f = '数据!B29&"元"';
    ws['C36'].f = '数据!B16&"元"';
    ws['C39'].f = '数据!B17&"元"';
    ws['C43'].f = '数据!B17&"元"';
    ws['D29'].f = '数据!B31';
    ws['D31'] = {
        v: '汽车',
        t: 's',
        w: '汽车'
    };
    ws['D32'].f = '数据!B26&"元"';
    ws['D38'] = {
        v: '担保费',
        t: 's',
        w: '担保费'
    };
    ws['F36'] = {
        v: '温州浩源控股有限公司',
        t: 's',
        w: '温州浩源控股有限公司'
    };
    ws['G28'].f = '数据!B18&"元"';

    ws['C34'].s = ws['C36'].s = ws['C39'].s = ws['C43'].s = ws['G28'].s = {
        font: {
            sz: 10
        },
        alignment: {
            horizontal: 'left',
            vertical: 'bottom'
        }
    };
    ws['D29'].s = {
        font: {
            sz: 9
        },
        alignment: {
            horizontal: 'center',
            vertical: 'center'
        }
    };
    ws['D31'].s = {
        font: {
            sz: 11
        },
        alignment: {
            horizontal: 'center',
            vertical: 'center'
        }
    };
    ws['D32'].s = {
        font: {
            sz: 10
        },
        alignment: {
            horizontal: 'center',
            vertical: 'bottom'
        }
    };
    ws['D38'].s = {
        font: {
            sz: 11
        },
        alignment: {
            horizontal: 'left',
            vertical: 'bottom'
        }
    };
    ws['F36'].s = {
        font: {
            sz: 11
        },
        alignment: {
            horizontal: 'center',
            vertical: 'bottom'
        }
    };
}
// 第2
function createD2(wb) {
    var ws = getSheet(wb, 35, 6, '第2');
    ws['!merges'] = [{
        e: {
            c: 4,
            r: 28
        },
        s: {
            c: 2,
            r: 28
        }
    }, {
        e: {
            c: 4,
            r: 30
        },
        s: {
            c: 2,
            r: 30
        }
    }, {
        e: {
            c: 4,
            r: 32
        },
        s: {
            c: 2,
            r: 32
        }
    }, {
        e: {
            c: 5,
            r: 34
        },
        s: {
            c: 2,
            r: 34
        }
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
        {
            hpt: 17,
            hpx: 17
        },
        {
            hpt: 17,
            hpx: 17
        },
        null,
        {
            hpt: 17,
            hpx: 17
        },
        {
            hpt: 17,
            hpx: 17
        },
        {
            hpt: 17,
            hpx: 17
        },
        null,
        null,
        null,
        null,
        null,
        null,
        {
            hpt: 87.75,
            hpx: 87.75
        },
        null,
        null,
        null,
        {
            hpt: 11.25,
            hpx: 11.25
        },
        null
    ];
    ws['!cols'] = [{
            wch: 9.3
        },
        {
            wch: 11.8
        },
        {
            wch: 8.1
        },
        {
            wch: 8.1
        },
        {
            wch: 8.1
        },
        {
            wch: 7.38
        }
    ];
    ws['C31'] = {
        v: '温州浩源控股有限公司',
        t: 's',
        w: '温州浩源控股有限公司'
    };
    ws['C33'] = {
        v: '1203211019200128617',
        t: 's',
        w: '1203211019200128617'
    };
    ws['C35'] = {
        v: '中国工商银行股份有限公司温州城东支行',
        t: 's',
        w: '中国工商银行股份有限公司温州城东支行'
    };
    ws['C31'].s = ws['C33'].s = ws['C35'].s = {
        font: {
            sz: 11
        },
        alignment: {
            horizontal: 'left',
            vertical: 'bottom'
        }
    };
}
// 第3
function createD3(wb) {
    var ws = getSheet(wb, 16, 8, '第3');
    ws['!merges'] = [{
        e: {
            c: 7,
            r: 11
        },
        s: {
            c: 2,
            r: 11
        }
    }, {
        e: {
            c: 7,
            r: 15
        },
        s: {
            c: 5,
            r: 15
        }
    }];
    ws['!rows'] = [
        null,
        {
            hpt: 20.25,
            hpx: 20.25
        },
        null,
        null,
        null,
        null,
        null,
        {
            hpt: 21.75,
            hpx: 21.75
        },
        null,
        null,
        null,
        null,
        null,
        null,
        {
            hpt: 18.75,
            hpx: 18.75
        },
        null,
        {
            hpt: 24.75,
            hpx: 24.75
        },
        {
            hpt: 15.75,
            hpx: 15.75
        },
        {
            hpt: 11,
            hpx: 11
        },
        null,
        {
            hpt: 20,
            hpx: 20
        },
        null,
        {
            hpt: 6,
            hpx: 6
        },
        {
            hpt: 23.25,
            hpx: 23.25
        },
        null,
        null,
        null,
        null,
        null,
        {
            hpt: 21,
            hpx: 21
        },
        {
            hpt: 18.75,
            hpx: 18.75
        }
    ];
    ws['!cols'] = [{
            wch: 10.8
        },
        {
            wch: 4.7
        },
        {
            wch: 8.1
        },
        {
            wch: 8.1
        },
        {
            wch: 9.8
        },
        {
            wch: 8.1
        },
        {
            wch: 8.1
        },
        {
            wch: 8.1
        }
    ];
    ws['F3'].f = '数据!B20';
    ws['F3'].s = {
        font: {
            sz: 10
        },
        alignment: {
            horizontal: 'center',
            vertical: 'center'
        }
    };
    ws['F16'].f = '数据!B22';
    ws['F16'].s = {
        font: {
            sz: 9
        },
        alignment: {
            horizontal: 'right',
            vertical: 'center'
        }
    };
}
// 第3【新】
function createD3x(wb) {
    var ws = getSheet(wb, 16, 9, '第3【新】');
    ws['!merges'] = [{
        e: {
            c: 7,
            r: 11
        },
        s: {
            c: 2,
            r: 11
        }
    }, {
        e: {
            c: 8,
            r: 15
        },
        s: {
            c: 5,
            r: 15
        }
    }];
    ws['!rows'] = [
        null,
        {
            hpt: 20.25,
            hpx: 20.25
        },
        null,
        null,
        null,
        null,
        null,
        {
            hpt: 21.75,
            hpx: 21.75
        },
        null,
        null,
        null,
        null,
        null,
        null,
        {
            hpt: 26.25,
            hpx: 26.25
        },
        null
    ];
    ws['!cols'] = [{
            wch: 10.8
        },
        {
            wch: 4.7
        },
        {
            wch: 8.1
        },
        {
            wch: 8.1
        },
        {
            wch: 9.8
        },
        {
            wch: 8.1
        },
        {
            wch: 6.3
        },
        {
            wch: 8.1
        },
        {
            wch: 8.1
        }
    ];
    ws['F3'].f = '数据!B20';
    ws['F3'].s = {
        font: {
            sz: 10
        },
        alignment: {
            horizontal: 'center',
            vertical: 'center'
        }
    };
    ws['F16'].f = '数据!B22';
    ws['F16'].s = {
        font: {
            sz: 9
        },
        alignment: {
            horizontal: 'right',
            vertical: 'center'
        }
    };
}
// 第4
function createD4(wb) {
    var ws = getSheet(wb, 27, 6, '第4');
    ws['!merges'] = [{
        e: {
            c: 5,
            r: 0
        },
        s: {
            c: 4,
            r: 0
        }
    }];
    ws['!rows'] = [{
            hpt: 18,
            hpx: 18
        },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        {
            hpt: 14,
            hpx: 14
        },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        {
            hpt: 9.75,
            hpx: 9.75
        },
        {
            hpt: 24,
            hpx: 24
        },
        null,
        null,
        null,
        {
            hpt: 21,
            hpx: 21
        }
    ];
    ws['!cols'] = [{
            wch: 8.1
        },
        {
            wch: 8.1
        },
        {
            wch: 8.1
        },
        {
            wch: 16.2
        }, // 3.6
        {
            wch: 8.1
        },
        {
            wch: 8.1
        }
    ];
    ws['C27'] = {
        v: 1,
        t: 'n',
        w: '1'
    };
    ws['C27'].s = {
        alignment: {
            horizontal: 'center',
            vertical: 'center'
        }
    };
    ws['E1'] = {
        v: '2%',
        t: 's',
        w: '2%'
    };
    ws['E1'].s = {
        alignment: {
            horizontal: 'right',
            vertical: 'center'
        }
    };
}
// 第5
function createD5(wb) {
    var ws = getSheet(wb, 22, 3, '第5');
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
        {
            hpt: 12.75,
            hpx: 12.75
        },
        null,
        null,
        null,
        null,
        {
            hpt: 21.75,
            hpx: 21.75
        }
    ];
    ws['!cols'] = [{
            wch: 8.1
        },
        {
            wch: 8.1
        },
        {
            wch: 10.3
        }
    ];
    ws['C22'] = {
        v: 2,
        t: 'n',
        w: '2'
    };
    ws['C22'].s = {
        alignment: {
            horizontal: 'right',
            vertical: 'bottom'
        }
    };
}
// 第6
function createD6(wb) {
    var ws = getSheet(wb, 32, 8, '第6');
    ws['!merges'] = [{
        e: {
            c: 1,
            r: 31
        },
        s: {
            c: 1,
            r: 28
        }
    }, {
        e: {
            c: 5,
            r: 30
        },
        s: {
            c: 5,
            r: 28
        }
    }, {
        e: {
            c: 6,
            r: 30
        },
        s: {
            c: 6,
            r: 28
        }
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
        null,
        null,
        null,
        null,
        null,
        null,
        {
            hpt: 18.75,
            hpx: 18.75
        },
        {
            hpt: 18.75,
            hpx: 18.75
        },
        {
            hpt: 15,
            hpx: 15
        },
        {
            hpt: 8,
            hpx: 8
        },
        {
            hpt: 9,
            hpx: 9
        }
    ];
    ws['!cols'] = [{
            wch: 2.3
        },
        {
            wch: 8.3
        },
        {
            wch: 6.8
        },
        {
            wch: 4.26
        },
        {
            wch: 17
        },
        {
            wch: 5.4
        },
        {
            wch: 11
        },
        {
            wch: 21.6
        }
    ];
    ws['B29'].f = '数据!B30';
    ws['F29'] = {
        v: '二手车',
        t: 's',
        w: '二手车'
    };
    ws['G29'].f = '数据!B25';
    ws['H29'].f = '数据!B33';
    ws['H30'].f = '数据!B32';

    ws['B29'].s = {
        font: {
            sz: 9
        },
        alignment: {
            horizontal: 'left',
            vertical: 'center'
        }
    };
    ws['F29'].s = {
        font: {
            sz: 10
        },
        alignment: {
            horizontal: 'left',
            vertical: 'center'
        }
    };
    ws['G29'].s = {
        font: {
            sz: 10
        },
        alignment: {
            horizontal: 'center',
            vertical: 'center'
        }
    };
    ws['H29'].s = {
        font: {
            sz: 10
        },
        alignment: {
            horizontal: 'right',
            vertical: 'top'
        }
    };
    ws['H30'].s = {
        font: {
            sz: 10
        },
        alignment: {
            horizontal: 'right',
            vertical: 'center'
        }
    };
}
// 第7
function createD7(wb) {
    var ws = getSheet(wb, 34, 5, '第7');
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
        {
            hpt: 3.75,
            hpx: 3.75
        },
        {
            hpt: 20,
            hpx: 20
        },
        {
            hpt: 3.75,
            hpx: 3.75
        },
        null,
        null,
        null,
        null,
        null,
        null,
        {
            hpt: 24,
            hpx: 24
        }
    ];
    ws['!cols'] = [{
            wch: 8.1
        },
        {
            wch: 8.1
        },
        {
            wch: 8.1
        },
        {
            wch: 8.1
        },
        {
            wch: 9.6
        }
    ];
    ws['E34'] = {
        v: 60,
        t: 'n',
        w: '60'
    };
    ws['E34'].s = {
        alignment: {
            horizontal: 'right',
            vertical: 'center'
        }
    };
}
// 第11
function createD11(wb) {
    var ws = getSheet(wb, 44, 8, '第11');
    ws['!merges'] = [{
        e: {
            c: 6,
            r: 28
        },
        s: {
            c: 5,
            r: 28
        }
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
        {
            hpt: 6,
            hpx: 6
        },
        {
            hpt: 10.5,
            hpx: 10.5
        },
        {
            hpt: 20,
            hpx: 20
        },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        {
            hpt: 8,
            hpx: 8
        },
        null
    ];
    ws['!cols'] = [{
            wch: 8.6
        },
        {
            wch: 11
        },
        {
            wch: 8.1
        },
        {
            wch: 8.1
        },
        {
            wch: 8
        },
        {
            wch: 7.38
        },
        {
            wch: 7
        },
        {
            wch: 7
        }
    ];

    ws['B22'] = {
        v: '壹',
        t: 's',
        w: '壹'
    };
    ws['B44'] = {
        v: 'B',
        t: 's',
        w: 'B'
    };
    ws['D22'] = {
        v: '壹',
        t: 's',
        w: '壹'
    };
    ws['F20'] = {
        v: '壹',
        t: 's',
        w: '壹'
    };
    ws['D22'] = {
        v: '叁',
        t: 's',
        w: '叁'
    };
    ws['H20'] = {
        v: '壹',
        t: 's',
        w: '壹'
    };

    ws['B22'].s = ws['D22'].s = ws['H20'].s = {
        alignment: {
            horizontal: 'center',
            vertical: 'center'
        }
    };
    ws['B44'].s = {
        alignment: {
            horizontal: 'right',
            vertical: 'center'
        }
    };
    ws['F20'].s = {
        alignment: {
            horizontal: 'left',
            vertical: 'center'
        }
    };
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