import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/basedata/receivables-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.basedataReceivablesAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class receivablesAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '账号类型',
            field: 'type',
            required: true,
            type: 'select',
            data: [{
                dkey: '1',
                dvalue: '分公司收款账号'
            }, {
                dkey: '2',
                dvalue: '经销商收款账号'
            }, {
                dkey: '3',
                dvalue: '经销商返点账号'
            }],
            keyName: 'dkey',
            valueName: 'dvalue'
        }, {
            title: '公司名称',
            field: 'companyCode',
            listCode: 630106,
            params: {
                typeList: [1],
                status: 1
            },
            type: 'select',
            keyName: 'code',
            valueName: 'name',
            required: true
        }, {
            title: '户名',
            field: 'realName',
            required: true
        }, {
            title: '开户行',
            field: 'bankName'
        }, {
            title: '账号',
            field: 'bankcardNumber',
            required: true,
            bankCard: true
        }, {
            title: '收款比例(%)',
            field: 'bankName'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 632000,
            editCode: 632002,
            detailCode: 632006,
            beforeSubmit: (params) => {
              let bank = this.props.selectData.bankCode.find(v => v.bankCode === params.bankCode);
              params.bankName = bank.bankName;
              return params;
            }
        });
    }
}

export default receivablesAddedit;
