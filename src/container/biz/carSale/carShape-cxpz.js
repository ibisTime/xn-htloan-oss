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
} from '@redux/biz/carShape-cxpz';
import {listWrapper} from 'common/js/build-list';
import OnOrDownShelf from 'component/onordownshelf/cxpz';
import {showWarnMsg, getQueryString, showSucMsg} from 'common/js/util';
import {Modal} from 'antd';
import fetch from 'common/js/fetch';
import {lowerFrameSys, onShelfSys} from 'api/biz';

@listWrapper(
    state => ({
        ...state.bizCarSeriesCxpz,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class CarSeriesCxpz extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.carCode = getQueryString('carCode', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '名称',
            field: 'name',
            render: (v, d) => {
                return d.config ? d.config.name : '';
            }
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            searchParams: {
                carCode: this.carCode
            },
            singleSelect: false,
            pageCode: 630448,
            buttons: [{
                code: 'goBack',
                name: '返回',
                check: false,
                handler: (param) => {
                    this.props.history.push(`/biz/carShape`);
                }
            }, {
                code: 'delete',
                name: '删除配置',
                check: true,
                handler: (keys, items) => {
                    console.log(keys);
                    if (!keys || !keys.length) {
                        showWarnMsg('请选择记录');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定删除该配置？`,
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(630444, {
                                    carCode: this.carCode,
                                    configCodeList: items[0].configCode
                                }).then(() => {
                                    this.props.getPageData();
                                    showSucMsg('操作成功');
                                }).catch(() => {
                                    this.props.cancelFetching();
                                });
                            }
                        });
                    }
                }
            }, {
                name: '选择配置',
                handler: (key, item) => {
                    this.props.history.push(`/biz/carShape/xzpz?&carCode=${this.carCode}`);
                }
            }]
        });
    }
}

export default CarSeriesCxpz;
