import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/security/memberList-addedit';
import {getQueryString, getUserId, showSucMsg} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.securityMemberListAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class memberListAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.teamcode = getQueryString('teamcode', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'userId',
            title: '成员名称',
            type: 'select',
            pageCode: 630065,
            params: {
                type: 'P'
            },
            keyName: 'userId',
            valueName: '{{companyName.DATA}}-{{departmentName.DATA}}-{{realName.DATA}}',
            searchName: 'keyword',
            required: true
        }, {
            field: 'teamCode',
            title: '所属团队',
            value: this.teamcode,
            hidden: true,
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 630200
        });
    }
}

export default memberListAddedit;
