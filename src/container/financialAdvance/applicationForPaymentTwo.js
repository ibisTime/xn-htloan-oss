import React from 'react';
import {
    showWarnMsg,
    showSucMsg,
    getQueryString,
    findDsct,
    dsctList1
} from 'common/js/util';
import {Row, Col, Select, Table, Modal} from 'antd';
import { Link } from 'react-router-dom';
import {
    accessSlipStatus,
    accessSlipDetail,
    carBuyingList,
    accountBlankList,
    examineTwo,
    executorList,
    findTeamInfo
} from '../../api/preLoan.js';
import './applicationForPayment.css';
import add from './add.png';
import edit from './edit.png';
import deletes from './delete.png';
import print from '../../images/print.png';

const {Option} = Select;
class applicationForPayment extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.state = {
            columns: [
                {
                    title: '任务名称',
                    dataIndex: 'name',
                    width: '40%',
                    align: 'center'
                },
                {
                    title: '执行人',
                    dataIndex: 'getUser',
                    width: '30%',
                    align: 'center'
                },
                {
                    title: '任务时效(h)',
                    dataIndex: 'time',
                    width: '30%',
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
            isDz: '',
            missionList: [],
            information: {
                key: '',
                name: '',
                time: '',
                getUser: '',
                getUserCode: ''
            },
            visible: false,
            visibleEdit: false,
            executorListArr: [],
            getUserNames: '',
            findTeamInfoObject: {}
        };
        this.count = 1;
        this.selectedRows = [];
        this.selectedRowKeys = [];
        this.selectedRowKeysArr = [];
        this.rowSelection = {
            type: 'radio',
            onChange: (selectedRowKeys, selectedRows) => {
                this.selectedRowKeysArr = selectedRowKeys;
                console.log(this.selectedRowKeysArr);
                this.selectedRows = selectedRows;
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
                }
            });
            findTeamInfo(data.teamCode).then(data => {
                // accountNo bankName subbranch
                this.setState({
                    findTeamInfoObject: data
                });
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
            if(this.selectedRowKeysArr.length < 1) {
                showWarnMsg('请选择记录!');
            }else if(this.selectedRowKeysArr.length > 1) {
                showWarnMsg('请选择不大于一条记录!');
            }else {
                this.setState({
                    visibleEdit: true
                });
                this.editMission();
            }
        }
    };
    hideModal = (type) => {
        if(type === 'dataEdit') {
            this.setState({
                visible: false,
                information: {
                    key: '',
                    name: '',
                    time: '',
                    getUser: '',
                    getUserCode: ''
                },
                getUserNames: ''
            });
        }else if(type === 'dataChange') {
            this.setState({
                visibleEdit: false,
                information: {
                    key: '',
                    name: '',
                    time: '',
                    getUser: '',
                    getUserCode: ''
                },
                getUserNames: ''
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
            name: information.name,
            time: information.time,
            getUser: information.getUser,
            getUserCode: information.getUserCode
        });
        this.setState({
            missionList: this.arr
        });
        this.hideModal('dataEdit');
     }
    // missionList修改
    editMission = () => {
        console.log('editMission', this.selectedRowKeysArr);
        console.log('selectedRows', this.selectedRows);
        this.setState({
            information: {
                key: this.selectedRows[0].key,
                name: this.selectedRows[0].name,
                time: this.selectedRows[0].time,
                getUser: this.selectedRows[0].getUser,
                getUserCode: this.selectedRows[0].getUserCode
            },
            getUserNames: this.selectedRows[0].getUser
        });
        this.selectedRows = [];
        this.selectedRowKeys = [];
        this.selectedRowKeysArr = [];
    }
    // 点击修改
    sendEdit = () => {
        if(this.selectedRowKeysArr.length < 0) {
            showWarnMsg('请选择记录');
        }else {
            const {information, missionList} = this.state;
            // 新数据
            let arr = {
                key: information.key,
                name: information.name,
                time: information.time,
                getUser: information.getUser,
                getUserCode: information.getUserCode
            };
            // 源数据
            let missionListArr = missionList;
            for (let i = 0, len = missionListArr.length; i < len; i++) {
                if (missionListArr[i].key === arr.key) {
                    missionListArr[i] = arr;
                }
            }
            this.setState({
                missionList: missionListArr
            });
            this.hideModal('dataChange');
        }
    }
    // missionList删除
    deleteMission = () => {
        if(this.selectedRowKeysArr.length < 0) {
            showWarnMsg('请选择记录');
        }else {
            const {missionList} = this.state;
            let missionListArr = missionList;
            missionListArr.forEach((value, index, array) => {
                if(value.key == this.selectedRows[0].key) {
                    array.splice(value, 1);
                }
            });
            this.setState({
                missionList: missionListArr
            });
            this.selectedRows = [];
            this.selectedRowKeys = [];
            this.selectedRowKeysArr = [];
        }
    }
    // 不通过
    notAdopt = () => {
        const {rmkText, isDz, missionList} = this.state;
        let arr = [];
        for(let i = 0; i < missionList.length; i++) {
            arr.push({
                name: missionList[i].name,
                time: missionList[i].time,
                getUser: missionList[i].getUserCode
            });
        }
        if(isDz === '' || isDz === undefined) {
            showWarnMsg('是否垫资不能为空!');
        }else {
            let params = {
                code: this.code,
                approveResult: 0,
                approveNote: rmkText,
                isContinueAdvance: isDz,
                missionList: arr
            };
            examineTwo(params).then(data => {
                showSucMsg('操作成功!');
                setTimeout(() => {
                    this.props.history.go(-1);
                }, 1000);
            });
        }
    }
    // 通过
    adopt = () => {
        const {rmkText, isDz, missionList} = this.state;
        let arr = [];
        for(let i = 0; i < missionList.length; i++) {
            arr.push({
                name: missionList[i].name,
                time: missionList[i].time,
                getUser: missionList[i].getUserCode
            });
        }
        if(isDz === '' || isDz === undefined) {
            showWarnMsg('是否垫资不能为空!');
        }else {
            let params = {
                code: this.code,
                approveResult: 1,
                approveNote: rmkText,
                isContinueAdvance: isDz,
                missionList: arr
            };
            examineTwo(params).then(data => {
                showSucMsg('操作成功!');
                setTimeout(() => {
                    this.props.history.go(-1);
                }, 1000);
            });
        }
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
    showDetail = () => {
        this.props.history.push(`/preLoan/Access/detail?code=${this.code}`);
    }
    // 执行人编号
    handleChangeExecutorListArr = (value, event) => {
        const {information} = this.state;
        information['getUser'] = event.props.children;
        information['getUserCode'] = value;
        this.setState({
            information,
            getUserNames: event.props.children
        });
    }
    // 打印
    openPrint = () => {
        this.props.history.push(`/loan/printing?code=${this.code}`);
    }
    render() {
        const {carBuyingListArrs, baseInfo, accessSlipStatusArr, rmkText, missionList, information, executorListArr, getUserNames, findTeamInfoObject} = this.state;
        return (
            <div className="afp-body">
                <span className="afp-body-tag">业务基本信息</span><div onClick={this.openPrint} style={{float: 'right', color: '#1791FF'}}><img src={print} style={{width: '20px', height: '20px'}} /><span>去打印</span></div>
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
                <span className="afp-body-tag">垫资信息</span>
                <Row style={{marginTop: '20px'}}>
                    <Col span={8}>
                        <span>业务团队的团队账号：{findTeamInfoObject.accountNo}</span>
                    </Col>
                    <Col span={8}>
                        <span>收款银行名：{findTeamInfoObject.bankName}</span>
                    </Col>
                    <Col span={8}>
                        <span>收款支行名：{findTeamInfoObject.subbranch}</span>
                    </Col>
                </Row>
                <div className="afp-body-line"></div>
                <span style={{color: '#1791FF'}}><Link to={`/circulationlog/circulationlogByCode?code=${this.code}`}>审核日志详情</Link></span>
                <div className="afp-body-line"></div>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '120px'}}><span style={{color: 'red'}}>* </span>是否继续垫资：</span>
                        <Select className="afp-body-select" onChange={this.handleChange}>
                            <Option value="0">否</Option>
                            <Option value="1">是</Option>
                        </Select>
                        <div className="clear"></div>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={18}>
                        <span className="afp-body-title" style={{width: '120px', textIndent: '12px'}}>审核意见：</span>
                        <textarea value={rmkText} ref={input => this.inputRmk = input} onChange={(e) => { this.iptChange(e); }} className="afp-body-textarea"></textarea>
                    </Col>
                </Row>
                <Table
                    className="afp-body-table"
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
                                <span><span className="dealer-color-read-must-fill">* </span>任务名称：</span>
                            </Col>
                            <Col span={18}>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '10px'}}>
                            <Col span={6}>
                                <span>
                                  <input value={information.name} ref={input => this.nameIpt = input} onChange={(e) => { this.iupChange(e, 'name'); }} type="text" className="dealer-user-detail-edit-input" />
                                </span>
                            </Col>
                            <Col span={18}>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '30px'}}>
                            <Col span={10}>
                                <span><span className="dealer-color-read-must-fill" style={{width: '120px'}}>* </span>任务时效(h)：</span>
                            </Col>
                            <Col span={14}>
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
                                <span><span className="dealer-color-read-must-fill">* </span>执行人：</span>
                            </Col>
                            <Col span={18}>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '10px'}}>
                            <Col span={6}>
                                <span>
                                    <Select className="afp-body-select" style={{width: '300px'}} value={getUserNames} onChange={this.handleChangeExecutorListArr}>
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
                {/* 修改 */}
                <Modal
                    visible={this.state.visibleEdit}
                    onOk={type => this.hideModal('dataChange')}
                    onCancel={type => this.hideModal('dataChange')}
                    footer={null}
                    width={400}
                    style={{ top: 60 }}
                >
                    <div className="dealer-user-detail-edit-dialog-body">
                        <strong className="dealer-user-detail-edit-dialog-title">修改</strong>
                        <Row style={{marginTop: '30px'}}>
                            <Col span={6}>
                                <span><span className="dealer-color-read-must-fill">* </span>任务名称：</span>
                            </Col>
                            <Col span={18}>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '10px'}}>
                            <Col span={6}>
                                <span>
                                  <input value={information.name} ref={input => this.nameIpt = input} onChange={(e) => { this.iupChange(e, 'name'); }} type="text" className="dealer-user-detail-edit-input" />
                                </span>
                            </Col>
                            <Col span={18}>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '30px'}}>
                            <Col span={10}>
                                <span><span className="dealer-color-read-must-fill">* </span>任务时效(h)：</span>
                            </Col>
                            <Col span={14}>
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
                                <span><span className="dealer-color-read-must-fill">* </span>执行人：</span>
                            </Col>
                            <Col span={18}>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '10px'}}>
                            <Col span={6}>
                                <span>
                                    <Select className="afp-body-select" style={{width: '300px'}} value={getUserNames} onChange={this.handleChangeExecutorListArr}>
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
                        <Row>
                            <Col span={2}></Col>
                            <Col span={20}>
                                <span className="editBtnBack" onClick={type => this.hideModal('dataChange')}>返回</span>
                                <span className="editDefine" onClick={this.sendEdit}>修改</span>
                            </Col>
                            <Col span={2}></Col>
                        </Row>
                    </div>
                </Modal>
                <div style={{marginTop: '10px'}}>
                    <img src={add} />
                    <span style={{color: '#29C456'}} onClick={type => this.showModal('dataEdit')}> 新增</span>
                    <img src={edit} style={{marginLeft: '30px'}} />
                    <span style={{color: '#999999'}} onClick={type => this.showModal('dataChange')}> 修改</span>
                    <img src={deletes} style={{marginLeft: '30px'}} />
                    <span style={{color: '#999999'}} onClick={this.deleteMission}> 删除</span>
                </div>
                <div className="afp-body-btn-group">
                    <span className="afp-body-btn-gray" onClick={this.goBack} style={{width: '72px'}}>返回</span>
                    <span className="afp-body-btn-gray" onClick={this.notAdopt} style={{marginLeft: '40px'}}>不通过</span>
                    <span className="afp-body-btn-blue" onClick={this.adopt} style={{marginLeft: '40px'}}>通过</span>
                </div>
            </div>
        );
    }
}

export default applicationForPayment;
