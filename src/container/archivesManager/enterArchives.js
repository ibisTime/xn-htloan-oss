import React from 'react';
import {
    showWarnMsg,
    showSucMsg,
    getQueryString,
    findDsct,
    dsctList1,
    getNowTime,
    getUserId
} from 'common/js/util';
import {Row, Col, Select, DatePicker, Icon, Modal, Upload} from 'antd';
import { Link } from 'react-router-dom';
import {
    accessSlipStatus,
    accessSlipDetail,
    carBuyingList,
    accountBlankList,
    sendEnterArchives,
    archivesPath,
    fileCtList,
    executorList,
    getQiNiu
} from '../../api/preLoan.js';
import './../financialAdvance/applicationForPayment.css';
import fetch from 'common/js/fetch';
import moment from 'moment';
import {UPLOAD_URL} from '../../common/js/config';
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
const {Option} = Select;
class enterArchives extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.state = {
            fileList: [],
            previewVisible: false,
            previewImage: '',
            fileList2: [],
            previewVisible2: false,
            previewImage2: '',
            fileList3: [],
            previewVisible3: false,
            previewImage3: '',
            fileList4: [],
            previewVisible4: false,
            previewImage4: '',
            columns: [
                {
                    title: '文件内容',
                    dataIndex: 'content',
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
            insuranceArr: [],
            information: {
                key: '',
                content: '',
                contentName: '',
                count: '',
                savePp: '',
                getUserCode: '',
                time: '',
                rmk: ''
            },
            visible: false,
            visibleChange: false,
            iptInfoArr: {
                code: '',
                path: ''
            },
            archivesPathArr: [],
            loanBankCode: '',
            executorListArr: [],
            getUserNames: '',
            fileName: '',
            fileCtListArr: [],
            regDate: '',
            regDate2: '',
            insuranceCode: ''
        };
        this.count = 1;
        this.selectedRowKeys = [];
        this.selectedRowKeysArr = [];
        this.selectedRows = [];
        this.rowSelection = {
            type: 'radio',
            onChange: (selectedRowKeys, selectedRows) => {
                this.selectedRowKeysArr = selectedRowKeys;
                this.selectedRows = selectedRows;
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',
                name: record.name
            })
        };
        this.arr = [];
        this.codeListArr = [];
        this.children = [];
        this.setLs = [];
        this.codeArr = [];
    }
    componentDidMount(): void {
        const {iptInfoArr} = this.state;
        fetch('632592').then(data => {
            iptInfoArr['code'] = data;
            this.setState({
                iptInfoArr
            });
        });
        getQiNiu().then(data => {
            this.setState({
                uploadToken: data.uploadToken
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
                },
                collectBankcard: data.advance ? data.advance.collectBankcard : ''
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
        fetch(632045, {start: 1, limit: 1000}).then(data => {
            let arr = [];
            for(let i = 0; i < data.list.length; i++) {
                arr.push({
                    dkey: data.list[i].code,
                    dvalue: data.list[i].name
                });
            }
            this.setState({
                insuranceArr: arr
            });
        });
        fileCtList(1, 1000).then(data => {
            let arr = [];
            let countArr = [];
            for(let i = 0; i < data.list.length; i++) {
                arr.push({
                    dkey: data.list[i].id,
                    dvalue: `${data.list[i].vname} - ${data.list[i].number}份`
                });
                countArr.push({
                    dkey: data.list[i].id,
                    dvalue: data.list[i].number
                });
            }
            this.setState({
                fileCtListArr: arr,
                countArr: countArr
            });
            for(let j = 0; j < arr.length; j++) {
                this.children.push(<Option key={arr[j].dkey}>{arr[j].dvalue}</Option>);
            }
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
            if(this.selectedRowKeysArr.length < 0) {
                showWarnMsg('请选择记录');
            }else {
                this.setState({
                    visibleChange: true
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
                    content: '',
                    contentName: '',
                    count: '',
                    savePp: '',
                    getUserCode: '',
                    time: '',
                    rmk: ''
                },
                getUserNames: '',
                fileName: ''
            });
        }else if(type === 'dataChange') {
            this.setState({
                visibleChange: false,
                information: {
                    key: '',
                    content: '',
                    contentName: '',
                    count: '',
                    savePp: '',
                    getUserCode: '',
                    time: '',
                    rmk: ''
                },
                getUserNames: '',
                fileName: ''
            });
        }
    };
    // missionList修改
    editMission = () => {
        const {regDate} = this.state;
        this.setState({
            information: {
                key: this.selectedRows[0].key,
                content: this.selectedRows[0].contentCode,
                contentName: this.selectedRows[0].content,
                count: this.selectedRows[0].fileCount,
                savePp: this.selectedRows[0].operator,
                getUserCode: this.selectedRows[0].getUserCode,
                time: this.selectedRows[0].depositDateTime,
                rmk: this.selectedRows[0].remark
            },
            getUserNames: this.selectedRows[0].operator,
            fileName: this.selectedRows[0].content
        });
    }
    // 确认
    adopt = () => {
        const {iptInfoArr, loanBankCode, regDate, regDate2, fileList, fileList2, fileList3, fileList4, insuranceCode} = this.state;
        // 垫资合同
        let picHash = '';
        if(fileList) {
            if (fileList[0] === undefined || fileList[0] === '') {
                picHash = '';
            } else {
                let len = fileList.length;
                fileList.forEach((item, index) => {
                    if(index === len - 1) {
                        picHash += item.response.hash;
                    }else {
                        picHash += item.response.hash + '||';
                    }
                });
            }
        }
        // 担保和反担保合同
        let picHash2 = '';
        if(fileList2) {
            if (fileList2[0] === undefined || fileList2[0] === '') {
                picHash2 = '';
            } else {
                let len = fileList2.length;
                fileList2.forEach((item, index) => {
                    if(index === len - 1) {
                        picHash2 += item.response.hash;
                    }else {
                        picHash2 += item.response.hash + '||';
                    }
                });
            }
        }
        // 抵押合同
        let picHash3 = '';
        if(fileList3) {
            if (fileList3[0] === undefined || fileList3[0] === '') {
                picHash3 = '';
            } else {
                let len = fileList3.length;
                fileList3.forEach((item, index) => {
                    if(index === len - 1) {
                        picHash3 += item.response.hash;
                    }else {
                        picHash3 += item.response.hash + '||';
                    }
                });
            }
        }
        // 其他
        let picHash4 = '';
        if(fileList4) {
            if (fileList4[0] === undefined || fileList4[0] === '') {
                picHash4 = '';
            } else {
                let len = fileList4.length;
                fileList4.forEach((item, index) => {
                    if(index === len - 1) {
                        picHash4 += item.response.hash;
                    }else {
                        picHash4 += item.response.hash + '||';
                    }
                });
            }
        }
        let params = {
            code: this.code,
            enterCode: iptInfoArr.code,
            enterLocation: loanBankCode,
            operator: getUserId(),
            insuranceCompany: insuranceCode,
            syxDateStart: regDate === '' ? getNowTime() : regDate,
            syxDateEnd: regDate2 === '' ? getNowTime() : regDate2,
            advanceContract: picHash,
            guarantorContract: picHash2,
            pledgeContract: picHash3,
            enterOtherPdf: picHash4
        };
        sendEnterArchives(params).then(data => {
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
            loanBankCode: value
        });
    }
    handleChangeInsurance = (value) => {
        this.setState({
            insuranceCode: value
        });
    }
    showDetail = () => {
        this.props.history.push(`/preLoan/Access/detail?code=${this.code}`);
    }
    onChangeTime = (date, dateString) => {
        this.setState({
            regDate: dateString
        });
    };
    onChangeTime2 = (date, dateString) => {
        this.setState({
            regDate2: dateString
        });
    };
    // 垫资合同
    handleCancelCard = () => this.setState({ previewVisible: false });
    handlePreviewCard = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true
        });
    };
    handleChangeCard = ({ fileList }) => {
        this.setState({
            fileList
        });
    };
    // 担保和反担保
    handleCancelCard2 = () => this.setState({ previewVisible2: false });
    handlePreviewCard2 = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImage2: file.url || file.preview,
            previewVisible2: true
        });
    };
    handleChangeCard2 = ({ fileList }) => {
        this.setState({
            fileList2: fileList
        });
    };
    // 抵押合同
    handleCancelCard3 = () => this.setState({ previewVisible3: false });
    handlePreviewCard3 = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImage3: file.url || file.preview,
            previewVisible3: true
        });
    };
    handleChangeCard3 = ({ fileList }) => {
        this.setState({
            fileList3: fileList
        });
    };
    // 其他
    handleCancelCard4 = () => this.setState({ previewVisible4: false });
    handlePreviewCard4 = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImage4: file.url || file.preview,
            previewVisible4: true
        });
    };
    handleChangeCard4 = ({ fileList }) => {
        this.setState({
            fileList4: fileList
        });
    };
    render() {
        const {insuranceArr, baseInfo, accessSlipStatusArr, iptInfoArr, archivesPathArr, uploadToken, fileList, previewVisible, previewImage, fileList2, previewVisible2, previewImage2, fileList3, previewVisible3, previewImage3, fileList4, previewVisible4, previewImage4} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="afp-body">
                <span className="afp-body-tag">档案入档</span>
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
                <span style={{color: '#1791FF'}}><Link to={`/circulationlog/circulationlogByCode?code=${this.code}`}>审核日志详情</Link></span>
                <div className="afp-body-line"></div>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '160px'}}><span style={{color: 'red'}}>* </span>档案编号：</span>
                        <input type="text" value={iptInfoArr.code} ref={input => this.codeIpt = input} onChange={(e) => { this.iptChange1(e, 'code'); }} className="dealer-user-detail-edit-input" />
                        <div className="clear"></div>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '160px'}}><span style={{color: 'red'}}>* </span>档案存放位置：</span>
                        <Select className="preLoan-body-select" style={{width: '300px'}} onChange={this.handleChangeBank}>
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
                        <span className="afp-body-title" style={{width: '160px'}}><span style={{color: 'red'}}>* </span>保险公司：</span>
                        <Select className="preLoan-body-select" style={{width: '300px'}} onChange={this.handleChangeInsurance}>
                            {
                                insuranceArr.map(data => {
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
                        <span className="afp-body-title" style={{width: '160px'}}><span style={{color: 'red'}}>* </span>商业险开始日期：</span>
                        <DatePicker format={'YYYY-MM-DD'} defaultValue={moment(new Date(), 'YYYY-MM-DD')} style={{width: '220px', float: 'left'}} onChange={this.onChangeTime}/>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '160px'}}><span style={{color: 'red'}}>* </span>商业险结束日期：</span>
                        <DatePicker format={'YYYY-MM-DD'} defaultValue={moment(new Date(), 'YYYY-MM-DD')} style={{width: '220px', float: 'left'}} onChange={this.onChangeTime2}/>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '160px'}}><span style={{color: 'red'}}>* </span>垫资合同：</span>
                        <Upload
                            style={{height: '113px'}}
                            listType="picture-card"
                            data={{token: uploadToken}}
                            fileList={fileList}
                            action={UPLOAD_URL}
                            multiple={true}
                            onPreview={this.handlePreviewCard}
                            onChange={this.handleChangeCard}
                        >
                            {uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancelCard}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '160px'}}><span style={{color: 'red'}}>* </span>担保和反担保合同：</span>
                        <Upload
                            style={{height: '113px'}}
                            listType="picture-card"
                            data={{token: uploadToken}}
                            fileList={fileList2}
                            action={UPLOAD_URL}
                            multiple={true}
                            onPreview={this.handlePreviewCard2}
                            onChange={this.handleChangeCard2}
                        >
                            {uploadButton}
                        </Upload>
                        <Modal visible={previewVisible2} footer={null} onCancel={this.handleCancelCard2}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage2} />
                        </Modal>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '160px'}}><span style={{color: 'red'}}>* </span>抵押合同：</span>
                        <Upload
                            style={{height: '113px'}}
                            listType="picture-card"
                            data={{token: uploadToken}}
                            fileList={fileList3}
                            action={UPLOAD_URL}
                            multiple={true}
                            onPreview={this.handlePreviewCard3}
                            onChange={this.handleChangeCard3}
                        >
                            {uploadButton}
                        </Upload>
                        <Modal visible={previewVisible3} footer={null} onCancel={this.handleCancelCard3}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage3} />
                        </Modal>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '160px'}}><span style={{color: 'red'}}>* </span>其他材料：</span>
                        <Upload
                            style={{height: '113px'}}
                            listType="picture-card"
                            data={{token: uploadToken}}
                            fileList={fileList4}
                            action={UPLOAD_URL}
                            multiple={true}
                            onPreview={this.handlePreviewCard4}
                            onChange={this.handleChangeCard4}
                        >
                            {uploadButton}
                        </Upload>
                        <Modal visible={previewVisible4} footer={null} onCancel={this.handleCancelCard4}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage4} />
                        </Modal>
                    </Col>
                </Row>
                <div className="afp-body-btn-group">
                    <span className="afp-body-btn-gray" onClick={this.goBack} style={{width: '72px'}}>返回</span>
                    <span className="afp-body-btn-blue" onClick={this.adopt} style={{marginLeft: '40px'}}>确认</span>
                </div>
            </div>
        );
    }
}

export default enterArchives;
