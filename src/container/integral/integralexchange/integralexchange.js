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
} from '@redux/integral/integralexchange';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import { Button, Upload, Modal } from 'antd';
import { lowerFrame, onShelf } from 'api/biz';

@listWrapper(
  state => ({
    ...state.bizIntegralexchange,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Integralexchange extends React.Component {
  render() {
    const fields = [{
      title: '项目',
      field: 'remark',
      search: true
    }, {
      title: '规则分类',
      field: '11',
      render: (v, d) => {
        return '积分兑换规则';
      }
    }, {
      title: '数值',
      field: 'cvalue',
      amount: true
    }];
    return this.props.buildList({
      fields,
      pageCode: 630045,
      searchParams: {
        type: 'jf_exchange'
      }
    });
  }
}

export default Integralexchange;
