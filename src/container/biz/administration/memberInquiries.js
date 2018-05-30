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
} from '@redux/biz/memberInquiries';
import { showSucMsg, showWarnMsg } from 'common/js/util';
import { listWrapper } from 'common/js/build-list';
import { activateUser } from 'api/user';

@listWrapper(
  state => ({
    ...state.bizMemberInquiries,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class MemberInquiries extends React.Component {
  render() {
    const fields = [{
      title: '手机号',
      field: 'mobile'
    }, {
      title: '姓名',
      field: 'realName',
      search: true
    }, {
      title: '身份证',
      field: 'idNo'
    }, {
      title: '状态',
      field: 'status',
      search: true,
      type: 'select',
      key: 'user_status'
    }, {
      title: '备注',
      field: 'ramark'
    }];
    return this.props.buildList({
      fields,
      rowKey: 'userId',
      pageCode: 805120,
      btnEvent: {
        rock: (keys, items) => {
          if (!keys || !keys.length || !items || !items.length) {
            showWarnMsg('请选择记录');
          } else {
            Modal.confirm({
              okText: '确认',
              cancelText: '取消',
              content: `确认${items[0].status === '0' ? '注销' : '激活'}用户？`,
              onOk: () => {
                this.props.doFetching();
                return activateUser(keys[0]).then(() => {
                  this.props.getPageData();
                  showWarnMsg('操作成功');
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

export default MemberInquiries;
