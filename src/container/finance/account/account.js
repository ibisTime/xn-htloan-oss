import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Button, Spin, Table } from 'antd';
import { initData } from '@redux/finance/account';
import { moneyFormat } from 'common/js/util';

const { Meta } = Card;

@connect(
  state => state.financeAccount,
  { initData }
)
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '名称',
      dataIndex: 'name'
    }, {
      title: '数量',
      dataIndex: 'amount',
      render: v => moneyFormat(v)
    }];
  }
  componentDidMount() {
    this.props.initData();
  }
  goFlow(accountNumber, kind = '') {
    this.props.history.push(`/finance/breakBalance/ledger?accountNumber=${accountNumber}&kind=${kind}`);
  }
  render() {
    return (
      <div>
        <Spin spinning={this.props.fetching}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={8} style={{width: '300px', marginBottom: '20px'}}>
              <Card title="冷钱包余额" extra={
                <Button onClick={() => this.goFlow(this.props.ethColdAccount.accountNumber, 'TG')} type="primary">资金流水</Button>
              }>{moneyFormat(this.props.ethColdAccount.amountString)}</Card>
            </Col>
            <Col span={8} style={{width: '300px', marginBottom: '20px'}}>
              <Card title="本地平台盈亏" extra={
                <Button onClick={() => this.goFlow(this.props.ethAccount.accountNumber)} type="primary">资金流水</Button>
              }>{moneyFormat(this.props.ethAccount.amountString)}</Card>
            </Col>
          </Row>
          <div style={{marginTop: '20px'}}>
            <Table
              bordered
              pagination={false}
              columns={this.columns}
              rowKey={record => record.code}
              dataSource={this.props.tableList}
            />
          </div>
        </Spin>
      </div>
    );
  }
}

export default Account;
