import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/yellowList-addedit';
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

@DetailWrapper(state => state.bizYellowListAddEdit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class yellowListAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.userId = getQueryString('userId', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code'
          }, {
            field: 'user',
            title: '贷款人',
            formatter: (v, d) => {
              return d.user.realName;
            }
          }, {
            title: '逾期日期',
            field: 'repayDatetime',
            type: 'date'
          }, {
              title: '代偿金额(元)',
              field: 'overdueAmount',
              amount: true,
              readonly: true
          }, {
              title: '代偿是否缴纳',
              field: 'isRepay',
              type: 'select',
              data: [{
                  key: '0',
                  value: '否'
              }, {
                  key: '1',
                  value: '是'
              }],
              keyName: 'key',
              valueName: 'value'
          }, {
            title: '已缴纳清收成本(元)',
            field: 'payedFee',
            amount: true
          }, {
            title: '清收成本清单',
            field: 'costList',
            type: 'o2m',
            options: {
                fields: [{
                    title: '编号',
                    field: 'code'
                }, {
                    title: '费用项',
                    field: 'item'
                }, {
                    title: '金额（元）',
                    field: 'amount',
                    amount: true
                }, {
                    title: '发生时间',
                    field: 'payDatetime',
                    type: 'date'
                }, {
                    title: '状态',
                    field: 'status',
                    type: 'select',
                    key: 'cost_status'
                }, {
                    title: '备注',
                    field: 'remark'
                }]
            }
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630541
            });
    }
}

export default yellowListAddedit;
