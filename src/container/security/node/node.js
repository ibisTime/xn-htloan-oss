import React from 'react';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/security/node';
import { listWrapper } from 'common/js/build-list';
import { getNodeList } from 'api/menu';

@listWrapper(
  state => ({
    ...state.securityNode,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeDict: null
    };
  }
  componentDidMount() {
    getNodeList().then(nodeDict => {
      this.setState({ nodeDict });
    });
  }
  render() {
    const { nodeDict } = this.state;
    const fields = [{
      title: '节点名称',
      field: 'currentNode',
      type: 'select',
      data: nodeDict,
      keyName: 'code',
      valueName: 'name'
    }, {
      title: '流程类型',
      field: 'type',
      type: 'select',
      key: 'node_type',
      search: true
    }, {
      title: '下一个节点',
      field: 'nextNode',
      type: 'select',
      data: nodeDict,
      keyName: 'code',
      valueName: 'name'
    }, {
      title: '返回节点',
      field: 'backNode',
      type: 'select',
      data: nodeDict,
      keyName: 'code',
      valueName: 'name'
    }];
    return this.state.nodeDict ? this.props.buildList({ fields, rowKey: 'id', pageCode: 630155 }) : null;
  }
}

export default node;
