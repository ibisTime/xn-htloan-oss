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
            title: '产品',
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
            required: true
        }, {
            title: '单价',
            field: 'price',
            amount: true,
            required: true,
            onChange: (v) => {
                let quantity = this.props.form.getFieldValue('quantity');
                if (quantity) {
                    let sum = moneyFormat(quantity * v);
                    this.props.form.setFieldsValue({
                        totalPrice: sum
                    });
                }
            }
        }, {
            title: '总价',
            field: 'totalPrice',
            amount: true,
            required: true,
            readonly: true
        }, {
            title: '有效期始',
            field: 'validDateStart',
            type: 'datetime'
        }, {
            title: '有效期止',
            field: 'validDateEnd',
            type: 'datetime'
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
