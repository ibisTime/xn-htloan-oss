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
} from '@redux/public/banner';
import { listWrapper } from 'common/js/build-list';
import { SYSTEM_CODE } from 'common/js/config';
import { showWarnMsg } from 'common/js/util';
@listWrapper(
  state => ({
    ...state.publicBanner,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Banner extends React.Component {
  render() {
    const fields = [{
      title: '名称',
      field: 'name',
      search: true
    }, {
      title: '位置',
      field: 'location',
      type: 'select',
      key: 'banner_location',
      data: [{
        dkey: 'index_banner',
        dvalue: '首页'
      }],
      search: true
    }, {
      title: '跳转类型',
      field: 'contentType',
      type: 'select',
      data: [{
        key: '1',
        value: '网页'
      }, {
        key: '2',
        value: '车型'
      }, {
        key: '3',
        value: '资讯'
      }],
      keyName: 'key',
      valueName: 'value'
    }, {
      title: '顺序',
      field: 'orderNo'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildList({
      fields,
      pageCode: '805805',
      deleteCode: '805801',
      searchParams: {
        systemCode: SYSTEM_CODE,
        companyCode: SYSTEM_CODE,
        type: 2
      },
      btnEvent: {
        edit: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/public/banner/detail?code=${selectedRowKeys[0]}&contentType=${selectedRows[0].contentType}&brandCode=${selectedRows[0].brandCode}&seriesCode=${selectedRows[0].seriesCode}`);
          }
        },
        detail: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/public/banner/detail?v=1&code=${selectedRowKeys[0]}&contentType=${selectedRows[0].contentType}&brandCode=${selectedRows[0].brandCode}&seriesCode=${selectedRows[0].seriesCode}`);
          }
        }
      }
    });
  }
}

export default Banner;
