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
} from '@redux/security/businessTeam';
import {showWarnMsg, getUserId} from 'common/js/util';
import {listWrapper} from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.securityBusinessTeam,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class BusinessTeam extends React.Component {
    render() {
        const fields = [{
            title: '团队名称',
            field: 'name'
        }, {
            field: 'captainName',
            title: '团队长'
        }, {
            field: 'companyCode',
            title: '所属公司',
            type: 'select',
            listCode: 630106,
            params: {
                typeList: ['1']
            },
            keyName: 'code',
            valueName: 'name',
            search: true
        }, {
            title: '区域',
            field: 'place',
            value: '1',
            hidden: true
        }, {
            title: '地名',
            field: 'region',
            value: '2',
            hidden: true
        }, {
            field: 'updaterName',
            title: '最新修改人'
        }, {
            field: 'updateDatetime',
            title: '最新修改时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 630195,
            deleteCode: 630191,
            btnEvent: {
                memberList: (selectedRowKeys, selectedRows) => {
                    console.log(selectedRows[0].name);
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/system/businessTeam/memberList?name=${selectedRows[0].name}&code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default BusinessTeam;
