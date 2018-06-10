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
} from '@redux/biz/trailer';
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
    lowerFrame,
    onShelf
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.bizTrailer,
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
class trailer extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '贷款人',
            field: 'user',
            search: true,
            render: (v, d) => {
                return d.user.realName;
            }
        }, {
            title: '逾期日期',
            field: 'mobile',
            type: 'date'
        }, {
            title: '清收成本(元)',
            field: 'loanAmount',
            amount: true
        }, {
            title: '未还清收成本(元)',
            field: 'loanAmount',
            amount: true
        }, {
            title: '代偿款(元)',
            field: 'loanAmount',
            amount: true
        }, {
            title: '代偿是否缴纳',
            field: 'monthDatetime',
            type: 'select',
            key: 'status'
        }, {
            title: '保证金(元)',
            field: 'loanAmount',
            amount: true
        }, {
            title: '可退保证金(元)',
            field: 'loanAmount',
            amount: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 630540,
            btnEvent: {
                dsipose: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/biz/trailer/dsipose?code=${selectedRowKeys[0]}&userId=${selectedRows[0].user.userId}`);
                    }
                }
            }
        });
    }
}

export default trailer;