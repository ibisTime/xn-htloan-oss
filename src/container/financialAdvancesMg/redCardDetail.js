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

class redCardDetail extends React.Component {
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
                    // 中文名
                    customerName: data.customerName,
                    // 性别
                    gender: data.creditUser ? data.creditUser.gender : '',
                    // 证件类型
                    cardType: '身份证',
                    // 证件号码
                    idNo: data.creditUser ? data.creditUser.idNo : '',
                    // 发证机关
                    authref: data.creditUser ? data.creditUser.authref : '',
                    // 证件有效日期
                    startDate: data.creditUser ? data.creditUser.startDate + '~' + data.creditUser.statdate : '',
                    // 婚姻状况
                    marryState: data.creditUser ? data.creditUser.marryStateName : '',
                    // 手机号码
                    mobile: data.creditUser ? data.creditUser.mobile : '',
                    // 住宅(省/市/区)
                    nowAddressProvince: data.creditUser ? data.creditUser.nowAddressProvince + '/' + data.creditUser.nowAddressCity + '/' + data.creditUser.nowAddressArea : '',
                    // 住宅详情地址
                    nowAddress: data.creditUser ? data.creditUser.nowAddress : '',
                    // 住宅电话
                    nowAddressMobile: data.creditUser ? data.creditUser.nowAddressMobile : '',
                    // 入驻日期
                    nowAddressDate: data.creditUser ? data.creditUser.nowAddressDate : '',
                    // 教育程度
                    education: data.creditUser ? data.creditUser.educationeName : '',
                    // 住宅状况
                    nowAddressState: data.creditUser ? data.creditUser.nowAddressStateName : '',
                    // 本人年收入
                    yearIncome: data.creditUser ? data.creditUser.yearIncome * 12 : '',
                    // 单位名称
                    companyName: data.creditUser ? data.creditUser.companyName : '',
                    // 单位地址(省市区)
                    companyProvince: data.creditUser ? data.creditUser.companyProvince + '/' + data.creditUser.companyCity + '/' + data.creditUser.companyArea : '',
                    // 单位性质
                    workCompanyProperty: data.creditUser ? data.creditUser.workCompanyPropertyName : '',
                    // 职业
                    position: data.creditUser ? data.creditUser.positionName : '',
                    // 何时进入工作单位时间
                    workDatetime: data.creditUser ? data.creditUser.workDatetime : '',
                    // 紧急人联系资料
                    emergencyName1: data.creditUser ? data.creditUser.emergencyName1 : '',
                    emergencyRelation1: data.creditUser ? data.creditUser.setEmergencyRelation1Name : '',
                    emergencyMobile1: data.creditUser ? data.creditUser.emergencyMobile1 : '',
                    emergencyName2: data.creditUser ? data.creditUser.emergencyName2 : '',
                    emergencyRelation2: data.creditUser ? data.creditUser.setEmergencyRelation2Name : '',
                    emergencyMobile2: data.creditUser ? data.creditUser.emergencyMobile2 : ''
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
            <div style={{background: '#fff'}}>
                <div ref={(el) => this.refs = el}>
                    <h1 style={{textAlign: 'center', fontSize: '24px'}}>红卡信息</h1>
                    <div style={{width: '100%', textAlign: 'left', fontSize: '18px', fontWeight: '600'}}>业务编号:{this.code}</div>
                    <table className='table-style'>
                        <tr>
                            <td>基本资料</td>
                            <td colSpan="3"></td>
                        </tr>
                        <tr>
                            <td>中文名:</td>
                            <td>{accessSlipDetailInfo.customerName}</td>
                            <td>姓名拼音:</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>性别:</td>
                            <td>{accessSlipDetailInfo.gender}</td>
                            <td>证件类型:</td>
                            <td>{accessSlipDetailInfo.cardType}</td>
                        </tr>
                        <tr>
                            <td>证件号码:</td>
                            <td>{accessSlipDetailInfo.idNo}</td>
                            <td>发证机关:</td>
                            <td>{accessSlipDetailInfo.authref}</td>
                        </tr>
                        <tr>
                            <td>证件有效期截止:</td>
                            <td>{accessSlipDetailInfo.startDate}</td>
                            <td>婚姻状况:</td>
                            <td>{accessSlipDetailInfo.marryState}</td>
                        </tr>
                        <tr>
                            <td>手机号码:</td>
                            <td>{accessSlipDetailInfo.mobile}</td>
                            <td>住宅(省/市/区、县):</td>
                            <td>{accessSlipDetailInfo.nowAddressProvince}</td>
                        </tr>
                        <tr>
                            <td>住宅(详细地址):</td>
                            <td>{accessSlipDetailInfo.nowAddress}</td>
                            <td>住宅电话:</td>
                            <td>{accessSlipDetailInfo.nowAddressMobile}</td>
                        </tr>
                        <tr>
                            <td>入住日期:</td>
                            <td>{accessSlipDetailInfo.nowAddressDate}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>教育程度:</td>
                            <td>{accessSlipDetailInfo.education}</td>
                            <td>住宅状况:</td>
                            <td>{accessSlipDetailInfo.nowAddressState}</td>
                        </tr>
                        <tr>
                            <td>本人年收入:</td>
                            <td>{accessSlipDetailInfo.yearIncome}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>职业资料</td>
                            <td colSpan="3"></td>
                        </tr>
                        <tr>
                            <td>单位名称:</td>
                            <td>{accessSlipDetailInfo.companyName}</td>
                            <td>单位地址(省/市/区、县):</td>
                            <td>{accessSlipDetailInfo.companyProvince}</td>
                        </tr>
                        <tr>
                            <td>单位性质:</td>
                            <td>{accessSlipDetailInfo.workCompanyProperty}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>职业:</td>
                            <td>{accessSlipDetailInfo.position}</td>
                            <td>何时进入现单位工作:</td>
                            <td>{accessSlipDetailInfo.workDatetime}</td>
                        </tr>
                        <tr>
                            <td>紧急联系人资料</td>
                            <td colSpan="3"></td>
                        </tr>
                        <tr>
                            <td>紧急联系人1:</td>
                            <td>{accessSlipDetailInfo.emergencyName1}</td>
                            <td>与您的关系:</td>
                            <td>{accessSlipDetailInfo.emergencyRelation1}</td>
                        </tr>
                        <tr>
                            <td>紧急1手机:</td>
                            <td>{accessSlipDetailInfo.emergencyMobile1}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>紧急联系人2:</td>
                            <td>{accessSlipDetailInfo.emergencyName2}</td>
                            <td>与您的关系:</td>
                            <td>{accessSlipDetailInfo.emergencyRelation2}</td>
                        </tr>
                        <tr>
                            <td>紧急2手机:</td>
                            <td>{accessSlipDetailInfo.emergencyMobile2}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <div style={{background: '#fff'}}><ReactToPrint trigger={() => <a href='#' style={{float: 'right', marginRight: '10px'}}><Button type='primary'>打印</Button></a>} content={() => this.refs}></ReactToPrint></div>
                <Button onClick={this.goBack} style={{float: 'right', marginRight: '60px'}}>返回</Button>
            </div>
        );
    }
}

export default redCardDetail;
