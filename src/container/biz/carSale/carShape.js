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
      field: 'version',
      title: '规格',
      required: true,
      type: 'select',
      // 1 中东 2 美规 3 加规 4 墨版 5 欧规
      data: [{
        key: '1',
        value: '中东'
      }, {
        key: '2',
        value: '美规'
      }, {
        key: '3',
        value: '加规'
      }, {
        key: '4',
        value: '墨版'
      }, {
        key: '5',
        value: '欧规'
      }],
      keyName: 'key',
      valueName: 'value'
    }, {
      field: 'structure',
      type: 'select',
      title: '结构',
      required: true,
      data: [{
        key: '1',
        value: '两厢'
      }, {
        key: '2',
        value: '三厢'
      }, {
        key: '3',
        value: '掀背'
      }, {
        key: '4',
        value: '旅行版'
      }, {
        key: '5',
        value: '硬顶敞篷'
      }, {
        key: '6',
        value: '软顶敞篷 '
      }, {
        key: '7',
        value: '硬顶跑车'
      }],
      keyName: 'key',
      valueName: 'value'
    }, {
      field: 'displacement',
      title: '排量(L)',
      number: true,
      render: (v, d) => {
       return d.displacement + 'L';
    },
      required: true
    }, {
      field: 'fromPlace',
      title: '车源地',
      required: true
    }, {
      field: 'fwAmount',
      title: '服务费',
      amount: true,
      required: true
    }, {
      field: 'procedure',
      title: '手续 ',
      required: true
    }, {
      title: '售价',
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
      key: 'order_no'
    }, {
      title: '状态',
      field: 'status',
      search: true,
      type: 'select',
      key: 'status'
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
              return lowerFrameShape(item[0].code).then(() => {
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
      onShelfShe: (key, item) => {
        if (!key || !key.length || !item || !item.length) {
          showWarnMsg('请选择记录');
        } else if (item[0].status === '1') {
          showWarnMsg('该状态不可上架');
        } else {
          this.setState({
            selectKey: item[0].code,
            shelfVisible: true
          });
        }
      },
      add: (key, item) => {
          this.props.history.push(`/biz/carShape/add`);
        },
      edit: (key, item) => {
          if (!key || !key.length || !item || !item.length) {
              showWarnMsg('请选择记录');
          } else if (item[0].status === '1') {
              showWarnMsg('下架后才能修改');
          } else {
            this.props.history.push(`/biz/carShape/add?code=${item[0].code}`);
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
          // rowKey: 'carCode',
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
