import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/attendance/publicity-addedit';
import {getQueryString, getUserId, showWarnMsg, showSucMsg} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.attendancePublicityAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class publicityAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.isCheck = !!getQueryString('isCheck', this.props.location.search);
        this.buttons = [];

        if (this.isCheck) {
            this.buttons = [{
                title: '通过',
                check: true,
                handler: (params) => {
                    let data = {};
                    data.code = this.code;
                    data.remark = params.remark;
                    data.approveResult = '1';
                    data.updater = getUserId();
                    this.props.doFetching();
                    fetch(632621, data).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '不通过',
                check: true,
                handler: (params) => {
                    let data = {};
                    data.code = this.code;
                    data.remark = params.remark;
                    data.approveResult = '2';
                    data.updater = getUserId();
                    this.props.doFetching();
                    fetch(632621, data).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        }
    }

    render() {
        const fields = [{title: '类型',
            field: 'type',
            value: '1',
            hidden: true,
            required: true
        }, {
            title: '公出明细',
            field: 'travelApplyDetailList',
            type: 'o2m',
            required: true,
            options: {
                add: true,
                edit: true,
                delete: true,
                fields: [{
                    title: '公出时间',
                    field: 'datetime',
                    type: 'datetime',
                    rangedate: ['startDatetime', 'endDatetime'],
                    required: true,
                    onChange: (dates, dateStrings, props) => {
                        let startDatetime = new Date(dateStrings[0]); // 开始时间
                        let endDatetime = new Date(dateStrings[1]); // 结束时间
                        if (startDatetime && endDatetime) {
                            let time = endDatetime.getTime() - startDatetime.getTime();
                            let hours = (time / (3600 * 1000)).toFixed(2);
                            props.form.setFieldsValue({
                                totalHour: hours
                            });
                        }
                    },
                    render: (v, data) => {
                        return data.startDatetime + '至' + data.endDatetime;
                    }
                }, {
                    title: '公出时长(小时)',
                    field: 'totalHour',
                    required: true
                }, {
                    title: '备注',
                    field: 'remark',
                    required: true
                }]
            }
        }, {
            title: '公出事由',
            field: 'reason',
            required: true
        }, {
            title: '申请人',
            field: 'applyUserName',
            hidden: ((!this.view && this.isCheck) || !this.code)
        }, {
            title: '工号',
            field: 'jobNo',
            hidden: ((!this.view && this.isCheck) || !this.code)
        }, {
            title: '部门',
            field: 'departmentName',
            hidden: ((!this.view && this.isCheck) || !this.code)
        }, {
            title: '职务',
            field: 'postName',
            hidden: ((!this.view && this.isCheck) || !this.code)
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 632620,
            detailCode: 632626,
            buttons: this.buttons,
            beforeSubmit: (data) => {
                if (!data.travelApplyDetailList || data.travelApplyDetailList.length < 1) {
                    showWarnMsg('公出明细不能为空');
                    return;
                }
                data.applyUser = getUserId();
                return data;
            }
        });
    }
}

export default publicityAddedit;
