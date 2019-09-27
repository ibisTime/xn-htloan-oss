import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/basedata/bank-addedit';
import {
    getQueryString
} from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.bizBankAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class BankTypeAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '全称',
            field: 'fullName',
            required: true
        }, {
            title: '简称',
            field: 'abbrName',
            required: true
        }, {
            title: '地址',
            field: 'address',
            required: true
        }, {
            title: '车贷经营性质',
            field: 'carDealerType',
            type: 'select',
            required: true,
            data: [{
                key: '1',
                value: '4S店'
            }, {
                key: '0',
                value: '综合店'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            required: true,
            title: '是否自主研发',
            field: 'isSelfDevelop',
            type: 'select',
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '主营品牌',
            field: 'mainBrand',
            required: true
        }, {
            title: '联系人姓名',
            field: 'mainContact',
            required: true
        }, {
            title: '联系人电话',
            field: 'contactPhone',
            required: true
        }, {
            title: '所属集团',
            field: 'parentGroup',
            required: true
        }, {
            title: '所属分公司',
            field: 'belongBranchCompany',
            type: 'select',
            listCode: 630106,
            params: {
                typeList: [1],
                status: 1
            },
            keyName: 'code',
            valueName: 'name',
            required: true
        }, {
            title: '协议状态',
            field: 'agreementStatus',
            required: true,
            type: 'select',
            data: [{
                key: '1',
                value: '正常'
            }, {
                key: '0',
                value: '注销'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '结算方式',
            field: 'settleWay',
            type: 'select',
            key: 'settle_way',
            required: true
        }, {
            title: '业务区域',
            required: true,
            field: 'businessArea'
        }, {
            title: '返点利率(%)',
            required: true,
            field: 'rebateRate',
            type: 'number',
            formatter(v) {
                return v && +v * 100;
            }
        }, {
            title: '合作协议',
            field: 'agreementPic',
            required: true,
            type: 'file'
        }, {
            title: '合作协议开始时间',
            field: 'agreementValidDateStart',
            required: true,
            type: 'date'
        }, {
            title: '合作协议结束时间',
            field: 'agreementValidDateEnd',
            required: true,
            type: 'date'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 632060,
            editCode: 632062,
            detailCode: 632066,
            beforeSubmit(params) {
                params.rebateRate = params.rebateRate / 100;
                return params;
            }
        });
    }
}

export default BankTypeAddedit;
