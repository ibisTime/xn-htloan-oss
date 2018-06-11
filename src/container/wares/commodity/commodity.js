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
} from '@redux/wares/commodity';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, showSucMsg} from 'common/js/util';
import {Button, Upload, Modal} from 'antd';
import {goodsputaway, goodssoldOut} from 'api/biz';
import UpDown from 'component/up-down/up-down';

@listWrapper(
    state => ({
        ...state.waresCommodity,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Commodity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updownVisible: false,
            code: ''
        };
    }

    setModalVisible = (updownVisible) => {
        this.setState({updownVisible});
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
            title: '类别',
            field: 'type',
            type: 'select',
            listCode: '808007',
            keyName: 'code',
            valueName: 'name',
            search: true
        }, {
            title: '原价',
            amount: true,
            field: 'originalPrice'
        }, {
            title: '现价',
            field: 'price',
            amount: true
        }, {
            title: '最低购买信用分',
            field: 'creditScore'
        }, {
            field: 'location',
            title: 'UI位置',
            type: 'select',
            data: [{
                key: '0',
                value: '普通'
            }, {
                key: '1',
                value: '首页推荐'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            field: 'orderNo',
            title: 'UI次序'
        }, {
            title: '状态',
            field: 'status',
            search: true,
            type: 'select',
            key: 'product_status'
        }, {
            title: '最新修改人',
            field: 'updater'
        }, {
            title: '最新修改时间',
            field: 'updateDatetime',
            type: 'datetime'
        }, {
            title: '备注',
            field: 'remark'
        }];
        const btnEvent = {
            lower: (key, item) => {
                if (!key || !key.length || !item || !item.length) {
                    showWarnMsg('请选择记录');
                } else if (item[0].status !== '3') {
                    showWarnMsg('该状态不可下架');
                } else {
                    Modal.confirm({
                        okText: '确认',
                        cancelText: '取消',
                        content: '确定下架？',
                        onOk: () => {
                            this.props.doFetching();
                            return goodssoldOut(key[0]).then(() => {
                                this.props.cancelFetching();
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
            onShelf: (keys, items) => {
                if (!keys || !keys.length || !items || !items.length) {
                    showWarnMsg('请选择记录');
                } else if (items[0].status !== '1' && items[0].status !== '4') {
                    showWarnMsg('该状态不可上架');
                } else {
                    this.setState({
                        code: keys[0],
                        updownVisible: true
                    });
                }
            }
        };
        return (
            <div>
                {this.props.buildList({
                    fields,
                    btnEvent,
                    pageCode: 808025
                })}
                <UpDown code={this.state.code} biz='808013' updownVisible={this.state.updownVisible}
                        setModalVisible={this.setModalVisible}/>
            </div>
        );
    }
}

export default Commodity;
