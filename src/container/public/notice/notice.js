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
} from '@redux/public/notice';
import { showWarnMsg, showSucMsg, getUserId } from 'common/js/util';
import { listWrapper } from 'common/js/build-list';
import fetch from 'common/js/fetch';

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
      title: '标题'
    }, {
      title: '类型',
      field: 'type',
      required: true,
      type: 'select',
      data: [{
        key: '1',
        value: '提醒'
      }, {
        key: '2',
        value: '通知'
      }, {
        key: '3',
        value: '公告'
      }],
      keyName: 'key',
      valueName: 'value',
      search: true
    }, {
      field: 'status',
      title: '状态',
      type: 'select',
      key: 'notice_status',
      search: true
    }, {
      field: 'updater',
      title: '最近修改人',
      render: (v, data) => {
        return data.sysUser ? data.sysUser.loginName : '';
      }
    }, {
      field: 'updateDatetime',
      title: '最近修改时间',
      type: 'datetime'
    }, {
      field: 'remark',
      title: '备注'
    }];
    return this.props.buildList({
      fields,
      pageCode: 805305,
      btnEvent: {
        edit: (keys, items) => {
          if (!keys || !keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (items[0].status !== '0' && items[0].status !== '2') {
            showWarnMsg('该记录不是待发布状态');
          } else {
            this.props.history.push(`/public/notice/addedit?code=${keys[0]}`);
          }
        },
        back: (keys, items) => {
          if (!keys || !keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (items[0].status !== '1') {
            showWarnMsg('该记录不是已发布状态');
          } else {
            this.back(keys[0]);
          }
        }
      }
    });
  }
}

export default Notice;
