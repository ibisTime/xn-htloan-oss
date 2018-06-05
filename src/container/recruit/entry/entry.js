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
            listCode: 630106,
            params: {
              typeList: '2'
            },
            keyName: 'code',
            valueName: 'name',
            search: true
        }, {
            title: '招聘岗位',
            field: 'position',
            required: true,
            listCode: 630106,
            params: {
              typeList: '3'
            },
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '编制人数',
            field: 'establishQuantity'
        }, {
            title: '部门现有人数',
            field: 'nowQuantity'
        }, {
            title: '申请补人数',
            field: 'applyQuantity'
        }, {
            title: '申请时间',
            field: 'applyDatetime',
            type: 'date'
        }, {
            title: '需求到岗时间',
            field: 'requireDatetime',
            type: 'date'
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
                } else {
                  this.props.history.push(`/recruit/entry/apply?code=${selectedRowKeys[0]}`);
                }
              },
              check: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/recruit/entry/check?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default entry;