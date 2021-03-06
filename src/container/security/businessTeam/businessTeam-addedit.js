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
            listCode: 630066,
            keyName: 'userId',
            valueName: '{{realName.DATA}}-{{mobile.DATA}}',
            searchName: 'keyword',
            required: true,
            params: {
                roleCode: 'SR201905261942406683243'
            }
        }, {
            title: '区域',
            field: 'place',
            value: '1',
            hidden: true
        }, {
            title: '地名',
            field: 'region',
            value: '2',
            hidden: true
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
