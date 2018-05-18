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
} from '@redux/finance/enchashments';
import { listWrapper } from 'common/js/build-list';
import { dateTimeFormat, showWarnMsg } from 'common/js/util';
import EnchashmentHuilu from 'component/enchashment-huilu/enchashment-huilu';

@listWrapper(
  state => ({
    ...state.financeEnchashments,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Enchashments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeList: [],
      visible: false
    };
  }
  setModalVisible = (visible) => {
    this.setState({ visible });
  }
  render() {
    const fields = [{
      field: 'code',
      title: '编号'
    }, {
      field: 'type',
      title: '角色类型',
      type: 'select',
      key: 'account_type',
      search: true
    }, {
      field: 'payCardInfo',
      title: '银行类型'
    }, {
      field: 'payCardNo',
      title: '银行卡号'
    }, {
      field: 'accountName',
      title: '户名',
      search: true
    }, {
      field: 'amount',
      title: '取现金额',
      amount: true
    }, {
      field: 'status',
      title: '状态',
      type: 'select',
      key: 'withdraw_status',
      search: true
    }, {
      field: 'applyUser',
      title: '申请人'
    }, {
      field: 'applyDatetime',
      title: '申请时间',
      type: 'date',
      rangedate: ['applyDateStart', 'applyDateEnd'],
      render: dateTimeFormat,
      search: true
    }, {
      field: 'approveDatetime',
      title: '审核时间',
      type: 'date',
      rangedate: ['approveDateStart', 'approveDateEnd'],
      render: dateTimeFormat,
      search: true
    }, {
      field: 'payDatetime',
      title: '回录时间',
      type: 'date',
      rangedate: ['payDateStart', 'payDateEnd'],
      render: dateTimeFormat,
      search: true
    }];
    return (
      <div>
        {this.props.buildList({
          fields,
          pageCode: 802755,
          searchParams: {
            channelType: 90
          }
        })}
        <EnchashmentHuilu
          visible={this.state.visible}
          codeList={this.state.codeList}
          setModalVisible={this.setModalVisible} />
      </div>
    );
  }
}

export default Enchashments;
