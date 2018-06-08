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
} from '@redux/recruit/entry';
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
        ...state.recruitEntry,
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
class entry extends React.Component {
    render() {
        const fields = [{
            title: '申请部门',
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
            title: '申请岗位',
            field: 'position',
            required: true,
            type: 'select',
            listCode: 630106,
            params: {
              typeList: ['3']
            },
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '申请时间',
            field: 'applyDatetime',
            type: 'date'
        }, {
            title: '姓名',
            field: 'realName'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'recruit_apply_status'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632865,
            btnEvent: {
              apply: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else if (selectedRows[0].status !== '1') {
                    showWarnMsg('不是审核通过状态');
                } else {
                  this.props.history.push(`/recruit/entry/apply?code=${selectedRowKeys[0]}`);
                }
              },
              check: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else if (selectedRows[0].status !== '0') {
                    showWarnMsg('不是待审核状态');
                } else {
                  this.props.history.push(`/recruit/entry/check?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default entry;
