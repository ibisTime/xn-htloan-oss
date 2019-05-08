import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/postloantools/import-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.postloantoolsImportAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class importAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [ {
            title: '业务编号',
            field: 'bizCode',
            required: true,
            nowrap: true
        }, {
            title: '姓名',
            field: 'userName',
            nowrap: true,
            required: true
        }, {
            title: '与借款人关系',
            field: 'relation',
            type: 'select',
            key: 'credit_user_relation',
            nowrap: true,
            required: true
        }, {
            title: '贷款角色',
            field: 'loanRole',
            type: 'select',
            nowrap: true,
            key: 'credit_user_loan_role'
        }, {
            title: '风险筛查结果',
            field: 'result'
        }, {
            title: '贷款逾期记录',
            field: 'loanCrdt'
        }, {
            title: '信用卡逾期记录',
            field: 'cardCrdt'
        }, {
            title: '工行专项卡分期笔数',
            field: 'leftNum'
        }, {
            title: '未结清余额',
            field: 'leftAmount'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'credit_user_status',
            search: true
        }, {
            title: '备注',
            field: 'note'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632118
        });
    }
}

export default importAddedit;
