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
            field: 'gpsDevNoForQuery',
            search: true,
            render: (v, d) => {
            return d.gpsDevNo ? d.gpsDevNo : '-';
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
            valueName: 'name'
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
        }
        //     {
        //     title: '业务编号',
        //     field: 'bizCode',
        //     search: true
        // }
        ];
        return this.props.buildList({
            fields,
            pageCode: 632705
        });
    }
}

export default manageGps;
