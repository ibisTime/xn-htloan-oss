import React from 'react';
import { setTableData, setPagination, setBtnList, setSearchParam,
  clearSearchParam, doFetching, cancelFetching, setSearchData } from '@redux/credit/tbcheck';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';

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
      title: '查询时间',
      field: 'foundDatetime',
      type: 'datetime'
    }, {
      title: '姓名',
      field: 'customerName',
      search: true
    }, {
      title: '身份证',
      field: 'userId'
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'lmzx_status',
      search: true
    }];
    return this.props.buildList({
      fields,
      rowKey: 'id',
      searchParams: {
        bizType: 'taobao_report',
        token: ''
      },
      pageCode: 632947,
      btnEvent: {
        // 发起查询
        add: () => {
          this.props.history.push('/credit/tbcheck/query');
        },
        // 详情
        detail: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].status !== '2') {
            showWarnMsg('该记录还在查询中');
          } else {
            this.props.history.push(`/credit/tbcheck/report?id=${selectedRowKeys[0]}`);
          }
        }
      }
    });
  }
}

export default TbCheck;
