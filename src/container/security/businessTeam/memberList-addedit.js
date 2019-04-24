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
        this.name = getQueryString('name', this.props.location.search);
        this.teamcode = getQueryString('teamcode', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [
            {
                field: 'name',
                title: '团队名称',
                readonly: true,
                value: this.name
            }, {
                field: 'userId',
                title: '成员名称',
                type: 'select',
                listCode: 630066,
                keyName: 'userId',
                valueName: '{{realName.DATA}}-{{mobile.DATA}}',
                searchName: 'keyword',
                required: true
            }, {
                title: '类型',
                field: 'roleCode',
                required: true,
                type: 'select',
                data: [{
                    key: 'SR201800000000000000YWY',
                    value: '业务员'
                }, {
                    key: 'SR20180000000000000NQZY',
                    value: '内勤'
                }],
                keyName: 'key',
                valueName: 'value',
                search: true
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
            addCode: 630200,
            editCode: 630192,
            detailCode: 630196
        });
    }
}

export default memberListAddedit;
