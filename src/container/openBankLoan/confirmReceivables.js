import React from 'react';
import {
    showWarnMsg,
    showSucMsg,
    getQueryString,
    findDsct,
    dsctList1,
    getNowTime
} from 'common/js/util';
import {Row, Col, Select, DatePicker} from 'antd';
import {
    accessSlipStatus,
    accessSlipDetail,
    carBuyingList,
    accountBlankList,
    sendBkAmount
} from '../../api/preLoan.js';
import '../financialAdvance/applicationForPayment.css';
import moment from 'moment';

const {Option} = Select;
const { MonthPicker } = DatePicker;
class confirmReceivables extends React.Component {
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
        const {iptArr, regDate} = this.state;
        let arr = {
            code: this.code,
            bankFkDatetime: regDate === '' ? getNowTime() : regDate,
            receiptRemark: iptArr.rationaleNote
        };
        sendBkAmount(arr).then(data => {
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
    onChangeTime = (date, dateString) => {
        if(new Date(dateString).getTime() > new Date().getTime()) {
            showWarnMsg('请选择小于今天的日期');
        }else {
            this.setState({
                regDate: dateString
            });
        }
    };
    showDetail = () => {
        this.props.history.push(`/preLoan/Access/detail?code=${this.code}`);
    }
    render() {
        const {carBuyingListArrs, baseInfo, accessSlipStatusArr, iptArr} = this.state;
        return (
            <div className="afp-body">
                <span className="afp-body-tag">银行放款</span>
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
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span style={{float: 'left'}}><span style={{color: 'red'}}>* </span>放款日期：</span>
                        <DatePicker format={'YYYY-MM-DD HH:mm:ss'} defaultValue={moment(new Date(), 'YYYY-MM-DD HH:mm:ss')} style={{width: '220px', float: 'left', marginLeft: '22px'}} onChange={this.onChangeTime}/>
                        <span style={{color: '#999999', marginTop: '5px', display: 'block'}}>（默认当前时间）</span>
                    </Col>
                    <Col span={12}></Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={1}>备注：</Col>
                    <Col span={23}>
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

export default confirmReceivables;
