import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/installGps-addedit';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

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
            title: '业务编号',
            field: 'repayBizCode'
        }, {
            title: '贷款银行',
            field: 'loanBank'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: 'GPS安装列表',
            field: 'gpsAzList',
            type: 'o2m',
            options: {
                add: true,
                edit: true,
                delete: true,
                fields: [{
                    title: 'GPS设备号',
                    field: 'gpsDevNo',
                    nowrap: true,
                    required: true
                }, {
                    title: 'GPS类型',
                    field: 'gpsType',
                    nowrap: true,
                    required: true
                }, {
                    title: '安装位置',
                    field: 'azLocation',
                    nowrap: true,
                    required: true
                }, {
                    title: '安装时间',
                    field: 'azDatetime',
                    nowrap: true,
                    required: true
                }, {
                    title: '安装人员',
                    field: 'azUser',
                    nowrap: true,
                    required: true
                }, {
                    title: '备注',
                    field: 'remark',
                    nowrap: true,
                    required: true
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