import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/administrative/cost-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.administrativeCostAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class costAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '类型',
            field: 'type',
            type: 'select',
            key: 'fee_advance_apply_type',
            required: true
        }, {
            title: '关联审批表',
            field: '',
            type: 'select',
            key: '',
            required: true
        }, {
            title: '关联车贷业务',
            field: '',
            type: 'select',
            key: '',
            required: true
        }, {
            title: '预支金额',
            field: '',
            amount: true,
            required: true
        }, {
            title: '开户银行',
            field: '',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: 'bankName',
            required: true
        }, {
            title: '银行账号',
            field: '',
            required: true
        }, {
            title: '账户名',
            field: '',
            required: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                addCode: 632671,
                detailCode: 632676
            });
    }
}

export default costAddedit;