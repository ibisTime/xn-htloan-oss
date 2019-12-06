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
    getUserId,
    formatDate
} from 'common/js/util';
import {Button} from 'antd';
import {
    accessSlipDetail
} from '../../api/preLoan.js';
import ReactToPrint from 'react-to-print';
import './printing.css';
import fetch from 'common/js/fetch';

class print extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.state = {
            accessSlipDetailInfo: {}
        };
    }
    componentDidMount(): void {
        accessSlipDetail(this.code).then(data => {
            this.setState({
                accessSlipDetailInfo: {
                    // 档案编号
                    enterCode: data.enterCode ? data.enterCode : '',
                    // 借款人
                    creditUserName: data.creditUser ? data.creditUser.userName : '',
                    // 联系电话
                    mobile: data.creditUser ? data.creditUser.mobile : '',
                    // 车型
                    model: data.carInfo ? data.carInfo.carModelName : '',
                    // 贷款金额
                    loanAmount: data.loanAmount ? data.loanAmount / 1000 : '',
                    // 贷款期数
                    periods: data.bankLoan ? data.bankLoan.periods : '',
                    // 月还款额
                    monthAmount: data.bankLoan ? data.bankLoan.monthAmount / 1000 : '',
                    // 按揭日期
                    bankFkDatetime: data.bankLoan ? dateTimeFormat(data.bankLoan.bankFkDatetime) : '',
                    // 经办银行
                    loanBankName: data.loanBankName ? data.loanBankName : '',
                    // 客户经理
                    captainName: data.captainName ? data.captainName : '',
                    // 保险开始时间与结束时间
                    syxDateStart: data.syxDateStart ? formatDate(data.syxDateStart) : '',
                    syxDateEnd: data.syxDateEnd ? formatDate(data.syxDateEnd) : '',
                    // 保险公司名字
                    insuranceCompanyName: data.insuranceCompanyName ? data.insuranceCompanyName : ''
                }
            });
        });
    }

    // 返回
    goBack = () => {
        this.props.history.go(-1);
    }
    render() {
        const {accessSlipDetailInfo} = this.state;
        return (
            <div>
                <div ref={(el) => this.refs = el}>
                    <h1 style={{textAlign: 'center', fontSize: '24px'}}>浩源车贷档案</h1>
                    <table className='table-style'>
                        <tr>
                            <td>档案编号:</td>
                            <td colspan="3">{accessSlipDetailInfo.enterCode}</td>
                        </tr>
                        <tr>
                            <td>借款人:</td>
                            <td>{accessSlipDetailInfo.creditUserName}</td>
                            <td>联系电话:</td>
                            <td>{accessSlipDetailInfo.mobile}</td>
                        </tr>
                        <tr>
                            <td>车型:</td>
                            <td>{accessSlipDetailInfo.model}</td>
                            <td>贷款金额:</td>
                            <td>{accessSlipDetailInfo.loanAmount}</td>
                        </tr>
                        <tr>
                            <td>期数:</td>
                            <td>{accessSlipDetailInfo.periods} 期</td>
                            <td>月还款额:</td>
                            <td>{accessSlipDetailInfo.monthAmount}</td>
                        </tr>
                        <tr>
                            <td>保险日期:</td>
                            <td>{accessSlipDetailInfo.syxDateStart} ~ {accessSlipDetailInfo.syxDateEnd}</td>
                            <td>承保公司:</td>
                            <td>{accessSlipDetailInfo.insuranceCompanyName}</td>
                        </tr>
                        <tr>
                            <td>按揭日期:</td>
                            <td>{accessSlipDetailInfo.bankFkDatetime}</td>
                            <td>按揭银行:</td>
                            <td>{accessSlipDetailInfo.loanBankName}</td>
                        </tr>
                        <tr>
                            <td>客户经理:</td>
                            <td>{accessSlipDetailInfo.captainName}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <ReactToPrint trigger={() => <a href='#' style={{float: 'right', marginRight: '10px'}}><Button type='primary'>打印</Button></a>} content={() => this.refs}></ReactToPrint>
                <Button onClick={this.goBack} style={{float: 'right', marginRight: '60px'}}>返回</Button>
            </div>
        );
    }
}

export default print;
