import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Button, Spin } from 'antd';
import { initData } from '@redux/finance/account';
import { moneyFormat } from 'common/js/util';

const { Meta } = Card;

@connect(
  state => state.financeAccount,
  { initData }
)
class Account extends React.Component {
  componentDidMount() {
    this.props.initData();
  }
  goFlow(accountNumber) {
    this.props.history.push(`/finance/breakBalance/ledger?accountNumber=${accountNumber}`);
  }
  render() {
    return (
      <div>
        <Spin spinning={this.props.fetching}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={8} style={{marginBottom: '20px'}}>
              <Card title="平台人民币盈亏账户" extra={
                <Button onClick={() => this.goFlow(this.props.cnyAccount.accountNumber)} type="primary">资金流水</Button>
              }>{moneyFormat(this.props.cnyAccount.amount)}</Card>
            </Col>
            <Col span={8} style={{marginBottom: '20px'}}>
              <Card title="平台人民币托管账户" extra={
                <Button onClick={() => this.goFlow(this.props.tgAccount.accountNumber)} type="primary">资金流水</Button>
              }>{moneyFormat(this.props.tgAccount.amount)}</Card>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={8} style={{marginBottom: '20px'}}>
              <Card title="平台积分账户" extra={
                <Button onClick={() => this.goFlow(this.props.jfAccount.accountNumber)} type="primary">资金流水</Button>
              }>{moneyFormat(this.props.jfAccount.amount)}</Card>
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
}

export default Account;
