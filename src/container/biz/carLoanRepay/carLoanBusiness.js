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
} from '@redux/biz/carLoanBusiness';
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
      title: '业务编号',
      field: 'code',
      search: true
    }, {
      title: '贷款人',
      field: 'name'
    }, {
      title: '手机号',
      field: 'mobile'
    }, {
      title: '车辆',
      field: 'car'
    }, {
      title: '车辆总价',
      field: 'updateDatetime',
      type: 'car_price'
    }, {
      title: '首付金额',
      field: 'sf_amount'
    }, {
      title: '贷款银行',
      field: 'loan_bank'
    }, {
      title: '贷款金额',
      field: 'loan_amount'
    }, {
      title: '银行利率(%)',
      field: 'bank_rate'
    }, {
      title: '期数',
      field: 'periods'
    }, {
      title: '月供',
      field: 'yuegong'
    }, {
      title: '状态',
      field: 'status'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildList({
      fields,
      pageCode: 3133
    });
  }
}

export default Brand;
