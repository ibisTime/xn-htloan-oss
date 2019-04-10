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
} from '@redux/biz/carSeries';
import { listWrapper } from 'common/js/build-list';
import OnOrDownShelf from 'component/onordownshelf/onordownshelf';
import { showWarnMsg, showSucMsg, moneyFormat } from 'common/js/util';
import { Modal } from 'antd';
import { lowerFrameSys, onShelfSys } from 'api/biz';
@listWrapper(
  state => ({
    ...state.bizCarSeries,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class CarSeries extends React.Component {
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
      field: 'name'
    }, {
      title: '品牌',
      field: 'brandCode',
      type: 'select',
      listCode: 630406,
      keyName: 'code',
      valueName: 'name',
      search: true
    }, {
      field: 'level',
      title: '级别',
      required: true,
      type: 'select',
      data: [{
        key: '0',
        value: 'SUV'
      }, {
        key: '1',
        value: '轿车'
      }, {
        key: '2',
        value: 'MPV'
      }, {
        key: '3',
        value: '跑车'
      }, {
        key: '4',
        value: '皮卡'
      }, {
        key: '5',
        value: '房车'
      }],
      keyName: 'key',
      valueName: 'value'
    }, {
      field: 'picNumber',
      title: '照片张数(广告图) ',
      required: true,
      number: true
    }, {
      title: '状态',
      field: 'status',
      search: true,
      type: 'select',
      key: 'status'
    }, {
      field: 'lowest',
      title: '价格区间(最低价-最高价)',
      render: (v, d) => {
        return moneyFormat(d.lowest) + '元-' + moneyFormat(d.highest) + '元';
    }
    }, {
      field: 'location',
      title: 'UI位置',
      render: (v, d) => {
        return this.arr[d.location];
      }
    }, {
      title: 'UI次序',
      field: 'orderNo',
      key: 'order_no'
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
      lowerSys: (key, item) => {
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
              return lowerFrameSys(key[0]).then(() => {
                this.props.getPageData();
                  showSucMsg('操作成功');
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
      onShelfSys: (key, item) => {
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
              this.props.history.push(`/biz/carSeries/addedit?code=${item[0].code}`);
          }
      }
    };
    return (
      <div>
        {this.props.buildList({
          fields,
          btnEvent,
          pageCode: 630415
        })}
        <OnOrDownShelf
          selectKey={this.state.selectKey}
          addCode={630413}
          onOk={this.props.getPageData}
          shelfVisible={this.state.shelfVisible}
          setShelfVisible={this.setShelfVisible} />
      </div>
    );
  }
}

export default CarSeries;
