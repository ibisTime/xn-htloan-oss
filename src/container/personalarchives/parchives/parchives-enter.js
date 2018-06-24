import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/personalarchives/parchives-enter';
import {
    getQueryString,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.personalarchivesParchivesEnter, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class parchivesEnter extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        console.log('code==' + this.code);
    }
    render() {
        if (this.props.selectData.heirPeople) {
            this.props.selectData.heirPeople.forEach(v => console.log(v.userId));
        }
        const fields = [{
            title: '姓名',
            field: 'realName',
            readonly: true
        }, {
            title: '离职日期',
            field: 'leaveDatetime',
            type: 'date',
            required: true
        }, {
            title: '交接人',
            field: 'heirPeople',
            type: 'select',
            listCode: 630066,
            keyName: 'userId',
            valueName: 'realName',
            required: true
        }, {
            title: '离职缘由',
            field: 'leaveReason',
            required: true
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
                detailCode: 632806,
                buttons: [{
                    title: '确定',
                    check: true,
                    handler: (params) => {
                        params.realName = this.props.pageData.realName;
                        this.props.doFetching();
                        fetch(632810, params).then(() => {
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
                }]
            });
    }
}

export default parchivesEnter;