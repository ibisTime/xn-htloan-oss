import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/historicalApply-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(state => state.bizHistoricalApplyAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class historicalApplyAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '订单编号',
            field: 'code'
        }, {
            title: '申请人',
            field: 'userId',
            formatter: (v, data) => {
                let prefix = data.user && data.user.realName ? data.user.realName + '-' : '';
                return prefix + (data.user.mobile || '');
            }
        }, {

            title: '车型名称',
            field: 'carName',
            readonly: true
        }, {
            title: '处理人',
            field: 'handler',
            hidden: !this.view,
            formatter: (v, d) => {
              return d.sysUser ? d.sysUser.loginName : '';
            },
            readonly: true
        }, {
            title: '车系编号',
            field: 'seriesCode',
            readonly: true
        }, {
            title: '车系名称',
            field: 'seriesName',
            readonly: true
        }, {
            title: '车辆总价',
            amount: true,
            field: 'price'
        }, {
            title: '首付金额',
            amount: true,
            field: 'sfAmount'
        }, {
            title: '车贷计算器信息',
            field: 'saleDesc'
        }, {
            title: '申请时间',
            field: 'createDatetime',
            type: 'datetime'
        }, {
            title: '处理人',
            field: 'handler',
            type: 'select',
            listCode: 630066,
            keyName: 'userId',
            valueName: 'realName'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'can_order_status'
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630437
            });
    }
}

export default historicalApplyAddedit;
