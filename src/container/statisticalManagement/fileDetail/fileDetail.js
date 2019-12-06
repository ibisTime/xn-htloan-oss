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
import {Row, Col, Select, Modal, Button} from 'antd';
import {
    accessSlipStatus,
    accessSlipDetail,
    carBuyingList,
    accountBlankList,
    archivesPath,
    executorList,
    fileCtList
} from '../../../api/preLoan.js';
import '../../financialAdvance/applicationForPayment.css';
import {PIC_PREFIX} from '../../../common/js/config';

const {Option} = Select;
class fileDetail extends React.Component {
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
            loanBankCode: '',
            archivesPathArr: [],
            executorListArr: [],
            regDate: '',
            fileLists: [],
            fileCtListArr: [],
            getUserNames: '',
            fileName: '',
            fileCode: '',
            imgSrc: '',
            advanceContract: [],
            guarantorContract: [],
            pledgeContract: [],
            enterOtherPdf: []
        };
        this.count = 1;
        this.selectedRowKeys = [];
        this.selectedRowKeysArr = [];
        this.selectedRows = [];
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
                    content: data.fileList[i].content,
                    contentCode: data.fileList[i].code,
                    fileCount: data.fileList[i].fileCount,
                    operator: data.fileList[i].operator,
                    getUserCode: data.fileList[i].operator,
                    depositDateTime: dateTimeFormat(data.fileList[i].depositDateTime),
                    remark: data.fileList[i].remark
                });
            }
            data.attachments.forEach(pic => {
                if (pic.kname === 'advance_contract') {
                    // 垫资合同
                     this.setState({
                         advanceContract: pic.url.split('||')
                     });
                } else if (pic.kname === 'guarantor_contract') {
                    // 担保和反担保合同
                    this.setState({
                        guarantorContract: pic.url.split('||')
                    });
                } else if (pic.kname === 'pledge_contract') {
                    // 抵押合同
                    this.setState({
                        pledgeContract: pic.url.split('||')
                    });
                } else if (pic.kname === 'enter_other_pdf') {
                    // 其他资料
                    this.setState({
                        enterOtherPdf: pic.url.split('||')
                    });
                }
            });
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
                enterLocationCode: data.enterLocationName,
                fileCode: data.enterCode,
                insuranceCompanyName: data.insuranceCompanyName ? data.insuranceCompanyName : '',
                syxDateStart: data.syxDateStart ? data.syxDateStart : '',
                syxDateEnd: data.syxDateEnd ? data.syxDateEnd : ''
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
        });
    }
    // 以下是关于对话框的相关
    showModal = (pic) => {
        console.log(pic);
        this.setState({
            visible: true,
            imgSrc: pic
        });
    };
    hideModal = () => {
        this.setState({
            visible: false
        });
    };
    // missionList修改
    editMission = () => {
        const {regDate} = this.state;
        console.log(this.selectedRows[0]);
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
    handleChangeBank = (value) => {
        this.setState({
            loanBankCode: value,
            enterLocationCode: value
        });
    }
    showDetail = () => {
        this.props.history.push(`/preLoan/Access/detail?code=${this.code}`);
    }
    handleCancel = e => {
        this.setState({
            visible: false
        });
    };
    handleOk = e => {
        this.setState({
            visible: false
        });
    };
    render() {
        const {imgSrc, missionList, archivesPathArr, enterLocationCode, fileCode, insuranceCompanyName, syxDateStart, syxDateEnd, advanceContract, guarantorContract, pledgeContract, enterOtherPdf} = this.state;
        return (
            <div className="afp-body" style={{background: '#fff'}}>
                <span className="afp-body-tag">档案入档</span>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '120px'}}>档案编号：</span>
                        <span>{fileCode}</span>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '120px'}}>档案存放位置：</span>
                        {enterLocationCode}
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '120px'}}>保险公司：</span>
                        <span>{insuranceCompanyName}</span>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '120px'}}>商业险日期：</span>
                        <span>{dateTimeFormat(syxDateStart)} ~ {dateTimeFormat(syxDateEnd)}</span>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '120px'}}>垫资合同：</span>
                        {
                            advanceContract.length > 0 ? (
                                advanceContract.map((data) => (
                                    <img onClick={value => this.showModal(PIC_PREFIX + data)} style={{width: '100px', height: '100px', marginRight: '10px'}} src={PIC_PREFIX + data} />
                                ))
                            ) : null
                        }
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '150px'}}>担保和反担保合同：</span>
                        {
                            guarantorContract.length > 0 ? (
                                guarantorContract.map((data) => (
                                    <img onClick={value => this.showModal(PIC_PREFIX + data)} style={{width: '100px', height: '100px', marginRight: '10px'}} src={PIC_PREFIX + data} />
                                ))
                            ) : null
                        }
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '120px'}}>抵押合同：</span>
                        {
                            pledgeContract.length > 0 ? (
                                pledgeContract.map((data) => (
                                    <img onClick={value => this.showModal(PIC_PREFIX + data)} style={{width: '100px', height: '100px', marginRight: '10px'}} src={PIC_PREFIX + data} />
                                ))
                            ) : null
                        }
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '120px'}}>其他材料：</span>
                        {
                            enterOtherPdf.length > 0 ? (
                                enterOtherPdf.map((data) => (
                                    <img onClick={value => this.showModal(PIC_PREFIX + data)} style={{width: '100px', height: '100px', marginRight: '10px'}} src={PIC_PREFIX + data} />
                                ))
                            ) : null
                        }
                    </Col>
                </Row>
                <div className="afp-body-btn-group">
                    <Button onClick={this.goBack} style={{marginLeft: '30%'}}>返回</Button>
                </div>
                <Modal
                    title="图片"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <div className="ant-modal-body" style={{width: '200px', height: '400px'}}>
                        <img style={{width: '400px', height: '300px', margin: '0px auto'}} src={imgSrc} />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default fileDetail;
