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
import {listWrapper} from 'common/js/build-list';
import OnOrDownShelf from 'component/onordownshelf/cxpz';
import {showWarnMsg, showSucMsg, getQueryString} from 'common/js/util';
import {Modal} from 'antd';
import {lowerFrameSys, onShelfSys} from 'api/biz';
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
        this.code = getQueryString('code', this.props.location.search);
        this.carCode = getQueryString('carCode', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
            buttons: []
        };
    }

    render() {
        const fields = [{
            title: '配置名称',
            field: 'name'
        }];
        return this.props.buildList({
            fields,
            pageCode: 630445,
            singleSelect: false,
            buttons: [{
                code: 'goBack',
                name: '返回',
                check: false,
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }, {
                name: '保存',
                check: true,
                handler: (keys, items) => {
                    console.log(items);
                    if (!keys || !keys.length) {
                        showWarnMsg('请选择记录');
                    } else {
                        let carCodeList = [];
                        fetch(630448, {
                            carCode: this.carCode
                        }).then((carCodeList) => {
                            for(let i = 0, len = carCodeList.length; i < len; i++) {
                                console.log(carCodeList[i].configCode);
                                if(carCodeList[i].configCode === keys[0]) {
                                    showWarnMsg('当前车型已有' + carCodeList[i].config.name + '配置');
                                    carCodeList = [];
                                    return;
                                }
                                    carCodeList.push(carCodeList[i].configCode);
                                }
                                   if (carCodeList !== keys[0]) {
                                       Modal.confirm({
                                           okText: '确认',
                                           cancelText: '取消',
                                           content: `确定配置？`,
                                           onOk: () => {
                                               this.props.doFetching();
                                               return fetch(630443, {
                                                   carCode: this.carCode,
                                                   configCodeList: keys
                                               }).then(() => {
                                                   this.props.getPageData();
                                                   showSucMsg('操作成功');
                                               }).catch(() => {
                                                   this.props.cancelFetching();
                                               });
                                           }
                                       });
                                   }
                                // carCodeList.push(carCodeList[i]);
                            });
                    }
                }
            }]
        });
    }
}

export default CarSeries;
