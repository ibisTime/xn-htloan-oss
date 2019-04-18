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
} from '@redux/personalarchives/ywcx';
import { dateTimeFormat, showWarnMsg } from 'common/js/util';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.ywCx,
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
class ywCx extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '客户姓名',
            field: 'ywyUser',
            search: true,
            render: (v, d) => {
                return d.credit.userName;
            }
        }, {
            title: '贷款银行',
            field: 'bankCode',
            type: 'select',
            required: true,
            listCode: 632037,
            keyName: 'code',
            hidden: this.code,
            valueName: '{{bankName.DATA}}{{subbranch.DATA}}'
        }, {
            title: '贷款金额',
            field: 'dkAmount',
            amount: true
        }, {
            title: '业务种类',
            field: 'bizType',
            type: 'select',
            key: 'budget_orde_biz_typer'
        }, {
            title: '业务公司',
            field: 'teamName',
            render: (v, d) => {
                return d.credit.companyName;
            }
        }, {
            title: '业务团队',
            field: 'teamName',
            render: (v, d) => {
                return d.credit.teamName;
            }
        }, {
            title: '业务员',
            field: 'saleUserName',
            render: (v, d) => {
                return d.credit.saleUserName;
            }
        }, {
            title: '状态',
            field: 'status',
            search: true,
            keyName: 'dkey',
            valueName: 'dvalue',
            type: 'select',
            key: 'cdbiz_status'
            }
        ];
        return this.props.buildList({
            fields,
            pageCode: 632515,
            btnEvent: {
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/ywcx/ywcx/addedit?v=1&code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default ywCx;
