import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/recruit/post-check.js';
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
    state => state.recruitPostCheck, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class postCheck extends React.Component {
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
                    formatter: (v, d) => {
                        return d.user.realName;
                    },
                    readonly: true
                }, {
                    title: '工号',
                    field: 'jobNo',
                    render: (v, d) => {
                        if(d) {
                            return d.archice.jobNo;
                        }
                    },
                    readonly: true
                }],
                [{
                    title: '部门',
                    field: 'departmentCode',
                    type: 'select',
                    formatter: (v, d) => {
                        if (d) {
                            return d.user.departmentCode;
                        }
                    },
                    listCode: 630106,
                    params: {
                        typeList: ['2']
                    },
                    keyName: 'code',
                    valueName: 'name',
                    readonly: true
                }, {
                    title: '新部门',
                    field: 'newDepartment',
                    type: 'select',
                    listCode: 630106,
                    params: {
                        typeList: ['2']
                    },
                    keyName: 'code',
                    valueName: 'name',
                    readonly: true
                }, {
                    title: '申请人',
                    field: 'applyUser',
                    formatter: (v, d) => {
                        if (d) {
                            return d.user.userId;
                        }
                    },
                    hidden: true
                }],
                [{
                    title: '职位',
                    field: 'postCode',
                    type: 'select',
                    formatter: (v, d) => {
                        if (d) {
                            return d.user.postCode;
                        }
                    },
                    listCode: 630106,
                    params: {
                        typeList: ['3']
                    },
                    keyName: 'code',
                    valueName: 'name',
                    readonly: true
                }, {
                    title: '新职位',
                    field: 'newPosition',
                    type: 'select',
                    listCode: 630106,
                    params: {
                        typeList: ['3']
                    },
                    keyName: 'code',
                    valueName: 'name',
                    readonly: true
                }],
                [{
                    title: '开始日期',
                    field: 'startDatetime',
                    type: 'date',
                    readonly: true
                }, {
                    title: '结束日期',
                    field: 'endDatetime',
                    type: 'date',
                    readonly: true
                }],
                [{
                    title: '缘由',
                    field: 'reason'
                }],
                [{
                    title: '备注',
                    field: 'remark'
                }]
            ]
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 632886,
                buttons: [{
                    title: '通过',
                    handler: (param) => {
                        param.approveResult = '1';
                        param.updater = getUserId();
                        this.props.doFetching();
                        fetch(632881, param).then(() => {
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
                    title: '不通过',
                    handler: (param) => {
                        param.approveResult = '0';
                        param.updater = getUserId();
                        this.props.doFetching();
                        fetch(632881, param).then(() => {
                            showSucMsg('操作成功');
                            this.props.cancelFetching();
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
                    },
                    check: true
                }, {
                    title: '返回',
                    handler: (param) => {
                        this.props.history.go(-1);
                    }
                }]
            });
    }
}

export default postCheck;