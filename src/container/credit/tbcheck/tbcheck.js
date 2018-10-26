import React from 'react';
import { setTableData, setPagination, setBtnList, setSearchParam,
  clearSearchParam, doFetching, cancelFetching, setSearchData } from '@redux/credit/tbcheck';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
  state => ({
    ...state.creditTbCheck,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class TbCheck extends React.Component {
    render() {
      const fields = [{
        title: '序号',
        field: 'id'
      }, {
        title: '名称',
        field: 'name'
      }, {
        title: '份数',
        field: 'number'
      }, {
        title: '更新时间',
        field: 'updateDatetime',
        type: 'date'
      }, {
        title: '更新人',
        field: 'updaterName'
      }];
      return this.props.buildList({
        fields,
        rowKey: 'id',
        searchParams: { bizType: 'taobao_report' },
        pageCode: 632947
      });
    }
  }

  export default TbCheck;
