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
import fetch from 'common/js/fetch';

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
            valueName: 'dvalue',
            onChange: (v) => {
                if (!v) {
                    this.props.setSelectData({
                        key: 'companyCode',
                        data: []
                    });
                    // return;
                } else if (v === '1') {
                    fetch(630106, {
                        typeList: [1],
                        status: '1'
                    }).then(data => {
                        this.props.setSelectData({
                            key: 'companyCode',
                            data: data
                        });
                    });
                } else {
                    fetch(632067, {}).then(data => {
                        data.forEach(d => d.name = d.fullName);
                        this.props.setSelectData({
                            key: 'companyCode',
                            data: data
                        });
                    });
                }
            }
        }, {
            title: '公司名称',
            field: 'companyCode',
            listCode: 630106,
            params: {
                typeList: [1],
                status: '1'
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
            field: 'bankCode',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: 'bankName',
            required: true
        }, {
            title: '支行',
            field: 'subbranch',
            required: true
        }, {
            title: '账号',
            field: 'bankcardNumber',
            required: true,
            bankCard: true
        }, {
            title: '收款比例',
            required: true,
            number3: true,
            help: '请输入0~1之间的小数',
            field: 'pointRate'
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
            detailCode: 632006
        });
    }
}

export default receivablesAddedit;
