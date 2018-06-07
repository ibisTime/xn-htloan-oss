import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/stock/outtreasury-addedit';
import {getQueryString, getUserId, showSucMsg, moneyFormat} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.stockOuttreasuryAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class outtreasuryAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '产品',
            field: 'storageInCode',
            type: 'select',
            listCode: '632767',
            params: {},
            keyName: 'code',
            valueName: 'categoryName',
            required: true,
            onChange: (v) => {
                console.log(v);
                let storageInData = this.props.selectData.storageInCode.find(d => d.code === v);
                if (storageInData) {
                    this.props.setPageData({proquantity: storageInData.quantity, price: storageInData.price, totalPrice: storageInData.totalPrice});
                }
            }
        }, {
            title: '数量',
            field: 'proquantity',
            required: true,
            readonly: true
        }, {
            title: '单价',
            field: 'price',
            amount: true,
            required: true,
            readonly: true
        }, {
            title: '总价',
            field: 'totalPrice',
            amount: true,
            required: true,
            readonly: true
        }, {
            title: '出库数量',
            field: 'quantity',
            required: true,
            onChange: (v) => {
                let price = this.props.form.getFieldValue('price');
                if (price) {
                    let sum = moneyFormat(price * v);
                    this.props.setPageData({totalPrice1: sum});
                }
            }
        }, {
            title: '出库总价',
            field: 'totalPrice1',
            required: true,
            readonly: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 632770,
            detailCode: 632776
        });
    }
}

export default outtreasuryAddedit;
