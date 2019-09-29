import React from 'react';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/openBankLoan/enterBankInfo';
import {
    showWarnMsg,
    showSucMsg,
    getQueryString,
    findDsct,
    dsctList1
} from 'common/js/util';
import {Row, Col, Select, DatePicker, Input} from 'antd';
import { Link } from 'react-router-dom';
import {
    accessSlipStatus,
    accessSlipDetail,
    carBuyingList,
    accountBlankList,
    enterBankAmountInfo
} from '../../api/preLoan.js';
import { listWrapper } from 'common/js/build-list';
import '../financialAdvance/applicationForPayment.css';

const {Option} = Select;

@listWrapper(
    state => ({
        ...state.openBankLoanEnterBankInfo,
        parentCode: state.menu.subMenuCode,
    }), {
        setTableData,
        clearSearchParam,
        doFetching,
        setBtnList,
        cancelFetching,
        setPagination,
        setSearchParam,
        setSearchData,
    }
)
class enterBankInfo extends React.Component {
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
                rmk: '',
                cpTime: ''
            },
            regDate: '',
            regDate2: '',
            bankcardNumber: '',
            customerName: '',
            idNo: ''
        };
        this.zdList = [];
        this.code = getQueryString('code', this.props.location.search);
    }
    componentDidMount() {
        for(let i = 0; i < 30; i++) {
            this.zdList.push(i);
        }
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
                customerName: data.customerName,
                idNo: data.creditUser ? data.creditUser.idNo : ''
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
        const {iptArr, regDate, regDate2, bankcardNumber} = this.state;
        let arr = {
            code: this.code,
            bankcardNumber,
            repayBankDate: regDate,
            repayBillDate: regDate2,
            bankFkRemark: iptArr.rmk
        };
        enterBankAmountInfo(arr).then(data => {
            showSucMsg('操作成功');
            setTimeout(() => {
                this.props.history.go(-1);
            }, 1000);
        });
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
    rowKeysFn = (selectedRowKeys, selectedRows) => {
        this.setState({
            bankcardNumber: selectedRows[0].loanCardNumber
        });
    };
    handleChangeDay1 = (value) => {
        this.setState({
            regDate: value
        });
    };
    handleChangeDay2 = (value) => {
        this.setState({
            regDate2: value
        });
    };
    showDetail = () => {
        this.props.history.push(`/preLoan/Access/detail?code=${this.code}`);
    };
    changeBankcardNumber = (e) => {
        this.setState({
            bankcardNumber: e.target.value
        });
    };
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'customerName'
        }, {
            title: '贷款编号',
            field: 'loanCode'
        }, {
            title: '身份证号',
            field: 'idNo'
        }, {
            title: '车贷卡号',
            field: 'loanCardNumber'
        }, {
            title: '贷款金额（万元）',
            field: 'loanAmount',
            render(v) {
                return v && v / 10000000;
            }
        }, {
            title: '费率(%)',
            field: 'rate',
            render(v) {
                return v && v * 100;
            }
        }, {
            title: '期数',
            field: 'periods'
        }, {
            title: '放款日期',
            field: 'fkDatetime'
        }];
        const {baseInfo, accessSlipStatusArr, iptArr, bankcardNumber, customerName, idNo} = this.state;
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
                <span style={{color: '#1791FF'}}><Link to={`/circulationlog/circulationlogByCode?code=${this.code}`}>审核日志详情</Link></span>
                <div className="afp-body-line"></div>
                {
                    idNo ? this.props.buildList({
                        fields,
                        pageCode: 632235,
                        searchParams: {
                            customerName,
                            idNo
                        },
                        buttons: [],
                        rowKeysFn: this.rowKeysFn
                    }) : null
                }
                <div className="afp-body-line"></div>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span style={{float: 'left'}}><span style={{color: 'red'}}>* </span>银行还款日：</span>
                        <Select className="preLoan-body-select" style={{width: '200px'}} onChange={this.handleChangeDay1}>
                            {
                                this.zdList.map((item, index) => (
                                    <Option key={`zd_${index}`} value={index + 1}>{index + 1}</Option>
                                ))
                            }
                        </Select>
                    </Col>
                    <Col span={12}></Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span style={{float: 'left'}}><span style={{color: 'red'}}>* </span>账单日：</span>
                        <Select className="preLoan-body-select" style={{width: '200px'}} onChange={this.handleChangeDay2}>
                            {
                                this.zdList.map((item, index) => (
                                    <Option key={`zd_${index}`} value={index + 1}>{index + 1}</Option>
                                ))
                            }
                        </Select>
                    </Col>
                    <Col span={12}></Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span style={{float: 'left'}}><span style={{color: 'red'}}>* </span>卡号：</span>
                        <Input value={bankcardNumber} style={{width: '60%'}} onChange={this.changeBankcardNumber}/>
                    </Col>
                    <Col span={12}></Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={1}>备注：</Col>
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

export default enterBankInfo;
