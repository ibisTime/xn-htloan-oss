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
} from '@redux/contract/manage';
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
        ...state.contractManage,
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
class manage extends React.Component {
    render() {
        const fields = [{
            title: '姓名',
            field: 'userId',
            type: 'select',
            render: (v, d) => {
                return d ? d.archive.realName : '';
            },
            listCode: 632807,
            keyName: 'userId',
            valueName: 'realName',
            search: true
        }, {
            title: '合同编号',
            field: 'contractNo',
            search: true
        }, {
            title: '合同类型',
            field: 'type',
            type: 'select',
            key: 'contract_type'
        }, {
            title: '开始日期',
            field: 'startDatetime',
            type: 'date'
        }, {
            title: '结束日期',
            field: 'endDatetime',
            type: 'date'
        }, {
            title: '说明',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632835,
            deleteCode: 632831,
            btnEvent: {
              continue: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/contract/manage/continue?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default manage;