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
} from '@redux/public/notice';
import { showSucMsg, showWarnMsg } from 'common/js/util';
import { listWrapper } from 'common/js/build-list';
import { SYSTEM_CODE } from 'common/js/config';

@listWrapper(
  state => ({
    ...state.publicNotice,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Notice extends React.Component {
  render() {
    const fields = [{
      title: '标题',
      field: 'smsTitle'
    }, {
      title: '针对人群',
      field: 'toKind',
      search: true,
      type: 'select',
      key: 'user_kind'
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'notice_status',
      search: true
    }, {
      title: '最近修改的人',
      field: 'updater'
    }, {
      title: '最近修改时间',
      field: 'updateDatetime'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildList({
      fields,
      pageCode: 630015,
      searchParams: {
        channelType: '4'
        // fromSystemCode: SYSTEM_CODE
      },
      btnEvent: {
        edit2: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`"notice_addedit.html?id=" + t[0].id + "&code=" + t[0].id`);
          }
        },
        push: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.setState({ visible: true });
          }
        }
      }
    });
  }
}

export default Notice;
