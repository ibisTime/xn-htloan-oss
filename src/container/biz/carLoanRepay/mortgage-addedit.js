import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/mortgage-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.bizMortgageAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class mortgageAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'applyUserName',
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            formatter: (v, d) => d.loanBankName ? d.loanBankName + d.repaySubbranch : '',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '业务团队',
            field: 'teamName',
            readonly: true
        }, {
            title: '区域经理',
            field: 'areaName',
            readonly: true
        }, {
            title: '信贷专员',
            field: 'saleUserName',
            readonly: true
        }, {
            title: '内勤专员',
            field: 'insideJobName',
            readonly: true
        }, {
            title: '抵押代理人',
            field: 'pledgeUser',
            readonly: true
        }, {
            title: '抵押代理人身份证复印件',
            field: 'pledgeUserIdCardCopy',
            type: 'img',
            readonly: true
        }, {
            title: '抵押地点',
            field: 'pledgeAddress',
            readonly: true
        }, {
            title: '补充说明',
            field: 'supplementNote',
            type: 'textarea',
            normalArea: true,
            readonly: true
        }, {
            title: '审核说明',
            field: 'approveNote',
            readonly: true
        }, {
            title: '车牌号',
            field: 'carNumber',
            readonly: true
        }, {
            title: '机动车登记证书',
            field: 'carRegcerti',
            type: 'img',
            readonly: true
        }, {
            title: '批单',
            field: 'carPd',
            type: 'img',
            readonly: true
        }, {
            title: '车钥匙',
            field: 'carKey',
            type: 'img',
            readonly: true
        }, {
            title: '大本扫描件',
            field: 'carBigSmj',
            type: 'img',
            readonly: true
        }, {
            title: '车辆行驶证扫描件',
            field: 'carXszSmj',
            type: 'img',
            readonly: true
        }, {
            title: '完税证明扫描件',
            field: 'dutyPaidProveSmj',
            type: 'img',
            readonly: true
        }, {
            title: '提交时间',
            field: 'pledgeBankCommitDatetime',
            type: 'date',
            required: true
        }, {
            title: '提交说明',
            field: 'pledgeBankCommitNot'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146
        });
    }
}

export default mortgageAddedit;
