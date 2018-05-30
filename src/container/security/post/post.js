import React from 'react';
import { connect } from 'react-redux';
import { Spin, Button, Tree, Modal, Row, Col, Form, Input, Icon } from 'antd';
import PostAdd from 'component/post-add/post-add';
import { showWarnMsg, getUserName } from 'common/js/util';
import { initData, setSelectedKeys, addPost, deletePost, updatePost } from '@redux/security/post';
import { formItemLayout, tailFormItemLayout } from 'common/js/config';

const { TreeNode } = Tree;
const { Item } = Form;
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
  state => state.securityPost,
  { initData, setSelectedKeys, addPost, deletePost, updatePost }
)
class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postVisible: false
    };
  }
  componentDidMount() {
    this.props.initData();
  }
  setPostVisible = (postVisible) => {
    this.setState({ postVisible });
  }
  // 头部按钮点击事件
  handleBtnClick = (url) => {
    switch(url) {
      case 'add':
        return this.addPost();
      case 'delete':
        return this.deletePost();
    }
  }
  // 表单上传事件
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.parentCode = values.parentCode === 'ROOT' ? '0' : values.parentCode;
        this.props.updatePost(values);
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
      let props = item;
      if (item.type === '3') {
        props.icon = <Icon type="team" />;
      }
      return <TreeNode {...props}/>;
    });
  }
  onSelect = (keys) => {
    let sKeys = keys.checked || keys;
    this.props.setSelectedKeys(sKeys, this.props.form.setFieldsValue);
  }
  // 新增岗位
  addPost() {
    if (!this.props.selectedKeys.length) {
      showWarnMsg('请先选择部门');
    } else if (this.props.compInfo[this.props.selectedKeys[0]].type !== '2') {
      showWarnMsg('请选择部门');
    } else {
      this.setPostVisible(true);
    }
  }
  // 删除岗位
  deletePost() {
    if (!this.props.selectedKeys.length) {
      showWarnMsg('请先选择岗位');
    } else if (this.props.compInfo[this.props.selectedKeys[0]].type !== '3') {
      showWarnMsg('请选择岗位');
    } else {
      Modal.confirm({
        okText: '确定',
        cancelText: '取消',
        content: '确定删除该岗位？',
        onOk: () => {
          this.props.deletePost(this.props.selectedKeys[0]);
        }
      });
    }
  }
  render() {
    const { postVisible } = this.state;
    const { btnList, treeData, selectedKeys, checkedKeys,
      defaultExpandedKeys, fetching, current } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <PostAdd addPost={this.props.addPost} parentCode={selectedKeys[0]} postVisible={postVisible} setPostVisible={this.setPostVisible}/>
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
                  <Tree showLine showIcon
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
                  <Item key='type' {...formItemLayout} className='hidden'>
                    {getFieldDecorator('type', {
                      rules: rule1,
                      initialValue: 1
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

export default Form.create()(Post);
