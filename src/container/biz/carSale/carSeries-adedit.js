import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/carSeries-addedit';
import { getQueryString, moneyFormat, showSucMsg, getUserId } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';
@DetailWrapper(
    state => state.bizCarSeriesAddEdit,
    { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class CarSeriesAddEdit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.buttons = [{
            title: '保存',
            handler: (params) => {
                params.picNumber = params.advPic.split('||').length;
                params.updater = getUserId();
                    fetch(630412, params).then(() => {
                        showSucMsg('操作成功');
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.cancelFetching);
            }
        }, {
            code: 'back',
            title: '返回',
            handler: () => {
                this.props.history.go(-1);
            }
        }];
    }
    render() {
        const fields = [{
            field: 'isReferee',
            value: 0,
            hidden: true
        }, {
            field: 'name',
            title: '名称',
            required: true
        }, {
            field: 'lowest',
            title: '最低价',
            number: true,
            formatter: (v, d) => {
                return moneyFormat(v, ' ', d.lowest);
            },
            hidden: ((!this.view && this.code) || !this.code),
            required: true
        }, {
            field: 'highest',
            title: '最高价',
            number: true,
            formatter: (v, d) => {
                return moneyFormat(v, ' ', d.highest);
            },
            hidden: ((!this.view && this.code) || !this.code),
            required: true
        }, {
            field: 'brandCode',
            title: '品牌',
            type: 'select',
            search: true,
            listCode: 630406,
            keyName: 'code',
            valueName: 'name',
            required: true
        }, {
            field: 'level',
            title: '轿车',
            type: 'select',
            required: true,
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
            title: '照片张数(广告图)',
            number: true,
            hidden: true,
            required: true
        }, {
            title: '广告图',
            field: 'advPic',
            type: 'img',
            required: true,
            help: '240*160'
        }, {
            title: '广告标语',
            field: 'slogan'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            buttons: this.buttons,
            editCode: 630412,
            detailCode: 630417
        });
    }
}

export default CarSeriesAddEdit;
