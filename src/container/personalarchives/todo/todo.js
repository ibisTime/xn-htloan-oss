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
} from '@redux/personalarchives/todo';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import {getNodeList} from 'api/menu';
import {curNodePageUrl} from './../../../../src/common/js/config';

@listWrapper(
  state => ({
    ...state.toDo,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeDict: null
    };
  }

  componentDidMount() {
    getNodeList().then(nodeDict => {
      this.setState({nodeDict});
    });
}
  render() {
    const {nodeDict} = this.state;
    const fields = [{
        field: 'bizCode',
        search: true,
        title: '业务编号'
    }, {
      title: '消息内容',
      field: 'content'
    }, {
      title: '推送对象',
      field: 'operateRole',
      render: (v, d) => {
        return d.operateRoleName ? d.operateRoleName : '';
      }
    }, {
      title: '推送节点',
      field: 'refNode',
      type: 'select',
      data: nodeDict,
      keyName: 'code',
      valueName: 'name',
      search: true
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      data: [{
        key: '0',
        value: '待处理'
      }, {
        key: '1',
        value: '已处理'
      }],
      keyName: 'key',
      valueName: 'value',
      search: true
    }, {
      title: '创建时间',
      field: 'createDatetime',
      type: 'datetime'
    }, {
      title: '处理时间',
      field: 'finishDatetime',
      type: 'datetime'
    }];
    return this.props.buildList({
      fields,
      pageCode: 632525,
      buttons: [{
        code: 'handle',
        name: '处理',
        handler: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            console.log(curNodePageUrl);
            this.props.history.push(`${curNodePageUrl[selectedRows[0].refNode]}${selectedRows[0].bizCode}`);
          }
        }
        }]
    });
  }
}

export default ToDo;
