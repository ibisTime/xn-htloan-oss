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
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode,
    dateTimeFormat,
    getTeamCode
} from 'common/js/util';
import {
    listWrapper
} from 'common/js/build-list';
import {
    creditWithdraw
} from 'api/biz';
import { Button, Upload, Modal } from 'antd';
import { PIC_PREFIX, PIC_BASEURL_M } from 'common/js/config';

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
            search: true
        }, {
            title: '贷款银行',
            field: 'loanBank',
            type: 'select',
            listCode: 632037,
            keyName: 'code',
            valueName: '{{bankName.DATA}}{{subbranch.DATA}}'
        }, {
            title: '地区',
            field: 'region',
            type: 'select',
            key: 'region'
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
            field: 'pledgeStatus'
        }, {
            title: '抵押时间',
            field: 'pledgeDatetime',
            type: 'date'
        }, {
            title: '车牌号',
            field: 'carNumber'
        }, {
            title: '内勤',
            field: 'operatorName'
        }, {
            title: '信贷专员',
            field: 'saleUserId',
            type: 'select',
            pageCode: 630065,
            params: {
                type: 'P'
            },
            keyName: 'userId',
            valueName: '{{companyName.DATA}}-{{realName.DATA}}',
            searchName: 'realName',
            search: true,
            render: (v, d) => {
                return d.saleUserName;
            }
        }, {
            title: '资料快递单号及时间',
            field: 'expressNoAndDatatime'
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
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
            title: '关键字搜索',
            field: 'keyword',
            hidden: true,
            search: true
        }, {
            title: '是否作废',
            field: 'isPass',
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
            pageCode: 632148,
            searchParams: {
                roleCode: getRoleCode(),
                teamCode: getTeamCode(),
                curNodeCodeList: ['002_01', '002_02', '002_03', '002_04', '002_24']
            }
        });
    }
}

export default PostloanReport;
