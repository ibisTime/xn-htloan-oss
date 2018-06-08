import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/stock/stock-addedit';
import {getQueryString, getUserId, showSucMsg, moneyFormat} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.stockStockAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class stockAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '品名',
            field: 'productCode',
            type: 'select',
            listCode: '632757',
            params: {},
            keyName: 'code',
            valueName: 'name',
            required: true
        }, {
            title: '数量',
            field: 'quantity',
            required: true,
            onChange: (v) => {
                let price = this.props.form.getFieldValue('price');
                let sum = '';
                if (price && v) {
                    sum = price * v * 1000;
                }
                this.props.setPageData({
                    ...this.props.pageData,
                    totalPrice: sum
                });
            }
        }, {
            title: '单价',
            field: 'price',
            amount: true,
            required: true,
            onChange: (v) => {
                let quantity = this.props.form.getFieldValue('quantity');
                let sum = '';
                if (quantity && v) {
                    sum = quantity * v * 1000;
                }
                this.props.setPageData({
                    ...this.props.pageData,
                    totalPrice: sum
                });
            }
        }, {
            title: '总价',
            field: 'totalPrice',
            amount: true,
            required: true,
            readonly: true
        }, {
            title: '有效期',
            field: 'datetime',
            type: 'datetime',
            rangedate: ['validDateStart', 'validDateEnd'],
            required: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 632760,
            editCode: 632761,
            detailCode: 632766
        });
    }
}

export default stockAddedit;
