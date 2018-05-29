import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/mortgage-enter';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
    state => state.bizMortgageEnter, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class mortgageEnter extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'description',
            readonly: true
        }, {
            title: '业务编号',
            field: 'description',
            readonly: true
        }, {
            title: '贷款银行',
            field: 'name',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'remark',
            amount: true,
            readonly: true
        }, {
            title: '抵押日期',
            field: 'updateDatetime',
            type: 'date',
            required: true
        }, {
            title: '绿大本扫描件',
            field: 'remark',
            type: 'img',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 630407,
            buttons: [{
              title: '确认',
              handler: (param) => {
                param.approveResult = '1';
                param.approveNote = this.projectCode;
                param.approveUser = getUserId();
                this.props.doFetching();
                fetch(630503, param).then(() => {
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

export default mortgageEnter;