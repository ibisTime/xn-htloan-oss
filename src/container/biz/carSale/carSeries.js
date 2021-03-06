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
import { showWarnMsg, showSucMsg, moneyFormat, getUserId } from 'common/js/util';
import { Modal, message } from 'antd';
import { lowerFrameSys, onShelfSys } from 'api/biz';
import fetch from 'common/js/fetch';
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
        title: '类型',
        field: 'type',
        data: [
            {
                key: '1',
                name: '接口导入'
            },
            {
                key: '2',
                name: '用户新增'
            }
        ],
        type: 'select',
        keyName: 'key',
        valueName: 'name'
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
          if (!key || !key.length || !item || !item.length) {
              showWarnMsg('请选择记录');
          } else if (item[0].status === '1') {
              showWarnMsg('下架后才能修改');
          } else {
              this.props.history.push(`/biz/carSeries/addedits?code=${item[0].code}`);
          }
      },
      refresh: () => {
          let hasMsg = message.loading('正在努力刷新中...', 100);
          let config = {
            updater: getUserId()
          };
          fetch(630418, config).then(() => {
              hasMsg();
              this.props.getPageData();
          }, hasMsg);
      },
      // 刷新该车系下车型
      refreshShape: (key, item) => {
          if (!key || !key.length || !item || !item.length) {
              showWarnMsg('请选择车系');
          } else if (key.length > 1) {
              showWarnMsg('最多选择1个车系');
          } else {
              let hasMsg = message.loading('正在努力刷新中...', 100);
              let config = {
                updater: getUserId(),
                seriesId: item[0].seriesId
              };
              fetch(630419, config).then(() => {
                  hasMsg();
                  this.props.getPageData();
              }, hasMsg);
          }
      }
    };
    return (
      <div>
        {this.props.buildList({
          fields,
          btnEvent,
          pageCode: 630415,
          deleteCode: 630411
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
