import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/historicalApply-addedit';
import {
    getQueryString,
    showSucMsg,
    getUserId
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

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
            type: 'select',
            listCode: 630066,
            keyName: 'userId',
            valueName: 'realName',
            formatter: (v, data) => {
                return data.user ? data.user.realName : '-';
            }
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
            type: 'date'
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
