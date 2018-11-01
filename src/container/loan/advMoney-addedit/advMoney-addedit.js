import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loan/advMoney-addedit';
import {
    getQueryString,
    showWarnMsg,
    showSucMsg,
    getUserId
} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.loanAdvMoneyAddedit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class AdvMoneyAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        let _this = this;
        let buttons = [];

        let fields = [{
            title: '业务编号',
            field: 'code1',
            required: true,
            readonly: true,
            formatter: (v, d) => {
                return d.code;
            }
        }, {
            title: '客户姓名',
            field: 'applyUserName',
            required: true,
            readonly: true
        }, {
            title: '业务公司',
            field: 'companyName',
            readonly: true
        }, {
            title: '区域经理',
            field: 'areaName',
            readonly: true
        }, {
            title: '业务团队',
            field: 'teamName',
            readonly: true
        }, {
            title: '信贷专员',
            field: 'saleUserName',
            readonly: true
        }, {
            title: '业务内勤',
            field: 'insideJobName',
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            readonly: true
        }, {
            title: '资金划转授权书 ',
            field: 'advanceFundAmountPdf',
            type: 'img',
            readonly: true
        }, {
            title: '其他资料',
            field: 'interviewOtherPdf',
            type: 'file',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: 'GPS费用',
            field: 'gpsFee',
            amount: true,
            readonly: true
        }, {
          title: '公证费',
          field: 'authFee',
          amount: true,
          readonly: true
        }, {
          title: '月供保证金',
          field: 'monthDeposit',
          amount: true,
          readonly: true
        }, {
          title: '其他费用',
          field: 'otherFee',
          amount: true,
          readonly: true
        }, {
          title: '公司服务费',
          field: 'companyFee',
          amount: true,
          readonly: true
        }, {
          title: '团队服务费',
          field: 'teamFee',
          amount: true,
          readonly: true
        }, {
          title: '银行服务费',
          field: 'bankFee',
          amount: true,
          readonly: true
        }, {
            title: '垫资日期',
            field: 'advanceFundDatetime',
            type: 'date',
            required: true
        }, {
            title: '垫资金额',
            field: 'advanceFundAmount',
            amount: true,
            required: true
        }, {
            title: '水单',
            field: 'billPdf',
            type: 'img',
            required: true
        }, {
            title: '垫资说明',
            field: 'advanceNote',
            type: 'textarea',
            normalArea: true,
            required: true
        }, {
            title: '流转日志',
            field: 'list',
            type: 'o2m',
            listCode: 630176,
            params: { refOrder: this.code },
            options: {
                rowKey: 'id',
                noSelect: true,
                fields: [{
                    title: '操作人',
                    field: 'operatorName'
                }, {
                    title: '开始时间',
                    field: 'startDatetime',
                    type: 'datetime'
                }, {
                    title: '结束时间',
                    field: 'endDatetime',
                    type: 'datetime'
                }, {
                    title: '花费时长',
                    field: 'speedTime'
                }, {
                    title: '审核意见',
                    field: 'dealNote'
                }, {
                    title: '当前节点',
                    field: 'dealNode',
                    type: 'select',
                    listCode: 630147,
                    keyName: 'code',
                    valueName: 'name'
                }]
            }
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146,
            editCode: 632125,
            beforeSubmit: (params) => {
              // delete params.loanAmount;
              params.operator = getUserId();
              return params;
            }
        });
    }
}

export default AdvMoneyAddedit;
