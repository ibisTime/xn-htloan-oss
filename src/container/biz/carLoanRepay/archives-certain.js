import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/archives-certain';
import { getQueryString, showSucMsg, getUserId } from 'common/js/util';
import fetch from 'common/js/fetch';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.bizArchivesCertain, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class archivesCertain extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            formatter: (v, d) => d.loanBankName ? d.loanBankName + d.repaySubbranch : '',
            readonly: true
        }, {
            title: '客户姓名',
            field: 'applyUserName',
            readonly: true
        }, {
            title: '车型名称',
            field: 'carModel',
            readonly: true
        }, {
            title: '车架号',
            field: 'carFrameNo',
            readonly: true
        }, {
            title: '业务团队',
            field: 'teamName',
            readonly: true
        }, {
            title: '信贷专员',
            field: 'saleUserName',
            readonly: true
        }, {
            title: '内勤专员',
            field: 'insideJobName',
            readonly: true
        }, {
            title: '档案目录',
            field: 'enterFileList',
            type: 'checkbox',
            listCode: 632217,
            keyName: 'id',
            valueName: '{{no.DATA}}-{{name.DATA}}-{{number.DATA}}份',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '档案存放位置',
            field: 'enterLocation',
            type: 'select',
            listCode: '632827',
            keyName: 'code',
            valueName: 'name',
            required: true
        }, {
            title: '流转日志',
            field: 'list',
            type: 'o2m',
            listCode: 630176,
            params: { refOrder: this.code },
            options: {
                rowKey: 'id',
                noSelect: true,
                fields: [{
                    title: '操作人',
                    field: 'operatorName'
                }, {
                    title: '开始时间',
                    field: 'startDatetime',
                    type: 'datetime'
                }, {
                    title: '结束时间',
                    field: 'endDatetime',
                    type: 'datetime'
                }, {
                    title: '花费时长',
                    field: 'speedTime'
                }, {
                    title: '审核意见',
                    field: 'dealNote'
                }, {
                    title: '当前节点',
                    field: 'dealNode',
                    type: 'select',
                    listCode: 630147,
                    keyName: 'code',
                    valueName: 'name'
                }]
            }
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146,
            buttons: [{
              title: '确认',
              handler: (param) => {
                param.approveResult = '1';
                param.approveNote = this.projectCode;
                param.approveUser = getUserId();
                param.operator = getUserId();
                this.props.doFetching();
                fetch(632134, param).then(() => {
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

export default archivesCertain;
