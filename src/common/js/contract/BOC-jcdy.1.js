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
    this.createBasqb(wb);
    this.createWtsGp1(wb);
    this.createSqwtsGpgsmc1(wb);
    this.createWts(wb);
    // download
    wb.downloadXls('中行解除抵押');
  }
  // 数据
  createData(wb, data) {
    var ws = wb.getSheet(data, '数据');
    ws['!cols'] = [{
      wch: 18.63
    }, {
      wch: 64.13
    }];

    ws['A2'].s = {font: {color: {rgb: 'FF0000'}}};
  }
  // 备案申请表
  createBasqb(wb) {
    var ws = this.getSheet(wb, 48, 8, '备案申请表');
    ws['!merges'] = [{
      e: {c: 8, r: 7},
      s: {c: 7, r: 7}
    }, {
      e: {c: 4, r: 12},
      s: {c: 2, r: 12}
    }, {
      e: {c: 6, r: 16},
      s: {c: 1, r: 16}
    }, {
      e: {c: 5, r: 20},
      s: {c: 4, r: 20}
    }];
    ws['!cols'] = [
      {wch: 7.5},
      {wch: 8.38},
      {wch: 10.25},
      {wch: 9.38},
      {wch: 8.38},
      {wch: 12.13},
      {wch: 2.5},
      {wch: 8.38},
      {wch: 8.38}
    ];
    ws['!rows'] = [
      null,
      null,
      null,
      null,
      {hpt: 24, hpx: 24},
      {hidden: true},
      {hidden: true},
      {hpt: 26.25, hpx: 26.25},
      null,
      null,
      {hpt: 22.5, hpx: 22.5},
      {hidden: true, hpt: 1.5, hpx: 1.5},
      {hpt: 74.25, hpx: 74.25},
      {hpt: 23.25, hpx: 23.25},
      {hpt: 20.25, hpx: 20.25},
      null,
      null,
      null,
      null,
      {hpt: 10.5, hpx: 10.5},
      null,
      {hpt: 10.5, hpx: 10.5},
      null,
      {hpt: 1.5, hpx: 1.5}
    ];
    ws['B17'] = {v: '浙江省温州市鹿城区莲池街道应道观巷35号', t: 's', w: '浙江省温州市鹿城区莲池街道应道观巷35号'};
    ws['C13'].f = '数据!B1';
    ws['C21'] = {v: 325000, t: 's', w: '325000'};
    ws['D8'] = {v: '小型汽车', t: 's', w: '小型汽车'};
    ws['D14'] = {v: '滕洁瑜', t: 's', w: '滕洁瑜'};
    ws['E21'] = {v: 15858581022, t: 's', w: '15858581022'};
    ws['H8'].f = '数据!B2';

    ws['B17'].s = {alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C13'].s = {font: {sz: 24}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['C21'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    ws['D8'].s = {font: {sz: 14}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['D14'].s = {font: {sz: 16}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['E21'].s = {alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['H8'].s = {font: {sz: 14}, alignment: {horizontal: 'left', vertical: 'bottom'}};
  }
  // 委托书(公牌）1
  createWtsGp1(wb) {
    var ws = this.getSheet(wb, 17, 4, '委托书(公牌）1');
    ws['!merges'] = [{
      e: {c: 3, r: 8},
      s: {c: 2, r: 8}
    }, {
      e: {c: 2, r: 11},
      s: {c: 1, r: 11}
    }];
    ws['!cols'] = [
      {wch: 5.5},
      {wch: 9.75},
      {wch: 8.38},
      {wch: 10}
    ];
    ws['!rows'] = [
      null,
      null,
      null,
      null,
      {hpt: 8.25, hpx: 8.25},
      {hpt: 37.5, hpx: 37.5},
      {hidden: true, hpt: 9, hpx: 9},
      {hpt: 42, hpx: 42},
      {hpt: 30, hpx: 30},
      {hpt: 1.5, hpx: 1.5},
      {hidden: true, hpt: 0.75, hpx: 0.75},
      {hpt: 23.25, hpx: 23.25}
    ];
    ws['B12'].f = '数据!B2';
    ws['C9'].f = '数据!B1';
    ws['C17'] = {v: ' ', t: 's', w: ' '};

    ws['B12'].s = {font: {sz: 11}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C9'].s = {font: {sz: 14}, alignment: {horizontal: 'center', vertical: 'center'}};
    ws['C17'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
  }
  // 授权委托书（公牌公司名称）1
  createSqwtsGpgsmc1(wb) {
    var ws = this.getSheet(wb, 12, 4, '授权委托书（公牌公司名称）1');
    ws['!merges'] = [{
      e: {c: 7, r: 9},
      s: {c: 6, r: 9}
    }, {
      e: {c: 2, r: 11},
      s: {c: 1, r: 11}
    }];
    ws['!cols'] = [
      {wch: 18},
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
      {hpt: 9.75, hpx: 9.75},
      {hpt: 18.75, hpx: 18.75},
      {hpt: 30, hpx: 30},
      {hpt: 6, hpx: 6},
      {hidden: true},
      {hpt: 21, hpx: 21}
    ];
    ws['B12'].f = '数据!B2';

    ws['B12'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
  }
  // 委托书
  createWts(wb) {
    var ws = this.getSheet(wb, 17, 4, '委托书');
    ws['!merges'] = [{
      e: {c: 7, r: 9},
      s: {c: 6, r: 9}
    }, {
      e: {c: 2, r: 11},
      s: {c: 1, r: 11}
    }];
    ws['!cols'] = [
      {wch: 4.88},
      {wch: 8.38},
      {wch: 8.38},
      {wch: 10}
    ];
    ws['!rows'] = [
      null,
      null,
      null,
      null,
      null,
      null,
      {hpt: 6, hpx: 6},
      {hpt: 18.75, hpx: 18.75},
      {hpt: 30, hpx: 30},
      {hpt: 1.5, hpx: 1.5},
      {hidden: true, hpt: 0.75, hpx: 0.75},
      {hpt: 31.5, hpx: 31.5}
    ];
    ws['B12'].f = '数据!B2';
    ws['C9'] = {v: '滕洁瑜', t: 's', w: '滕洁瑜'};
    ws['C17'] = {v: ' ', t: 's', w: ' '};

    ws['B12'].s = {font: {sz: 12}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C9'].s = {font: {sz: 14}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    ws['C17'].s = {font: {sz: 12}, alignment: {horizontal: 'left', vertical: 'bottom'}};
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
