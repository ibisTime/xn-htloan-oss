import React from 'react';
import { connect } from 'react-redux';
import { Spin, Button, Tree, Modal, Row, Col, Form, Input, Select } from 'antd';
import CompAdd from 'component/comp-add/comp-add';
import { showSucMsg, showWarnMsg, getUserName } from 'common/js/util';
import { initData, setSelectedKeys, addComp, deleteCompany, updateCompany } from '@redux/security/compConstruct';
import { formItemLayout, tailFormItemLayout } from 'common/js/config';

const { TreeNode } = Tree;
const { Item } = Form;
const { Option } = Select;
const rule0 = [{
  required: true,
  message: '必填字段'
}, {
  min: 1,
  max: 30,
  message: '请输入一个长度最多是30的字符串'
}];
const rule1 = [{
  required: true,
  message: '必填字段'
}];

@connect(
  state => state.securityCompConstruct,
  { initData, setSelectedKeys, addComp, deleteCompany, updateCompany }
)
class CompConstruct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compVisible: false
    };
  }
  componentDidMount() {
    this.props.initData();
  }
  setCompVisible = (compVisible) => {
    this.setState({ compVisible });
  }
  // 头部按钮点击事件
  handleBtnClick = (url) => {
    switch(url) {
      case 'add':
        return this.addCompany();
      case 'delete':
        return this.deleteCompany();
    }
  }
  // 表单上传事件
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.parentCode = values.parentCode === 'ROOT' ? '0' : values.parentCode;
        this.props.updateCompany(values);
      }
    });
  }
  renderTreeNodes(data) {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }
  onSelect = (keys) => {
    let sKeys = keys.checked || keys;
    this.props.setSelectedKeys(sKeys, this.props.form.setFieldsValue);
  }
  // 新增部门
  addCompany() {
    if (!this.props.selectedKeys.length && this.props.treeData.length) {
      showWarnMsg('请先选择公司/部门');
      return;
    }
    this.setCompVisible(true);
  }
  // 删除部门
  deleteCompany() {
    if (!this.props.selectedKeys.length) {
      showWarnMsg('请先选择公司/部门');
      return;
    }
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      content: '确定删除该公司/部门？',
      onOk: () => {
        this.props.deleteCompany(this.props.selectedKeys[0]);
      }
    });
  }
  render() {
    const { compVisible } = this.state;
    const { btnList, treeData, selectedKeys, checkedKeys,
      defaultExpandedKeys, fetching, current } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <CompAdd addComp={this.props.addComp} parentCode={selectedKeys[0]} compVisible={compVisible} setCompVisible={this.setCompVisible}/>
        <Spin spinning={fetching}>
          <div className="tools-wrapper">
            {btnList.map(v => (
              <Button key={v.code} onClick={() => {
                this.handleBtnClick(v.url.substr(1));
              }}>{v.name}</Button>
            ))}
          </div>
          <div className="table-wrapper">
            <Row>
              <Col span={8}>
                {treeData.length ? (
                  <Tree showLine
                    checkable={true}
                    checkStrictly={true}
                    defaultExpandedKeys={defaultExpandedKeys}
                    onSelect={this.onSelect}
                    onCheck={this.onSelect}
                    checkedKeys={checkedKeys}
                    selectedKeys={selectedKeys}
                  >
                    {this.renderTreeNodes(treeData)}
                  </Tree>
                ) : null}
              </Col>
              <Col span={8}>
                <Form onSubmit={this.handleSubmit}>
                  <Item key='updater' {...formItemLayout} className='hidden'>
                    {getFieldDecorator('updater', {
                      rules: rule1,
                      initialValue: getUserName()
                    })(<Input type='hidden'/>)}
                  </Item>
                  <Item key='parentCode' {...formItemLayout} className='hidden'>
                    {getFieldDecorator('parentCode', {
                      rules: rule1
                    })(<Input type='hidden'/>)}
                  </Item>
                  <Item key='code' {...formItemLayout} className='hidden'>
                    {getFieldDecorator('code', {
                      rules: rule1
                    })(<Input type='hidden'/>)}
                  </Item>
                  <Item key='name' {...formItemLayout} label='名称'>
                    {getFieldDecorator('name', {
                      rules: rule0
                    })(<Input />)}
                  </Item>
                  <Item key='leadName' {...formItemLayout} label='负责人'>
                    {getFieldDecorator('leadName', {
                      rules: rule0
                    })(<Input />)}
                  </Item>
                  <Item key='mobile' {...formItemLayout} label='负责人手机号'>
                    {getFieldDecorator('mobile', {
                      rules: rule0
                    })(<Input />)}
                  </Item>
                  <Item key='type' {...formItemLayout} label='类型'>
                    {getFieldDecorator('type', {
                      rules: rule1
                    })(<Select>
                      <Option key='1' value='1'>公司</Option>
                      <Option key='2' value='2'>部门</Option>
                    </Select>)}
                  </Item>
                  <Item key='btns' {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">保存</Button>
                  </Item>
                </Form>
              </Col>
            </Row>
          </div>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(CompConstruct);
