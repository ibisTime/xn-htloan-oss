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
} from '@redux/finance/enchashmentRule';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
  state => ({
    ...state.financeEnchashmentRule,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class EnchashmentRule extends React.Component {
  render() {
    const fields = [{
      field: 'remark',
      title: '规则名称'
    }, {
      field: 'ckey',
      title: '参数'
    }, {
      field: 'cvalue',
      title: '数值'
    }, {
      field: 'updater',
      title: '最近修改人'
    }, {
      field: 'updateDatetime',
      title: '最近修改时间',
      type: 'datetime'
    }];
    return this.props.buildList({
      fields,
      pageCode: 630045,
      rowKey: 'id',
      searchParams: {
        type: 3
      }
    });
  }
}

export default EnchashmentRule;
