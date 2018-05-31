import React from 'react';
import { TreeSelect, Form, Spin, Input, Button } from 'antd';
import { getQueryString, showSucMsg } from 'common/js/util';
import { formItemLayout, tailFormItemLayout } from 'common/js/config';
import { getPostList } from 'api/company';
import { getUserById, setUserPost } from 'api/user';

const { TreeNode } = TreeSelect;
const { Item } = Form;
const rules = [{
  required: true,
  message: '必填字段'
}];

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      treeData: [],
      userName: ''
    };
    this.userId = getQueryString('userId');
  }
  componentDidMount() {
    Promise.all([
      getUserById(this.userId),
      getPostList()
    ]).then(([userData, postData]) => {
      this.getTree(postData);
      this.setState({ userName: userData.realName, fetching: false });
      this.props.form.setFieldsValue({
        departmentCode: userData.departmentCode
      });
    }).catch(() => this.setState({ fetching: false }));
  }
  getTree(data) {
    console.log(data);
    let result = {};
    data.forEach(v => {
      v.parentCode = v.parentCode || 'ROOT';
      if (result[v.parentCode] === '0') {
        result[v.parentCode] = [];
      }
      result[v.parentCode].push({
        title: v.name,
        key: v.code,
        type: v.type
      });
    });
    this.result = result;
    let tree = [];
    this.getTreeNode(result['ROOT'], tree);
    this.setState({ treeData: tree });
  }
  getTreeNode(arr, children) {
    arr.forEach(a => {
      if (this.result[a.key]) {
        a.children = [];
        children.push(a);
        this.getTreeNode(this.result[a.key], a.children);
      } else {
        children.push(a);
      }
    });
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} value={item.key} disabled>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.title} key={item.key} value={item.key} disabled={item.type !== '3'}/>;
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ fetching: true });
        setUserPost(values).then(() => {
          this.setState({ fetching: false });
          showSucMsg('操作成功');
          setTimeout(() => {
            this.props.history.go(-1);
          }, 1000);
        }).catch(() => {
          this.setState({ fetching: false });
        });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Spin spinning={this.state.fetching}>
        <Form className="detail-form-wrapper" onSubmit={this.handleSubmit}>
          <Item key='userId' {...formItemLayout} className='hidden'>
            {getFieldDecorator('userId', {
              rules,
              initialValue: this.userId
            })(<Input type='hidden'/>)}
          </Item>
          <Item key='code' {...formItemLayout} label='用户名'>
            <div className="readonly-text">{this.state.userName}</div>
          </Item>
          <Item key='treeMenu' {...formItemLayout} label='岗位名称'>
            {getFieldDecorator('postCode', {
              rules
            })(
              <TreeSelect
                showSearch
                style={{ width: 300 }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="选择岗位"
                allowClear
                treeDefaultExpandAll
              >
                {this.renderTreeNodes(this.state.treeData)}
              </TreeSelect>
            )}
          </Item>
          <Item key='btns' {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">保存</Button>
            <Button style={{marginLeft: 20}} onClick={() => this.props.history.go(-1)}>返回</Button>
          </Item>
        </Form>
      </Spin>
    );
  }
}

export default Form.create()(Post);
