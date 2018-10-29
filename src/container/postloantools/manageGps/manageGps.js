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
} from '@redux/postloantools/manageGps';
import {
    listWrapper
} from 'common/js/build-list';
import { getRoleCode } from 'common/js/util';

@listWrapper(
    state => ({
        ...state.postloantoolsManageGps,
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
class manageGps extends React.Component {
    render() {
        const fields = [{
            title: 'GPS编号',
            field: 'gpsDevNo'
        }, {
            title: 'GPS类型',
            field: 'gpsType',
            type: 'select',
            data: [{
              key: '1',
              value: '有线'
            }, {
              key: '0',
              value: '无线'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '客户姓名',
            field: 'customerName',
            render: (v, d) => {
                return d.budgetOrder ? d.budgetOrder.applyUserName : '';
            },
            search: true
        }, {
            title: '客户手机号',
            field: 'mobile',
            render: (v, d) => {
                return d.budgetOrder ? d.budgetOrder.mobile : '';
            }
        }, {
            title: '业务团队',
            field: 'teamName',
            render: (v, d) => {
                return d.budgetOrder ? d.budgetOrder.teamName : '';
            }
        }, {
            title: '信贷专员',
            field: 'saleUserName',
            render: (v, d) => {
                return d.budgetOrder ? d.budgetOrder.saleUserName : '';
            }
        }, {
            title: '内勤专员',
            field: 'insideJob',
            render: (v, d) => {
                return d.budgetOrder ? d.budgetOrder.insideJob : '';
            }
        }, {
            title: '归属公司',
            field: 'companyCode',
            listCode: 630106,
            params: {
                typeList: [1]
            },
            type: 'select',
            keyName: 'code',
            valueName: 'name',
            search: true
        }, {
            title: 'GPS领用人',
            field: 'applyUserName'
        }, {
            title: 'GPS领用状态',
            field: 'applyStatus',
            type: 'select',
            data: [{
              key: '1',
              value: '已领用'
            }, {
              key: '0',
              value: '未领用'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '领用日期',
            field: 'applyDatetime',
            type: 'datetime'
        }, {
            title: 'GPS使用状态',
            field: 'useStatus',
            type: 'select',
            data: [{
              key: '1',
              value: '已使用'
            }, {
              key: '0',
              value: '未使用'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '使用日期',
            field: 'useDatetime',
            type: 'datetime'
        }, {
            title: '业务编号',
            field: 'bizCode'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632705,
            btnEvent: {
              import: () => {
                  this.props.history.push(`/postloantools/manageGps/import`);
              }
            }
        });
    }
}

export default manageGps;
