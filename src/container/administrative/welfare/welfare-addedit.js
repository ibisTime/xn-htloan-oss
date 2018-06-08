import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/administrative/welfare-addedit';
import {
    getQueryString,
    getUserId
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.administrativeWelfareAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class welfareAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '申请事宜',
            field: 'applyNote',
            required: true
        }, {
            title: '申请人',
            field: 'applyUser',
            value: getUserId(),
            hidden: true
        }, {
            title: '发放人员',
            field: 'userList',
            type: 'o2m',
            options: {
                add: true,
                edit: true,
                delete: true,
                fields: [{
                    title: '部门',
                    field: 'departmentCode',
                    type: 'select',
                    listCode: 630106,
                    params: {
                        typeList: ['2']
                    },
                    keyName: 'code',
                    valueName: 'name'
                }, {
                    title: '姓名',
                    field: 'userId',
                    listCode: 632807,
                    type: 'select',
                    keyName: 'userId',
                    valueName: 'realName'
                }, {
                    title: '性别',
                    field: 'gender',
                    type: 'select',
                    key: 'gender'
                }, {
                    title: '备注说明',
                    field: 'remark'
                }]
            }
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                addCode: 632660,
                detailCode: 632666
            });
    }
}

export default welfareAddedit;