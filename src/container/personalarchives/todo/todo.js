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
        type: 'select',
        search: true,
      noVisible: true,
        listCode: 632517,
        valueName: '{{code.DATA}}',
        keyName: 'code',
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
      pageCode: 632525
    });
  }
}

export default ToDo;
