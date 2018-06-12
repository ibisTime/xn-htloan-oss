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
    showSucMsg,
    tempString,
    moneyFormat
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
import {Form, Select, Upload, Button, Icon, Table} from 'antd';
import fetch from 'common/js/fetch';
import {tailFormItemLayout} from 'common/js/config';

const {Item: FormItem} = Form;
const {Option} = Select;

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
        let cols = [{
            title: '客户姓名',
            dataIndex: 'realName'
        }, {
            title: '身份证',
            dataIndex: 'idNo'
        }, {
            title: '贷款金额',
            dataIndex: 'loanAmount',
            render: moneyFormat
        }, {
            title: '总期数',
            dataIndex: 'periods'
        }, {
            title: '逾期金额',
            dataIndex: 'overdueAmount',
            render: moneyFormat
        }, {
            title: '放款日期',
            dataIndex: 'fkDatetime',
            type: 'date'
        }];
        this.state = {
            data: [],
            cols: cols,
            fileList: [],
            loanBank: [{
                title: '贷款银行编号',
                field: 'loanBankCode',
                keyName: 'code',
                valueName: '{{bankName.DATA}}-{{subbranch.DATA}}'
            }],
            loanBankData: []
        };
    }

    componentDidMount() {
        this.props.doFetching();
        fetch(632037, {}).then((data) => {
            this.setState({
                loanBankData: data
            });
            this.props.cancelFetching();
        }).catch(this.props.cancelFetching);
    }

    handleChange = (file) => {
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, {type: rABS ? 'binary' : 'array'});
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            let XLSXData = XLSX.utils.sheet_to_json(ws, {header: 1});
            let data = [];
            delete XLSXData[0];
            XLSXData.forEach((item, i) => {
                data.push({
                    code: i,
                    realName: item[0],
                    idNo: item[1],
                    loanAmount: item[2] * 1000,
                    periods: item[3],
                    overdueAmount: item[4] * 1000,
                    fkDatetime: item[5]
                });
            });
            this.setState({data: data});
        };
        if (rABS) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        }
    }

    // 确认导入
    handleImprot = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            let param = {};
            param.loanBankCode = values.loanBankCode;
            param.overdueList = this.state.data;
            this.props.doFetching();
            fetch(632300, param).then(() => {
                showSucMsg('导入成功');
                this.props.cancelFetching();
                setTimeout(() => {
                    this.props.history.go(-1);
                }, 1000);
            }).catch(this.props.cancelFetching);
        });
    }

    getSelectProps = (item) => {
        const props = {
            showSearch: true,
            allowClear: true,
            optionFilterProp: 'children',
            filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
            style: {width: '100%'},
            placeholder: '请选择'
        };
        if (item.onChange) {
            props.onChange = (v) => {
                item.onChange(v, this.props.selectData[item.field] ? this.props.selectData[item.field].find(v1 => v1.code === v) : {}, this.props);
            };
        }
        return props;
    }

    render() {
        const _this = this;
        const {getFieldDecorator} = this.props.form;
        const props = {
            name: 'file',
            headers: {
                authorization: 'authorization-text'
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    _this.setState({ fileList: [info.file] });
                    console.log(info.fileList);
                }
                if (info.file.status === 'done') {
                } else if (info.file.status === 'error') {
                }
            },
            beforeUpload(file) {
                if (!file) {
                    return false;
                }
                _this.handleChange(file);
                return false;
            },
            fileList: _this.state.fileList
        };

        return (
            <Form>
                <FormItem key={this.state.loanBank[0].field}
                          label={this.state.loanBank[0].title}>
                    { getFieldDecorator(this.state.loanBank[0].field, {
                        rules: [{
                            required: true,
                            message: '必填字段'
                        }],
                        initialValue: ''})(
                        <Select {...this.getSelectProps(this.state.loanBank[0])}>
                            {this.state.loanBankData.map(d => (
                            <Option key={d[this.state.loanBank[0].keyName]}
                                    value={d[this.state.loanBank[0].keyName]}>{tempString(this.state.loanBank[0].valueName, d)}</Option>))}
                        </Select>)}
                </FormItem>
                <FormItem label='逾期名单' >
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload"/>选择文件
                        </Button>
                    </Upload>
                </FormItem>
                <div className="table-wrapper">
                    <Table
                        bordered
                        rowKey={record => record['code']}
                        dataSource={this.state.data}
                        columns={this.state.cols}
                        loading={this.props.fetching}
                    />
                </div>
                <FormItem style={{marginTop: 30}} {...tailFormItemLayout}>
                    <Button type="primary" key="importBtn" onClick={() => {
                        this.handleImprot();
                    }}>确认导入</Button>
                    <Button type="primary" key="backBtn" style={{marginLeft: 30}} onClick={() => {
                        this.props.history.go(-1);
                    }}>返回</Button>
                </FormItem>
            </Form>
        );
    }
}

export default importImport;
