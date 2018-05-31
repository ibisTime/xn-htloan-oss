import React from 'react';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/biz/refundCard';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import { Button, Upload, Modal } from 'antd';
import { lowerFrame, onShelf } from 'api/biz';

@listWrapper(
    state => ({
        ...state.bizRefundCard,
        parentCode: state.menu.subMenuCode
    }), {
        setTableData,
        clearSearchParam,
        doFetching,
        setBtnList,
        cancelFetching,
        setPagination,
        setSearchParam,
        setSearchData
    }
)
class refundCard extends React.Component {
    render() {
        const fields = [{
            title: '卡号',
            field: 'bankcardNumber',
            search: true
        }, {
            title: '开户行',
            field: 'bankName',
            render: (v, d) => d.bankName + d.subbranch
        }, {
            title: '户名',
            field: 'realName',
            search: true
        }, {
            title: '所属客户编号',
            field: 'userId',
            search: true
        }, {
            title: '状态',
            field: 'status',
            search: true,
            type: 'select',
            key: 'bankcard'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 802015
        });
    }
}

export default refundCard;
