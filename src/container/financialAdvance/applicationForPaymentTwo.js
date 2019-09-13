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
    examineTwo,
    executorList
} from '../../api/preLoan.js';
import './applicationForPayment.css';
import add from './add.png';
import edit from './edit.png';
import deletes from './delete.png';

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
                    title: '任务时效',
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
            collectBankcard: {},
            isDz: '',
            missionList: [],
            information: {
                name: '',
                time: '',
                getUser: ''
            },
            visible: false,
            executorListArr: []
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
                    shopCarGarage: data.carInfo.shopCarGarageName,
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
            console.log('executorListArr', this.state.executorListArr);
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
            name: information.name,
            time: information.time,
            getUser: information.getUser
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
    // 不通过
    notAdopt = () => {
        const {rmkText, isDz, missionList} = this.state;
        let arr = [];
        for(let i = 0; i < missionList.length; i++) {
            arr.push({
                name: missionList[i].name,
                time: missionList[i].time,
                getUser: missionList[i].getUser.split('-')[0]
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
                getUser: missionList[i].getUser.split('-')[0]
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
        information['getUser'] = value + '-' + event.props.children;
        this.setState({
            information
        });
    }
    render() {
        const {carBuyingListArrs, baseInfo, accessSlipStatusArr, rmkText, collectBankcard, missionList, information, executorListArr} = this.state;
        return (
            <div className="afp-body">
                <span className="afp-body-tag">业务基本信息</span>
                <Row className="afp-body-user-detail">
                    <Col span={8}>
                        <span>业务编号：{baseInfo.code}</span>
                        <a target="_blank" style={{color: '#1791FF', marginLeft: '15px'}} href={`/preLoan/Access/detail?code=${this.code}`}>查看详情</a>                    </Col>
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
                        <span>收款账户户名：{collectBankcard.realName}</span>
                    </Col>
                    <Col span={8}>
                        <span>收款账户银行：{collectBankcard.bankName}</span>
                    </Col>
                    <Col span={8}>
                        <span>收款账户账号：{collectBankcard.bankcardNumber}</span>
                    </Col>
                </Row>
                <div className="afp-body-line"></div>
                <Row>
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
                            <Col span={6}>
                                <span><span className="dealer-color-read-must-fill">* </span>任务时效：</span>
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
                                <span><span className="dealer-color-read-must-fill">* </span>执行人：</span>
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
                    <span className="afp-body-btn-gray" onClick={this.notAdopt} style={{marginLeft: '40px'}}>不通过</span>
                    <span className="afp-body-btn-blue" onClick={this.adopt} style={{marginLeft: '40px'}}>通过</span>
                </div>
            </div>
        );
    }
}

export default applicationForPayment;
