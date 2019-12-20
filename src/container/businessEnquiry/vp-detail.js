import React from 'react';
import {
    showWarnMsg,
    showSucMsg,
    moneyFormat,
    dateTimeFormat,
    dsctList1,
    findDsct,
    getRoleCode,
    getNowTime,
    getQueryString
} from 'common/js/util';
import {Row, Col, Layout} from 'antd';
import { Switch, Route, Link } from 'react-router-dom';
import asyncComponent from '../../component/async-component/async-component';
import './detail.css';
import fetch from 'common/js/fetch';
const { Content } = Layout;

// 准入详情
const admittance = asyncComponent(() => import('../../container/preLoanManagement/preloanAccessDetail'));
// 垫资详情
const advance = asyncComponent(() => import('../../container/financialAdvancesMg/detailPrint'));
// 理件详情
const rationale = asyncComponent(() => import('../../container/statisticalManagement/rationaleDetail/rationaleDetail'));
// 银行放款详情
const loan = asyncComponent(() => import('../../container/statisticalManagement/loanDetail/loanDetail'));
// 入档详情
const putInAFile = asyncComponent(() => import('../../container/statisticalManagement/fileDetail/fileDetail'));
// 红卡信息
const redCardDetail = asyncComponent(() => import('../../container/financialAdvancesMg/redCardDetail'));
class vpDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item1: true,
            item2: false,
            item3: false,
            item4: false,
            item5: false,
            item6: false,
            isShowNot: {}
        };
        this.code = getQueryString('code', this.props.location.search);
        this.cpt = admittance;
    }
    componentDidMount(): void {
        fetch(632529, {code: this.code}).then(data => {
            this.setState({
                isShowNot: data
            });
        });
    }

    setInOrOut = (value) => {
        switch (value) {
            case 'item1':
                this.setState({
                    item1: true,
                    item2: false,
                    item3: false,
                    item4: false,
                    item5: false
                });
                this.cpt = admittance;
                break;
            case 'item2':
                this.setState({
                    item1: false,
                    item2: true,
                    item3: false,
                    item4: false,
                    item5: false
                });
                this.cpt = advance;
                break;
            case 'item3':
                this.setState({
                    item1: false,
                    item2: false,
                    item3: true,
                    item4: false,
                    item5: false
                });
                this.cpt = rationale;
                break;
            case 'item4':
                this.setState({
                    item1: false,
                    item2: false,
                    item3: false,
                    item4: true,
                    item5: false
                });
                this.cpt = loan;
                break;
            case 'item5':
                this.setState({
                    item1: false,
                    item2: false,
                    item3: false,
                    item4: false,
                    item5: true
                });
                this.cpt = putInAFile;
                break;
            case 'item6':
                this.setState({
                    item1: false,
                    item2: false,
                    item3: false,
                    item4: false,
                    item5: false,
                    item6: true
                });
                this.cpt = redCardDetail;
                break;
        }
    }
    render() {
        const {item1, item2, item3, item4, item5, item6, isShowNot} = this.state;
        return (
            <div style={{background: '#fff'}}>
                <div className="contain-header-nav">
                    <span className={item1 ? 'contain-header-nav-item-in' : 'contain-header-nav-item-out'} onClick={(value) => this.setInOrOut('item1')}>准入详情</span>
                    <span className={item2 ? 'contain-header-nav-item-in' : 'contain-header-nav-item-out'} onClick={(value) => this.setInOrOut('item2')}>垫资详情</span>
                    {
                        isShowNot.mindWare === '1' ? (
                            <span className={item3 ? 'contain-header-nav-item-in' : 'contain-header-nav-item-out'} onClick={(value) => this.setInOrOut('item3')}>理件详情</span>
                        ) : null
                    }
                    {
                        isShowNot.bankFk === '1' ? (
                            <span className={item4 ? 'contain-header-nav-item-in' : 'contain-header-nav-item-out'} onClick={(value) => this.setInOrOut('item4')}>放款详情</span>
                        ) : null
                    }
                    {
                        isShowNot.enter === '1' ? (
                            <span className={item5 ? 'contain-header-nav-item-in' : 'contain-header-nav-item-out'} onClick={(value) => this.setInOrOut('item5')}>入档详情</span>
                        ) : null
                    }
                    <span className={item6 ? 'contain-header-nav-item-in' : 'contain-header-nav-item-out'} onClick={(value) => this.setInOrOut('item6')}>红卡详情</span>
                </div>
                <Layout>
                    <Content>
                        <Switch>
                            <Route path={`/ywcx/ywcx/detail`} exact component={this.cpt}></Route>
                        </Switch>
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default vpDetail;
