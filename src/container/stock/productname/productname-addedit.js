import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/stock/productname-addedit';
import {getQueryString, getUserId, showSucMsg} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.stockProductnameAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class productnameAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '品名',
            field: 'name',
            required: true
        }, {
            title: '类别',
            field: 'categoryCode',
            type: 'select',
            listCode: '632747',
            params: {},
            keyName: 'code',
            valueName: 'name',
            required: true
        }, {
            title: '规格',
            field: 'model',
            required: true
        }, {
            title: '单位',
            field: 'unit',
            required: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 632750,
            editCode: 632751,
            detailCode: 632756
        });
    }
}

export default productnameAddedit;
