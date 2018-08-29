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
} from '@redux/statistic/postloanReport';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.statisticPostloanReport,
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
class PostloanReport extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code'
        }, {
            title: '贷款银行',
            field: 'loanBank',
            type: 'select',
            listCode: 632037,
            keyName: 'code',
            valueName: '{{bankName.DATA}}{{subbranch.DATA}}',
            search: true
        }, {
            title: '地区',
            field: 'region',
            type: 'select',
            key: 'region',
            search: true
        }, {
            title: '客户姓名',
            field: 'applyUserName',
            search: true
        }, {
            title: '车型',
            field: 'carModel'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '垫资日期',
            field: 'advanceFundDatetime',
            type: 'date'
        }, {
            title: '抵押情况',
            field: 'pledgeStatus',
            type: 'select',
            data: [{
              k: '0',
              v: '未完成'
            }, {
              k: '1',
              v: '已完成'
            }],
            keyName: 'k',
            valueName: 'v',
            search: true
        }, {
            title: '抵押时间',
            field: 'pledgeDatetime',
            type: 'date'
        }, {
            title: '车牌号',
            field: 'carNumber'
        }, {
            title: '内勤',
            field: 'insideJob'
        }, {
            title: '信贷专员',
            field: 'saleUserName'
        }, {
            title: '资料快递单号及时间',
            field: 'informationExpress'
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            search: true
        }, {
            title: '归档情况',
            field: 'enterStatus',
            type: 'select',
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '是否作废',
            field: 'isCancel',
            type: 'select',
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632914
        });
    }
}

export default PostloanReport;
