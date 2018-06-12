import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/notice/notice-addedit';
import {getQueryString, getUserId, showSucMsg} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.noticeNoticeAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class noticeAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.hideStatus = false;
        this.isUserId = false;
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
            key: 'notice_type',
            required: true
        }, {
            field: 'urgentStatus',
            title: '紧急程度',
            type: 'select',
            key: 'notice_urgent_status',
            required: true
        }, {
            field: 'publishDepartmentCode',
            title: '发布部门',
            type: 'select',
            listCode: 630106,
            params: {
                typeList: ['2']
            },
            keyName: 'code',
            valueName: 'name',
            required: true
        }, {
            title: '公告范围类型',
            field: 'scopeType',
            type: 'select',
            key: 'scope_people_type',
            required: true,
            onChange: (value) => {
                this.hideStatus = value === '-1';
                this.isUserId = value === '4';
                let bizCode;
                let params = {};
                if (value !== '-1') {
                    // 分公司
                    if (value === '1') {
                        bizCode = 630106;
                        params.typeList = ['1'];
                    // 部门
                    } else if (value === '2') {
                        bizCode = 630106;
                        params.typeList = ['2'];
                    // 职位
                    } else if (value === '3') {
                        bizCode = 630106;
                        params.typeList = ['3'];
                    // 具体人
                    } else if (value === '4') {
                        bizCode = 632807;
                    }
                    this.props.setSelectData({
                        data: [],
                        key: 'peopleCode'
                    });
                    this.props.form.setFieldsValue({
                        peopleCode: ''
                    });
                    this.props.doFetching();
                    fetch(bizCode, params).then((data) => {
                        this.props.setSelectData({
                            data: data.list ? data.list : data,
                            key: 'peopleCode'
                        });
                        this.props.cancelFetching();
                    }).catch(this.props.cancelFetching);
                }
            },
            formatter: (v, data) => {
                return data.scopePeopleList[0].type;
            }
        }, {
            title: '具体类型人员',
            field: 'peopleCode',
            type: 'select',
            keyName: this.isUserId ? 'userId' : 'code',
            valueName: this.isUserId ? '{{postName.DATA}}-{{realName.DATA}}' : 'name',
            searchName: this.isUserId ? 'keyword' : '',
            required: true,
            hidden: this.hideStatus,
            formatter: (v, data) => {
                return data.scopePeopleList[0].peopleCode ? data.scopePeopleList[0].peopleName : '-';
            }
        }, {
            title: '内容',
            field: 'content',
            type: 'textarea',
            normalArea: true,
            required: true
        }, {
            title: '备注',
            field: 'remark',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 632720,
            editCode: 632722,
            detailCode: 632726,
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

export default noticeAddedit;
