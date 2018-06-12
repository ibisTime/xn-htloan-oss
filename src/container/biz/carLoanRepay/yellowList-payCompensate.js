import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/yellowList-payCompensate';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    moneyFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizYellowListPayCompensate, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class yellowListPayCompensate extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.userId = getQueryString('userId', this.props.location.search);
    }
    handleSubmit(param) {
      this.props.doFetching();
      fetch(630534, param).then(() => {
          showSucMsg('操作成功');
          this.props.cancelFetching();
          setTimeout(() => {
              this.props.history.go(-1);
          }, 1000);
      }).catch(this.props.cancelFetching);
    }
    render() {
        const fields = [{
            field: 'operator',
            value: getUserId(),
            hidden: true
        }, {
            field: 'code',
            value: this.code,
            hidden: true
        }, {
            title: '业务编号',
            field: 'code1',
            value: this.code,
            readonly: true
        }, {
            field: 'user',
            title: '贷款人',
            formatter: (v, d) => {
                return d.user.realName;
            },
            readonly: true
        }, {
            title: '逾期日期',
            field: 'repayDatetime',
            type: 'date',
            readonly: true
        }, {
            title: '代偿金额(元)',
            field: 'overdueAmount',
            amount: true,
            readonly: true
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630541,
                buttons: [{
                    title: '线上代扣',
                    handler: (param) => {
                        param.payType = '1';
                        this.handleSubmit(param);
                    },
                    check: true,
                    type: 'primary'
                }, {
                    title: '线下收取',
                    handler: (param) => {
                        param.payType = '2';
                        this.handleSubmit(param);
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

export default yellowListPayCompensate;
