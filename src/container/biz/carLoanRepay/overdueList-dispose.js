import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/blackList-dispose';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizBlackListDispose, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class blackListDispose extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('staffCode', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '贷款人',
            field: 'realName',
            readonly: true
        }, {
            title: '手机号',
            field: 'realName',
            readonly: true
        }, {
            title: '期数',
            field: 'realName',
            readonly: true
        }, {
            title: '逾期期数',
            field: 'realName',
            readonly: true
        }, {
            title: '逾期日期',
            field: 'realName',
            readonly: true
        }, {
            fields: [{
                title: '催收方式',
                field: 'status'
            }, {
                title: '催收方式',
                field: 'status'
            }, {
                title: '催收文本',
                field: 'status'
            }, {
                title: '催收时间',
                field: 'status'
            }]
        }, {
            title: '是否缴纳保证金',
            field: 'realName',
            type: 'select'
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

export default blackListDispose;