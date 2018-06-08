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
import { Button, Upload, Modal } from 'antd';
import { lowerFrame, onShelf } from 'api/biz';

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
      key: 'status'
    }, {
      title: '最新修改人',
      field: 'updater'
    }, {
      title: '最新修改时间',
      field: 'updateDatetime',
      type: 'datetime'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildList({
      fields,
      pageCode: 630405,
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
                return lowerFrame(key[0]).then(() => {
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
                return onShelf(key[0]).then(() => {
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
        }
      }
    });
  }
}

export default Brand;
