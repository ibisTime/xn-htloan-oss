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
      field: 'letter',
      type: 'select',
      data: [{
        key: '0',
        value: 'A'
      }, {
        key: '1',
        value: 'B'
      }, {
        key: '2',
        value: 'C'
      }, {
        key: '3',
        value: 'D'
      }, {
        key: '4',
        value: 'E'
      }, {
        key: '5',
        value: 'F'
      }, {
        key: '6',
        value: 'G'
      }, {
        key: '7',
        value: 'H'
      }, {
        key: '8',
        value: 'I'
      }, {
        key: '9',
        value: 'G'
      }, {
        key: '10',
        value: 'K'
      }, {
        key: '11',
        value: 'L'
      }, {
        key: '12',
        value: 'M'
      }, {
        key: '13',
        value: 'N'
      }, {
        key: '14',
        value: 'O'
      }, {
        key: '15',
        value: 'P'
      }, {
        key: '16',
        value: 'Q'
      }, {
        key: '17',
        value: 'L'
      }, {
        key: '18',
        value: 'S'
      }, {
        key: '19',
        value: 'T'
      }, {
        key: '20',
        value: 'U'
      }, {
        key: '21',
        value: 'V'
      }, {
        key: '22',
        value: 'W'
      }, {
        key: '23',
        value: 'X'
      }, {
        key: '24',
        value: 'Y'
      }, {
        key: '25',
        value: 'Z'
      }],
      keyName: 'key',
      valueName: 'value'
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
                  this.props.getPageData();
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
                  this.props.getPageData();
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
