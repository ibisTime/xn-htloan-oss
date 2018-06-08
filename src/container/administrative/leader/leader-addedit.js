import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/administrative/leader-addedit';
import {getQueryString, getUserId, showSucMsg} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.administrativeLeaderAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class leaderAddedit extends React.Component {
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
                    fetch(632651, data).then(() => {
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
                    fetch(632651, data).then(() => {
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
            title: '请示领导',
            field: 'leadUserId',
            type: 'select',
            listCode: 632807,
            keyName: 'userId',
            valueName: '{{departmentName.DATA}}{{postName.DATA}}-{{realName.DATA}}',
            searchName: 'userName',
            required: true
        }, {
            title: '请示内容',
            field: 'content',
            type: 'textarea',
            normalArea: true,
            required: true
        }, {
            title: '领导意见',
            field: 'remark',
            readonly: !this.isCheck,
            hidden: !(this.isCheck || this.view)
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 632650,
            detailCode: 632656,
            buttons: this.buttons,
            beforeSubmit: (data) => {
                data.applyUser = getUserId();
                return data;
            }
        });
    }
}

export default leaderAddedit;
