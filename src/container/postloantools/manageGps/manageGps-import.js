import React from 'react';
import {
    showWarnMsg,
    showSucMsg
} from 'common/js/util';
import { readXls } from 'common/js/xlsx-util';
import { Form, Select, Upload, Button, Icon, Table } from 'antd';
import fetch from 'common/js/fetch';
import { tailFormItemLayout } from 'common/js/config';

const {Item: FormItem} = Form;

@Form.create()
class ContractImport extends React.Component {
    constructor(props) {
        super(props);
        // gps
        let gpscols = [{
            title: 'gps编号',
            dataIndex: 'gpsDevNo'
        }, {
            title: ' gps类型',
            dataIndex: 'gpsType'
        }];
        this.state = {
            data: [],
            gpscols: gpscols,
            loanBankData: []
        };
    }

    componentDidMount() {}

    handleChange = (file) => {
        readXls(file).then(XLSXData => {
            console.log(XLSXData);
            for (let i = XLSXData.length; i > 0;) {
                if (XLSXData[--i].length) {
                    break;
                } else {
                    XLSXData.splice(i, 1);
                }
            }
            let data = [];
            delete XLSXData[0];
            XLSXData.forEach((item, i) => {
                data.push({
                    gpsDevNo: item[0],
                    gpsType: item[1]
                });
            });
            this.setState({
                data: data
            });
        }).catch(msg => showWarnMsg(msg));
    }

    // 确认导入
    handleImprot = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            let param = {};
            param.gpsList = this.state.data;
            param.gpsList.map(v => {
                v.gpsType = v.gpsType === '有线' ? 1 : 0;
            });
            fetch(632701, param).then(() => {
                showSucMsg('导入成功');
                setTimeout(() => {
                    this.props.history.go(-1);
                }, 1000);
            }).catch(this.props.cancelFetching);
        });
    }

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
                <FormItem label='gps清单' >
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload"/>选择文件
                        </Button>
                    </Upload>
                </FormItem>
                <div className="table-wrapper">
                {
                    <Table bordered rowKey={record => record['id']} dataSource={this.state.data} columns={this.state.gpscols} />
                }
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

export default ContractImport;
