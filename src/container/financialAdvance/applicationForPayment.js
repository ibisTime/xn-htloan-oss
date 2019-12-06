import React from 'react';
import {
    showWarnMsg,
    showSucMsg,
    getQueryString,
    findDsct,
    dsctList1
} from 'common/js/util';
import {Row, Col, Select, Table} from 'antd';
import { Link } from 'react-router-dom';
import {
    accessSlipStatus,
    accessSlipDetail,
    carBuyingList,
    accountBlankList,
    sendApplicationForPayment,
    findTeamInfo
} from '../../api/preLoan.js';
import './applicationForPayment.css';
import print from '../../images/print.png';

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
            findTeamInfoObject: {},
            columns: [
                {
                    title: '团队名称',
                    dataIndex: 'teamName',
                    width: '50%',
                    align: 'center'
                },
                {
                    title: '车款2',
                    dataIndex: 'amount',
                    width: '50%',
                    align: 'center'
                }
            ],
            amountList: []
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
            // 返点金额
            let arr = [];
            for(let i = 0; i < 1; i++) {
                arr.push({
                    key: i,
                    teamName: data.teamName,
                    amount: data.repointAmount / 1000
                });
            }
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
                amountList: [...arr]
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
        let arr = {
            code: this.code
        };
        sendApplicationForPayment(arr).then(data => {
            if(data.isSuccess) {
                showSucMsg('操作成功');
                setTimeout(() => {
                    this.props.history.go(-1);
                }, 1000);
            }
        });
    }
    // 返回
    goBack = () => {
        this.props.history.go(-1);
    }
    showDetail = () => {
        this.props.history.push(`/preLoan/Access/detail?code=${this.code}`);
    }
    // 打印
    openPrint = () => {
        this.props.history.push(`/loan/printing?code=${this.code}`);
    }
    render() {
        const {amountList, baseInfo, accessSlipStatusArr, bankListArr, bankObject, findTeamInfoObject} = this.state;
        return (
            <div className="afp-body">
                <span className="afp-body-tag">业务基本信息</span><div onClick={this.openPrint} style={{float: 'right', color: '#1791FF'}}></div>
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
                    <Col span={10}>
                        <span>业务归属：{baseInfo.saleGroup}</span>
                    </Col>
                    <Col span={6}>
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
                        <span className="afp-body-title">业务团队的团队账号：{findTeamInfoObject.accountNo}</span>
                    </Col>
                    <Col span={12}></Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>收款银行名：{findTeamInfoObject.bankName}</Col>
                    <Col span={12}></Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>收款支行名：{findTeamInfoObject.subbranch}</Col>
                    <Col span={12}></Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '120px'}}>返点信息：</span>
                    </Col>
                </Row>
                <Table
                    className="afp-body-table"
                    style={{width: '900px'}}
                    dataSource={amountList}
                    columns={this.state.columns}
                />
                <div className="afp-body-btn-group">
                    <span className="afp-body-btn-gray" onClick={this.goBack}>返回</span>
                    <span className="afp-body-btn-blue" onClick={this.sendSave} style={{marginLeft: '40px'}}>保存</span>
                </div>
            </div>
        );
    }
}

export default applicationForPayment;
