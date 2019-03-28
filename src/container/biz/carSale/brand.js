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
import { showWarnMsg, getUserName } from 'common/js/util';
import { Modal } from 'antd';
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
      search: true,
      data: [{
        key: 'A',
        value: 'A'
      }, {
        key: 'B',
        value: 'B'
      }, {
        key: 'C',
        value: 'C'
      }, {
        key: 'D',
        value: 'D'
      }, {
        key: 'E',
        value: 'E'
      }, {
        key: 'F',
        value: 'F'
      }, {
        key: 'G',
        value: 'G'
      }, {
        key: 'H',
        value: 'H'
      }, {
        key: 'I',
        value: 'I'
      }, {
        key: 'J',
        value: 'J'
      }, {
        key: 'K',
        value: 'K'
      }, {
        key: 'L',
        value: 'L'
      }, {
        key: 'M',
        value: 'M'
      }, {
        key: 'N',
        value: 'N'
      }, {
        key: 'O',
        value: 'O'
      }, {
        key: 'P',
        value: 'P'
      }, {
        key: 'Q',
        value: 'Q'
      }, {
        key: 'R',
        value: 'R'
      }, {
        key: 'S',
        value: 'S'
      }, {
        key: 'T',
        value: 'T'
      }, {
        key: 'U',
        value: 'U'
      }, {
        key: 'V',
        value: 'V'
      }, {
        key: 'W',
        value: 'W'
      }, {
        key: 'X',
        value: 'X'
      }, {
        key: 'Y',
        value: 'Y'
      }, {
        key: 'Z',
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
      title: '是否推荐',
      search: true,
      type: 'select',
      field: 'isReferee',
      data: [{
        key: '0',
        value: '否'
      }, {
        key: '1',
        value: '是'
      }],
      keyName: 'key',
      valueName: 'value'
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
        },
        edit: (key, item) => {
            console.log(item);
            if (!key || !key.length || !item || !item.length) {
                showWarnMsg('请选择记录');
            } else if (item[0].status === '1') {
                showWarnMsg('下架后才能修改');
            } else {
                this.props.history.push(`/biz/brand/addedit?code=${item[0].code}`);
            }
        }
      }
    });
  }
}

export default Brand;
