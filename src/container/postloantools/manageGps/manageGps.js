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
            title: '领用日期',
            field: 'applyDatetime',
            type: 'datetime'
        }, {
            title: 'GPS状态',
            field: 'useStatus',
            type: 'select',
            key: 'gps_status',
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
            pageCode: 632705,
            btnEvent: {
                import: (selectedRowKeys, selectedRows) => {
                    this.props.history.push(`/postloantools/manageGps/import`);
                }
            }
        });
    }
}

export default manageGps;
