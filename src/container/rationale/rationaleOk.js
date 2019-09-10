import React from 'react';
import {
    showWarnMsg,
    showSucMsg,
    getQueryString,
    findDsct,
    dsctList1
} from 'common/js/util';
import {Row, Col, Select} from 'antd';
import {
    accessSlipStatus,
    accessSlipDetail,
    carBuyingList,
    accountBlankList,
    sendRationaleOk
} from '../../api/preLoan.js';
import '../financialAdvance/applicationForPayment.css';

const {Option} = Select;
class rationaleOk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baseInfo: {},
            carBuyingListArrs: [],
            accessSlipStatusArr: [],
            bankListArr: [],
            bankCode: '',
            bankObject: {},
            iptArr: {
                time: '',
                rmk: ''
            }
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
                    shopCarGarage: data.shopCarGarage,
                    saleGroup: data.saleUserCompanyName + '-' + data.saleUserDepartMentName + '-' + data.saleUserPostName + '-' + data.saleUserName,
                    curNodeCode: data.curNodeCode ? data.curNodeCode : ''
                }
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
        const {iptArr} = this.state;
        let arr = {
            code: this.code,
            rationaleDatetime: iptArr.time,
            rationaleNote: iptArr.rmk
        };
        sendRationaleOk(arr).then(data => {
            showSucMsg('操作成功');
            setTimeout(() => {
                this.props.history.go(-1);
            }, 1000);
        });
        // if(bankCode === '' || bankCode === undefined) {
        //     showSucMsg('银行账户不能为空!');
        // }else {
        //     let arr = {
        //         code: this.code,
        //         advanceCardCode: bankCode
        //     };
        //
        // }
        // sendApplicationForPayment(arr).then(data => {
        //     if(data.isSuccess) {
        //         showSucMsg('操作成功');
        //         setTimeout(() => {
        //             this.props.history.go(-1);
        //         }, 1000);
        //     }
        // });
    }
    // 返回
    goBack = () => {
        this.props.history.go(-1);
    }
    iupChange = (e, name) => {
        const {iptArr} = this.state;
        iptArr[name] = e.target.value;
        this.setState({
            iptArr
        });
    };
    render() {
        const {carBuyingListArrs, baseInfo, accessSlipStatusArr, iptArr} = this.state;
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
                        <span>汽车经销商：{findDsct(carBuyingListArrs, baseInfo.shopCarGarage)}</span>
                    </Col>
                    <Col span={6}></Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={9}>
                        <span>业务归属：{baseInfo.saleGroup}</span>
                    </Col>
                    <Col span={3}>
                        <span></span>
                    </Col>
                    <Col span={6}>
                        <span>当前状态：{findDsct(accessSlipStatusArr, baseInfo.curNodeCode)}</span>
                    </Col>
                    <Col span={6}></Col>
                </Row>
                <div className="afp-body-line"></div>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>完成时间：<input type="text" value={iptArr.time} ref={input => this.timeIpt = input} onChange={(e) => { this.iupChange(e, 'time'); }} className="dealer-user-detail-edit-input" /><span style={{color: '#999999'}}>（默认当前时间）</span></Col>
                    <Col span={12}></Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={2}>完成说明：</Col>
                    <Col span={22}>
                        <textarea value={iptArr.rmk} ref={input => this.rmkIpt = input} onChange={(e) => { this.iupChange(e, 'rmk'); }} className="afp-body-textarea" />
                    </Col>
                </Row>
                <div className="afp-body-btn-group">
                    <span className="afp-body-btn-gray" onClick={this.goBack}>返回</span>
                    <span className="afp-body-btn-blue" onClick={this.sendSave} style={{marginLeft: '40px'}}>保存</span>
                </div>
            </div>
        );
    }
}

export default rationaleOk;
