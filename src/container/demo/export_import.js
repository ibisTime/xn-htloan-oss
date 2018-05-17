import React from 'react';
import XLSX from 'xlsx';
import { Button } from 'antd';

function makeCols(refstr) {
  var o = [];
  var range = XLSX.utils.decode_range(refstr);
  for(var i = 0; i <= range.e.c; ++i) {
    o.push({ name: XLSX.utils.encode_col(i), key: i });
  }
  return o;
}

class ExportImport extends React.Component {
  constructor(props) {
    super(props);
    this.handleExport = this.handleExport.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      data: [],
      cols: []
    };
  }
  handleExport() {
    const ws = XLSX.utils.aoa_to_sheet(this.state.data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
    XLSX.writeFile(wb, 'sheetjs.xlsx');
  }
  handleChange(files) {
    files = files.target.files;
    if (!files || !files.length) {
      return;
    }
    let file = files[0];
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      let data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      this.setState({ data: data, cols: makeCols(ws['!ref']) });
      console.log(data);
    };
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }
  render() {
    return (
      <div>
        <input type="file" onChange={this.handleChange}/>
        <Button onClick={this.handleExport}>导出</Button>
        <table className="table table-striped">
          <thead>
            <tr>{this.state.cols.map(c => <th key={c.key}>{c.name}</th>)}</tr>
          </thead>
          <tbody>
            {this.state.data.map((r, i) => <tr key={i}>
              {this.state.cols.map(c => <td key={c.key}>{ r[c.key] }</td>)}
            </tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ExportImport;
