import React from 'react';
import {
    showWarnMsg,
    showSucMsg,
    getQueryString,
    findDsct,
    dsctList1
} from 'common/js/util';
import {Row, Col, Select} from 'antd';
import { Link } from 'react-router-dom';
import {
    accessSlipStatus,
    accessSlipDetail,
    carBuyingList,
    accountBlankList,
    sendApplicationForPaymentBack
} from '../../api/preLoan.js';
import './applicationForPayment.css';

const {Option} = Select;
class orderRecall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baseInfo: {},
            carBuyingListArrs: [],
            accessSlipStatusArr: [],
            bankListArr: [],
            bankCode: '',
            bankObject: {},
            collectBankcard: {}
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
                    shopCarGarage: data.carInfo ? data.carInfo.shopCarGarageName : '',
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
                    dvalue: data.list[i].companyName + '-' + data.list[i].bankName
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
        const {bankCode} = this.state;
        if(bankCode === '' || bankCode === undefined) {
            showWarnMsg('银行账户不能为空!');
        }else {
            let arr = {
                code: this.code,
                advanceOutCardCode: bankCode
            };
            sendApplicationForPaymentBack(arr).then(data => {
                if(data.isSuccess) {
                    showSucMsg('操作成功');
                    setTimeout(() => {
                        this.props.history.go(-1);
                    }, 1000);
                }
            });
        }
    }
    // 返回
    goBack = () => {
        this.props.history.go(-1);
    }
    showDetail = () => {
        this.props.history.push(`/preLoan/Access/detail?code=${this.code}`);
    }
    render() {
        const {carBuyingListArrs, baseInfo, accessSlipStatusArr, bankListArr, bankObject, collectBankcard} = this.state;
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
                <span className="afp-body-tag">收款信息</span>
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
                <span style={{color: '#1791FF'}}><Link to={`/circulationlog/circulationlogByCode?code=${this.code}`}>审核日志详情</Link></span>
                <div className="afp-body-line"></div>
                <Row style={{marginTop: '20px'}}>
                    <Col span={20}>
                        <span className="afp-body-title" style={{width: '100px'}}><span style={{color: 'red'}}>* </span>付款账号：</span>
                        <Select className="afp-body-select" onChange={this.handleChange}>
                            {
                                bankListArr.map(item => {
                                    return (
                                        <Option key={item.dkey} value={item.dkey}>{item.dvalue}</Option>
                                    );
                                })
                            }
                        </Select>
                        <span style={{color: 'red', marginTop: '5px', display: 'block'}}></span>
                        <div className="clear"></div>
                    </Col>
                    <Col span={4}></Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>付款账户户名：{bankObject ? bankObject.companyName : ''}</Col>
                    <Col span={12}></Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>付款账户账号：{bankObject ? bankObject.bankcardNumber : ''}</Col>
                    <Col span={12}></Col>
                </Row>
                <div className="afp-body-btn-group">
                    <span className="afp-body-btn-gray" onClick={this.goBack}>返回</span>
                    <span className="afp-body-btn-blue" onClick={this.sendSave} style={{marginLeft: '40px'}}>保存</span>
                </div>
            </div>
        );
    }
}

export default orderRecall;
