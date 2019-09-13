import React from 'react';
import {
    showWarnMsg,
    showSucMsg,
    getQueryString,
    findDsct,
    dsctList1,
    getNowTime,
    dateTimeFormat
} from 'common/js/util';
import {Row, Col, Select, Table, Modal, DatePicker} from 'antd';
import {
    accessSlipStatus,
    accessSlipDetail,
    carBuyingList,
    accountBlankList,
    sendEnterArchivesCm,
    archivesPath,
    executorList,
    fileCtList
} from '../../api/preLoan.js';
import './../financialAdvance/applicationForPayment.css';
import add from './add.png';
import edit from './edit.png';
import deletes from './delete.png';

const {Option} = Select;
class enterArchives extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.state = {
            columns: [
                {
                    title: '文件内容',
                    dataIndex: 'content',
                    width: '20%',
                    align: 'center'
                },
                {
                    title: '份数',
                    dataIndex: 'fileCount',
                    width: '20%',
                    align: 'center'
                },
                {
                    title: '存放人',
                    dataIndex: 'operator',
                    width: '20%',
                    align: 'center'
                },
                {
                    title: '存放时间',
                    dataIndex: 'depositDateTime',
                    width: '20%',
                    align: 'center'
                },
                {
                    title: '备注',
                    dataIndex: 'remark',
                    width: '20%',
                    align: 'center'
                }
            ],
            baseInfo: {},
            carBuyingListArrs: [],
            accessSlipStatusArr: [],
            bankListArr: [],
            bankCode: '',
            bankObject: {},
            rmkText: '',
            collectBankcard: {},
            isDz: '',
            missionList: [],
            information: {
                content: '',
                contentName: '',
                count: '',
                savePp: '',
                getUserCode: '',
                time: '',
                rmk: ''
            },
            visible: false,
            iptInfoArr: {
                code: '',
                path: ''
            },
            loanBankCode: '',
            archivesPathArr: [],
            executorListArr: [],
            regDate: '',
            fileLists: [],
            fileCtListArr: [],
            getUserNames: '',
            fileName: ''
        };
        this.count = 1;
        this.selectedRowKeys = [];
        this.selectedRowKeysArr = [];
        this.rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.selectedRowKeysArr = selectedRowKeys;
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',
                name: record.name
            })
        };
        this.arr = [];
    }
    componentDidMount(): void {
        // 购车行
        carBuyingList(1, 100).then(data => {
            let arr = [];
            for(let i = 0; i < data.list.length; i++) {
                arr.push({
                    dkey: data.list[i].code,
                    dvalue: data.list[i].fullName
                });
            }
            this.setState({
                carBuyingListArrs: arr
            });
        });
        this.getAccessSlipStatus();
        accessSlipDetail(this.code).then(data => {
            let arr = [];
            for(let i = 0; i < data.fileList.length; i++) {
                arr.push({
                    key: i,
                    content: data.fileList[i].contentName,
                    contentCode: data.fileList[i].content,
                    fileCount: data.fileList[i].fileCount,
                    operator: data.fileList[i].operatorName,
                    getUserCode: data.fileList[i].operator,
                    depositDateTime: dateTimeFormat(data.fileList[i].depositDateTime),
                    remark: data.fileList[i].remark
                });
            }
            this.arr = arr;
            this.setState({
                baseInfo: {
                    code: data.code,
                    customerName: data.customerName,
                    loanBankName: data.loanBankName,
                    loanAmount: data.loanAmount,
                    bizType: data.bizType === '0' ? '新车' : '二手车',
                    shopCarGarage: data.carInfo ? data.carInfo.shopCarGarageName : '',
                    saleGroup: data.saleUserCompanyName + '-' + data.saleUserDepartMentName + '-' + data.saleUserPostName + '-' + data.saleUserName,
                    curNodeCode: data.curNodeCode ? data.curNodeCode : ''
                },
                collectBankcard: data.advance ? data.advance.collectBankcard : '',
                fileLists: data.fileList,
                missionList: [...arr],
                enterLocationCode: data.enterLocation
            });
        });
        accountBlankList(1, 1000, '').then(data => {
            let arr = [];
            for(let i = 0; i < data.list.length; i++) {
                arr.push({
                    dkey: data.list[i].code,
                    dvalue: data.list[i].bankName
                });
            }
            this.setState({
                bankListArr: arr
            });
        });
        archivesPath(1, 10000).then(data => {
            let arr = [];
            for(let i = 0; i < data.list.length; i++) {
                arr.push({
                    dkey: data.list[i].code,
                    dvalue: data.list[i].name
                });
            }
            this.setState({
                archivesPathArr: arr
            });
        });
        executorList(1, 1000).then(data => {
            let arr = [];
            for(let i = 0; i < data.list.length; i++) {
                arr.push({
                    dkey: data.list[i].userId,
                    dvalue: data.list[i].realName ? data.list[i].realName : ''
                });
            }
            this.setState({
                executorListArr: arr
            });
        });
        fileCtList(1, 1000).then(data => {
            console.log('fileCtList', data);
            let arr = [];
            for(let i = 0; i < data.list.length; i++) {
                arr.push({
                    dkey: data.list[i].id,
                    dvalue: data.list[i].vname
                });
            }
            this.setState({
                fileCtListArr: arr
            });
        });
    }
    // 以下是关于对话框的相关
    showModal = (type) => {
        if(type === 'dataEdit') {
            this.setState({
                visible: true
            });
        }else if(type === 'dataDetail') {
            this.setState({
                visibleDetail: true
            });
        }else if(type === 'dataChange') {
            this.setState({
                visibleChange: true
            });
        }
    };
    hideModal = (type) => {
        if(type === 'dataEdit') {
            this.setState({
                visible: false
            });
        }
    };
    iptChange = (e) => {
        this.setState({
            rmkText: e.target.value
        });
    }
    // missionList添加
    addMission = () => {
        const {information, count, regDate} = this.state;
        this.arr.push({
            key: this.count++,
            content: information.contentName,
            contentCode: information.content,
            fileCount: information.count,
            operator: information.savePp,
            getUserCode: information.getUserCode,
            depositDateTime: regDate === '' ? getNowTime() : regDate,
            remark: information.rmk
        });
        this.setState({
            missionList: this.arr
        });
        this.hideModal('dataEdit');
    }
    // missionList修改
    editMission = () => {
    }
    // missionList删除
    deleteMission = () => {

    }
    // 确认
    adopt = () => {
        const {missionList, iptInfoArr, enterLocationCode, regDate} = this.state;
        let arr = [];
        for(let i = 0; i < missionList.length; i++) {
            arr.push({
                content: missionList[i].content,
                fileCount: missionList[i].fileCount,
                depositDateTime: regDate === '' ? getNowTime() : regDate,
                operator: missionList[i].operator.split('-')[0],
                remark: missionList[i].remark
            });
        }
        let params = {
            code: this.code,
            enterLocation: enterLocationCode,
            fileList: arr
        };
        sendEnterArchivesCm(params).then(data => {
            showSucMsg('操作成功!');
            setTimeout(() => {
                this.props.history.go(-1);
            }, 1000);
        });
    }
    // 状态
    getAccessSlipStatus = () => {
        accessSlipStatus().then(data => {
            let arr = dsctList1(data);
            this.setState({
                accessSlipStatusArr: arr
            });
        });
    }
    // 是否垫资
    handleChange = (value) => {
        this.setState({
            isDz: value
        });
    }
    // 返回
    goBack = () => {
        this.props.history.go(-1);
    }
    iupChange = (e, name) => {
        const {information} = this.state;
        information[name] = e.target.value;
        this.setState({
            information
        });
    };
    iptChange1 = (e, name) => {
        const {iptInfoArr} = this.state;
        iptInfoArr[name] = e.target.value;
        this.setState({
            iptInfoArr
        });
    }
    handleChangeBank = (value) => {
        this.setState({
            loanBankCode: value,
            enterLocationCode: value
        });
    }
    showDetail = () => {
        this.props.history.push(`/preLoan/Access/detail?code=${this.code}`);
    }
    // 执行人编号
    handleChangeExecutorListArr = (value, event) => {
        const {information} = this.state;
        information['savePp'] = event.props.children;
        information['getUserCode'] = value;
        this.setState({
            information,
            getUserNames: event.props.children
        });
    }
    handleChangeFile = (value, event) => {
        const {information} = this.state;
        information['contentName'] = event.props.children;
        information['content'] = value;
        this.setState({
            information,
            fileName: event.props.children
        });
    }
    onChangeTime = (date, dateString) => {
        if(new Date(dateString).getTime() > new Date().getTime()) {
            showWarnMsg('请选择小于今天的日期');
        }else {
            this.setState({
                regDate: dateString
            });
        }
    };
    render() {
        const {fileCtListArr, fileName, carBuyingListArrs, baseInfo, accessSlipStatusArr, missionList, information, iptInfoArr, archivesPathArr, executorListArr, enterLocationCode} = this.state;
        return (
            <div className="afp-body">
                <span className="afp-body-tag">档案入档</span>
                <Row className="afp-body-user-detail">
                    <Col span={8}>
                        <span>业务编号：{baseInfo.code}</span>
                        <a target="_blank" style={{color: '#1791FF', marginLeft: '15px'}} href={`/preLoan/Access/detail?code=${this.code}`}>查看详情</a>
                    </Col>
                    <Col span={8}>
                        <span>客户名称：{baseInfo.customerName}</span>
                    </Col>
                    <Col span={8}>
                        <span>贷款银行：{baseInfo.loanBankName}</span>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={8}>
                        <span>贷款金额：{baseInfo.loanAmount / 1000}</span>
                    </Col>
                    <Col span={8}>
                        <span>业务类型：{baseInfo.bizType}</span>
                    </Col>
                    <Col span={8}>
                        <span>汽车经销商：{baseInfo.shopCarGarage}</span>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={8}>
                        <span>业务归属：{baseInfo.saleGroup}</span>
                    </Col>
                    <Col span={8}>
                        <span></span>
                    </Col>
                    <Col span={8}>
                        <span>当前状态：{findDsct(accessSlipStatusArr, baseInfo.curNodeCode)}</span>
                    </Col>
                </Row>
                <div className="afp-body-line"></div>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '120px'}}><span style={{color: 'red'}}>* </span>档案存放位置：</span>
                        <Select className="preLoan-body-select" value={enterLocationCode} style={{width: '300px'}} onChange={this.handleChangeBank}>
                            {
                                archivesPathArr.map(data => {
                                    return (
                                        <Option key={data.dkey} value={data.dkey}>{data.dvalue}</Option>
                                    );
                                })
                            }
                        </Select>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '120px'}}><span style={{color: 'red'}}>* </span>本次存放清单：</span>
                    </Col>
                </Row>
                <Table
                    className="afp-body-table"
                    style={{width: '900px'}}
                    onRow={(record) => {
                        return {
                            onClick: (e) => {
                                console.log(e.currentTarget);
                                e.currentTarget.getElementsByClassName('ant-checkbox-input')[0].click();
                            }
                        };
                    }}
                    dataSource={missionList}
                    rowSelection={this.rowSelection}
                    columns={this.state.columns}
                />
                <Modal
                    visible={this.state.visible}
                    onOk={type => this.hideModal('dataEdit')}
                    onCancel={type => this.hideModal('dataEdit')}
                    footer={null}
                    width={400}
                    style={{ top: 60 }}
                >
                    <div className="dealer-user-detail-edit-dialog-body">
                        <strong className="dealer-user-detail-edit-dialog-title">新增</strong>
                        <Row style={{marginTop: '30px'}}>
                            <Col span={6}>
                                <span><span className="dealer-color-read-must-fill">* </span>文件内容：</span>
                            </Col>
                            <Col span={18}>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '10px'}}>
                            <Col span={6}>
                                <span>
                                    <Select className="preLoan-body-select" style={{width: '300px'}} value={fileName} onChange={this.handleChangeFile}>
                                        {
                                            fileCtListArr.map(data => {
                                                return (
                                                    <Option key={data.dkey} value={data.dkey}>{data.dvalue}</Option>
                                                );
                                            })
                                        }
                                    </Select>
                                </span>
                            </Col>
                            <Col span={18}>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '30px'}}>
                            <Col span={6}>
                                <span><span className="dealer-color-read-must-fill">* </span>份数：</span>
                            </Col>
                            <Col span={18}>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '10px'}}>
                            <Col span={6}>
                                <span>
                                  <input value={information.count} ref={input => this.countIpt = input} onChange={(e) => { this.iupChange(e, 'count'); }} type="text" className="dealer-user-detail-edit-input" />
                                </span>
                            </Col>
                            <Col span={18}>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '30px'}}>
                            <Col span={6}>
                                <span><span className="dealer-color-read-must-fill">* </span>存放人：</span>
                            </Col>
                            <Col span={18}>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '10px'}}>
                            <Col span={6}>
                                <span>
                                    <Select className="afp-body-select" style={{width: '300px'}} onChange={this.handleChangeExecutorListArr}>
                                        {
                                            executorListArr.map(item => {
                                                return (
                                                    <Option key={item.dkey} value={item.dkey}>{item.dvalue}</Option>
                                                );
                                            })
                                        }
                                    </Select>
                                </span>
                            </Col>
                            <Col span={18}>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '30px'}}>
                            <Col span={6}>
                                <span><span className="dealer-color-read-must-fill">* </span>存放时间：</span>
                            </Col>
                            <Col span={18}>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '10px'}}>
                            <Col span={6}>
                                <span>
                                    <DatePicker format={'YYYY-MM-DD HH:mm:ss'} style={{width: '300px', float: 'left'}} onChange={this.onChangeTime}/>
                                </span>
                            </Col>
                            <Col span={18}>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '30px'}}>
                            <Col span={6}>
                                <span>备注：</span>
                            </Col>
                            <Col span={18}>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '10px'}}>
                            <Col span={6}>
                                <span>
                                  <input value={information.rmk} ref={input => this.rmkIpt = input} onChange={(e) => { this.iupChange(e, 'rmk'); }} type="text" className="dealer-user-detail-edit-input" />
                                </span>
                            </Col>
                            <Col span={18}>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={2}></Col>
                            <Col span={20}>
                                <span className="editBtnBack" onClick={type => this.hideModal('dataEdit')}>返回</span>
                                <span className="editDefine" onClick={this.addMission}>保存</span>
                            </Col>
                            <Col span={2}></Col>
                        </Row>
                    </div>
                </Modal>
                <div style={{marginTop: '10px'}}>
                    <img src={add} />
                    <span style={{color: '#29C456'}} onClick={type => this.showModal('dataEdit')}> 新增</span>
                    <img src={edit} style={{marginLeft: '30px'}} />
                    <span style={{color: '#999999'}}> 修改</span>
                    <img src={deletes} style={{marginLeft: '30px'}} />
                    <span style={{color: '#999999'}}> 删除</span>
                </div>
                <div className="afp-body-btn-group">
                    <span className="afp-body-btn-gray" onClick={this.goBack} style={{width: '72px'}}>返回</span>
                    <span className="afp-body-btn-blue" onClick={this.adopt} style={{marginLeft: '40px'}}>确认</span>
                </div>
            </div>
        );
    }
}

export default enterArchives;
