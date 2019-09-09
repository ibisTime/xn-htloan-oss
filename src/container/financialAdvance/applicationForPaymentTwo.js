import React from 'react';
import {
    showWarnMsg,
    showSucMsg
} from 'common/js/util';
import {Row, Col, Select, Table} from 'antd';
import './applicationForPayment.css';

const {Option} = Select;
class applicationForPayment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: '任务名称',
                    dataIndex: 'title',
                    width: '20%',
                    align: 'center'
                },
                {
                    title: '执行人',
                    dataIndex: 'carContent',
                    width: '20%',
                    align: 'center'
                },
                {
                    title: '创建时间',
                    dataIndex: 'tag',
                    width: '20%',
                    align: 'center'
                },
                {
                    title: '任务时效',
                    dataIndex: 'picNumber',
                    width: '20%',
                    align: 'center'
                }
            ]
        };
        this.selectedRowKeys = [];
        this.selectedRowKeysArr = [];
        this.rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.selectedRowKeysArr = selectedRowKeys;
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',
                name: record.name
            })
        };
    }
    render() {
        return (
            <div className="afp-body">
                <span className="afp-body-tag">业务基本信息</span>
                <Row className="afp-body-user-detail">
                    <Col span={6}>
                        <span>业务编号：890368820890</span>
                    </Col>
                    <Col span={6}>
                        <span>客户名称：王大锤</span>
                    </Col>
                    <Col span={6}>
                        <span>贷款银行：工商银行</span>
                    </Col>
                    <Col span={6}></Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={6}>
                        <span>贷款金额：1000，000</span>
                    </Col>
                    <Col span={6}>
                        <span>业务类型：新车</span>
                    </Col>
                    <Col span={6}>
                        <span>汽车经销商：新疆车行</span>
                    </Col>
                    <Col span={6}></Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={7}>
                        <span>业务归属：新疆有限公司-业务部-业务员-柴运来</span>
                    </Col>
                    <Col span={5}>
                        <span></span>
                    </Col>
                    <Col span={6}>
                        <span>当前状态：待准入审核</span>
                    </Col>
                    <Col span={6}></Col>
                </Row>
                <div className="afp-body-line"></div>
                <span className="afp-body-tag">垫资信息</span>
                <Row style={{marginTop: '20px'}}>
                    <Col span={6}>
                        <span>收款账户户名：xxx汽车经销商</span>
                    </Col>
                    <Col span={6}>
                        <span>收款账户银行：工商银行城西支行</span>
                    </Col>
                    <Col span={6}>
                        <span>收款账户账号：88950036892</span>
                    </Col>
                    <Col span={6}></Col>
                </Row>
                <div className="afp-body-line"></div>
                <Row>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '100px'}}>是否继续垫资：</span>
                        <Select defaultValue="lucy" className="afp-body-select">
                            <Option value="jack">建设</Option>
                            <Option value="lucy">农业</Option>
                        </Select>
                        <div className="clear"></div>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title">审核意见：</span>
                        <textarea className="afp-body-textarea"></textarea>
                    </Col>
                </Row>
                <Table
                    className="afp-body-table"
                    onRow={(record) => {
                        return {
                            onClick: (e) => {
                                console.log(e.currentTarget);
                                e.currentTarget.getElementsByClassName('ant-checkbox-input')[0].click();
                            }
                        };
                    }}
                    rowSelection={this.rowSelection}
                    columns={this.state.columns}
                />
                <div></div>
                <div className="afp-body-btn-group">
                    <span className="afp-body-btn-gray" style={{width: '72px'}}>暂不处理</span>
                    <span className="afp-body-btn-gray" style={{marginLeft: '40px'}}>不通过</span>
                    <span className="afp-body-btn-blue" style={{marginLeft: '40px'}}>通过</span>
                </div>
            </div>
        );
    }
}

export default applicationForPayment;
