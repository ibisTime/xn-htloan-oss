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
} from '@redux/biz/memberInquiries';
import { showSucMsg, showWarnMsg } from 'common/js/util';
import { listWrapper } from 'common/js/build-list';
import { SYSTEM_CODE } from 'common/js/config';

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
      title: '用户编号',
      field: 'userId'
    }, {
      title: '手机号',
      field: 'mobile'
    }, {
      title: '推荐人',
      field: 'refereeMobile'
    }, {
      title: '姓名',
      field: 'realName',
      search: true
    }, {
      title: '身份证',
      field: 'idNo'
    }, {
      title: '积分余额',
      field: ''
    }, {
      title: '账户余额',
      field: ''
    }, {
      title: '信用分',
      field: ''
    }, {
      title: '状态',
      search: true,
      type: 'select'
    }, {
      title: '备注',
      field: 'ramark'
    }];
    return this.props.buildList({
    });
  }
}

export default MemberInquiries;