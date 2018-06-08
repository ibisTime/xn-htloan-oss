import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/recruit/register-enter.js';
import {getQueryString, getUserId, showSucMsg} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    CollapseWrapper
} from 'component/collapse-detail/collapse-detail';

@CollapseWrapper(
    state => state.recruitRegisterEnter, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class registerEnter extends React.Component {
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
                    field: 'realName',
                    required: true
                }, {
                    title: '应聘岗位',
                    field: 'position',
                    required: true,
                    type: 'select',
                    listCode: 630106,
                    params: {
                      typeList: ['3']
                    },
                    keyName: 'code',
                    valueName: 'name'
                }], [{
                    title: '综合',
                    field: 'composite'
                }, {
                    title: '素质',
                    field: 'quality'
                }],
                [{
                    title: '考核项目',
                    field: 'checkProjectList',
                    required: true,
                    type: 'o2m',
                    options: {
                        add: true,
                        edit: true,
                        delete: true,
                        fields: [{
                            title: '考核项目',
                            field: 'name'
                        }, {
                            title: '考核指标',
                            field: 'checkResult',
                            type: 'select',
                            key: 'check_result'
                        }, {
                            title: '考核人',
                            field: 'checkUser'
                        }, {
                            title: '备注',
                            field: 'remark'
                        }]
                    }
                }],
                [{
                    title: '面试记录',
                    field: 'interviewRecord',
                    type: 'textarea',
                    normalArea: true
                }], [{
                    title: '录用',
                    field: 'employResult',
                    type: 'select',
                    key: 'employ_result'
                }, {
                    title: '试用期',
                    field: 'probation',
                    type: 'select',
                    key: 'probation'
                }, {
                    title: '薪资',
                    field: 'employSalary',
                    amount: true
                }],
                [{
                    title: '入职部门',
                    field: 'employDepartmentCode',
                    required: true,
                    type: 'select',
                    listCode: 630106,
                    params: {
                      typeList: ['2']
                    },
                    keyName: 'code',
                    valueName: 'name',
                    search: true
                }, {
                    title: '入职岗位',
                    field: 'employPositionCode',
                    required: true,
                    type: 'select',
                    listCode: 630106,
                    params: {
                      typeList: ['3']
                    },
                    keyName: 'code',
                    valueName: 'name'
                }, {
                    title: '批准人',
                    field: 'employApproveUser'
                }]
            ]
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 632856,
                buttons: [{
                  title: '面试通过',
                  handler: (param) => {
                    param.employApproveResult = '1';
                    param.approveUser = getUserId();
                    param.operator = getUserId();
                    this.props.doFetching();
                    fetch(632851, param).then(() => {
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
                    title: '面试不通过',
                    handler: (param) => {
                      param.employApproveResult = '0';
                      param.approveUser = getUserId();
                      param.operator = getUserId();
                      this.props.doFetching();
                      fetch(632851, param).then(() => {
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

export default registerEnter;