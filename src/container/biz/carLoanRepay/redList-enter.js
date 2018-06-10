import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/redList-enter';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizredListEnter, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class redListEnter extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'realName',
            formatter: (v, d) => {
                return d.user.realName;
            },
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBank',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            maount: true,
            readonly: true
        }, {
            title: '收车地点',
            field: 'takeCarAddress',
            required: true
        }, {
            title: '拖车时间',
            field: 'takeDatetime',
            type: 'date',
            required: true
        }, {
            title: '拖车人员',
            field: 'takeName',
            required: true
        }, {
            title: '停放位置',
            field: 'takeLocation',
            required: true
        }, {
            title: '备注',
            field: 'takeNote'
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630521,
                buttons: [{
                    title: '确定',
                    handler: (param) => {
                        param.code = this.code;
                        param.operator = getUserId();
                        this.props.doFetching();
                        fetch(630557, param).then(() => {
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

export default redListEnter;
