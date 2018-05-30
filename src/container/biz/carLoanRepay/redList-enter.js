import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/redList-enter';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper,
    beforeDetail
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizredListEnter, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class redListEnter extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'mobile',
            readonly: true
        }, {
            title: '业务编号',
            field: 'realName',
            readonly: true
        }, {
            title: '贷款银行',
            field: 'idNo',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'sfAmount',
            amount: true,
            readonly: true
        }, {
            title: '车辆',
            field: 'subbranch',
            readonly: true
        }, {
            title: '收车地点',
            field: 'sfAmount',
            required: true
        }, {
            title: '收车时间',
            field: 'overdueHandleDatetime',
            type: 'date',
            required: true
        }, {
            title: '拖车人员',
            field: 'carPrice',
            required: true
        }, {
            title: '停放位置',
            field: 'carPrice',
            required: true
        }, {
            title: '备注',
            field: 'loanBank',
            required: true
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                addCode: 630500,
                editCode: 630502,
                detailCode: 630507
            });
    }
}

export default redListEnter;