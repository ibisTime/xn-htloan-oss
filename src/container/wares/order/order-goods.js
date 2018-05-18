import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/wares/order-goods';
import {
    getQueryString,
    showSucMsg,
    getUserId,
    getUserName
  } from 'common/js/util';
  import fetch from 'common/js/fetch';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(state => state.bizOrderGoods, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class orderGoods extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '发货人',
            field: 'deliverer',
            value: getUserName(),
            hidden: true
        }, {
            title: '发货时间',
            field: 'deliveryDatetime',
            type: 'datetime',
            required: true
        }, {
            title: '物流单号',
            field: 'logisticsCode',
            required: true
        }, {
            title: '物流公司',
            field: 'logisticsCompany',
            type: 'select',
            key: 'kd_company',
            required: true
        }, {
            title: '物流单',
            field: 'pdf',
            type: 'img'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 808066,
                buttons: [{
                    title: '发货',
                    handler: (param) => {
                        this.props.doFetching();
                        param.approveUser = getUserId();
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

export default orderGoods;