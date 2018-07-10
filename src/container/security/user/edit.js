import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/security/edit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.securityEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('userId', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '登录名',
            field: 'loginName',
            readonly: true
        }, {
            title: '真实姓名',
            field: 'realName',
            readonly: true
        }, {
            title: '手机号',
            field: 'mobile',
            required: true
        }, {
            title: '角色编号',
            field: 'roleCode',
            type: 'select',
            required: true,
            listCode: 630006,
            keyName: 'code',
            valueName: 'name',
            readonly: true
        }, {
            title: '档案',
            field: 'archiveCode',
            listCode: '632807',
            keyName: 'code',
            valueName: '{{entranceNo.DATA}}-{{realName.DATA}}-{{gender.DATA}}',
            readonly: true
        }, {
            title: '岗位名称',
            field: 'postName',
            readonly: true
        }];

        return this.props.buildDetail({
            fields,
            key: 'userId',
            code: this.code,
            view: this.view,
            editCode: 630052,
            detailCode: 630067
        });
    }
}

export default Edit;