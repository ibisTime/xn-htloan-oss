import React from 'react';
import {
    showWarnMsg,
    showSucMsg,
    moneyFormat,
    dateTimeFormat,
    dsctList1,
    findDsct,
    getRoleCode
} from 'common/js/util';
import {Row, Col, Checkbox, Pagination, Select} from 'antd';
import {
    accessSlip,
    accessSlipStatus,
    showButton
} from '../../api/preLoan.js';
import './preloanAccess.css';
import './preloanAccessList.css';

const {Option} = Select;

class preloanAccessList1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accessSlipList: [],
            total: '',
            pageSize: 4,
            code: '',
            customerName: '',
            curNodeCode: '',
            accessSlipStatusArr: [],
            paginationCurrent: 1,
            tomoney: false,
            toexamine: false,
            toexamines: false,
            zdhl: false,
            edit: false,
            detail: false,
            printing: false
        };
        this.checkBoxGroup = [];
        this.statusName = '';
    }
    componentDidMount(): void {
        this.getAccessSlip(1);
        this.getAccessSlipStatus();
        let btnArr = {
            parentCode: 'SM201805291018133331107',
            roleCode: getRoleCode(),
            type: '2'
        };
        showButton(btnArr).then(data => {
            for(let i = 0; i < data.length; i++) {
                if(data[i].url === '/tomoney') {
                    this.setState({
                        tomoney: true
                    });
                }else if(data[i].url === '/toexamine') {
                    this.setState({
                        toexamine: true
                    });
                }else if(data[i].url === '/toexamines') {
                    this.setState({
                        toexamines: true
                    });
                }else if(data[i].url === '/zdhl') {
                    this.setState({
                        zdhl: true
                    });
                }else if(data[i].url === '/edit') {
                    this.setState({
                        edit: true
                    });
                }else if(data[i].url === '/detail') {
                    this.setState({
                        detail: true
                    });
                }else if(data[i].url === '/printing') {
                    this.setState({
                        printing: true
                    });
                }
            }
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

    // 分页接口
    getAccessSlip = (pageNumber) => {
        const {code, customerName, curNodeCode} = this.state;
        accessSlip(pageNumber, 4, code === '' ? '' : code, customerName === '' ? '' : customerName, curNodeCode === '' ? '' : curNodeCode, ['b1', 'b2', 'b3', 'b4', 'b5']).then(data => {
            let arr = [];
            for(let i = 0; i < data.list.length; i++) {
                arr.push({
                    code: data.list[i].code ? data.list[i].code : '',
                    // 客户姓名
                    customerName: data.list[i].customerName ? data.list[i].customerName : '',
                    // 购车类型
                    bizType: data.list[i].bizType ? data.list[i].bizType : '',
                    // 贷款银行
                    loanBankName: data.list[i].loanBankName ? data.list[i].loanBankName : '',
                    // 贷款期数
                    periods: data.list[i].periods ? data.list[i].periods : '',
                    // 业务公司
                    saleUserCompanyName: data.list[i].saleUserCompanyName ? data.list[i].saleUserCompanyName : '',
                    // 业务团队
                    teamName: data.list[i].teamName ? data.list[i].teamName : '',
                    // 业务员名称
                    saleUserName: data.list[i].saleUserName ? data.list[i].saleUserName : '',
                    // 是否垫资
                    isAdvanceFund: data.list[i].isAdvanceFund ? data.list[i].isAdvanceFund : '',
                    // 状态
                    curNodeCode: data.list[i].curNodeCode ? data.list[i].curNodeCode : '',
                    // 贷款金额
                    loanAmount: data.list[i].loanAmount ? data.list[i].loanAmount : ''
                });
            }
            this.setState({
                accessSlipList: [...arr],
                total: data.totalCount
            });
        });
    }
    handleChangeSearchByCode = (e) => {
        this.setState({
            code: e.target.value
        });
    }
    handleChangeSearchByCustomerName = (e) => {
        this.setState({
            customerName: e.target.value
        });
    }
    handleChangeGo = (value, event) => {
        this.statusName = event.props.children;
        this.setState({
            curNodeCode: value
        });
    }
    onChanges = async (pageNumber) => {
        this.getAccessSlip(pageNumber);
    }
    onChange = (e) => {
        if(e.target.checked) {
            this.checkBoxGroup.push(
                e.target.value
            );
        }else{
            this.checkBoxGroup.splice(this.checkBoxGroup.findIndex(index => index === e.target.value), 1);
        }
    }
    sendDetail = () => {
        if(this.checkBoxGroup.length <= 0) {
            showWarnMsg('请选择车辆信息');
        }else if(this.checkBoxGroup.length >= 2) {
            showWarnMsg('请选择不大于一条记录');
        }else {
            this.sendDetailCode(this.checkBoxGroup[0]);
        }
    }
    sendAddInfoOrChange = () => {
        if(this.checkBoxGroup.length >= 2) {
            showWarnMsg('请选择不大于一条记录');
        }else {
            if(this.checkBoxGroup[0] === undefined) {
                this.props.history.push(`/preLoan/Access`);
            }else {
                if(this.checkBoxGroup[0].split('|')[1] === 'a1' || this.checkBoxGroup[0].split('|')[1] === 'a1x') {
                    this.props.history.push(`/preLoan/Access?code=${this.checkBoxGroup[0].split('|')[0]}`);
                }else {
                    showWarnMsg('当前状态不能操作!');
                }
            }
        }
    }
    sendDetailCode = (code) => {
        this.props.history.push(`/preLoan/Access/detail?code=${code.split('|')[0]}`);
    }
    searchSend = () => {
        this.getAccessSlip(1);
        this.setState({
            paginationCurrent: 1
        });
    }
    resetOn = () => {
        this.setState({
            code: '',
            customerName: '',
            curNodeCode: ''
        });
        this.statusName = '';
    }
    // 用款申请
    skFor = () => {
        if(this.checkBoxGroup.length <= 0) {
            showWarnMsg('请选择车辆信息');
        }else if(this.checkBoxGroup.length >= 2) {
            showWarnMsg('请选择不大于一条记录');
        }else if(this.checkBoxGroup[0].split('|')[1] != 'b1') {
            showWarnMsg('当前状态无权操作');
        }else {
            this.props.history.push(`/financial/advance/afp?code=${this.checkBoxGroup[0].split('|')[0]}`);
        }
    }
    // 用款一审核
    skFor1 = () => {
        if(this.checkBoxGroup.length <= 0) {
            showWarnMsg('请选择车辆信息');
        }else if(this.checkBoxGroup.length >= 2) {
            showWarnMsg('请选择不大于一条记录');
        }else if(this.checkBoxGroup[0].split('|')[1] != 'b2') {
            showWarnMsg('当前状态无权操作');
        }else {
            this.props.history.push(`/financial/advance/afpOne?code=${this.checkBoxGroup[0].split('|')[0]}`);
        }
    }
    // 用款二审核
    skFor2 = () => {
        if(this.checkBoxGroup.length <= 0) {
            showWarnMsg('请选择车辆信息');
        }else if(this.checkBoxGroup.length >= 2) {
            showWarnMsg('请选择不大于一条记录');
        }else if(this.checkBoxGroup[0].split('|')[1] != 'b3') {
            showWarnMsg('当前状态无权操作');
        }else {
            this.props.history.push(`/financial/advance/afpTwo?code=${this.checkBoxGroup[0].split('|')[0]}`);
        }
    }
    // 制单录回
    skForBack1 = () => {
        if(this.checkBoxGroup.length <= 0) {
            showWarnMsg('请选择车辆信息');
        }else if(this.checkBoxGroup.length >= 2) {
            showWarnMsg('请选择不大于一条记录');
        }else if(this.checkBoxGroup[0].split('|')[1] != 'b4') {
            showWarnMsg('当前状态无权操作');
        }else {
            this.props.history.push(`/financial/advance/orderRecall?code=${this.checkBoxGroup[0].split('|')[0]}`);
        }
    }
    // 垫资回录
    skForBack2 = () => {
        if(this.checkBoxGroup.length <= 0) {
            showWarnMsg('请选择车辆信息');
        }else if(this.checkBoxGroup.length >= 2) {
            showWarnMsg('请选择不大于一条记录');
        }else if(this.checkBoxGroup[0].split('|')[1] != 'b5') {
            showWarnMsg('当前状态无权操作');
        }else {
            this.props.history.push(`/financial/advance/orderMemory?code=${this.checkBoxGroup[0].split('|')[0]}`);
        }
    }
    // 垫资打印
    skPrint = () => {
        if(this.checkBoxGroup.length <= 0) {
            showWarnMsg('请选择信息');
        }else if(this.checkBoxGroup.length >= 2) {
            showWarnMsg('请选择不大于一条记录');
        }else {
            // this.props.history.push(`/financial/advance/orderMemory?code=${this.checkBoxGroup[0].split('|')[0]}`);
            this.props.history.push(`/loan/printing?code=${this.checkBoxGroup[0].split('|')[0]}`);
        }
    }
    render() {
        const {
            accessSlipList,
            total,
            accessSlipStatusArr,
            code,
            customerName,
            paginationCurrent,
            tomoney,
            toexamine,
            toexamines,
            zdhl,
            edit,
            detail,
            printing
        } = this.state;
        return (
            <div className="preLoan-access-list-global">
                <Row>
                    <Col span={8}>
                        <span className="preLoan-body-title">业务编号：</span>
                        <input type="text" value={code} onChange={(e) => this.handleChangeSearchByCode(e)} className="preLoan-body-input" />
                    </Col>
                    <Col span={8}>
                        <span className="preLoan-body-title">客户姓名：</span>
                        <input type="text" value={customerName} onChange={(e) => this.handleChangeSearchByCustomerName(e)} className="preLoan-body-input" />
                    </Col>
                    <Col span={8}>
                        <span className="preLoan-body-title">状态：</span>
                        <Select style={{ width: '270px' }} value={this.statusName} onChange={this.handleChangeGo}>
                            {
                                accessSlipStatusArr.map(item => {
                                    return (
                                        <Option key={item.dkey} value={item.dkey}>{item.dvalue}</Option>
                                    );
                                })
                            }
                        </Select>
                    </Col>
                </Row>
                <div className="preLoan-access-list-btn-group">
                    <span className="preLoan-access-list-btn-gray" onClick={this.searchSend}>查询</span>
                    <span className="preLoan-access-list-btn-gray" onClick={this.resetOn} style={{marginLeft: '50px'}}>重置</span>
                    <div className="clear"></div>
                </div>
                <div className="preLoan-access-list-btn-group">
                    {
                        tomoney ? (
                            <span className="preLoan-access-list-btn-gray" onClick={this.skFor} style={{marginRight: '30px', width: '80px'}}>用款申请</span>
                        ) : null
                    }
                    {
                        toexamine ? (
                            <span className="preLoan-access-list-btn-gray" onClick={this.skFor1} style={{marginRight: '30px', width: '80px'}}>用款一审</span>
                        ) : null
                    }
                    {
                        toexamines ? (
                            <span className="preLoan-access-list-btn-gray" onClick={this.skFor2} style={{marginRight: '30px', width: '80px'}}>用款审核</span>
                        ) : null
                    }
                    {
                        zdhl ? (
                            <span className="preLoan-access-list-btn-gray" onClick={this.skForBack1} style={{marginRight: '30px', width: '80px'}}>制单回录</span>
                        ) : null
                    }
                    {
                        edit ? (
                            <span className="preLoan-access-list-btn-gray" onClick={this.skForBack2} style={{marginRight: '30px', width: '80px'}}>垫资回录</span>
                        ) : null
                    }
                    {
                        printing ? (
                            <span className="preLoan-access-list-btn-gray" onClick={this.skPrint} style={{marginRight: '30px', width: '80px'}}>垫资打印</span>
                        ) : null
                    }
                    {
                        detail ? (
                            <span className="preLoan-access-list-btn-gray" onClick={this.sendDetail} style={{marginRight: '30px'}}>详情</span>
                        ) : null
                    }
                    <div className="clear"></div>
                </div>
                {
                    accessSlipList.length <= 0
                        ? <div style={{textAlign: 'center', marginTop: '40px'}}>
                            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAACHCAYAAADqQpBvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTNBOURDMUM2Qjk0MTFFODg3N0FGMzE5MERDRjNGRUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTNBOURDMUQ2Qjk0MTFFODg3N0FGMzE5MERDRjNGRUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5M0E5REMxQTZCOTQxMUU4ODc3QUYzMTkwRENGM0ZFQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5M0E5REMxQjZCOTQxMUU4ODc3QUYzMTkwRENGM0ZFQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuqE52AAAB9aSURBVHja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' />
                            <h4 style={{marginTop: '10px'}}>暂无数据</h4>
                        </div>
                        : accessSlipList.map(d => {
                            return (<Row className="preLoan-access-list-item">
                                <Col span={1} style={{lineHeight: '130px'}}>
                                    <Checkbox value={d.code + '|' + d.curNodeCode} onChange={this.onChange} />
                                </Col>
                                <Col span={23}>
                                    <Row>
                                        <Col span={6}>业务编号：{d.code}</Col>
                                        <Col span={1}>
                                            <span className={d.bizType === '0' ? 'preLoan-access-list-btn-blue' : 'preLoan-access-list-row-orange'}>{d.bizType === '0' ? '新车' : '二手车'}</span>
                                        </Col>
                                        <Col span={17} style={{textAlign: 'right'}}>
                                            <span>状态：{findDsct(accessSlipStatusArr, d.curNodeCode)}</span>
                                        </Col>
                                    </Row>
                                    <div className="preLoan-access-list-row-line"></div>
                                    <Row style={{marginTop: '23px'}}>
                                        <Col span={5}>客户姓名：{d.customerName}</Col>
                                        <Col span={5}>贷款银行：{d.loanBankName}</Col>
                                        <Col span={5}>贷款金额：{d.loanAmount / 1000}</Col>
                                        <Col span={5}>贷款期数：{d.periods}期</Col>
                                        <Col span={4}>是否垫资：{d.isAdvanceFund === '0' ? '否' : '是'}</Col>
                                    </Row>
                                    <Row style={{marginTop: '15px'}}>
                                        <Col span={5}>业务公司：{d.saleUserCompanyName}</Col>
                                        <Col span={5}>业务团队：{d.teamName}</Col>
                                        <Col span={5}>业务员：{d.saleUserName}</Col>
                                        <Col span={5}></Col>
                                        <Col span={4}></Col>
                                    </Row>
                                </Col>
                            </Row>);
                        })
                }
                <div className="preLoan-access-empty"></div>
                {
                    accessSlipList.length <= 0
                        ? ''
                        : <Pagination className="preLoan-access-list-page" defaultCurrent={paginationCurrent} pageSize={this.state.pageSize} total={total} onChange={this.onChanges} />
                }
            </div>
        );
    }
}

export default preloanAccessList1;
