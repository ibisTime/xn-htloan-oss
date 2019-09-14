import React from 'react';
import {
  cancelFetching,
  clearSearchParam,
  doFetching,
  setBtnList,
  setPagination,
  setSearchData,
  setSearchParam,
  setTableData
} from '@redux/circulationLog/circulationLog';
import {listWrapper} from 'common/js/build-list';
import {showSucMsg, showWarnMsg} from 'common/js/util';
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
      field: 'bizCode1',
      title: '业务编号',
      render: (value, data) => {
        return data.bizCode;
      }
    }, {
      field: 'bizCode',
      type: 'select',
      search: true,
      listCode: 632517,
      valueName: '{{code.DATA}}',
      keyName: 'code',
      title: '业务编号',
      hidden: true
    }, {
      title: '经办人',
      field: 'operatorName',
      render: (v, d) => {
        return `${v}(${d.operatorMobile})`;
      }
    }, {
      title: '节点名称',
      field: 'dealNode',
      type: 'select',
      listCode: 630147,
      keyName: 'code',
      valueName: 'name',
      search: true
    }, {
      title: '操作说明',
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
      title: '花费时间(小时)',
      field: 'speedTime'
    }];
    return this.props.buildList({
      fields,
      pageCode: 623535
    });
  }
}

export default Circulationlog;
