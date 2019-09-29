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
} from '@redux/postloantools/importContract-import';
import { showSucMsg, tempString, moneyFormat, getUserId } from 'common/js/util';
import { listWrapper } from 'common/js/build-list';
import XLSX from 'xlsx';
import { Form, Select, Upload, Button, Icon, Table } from 'antd';
import fetch from 'common/js/fetch';
import { tailFormItemLayout } from 'common/js/config';

const { Item: FormItem } = Form;
const { Option } = Select;

@listWrapper(
    state => ({
        ...state.postloantoolsImportContractImport,
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

class importContractImport extends React.Component {
    constructor(props) {
        super(props);
        let cols = [{
            title: '客户姓名',
            dataIndex: 'customerName'
        }, {
            title: '贷款编号',
            dataIndex: 'loanCode'
        }, {
            title: '身份证号',
            dataIndex: 'idNo'
        }, {
            title: '车贷卡号',
            dataIndex: 'loanCardNumber'
        }, {
            title: '贷款金额（万元）',
            dataIndex: 'loanAmount'
        }, {
            title: '费率(%)',
            dataIndex: 'rate'
        }, {
            title: '期数',
            dataIndex: 'periods'
        }, {
            title: '放款日期',
            dataIndex: 'fkDatetime',
            type: 'date'
        }];
        this.state = {
            data: [],
            cols: cols,
            fileList: []
        };
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
                if (item.length) {
                    data.push({
                        code: i,
                        customerName: item[0],
                        loanCode: item[1],
                        idNo: item[2],
                        loanCardNumber: item[3],
                        loanAmount: item[4],
                        rate: item[5] / 100,
                        periods: item[6],
                        fkDatetime: item[7]
                    });
                }
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
        this.props.form.validateFieldsAndScroll((err) => {
            if (err) {
                return;
            }
            let param = {};
            param.bankContractInfoList = this.state.data.map(item => ({
                ...item,
                loanAmount: item.loanAmount ? (item.loanAmount * 10000000).toFixed(0) : 0
            }));
            param.operator = getUserId();
            this.props.doFetching();
            fetch(632230, param).then(() => {
                showSucMsg('导入成功');
                this.props.cancelFetching();
                setTimeout(() => {
                    this.props.history.go(-1);
                }, 1000);
            }).catch(this.props.cancelFetching);
        });
    };

    render() {
        const _this = this;
        const props = {
            name: 'file',
            headers: {
                authorization: 'authorization-text'
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    _this.setState({ fileList: [info.file] });
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
                <FormItem label='银行合同信息模版'>
                    <div className="readonly-text"><a href="/download/qcfq.xls" download="银行合同信息模版.xls">下载</a></div>
                </FormItem>
                <FormItem label='银行合同信息'>
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

export default importContractImport;
