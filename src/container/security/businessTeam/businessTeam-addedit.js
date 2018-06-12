import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/security/businessTeam-addedit';
import {getQueryString, getUserId, showSucMsg} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.securityBusinessTeamAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class businessTeamAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'name',
            title: '团队名称',
            required: true
        }, {
            field: 'captain',
            title: '团队长',
            type: 'select',
            pageCode: 630065,
            params: {
                type: 'P'
            },
            keyName: 'userId',
            valueName: '{{companyName.DATA}}-{{departmentName.DATA}}-{{realName.DATA}}-{{mobile.DATA}}',
            searchName: 'keyword',
            required: true
        }, {
            field: 'bank',
            title: '收款银行',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: 'bankName',
            required: true
        }, {
            field: 'subbranch',
            title: '收款支行',
            required: true
        }, {
            field: 'accountNo',
            title: '收款账号',
            bankCard: true,
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 630190,
            editCode: 630192,
            detailCode: 630196
        });
    }
}

export default businessTeamAddedit;
