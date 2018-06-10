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
} from '@redux/postloantools/import';
import {
    showWarnMsg,
    showSucMsg
} from 'common/js/util';
import {
    listWrapper
} from 'common/js/build-list';
import {
    lowerFrame,
    onShelf,
    sendMsg
} from 'api/biz';
import XLSX from 'xlsx';
import { Button } from 'antd';

@listWrapper(
    state => ({
        ...state.postloantoolsImportImport,
        parentCode: state.menu.subMenuCode
    }), {
        setTableData,
        clearSearchParam,
        doFetching,
        setBtnList,
        cancelFetching,
        setPagination,
        setSearchParam,
        setSearchData
    }
)

class importImport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            cols: []
        };
    }
    makeCols = (refstr) => {
        var o = [];
        var range = XLSX.utils.decode_range(refstr);
        for(var i = 0; i <= range.e.c; ++i) {
            o.push({ name: XLSX.utils.encode_col(i), key: i });
        }
        console.log(o);
        return o;
    }

    handleChange = (files) => {
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
            this.setState({ data: data, cols: this.makeCols(ws['!ref']) });
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

export default importImport;
