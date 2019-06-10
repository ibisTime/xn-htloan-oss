import React from 'react';
import { connect } from 'react-redux';
import { Spin, Button, Tree, Modal, Row, Col, Form,
  Input, Select, Tooltip, Icon, TreeSelect } from 'antd';
import CompAdd from 'component/comp-add/comp-add';
import { showSucMsg, showWarnMsg, getUserName } from 'common/js/util';
import { initData, setSelectedKeys, addComp, deleteCompany, updateCompany } from '@redux/security/compConstruct';
import { formItemLayout, tailFormItemLayout } from 'common/js/config';

const { TreeNode } = Tree;
const { Item } = Form;
const { Option } = Select;
const { TreeNode: TreeNodeSelect } = TreeSelect;
const rule0 = [{
  required: true,
  message: '必填字段'
}, {
  min: 1,
  max: 30,
  message: '请输入一个长度最多是30的字符串'
}];
const rule1 = {
  required: true,
  message: '必填字段'
};
const rule2 = {
  pattern: /^-?\d+$/,
  message: '请输入整数'
};

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
  // 生成上级组件
  renderCompNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNodeSelect title={item.title} key={item.key} value={item.key}>
            {this.renderCompNodes(item.children)}
          </TreeNodeSelect>
        );
      }
      return <TreeNodeSelect title={item.title} key={item.key} value={item.key}/>;
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
                      rules: [rule1],
                      initialValue: getUserName()
                    })(<Input type='hidden'/>)}
                  </Item>
                  <Item
                    key='parentCode'
                    {...formItemLayout}
                    label='上级'
                    className={this.props.curParentCode === 'ROOT' ? 'hidden' : ''}>
                    {getFieldDecorator('parentCode', {
                      rules: [rule1]
                    })(
                      this.props.curParentCode === 'ROOT'
                        ? <Input type='hidden'/>
                        : <TreeSelect
                            showSearch
                            style={{minWidth: 300}}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="请选择"
                            allowClear
                            treeDefaultExpandAll
                          >
                            {this.renderCompNodes(this.props.compList)}
                          </TreeSelect>
                    )}
                  </Item>
                  <Item key='code' {...formItemLayout} className='hidden'>
                    {getFieldDecorator('code', {
                      rules: [rule1]
                    })(<Input type='hidden'/>)}
                  </Item>
                  <Item key='name' {...formItemLayout} label='名称'>
                    {getFieldDecorator('name', {
                      rules: rule0
                    })(<Input style={{minWidth: 300}} />)}
                  </Item>
                  <Item key='orderNo' {...formItemLayout} label={(
                    <span>顺序<Tooltip title='数字越小，排序越靠前'>
                        <Icon type="question-circle-o"/>
                    </Tooltip></span>
                  )}>
                    {getFieldDecorator('orderNo', {
                      rules: [rule1, rule2]
                    })(<Input style={{minWidth: 300}} />)}
                  </Item>
                  <Item key='type' {...formItemLayout} label='类型'>
                    {getFieldDecorator('type', {
                      rules: [rule1]
                    })(<Select style={{minWidth: 300}}>
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
