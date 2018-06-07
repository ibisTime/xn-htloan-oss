import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/recruit/formal-apply.js';
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
    state => state.recruitFormalApply, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class formalApply extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.entryCode = getQueryString('entryCode', this.props.location.search);
        this.gradeList = [
            'post_duties',
            'work_procedure',
            'work_quality',
            'work_efficiency',
            'consciousness',
            'communication_skills',
            'cooperative_ability',
            'attendance'
        ];
    }
    handleChange = (v, d) => {
        setTimeout(() => {
            let {
                getFieldsValue
            } = this.props.form;
            let result = getFieldsValue(this.gradeList);
            let sum = 0;
            console.log(v, d, result);
            for (let key in result) {
                sum += Number(result[key]);
            }
            this.props.form.setFieldsValue({
                gradeAll: sum
            });
        }, 100);
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
                    required: true
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
                    required: true
                }],
                [{
                    title: '开始日期',
                    field: 'startDatetime',
                    type: 'date',
                    required: true
                }, {
                    title: '结束日期',
                    field: 'endDatetime',
                    type: 'date',
                    required: true
                }],
                [{
                    title: '缘由',
                    field: 'reason'
                }]
            ]
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 632876,
                buttons: [{
                    title: '确认',
                    handler: (param) => {
                        param.updater = getUserId();
                        param.probationAssessList = this.gradeList.map(v => ({
                            convertCode: this.code,
                            evalItem: v,
                            grade: param[v]
                        }));
                        param.entryCode = this.entryCode;
                        this.props.doFetching();
                        fetch(632880, param).then(() => {
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

export default formalApply;