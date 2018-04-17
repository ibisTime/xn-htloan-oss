import React from 'react';
import { Form, Spin, Button, Tree } from 'antd';
import { getMenuBtnList, getRoleMenuBtnList } from 'api/menu';
import { setRoleMenus } from 'api/user';
import { getQueryString, showSucMsg } from 'common/js/util';
import { formItemLayout, tailFormItemLayout } from 'common/js/config';

const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;

class RoleMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      treeData: [],
      expandedKeys: [],
      autoExpandParent: false,
      checkStrictly: true,
      checkedKeys: []
    };
    this.code = getQueryString('code');
    this.name = getQueryString('name');
  }
  componentDidMount() {
    Promise.all([
      getMenuBtnList(),
      getRoleMenuBtnList(this.code)
    ]).then(([allData, checkData]) => {
      this.getTree(allData);
      let checkedKeys = checkData.map(v => v.code);
      this.setState({
        checkedKeys: {
          checked: checkedKeys,
          halfChecked: []
        },
        fetching: false
      });
    }).catch(() => this.setState({ fetching: false }));
  }
  getTree(data) {
    let result = {};
    data.forEach(v => {
      v.parentCode = v.parentCode || 'ROOT';
      if (!result[v.parentCode]) {
        result[v.parentCode] = [];
      }
      result[v.parentCode].push({
        title: v.name,
        key: v.code
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
  onCheck = (checkedKeys, event) => {
    const { treeData } = this.state;
    this.checkNode = '';
    let key = event.node.props.eventKey;
    this.findCheckItem(treeData, key);
    let childrenKeys = [];
    if (this.getChildrenKeys[key]) {
      childrenKeys = this.getChildrenKeys[key];
    } else {
      childrenKeys.push(this.checkNode.key);
      this.checkNode.children && this.getChildrenKeys(this.checkNode.children, childrenKeys);
      this.getChildrenKeys[key] = childrenKeys;
    }
    let { checked } = checkedKeys;
    if (!event.checked) {
      childrenKeys.forEach(c => {
        let idx = checked.findIndex(v => c === v);
        if (idx > -1) {
          checked.splice(idx, 1);
        }
      });
    } else {
      childrenKeys.forEach(c => {
        let idx = checked.findIndex(v => c === v);
        if (idx === -1) {
          checked.push(c);
        }
      });
    }
    this.setState({ checkedKeys });
  }
  findCheckItem(arr, key) {
    if (this.findCheckItem[key]) {
      this.checkNode = this.findCheckItem[key];
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (this.checkNode) {
        return;
      }
      if (arr[i].key === key) {
        this.findCheckItem[key] = this.checkNode;
        this.checkNode = arr[i];
        break;
      } else if (arr[i].children) {
        this.findCheckItem(arr[i].children, key);
      }
    }
  }
  getChildrenKeys(arr, childrenKeys) {
    arr.forEach(a => {
      childrenKeys.push(a.key);
      if (a.children) {
        this.getChildrenKeys(a.children, childrenKeys);
      }
    });
  }
  renderTreeNodes = (data) => {
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
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ fetching: true });
    setRoleMenus(this.state.checkedKeys.checked, this.code).then(() => {
      this.setState({ fetching: false });
      showSucMsg('操作成功');
      setTimeout(() => this.props.history.go(-1), 1000);
    }).catch(() => this.setState({ fetching: false }));
  }
  render() {
    return (
      <Spin spinning={this.state.fetching}>
        <Form className="detail-form-wrapper" onSubmit={this.handleSubmit}>
          <FormItem key='code' {...formItemLayout} label='角色编号'>
            <div className="readonly-text">{this.code}</div>
          </FormItem>
          <FormItem key='name' {...formItemLayout} label='角色名称'>
            <div className="readonly-text">{this.name}</div>
          </FormItem>
          <FormItem key='treeMenu' {...formItemLayout} label='菜单权限'>
            {this.state.treeData.length ? (
              <Tree
                checkable
                showLine
                checkStrictly={this.state.checkStrictly}
                defaultExpandAll
                autoExpandParent={this.state.autoExpandParent}
                onCheck={this.onCheck}
                checkedKeys={this.state.checkedKeys}
              >
                {this.renderTreeNodes(this.state.treeData)}
              </Tree>
            ) : null}
          </FormItem>
          <FormItem key='btns' {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">保存</Button>
            <Button style={{marginLeft: 20}} onClick={() => this.props.history.go(-1)}>返回</Button>
          </FormItem>
        </Form>
      </Spin>
    );
  }
}

export default RoleMenu;
