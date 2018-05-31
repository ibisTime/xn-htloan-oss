import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/installGps-check';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.bizinstallGpsCheck, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class installGpsCheck extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'applyUserName',
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: 'GPS安装列表',
            field: 'budgetOrderGpsList',
            type: 'o2m',
            readonly: true,
            options: {
              fields: [{
                field: 'gpsDevNo',
                title: 'GPS设备编号'
              }, {
                field: 'gpsType',
                title: 'GPS类型',
                type: 'select',
                data: [{
                  key: '1',
                  value: '有线'
                }, {
                  key: '0',
                  value: '无线'
                }],
                keyName: 'key',
                valueName: 'value'
              }]
            }
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146,
            buttons: [{
              title: '通过',
              handler: (param) => {
                param.approveResult = '1';
                param.approveNote = this.projectCode;
                param.operator = getUserId();
                this.props.doFetching();
                fetch(632127, param).then(() => {
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
              title: '不通过',
              handler: (param) => {
                param.approveResult = '0';
                param.approveNote = this.projectCode;
                param.operator = getUserId();
                this.props.doFetching();
                fetch(632127, param).then(() => {
                  showSucMsg('操作成功');
                  this.props.cancelFetching();
                  setTimeout(() => {
                    this.props.history.go(-1);
                  }, 1000);
                }).catch(this.props.cancelFetching);
              },
              check: true
            }, {
              title: '返回',
              handler: (param) => {
                this.props.history.go(-1);
              }
            }]
        });
    }
}

export default installGpsCheck;
