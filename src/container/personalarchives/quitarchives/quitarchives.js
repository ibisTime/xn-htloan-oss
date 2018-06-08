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
} from '@redux/personalarchives/quitarchives';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg
} from 'common/js/util';
import {
    Button,
    Upload,
    Modal
} from 'antd';
import {
    receiveGoods,
    cancelBill
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.personalarchivesQuitarchives,
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
class quitarchives extends React.Component {
    render() {
        const fields = [{
            title: '姓名',
            field: 'realName',
            search: true
        }, {
            title: '部门',
            field: 'departmentCode',
            type: 'select',
            listCode: 630106,
            params: {
                typeList: ['2']
            },
            keyName: 'code',
            valueName: 'name',
            search: true
        }, {
            title: '职务',
            field: 'postCode',
            type: 'select',
            listCode: 630106,
            params: {
                typeList: ['3']
            },
            keyName: 'code',
            valueName: 'name',
            search: true
        }, {
            title: '离职日期',
            field: 'leaveDatetime',
            type: 'date'
        }, {
            title: '离职缘由',
            field: 'leaveReason'
        }, {
            title: '交接人',
            field: 'heirPeople',
            listCode: 632807,
            type: 'select',
            keyName: 'userId',
            valueName: 'realName',
            required: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632815
        });
    }
}

export default quitarchives;