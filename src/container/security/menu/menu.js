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
} from '@redux/security/menu';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
  state => ({
    ...state.securityMenu,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Menu extends React.Component {
  render() {
    const fields = [{
      title: '菜单名称',
      field: 'name',
      search: true
    }, {
      title: '菜单url',
      field: 'url'
    }, {
      title: '父菜单编号',
      field: 'parentCode',
      type: 'select',
      listCode: '630016',
      params: { type: 1 },
      keyName: 'code',
      valueName: '{{code.DATA}} {{name.DATA}}',
      search: true
    }, {
      title: '类型',
      field: 'type',
      type: 'select',
      data: [{
        dkey: '1',
        dvalue: '菜单'
      }, {
        dkey: '2',
        dvalue: '按钮'
      }],
      keyName: 'dkey',
      valueName: 'dvalue',
      search: true
    }, {
      title: '菜单顺序',
      field: 'orderNo'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildList({ fields, pageCode: 630015, deleteCode: 630011 });
  }
}

export default Menu;
