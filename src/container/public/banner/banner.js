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
// import { COMPANY_CODE } from 'common/js/config';

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
      title: '图片',
      field: ''
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
      title: '顺序',
      field: 'orderNo'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildList({
      fields,
      pageCode: 630005,
      deleteCode: 630011,
      searchParams: {
        // companyCode: COMPANY_CODE,
        type: 2
      }
    });
  }
}

export default Banner;
