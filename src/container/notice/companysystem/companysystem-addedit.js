import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/notice/companysystem-addedit';
import {getQueryString, getUserId, showSucMsg} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.noticeCompanysystemAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class companysystemAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.hideStatus = false;
        this.isUserId = false;
        if (this.code) {
            this.props.selectData.peopleCode = [];
        }
    }

    render() {
        const fields = [{
            field: 'title',
            title: '标题',
            required: true
        }, {
            field: 'type',
            title: '类型',
            type: 'select',
            key: 'sms_type',
            required: true
        }, {
            title: '内容',
            field: 'content',
            type: 'textarea',
            normalArea: true,
            required: true
        }, {
            title: '创建时间',
            field: 'createDatetime',
            type: 'datetime'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 805307,
            beforeSubmit: (params) => {
                params.scopePeopleList = [{
                    scopeType: params.scopeType,
                    peopleCode: params.peopleCode
                }];
                delete params.scopeType;
                delete params.peopleCode;
                return params;
            }
        });
    }
}

export default companysystemAddedit;
