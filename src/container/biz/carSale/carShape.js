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
} from '@redux/biz/carShape';
import { listWrapper } from 'common/js/build-list';
import OnOrDownShelf from 'component/onordownshelf/onordownshelf';
import { showWarnMsg, showSucMsg, moneyFormat } from 'common/js/util';
import { Modal } from 'antd';
import { lowerFrameShape } from 'api/biz';

@listWrapper(
  state => ({
    ...state.bizCarShape,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class CarShape extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelfVisible: false,
      selectKey: ''
    };
    this.arr = {
        '0': '首页推荐',
        '1': '普通'
    };
  }
  setShelfVisible = (shelfVisible) => {
    this.setState({ shelfVisible });
    setTimeout(() => {
        this.props.getPageData();
    }, 500);
  }
  render() {
    const fields = [{
      title: '名称',
      field: 'name',
      search: true
    }, {
      title: '品牌',
      field: 'brandCode',
      search: true,
      type: 'select',
      listCode: 630406,
      keyName: 'code',
      valueName: 'name'
    }, {
      title: '车系',
      field: 'seriesCode',
      search: true,
      type: 'select',
      listCode: 630416,
      keyName: 'code',
      valueName: 'name'
    }, {
      title: '厂商指导价',
      amount: true,
      field: 'originalPrice',
      render: (v, d) => {
        return moneyFormat(v, '', d.originalPrice);
      }
    }, {
      title: '经销商参考价',
      amount: true,
      field: 'salePrice',
      render: (v, d) => {
          return moneyFormat(v, '', d.salePrice);
      }
    }, {
      field: 'location',
      title: 'UI位置',
      render: (v, d) => {
          return this.arr[v];
      }
    }, {
      title: 'UI次序',
      field: 'orderNo',
      search: true,
      key: 'order_no'
    }, {
      title: '状态',
      field: 'status',
      search: true,
      type: 'select',
      key: 'status'
    }, {
      title: '最新修改人',
      field: 'updaterName'
    }, {
      title: '最新修改时间',
      field: 'updateDatetime',
      type: 'datetime'
    }, {
      title: '备注',
      field: 'remark'
    }];
    const btnEvent = {
      lowerShe: (key, item) => {
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
              return lowerFrameShape(key[0]).then(() => {
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
      onShelfShe: (key, item) => {
        if (!key || !key.length || !item || !item.length) {
          showWarnMsg('请选择记录');
        } else if (item[0].status === '1') {
          showWarnMsg('该状态不可上架');
        } else {
          this.setState({
            selectKey: key[0],
            shelfVisible: true
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
              this.props.history.push(`/biz/carShape/addedit?code=${item[0].code}`);
          }
      },
      detail: (key, item) => {
        console.log(item);
        if (!key || !key.length || !item || !item.length) {
          showWarnMsg('请选择记录');
        } else {
          this.props.history.push(`/biz/carShape/addedit?v=1&code=${item[0].code}`);
        }
      },
      cxpz: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/biz/carShape/cxpz?code=${selectedRows[0].code}&carCode=${selectedRows[0].code}`);
        }
      }
    };
    return (
      <div>
        {this.props.buildList({
          fields,
          btnEvent,
          rowKey: 'carCode',
          pageCode: 630425
        })}
        <OnOrDownShelf
          selectKey={this.state.selectKey}
          addCode={630423}
          onOk={this.props.getPageData}
          shelfVisible={this.state.shelfVisible}
          setShelfVisible={this.setShelfVisible} />
      </div>
    );
  }
}

export default CarShape;
