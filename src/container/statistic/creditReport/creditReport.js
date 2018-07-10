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
            field: 'code',
            search: true
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
            field: 'bankCreditResultPdf',
            type: 'img',
            render: (value, data) => {
                if(!data.creditUser || !data.creditUser.bankCreditResultPdf) {
                    return;
                }
                let imgStr = data.creditUser.bankCreditResultPdf.split('||');
                return (<div>
                    { imgStr.map(pic => (
                        <img key={pic} style={{maxWidth: 25, maxHeight: 25, marginRight: 10}} src={PIC_PREFIX + pic + PIC_BASEURL_M}/>
                    ))}
                </div>);
            }
        }, {
            title: '信用卡使用占比',
            field: 'NotBlank'
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
            title: '关键字搜索',
            field: 'keyword',
            hidden: true,
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
