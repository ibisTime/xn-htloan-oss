import XLSX from 'xlsx';

// 获取导出excel时的workbook实例
export function getWorkbook() {
  return new Workbook();
}

function Workbook() {
  if (!(this instanceof Workbook)) {
    return new Workbook();
  }
  this.SheetNames = [];
  this.Sheets = {};
}
// 获取sheet
Workbook.prototype.getSheet = function(data, name) {
  var ws = {};
  var range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  };
  for (var R = 0; R !== data.length; ++R) {
    for (var C = 0; C !== data[R].length; ++C) {
      if (range.s.r > R) {
        range.s.r = R;
      }
      if (range.s.c > C) {
        range.s.c = C;
      }
      if (range.e.r < R) {
        range.e.r = R;
      }
      if (range.e.c < C) {
        range.e.c = C;
      }
      var cell = {
        v: data[R][C]
      };
      if (cell.v == null) {
        continue;
      }
      var cellRef = XLSX.utils.encode_cell({
        c: C,
        r: R
      });
      if (typeof cell.v === 'number') {
        cell.t = 'n';
      } else if (typeof cell.v === 'boolean') {
        cell.t = 'b';
      } else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      } else {
        cell.t = 's';
      }
      ws[cellRef] = cell;
    }
  }
  if (range.s.c < 10000000) {
    ws['!ref'] = XLSX.utils.encode_range(range);
  }
  this.SheetNames.push(name);
  this.Sheets[name] = ws;
  return ws;
};
// 下载excel
Workbook.prototype.downloadXls = function(name) {
  let tmpDown = new Blob([s2ab(XLSX.write(this, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  }))], {
    type: ''
  });
  _saveAs(tmpDown, name + '.xlsx');
};

// 读取excel文件
export function readXls(file) {
  return new Promise((resolve, reject) => {
    try {
      if (!file) {
        reject('未选择文件');
      } else {
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, {
            type: rABS ? 'binary' : 'array'
          });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          let data = XLSX.utils.sheet_to_json(ws, { header: 1 });
          resolve(data);
        };
        if (rABS) {
          reader.readAsBinaryString(file);
        } else {
          reader.readAsArrayBuffer(file);
        }
      }
    } catch(e) {
      reject('文件解析失败，请检查文件是否是excel');
    }
  });
}

function s2ab(s) {
  if (typeof ArrayBuffer !== 'undefined') {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  } else {
    let buf = new Array(s.length);
    for (let i = 0; i !== s.length; ++i) {
      buf[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }
}
// 处理日期格式
function datenum(v, date1904) {
  if (date1904) {
    v += 1462;
  }
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}
// 下载excel
function _saveAs(obj, fileName) {
  var tmpa = document.createElement('a');
  tmpa.download = fileName || '下载';
  tmpa.href = URL.createObjectURL(obj);
  tmpa.click();
  setTimeout(function() {
    URL.revokeObjectURL(obj);
  }, 100);
}

export function exportExcel(headers, data, fileName = '请假记录表.xlsx') {
  const _headers = headers
      .map((item, i) => Object.assign({}, { key: item.key, title: item.title, position: String.fromCharCode(65 + i) + 1 }))
      .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { key: next.key, v: next.title } }), {});

  const _data = data
      .map((item, i) => headers.map((key, j) => Object.assign({}, { content: item[key.key], position: String.fromCharCode(65 + j) + (i + 2) })))
      // 对刚才的结果进行降维处理（二维数组变成一维数组）
      .reduce((prev, next) => prev.concat(next))
      // 转换成 worksheet 需要的结构
      .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.content } }), {});

  // 合并 headers 和 data
  const output = Object.assign({}, _headers, _data);
  // 获取所有单元格的位置
  const outputPos = Object.keys(output);
  // 计算出范围 ,["A1",..., "H2"]
  const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;

  // 构建 workbook 对象
  const wb = {
    SheetNames: ['mySheet'],
    Sheets: {
      mySheet: Object.assign(
          {},
          output,
          {
            '!ref': ref,
            '!cols': [{ wpx: 45 }, { wpx: 100 }, { wpx: 200 }, { wpx: 80 }, { wpx: 150 }, { wpx: 100 }, { wpx: 300 }, { wpx: 300 }]
          }
      )
    }
  };
  // 导出 Excel
  XLSX.writeFile(wb, fileName);
}
