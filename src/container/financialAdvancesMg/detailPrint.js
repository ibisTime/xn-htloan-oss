import React from 'react';
import {
    showWarnMsg,
    showSucMsg,
    moneyFormat,
    dateTimeFormat,
    dsctList1,
    findDsct,
    getRoleCode,
    getQueryString,
    numUppercase,
    getNowTime,
    getUserName,
    getUserId
} from 'common/js/util';
import {Button} from 'antd';
import {
    accessSlipDetail
} from '../../api/preLoan.js';
import ReactToPrint from 'react-to-print';
import './printing.css';
import fetch from 'common/js/fetch';

class detailPrint extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.state = {
            accessSlipDetailInfo: {}
        };
    }
    componentDidMount(): void {
        accessSlipDetail(this.code).then(data => {
            const card = data.creditUserList.filter(item => item.loanRole === '1');
            let vehiclePayment1 = data.loanAmount ? data.loanAmount : 0;
            let vehiclePayment2 = data.rebateRate ? data.rebateRate : 0;
            let vehiclePayment3 = data.carFunds3 ? data.carFunds3 : 0;
            let vehiclePayment4 = data.carFunds4 ? data.carFunds4 : 0;
            let vehiclePayment5 = data.carFunds5 ? data.carFunds5 : 0;
            let gpsFee = data.costSettlement ? data.costSettlement.gpsFee : 0;
            let otherFee = data.costSettlement ? data.costSettlement.otherFee : 0;
            this.setState({
                accessSlipDetailInfo: {
                    // 贷款银行
                    loanBankName: data.loanBankName ? data.loanBankName : '',
                    // 贷款人信息
                    creditUserList1: card.length > 0 ? card[0].userName : {},
                    // 贷款总额
                    totalFee: data.loanAmount ? data.loanAmount / 1000 : '',
                    rate: data.bankLoan ? data.bankLoan.bankRate : '',
                    // 服务费
                    fee: data.bankLoan ? data.bankLoan.fee / 1000 : '',
                    // 贷款期数
                    periods: data.bankLoan ? data.bankLoan.periods : '',
                    // 总利率
                    totalRate: data.bankLoan ? (Math.floor(data.bankLoan.totalRate * 10e6) / 10e4).toFixed(4) : '',
                    // 留存
                    Retain: data.bankLoan ? data.bankLoan.rebateRate : '',
                    // 车款
                    vehiclePayment1: data.loanAmount ? data.loanAmount / 1000 : '',
                    vehiclePayment2: data.rebateRate ? data.rebateRate / 1000 : '',
                    vehiclePayment3: data.carFunds3 ? data.carFunds3 / 1000 : '',
                    vehiclePayment4: data.carFunds4 ? data.carFunds4 / 1000 : '',
                    vehiclePayment5: data.carFunds5 ? data.carFunds5 / 1000 : '',
                    // GPS费用
                    gpsFee: data.costSettlement ? data.costSettlement.gpsFee / 1000 : '',
                    // 其他费用
                    otherFee: data.costSettlement ? data.costSettlement.otherFee / 1000 : '',
                    // 支付合计
                    totalPayment: ((parseInt(vehiclePayment1) + parseInt(vehiclePayment2) + parseInt(vehiclePayment4) + parseInt(vehiclePayment5)) - parseInt(gpsFee) - parseInt(otherFee)) / 1000,
                    // 打款日期
                    advanceFundDatetime: data.advance ? data.advance.advanceFundDatetime : '',
                    // 审核意见
                    auditOpinion: data.advance ? data.advance.makeBillNote : '',
                    // 收款单位名称
                    nameOfPayee: data.advance ? (data.advance.advanceOutCard ? data.advance.advanceOutCard.companyName : '') : '',
                    // 收款单位账户,
                    unitAccount: data.advance ? (data.advance.advanceOutCard ? data.advance.advanceOutCard.bankcardNumber : '') : '',
                    // 收款单位开户银行
                    unitBankName: data.advance ? (data.advance.advanceOutCard ? data.advance.advanceOutCard.bankName : '') : '',
                    // 申请人
                    applicant: data.advance ? data.advance.applyUser : '',
                    // 申请日期
                    dateOfApplication: data.advance ? data.advance.applyDatetime : '',
                    // 申请部门
                    applicationDepartment: data.advance === undefined ? '' : data.advance.applyDepartment
                }
            });
        });
    }
    // 返回
    goBack = () => {
        this.props.history.go(-1);
    }
    // 上传打印日期
    printDate = () => {
        fetch(632555, {code: this.code, operator: getUserId()}).then(data => {
            console.log(data);
        });
    }
    render() {
        const {accessSlipDetailInfo} = this.state;
        return (
            <div style={{background: '#fff'}}>
                <div ref={(el) => this.refs = el}>
                    <h1 style={{textAlign: 'center', fontSize: '24px'}}>垫资详情</h1>
                    <div style={{width: '100%', textAlign: 'left', fontSize: '18px', fontWeight: '600'}}>业务编号:{this.code}</div>
                    <table className='table-style'>
                        <tr>
                            <td>贷款银行:</td>
                            <td>{accessSlipDetailInfo.loanBankName}</td>
                            <td colspan="2"></td>
                            <td>客户姓名:</td>
                            <td>{accessSlipDetailInfo.creditUserList1}</td>
                        </tr>
                        <tr>
                            <td>贷款金额:</td>
                            <td>{accessSlipDetailInfo.totalFee}</td>
                            <td colSpan="2"></td>
                            <td>利率:</td>
                            <td>{accessSlipDetailInfo.rate}</td>
                        </tr>
                        <tr>
                            <td>服务费:</td>
                            <td>{accessSlipDetailInfo.fee}</td>
                            <td colSpan="2"></td>
                            <td>期数:</td>
                            <td>{accessSlipDetailInfo.periods} 期</td>
                        </tr>
                        <tr>
                            <td>总利率:</td>
                            <td>{accessSlipDetailInfo.totalRate}</td>
                            <td colSpan="2"></td>
                            <td>留存:</td>
                            <td>{accessSlipDetailInfo.Retain}</td>
                        </tr>
                        <tr>
                            <td>支出项:</td>
                            <td></td>
                            <td colSpan="2"></td>
                            <td>收入项:</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>车款1:</td>
                            <td>{accessSlipDetailInfo.vehiclePayment1}</td>
                            <td colSpan="2"></td>
                            <td>GPS收费:</td>
                            <td>{accessSlipDetailInfo.gpsFee}</td>
                        </tr>
                        <tr>
                            <td>车款2:</td>
                            <td>{accessSlipDetailInfo.vehiclePayment2}</td>
                            <td colSpan="2"></td>
                            <td>其他费用:</td>
                            <td>{accessSlipDetailInfo.otherFee}</td>
                        </tr>
                        <tr>
                            <td>车款3:</td>
                            <td>{accessSlipDetailInfo.vehiclePayment3}</td>
                            <td colSpan="2"></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>车款4:</td>
                            <td>{accessSlipDetailInfo.vehiclePayment4}</td>
                            <td colSpan="2"></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>车款5:</td>
                            <td>{accessSlipDetailInfo.vehiclePayment5}</td>
                            <td colSpan="2"></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>支付合计:</td>
                            <td>{accessSlipDetailInfo.totalPayment}</td>
                            <td colSpan="2"></td>
                            <td>垫资日期:</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>审批意见:</td>
                            <td colspan="5">
                                {accessSlipDetailInfo.auditOpinion}
                            </td>
                        </tr>
                        <tr>
                            <td>收款单位名称:</td>
                            <td>{accessSlipDetailInfo.nameOfPayee}</td>
                            <td>账号:</td>
                            <td>{accessSlipDetailInfo.unitAccount}</td>
                            <td>开户银行:</td>
                            <td>{accessSlipDetailInfo.unitBankName}</td>
                        </tr>
                        <tr>
                            <td>申请人:</td>
                            <td>{accessSlipDetailInfo.applicant}</td>
                            <td>申请日期:</td>
                            <td>{dateTimeFormat(accessSlipDetailInfo.dateOfApplication)}</td>
                            <td>申请部门:</td>
                            <td>{accessSlipDetailInfo.applicationDepartment}</td>
                        </tr>
                    </table>
                </div>
                <div onClick={this.printDate}><ReactToPrint trigger={() => <a href='#' style={{float: 'right', marginRight: '10px'}}><Button type='primary'>打印</Button></a>} content={() => this.refs}></ReactToPrint></div>
                <Button onClick={this.goBack} style={{float: 'right', marginRight: '60px'}}>返回</Button>
            </div>
        );
    }
}

export default detailPrint;
