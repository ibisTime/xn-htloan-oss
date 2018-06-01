import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Button, Spin } from 'antd';
import { initData } from '@redux/analysis/protect';
import { moneyFormat } from 'common/js/util';

const { Meta } = Card;

@connect(
  state => state.analysisProtect,
  { initData }
)
class Protect extends React.Component {
  componentDidMount() {
    this.props.initData();
  }
  goFlow() {
    this.props.history.push(`/statistic/protect/addedit`);
  }
  render() {
    return (
      <div>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={8} style={{marginBottom: '20px'}}>
              <Card title="平台积分账户" extra={
                <Button onClick={() => this.goFlow()} type="primary">详情</Button>
              }>{moneyFormat()}</Card>
            </Col>
          </Row>
      </div>
    );
  }
}

export default Protect;
