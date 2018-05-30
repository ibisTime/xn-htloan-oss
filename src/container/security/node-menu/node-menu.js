import React from 'react';
import { Form, Spin, Button, Tree } from 'antd';
import { getNodeList, getRoleCodeBtnList } from 'api/menu';
import { setNodeMenus } from 'api/user';
import { getDictList } from 'api/dict';
import { getQueryString, showSucMsg, showWarnMsg } from 'common/js/util';
import { formItemLayout, tailFormItemLayout } from 'common/js/config';

const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;

class CodeMenu extends React.Component {
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
      getNodeList(),
      getDictList({ parentKey: 'node_type' }),
      getRoleCodeBtnList(this.code)
    ]).then(([tree, nodeDict, checkData]) => {
      let dict = {};
      nodeDict.forEach(d => dict[d.dkey] = d.dvalue);
      let treeData = tree.map(v => ({
        title: v.name + ' -- ' + dict[v.type],
        key: v.code
      }));
      this.setState({ treeData });
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
  onCheck = (checkedKeys, event) => {
    this.setState({ checkedKeys });
  }
  renderTreeNodes = (data) => {
    return data.map(item => <TreeNode {...item} />);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.checkedKeys.checked.length) {
      showWarnMsg('至少勾选一个节点');
      return;
    }
    this.setState({ fetching: true });
    setNodeMenus(this.state.checkedKeys.checked, this.code).then(() => {
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
          <FormItem key='treeMenu' {...formItemLayout} label='节点权限'>
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

export default CodeMenu;
