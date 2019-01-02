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
} from '@redux/wares/category';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import { Button, Upload, Modal } from 'antd';
import { putaway, soldOut } from 'api/biz';

@listWrapper(
  state => ({
    ...state.waresCategory,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Category extends React.Component {
  render() {
    const fields = [{
      title: '名称',
      field: 'name',
      search: true
    }, {
      title: 'UI次序',
      field: 'orderNo'
    }, {
      title: '状态',
      field: 'status',
      search: true,
      type: 'select',
      key: 'status'
    }];
    return this.props.buildList({
      fields,
      pageCode: 808005,
      btnEvent: {
        lower: (key, item) => {
          if (!key || !key.length || !item || !item.length) {
            showWarnMsg('请选择记录');
          } else if (item[0].status !== '1') {
            showWarnMsg('该状态不可下架');
          } else {
            Modal.confirm({
              okText: '确认',
              cancelText: '取消',
              content: '确定下架？',
              onOk: () => {
                this.props.doFetching();
                return soldOut(key[0]).then(() => {
                  this.props.cancelFetching();
                  showWarnMsg('操作成功');
                  setTimeout(() => {
                      this.props.getPageData();
                  }, 500);
                }).catch(() => {
                  this.props.cancelFetching();
                });
              }
            });
          }
        },
        onShelf: (key, item) => {
          if (!key || !key.length || !item || !item.length) {
            showWarnMsg('请选择记录');
          } else if (item[0].status === '1') {
            showWarnMsg('该状态不可上架');
          } else {
            Modal.confirm({
              okText: '确认',
              cancelText: '取消',
              content: '确定上架？',
              onOk: () => {
                this.props.doFetching();
                return putaway(key[0]).then(() => {
                  this.props.cancelFetching();
                  showWarnMsg('操作成功');
                  setTimeout(() => {
                      this.props.getPageData();
                  }, 500);
                }).catch(() => {
                  this.props.cancelFetching();
                });
              }
            });
          }
        },
        edit: (key, item) => {
            console.log(item);
            if (!key || !key.length || !item || !item.length) {
                showWarnMsg('请选择记录');
            } else if (item[0].status === '1') {
                showWarnMsg('下架后才能修改');
            } else {
                this.props.history.push(`/wares/category/addedit?code=${item[0].code}`);
            }
        }
      }
    });
  }
}

export default Category;
