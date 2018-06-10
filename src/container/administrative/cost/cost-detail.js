import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/administrative/cost-detail';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(state => state.administrativeCostDetail, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class costDetail extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.refAssertCodeHideStatus = true;
        this.refBudgetOrderCodeHideStatus = true;
    }
    // 获取关联表
    getRelation = (bizCode, params) => {
        this.props.setSelectData({
            data: [],
            key: 'refAssertCode'
        });
        this.props.form.setFieldsValue({
            refAssertCode: ''
        });
        this.props.doFetching();
        fetch(bizCode, params).then((data) => {
            this.props.setSelectData({
                data: data.list ? data.list : data,
                key: 'refAssertCode'
            });
            this.props.cancelFetching();
        }).catch(this.props.cancelFetching);
    }

    // 获取关联车贷业务
    getRelationLoan = (bizCode, params) => {
        this.props.setSelectData({
            data: [],
            key: 'refBudgetOrderCode'
        });
        this.props.form.setFieldsValue({
            refBudgetOrderCode: ''
        });
        this.props.doFetching();
        fetch(bizCode, params).then((data) => {
            this.props.setSelectData({
                data: data.list ? data.list : data,
                key: 'refBudgetOrderCode'
            });
            this.props.cancelFetching();
        }).catch(this.props.cancelFetching);
    }

    render() {
        const fields = [{
            title: '类型',
            field: 'type',
            type: 'select',
            key: 'fee_advance_apply_type',
            required: true,
            onChange: (value) => {
                let bizCode;
                let params = {};
                // 采购固定资产
                if (value === '01') {
                    bizCode = 632645;
                    params.limit = 1000;
                    params.start = 1;
                    params.status = '1';
                    params.type = '1';
                    params.applyUser = getUserId();
                    this.getRelation(bizCode, params);
                // 采购办公用品
                } else if (value === '02') {
                    bizCode = 632645;
                    params.limit = 1000;
                    params.start = 1;
                    params.status = '1';
                    params.type = '2';
                    params.applyUser = getUserId();
                // 贷后催收
                } else if (value === '06') {
                    bizCode = 632145;
                    params.limit = 1000;
                    params.start = 1;
                    params.curNodeCode = '002_23';
                }
                if (value === '01' || value === '02') {
                    this.refAssertCodeHideStatus = false;
                    this.refBudgetOrderCodeHideStatus = true;
                    this.getRelation(bizCode, params);
                } else if (value === '06') {
                    this.refAssertCodeHideStatus = true;
                    this.refBudgetOrderCodeHideStatus = false;
                    this.getRelationLoan(bizCode, params);
                } else {
                    this.refAssertCodeHideStatus = true;
                    this.refBudgetOrderCodeHideStatus = true;
                }
            }
        }, {
            title: '关联审批表',
            field: 'refAssertCode',
            type: 'select',
            required: true,
            keyName: 'code',
            valueName: '{{code.DATA}}-{{applyUserName.DATA}}',
            hidden: this.refAssertCodeHideStatus
        }, {
            title: '关联车贷业务',
            field: 'refBudgetOrderCode',
            type: 'select',
            keyName: 'code',
            valueName: '{{code.DATA}}-{{saleUserName.DATA}}',
            required: true,
            hidden: this.refBudgetOrderCodeHideStatus
        }, {
            title: '预支金额',
            field: 'amount',
            amount: true,
            required: true
        }, {
            title: '开户银行',
            field: 'subbranch',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: 'bankName',
            required: true
        }, {
            title: '账户名',
            field: 'accountName',
            required: true
        }, {
            title: '银行账号',
            field: 'bankcardNumber',
            required: true
        }, {
            title: '说明',
            field: 'applyNote'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632676
        });
    }
}

export default costDetail;