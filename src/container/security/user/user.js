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
} from '@redux/security/user';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';
import { activateSysUser } from 'api/user';

@listWrapper(
  state => ({
    ...state.securityUser,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class User extends React.Component {
  render() {
    const fields = [{
      title: '用户名',
      field: 'keyword',
      search: true,
        render: (v, data) => {
          return data.loginName;
        }
    }, {
        title: '真实姓名',
        field: 'realName',
        required: true
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'user_status'
    }, {
      title: '角色',
      field: 'roleCode',
      type: 'select',
      listCode: '630006',
      keyName: 'code',
      valueName: 'name',
      search: true
    }, {
      title: '公司',
      field: 'companyName'
    }, {
      title: '部门',
      field: 'departmentName'
    }, {
      title: '岗位',
      field: 'postName'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildList({
      fields,
      pageCode: 630065,
      rowKey: 'userId',
      btnEvent: {
        reset: (keys, items) => {
          if (!keys || !keys.length || !items || !items.length) {
            showWarnMsg('请选择记录');
          } else {
            this.props.history.push(`/system/user/pwd_reset?userId=${keys[0]}`);
          }
        },
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
                return activateSysUser(keys[0]).then(() => {
                  this.props.getPageData();
                  showWarnMsg('操作成功');
                }).catch(() => {
                  this.props.cancelFetching();
                });
              }
            });
          }
        },
        assign: (keys, items) => {
          if (!keys || !keys.length || !items || !items.length) {
            showWarnMsg('请选择记录');
          } else {
            this.props.history.push(`/system/user/role?userId=${keys[0]}`);
          }
        },
        addPost: (keys, item) => {
          if (!keys || !keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/system/user/post?userId=${keys[0]}`);
          }
        }
      }
    });
  }
}

export default User;
