import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/installGps-enter';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.bizinstallGpsEnter, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class installGpsEnter extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.edit = getQueryString('edit', this.props.location.search);
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
            field: 'carFrameNo',
            title: '车架号',
            required: true
        }, {
            title: 'GPS安装列表',
            field: this.edit ? 'budgetOrderGpsList' : 'gpsAzList',
            type: 'o2m',
            options: {
                add: true,
                edit: true,
                delete: true,
                fields: [{
                    title: 'GPS设备号',
                    field: 'code',
                    type: 'select',
                    listCode: 632707,
                    params: {
                        applyStatus: '1',
                        applyUser: getUserId(),
                        useStatus: '0'
                    },
                    keyName: 'code',
                    valueName: 'gpsDevNo',
                    nowrap: true,
                    required: true
                }, {
                    title: '安装位置',
                    field: 'azLocation',
                    nowrap: true,
                    required: true
                }, {
                    title: '安装时间',
                    field: 'azDatetime',
                    type: 'date',
                    nowrap: true,
                    required: true
                }, {
                    title: '安装人员',
                    field: 'azUser',
                    nowrap: true,
                    required: true
                }, {
                    title: '备注',
                    field: 'remark',
                    nowrap: true
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
              title: '确认',
              handler: (param) => {
                param.operator = getUserId();
                this.props.doFetching();
                if (this.edit) {
                    param.gpsAzList = param.budgetOrderGpsList;
                }
                fetch(632126, param).then(() => {
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

export default installGpsEnter;
