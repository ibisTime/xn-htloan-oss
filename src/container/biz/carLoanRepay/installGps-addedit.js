import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/installGps-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.bizinstallGpsAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class installGpsAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'applyUserName'
        }, {
            title: '业务团队',
            field: 'teamName'
        }, {
            title: '业务编号',
            field: 'code'
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            formatter: (v, d) => d.loanBankName ? d.loanBankName + d.repaySubbranch : ''
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            field: 'carFrameNo',
            title: '车架号',
            required: true
        }, {
            title: 'GPS安装列表',
            field: 'budgetOrderGpsList',
            type: 'o2m',
            options: {
                detail: true,
                fields: [{
                    title: 'GPS设备号',
                    field: 'gpsDevNo',
                    nowrap: true,
                    required: true
                }, {
                    title: 'GPS类型',
                    field: 'gpsType',
                    type: 'select',
                    data: [{
                      key: '1',
                      value: '有线'
                    }, {
                      key: '0',
                      value: '无线'
                    }],
                    keyName: 'key',
                    valueName: 'value',
                    required: true
                }, {
                    title: '安装位置',
                    field: 'azLocation',
                    nowrap: true,
                    readonly: true
                }, {
                    title: '安装时间',
                    field: 'azDatetime',
                    type: 'date',
                    nowrap: true,
                    readonly: true
                }, {
                    title: '安装人员',
                    field: 'azUser',
                    nowrap: true,
                    readonly: true
                }, {
                    title: '设备图片',
                    field: 'devPhotos',
                    type: 'img',
                    readonly: true
                }, {
                    title: '安装图片',
                    field: 'azPhotos',
                    type: 'img',
                    readonly: true
                }, {
                    title: '备注',
                    field: 'remark',
                    nowrap: true
                }]
            }
        }, {
            title: '备注',
            field: 'remark',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146
        });
    }
}

export default installGpsAddedit;
