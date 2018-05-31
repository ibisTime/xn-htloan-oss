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
} from '@redux/loan/faceSign';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode
} from 'common/js/util';
import {
    listWrapper
} from 'common/js/build-list';
import {
    lowerFrame,
    onShelf,
    sendMsg
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.loanFaceSign,
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
class FaceSign extends React.Component {
    render() {
        const fields = [{
            title: '业务公司',
            field: 'gs'
        }, {
            title: '客户姓名',
            field: 'applyUserName'
        }, {
            title: '手机号',
            field: 'mobile'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '贷款期限',
            field: 'loanPeriod',
            type: 'select',
            key: 'loan_period'
        }, {
            title: '业务种类',
            field: 'bizType',
            type: 'select',
            key: 'budget_orde_biz_typer'
        }, {
            title: '是否垫资',
            field: 'isAdvanceFund',
            type: 'select',
            data: [{
                dkey: '0',
                dvalue: '否'
            }, {
                dkey: '1',
                dvalue: '是'
            }],
            keyName: 'dkey',
            valueName: 'dvalue'
        }, {
            title: '业务员',
            field: 'salesman'
        }, {
            title: '申请日期',
            field: 'applyDatetime',
            type: 'datetime'
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632148,
            searchParams: {
                roleCode: getRoleCode()
            },
            btnEvent: {
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/loan/faceSign/addedit?v=1&isCheck=1&code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default FaceSign;