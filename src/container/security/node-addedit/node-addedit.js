import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/security/node-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getNodeList } from 'api/menu';

@DetailWrapper(
  state => state.securityNodeAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class NodeAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
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
      key: 'node_type'
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
    }, {
        title: '材料清单',
        field: 'fileStrs',
        type: 'o2m',
        hidden: this.view,
        options: {
            scroll: {x: 1300},
            fields: [{
                title: '名称',
                field: 'content',
                nowrap: true,
                required: true
            }]
        }
    }];
    return this.state.nodeDict ? this.props.buildDetail({
      fields,
      code: this.code,
      key: 'id',
      view: this.view,
      detailCode: 630156
    }) : null;
  }
}

export default NodeAddEdit;
