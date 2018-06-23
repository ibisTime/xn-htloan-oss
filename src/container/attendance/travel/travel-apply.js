import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/attendance/travel-apply';
import {getQueryString, getUserId, showSucMsg, showWarnMsg} from 'common/js/util';
import {CollapseWrapper} from 'component/collapse-detail/collapse-detail';
import fetch from 'common/js/fetch';

@CollapseWrapper(
    state => state.loanAdmittanceAddedit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class TravelApply extends React.Component {
    render() {
        const fields = [{
            title: '出差申请信息',
            items: [
                [{
                    title: '出差人',
                    field: ''
                }, {
                    title: '出差时间',
                    field: '',
                    type: 'date'
                }],
                [{
                    title: '飞机票费用标准',
                    field: '',
                    amount: true
                }, {
                    title: '飞机票天数',
                    field: ''
                }, {
                    title: '飞机票预算金额',
                    field: '',
                    amount: true
                }],
                [{
                    title: '火车票费用标准',
                    field: '',
                    amount: true
                }, {
                    title: '火车票天数',
                    field: ''
                }, {
                    title: '火车票预算金额',
                    field: '',
                    amount: true
                }],
                [{
                    title: '市内交通费用标准',
                    field: '',
                    amount: true
                }, {
                    title: '市内交通天数',
                    field: ''
                }, {
                    title: '市内交通预算金额',
                    field: '',
                    amount: true
                }],
                [{
                    title: '住宿费',
                    field: '',
                    amount: true
                }, {
                    title: '伙食补助',
                    field: '',
                    amount: true
                }, {
                    title: '招待费',
                    field: '',
                    amount: true
                }],
                [{
                    title: '其他（详细明细）',
                    field: 'other',
                    type: 'textarea',
                    normalArea: true,
                }],
                [{
                    title: '小计',
                    field: '',
                    amount: true
                }, {
                    title: '备用金',
                    field: '',
                    amount: true
                }, {
                    title: '费用合计',
                    field: '',
                    amount: true
                }],
                [{
                    title: '金额大写',
                    field: 'other'
                }],
                [{
                    title: '出差事由',
                    field: 'other',
                    type: 'textarea',
                    normalArea: true,
                }],
                [{
                    title: '出差路线',
                    field: 'other',
                    type: 'textarea',
                    normalArea: true,
                }],
                [{
                    title: '备注',
                    field: 'other',
                    type: 'textarea',
                    normalArea: true,
                }]
            ]
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            buttons: [{
              title: '确认',
              handler: (param) => {
                param.operator = getUserId();
                this.props.doFetching();
                fetch(632135, param).then(() => {
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

export default TravelApply;
