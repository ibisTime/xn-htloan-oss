import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/mortgages/mortgages-relieve';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
    state => state.mortgagesRelieve, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class mortgagesRelieve extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '贷款人',
            field: 'applyUserName',
            formatter: (v, d) => {
                return d.user.realName;
            },
            readonly: true
        }, {
            title: '手机号',
            field: 'mobile',
            formatter: (v, d) => {
                return d.user.mobile;
            },
            readonly: true
        }, {
            title: '身份证号',
            field: 'idNo',
            formatter: (v, d) => {
                return d.user.idNo;
            },
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            readonly: true,
            amount: true
        }, {
            title: '解除日期',
            field: 'releaseDatetime',
            type: 'date',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 630521,
            buttons: [{
              title: '确认',
              handler: (param) => {
                param.approveResult = '1';
                param.approveNote = this.projectCode;
                param.operator = getUserId();
                param.operator = getUserId();
                this.props.doFetching();
                fetch(630554, param).then(() => {
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

export default mortgagesRelieve;