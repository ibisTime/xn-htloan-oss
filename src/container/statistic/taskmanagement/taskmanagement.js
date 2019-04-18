import React from 'react';
import { Modal } from 'antd';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/taskmanagement/taskmanagement';
import { showWarnMsg, showSucMsg, getUserId } from 'common/js/util';
import { listWrapper } from 'common/js/build-list';
import fetch from 'common/js/fetch';
import { complete, tovoid } from 'api/biz';
@listWrapper(
    state => ({
      ...state.taskmanageMent,
      parentCode: state.menu.subMenuCode
    }),
    {
      setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Notice extends React.Component {
  back(code) {
    Modal.confirm({
      okText: '确认',
      cancelText: '取消',
      content: `确认回撤该条公告吗？`,
      onOk: () => {
        this.props.doFetching();
        return fetch(805302, { codeList: [code], updater: getUserId() }).then(data => {
          this.props.getPageData();
          showSucMsg('操作成功');
        }).catch(() => this.props.cancelFetching());
      }
    });
  }
  render() {
    const fields = [{
      field: 'title',
      title: '业务编号'
    }, {
      field: 'title',
      title: '任务名称'
    }, {
      field: 'title',
      title: '限时（h）'
    }, {
      field: 'title',
      title: '发布人'
    }, {
      field: 'title',
      title: '认领人'
    }, {
      field: 'status',
      title: '状态',
      type: 'select',
      key: 'notice_status',
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
      pageCode: 623595,
      btnEvent: {
        // 完成
        complete: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].status === '1') {
            showWarnMsg('已完成的任务不可修改');
          } else {
            Modal.confirm({
              okText: '确认',
              cancelText: '取消',
              content: '确定完成？',
              onOk: () => {
                this.props.doFetching();
                return fetch(623594, {
                  code: selectedRows[0].code
                }).then(() => {
                  this.props.getPageData();
                  showSucMsg('操作成功');
                }).catch(() => {
                  this.props.cancelFetching();
                });
              }
            });
           }
        },
        // 作废
        tovoid: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].status === '0') {
            showWarnMsg('已作废的任务不可修改');
          } else {
            Modal.confirm({
              okText: '确认',
              cancelText: '取消',
              content: '确定作废？',
              onOk: () => {
                this.props.doFetching();
                return fetch(623593, {
                  code: selectedRows[0].code
                }).then(() => {
                  this.props.getPageData();
                  showSucMsg('操作成功');
                }).catch(() => {
                  this.props.cancelFetching();
                });
              }
            });
          }
        }
      }
    });
  }
}

export default Notice;
