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
} from '@redux/circulationLog/lala';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg, getQueryString } from 'common/js/util';
import {getNodeList} from 'api/menu';

@listWrapper(
  state => ({
    ...state.lala,
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
    this.code = getQueryString('code', this.props.location.search);
    this.state = {
      nodeDict: null,
      bizCode: ''
    };
    this.buttons = [{
      name: '返回',
      handler: () => {
        this.props.history.go(-1);
      }
    }];
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
      render: (v, d) => {
        return `${v}(${d.operatorMobile})`;
      }
    }, {
      title: '节点名称',
      field: 'dealNode',
      type: 'select',
      listCode: 630147,
      keyName: 'code',
      valueName: 'name'
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
      pageCode: 623535,
      searchParams: {
        bizCode: this.code ? this.code : this.state.bizCode
      },
      buttons: this.buttons
    });
  }
}

export default Circulationlog;
