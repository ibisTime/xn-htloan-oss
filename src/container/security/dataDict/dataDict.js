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
} from '@redux/security/dataDict';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.securityDataDict,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class DataDict extends React.Component {
  render() {
    const fields = [{
      field: 'parentKey',
      title: '种类',
      type: 'select',
      listCode: '630036',
      params: {
        type: 0
      },
      keyName: 'dkey',
      valueName: 'dvalue',
      search: true
    }, {
      field: 'dkey',
      title: '字典键'
    }, {
      field: 'dvalue',
      title: '字典值'
    }, {
      field: 'updater',
      title: '更新人'
    },
    {
      field: 'updateDatetime',
      title: '更新时间',
      type: 'datetime'
    },
    {
      field: 'remark',
      title: '备注'
    }];
    return this.props.buildList({
      fields,
      pageCode: 630035,
      rowKey: 'id'
    });
  }
}

export default DataDict;
