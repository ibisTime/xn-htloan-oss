import React from 'react';
import { Form } from 'antd';
import {getQueryString} from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class commodityAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '类别',
            field: 'type',
            type: 'select',
            listCode: '808007',
            params: {
                status: 1
            },
            keyName: 'code',
            valueName: 'name',
            required: true
        }, {
            title: '名称',
            field: 'name',
            required: true
        }, {
            title: '广告语',
            field: 'slogan',
            required: true
        }, {
            title: '最低购买信用分',
            field: 'creditScore',
            number: true,
            required: true
        }, {
            title: '缩略图',
            field: 'pic',
            required: true,
            type: 'img',
            help: '240px*160px'
        }, {
            title: '广告图',
            field: 'advPic',
            required: true,
            type: 'img',
            help: '750px*540px'
        }, {
            title: '原价',
            field: 'originalPrice',
            amount: true,
            required: true
        }, {
            title: '现价',
            field: 'price',
            amount: true,
            required: true
        }, {
            title: '商品规格',
            field: 'productSpecsList',
            type: 'o2m',
            options: {
                add: true,
                edit: true,
                delete: true,
                scroll: {
                    x: 1300
                },
                fields: [{
                    title: '规格名称',
                    field: 'name',
                    required: true
                }, {
                    title: '图片',
                    field: 'pic',
                    type: 'img',
                    required: true
                }, {
                    title: '原价',
                    field: 'originalPrice',
                    amount: true,
                    required: true
                }, {
                    title: '现价',
                    field: 'price',
                    amount: true,
                    required: true
                }, {
                    title: '总期数',
                    field: 'periods',
                    number: true,
                    required: true
                }, {
                    title: '分期利率',
                    field: 'bankRate',
                    number3: true,
                    required: true
                }, {
                    title: '首付比例',
                    field: 'sfRate',
                    required: true
                }, {
                    title: '重量',
                    field: 'weight',
                    amount: true,
                    required: true
                }, {
                    title: '库存',
                    field: 'quantity',
                    number: true,
                    required: true
                }, {
                    title: 'UI次序',
                    field: 'orderNo',
                    required: true
                }]
            }
        }, {
            title: '商品描述',
            field: 'description',
            type: 'textarea',
            required: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 808010,
            editCode: 808012,
            detailCode: 808026
        });
    }
}

export default commodityAddedit;
