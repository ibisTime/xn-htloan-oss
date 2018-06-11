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
} from '@redux/carloanfinance/pointreturn';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg,
    formatDate
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
        ...state.carloanfinancePointreturn,
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
class pointreturn extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code'
        }, {
            title: '业务团队队长',
            field: 'captain',
            type: 'select',
            listCode: 630207,
            keyName: 'userId',
            valueName: 'realName'
        }, {
            title: '返还金额',
            field: 'shouldAmount',
            amount: true
        }, {
            title: '实返金额',
            field: 'actualAmount',
            amount: true
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            data: [{
                key: '0',
                value: '待返点'
            }, {
                key: '1',
                value: '已返点'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632315,
            btnEvent: {
              return: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/carloanfinance/pointreturn/return?code=${selectedRowKeys[0]}&entryCode=${selectedRows[0].entryCode}`);
                }
              }
            }
        });
    }
}

export default pointreturn;