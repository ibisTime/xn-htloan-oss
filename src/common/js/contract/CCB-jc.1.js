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
    this.createZysqbJcdy(wb);
    this.createSqwtsGs(wb);
    this.createTjysqwt(wb);
    this.createHxlsqwt(wb);
    this.createKhwts(wb);
    this.createGswts(wb);
    // download
    wb.downloadXls('建设银行-解除');
  }
  // 内容
  createData(wb, data) {
    var ws = wb.getSheet(data, '内容');
    ws['!cols'] = [{
      wch: 18.63
    }, {
      wch: 52.63
    }];
  }
  // 质押申请表（解除抵押）
  createZysqbJcdy(wb) {
    var ws = this.getSheet(wb, 48, 8, '质押申请表（解除抵押）');
    ws['!merges'] = [{
      e: {c: 3, r: 5},
      s: {c: 2, r: 5}
    }, {
      e: {c: 3, r: 9},
      s: {c: 2, r: 9}
    }, {
      e: {c: 5, r: 18},
      s: {c: 4, r: 18}
    }];
    ws['!cols'] = [
      {wch: 8.38},
      {wch: 8.63},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 10.63},
      {wch: 18.75},
      {wch: 10.38},
      {wch: 8.38}
    ];
    ws['!rows'] = [
      null,
      null,
      null,
      null,
      null,
      {hpt: 34.5, hpx: 34.5},
      null,
      null,
      {hpt: 29.25, hpx: 29.25},
      {hpt: 33.75, hpx: 33.75},
      {hpt: 10.5, hpx: 10.5},
      null,
      {hpt: 33.75, hpx: 33.75},
      null,
      {hpt: 8.25, hpx: 8.25},
      {hpt: 30, hpx: 30},
      {hpt: 18.75, hpx: 18.75},
      {hpt: 8.25, hpx: 8.25},
      {hpt: 30.75, hpx: 30.75},
      {hpt: 27, hpx: 27},
      null,
      {hpt: 19.5, hpx: 19.5},
      null,
      null,
      null,
      null,
      {hpt: 4.5, hpx: 4.5}
    ];
    ws['C6'] = {v: '小型汽车', t: 's', w: '小型汽车'};
    ws['C10'].f = '内容!B1';
    ws['C28'] = {v: ' ', t: 's', w: ' '};
    ws['D20'] = {v: ' ', t: 's', w: ' '};
    ws['D23'] = {v: ' ', t: 's', w: ' '};
    ws['F28'] = {v: ' ', t: 's', w: ' '};
    ws['G6'].f = '内容!B2';

    ws['C6'].s = {font: {sz: 18}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C10'].s = {font: {sz: 18}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['C28'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['D20'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['D23'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['F28'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['G6'].s = {font: {sz: 14}, alignment: {horizontal: 'right', vertical: 'bottom'}};
  }
  // 授权委托书（公司）
  createSqwtsGs(wb) {
    var ws = this.getSheet(wb, 11, 3, '授权委托书（公司）');
    ws['!merges'] = [{
      e: {c: 7, r: 9},
      s: {c: 6, r: 9}
    }];
    ws['!cols'] = [
      {wch: 9.63},
      {wch: 6.5},
      {wch: 8.38}
    ];
    ws['!rows'] = [
      null,
      null,
      null,
      null,
      {hpt: 4.5, hpx: 4.5},
      {hpt: 9.75, hpx: 9.75},
      {hpt: 7.5, hpx: 7.5},
      {hpt: 18.75, hpx: 18.75},
      {hpt: 12, hpx: 12},
      {hpt: 33.75, hpx: 33.75},
      {hpt: 19.5, hpx: 19.5}
    ];
    ws['A8'] = {v: '温州', t: 's', w: '温州'};
    ws['C11'].f = '内容!B2';

    ws['A8'].s = {font: {sz: 14}, alignment: {horizontal: 'left', vertical: 'top'}};
    ws['C11'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  }
  // 滕洁瑜授权委托(解除抵押登记)
  createTjysqwt(wb) {
    var ws = this.getSheet(wb, 48, 8, '滕洁瑜授权委托(解除抵押登记)');
    ws['!merges'] = [{
      e: {c: 6, r: 6},
      s: {c: 4, r: 6}
    }, {
      e: {c: 7, r: 7},
      s: {c: 4, r: 7}
    }, {
      e: {c: 6, r: 9},
      s: {c: 5, r: 8}
    }, {
      e: {c: 2, r: 10},
      s: {c: 1, r: 10}
    }];
    ws['!cols'] = [
      {wch: 9.63},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 9.13},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 9.63},
      {wch: 8.38}
    ];
    ws['!rows'] = [
      null,
      null,
      null,
      {hpt: 23.25, hpx: 23.25},
      {hpt: 21, hpx: 21},
      {hpt: 21.75, hpx: 21.75},
      {hpt: 20.25, hpx: 20.25},
      {hpt: 0.75, hpx: 0.75},
      {hpt: 9, hpx: 9},
      {hpt: 22.5, hpx: 22.5},
      {hpt: 20.25, hpx: 20.25}
    ];
    ws['A6'] = {v: '温州', t: 's', w: '温州'};
    ws['A35'] = {v: ' ', t: 's', w: ' '};
    ws['B11'] = {v: '解除抵押登记', t: 's', w: '解除抵押登记'};
    ws['C7'] = {v: '滕洁瑜', t: 's', w: '滕洁瑜'};
    ws['C8'] = {v: ' ', t: 's', w: ' '};
    ws['E7'] = {v: '330302198107084841', t: 's', w: '330302198107084841'};
    ws['E8'] = {v: ' ', t: 's', w: ' '};
    ws['F9'] = {v: '浙C3665J', t: 's', w: '浙C3665J'};
    ws['G14'] = {v: 90, t: 's', w: '90'};

    ws['A6'].s = {font: {sz: 14}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['A35'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B11'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'top'}};
    ws['C7'].s = {font: {sz: 14}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['E7'].s = {font: {sz: 14}, alignment: {horizontal: 'right', vertical: 'center'}};
    ws['F9'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
    ws['G14'].s = {font: {sz: 14}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  }
  // 黄秀丽授权委托(解除抵押登记)
  createHxlsqwt(wb) {
    var ws = this.getSheet(wb, 48, 8, '黄秀丽授权委托(解除抵押登记)');
    ws['!merges'] = [{
      e: {c: 6, r: 6},
      s: {c: 4, r: 6}
    }, {
      e: {c: 7, r: 7},
      s: {c: 4, r: 7}
    }, {
      e: {c: 6, r: 9},
      s: {c: 5, r: 8}
    }, {
      e: {c: 2, r: 10},
      s: {c: 1, r: 10}
    }];
    ws['!cols'] = [
      {wch: 9.63},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 9.13},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 9.63},
      {wch: 8.38}
    ];
    ws['!rows'] = [
      null,
      null,
      null,
      null,
      {hpt: 21, hpx: 21},
      {hpt: 21.75, hpx: 21.75},
      {hpt: 20.25, hpx: 20.25},
      {hpt: 0.75, hpx: 0.75},
      {hpt: 9, hpx: 9},
      {hpt: 22.5, hpx: 22.5},
      {hpt: 20.25, hpx: 20.25}
    ];
    ws['A6'] = {v: '温州', t: 's', w: '温州'};
    ws['A35'] = {v: ' ', t: 's', w: ' '};
    ws['B11'] = {v: '解除抵押登记', t: 's', w: '解除抵押登记'};
    ws['C7'] = {v: '黄秀丽', t: 's', w: '黄秀丽'};
    ws['C8'] = {v: ' ', t: 's', w: ' '};
    ws['E7'] = {v: '330304198503136925', t: 's', w: '330302198107084841'};
    ws['E8'] = {v: ' ', t: 's', w: ' '};
    ws['F9'] = {v: '浙C3665J', t: 's', w: '浙C3665J'};
    ws['G14'] = {v: 90, t: 's', w: '90'};

    ws['A6'].s = {font: {sz: 14}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['A35'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['B11'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'top'}};
    ws['C7'].s = {font: {sz: 14}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['E7'].s = {font: {sz: 14}, alignment: {horizontal: 'right', vertical: 'center'}};
    ws['F9'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'center'}};
    ws['G14'].s = {font: {sz: 14}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  }
  // 客户委托书
  createKhwts(wb) {
    var ws = this.getSheet(wb, 9, 8, '客户委托书');
    ws['!merges'] = [{
      e: {c: 7, r: 7},
      s: {c: 6, r: 7}
    }, {
      e: {c: 4, r: 8},
      s: {c: 3, r: 8}
    }];
    ws['!cols'] = [
      {wch: 9.63},
      {wch: 6.5},
      {wch: 8.38},
      {wch: 9.13},
      {wch: 8.38},
      {wch: 10.75},
      {wch: 8.38},
      {wch: 6.75}
    ];
    ws['!rows'] = [
      null,
      null,
      null,
      null,
      {hpt: 12.75, hpx: 12.75},
      {hpt: 18.75, hpx: 18.75},
      {hpt: 12, hpx: 12},
      {hpt: 33.75, hpx: 33.75},
      {hpt: 19.5, hpx: 19.5}
    ];
    ws['D9'] = {v: '温州浩源控股有限', t: 's', w: '温州浩源控股有限'};
    ws['E6'] = {v: '瑞安', t: 's', w: '瑞安'};

    ws['D9'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['E6'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  }
  // 公司委托书
  createGswts(wb) {
    var ws = this.getSheet(wb, 27, 8, '公司委托书');
    ws['!merges'] = [{
      e: {c: 7, r: 6},
      s: {c: 6, r: 6}
    }];
    ws['!cols'] = [
      {wch: 9.63},
      {wch: 6.5},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 10.75},
      {wch: 8.38},
      {wch: 6.75}
    ];
    ws['!rows'] = [
      null,
      null,
      null,
      null,
      {hpt: 12.75, hpx: 12.75},
      {hpt: 18.75, hpx: 18.75},
      {hpt: 33.75, hpx: 33.75},
      {hpt: 19.5, hpx: 19.5},
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      {hpt: 21, hpx: 21}
    ];
    ws['C27'] = {v: '谢俊', t: 's', w: '谢俊'};
    ws['D7'] = {v: '谢俊', t: 's', w: '谢俊'};
    ws['E6'] = {v: '瑞安', t: 's', w: '瑞安'};

    ws['C27'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['D7'].s = {font: {sz: 12}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    ws['E6'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
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
