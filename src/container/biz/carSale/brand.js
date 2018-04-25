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
} from '@redux/biz/brand';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import { Button, Upload } from 'antd';

@listWrapper(
  state => ({
    ...state.bizBrand,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Brand extends React.Component {
  render() {
    const fields = [{
      title: '名称',
      field: 'name',
      search: true
    }, {
      title: '字母顺序',
      field: 'letter'
    }, {
      title: '状态',
      field: 'status',
      search: true,
      type: 'select',
      data: [{
        key: 0,
        value: '待上架'
      }, {
        key: 1,
        value: '已上架'
      }, {
        key: 2,
        value: '已下架'
      }],
      keyName: 'key',
      valueName: 'value'
    }, {
      title: '最新修改人',
      field: 'updater'
    }, {
      title: '最新修改时间',
      field: 'updateDatetime'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildList({
      fields,
      pageCode: 630405,
      addCode: 630400,
      editCode: 630403,
      btnEvent: {
        onShelf: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (this.options.singleSelect && selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.doFetching();
            fetch(630403, selectedRowKeys[0], selectedRows.updater, selectedRows.remark).then(() => {
              showSucMsg('上架成功');
              this.props.cancelFetching();
            }).catch(this.props.cancelFetching);
          }
        },
        downShelf: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (this.options.singleSelect && selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.doFetching();
            fetch(630404, selectedRowKeys[0], selectedRows.updater, selectedRows.remark).then(() => {
              showSucMsg('下架成功');
              this.props.cancelFetching();
            }).catch(this.props.cancelFetching);
          }
        }
      }
    });
  }
}

export default Brand;
