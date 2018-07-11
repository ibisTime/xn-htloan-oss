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
} from '@redux/statistic/creditReport';
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
        ...state.statisticCreditReport,
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
class CreditReport extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code'
        }, {
            title: '客户姓名',
            field: 'userName',
            render: (e, t) => {
                return (t.creditUser ? t.creditUser.userName : '-');
            },
            search: true
        }, {
            title: '日期',
            field: 'applyDatetime',
            type: 'date',
            rangedate: ['applyDatetimeStart', 'applyDatetimeEnd'],
            render: dateTimeFormat,
            search: true
        }, {
            title: '征信查询结果',
            field: 'bankCreditResultRemark',
            render: (value, data) => {
                if(!data.creditUser || !data.creditUser.bankCreditResultRemark) {
                    return;
                }
                return data.creditUser.bankCreditResultRemark;
            }
        }, {
            title: '信用卡使用占比',
            field: 'NotBlank'
        }, {
            title: '信贷专员',
            field: 'saleUserName'
        }, {
            title: '内勤',
            field: 'operatorName'
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
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
            pageCode: 632115,
            searchParams: {
                roleCode: getRoleCode(),
                teamCode: getTeamCode(),
                curNodeCodeList: ['001_01', '001_02', '001_03', '001_04', '001_05', '001_06', '001_07']
            }
        });
    }
}

export default CreditReport;
