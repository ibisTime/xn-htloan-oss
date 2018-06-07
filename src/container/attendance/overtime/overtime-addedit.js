import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/attendance/overtime-addedit';
import {getQueryString, getUserId, showSucMsg} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.attendanceOvertimeAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class overtimeAddedit extends React.Component {
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
                    fetch(632611, data).then(() => {
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
                    fetch(632611, data).then(() => {
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
        const fields = [{
            title: '开始时间',
            field: 'startDatetime',
            type: 'datetime',
            required: true
        }, {
            title: '结束时间',
            field: 'endDatetime',
            type: 'datetime',
            required: true
        }, {
            title: '共计(小时)',
            field: 'totalHour',
            required: true
        }, {
            title: '加班事由',
            field: 'reason',
            required: true
        }, {
            title: '申请人',
            field: 'applyUserName',
            hidden: ((!this.view && this.isCheck) || !this.code)
        }, {
            title: '工号',
            field: 'jobNo',
            formatter: (v, d) => {
                return d.applyUserArchive[0] && d.applyUserArchive[0].jobNo;
            },
            hidden: ((!this.view && this.isCheck) || !this.code)
        }, {
            title: '部门',
            field: 'departmentName',
            formatter: (v, d) => {
                return d.applyUserArchive[0] && d.applyUserArchive[0].departmentName;
            },
            hidden: ((!this.view && this.isCheck) || !this.code)
        }, {
            title: '职务',
            field: 'postCode',
            formatter: (v, d) => {
                return d.applyUserArchive[0] && d.applyUserArchive[0].postName;
            },
            hidden: ((!this.view && this.isCheck) || !this.code)
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 632610,
            detailCode: 632616,
            buttons: this.buttons,
            beforeSubmit: (data) => {
                data.applyUser = getUserId();
                return data;
            }
        });
    }
}

export default overtimeAddedit;
