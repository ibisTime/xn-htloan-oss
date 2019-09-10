import React from 'react';
import {
    showWarnMsg,
    showSucMsg,
    getQueryString,
    findDsct,
    dsctList1
} from 'common/js/util';
import {Row, Col, Select, Table, Modal} from 'antd';
import {
    accessSlipStatus,
    accessSlipDetail,
    carBuyingList,
    accountBlankList,
    sendEnterArchivesCm
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
                count: '',
                savePp: '',
                time: '',
                rmk: ''
            },
            visible: false,
            iptInfoArr: {
                code: '',
                path: ''
            }
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
            console.log('accessSlipDetail', data);
            this.setState({
                baseInfo: {
                    code: data.code,
                    customerName: data.customerName,
                    loanBankName: data.loanBankName,
                    loanAmount: data.loanAmount,
                    bizType: data.bizType === '0' ? '新车' : '二手车',
                    shopCarGarage: data.shopCarGarage,
                    saleGroup: data.saleUserCompanyName + '-' + data.saleUserDepartMentName + '-' + data.saleUserPostName + '-' + data.saleUserName,
                    curNodeCode: data.curNodeCode ? data.curNodeCode : ''
                },
                collectBankcard: data.advance.collectBankcard
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
        const {information, count} = this.state;
        this.arr.push({
            key: this.count++,
            content: information.content,
            fileCount: information.count,
            operator: information.savePp,
            depositDateTime: information.time,
            remark: information.rmk
        });
        this.setState({
            missionList: this.arr
        });
    }
    // missionList修改
    editMission = () => {
    }
    // missionList删除
    deleteMission = () => {

    }
    // 确认
    adopt = () => {
        const {missionList, iptInfoArr} = this.state;
        let params = {
            code: this.code,
            enterLocation: iptInfoArr.path,
            fileList: missionList
        };
        sendEnterArchivesCm(params).then(data => {
            showSucMsg('操作成功!');
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
    render() {
        const {carBuyingListArrs, baseInfo, accessSlipStatusArr, missionList, information, iptInfoArr} = this.state;
        return (
            <div className="afp-body">
                <span className="afp-body-tag">档案入档</span>
                <Row className="afp-body-user-detail">
                    <Col span={6}>
                        <span>业务编号：{baseInfo.code}</span>
                    </Col>
                    <Col span={6}>
                        <span>客户名称：{baseInfo.customerName}</span>
                    </Col>
                    <Col span={6}>
                        <span>贷款银行：{baseInfo.loanBankName}</span>
                    </Col>
                    <Col span={6}></Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={6}>
                        <span>贷款金额：{baseInfo.loanAmount}</span>
                    </Col>
                    <Col span={6}>
                        <span>业务类型：{baseInfo.bizType}</span>
                    </Col>
                    <Col span={6}>
                        <span>汽车经销商：{findDsct(carBuyingListArrs, baseInfo.shopCarGarage)}</span>
                    </Col>
                    <Col span={6}></Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={7}>
                        <span>业务归属：{baseInfo.saleGroup}</span>
                    </Col>
                    <Col span={5}>
                        <span></span>
                    </Col>
                    <Col span={6}>
                        <span>当前状态：{findDsct(accessSlipStatusArr, baseInfo.curNodeCode)}</span>
                    </Col>
                    <Col span={6}></Col>
                </Row>
                <div className="afp-body-line"></div>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '100px'}}>档案存放位置：</span>
                        <input type="text" value={iptInfoArr.path} ref={input => this.pathIpt = input} onChange={(e) => { this.iptChange1(e, 'path'); }} className="dealer-user-detail-edit-input" />
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '100px'}}>本次存放清单：</span>
                    </Col>
                </Row>
                <Table
                    className="afp-body-table"
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
                                  <input value={information.content} ref={input => this.contentIpt = input} onChange={(e) => { this.iupChange(e, 'content'); }} type="text" className="dealer-user-detail-edit-input" />
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
                                  <input value={information.savePp} ref={input => this.savePpIpt = input} onChange={(e) => { this.iupChange(e, 'savePp'); }} type="text" className="dealer-user-detail-edit-input" />
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
                                  <input value={information.time} ref={input => this.timeIpt = input} onChange={(e) => { this.iupChange(e, 'time'); }} type="text" className="dealer-user-detail-edit-input" />
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
