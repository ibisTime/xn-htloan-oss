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
} from '@redux/circulationLog/circulationLog';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import {getNodeList} from 'api/menu';

@listWrapper(
  state => ({
    ...state.circulationLog,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Circulationlog extends React.Component {
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
      title: '经办人',
      field: 'operatorName',
      search: true
    }, {
      title: '手机号',
      field: 'mobile'
    }, {
      title: '节点名称',
      field: 'dealNote',
      type: 'select',
      data: nodeDict,
      keyName: 'code',
      valueName: 'name',
      search: true
    }, {
      title: '办理意见',
      field: 'dealNote'
    }, {
      title: '开始时间',
      field: 'startDatetime',
      type: 'datetime'
    }, {
      title: '完成时间',
      field: 'endDatetime',
      type: 'datetime'
    }, {
      title: '花费时间',
      field: 'speedTime',
      type: 'datetime'
    }, {
      field: 'status',
      title: '状态',
      type: 'select',
      key: 'notice_status',
      search: true
    }];
    return this.props.buildList({
      fields,
      pageCode: 623535
    });
  }
}

export default Circulationlog;
