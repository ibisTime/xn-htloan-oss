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
            field: 'code',
            nowrap: true
        }, {
            title: '贷款银行',
            field: 'loanBank',
            type: 'select',
            listCode: 632037,
            keyName: 'code',
            valueName: '{{bankName.DATA}}{{subbranch.DATA}}',
            search: true,
            nowrap: true
        }, {
            title: '地区',
            field: 'region',
            type: 'select',
            key: 'region',
            search: true,
            nowrap: true
        }, {
            title: '客户姓名',
            field: 'applyUserName',
            search: true,
            nowrap: true
        }, {
            title: '车型',
            field: 'carModel',
            nowrap: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            nowrap: true
        }, {
            title: '垫资日期',
            field: 'advanceFundDatetime',
            type: 'date',
            nowrap: true
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
            search: true,
            nowrap: true
        }, {
            title: '抵押时间',
            field: 'pledgeDatetime',
            type: 'date',
            nowrap: true
        }, {
            title: '车牌号',
            field: 'carNumber',
            nowrap: true
        }, {
            title: '内勤',
            field: 'insideJobName',
            nowrap: true
        }, {
            title: '信贷专员',
            field: 'saleUserName',
            nowrap: true
        }, {
            title: '资料快递单号及时间',
            field: 'informationExpress',
            nowrap: true
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            params: {
              codeList: ['002_09', '002_10', '002_11', '002_12', '002_13',
                '002_14', '002_15', '002_16', '002_17', '002_18', '002_19',
                '002_20', '002_21', '002_22', '002_23']
            },
            search: true,
            nowrap: true
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
            search: true,
            nowrap: true
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
            search: true,
            nowrap: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632914
        });
    }
}

export default PostloanReport;
