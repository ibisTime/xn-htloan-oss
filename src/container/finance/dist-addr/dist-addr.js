import React from 'react';
import { Modal } from 'antd';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/finance/dist-addr';
import { listWrapper } from 'common/js/build-list';
import { COMPANY_CODE } from 'common/js/config';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import ModalDetail from 'common/js/build-modal-detail';
import fetch from 'common/js/fetch';

@listWrapper(
  state => ({
    ...state.financeDistAddr,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class DistAddr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  render() {
    const fields = [{
      title: '地址',
      field: 'address',
      search: true
    }, {
      title: '拥有者',
      field: 'userId',
      type: 'select',
      pageCode: '805120',
      params: { kind: 'C', companyCode: COMPANY_CODE },
      keyName: 'userId',
      valueName: '{{mobile.DATA}}--{{nickname.DATA}}',
      searchName: 'mobile',
      formatter: (v, data) => {
        if (data.user) {
          return data.user.mobile + '--' + data.user.nickname;
        }
      },
      search: true
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: true,
      data: [{
        dkey: '0',
        dvalue: '启用'
      }, {
        dkey: '2',
        dvalue: '弃用'
      }],
      search: true
    }, {
      title: '当前余额',
      field: 'balanceString',
      amount: true
    }];
    const options = {
      fields: [{
        title: '阈值',
        field: 'balanceStart',
        required: true,
        positive: true
      }],
      buttons: [{
        title: '确认',
        check: true,
        type: 'primary',
        handler: (params, doFetching, cancelFetching) => {
          Modal.confirm({
            okText: '确认',
            cancelText: '取消',
            content: '所有余额大于' + params.balanceStart + '的地址都将进行归集，确定进行操作吗？',
            onOk: () => {
              doFetching();
              return fetch(802110, params).then(() => {
                showSucMsg('操作成功');
                cancelFetching();
                this.setState({visible: false});
              }).catch(cancelFetching);
            }
          });
        }
      }]
    };
    return (
      <div>
        {
          this.props.buildList({
            fields,
            pageCode: 802105,
            searchParams: {
              type: 'X',
              companyCode: COMPANY_CODE
            },
            btnEvent: {
              diviLedger: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/finance/diviAddress/ledger?address=${selectedRows[0].address}`);
                }
              },
              shoudongGuiji: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.setState({ visible: true });
                }
              }
            }
          })
        }
        <ModalDetail
          title='设置阈值'
          visible={this.state.visible}
          hideModal={() => this.setState({visible: false})}
          options={options}></ModalDetail>
      </div>
    );
  }
}

export default DistAddr;
