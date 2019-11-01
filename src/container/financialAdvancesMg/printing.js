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
import ReactToPrint from 'react-to-print';
import './printing.css';
import fetch from 'common/js/fetch';

class printing extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.state = {
            // 用款用途
            purposeOfConsumption: '',
            // 汽车经销商
            carDealer: '',
            // 客户名称
            customerName: '',
            // 用款小写
            smallLetter: '',
            // 用款大写
            capitalization: '',
            // 贷款银行
            loanBank: '',
            // 收款单位名称
            collectionUnit: '',
            // 账户
            accountNumber: '',
            // 开户银行
            bankOfDeposit: '',
            // 打款日期
            dateOfPayment: '',
            // 申请人
            applicant: '',
            // 申请日期
            dateOfApplication: '',
            // 申请部门
            applicationDepartment: '',
            // 审核意见
            auditOpinion: '',
            // 财务部意见
            Opinion: ''
        };
    }
    componentDidMount(): void {
        fetch(632516, {code: this.code}).then(data => {
            let arr = [];
            for(let i = 0; i < data.bizLogs.length; i++) {
                arr.push({
                    dkey: data.bizLogs[i].dealNode,
                    dvalue: data.bizLogs[i].dealNote + '，' + dateTimeFormat(data.bizLogs[i].endDatetime)
                });
            }
            this.setState({
                purposeOfConsumption: data.bizType === '0' ? '新车' : '二手车',
                carDealer: data.carInfo.shopCarGarageName,
                customerName: data.customerName,
                smallLetter: data.loanAmount / 1000,
                capitalization: numUppercase(data.loanAmount / 1000),
                loanBank: data.loanBankName,
                collectionUnit: data.advance.collectBankcard.bankName,
                accountNumber: data.advance.collectBankcard.bankcardNumber,
                bankOfDeposit: data.advance.collectBankcard.subbranch,
                applicant: getUserName(),
                dateOfApplication: getNowTime(),
                auditOpinion: `${findDsct(arr, 'b3').split('，')[0]}  ${getUserName()}  ${findDsct(arr, 'b3').split('，')[3]}`,
                Opinion: findDsct(arr, 'b3').split('，')[2]
            });
        });
        fetch(630067, {userId: getUserId()}).then(data => {
            this.setState({
                applicationDepartment: data.companyName
            });
        });
    }

    render() {
        const {
            // 用款用途
            purposeOfConsumption,
            // 汽车经销商
            carDealer,
            // 客户名称
            customerName,
            // 用款小写
            smallLetter,
            // 用款大写
            capitalization,
            // 贷款银行
            loanBank,
            // 收款单位名称
            collectionUnit,
            // 账户
            accountNumber,
            // 开户银行
            bankOfDeposit,
            // 打款日期
            dateOfPayment,
            // 申请人
            applicant,
            // 申请日期
            dateOfApplication,
            // 申请部门
            applicationDepartment,
            // 审核意见
            auditOpinion,
            // 财务部意见
            Opinion
        } = this.state;
        return (
            <div>
                <div ref={(el) => this.refs = el}>
                    <h1 style={{textAlign: 'center', fontSize: '24px'}}>垫资用款申请单</h1>
                    <table className='table-style'>
                        <tr>
                            <td>用款途径:</td>
                            <td>{purposeOfConsumption}</td>
                            <td>汽车经销商:</td>
                            <td>{carDealer}</td>
                            <td>客户名称:</td>
                            <td>{customerName}</td>
                        </tr>
                        <tr>
                            <td>用款小写:</td>
                            <td>{smallLetter}</td>
                            <td>用款大写:</td>
                            <td>{capitalization}</td>
                            <td>贷款银行:</td>
                            <td>{loanBank}</td>
                        </tr>
                        <tr>
                            <td>收款单位名称:</td>
                            <td>{collectionUnit}</td>
                            <td>账号:</td>
                            <td>{accountNumber}</td>
                            <td>开户银行:</td>
                            <td>{bankOfDeposit}</td>
                        </tr>
                        <tr>
                            <td>打款日期:</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>申请人:</td>
                            <td>{applicant}</td>
                            <td>申请日期:</td>
                            <td>{dateOfApplication}</td>
                            <td>申请部门:</td>
                            <td>{applicationDepartment}</td>
                        </tr>
                        <tr>
                            <td>业务审核意见:</td>
                            <td colspan="5">{auditOpinion}</td>
                        </tr>
                        <tr>
                            <td>财务部意见:</td>
                            <td colSpan="5">{Opinion}</td>
                        </tr>
                    </table>
                </div>
                <ReactToPrint trigger={() => <a href='#' style={{float: 'right'}}><Button type='primary'>打印</Button></a>} content={() => this.refs}></ReactToPrint>
            </div>
        );
    }
}

export default printing;
