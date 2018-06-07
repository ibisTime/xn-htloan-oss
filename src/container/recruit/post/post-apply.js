import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/recruit/post-apply.js';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    CollapseWrapper
} from 'component/collapse-detail/collapse-detail';

@CollapseWrapper(
    state => state.recruitPostApply, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class postApply extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '用户信息',
            items: [
                [{
                    title: '姓名',
                    field: 'position',
                    readonly: true
                }, {
                    title: '工号',
                    field: 'entryDatetime',
                    readonly: true
                }],
                [{
                    title: '部门',
                    field: 'realName',
                    field: 'departmentCode',
                    listCode: 630106,
                    params: {
                        typeList: '2'
                    },
                    keyName: 'code',
                    valueName: 'name',
                    readonly: true
                }, {
                    title: '新部门',
                    field: 'gender',
                    field: 'departmentCode',
                    listCode: 630106,
                    params: {
                        typeList: '2'
                    },
                    keyName: 'code',
                    valueName: 'name',
                    required: true
                }],
                [{
                    title: '职位',
                    field: 'nativePlace',
                    listCode: 630106,
                    params: {
                        typeList: '3'
                    },
                    keyName: 'code',
                    valueName: 'name',
                    readonly: true
                }, {
                    title: '新职位',
                    field: 'nation',
                    listCode: 630106,
                    params: {
                        typeList: '3'
                    },
                    keyName: 'code',
                    valueName: 'name',
                    required: true
                }],
                [{
                    title: '开始日期',
                    field: 'nativePlace',
                    required: true
                }, {
                    title: '结束日期',
                    field: 'nation',
                    required: true
                }],
                [{
                    title: '缘由',
                    field: ''
                }]
            ]
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 632866,
                buttons: [{
                    title: '确认',
                    handler: (param) => {
                        param.updater = getUserId();
                        this.props.doFetching();
                        fetch(632860, param).then(() => {
                            showSucMsg('操作成功');
                            this.props.cancelFetching();
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
                    },
                    check: true,
                    type: 'primary'
                }, {
                    title: '返回',
                    handler: (param) => {
                        this.props.history.go(-1);
                    }
                }]
            });
    }
}

export default postApply;