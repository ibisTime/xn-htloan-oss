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
    examineOne
} from '../../api/preLoan.js';
import './applicationForPayment.css';

const {Option} = Select;
class applicationForPayment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baseInfo: {},
            carBuyingListArrs: [],
            accessSlipStatusArr: [],
            bankListArr: [],
            bankCode: '',
            bankObject: {},
            rmkText: '',
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
                    dvalue: data.list[i].bankName
                });
            }
            this.setState({
                bankListArr: arr
            });
        });
    }
    iptChange = (e) => {
        this.setState({
            rmkText: e.target.value
        });
    }
    // 不通过
    notAdopt = () => {
        const {rmkText} = this.state;
        if(rmkText === '' || rmkText === undefined) {
            showWarnMsg('请填写审核信息!');
        }else {
            let params = {
                code: this.code,
                approveResult: 0,
                approveNote: rmkText
            };
            examineOne(params).then(data => {
                showSucMsg('操作成功!');
                setTimeout(() => {
                    this.props.history.go(-1);
                }, 1000);
            });
        }
    }
    // 通过
    adopt = () => {
        const {rmkText} = this.state;
        if(rmkText === '' || rmkText === undefined) {
            showWarnMsg('请填写审核信息!');
        }else {
            let params = {
                code: this.code,
                approveResult: 1,
                approveNote: rmkText
            };
            examineOne(params).then(data => {
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
    // 返回
    goBack = () => {
        this.props.history.go(-1);
    }
    showDetail = () => {
        this.props.history.push(`/preLoan/Access/detail?code=${this.code}`);
    }
    render() {
        const {carBuyingListArrs, baseInfo, accessSlipStatusArr, rmkText, collectBankcard} = this.state;
        return (
            <div className="afp-body">
                <span className="afp-body-tag">业务基本信息</span>
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
                        <span className="afp-body-title">审核意见：</span>
                        <textarea value={rmkText} ref={input => this.inputRmk = input} onChange={(e) => { this.iptChange(e); }} className="afp-body-textarea"></textarea>
                    </Col>
                </Row>
                <div className="afp-body-btn-group">
                    <span className="afp-body-btn-gray" onClick={this.goBack}>返回</span>
                    <span className="afp-body-btn-gray" style={{marginLeft: '40px'}} onClick={this.notAdopt}>不通过</span>
                    <span className="afp-body-btn-blue" style={{marginLeft: '40px'}} onClick={this.adopt}>通过</span>
                </div>
            </div>
        );
    }
}

export default applicationForPayment;
