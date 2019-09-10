import React from 'react';
import {
    showWarnMsg,
    showSucMsg,
    getQueryString,
    findDsct,
    dsctList1
} from 'common/js/util';
import {Row, Col, Select, Upload, Button, Icon, DatePicker} from 'antd';
import {
    accessSlipStatus,
    accessSlipDetail,
    carBuyingList,
    accountBlankList,
    recall,
    getQiNiu
} from '../../api/preLoan.js';
import {UPLOAD_URL, PIC_PREFIX} from '../../common/js/config.js';
import './applicationForPayment.css';

const {Option} = Select;
const { MonthPicker } = DatePicker;
class orderMemory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baseInfo: {},
            carBuyingListArrs: [],
            accessSlipStatusArr: [],
            bankListArr: [],
            bankCode: '',
            bankObject: {},
            collectBankcard: {},
            fileListJF: [],
            uploadToken: '',
            iptInfoArr: {
                time: '',
                amount: '',
                rmk: ''
            },
            regDate: ''
        };
        this.code = getQueryString('code', this.props.location.search);
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
        getQiNiu().then(data => {
            this.setState({
                uploadToken: data.uploadToken
            });
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
    // 收款账号
    handleChange = (value) => {
        this.setState({
            bankCode: value
        });
        accountBlankList(1, 1000, value).then(data => {
            this.setState({
                bankObject: data.list[0]
            });
        });
    }
    // 提交
    sendSave = () => {
        const {iptInfoArr, fileListJF, regDate} = this.state;
        let picHashJF = '';
        if(fileListJF) {
            if (fileListJF[0] === undefined || fileListJF[0] === '') {
                picHashJF = '';
            } else {
                picHashJF = fileListJF[0].response.hash;
            }
        }
        let arr = {
            code: this.code,
            advanceFundDatetime: regDate,
            advanceFundAmount: iptInfoArr.amount,
            billPdf: picHashJF,
            advanceNote: iptInfoArr.rmk
        };
        recall(arr).then(data => {
            showSucMsg('操作成功!');
            setTimeout(() => {
                this.props.history.go(-1);
            }, 1000);
        });
    }
    // 返回
    goBack = () => {
        this.props.history.go(-1);
    }
    handleChangeUploadJF = info => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-2);
        fileList = fileList.map(file => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });
        this.setState({
            fileListJF: fileList
        });
    };
    iupChange = (e, name) => {
        const {iptInfoArr} = this.state;
        iptInfoArr[name] = e.target.value;
        this.setState({
            iptInfoArr
        });
    };
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
        const {carBuyingListArrs, baseInfo, accessSlipStatusArr, collectBankcard, fileListJF, uploadToken, iptInfoArr} = this.state;
        const propsJF = {
            action: UPLOAD_URL,
            onChange: this.handleChangeUploadJF,
            multiple: true
        };
        return (
            <div className="afp-body">
                <span className="afp-body-tag">业务基本信息</span>
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
                        <span>汽车经销商：{baseInfo.shopCarGarage}</span>
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
                <span className="afp-body-tag">垫资信息</span>
                <Row style={{marginTop: '20px'}}>
                    <Col span={6}>
                        <span>收款账户户名：{collectBankcard.realName}</span>
                    </Col>
                    <Col span={6}>
                        <span>收款账户银行：{collectBankcard.bankName}</span>
                    </Col>
                    <Col span={6}>
                        <span>收款账户账号：{collectBankcard.bankcardNumber}</span>
                    </Col>
                    <Col span={6}></Col>
                </Row>
                <div className="afp-body-line"></div>
                <Row>
                    <Col span={12}>
                        <span className="afp-body-title">垫资日期：</span>
                        <DatePicker format={'YYYY-MM-DD'} style={{width: '220px', float: 'left'}} onChange={this.onChangeTime}/>
                        <div className="clear"></div>
                    </Col>
                    <Col span={12}></Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title">垫资金额：</span>
                        <input type="text" value={iptInfoArr.amount} ref={input => this.amountIpt = input} onChange={(e) => { this.iupChange(e, 'amount'); }} className="afp-body-input" />
                    </Col>
                    <Col span={12}></Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={6}>
                        <span className="afp-body-title">水单：</span>
                        <Upload {...propsJF} data={{token: uploadToken}} fileList={fileListJF}>
                            <Button>
                                <Icon type="upload" /> Upload
                            </Button>
                        </Upload>
                    </Col>
                    <Col span={6}></Col>
                    <Col span={6}></Col>
                    <Col span={6}></Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title">垫资说明：</span>
                        <textarea value={iptInfoArr.rmk} ref={input => this.rmkIpt = input} onChange={(e) => { this.iupChange(e, 'rmk'); }} className="afp-body-textarea"></textarea>
                    </Col>
                </Row>
                <div className="afp-body-btn-group">
                    <span className="afp-body-btn-gray" onClick={this.goBack}>返回</span>
                    <span className="afp-body-btn-blue" onClick={this.sendSave} style={{marginLeft: '40px'}}>提交</span>
                </div>
            </div>
        );
    }
}

export default orderMemory;
