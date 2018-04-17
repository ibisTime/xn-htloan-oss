import React from 'react';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/security/role';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';
import XLSX from 'xlsx';
import { Button, Upload } from 'antd';

function makeCols(refstr) {
  var o = [];
  var range = XLSX.utils.decode_range(refstr);
  for(var i = 0; i <= range.e.c; ++i) {
    o.push({ name: XLSX.utils.encode_col(i), key: i });
  }
  return o;
}

@listWrapper(
  state => ({
    ...state.securityRole,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Role extends React.Component {
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
      console.log(data);
      this.setState({ data: data, cols: makeCols(ws['!ref']) });
    };
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }
  render() {
    const fields = [{
      title: '角色名称',
      field: 'name',
      search: true
    }, {
      title: '角色等级',
      field: 'level',
      type: 'select',
      key: 'role_level',
      keyName: 'dkey',
      valueName: 'dvalue',
      search: true
    }, {
      title: '更新人',
      field: 'updater'
    }, {
      title: '更新时间',
      field: 'updateDatetime',
      type: 'datetime'
    }, {
      title: '备注',
      field: 'remark'
    }];
    const btnEvent = {
      change: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/security/role/menu?code=${selectedRowKeys[0]}&name=${selectedRows[0].name}`);
        }
      }
    };
    return this.props.buildList({ fields, btnEvent, pageCode: 627045, deleteCode: 627042 });
    // return (
    //   <div>
    //     <input type="file" onChange={this.handleChange}/>
    //     <Upload>上传</Upload>
    //     <Button onClick={this.handleExport}>导出</Button>
    //     <table className="table table-striped">
    //       <thead>
    //         <tr>{this.state.cols.map(c => <th key={c.key}>{c.name}</th>)}</tr>
    //       </thead>
    //       <tbody>
    //         {this.state.data.map((r, i) => <tr key={i}>
    //           {this.state.cols.map(c => <td key={c.key}>{ r[c.key] }</td>)}
    //         </tr>)}
    //       </tbody>
    //     </table>
    //   </div>
    // );
  }
}

export default Role;
